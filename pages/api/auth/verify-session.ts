import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const COOKIE_NAME = 'dashboard-auth-token';

/**
 * Verify if the token is valid
 */
function verifyToken(token: string): boolean {
  try {
    const parts = token.split(':');
    if (parts.length !== 3) {
      return false;
    }

    const [randomBytes, timestamp, signature] = parts;
    const secret = process.env.DASHBOARD_PASSWORD || 'fallback-secret';
    
    // Verify signature
    const data = `${randomBytes}:${timestamp}`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(data)
      .digest('hex');
    
    // Use timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

/**
 * Verify if user has a valid session
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.cookies[COOKIE_NAME];

  if (!token) {
    return res.status(200).json({ authenticated: false });
  }

  const isValid = verifyToken(token);

  if (!isValid) {
    // Clear invalid cookie
    res.setHeader(
      'Set-Cookie',
      `${COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`
    );
    return res.status(200).json({ authenticated: false });
  }

  return res.status(200).json({ authenticated: true });
}


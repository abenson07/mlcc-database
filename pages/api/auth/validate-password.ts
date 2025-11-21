import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import crypto from 'crypto';

const COOKIE_NAME = 'dashboard-auth-token';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours in seconds

/**
 * Generate a simple signed token
 * In production, you might want to use a proper JWT library
 */
function generateToken(): string {
  const randomBytes = crypto.randomBytes(32).toString('hex');
  const timestamp = Date.now().toString();
  const secret = process.env.DASHBOARD_PASSWORD || 'fallback-secret';
  
  // Create a simple signed token
  const data = `${randomBytes}:${timestamp}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('hex');
  
  return `${data}:${signature}`;
}

/**
 * Validate password and set authentication cookie
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required' });
  }

  const correctPassword = process.env.DASHBOARD_PASSWORD;

  if (!correctPassword) {
    console.error('DASHBOARD_PASSWORD environment variable is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Validate password
  if (password !== correctPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  // Generate token and set httpOnly cookie
  const token = generateToken();
  // Use path: '/' so cookie works for all paths including /dashboard/*
  const cookie = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
  return res.status(200).json({ success: true });
}


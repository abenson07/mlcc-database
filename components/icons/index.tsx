import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export const MagnifyingGlassIcon = ({ className = "h-4 w-4", ...props }: IconProps) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M9.375 15a5.625 5.625 0 1 0 0-11.25 5.625 5.625 0 0 0 0 11.25ZM14.062 14.062 17.5 17.5"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
);

export const FunnelIcon = ({ className = "h-4 w-4", ...props }: IconProps) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M3.75 4.375h12.5l-4.38 5.476v4.774l-3.74 1.875V9.851L3.75 4.375Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowRightIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    {...props}
  >
    <path
      d="M5 10h10M10 5l5 5-5 5"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EllipsisIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    {...props}
  >
    <circle cx={4.5} cy={10} r={1.5} fill="currentColor" />
    <circle cx={10} cy={10} r={1.5} fill="currentColor" />
    <circle cx={15.5} cy={10} r={1.5} fill="currentColor" />
  </svg>
);


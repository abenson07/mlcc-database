import clsx from "clsx";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

type BadgeProps = {
  children: string;
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
  default: "bg-neutral-100 text-neutral-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-rose-100 text-rose-700",
  info: "bg-blue-100 text-blue-700"
};

const Badge = ({ children, variant = "default" }: BadgeProps) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        variants[variant]
      )}
    >
      {children}
    </span>
  );
};

export default Badge;


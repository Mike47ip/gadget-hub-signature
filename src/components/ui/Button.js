"use client";

/**
 * Reusable Button component
 * @param {{ variant?: 'primary'|'secondary'|'danger'|'ghost', size?: 'sm'|'md'|'lg', fullWidth?: boolean, children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>} props
 */
export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-navy-900 text-white hover:bg-brand",
    secondary: "bg-brand text-white hover:bg-brand-light",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "bg-transparent text-navy-900 border border-navy-200 hover:bg-navy-50",
    white: "bg-white text-navy-900 hover:opacity-90",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-6 py-3",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

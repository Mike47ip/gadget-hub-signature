/**
 * Badge component
 * @param {{ variant?: 'sale'|'new'|'category'|'stock', children: React.ReactNode, className?: string }} props
 */
export default function Badge({ variant = "sale", children, className = "" }) {
  const variants = {
    sale: "bg-red-500 text-white",
    new: "bg-emerald-500 text-white",
    category: "bg-navy-900 text-white",
    stock: "bg-amber-500 text-white",
    blue: "bg-brand text-white",
  };

  return (
    <span
      className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

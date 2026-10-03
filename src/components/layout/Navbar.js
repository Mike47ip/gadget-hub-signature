"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Navbar component
 * @param {{ cartCount: number, onCartOpen: () => void }} props
 */
export default function Navbar({ cartCount = 0, onCartOpen }) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/deals", label: "Deals" },
    { href: "/cart", label: "Cart" },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-navy-900 h-[60px] flex items-center justify-between px-6 shadow-lg">
      {/* Logo */}
      <Link href="/" className="flex-shrink-0">
        <div className="text-white font-bold text-xl tracking-tight">
          <span className="text-white">Gadget</span>
          <span className="text-brand-light">Hub</span>
          <span className="text-xs text-navy-400 ml-1.5 font-normal">signature</span>
        </div>
      </Link>

      {/* Nav links */}
      <ul className="hidden md:flex gap-6 list-none">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`text-sm transition-colors duration-200 ${
                pathname === href ? "text-white font-semibold" : "text-navy-400 hover:text-white"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Cart button */}
      <button
        onClick={onCartOpen}
        className="flex items-center gap-2 bg-brand hover:bg-brand-light text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
      >
        <span>🛒</span>
        <span>Cart</span>
        {cartCount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </button>
    </nav>
  );
}

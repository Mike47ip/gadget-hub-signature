"use client";

import { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

/**
 * CartSidebar — sliding cart drawer
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   cart: import('../../types/index').CartItem[],
 *   onUpdateQuantity: (id: number, qty: number) => void,
 *   onRemove: (id: number) => void,
 *   totalPrice: number
 * }} props
 */
export default function CartSidebar({ isOpen, onClose, cart, onUpdateQuantity, onRemove, totalPrice }) {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[360px] max-w-full bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-navy-900 text-white px-6 py-4 flex items-center justify-between">
          <h3 className="text-base font-bold">🛒 Your Cart</h3>
          <button
            onClick={onClose}
            className="text-navy-400 hover:text-white text-xl leading-none transition-colors"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-navy-400">
              <p className="text-4xl mb-3">🛒</p>
              <p className="font-semibold">Your cart is empty</p>
              <p className="text-sm mt-1">Add some gadgets!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 pb-4 border-b border-navy-100">
                  <div className="w-14 h-14 bg-brand-pale rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy-900 truncate">{item.name}</p>
                    <p className="text-xs text-brand font-bold">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-navy-100 hover:bg-brand-pale text-xs font-bold transition-colors"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-navy-100 hover:bg-brand-pale text-xs font-bold transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-xs text-red-400 hover:text-red-600 ml-1 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-5 py-4 border-t border-navy-100">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-navy-900">Total</span>
              <span className="font-bold text-lg text-navy-900">{formatPrice(totalPrice)}</span>
            </div>
            <Link href="/checkout" onClick={onClose}>
              <Button fullWidth variant="secondary" size="lg">
                Proceed to Checkout →
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

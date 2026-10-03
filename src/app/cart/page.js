"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  return (
    <>
      <Navbar cartCount={totalItems} onCartOpen={() => {}} />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-extrabold text-navy-900 mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-navy-100 py-20 text-center text-navy-400">
            <p className="text-5xl mb-4">🛒</p>
            <p className="text-lg font-semibold mb-2">Your cart is empty</p>
            <p className="text-sm mb-6">Looks like you haven&apos;t added anything yet.</p>
            <Link href="/">
              <Button variant="primary" size="lg">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Items list */}
            <div className="md:col-span-2 space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-navy-100 p-4 flex items-center gap-4 shadow-sm"
                >
                  <div className="w-16 h-16 bg-brand-pale rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-navy-900 truncate">{item.name}</p>
                    <p className="text-xs text-navy-400">{item.brand}</p>
                    <p className="text-sm font-bold text-brand mt-0.5">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-navy-100 hover:bg-brand-pale text-sm font-bold transition-colors"
                    >
                      −
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-navy-100 hover:bg-brand-pale text-sm font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-bold text-navy-900 w-16 text-right">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 text-xs transition-colors ml-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={clearCart}
                className="text-xs text-navy-400 hover:text-red-500 transition-colors mt-2"
              >
                Clear cart
              </button>
            </div>

            {/* Order summary */}
            <div className="bg-white rounded-xl border border-navy-100 p-5 shadow-sm h-fit sticky top-20">
              <h2 className="font-bold text-navy-900 mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm text-navy-600 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-semibold">
                    {totalPrice >= 99 ? "Free" : formatPrice(9.99)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-navy-900 text-base border-t border-navy-100 pt-3 mb-4">
                <span>Total</span>
                <span>
                  {formatPrice(totalPrice >= 99 ? totalPrice : totalPrice + 9.99)}
                </span>
              </div>
              <Link href="/checkout">
                <Button fullWidth variant="secondary" size="lg">
                  Proceed to Checkout →
                </Button>
              </Link>
              <Link href="/" className="block mt-3 text-center text-xs text-navy-400 hover:text-brand transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

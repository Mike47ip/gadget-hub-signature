"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DealCard from "@/components/shop/DealCard";
import CategoryFilter from "@/components/shop/CategoryFilter";
import CartSidebar from "@/components/shop/CartSidebar";
import CountdownTimer from "@/components/shop/CountdownTimer";
import Toast from "@/components/ui/Toast";
import { useCart } from "@/hooks/useCart";

export default function DealsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("savings");
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const { cart, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  const fetchDeals = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ sale: "true", sortBy });
      if (category !== "all") params.set("category", category);
      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      setProducts(data.products ?? []);
    } catch (_) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [category, sortBy]);

  useEffect(() => { fetchDeals(); }, [fetchDeals]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast({ visible: true, message: `✅ ${product.name} added!` });
  };

  return (
    <>
      <Navbar cartCount={totalItems} onCartOpen={() => setCartOpen(true)} />

      {/* Deals Hero */}
      <section className="bg-gradient-to-br from-navy-900 via-[#1a3a7b] to-red-700 text-white py-10 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(239,68,68,0.15),transparent_60%)] pointer-events-none" />
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 relative">
          🔥 <span className="text-red-300">Hot Deals</span> of the Week
        </h1>
        <p className="text-white/70 text-sm mb-5 relative">
          Limited-time offers — grab them before they&apos;re gone!
        </p>
        <CountdownTimer initialSeconds={43199} />
      </section>

      {/* Category filter */}
      <div className="mt-0">
        <CategoryFilter active={category} onChange={setCategory} />
      </div>

      {/* Stats + sort */}
      <div className="max-w-6xl mx-auto px-6 mt-4 flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-navy-400">
          <strong className="text-navy-900">{products.length}</strong> deals available
        </p>
        <div className="flex items-center gap-2 text-sm text-navy-400">
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-navy-200 rounded-lg px-3 py-1.5 text-sm text-navy-900 bg-white outline-none focus:border-brand"
          >
            <option value="savings">Biggest Savings</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Flash deal banner */}
      <div className="max-w-6xl mx-auto px-6 mt-4">
        <div className="bg-gradient-to-r from-navy-900 to-red-700 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute right-4 bottom-0 text-8xl opacity-10 leading-none pointer-events-none select-none">🔥</div>
          <div className="relative">
            <h2 className="text-white font-bold text-lg">⚡ Flash Deal: Limited Time Only</h2>
            <p className="text-red-200 text-sm mt-0.5">
              Save up to 40% on premium gadgets. Stock is flying — don&apos;t miss out.
            </p>
          </div>
          <a
            href="#deals"
            className="bg-white text-navy-900 font-bold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity flex-shrink-0 relative"
          >
            Shop Deals ↓
          </a>
        </div>
      </div>

      {/* Deals grid */}
      <main id="deals" className="max-w-6xl mx-auto px-6 py-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-navy-400">
            <p className="text-4xl mb-4">🏷️</p>
            <p className="text-lg font-semibold">No deals in this category right now</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <DealCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </main>

      <Footer />

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        totalPrice={totalPrice}
      />

      <Toast
        message={toast.message}
        visible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </>
  );
}

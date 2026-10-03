"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/shop/ProductGrid";
import CategoryFilter from "@/components/shop/CategoryFilter";
import CartSidebar from "@/components/shop/CartSidebar";
import Toast from "@/components/ui/Toast";
import { useCart } from "@/hooks/useCart";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const { cart, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ sortBy });
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

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast({ visible: true, message: `✅ ${product.name} added!` });
  };

  const STATS = [
    { value: "50K+", label: "Products" },
    { value: "4.8★", label: "Avg Rating" },
    { value: "24h", label: "Fast Delivery" },
    { value: "Free", label: "Returns" },
  ];

  return (
    <>
      <Navbar cartCount={totalItems} onCartOpen={() => setCartOpen(true)} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 via-[#1e3a7b] to-brand text-white py-12 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(59,130,246,0.15),transparent_60%)] pointer-events-none" />
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3 relative">
          The Future of <span className="text-brand-light">Gadgets</span>
          <br />Delivered to You
        </h1>
        <p className="text-navy-400 text-base mb-6 relative">
          Premium tech at unbeatable prices — phones, laptops, wearables &amp; more
        </p>
        <div className="flex flex-wrap justify-center gap-8 mt-8 relative">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <strong className="block text-2xl font-extrabold text-white">{value}</strong>
              <span className="text-navy-400 text-xs">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <div className="bg-gradient-to-r from-navy-900 to-brand mx-6 mt-6 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-lg font-bold">🔥 Mega Tech Sale — Up to 40% Off</h2>
          <p className="text-navy-400 text-sm">Limited time. Free shipping on orders over $99.</p>
        </div>
        <a href="/deals" className="bg-white text-navy-900 font-bold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity flex-shrink-0">
          Grab the Deal
        </a>
      </div>

      {/* Category filter */}
      <div className="mt-4">
        <CategoryFilter active={category} onChange={setCategory} />
      </div>

      {/* Sort + count bar */}
      <div className="max-w-6xl mx-auto px-6 mt-4 flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-navy-400">
          <strong className="text-navy-900">{products.length}</strong> products
        </p>
        <div className="flex items-center gap-2 text-sm text-navy-400">
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-navy-200 rounded-lg px-3 py-1.5 text-sm text-navy-900 bg-white outline-none focus:border-brand"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Products */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <ProductGrid products={products} onAddToCart={handleAddToCart} />
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

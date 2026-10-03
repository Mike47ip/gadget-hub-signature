"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/shop/CartSidebar";
import StockBar from "@/components/ui/StockBar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import { useCart } from "@/hooks/useCart";
import { formatPrice, renderStars, formatNumber, savingsPercent, savingsDollar } from "@/lib/utils";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const { cart, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((d) => { setProduct(d.product ?? null); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setToast({ visible: true, message: `✅ ${product.name} added to cart!` });
  };

  if (loading) {
    return (
      <>
        <Navbar cartCount={0} onCartOpen={() => {}} />
        <div className="max-w-4xl mx-auto px-6 py-16 animate-pulse">
          <div className="bg-white rounded-2xl h-96" />
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar cartCount={totalItems} onCartOpen={() => setCartOpen(true)} />
        <div className="max-w-4xl mx-auto px-6 py-24 text-center text-navy-400">
          <p className="text-5xl mb-4">😕</p>
          <p className="text-xl font-bold mb-2">Product not found</p>
          <Button variant="primary" onClick={() => router.push("/")}>
            Back to Shop
          </Button>
        </div>
      </>
    );
  }

  const pct = savingsPercent(product.price, product.originalPrice);
  const saved = savingsDollar(product.price, product.originalPrice);

  return (
    <>
      <Navbar cartCount={totalItems} onCartOpen={() => setCartOpen(true)} />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-navy-400 mb-6 flex items-center gap-2">
          <button onClick={() => router.push("/")} className="hover:text-brand transition-colors">Home</button>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-navy-900 font-semibold truncate">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative h-72 md:h-auto bg-gradient-to-br from-navy-50 to-brand-pale flex items-center justify-center text-9xl">
              {product.isOnSale && pct > 0 && (
                <Badge variant="sale" className="absolute top-4 left-4">SAVE {pct}%</Badge>
              )}
              {product.isNew && (
                <Badge variant="new" className="absolute top-4 right-4">NEW</Badge>
              )}
              <span role="img" aria-label={product.name}>{product.emoji}</span>
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col gap-4">
              <div>
                <p className="text-xs text-navy-400 uppercase tracking-wider mb-1">{product.brand}</p>
                <h1 className="text-2xl font-extrabold text-navy-900">{product.name}</h1>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-2">
                <span className="text-amber-400">{renderStars(product.rating)}</span>
                <span className="text-sm text-navy-400">
                  {product.rating} ({formatNumber(product.reviewCount)} reviews)
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-sm text-navy-600 leading-relaxed">{product.description}</p>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-navy-900">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-base text-navy-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
                {saved > 0 && (
                  <span className="text-sm text-emerald-600 font-bold">Save {formatPrice(saved)}</span>
                )}
              </div>

              {/* Stock */}
              <StockBar stock={product.stock} totalStock={product.totalStock} />

              {/* CTA */}
              <Button
                fullWidth
                variant="secondary"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>

              <Button fullWidth variant="ghost" size="md" onClick={() => router.push("/")}>
                ← Continue Shopping
              </Button>
            </div>
          </div>
        </div>
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

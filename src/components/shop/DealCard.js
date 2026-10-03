"use client";

import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import StockBar from "@/components/ui/StockBar";
import { formatPrice, renderStars, formatNumber, savingsPercent, savingsDollar } from "@/lib/utils";

/**
 * DealCard — used on the deals page
 * @param {{ product: import('../../types/index').Product, onAddToCart: (product) => void }} props
 */
export default function DealCard({ product, onAddToCart }) {
  const pct = savingsPercent(product.price, product.originalPrice);
  const saved = savingsDollar(product.price, product.originalPrice);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col">
      {/* Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative h-40 bg-gradient-to-br from-navy-50 to-brand-pale flex items-center justify-center text-5xl cursor-pointer">
          {pct > 0 && (
            <Badge variant="sale" className="absolute top-2.5 right-2.5">
              SAVE {pct}%
            </Badge>
          )}
          <Badge variant="category" className="absolute top-2.5 left-2.5 capitalize">
            {product.category}
          </Badge>
          <span role="img" aria-label={product.name}>{product.emoji}</span>
        </div>
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="text-xs text-navy-400 uppercase tracking-wider">{product.brand}</p>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-bold text-navy-900 leading-snug hover:text-brand transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1.5 text-xs text-navy-400">
          <span className="text-amber-400">{renderStars(product.rating)}</span>
          <span>{product.rating} ({formatNumber(product.reviewCount)})</span>
        </div>

        {/* Pricing */}
        <div className="flex items-end gap-2">
          <span className="text-lg font-extrabold text-navy-900">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-navy-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
          {saved > 0 && (
            <span className="text-xs text-emerald-600 font-bold">You save {formatPrice(saved)}</span>
          )}
        </div>

        {/* Stock bar */}
        <StockBar stock={product.stock} totalStock={product.totalStock} />

        <Button
          fullWidth
          variant="primary"
          size="md"
          className="mt-1"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

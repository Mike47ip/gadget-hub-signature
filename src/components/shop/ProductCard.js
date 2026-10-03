"use client";

import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatPrice, renderStars, formatNumber, savingsPercent } from "@/lib/utils";

/**
 * ProductCard — used on the home page grid
 * @param {{ product: import('../../types/index').Product, onAddToCart: (product) => void }} props
 */
export default function ProductCard({ product, onAddToCart }) {
  const pct = savingsPercent(product.price, product.originalPrice);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col">
      {/* Image area */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-44 bg-gradient-to-br from-navy-50 to-brand-pale flex items-center justify-center text-6xl cursor-pointer">
          {product.isOnSale && pct > 0 && (
            <Badge variant="sale" className="absolute top-3 left-3">
              SALE
            </Badge>
          )}
          {product.isNew && (
            <Badge variant="new" className="absolute top-3 right-3">
              NEW
            </Badge>
          )}
          <span role="img" aria-label={product.name}>{product.emoji}</span>
        </div>
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-navy-400 uppercase tracking-wider mb-1">{product.brand}</p>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-bold text-navy-900 mb-1 leading-snug hover:text-brand transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-amber-400 text-xs">{renderStars(product.rating)}</span>
          <span className="text-xs text-navy-400">
            {product.rating} ({formatNumber(product.reviewCount)})
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-navy-100">
          <div>
            <span className="text-base font-bold text-navy-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-navy-400 line-through ml-1.5">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={() => onAddToCart(product)}
          >
            Add +
          </Button>
        </div>
      </div>
    </div>
  );
}

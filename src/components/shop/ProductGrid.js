import ProductCard from "./ProductCard";

/**
 * ProductGrid — renders a responsive grid of ProductCards
 * @param {{ products: import('../../types/index').Product[], onAddToCart: (product) => void }} props
 */
export default function ProductGrid({ products, onAddToCart }) {
  if (!products?.length) {
    return (
      <div className="col-span-full text-center py-16 text-navy-400">
        <p className="text-4xl mb-4">📦</p>
        <p className="text-lg font-semibold">No products found</p>
        <p className="text-sm mt-1">Try a different category or search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

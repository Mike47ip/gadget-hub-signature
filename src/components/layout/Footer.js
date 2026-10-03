import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-400 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-white font-bold text-lg mb-3">
              Gadget<span className="text-brand-light">Hub</span>
              <span className="text-xs text-navy-400 ml-1.5 font-normal">signature</span>
            </div>
            <p className="text-sm leading-relaxed">
              Premium tech at unbeatable prices. Phones, laptops, wearables &amp; more.
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/deals" className="hover:text-white transition-colors">Deals</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
              <li><Link href="/checkout" className="hover:text-white transition-colors">Checkout</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><span>Free shipping over $99</span></li>
              <li><span>30-day free returns</span></li>
              <li><span>24/7 customer support</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-navy-800 pt-6 text-xs text-center">
          © {new Date().getFullYear()} GadgetHub Signature. Built with Next.js + Prisma.
        </div>
      </div>
    </footer>
  );
}

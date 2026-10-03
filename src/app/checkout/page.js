"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  zip: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.zip.trim()) e.zip = "Required";
    if (form.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "16-digit card number required";
    if (form.expiry.length < 5) e.expiry = "MM/YY required";
    if (form.cvv.length < 3) e.cvv = "3-digit CVV required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (!cart.length) return;

    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          address: form.address,
          city: form.city,
          zip: form.zip,
          items: cart.map((item) => ({ id: item.id, quantity: item.quantity, price: item.price })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setOrderId(data.order.id);
      clearCart();
      setSuccess(true);
    } catch (err) {
      alert("Order failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ name, label, type = "text", placeholder, maxLength, half = false }) => (
    <div className={half ? "" : "col-span-2 md:col-span-2"}>
      <label className="block text-xs font-semibold text-navy-600 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors font-outfit ${
          errors[name] ? "border-red-400 focus:border-red-500" : "border-navy-200 focus:border-brand"
        }`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-0.5">{errors[name]}</p>}
    </div>
  );

  return (
    <>
      <Navbar cartCount={totalItems} onCartOpen={() => {}} />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-extrabold text-navy-900 mb-6">Checkout</h1>

        {success ? (
          <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-extrabold text-navy-900 mb-2">Order Placed!</h2>
            <p className="text-navy-400 text-sm mb-1">
              Order #{orderId} confirmed. You&apos;ll receive a confirmation email shortly.
            </p>
            <p className="text-navy-400 text-sm mb-8">
              Your gadgets are on their way!
            </p>
            <Button variant="primary" size="lg" onClick={() => router.push("/")}>
              Continue Shopping
            </Button>
          </div>
        ) : cart.length === 0 ? (
          <div className="bg-white rounded-2xl border border-navy-100 shadow-sm py-16 text-center text-navy-400">
            <p className="text-5xl mb-4">🛒</p>
            <p className="font-semibold mb-4">Your cart is empty</p>
            <Button variant="primary" onClick={() => router.push("/")}>Start Shopping</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Form */}
            <form onSubmit={handleSubmit} className="md:col-span-2 space-y-5">
              <div className="bg-white rounded-xl border border-navy-100 shadow-sm p-5">
                <h2 className="font-bold text-navy-900 mb-4">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Field name="firstName" label="First Name" placeholder="John" half />
                  <Field name="lastName" label="Last Name" placeholder="Doe" half />
                  <div className="col-span-2">
                    <Field name="email" label="Email" type="email" placeholder="you@email.com" />
                  </div>
                  <div className="col-span-2">
                    <Field name="address" label="Address" placeholder="123 Main St" />
                  </div>
                  <Field name="city" label="City" placeholder="New York" half />
                  <Field name="zip" label="ZIP Code" placeholder="10001" half />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-navy-100 shadow-sm p-5">
                <h2 className="font-bold text-navy-900 mb-4">Payment Details</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Field
                      name="cardNumber"
                      label="Card Number"
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                    />
                  </div>
                  <Field name="expiry" label="Expiry" placeholder="MM/YY" maxLength={5} half />
                  <Field name="cvv" label="CVV" placeholder="123" maxLength={3} half />
                </div>
                <p className="text-xs text-navy-400 mt-3 flex items-center gap-1.5">
                  🔒 Your payment info is encrypted and secure.
                </p>
              </div>

              <Button
                type="submit"
                fullWidth
                variant="secondary"
                size="lg"
                disabled={loading}
              >
                {loading ? "Placing Order..." : `Place Order — ${formatPrice(totalPrice)}`}
              </Button>
            </form>

            {/* Summary sidebar */}
            <div className="bg-white rounded-xl border border-navy-100 shadow-sm p-5 h-fit sticky top-20">
              <h2 className="font-bold text-navy-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 text-sm">
                    <span className="text-xl">{item.emoji}</span>
                    <span className="flex-1 truncate text-navy-700">{item.name}</span>
                    <span className="text-navy-400 text-xs">×{item.quantity}</span>
                    <span className="font-semibold text-navy-900">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-navy-100 pt-3 space-y-1.5 text-sm text-navy-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-semibold">
                    {totalPrice >= 99 ? "Free" : formatPrice(9.99)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-navy-900 text-base pt-1 border-t border-navy-100">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice >= 99 ? totalPrice : totalPrice + 9.99)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

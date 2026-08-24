"use client";
import { useState, FormEvent } from "react";
import { MessageCircle, Loader2, CheckCircle2, Truck, ShieldCheck, ArrowRight, ShoppingBag, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/lib/api";
import type { Order } from "@/types/database";

export default function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const { items, total, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const [fields, setFields] = useState({
    customer_name: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });

  function set(key: string, val: string) {
    setFields((f) => ({ ...f, [key]: val }));
    setErrorMsg(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!fields.customer_name.trim() || !fields.city.trim() || !fields.address.trim()) {
      setErrorMsg("Please fill in your Name, City, and Delivery Address.");
      return;
    }

    const cleanPhone = fields.phone.replace(/[\s-]/g, "");
    const phoneRegex = /^(03\d{9}|\+923\d{9})$/;
    if (!phoneRegex.test(cleanPhone)) {
      setErrorMsg("Please enter a valid Pakistani mobile number (e.g. 03241234567 or +923241234567).");
      return;
    }

    if (items.length === 0) {
      setErrorMsg("Your cart is empty. Please add items to order.");
      return;
    }

    setLoading(true);

    try {
      const order = await createOrder({
        customer_name: fields.customer_name.trim(),
        phone: cleanPhone,
        city: fields.city.trim(),
        address: fields.notes.trim()
          ? `${fields.address.trim()} (Note: ${fields.notes.trim()})`
          : fields.address.trim(),
        items,
        total_amount: total,
      });

      setConfirmedOrder(order);
      clear();
    } catch (err: unknown) {
      console.error("Order submission error:", err);
      const msg = err instanceof Error ? err.message : "Failed to place order. Please try again.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }

  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923240917740";

  // ─── Order Success Confirmation Screen ───────────────────────────────────
  if (confirmedOrder) {
    const orderNum = confirmedOrder.order_number || confirmedOrder.id;
    const waText = encodeURIComponent(
      `Assalam-o-Alaikum Jungle Gold! I just placed Order #${orderNum} on the website.\n` +
      `Name: ${confirmedOrder.customer_name}\n` +
      `Total: Rs. ${Number(confirmedOrder.total_amount).toLocaleString()}\n` +
      `Please let me know when it dispatches.`
    );

    return (
      <div className="flex flex-col gap-5 text-center py-4 animate-in fade-in zoom-in-95 duration-300">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center text-green-400 shadow-lg shadow-green-950/50">
          <CheckCircle2 size={36} />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-gold font-bold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
            Order #{orderNum} Confirmed
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream mt-3">
            Thank You, {confirmedOrder.customer_name}!
          </h3>
          <p className="text-cream/70 text-xs sm:text-sm mt-2 max-w-sm mx-auto leading-relaxed">
            Your Cash on Delivery order has been received. Our dispatch team will contact you at{" "}
            <span className="text-gold font-semibold">{confirmedOrder.phone}</span> to verify shipment.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-gold/20 text-left space-y-3">
          <div className="flex justify-between items-center text-xs text-cream/60 border-b border-white/10 pb-2">
            <span>Delivery To:</span>
            <span className="font-semibold text-cream">{confirmedOrder.city}</span>
          </div>
          <p className="text-xs text-cream/80 line-clamp-2">{confirmedOrder.address}</p>

          <div className="border-t border-white/10 pt-2 space-y-1.5">
            {confirmedOrder.items?.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs text-cream/75">
                <span>{item.quantity}x {item.title} ({item.size})</span>
                <span className="text-gold font-medium">Rs. {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gold/20 pt-2 flex justify-between items-center">
            <span className="text-xs font-bold text-cream">Total Payable (COD):</span>
            <span className="font-serif text-lg font-bold text-gold">
              Rs. {Number(confirmedOrder.total_amount).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-2">
          <a
            href={`https://api.whatsapp.com/send?phone=${wa}&text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-all hover:scale-[1.02] shadow-md shadow-green-950/40"
          >
            <MessageCircle size={18} />
            <span>Chat on WhatsApp (Optional)</span>
          </a>

          <button
            onClick={onSuccess}
            className="w-full border border-gold/30 hover:border-gold/60 text-cream/80 hover:text-cream font-semibold py-3 rounded-xl transition-all text-xs sm:text-sm"
          >
            Continue Browsing
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 text-[11px] text-cream/50 pt-2">
          <span className="flex items-center gap-1"><Truck size={13} className="text-gold" /> 2-4 Days Delivery</span>
          <span className="flex items-center gap-1"><ShieldCheck size={13} className="text-gold" /> 100% Pure Guarantee</span>
        </div>
      </div>
    );
  }

  // ─── Direct Checkout Form ────────────────────────────────────────────────
  const inputCls =
    "w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-3 text-cream placeholder:text-cream/35 text-sm focus:outline-none focus:border-gold/70 focus:bg-white/10 transition-all";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-cream">Customer & Delivery Info</h3>
          <p className="text-cream/50 text-xs">Fill in your address for direct home delivery.</p>
        </div>
        <span className="flex items-center gap-1 text-[11px] bg-gold/15 text-gold px-2.5 py-1 rounded-full font-bold border border-gold/30">
          <Truck size={12} /> Cash on Delivery
        </span>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-medium">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Full Name */}
      <div>
        <label className="text-cream/70 text-xs font-semibold block mb-1">
          Full Name <span className="text-gold">*</span>
        </label>
        <input
          required
          type="text"
          placeholder="e.g. Muhammad Abdullah"
          value={fields.customer_name}
          onChange={(e) => set("customer_name", e.target.value)}
          className={inputCls}
        />
      </div>

      {/* Mobile Number */}
      <div>
        <label className="text-cream/70 text-xs font-semibold block mb-1">
          Mobile / WhatsApp Number <span className="text-gold">*</span>
        </label>
        <div className="relative">
          <input
            required
            type="tel"
            placeholder="03XXXXXXXXX"
            value={fields.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={inputCls + " pl-10"}
          />
          <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/40" />
        </div>
        <p className="text-cream/40 text-[10px] mt-1">Our team will call / WhatsApp to confirm delivery.</p>
      </div>

      {/* City */}
      <div>
        <label className="text-cream/70 text-xs font-semibold block mb-1">
          City <span className="text-gold">*</span>
        </label>
        <input
          required
          type="text"
          placeholder="e.g. Lahore, Karachi, Islamabad, Gujrat..."
          value={fields.city}
          onChange={(e) => set("city", e.target.value)}
          className={inputCls}
        />
      </div>

      {/* Delivery Address */}
      <div>
        <label className="text-cream/70 text-xs font-semibold block mb-1">
          Complete Delivery Address <span className="text-gold">*</span>
        </label>
        <textarea
          required
          rows={2}
          placeholder="House #, Street #, Sector / Area / Landmark"
          value={fields.address}
          onChange={(e) => set("address", e.target.value)}
          className={inputCls + " resize-none"}
        />
      </div>

      {/* Optional Note */}
      <div>
        <label className="text-cream/50 text-[11px] block mb-1">
          Delivery Notes / Instructions (Optional)
        </label>
        <input
          type="text"
          placeholder="e.g. Call before delivery, deliver after 2 PM"
          value={fields.notes}
          onChange={(e) => set("notes", e.target.value)}
          className={inputCls}
        />
      </div>

      {/* Payment & Total Summary */}
      <div className="p-3.5 sm:p-4 glass-card rounded-xl border border-gold/20 space-y-2">
        <div className="flex justify-between items-center text-xs text-cream/70">
          <span>Payment Method</span>
          <span className="font-semibold text-green-400 flex items-center gap-1">
            <Truck size={13} /> Cash on Delivery (COD)
          </span>
        </div>
        <div className="flex justify-between items-center text-xs text-cream/70">
          <span>Delivery Charges</span>
          <span className="font-semibold text-gold">FREE Nationwide</span>
        </div>
        <div className="border-t border-white/10 pt-2 flex justify-between items-center">
          <span className="text-sm font-bold text-cream">Grand Total</span>
          <span className="font-serif text-2xl font-bold text-gold">Rs. {total.toLocaleString()}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-gold-prominent font-extrabold py-4 rounded-xl shadow-2xl disabled:opacity-60 flex items-center justify-center gap-2 text-base sm:text-lg cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Placing Order...
          </>
        ) : (
          <>
            <span>Confirm &amp; Place Order (COD)</span>
            <ArrowRight size={18} />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-4 text-[11px] text-cream/40 pt-1">
        <span className="flex items-center gap-1"><ShieldCheck size={13} className="text-gold" /> PCSIR Certified</span>
        <span className="flex items-center gap-1"><ShoppingBag size={13} className="text-gold" /> Rs. 50,000 Purity Guarantee</span>
      </div>
    </form>
  );
}

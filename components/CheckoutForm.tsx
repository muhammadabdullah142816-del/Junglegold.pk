"use client";
import { useState, FormEvent } from "react";
import { MessageCircle, Loader2, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/lib/api";

type SocialChannel = "whatsapp" | "instagram" | "facebook";

function InstagramIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const { items, total, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState<SocialChannel>("whatsapp");
  const [copied, setCopied] = useState(false);
  const [fields, setFields] = useState({
    customer_name: "",
    phone: "",
    city: "",
    address: "",
  });

  function set(key: string, val: string) {
    setFields((f) => ({ ...f, [key]: val }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    // Validation
    if (!fields.customer_name.trim() || !fields.city.trim() || !fields.address.trim()) {
      return alert("Please fill in all required fields.");
    }
    const phoneRegex = /^(03\d{9}|\+923\d{9})$/;
    if (!phoneRegex.test(fields.phone.replace(/\s/g, ""))) {
      return alert("Please enter a valid Pakistani phone number (e.g. 03001234567).");
    }

    setLoading(true);

    try {
      await createOrder({
        customer_name: fields.customer_name,
        phone: fields.phone,
        city: fields.city,
        address: fields.address,
        items,
        total_amount: total,
      });
    } catch (err: unknown) {
      if (err instanceof Error) console.error(err);
    }

    // Build order summary message
    const lineItems = items
      .map((i) => `• ${i.title} (${i.size}) x${i.quantity} — Rs. ${(i.price * i.quantity).toLocaleString()}`)
      .join("\n");

    const orderText = 
      `🍯 *New Order — Jungle Gold*\n` +
      `Customer: ${fields.customer_name}\n` +
      `Phone: ${fields.phone}\n` +
      `City: ${fields.city}\n` +
      `Address: ${fields.address}\n\n` +
      `*Items:*\n${lineItems}\n\n` +
      `*Total: Rs. ${total.toLocaleString()}*\n` +
      `Payment: Cash on Delivery`;

    const encodedMsg = encodeURIComponent(orderText);

    // Channel specific actions
    const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923240917740";
    const ig = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "junglegold.pk";
    const fb = process.env.NEXT_PUBLIC_FACEBOOK_PAGE || "junglegold.pk";

    let targetUrl = "";

    if (channel === "whatsapp") {
      targetUrl = `https://api.whatsapp.com/send?phone=${wa}&text=${encodedMsg}`;
    } else if (channel === "instagram") {
      try {
        await navigator.clipboard.writeText(orderText);
        setCopied(true);
      } catch {
        // fallback
      }
      targetUrl = `https://ig.me/m/${ig}`;
    } else if (channel === "facebook") {
      try {
        await navigator.clipboard.writeText(orderText);
        setCopied(true);
      } catch {
        // fallback
      }
      targetUrl = `https://m.me/${fb}`;
    }

    setTimeout(() => {
      window.location.href = targetUrl;
    }, 150);

    clear();
    setLoading(false);
    onSuccess();
  }

  const inputCls =
    "w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-3 text-cream placeholder:text-cream/35 text-base sm:text-sm focus:outline-none focus:border-gold/60 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4">
      <h3 className="font-serif text-lg font-bold text-cream">Delivery Details</h3>
      
      <input 
        required 
        placeholder="Full Name" 
        value={fields.customer_name} 
        onChange={(e) => set("customer_name", e.target.value)} 
        className={inputCls} 
      />
      <input 
        required 
        type="tel" 
        placeholder="Phone Number (e.g. 03001234567)" 
        value={fields.phone} 
        onChange={(e) => set("phone", e.target.value)} 
        className={inputCls} 
      />
      <input 
        required 
        placeholder="City" 
        value={fields.city} 
        onChange={(e) => set("city", e.target.value)} 
        className={inputCls} 
      />
      <textarea 
        required 
        rows={3} 
        placeholder="Full Delivery Address" 
        value={fields.address} 
        onChange={(e) => set("address", e.target.value)} 
        className={inputCls + " resize-none"} 
      />

      {/* Select Channel */}
      <div>
        <label className="text-cream/70 text-xs font-semibold uppercase tracking-wider block mb-2">
          Select Order Channel
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setChannel("whatsapp")}
            className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border text-xs font-bold transition-all ${
              channel === "whatsapp"
                ? "bg-green-600/30 border-green-500 text-green-400 shadow-lg shadow-green-900/30"
                : "bg-white/5 border-gold/10 text-cream/60 hover:border-gold/30"
            }`}
          >
            <MessageCircle size={18} className="mb-1 text-green-400" />
            WhatsApp
          </button>

          <button
            type="button"
            onClick={() => setChannel("instagram")}
            className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border text-xs font-bold transition-all ${
              channel === "instagram"
                ? "bg-pink-600/30 border-pink-500 text-pink-400 shadow-lg shadow-pink-900/30"
                : "bg-white/5 border-gold/10 text-cream/60 hover:border-gold/30"
            }`}
          >
            <InstagramIcon size={18} className="mb-1 text-pink-400" />
            Instagram
          </button>

          <button
            type="button"
            onClick={() => setChannel("facebook")}
            className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border text-xs font-bold transition-all ${
              channel === "facebook"
                ? "bg-blue-600/30 border-blue-500 text-blue-400 shadow-lg shadow-blue-900/30"
                : "bg-white/5 border-gold/10 text-cream/60 hover:border-gold/30"
            }`}
          >
            <FacebookIcon size={18} className="mb-1 text-blue-400" />
            Messenger
          </button>
        </div>
      </div>

      <div className="p-4 glass-card rounded-xl border border-gold/10">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-cream/60 text-xs">Order Total</p>
            <p className="font-serif text-2xl font-bold text-gold">Rs. {total.toLocaleString()}</p>
          </div>
          <span className="text-xs bg-gold/20 text-gold px-3 py-1 rounded-full font-semibold">
            Cash on Delivery
          </span>
        </div>
      </div>

      {copied && (
        <div className="flex items-center gap-2 p-3 bg-gold/10 border border-gold/30 rounded-xl text-gold text-xs">
          <CheckCircle2 size={16} />
          Order details copied to clipboard! Paste them in DM.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`flex items-center justify-center gap-2 font-bold py-4 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-60 text-white ${
          channel === "whatsapp"
            ? "bg-green-600 hover:bg-green-500 shadow-lg shadow-green-900/40"
            : channel === "instagram"
            ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 shadow-lg shadow-pink-900/40"
            : "bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/40"
        }`}
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : channel === "whatsapp" ? (
          <MessageCircle size={18} />
        ) : channel === "instagram" ? (
          <InstagramIcon size={18} />
        ) : (
          <FacebookIcon size={18} />
        )}
        Confirm via {channel === "whatsapp" ? "WhatsApp" : channel === "instagram" ? "Instagram DM" : "Facebook Messenger"}
      </button>

      <p className="text-cream/40 text-xs text-center">
        ⚡ Instant automated routing. Your order will be confirmed directly in chat.
      </p>
    </form>
  );
}

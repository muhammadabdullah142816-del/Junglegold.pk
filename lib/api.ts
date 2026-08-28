import { supabase } from "./supabase";
import type { Order, Product, ProductVariant, CreateOrderPayload, Operator, LegacyMilestone } from "@/types/database";

// ─── Security Helpers ────────────────────────────────────────────────────────

/** Strip HTML tags and trim whitespace to prevent XSS injection */
function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, "").replace(/[<>"'`;]/g, "").trim();
}

/** Validate Pakistan phone format: 03XXXXXXXXX or +923XXXXXXXXX */
const PK_PHONE_REGEX = /^(03\d{9}|\+923\d{9})$/;

export function isPlaceholderConfig(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!url || url.includes("placeholder") || url.includes("YOUR_")) return true;
  if (!anonKey || anonKey.includes("placeholder") || anonKey.includes("YOUR_")) return true;
  if (serviceKey && (serviceKey.includes("placeholder") || serviceKey.includes("YOUR_"))) return true;

  return false;
}

export function getSupabaseConnectionStatus() {
  const isPlaceholder = isPlaceholderConfig();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  return {
    isConnected: !isPlaceholder,
    url: isPlaceholder ? "Local Dev Mode" : url.replace(/^https?:\/\//, "").split("/")[0],
    mode: isPlaceholder ? "Local Dev (Mock Store)" : "Live Supabase",
  };
}

// ─── Default Product Catalog (4 Multi-Flower Size Cards) ────────────────────

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "prod-multi-125g",
    title: "Wild Forest Multi-Flower Honey — 125g",
    description: "100% pure raw wild forest honey in compact 125g jar. Rich in live bee pollen and natural active enzymes from Margalla & Skardu blossoms.",
    images: [
      "https://jaqvvehsroxfvdavqdvy.supabase.co/storage/v1/object/public/product-images/product-1787175084414-te5v48.jpg",
      "https://jaqvvehsroxfvdavqdvy.supabase.co/storage/v1/object/public/product-images/product-1787175096212-0gm1wj.jpg",
      "https://jaqvvehsroxfvdavqdvy.supabase.co/storage/v1/object/public/product-images/product-1787175125769-jfukvs.jpg",
      "/products.jpg",
    ],
    variants: [
      { id: "var-125g", size: "125g", price: 350, in_stock: true },
    ],
    created_at: "2026-08-18T17:04:15.577Z",
  },
  {
    id: "prod-multi-250g",
    title: "Wild Forest Multi-Flower Honey — 250g",
    description: "100% pure raw wild forest honey in classic 250g jar. Cold-extracted, unfiltered organic sweetness for daily wellness and immunity.",
    images: [
      "https://jaqvvehsroxfvdavqdvy.supabase.co/storage/v1/object/public/product-images/product-1787177451524-njyy1h.jpg",
      "https://jaqvvehsroxfvdavqdvy.supabase.co/storage/v1/object/public/product-images/product-1787177495450-xhe9za.jpg",
      "https://jaqvvehsroxfvdavqdvy.supabase.co/storage/v1/object/public/product-images/product-1787177511056-00xbsh.jpg",
      "/products.jpg",
    ],
    variants: [
      { id: "var-250g", size: "250g", price: 700, in_stock: true },
    ],
    created_at: "2026-08-19T22:12:05.066Z",
  },
  {
    id: "prod-multi-500g",
    title: "Wild Forest Multi-Flower Honey — 500g",
    description: "100% pure raw wild forest honey in family 500g jar. Unpasteurized and packed with authentic floral aroma and active antioxidants.",
    images: [
      "https://jaqvvehsroxfvdavqdvy.supabase.co/storage/v1/object/public/product-images/product-1787206276027-xml245.jpg",
      "https://jaqvvehsroxfvdavqdvy.supabase.co/storage/v1/object/public/product-images/product-1787206301359-ldibuu.jpg",
      "https://jaqvvehsroxfvdavqdvy.supabase.co/storage/v1/object/public/product-images/product-1787206343781-g1fkj.jpg",
      "/products.jpg",
    ],
    variants: [
      { id: "var-500g", size: "500g", price: 1400, in_stock: true },
    ],
    created_at: "2026-08-20T06:13:04.045Z",
  },
  {
    id: "prod-multi-1kg",
    title: "Wild Forest Multi-Flower Honey — 1kg",
    description: "100% pure raw wild forest honey in premium 1kg bulk jar (Best Value). Untreated, unheated honey harvested straight from wild hives.",
    images: [
      "https://jaqvvehsroxfvdavqdvy.supabase.co/storage/v1/object/public/product-images/product-1787207453493-aunrlq.jpg",
      "https://jaqvvehsroxfvdavqdvy.supabase.co/storage/v1/object/public/product-images/product-1787207475938-err98.jpg",
      "https://jaqvvehsroxfvdavqdvy.supabase.co/storage/v1/object/public/product-images/product-1787207489705-wgjyva.jpg",
      "/products.jpg",
    ],
    variants: [
      { id: "var-1kg", size: "1kg", price: 2800, in_stock: true },
    ],
    created_at: "2026-08-20T06:33:38.512Z",
  },
];

const MOCK_PRODUCTS: Product[] = DEFAULT_PRODUCTS;

const MOCK_OPERATORS: Operator[] = [
  {
    id: "op-1",
    name: "Master Beekeeper Tariq",
    role: "Head Harvester & Apiary Master",
    description: "30+ years of traditional wild honey harvesting in Swat & Karak valleys.",
    image_url: "/harvest.jpg",
    created_at: new Date().toISOString(),
  },
  {
    id: "op-2",
    name: "Dr. Salman Riaz",
    role: "Quality & Purity Director",
    description: "Ensures every batch meets international lab standards for zero-adulteration purity.",
    image_url: "/hero-jar.jpg",
    created_at: new Date().toISOString(),
  },
];

const MOCK_LEGACY: LegacyMilestone[] = [
  {
    id: "leg-1",
    year_or_date: "1995",
    title: "First Wild Harvest in Swat",
    description: "Our family started harvesting unrefined wild Sidr honey using traditional sustainable climbing techniques.",
    image_url: "/harvest.jpg",
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "leg-2",
    year_or_date: "2020",
    title: "Jungle Gold Brand Launch",
    description: "Transitioned from local supply to direct-to-consumer premium organic honey brand across Pakistan.",
    image_url: "/products.jpg",
    display_order: 2,
    created_at: new Date().toISOString(),
  },
];

const MOCK_ORDERS: Order[] = [
  {
    id: "ord-1001",
    order_number: 1001,
    customer_name: "Ali Hassan",
    phone: "03001234567",
    city: "Lahore",
    address: "Gulberg III, Block B, House 12",
    items: [{ id: "prod-sidr-01", title: "Raw Wild Sidr (Beri) Honey", size: "200ml", price: 2200, quantity: 2 }],
    total_amount: 4400,
    status: "Pending",
    created_at: new Date().toISOString(),
  },
];

// In-memory caches for newly created items during local testing without live DB
let localProductsStore: Product[] = [...MOCK_PRODUCTS];
let localOperatorsStore: Operator[] = [...MOCK_OPERATORS];
let localLegacyStore: LegacyMilestone[] = [...MOCK_LEGACY];
let localOrdersStore: Order[] = [...MOCK_ORDERS];

// Products
export function addLocalProduct(product: Product) {
  localProductsStore = [product, ...localProductsStore.filter((p) => p.id !== product.id)];
}
export function updateLocalProduct(id: string, payload: Partial<Product>) {
  localProductsStore = localProductsStore.map((p) => (p.id === id ? { ...p, ...payload } : p));
}
export function deleteLocalProduct(id: string) {
  localProductsStore = localProductsStore.filter((p) => p.id !== id);
}

// Operators
export function addLocalOperator(operator: Operator) {
  localOperatorsStore = [operator, ...localOperatorsStore.filter((o) => o.id !== operator.id)];
}
export function updateLocalOperator(id: string, payload: Partial<Operator>) {
  localOperatorsStore = localOperatorsStore.map((o) => (o.id === id ? { ...o, ...payload } : o));
}
export function deleteLocalOperator(id: string) {
  localOperatorsStore = localOperatorsStore.filter((o) => o.id !== id);
}

// Legacy Milestones
export function addLocalLegacy(milestone: LegacyMilestone) {
  localLegacyStore = [...localLegacyStore.filter((m) => m.id !== milestone.id), milestone].sort(
    (a, b) => a.display_order - b.display_order
  );
}
export function updateLocalLegacy(id: string, payload: Partial<LegacyMilestone>) {
  localLegacyStore = localLegacyStore
    .map((m) => (m.id === id ? { ...m, ...payload } : m))
    .sort((a, b) => a.display_order - b.display_order);
}
export function deleteLocalLegacy(id: string) {
  localLegacyStore = localLegacyStore.filter((m) => m.id !== id);
}

// Orders
export function updateLocalOrderStatus(id: string, status: Order["status"]) {
  localOrdersStore = localOrdersStore.map((o) => (o.id === id ? { ...o, status } : o));
}

// ─── Order Creation (Public Storefront) ──────────────────────────────────────

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const cleanPayload = {
    customer_name: sanitize(payload.customer_name),
    phone: payload.phone.replace(/\s/g, ""),
    city: sanitize(payload.city),
    address: sanitize(payload.address),
    items: payload.items,
    total_amount: 0,
  };

  if (!cleanPayload.customer_name || !cleanPayload.city || !cleanPayload.address) {
    throw new Error("Missing required fields: name, city, address");
  }

  if (!PK_PHONE_REGEX.test(cleanPayload.phone)) {
    throw new Error("Invalid phone number format. Use 03XXXXXXXXX or +923XXXXXXXXX");
  }

  if (!cleanPayload.items || cleanPayload.items.length === 0) {
    throw new Error("Cart is empty");
  }

  if (isPlaceholderConfig()) {
    const newOrder: Order = {
      id: "ord-" + Date.now(),
      order_number: Math.floor(1000 + Math.random() * 9000),
      ...cleanPayload,
      total_amount: cleanPayload.items.reduce((s, i) => s + i.price * i.quantity, 0),
      status: "Pending",
      created_at: new Date().toISOString(),
    };
    localOrdersStore = [newOrder, ...localOrdersStore];
    return newOrder;
  }

  const { data: products, error: productErr } = await supabase
    .from("products")
    .select("id, title, variants");

  if (productErr || !products || products.length === 0) {
    // If Supabase products table is empty, fall back to local mock products for total calculation
    let verifiedTotal = 0;
    for (const item of cleanPayload.items) {
      const product = localProductsStore.find((p) => p.id === item.id) || localProductsStore[0];
      const variant = product?.variants?.find((v) => v.size === item.size) || product?.variants?.[0];
      verifiedTotal += (variant?.price || item.price) * item.quantity;
    }
    cleanPayload.total_amount = verifiedTotal;
  } else {
    let verifiedTotal = 0;
    for (const item of cleanPayload.items) {
      const product = products.find((p) => p.id === item.id);
      if (product) {
        const variant = product.variants?.find((v: { size: string; price: number; in_stock: boolean }) => v.size === item.size);
        verifiedTotal += (variant?.price || item.price) * item.quantity;
      } else {
        verifiedTotal += item.price * item.quantity;
      }
    }
    cleanPayload.total_amount = verifiedTotal;
  }

  const { data, error } = await supabase
    .from("orders")
    .insert({ ...cleanPayload, status: "Pending" })
    .select()
    .single();

  if (error) {
    console.warn("Failed to create order on Supabase, using local fallback order:", error.message);
    const newOrder: Order = {
      id: "ord-" + Date.now(),
      order_number: Math.floor(1000 + Math.random() * 9000),
      ...cleanPayload,
      status: "Pending",
      created_at: new Date().toISOString(),
    };
    localOrdersStore = [newOrder, ...localOrdersStore];
    return newOrder;
  }

  return data as Order;
}

// ─── Resilience & Timeout Helper ───────────────────────────────────────────

/** Enforce maximum timeout on remote DB queries so user experience never lags or freezes */
async function withTimeout<T>(fn: () => Promise<T | null>, ms = 2500, fallback: T): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<T>((resolve) => {
    timeoutId = setTimeout(() => {
      console.warn(`[JungleGold Resilient DB] Remote DB query timed out after ${ms}ms, using instant cached fallback.`);
      resolve(fallback);
    }, ms);
  });

  return Promise.race([
    fn()
      .then((res) => {
        clearTimeout(timeoutId);
        return res ?? fallback;
      })
      .catch(() => fallback),
    timeoutPromise,
  ]);
}

// ─── Public Fetch Functions ──────────────────────────────────────────────────

export async function fetchOrders(): Promise<Order[]> {
  if (isPlaceholderConfig()) {
    return localOrdersStore;
  }
  return withTimeout(
    async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) return null;
      return data as Order[];
    },
    3000,
    localOrdersStore
  );
}

/**
 * Normalizes products returned from Supabase database to ensure:
 * 1. 4 distinct Multi-Flower Honey size cards are displayed (125g, 250g, 500g, 1kg) at Rs. 350, 700, 1400, 2800.
 * 2. Any Berry / Sidr cards are COMPLETELY removed as requested.
 * 3. 100% stable matching with DEFAULT_PRODUCTS so there is zero layout flicker.
 */
export function normalizeProducts(rawProducts: Product[]): Product[] {
  if (!rawProducts || rawProducts.length === 0) return DEFAULT_PRODUCTS;

  // Filter out any berry / sidr products completely
  const nonBerry = rawProducts.filter((p) => {
    const t = (p.title || "").toLowerCase();
    return !t.includes("sidr") && !t.includes("beri");
  });

  if (nonBerry.length === 0) return DEFAULT_PRODUCTS;

  const sizeConfigs: Record<number, { title: string; size: string; defaultImgs: string[] }> = {
    350: {
      title: "Wild Forest Multi-Flower Honey — 125g",
      size: "125g",
      defaultImgs: DEFAULT_PRODUCTS[0].images,
    },
    700: {
      title: "Wild Forest Multi-Flower Honey — 250g",
      size: "250g",
      defaultImgs: DEFAULT_PRODUCTS[1].images,
    },
    1400: {
      title: "Wild Forest Multi-Flower Honey — 500g",
      size: "500g",
      defaultImgs: DEFAULT_PRODUCTS[2].images,
    },
    2800: {
      title: "Wild Forest Multi-Flower Honey — 1kg",
      size: "1kg",
      defaultImgs: DEFAULT_PRODUCTS[3].images,
    },
  };

  const normalized: Product[] = [];
  const handledPrices = new Set<number>();

  nonBerry.forEach((p) => {
    const v = p.variants?.[0] || { size: "250g", price: 700, in_stock: true };
    const price = v.price || 700;
    const config = sizeConfigs[price];

    if (config) {
      handledPrices.add(price);
      normalized.push({
        id: p.id,
        title: config.title,
        description: p.description || DEFAULT_PRODUCTS.find((d) => d.variants[0].price === price)?.description || "",
        images: p.images && p.images.length > 0 ? p.images : config.defaultImgs,
        variants: [
          {
            id: v.id || `var-${config.size}`,
            size: config.size,
            price: price,
            in_stock: v.in_stock ?? true,
          },
        ],
        created_at: p.created_at || new Date().toISOString(),
      });
    }
  });

  // Ensure all 4 standard sizes exist
  DEFAULT_PRODUCTS.forEach((def) => {
    const defPrice = def.variants[0].price;
    if (!handledPrices.has(defPrice)) {
      normalized.push(def);
    }
  });

  // Sort ascending by price: 350 (125g) -> 700 (250g) -> 1400 (500g) -> 2800 (1kg)
  normalized.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));

  return normalized;
}

export async function fetchProducts(): Promise<Product[]> {
  if (isPlaceholderConfig()) {
    return DEFAULT_PRODUCTS;
  }
  return withTimeout(
    async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) return DEFAULT_PRODUCTS;
      return normalizeProducts(data as Product[]);
    },
    2500,
    DEFAULT_PRODUCTS
  );
}

export async function fetchOperators(): Promise<Operator[]> {
  if (isPlaceholderConfig()) {
    return localOperatorsStore;
  }
  return withTimeout(
    async () => {
      const { data, error } = await supabase
        .from("operators")
        .select("*")
        .order("created_at", { ascending: true });

      if (error || !data || data.length === 0) return null;
      return data as Operator[];
    },
    2500,
    localOperatorsStore
  );
}

export async function fetchLegacyMilestones(): Promise<LegacyMilestone[]> {
  if (isPlaceholderConfig()) {
    return localLegacyStore;
  }
  return withTimeout(
    async () => {
      const { data, error } = await supabase
        .from("legacy_milestones")
        .select("*")
        .order("display_order", { ascending: true });

      if (error || !data || data.length === 0) return null;
      return data as LegacyMilestone[];
    },
    2500,
    localLegacyStore
  );
}

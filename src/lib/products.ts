import { supabase } from "@/lib/supabaseClient";
import { DbProduct } from "@/lib/types";

export const staticProducts: DbProduct[] = [
  {
    id: "draven-sig-tee",
    name: "Draven Signature Heavyweight Tee",
    price: 3800,
    description: "240GSM luxury tight-knit cotton tee. Holds its boxy shape wash after wash.",
    image_url: "/cat-men.jpg",
    category: "Men",
    stock: 25,
  },
  {
    id: "onyx-box-tee",
    name: "Onyx Premium Box Tee",
    price: 3500,
    description: "Classic boxy silhouette streetwear tee. Pre-shrunk tight knit luxury styling.",
    image_url: "/hero.jpg",
    category: "Men",
    stock: 40,
  },
  {
    id: "phantom-relaxed-tee",
    name: "Phantom Relaxed Tee",
    price: 3200,
    description: "Premium relaxed fit luxury tee tailored specifically for fluid comfort.",
    image_url: "/cat-women.jpg",
    category: "Women",
    stock: 15,
  },
  {
    id: "classic-legacy-tee",
    name: "Classic Legacy Tee",
    price: 2900,
    description: "Classic everyday basic cotton tee engineered for durability and breathability.",
    image_url: "/cat-men.jpg",
    category: "Men",
    stock: 30,
  },
  {
    id: "draven-crop-hoodie",
    name: "Draven Cropped Hoodie",
    price: 4800,
    description: "Premium heavy tight-knit cotton cropped hoodie with minimal stitch lines.",
    image_url: "/cat-women.jpg",
    category: "Women",
    stock: 12,
  },
  {
    id: "nomad-heavy-cargo",
    name: "Nomad Heavy Cargo",
    price: 5200,
    description: "Structured utility cargo pants with double knee reinforcement panels.",
    image_url: "/hero.jpg",
    category: "Men",
    stock: 8,
  }
];

/**
 * Fetch all products from Supabase products table
 */
export async function getDbProducts(): Promise<DbProduct[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data && data.length > 0 ? data : staticProducts;
  } catch (err) {
    console.warn("Error fetching products from Supabase, falling back to local data:", err);
    return staticProducts;
  }
}

/**
 * Fetch a single product by ID from Supabase products table
 */
export async function getDbProductById(id: string): Promise<DbProduct | null> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw error;
    }
    return data;
  } catch (err) {
    console.warn(`Error fetching product ${id} from Supabase, checking local fallback:`, err);
    return staticProducts.find((p) => p.id === id) || null;
  }
}

/**
 * Fetch products by category from Supabase products table
 */
export async function getDbProductsByCategory(
  category: string
): Promise<DbProduct[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data && data.length > 0 ? data : staticProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  } catch (err) {
    console.warn(`Error fetching products for category ${category} from Supabase, checking local fallback:`, err);
    return staticProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }
}

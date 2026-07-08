import { supabase } from "@/lib/supabaseClient";
import { DbProduct } from "@/lib/types";

/**
 * Fetch all products from Supabase products table
 */
export async function getDbProducts(): Promise<DbProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products from Supabase:", error);
    throw error;
  }

  return data || [];
}

/**
 * Fetch a single product by ID from Supabase products table
 */
export async function getDbProductById(id: string): Promise<DbProduct | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // PGRST116 is postgrest error for 0 rows returned when using .single()
      return null;
    }
    console.error(`Error fetching product ${id} from Supabase:`, error);
    throw error;
  }

  return data;
}

/**
 * Fetch products by category from Supabase products table
 */
export async function getDbProductsByCategory(
  category: string
): Promise<DbProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error fetching products for category ${category} from Supabase:`, error);
    throw error;
  }

  return data || [];
}

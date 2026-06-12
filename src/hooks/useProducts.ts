"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import { LOCAL_PRODUCTS } from "@/lib/products-data";

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const supabase = getSupabaseClient();
        let query = supabase.from("products").select("*");

        if (category && category !== "all") {
          query = query.eq("category", category);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        // Use local data if Supabase returned nothing
        if (!data || data.length === 0) {
          let local = LOCAL_PRODUCTS;
          if (category && category !== "all") {
            local = local.filter((p) => p.category === category);
          }
          setProducts(local);
        } else {
          setProducts(data);
        }
      } catch (err) {
        // On any error, fall back to local data
        let local = LOCAL_PRODUCTS;
        if (category && category !== "all") {
          local = local.filter((p) => p.category === category);
        }
        setProducts(local);
        setError(
          err instanceof Error ? err.message : "Failed to fetch products",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  return { products, loading, error };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const supabase = getSupabaseClient();
        const { data, error: fetchError } = await supabase
          .from("products")
          .select("*")
          .eq("slug", slug)
          .single();

        if (fetchError) throw fetchError;

        if (data) {
          setProduct(data);
        } else {
          // Fall back to local data
          const local = LOCAL_PRODUCTS.find((p) => p.slug === slug) || null;
          setProduct(local);
        }
      } catch (err) {
        // Fall back to local data on any error
        const local = LOCAL_PRODUCTS.find((p) => p.slug === slug) || null;
        setProduct(local);
        setError(
          err instanceof Error ? err.message : "Failed to fetch product",
        );
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return { product, loading, error };
}

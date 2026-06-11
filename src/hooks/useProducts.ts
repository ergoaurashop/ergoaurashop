"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        let query = supabase.from("products").select("*");

        if (category && category !== "all") {
          query = query.eq("category", category);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setProducts(data || []);
      } catch (err) {
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
        const { data, error: fetchError } = await supabase
          .from("products")
          .select("*")
          .eq("slug", slug)
          .single();

        if (fetchError) throw fetchError;
        setProduct(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch product",
        );
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchProduct();
  }, [slug]);

  return { product, loading, error };
}

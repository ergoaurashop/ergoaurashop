"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPredictiveSearch, type PredictiveSearchProduct } from "@/lib/search/actions";
import { formatPrice } from "@/lib/formatters";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PredictiveSearchProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setIsSearching(true);
        const res = await getPredictiveSearch(query);
        setResults(res);
        setIsSearching(false);
        setShowDropdown(true);
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleLinkClick = () => {
    setShowDropdown(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative flex-1 w-full z-50">
      <form onSubmit={handleSubmit} className="relative flex items-center w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setShowDropdown(true);
          }}
          placeholder="What are you looking for?"
          className="w-full h-11 pl-11 pr-4 text-sm bg-[#f1f2f4] rounded-md focus:outline-none focus:bg-white focus:ring-1 focus:ring-ergo-navy transition-colors placeholder:text-gray-500"
          autoComplete="off"
        />
        <div className="absolute left-3.5 text-gray-400 pointer-events-none flex items-center justify-center">
          {isSearching ? (
            <div className="w-5 h-5 border-[2px] border-gray-300 border-t-ergo-navy rounded-full animate-spin" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          )}
        </div>
      </form>

      {/* Dropdown Menu */}
      {showDropdown && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden z-50 flex flex-col max-h-[70vh]">
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wide">
            Products
          </div>
          <div className="overflow-y-auto">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.handle}`}
                onClick={handleLinkClick}
                className="flex items-center gap-3 p-3 hover:bg-slate-50 border-b border-gray-50 last:border-0 transition-colors"
                prefetch={false}
              >
                <div className="w-12 h-12 relative flex-shrink-0 bg-gray-100 rounded border border-gray-200 overflow-hidden">
                  {product.featuredImage ? (
                    <Image
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <svg className="w-6 h-6 m-auto mt-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col justify-center flex-1 pr-2">
                  <span className="text-sm font-semibold text-ergo-text line-clamp-1">{product.title}</span>
                  <span className="text-ergo-orange text-xs font-bold mt-0.5">
                    {formatPrice(product.priceRange.minVariantPrice)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <button 
            onClick={handleSubmit}
            className="w-full py-3 text-center text-sm font-bold text-ergo-navy bg-gray-50 hover:bg-gray-100 transition-colors border-t border-gray-100"
          >
            View all results for &quot;{query}&quot;
          </button>
        </div>
      )}
      
      {showDropdown && query.trim().length >= 2 && results.length === 0 && !isSearching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-50 p-6 text-center">
          <p className="text-gray-500 font-medium">No results found for &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  );
}

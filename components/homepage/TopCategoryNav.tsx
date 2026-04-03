import Link from 'next/link';

export function TopCategoryNav() {
  const categories = [
    { name: "Home page", emoji: "🏠", href: "/" },
    { name: "Flash Sale", emoji: "⚡", href: "/collections/flash-sale" },
    { name: "Today's Offers", emoji: "🔥", href: "/collections/todays-offers" },
    { name: "New Arrivals", emoji: "✨", href: "/collections/new-arrivals" },
    { name: "Best Sellers", emoji: "⭐", href: "/collections/best-sellers" },
    { name: "Special Offers", emoji: "🎯", href: "/collections/special-offers" },
    { name: "Extra Offers", emoji: "💥", href: "/collections/extra-offers" },
    { name: "For Men", emoji: "👨", href: "/collections/for-men" },
    { name: "For Women", emoji: "👩", href: "/collections/for-women" },
    { name: "Electronics", emoji: "🔌", href: "/collections/electronics" },
  ];

  return (
    <div className="w-full bg-white py-4 md:py-6 border-b border-ergo-border">
      <div className="flex overflow-x-auto snap-x scrollbar-hide gap-4 md:gap-8 max-w-7xl mx-auto px-4 sm:px-6">
        {categories.map((cat, idx) => (
          <Link key={idx} href={cat.href} className="flex flex-col items-center flex-shrink-0 snap-start group min-w-[72px]">
            <div className="w-16 h-16 rounded-full bg-ergo-surface flex items-center justify-center text-3xl border border-ergo-border group-hover:border-ergo-navy transition-colors">
              {cat.emoji}
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-center mt-2 group-hover:text-ergo-navy transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

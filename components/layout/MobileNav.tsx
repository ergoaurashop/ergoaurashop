"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart/useCart";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
  },
  {
    name: "Search",
    href: "/search",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    ),
  },
  {
    name: "Deals",
    href: "/deals",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
        />
      </svg>
    ),
  },
  {
    name: "Cart",
    href: "#cart",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
    ),
  },
  {
    name: "Account",
    href: "/account",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    ),
  },
];

export function MobileNav() {
  const pathname = usePathname();
  const { totalQuantity, openCart } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-ergo-border md:hidden safe-area-pb">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const isCart = item.name === "Cart";

          return (
            <div key={item.name} className="relative flex flex-col items-center">
              {isCart ? (
                <button
                  onClick={openCart}
                  className="relative flex flex-col items-center justify-center w-12 h-12 text-ergo-text hover:text-ergo-navy-deep transition-colors"
                >
                  <div
                    className={`${
                      isActive ? "text-ergo-navy-deep" : "text-ergo-muted"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`text-[10px] mt-0.5 ${
                      isActive
                        ? "text-ergo-navy-deep font-semibold"
                        : "text-ergo-muted font-medium"
                    }`}
                  >
                    {item.name}
                  </span>
                  {totalQuantity > 0 && (
                    <span className="absolute top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-ergo-orange text-[9px] font-bold text-white">
                      {totalQuantity}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-ergo-navy-deep" />
                  )}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="relative flex flex-col items-center justify-center w-12 h-12 text-ergo-text hover:text-ergo-navy-deep transition-colors"
                  prefetch={false}
                >
                  <div
                    className={`${
                      isActive ? "text-ergo-navy-deep" : "text-ergo-muted"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`text-[10px] mt-0.5 ${
                      isActive
                        ? "text-ergo-navy-deep font-semibold"
                        : "text-ergo-muted font-medium"
                    }`}
                  >
                    {item.name}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-ergo-navy-deep" />
                  )}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

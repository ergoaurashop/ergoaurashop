"use client";

import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "ded_licensed"
  | "made_in_uae"
  | "wasleen_choice"
  | "super_deal"
  | "discount"
  | "installation_included"
  | "warranty_5year"
  | "dubai_climate"
  | "outline"
  // Legacy aliases for backward compatibility
  | "error"
  | "success"
  | "info";

export type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
  /** Optional icon override — displayed before children */
  icon?: React.ReactNode;
}
const variantStyles: Record<string, string> = {
  ded_licensed: "bg-gradient-to-r from-[#C9A962] to-[#DFC48A] text-[#1A1614]",
  made_in_uae: "bg-[#059669] text-white",
  wasleen_choice: "bg-[#000] text-[#C9A962] border border-[#C9A962]",
  super_deal:
    "bg-gradient-to-r from-red-600 to-red-500 text-white animate-pulse",
  discount: "bg-[#EF4444] text-white",
  installation_included: "bg-[#D97706] text-white",
  warranty_5year: "bg-[#1E40AF] text-white",
  dubai_climate: "bg-[#E4C89E] text-[#1A1614]",
  outline: "border border-[#D8CFBF] text-[#86868B]",
  // Legacy aliases
  error: "bg-[#EF4444] text-white",
  success: "bg-[#059669] text-white",
  info: "bg-[#C9A962] text-[#1A1614]",
};
const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-1 text-xs rounded-sm",
  md: "px-3 py-1.5 text-sm rounded-md",
  lg: "px-4 py-2 text-base rounded-lg",
};

/** Icon map for badge variants that have default icons */
export const BADGE_ICONS: Record<string, string> = {
  ded_licensed: "\u{1F3DB}\uFE0F",
  made_in_uae: "\u{1F1E6}\u{1F1EA}",
  wasleen_choice: "\u2B50",
  super_deal: "\u{1F525}",
  installation_included: "\u{1F527}",
  warranty_5year: "\u{1F6E1}\uFE0F",
  dubai_climate: "\u2600\uFE0F",
};

const DEFAULT_ICONS: Record<string, React.ReactNode> = {
  ded_licensed: <span className="mr-1">🏛️</span>,
  made_in_uae: <span className="mr-1">🇦🇪</span>,
  wasleen_choice: <span className="mr-1">⭐</span>,
  super_deal: <span className="mr-1">🔥</span>,
  installation_included: <span className="mr-1">🔧</span>,
  warranty_5year: <span className="mr-1">🛡️</span>,
  dubai_climate: <span className="mr-1">☀️</span>,
};

export default function Badge({
  variant = "outline",
  size = "sm",
  children,
  className,
  icon,
}: BadgeProps) {
  const showIcon =
    icon !== undefined
      ? icon
      : variant !== "discount" && variant !== "outline"
        ? DEFAULT_ICONS[variant] || null
        : null;

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold",
        "transition-transform duration-200 hover:-translate-y-[2px] hover:shadow-md",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {showIcon}
      {children}
    </span>
  );
}

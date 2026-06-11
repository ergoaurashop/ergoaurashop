"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "discount" | "success" | "error" | "info" | "outline";
  children: React.ReactNode;
  className?: string;
}

const variants = {
  discount: "bg-apple-error text-apple-white",
  success: "bg-apple-success text-white",
  error: "bg-apple-error text-apple-white",
  info: "bg-apple-accent text-apple-white",
  outline: "border border-apple-border text-apple-text-secondary",
};

export default function Badge({
  variant = "outline",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-semibold px-2 py-1 rounded-md",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

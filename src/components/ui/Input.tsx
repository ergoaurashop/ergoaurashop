"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefix?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, prefix, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-apple-text-primary mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {prefix && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-apple-text-secondary text-sm select-none">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full px-4 py-3 rounded-apple-input border border-apple-border",
              "bg-apple-white text-apple-text-primary",
              "placeholder:text-apple-text-secondary/60",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-apple-accent/30 focus:border-apple-accent",
              prefix && "pl-14",
              error &&
                "border-apple-error focus:ring-apple-error/30 focus:border-apple-error",
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-apple-error">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;

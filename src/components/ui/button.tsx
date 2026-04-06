"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200",
          {
            "gradient-bg text-black hover:opacity-90 hover:-translate-y-0.5": variant === "primary",
            "bg-bg-elevated text-text border border-white/10 hover:border-white/20": variant === "secondary",
            "border border-white/15 text-text-dim hover:text-text hover:border-white/30 bg-transparent": variant === "outline",
            "text-text-dim hover:text-text bg-transparent": variant === "ghost",
            "bg-danger text-white hover:opacity-90": variant === "danger",
          },
          {
            "px-4 py-1.5 text-sm": size === "sm",
            "px-6 py-2.5 text-sm": size === "md",
            "px-8 py-3.5 text-base": size === "lg",
          },
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };

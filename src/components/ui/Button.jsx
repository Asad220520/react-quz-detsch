// src/components/ui/Button.jsx
import React from "react";
import { cls } from "../../lib/utils";

export default function Button({
  children,
  className = "",
  variant = "default", // default | primary | outline | ghost | danger | success
  size = "lg", // sm | md | lg | icon
  loading = false,
  disabled,
  type = "button",
  ...props
}) {
  const base =
    "inline-flex min-w-0 select-none items-center justify-center gap-2 " +
    "rounded-xl border font-extrabold transition active:translate-y-px " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 " +
    "focus-visible:ring-offset-0 disabled:opacity-60 disabled:pointer-events-none";

  const sizes = {
    sm: "h-10 px-3 text-sm",
    md: "h-12 px-4 text-base",
    lg: "h-14 px-5 text-base",
    icon: "h-12 w-12 p-0",
  };

  // Светлая/тёмная тема учитывается через dark:
  const variants = {
    default: cls(
      // light
      "bg-black/5 text-black border-black/10 hover:bg-black/10",
      // dark
      "dark:bg-white/10 dark:text-white dark:border-white/10 dark:hover:bg-white/15"
    ),
    primary: cls(
      // light
      "bg-blue-600 text-white border-blue-700 hover:bg-blue-500",
      // dark — твой полупрозрачный градиент
      "dark:bg-gradient-to-b dark:from-blue-500/40 dark:to-blue-500/25 dark:text-white dark:border-blue-400/50",
      // мягкий «ореол» как у тебя
      "shadow-[0_0_0_4px_rgba(99,102,241,0.15)]"
    ),
    outline: cls(
      "bg-transparent text-black border-black/15 hover:bg-black/5",
      "dark:text-white dark:border-white/15 dark:hover:bg-white/10"
    ),
    ghost: cls(
      "bg-transparent text-black border-transparent hover:bg-black/5",
      "dark:text-white dark:hover:bg-white/10"
    ),
    danger: cls(
      "bg-rose-600 text-white border-rose-700 hover:bg-rose-500",
      "dark:bg-gradient-to-b dark:from-rose-500/40 dark:to-rose-500/25 dark:border-rose-400/50"
    ),
    success: cls(
      "bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-500",
      "dark:bg-gradient-to-b dark:from-emerald-500/40 dark:to-emerald-500/25 dark:border-emerald-400/50"
    ),
  };

  return (
    <button
      type={type}
      className={cls(base, sizes[size], variants[variant], className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {/* спиннер при loading */}
      {loading && (
        <svg
          className={cls(
            "animate-spin",
            size === "sm" ? "size-4" : "size-5",
            variant === "default" ||
              variant === "outline" ||
              variant === "ghost"
              ? "text-black dark:text-white"
              : "text-white"
          )}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            opacity="0.25"
          />
          <path
            d="M22 12a10 10 0 0 1-10 10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      )}
      <span className={cls(loading && "opacity-0")}>{children}</span>
    </button>
  );
}

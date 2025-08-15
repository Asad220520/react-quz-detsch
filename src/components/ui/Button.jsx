import React from "react";
import { cls } from "../../lib/utils";

export default function Button({
  children,
  className = "",
  variant = "default",
  ...props
}) {
  const base =
    "inline-flex h-14 min-w-0 items-center justify-center gap-2 rounded-xl " +
    "border px-4 font-extrabold active:translate-y-px transition disabled:opacity-60 " +
    "focus:outline-none focus:ring-0"; // на всякий, чтобы ring не «перекрывал» бордер визуально

  const variants = {
    // не задаём цвет бордера тут — пусть будет прозрачный
    default:
      "border-transparent bg-white/10 backdrop-blur-sm text-white hover:bg-white/15",
    // у primary можно оставить собственный, он не используется в MC/TF
    primary:
      "border-blue-400/50 bg-gradient-to-b from-blue-500/40 to-blue-500/25 shadow-[0_0_0_4px_rgba(99,102,241,0.15)]",
  };

  return (
    <button className={cls(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

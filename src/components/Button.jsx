// src/components/Button.jsx
import React from "react";

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-full " +
    "transition-colors duration-200 focus:outline-none " +
    "focus:ring-2 focus:ring-[#B90007] focus:ring-offset-2 focus:ring-offset-black " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#B90007] text-white shadow-[0_0_18px_rgba(185,0,7,0.9)] " +
      "hover:bg-[#e01515] hover:shadow-[0_0_26px_rgba(185,0,7,1)]",
    outline:
      "bg-transparent text-[#ffb4b4] border border-[#B90007] " +
      "hover:bg-[#B90007] hover:text-white shadow-[0_0_14px_rgba(185,0,7,0.7)]",
    ghost:
      "bg-transparent text-white hover:bg-white/5 hover:text-[#ff9a9a]",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
  };

  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;

  return (
    <button
      className={`${base} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

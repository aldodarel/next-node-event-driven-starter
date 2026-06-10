"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type GenericButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

const baseClassName =
  "inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

const variantClassNames = {
  primary:
    "bg-slate-950 text-slate-50 hover:bg-slate-800 focus:ring-slate-950",
  secondary:
    "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100 focus:ring-slate-400",
};

export function GenericButton({
  children,
  className = "",
  type = "button",
  variant = "primary",
  ...props
}: GenericButtonProps) {
  // Pola UI component: satu komponen generik dipakai lintas halaman agar variasi visual tetap konsisten.
  return (
    <button
      type={type}
      className={`${baseClassName} ${variantClassNames[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

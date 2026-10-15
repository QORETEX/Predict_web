import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTokens(amount: number): string {
  return new Intl.NumberFormat("en-GH").format(amount);
}

export function formatMultiplier(poolTotal: number, rake: number, sideTotal: number): string {
  if (sideTotal === 0) return "-.--";
  const multiplier = (poolTotal * (1 - rake)) / sideTotal;
  return multiplier.toFixed(2);
}

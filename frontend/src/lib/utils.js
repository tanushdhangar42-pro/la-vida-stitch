import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Joins CSS class names and removes Tailwind conflicts.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

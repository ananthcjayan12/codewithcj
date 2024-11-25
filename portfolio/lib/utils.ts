import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Layout utility classes
export const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
export const pageWrapper = "min-h-[calc(100vh-4rem)] mt-16 sm:mt-20"

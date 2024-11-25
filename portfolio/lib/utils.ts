import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Layout utility classes
export const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
export const pageWrapper = "min-h-[calc(100vh-4rem)] mt-16 sm:mt-20"
export const sectionHeading = "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
export const sectionSubHeading = "mt-4 text-lg sm:text-xl text-muted-foreground max-w-[65ch] leading-relaxed"

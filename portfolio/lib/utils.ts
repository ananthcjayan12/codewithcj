import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const container = "container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"

export const section = "py-16 sm:py-20 md:py-24 lg:py-32"

export const sectionHeading = "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6"

export const sectionSubHeading = "mt-4 text-lg sm:text-xl text-muted-foreground max-w-[65ch] leading-relaxed"

export const pageWrapper = "min-h-[calc(100vh-4rem)] mt-16 sm:mt-20 py-10 sm:py-16 md:py-24 lg:py-32"

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

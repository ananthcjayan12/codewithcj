"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      // Prevent scrolling when menu is open
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }

  const closeMenu = () => {
    setIsOpen(false)
    document.body.style.overflow = "unset"
  }

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="rounded-md p-2 hover:bg-accent"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
              onClick={closeMenu}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed right-0 top-0 h-full w-3/4 max-w-sm border-l bg-background p-6 shadow-lg"
            >
              <div className="flex flex-col space-y-6">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-foreground/80",
                      pathname === item.href
                        ? "text-foreground"
                        : "text-foreground/60"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
} 
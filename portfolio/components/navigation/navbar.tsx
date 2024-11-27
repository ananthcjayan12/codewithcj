"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll to update active section and navbar background
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background
      setScrolled(window.scrollY > 50);

      // Update active section
      const sections = links
        .map(link => link.href.split("#")[1])
        .filter(Boolean);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in viewport (with some offset)
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveHash(section);
            return;
          }
        }
      }

      // If we're at the top and no section is active, set home as active
      if (window.scrollY < 100) {
        setActiveHash("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" && !activeHash;
    }
    if (href.includes("#")) {
      return activeHash === href.split("#")[1];
    }
    return pathname.startsWith(href);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "backdrop-blur-lg bg-white/70" : "bg-transparent"
      )}
    >
      <nav className="px-4 h-20">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between h-full">
          <Link 
            href="/" 
            className={cn(
              "text-xl font-bold transition-colors duration-300",
              scrolled
                ? "bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900"
                : "text-gray-900"
            )}
          >
            CodeWithCJ
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => {
              const active = isActive(href);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm transition-all duration-300 relative",
                      active 
                        ? "text-gray-900" 
                        : scrolled 
                          ? "text-gray-600 hover:text-gray-900"
                          : "text-gray-700 hover:text-gray-900"
                    )}
                  >
                    {label}
                    {active && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className={cn(
                          "absolute inset-0 rounded-full -z-10",
                          scrolled ? "bg-gray-100" : "bg-white/80"
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button className="p-2 md:hidden">
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </nav>
    </header>
  );
} 
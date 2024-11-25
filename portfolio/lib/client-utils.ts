"use client"

import { useEffect } from "react"

export function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault()
  const targetId = href.replace('#', '')
  const elem = document.getElementById(targetId)
  
  if (elem) {
    elem.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    // Update URL without reload
    window.history.pushState({}, '', href)
  }
}

export function useScrollReveal() {
  useEffect(() => {
    const sections = document.querySelectorAll('section')
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in')
          entry.target.classList.add('animate-slide-up')
        }
      })
    }, {
      threshold: 0.1
    })

    sections.forEach(section => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])
} 
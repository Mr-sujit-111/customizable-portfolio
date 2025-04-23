"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { SettingsButton } from "@/components/settings/settings-button"
import { useSettings } from "@/contexts/settings-context"
import { useTranslation } from "@/lib/i18n"

const navItems = [
  { name: "header.home", href: "/" },
  { name: "header.about", href: "/#about" },
  { name: "header.skills", href: "/#skills" },
  { name: "header.projects", href: "/#projects" },
  { name: "header.experience", href: "/#experience" },
  { name: "header.services", href: "/#services" },
  { name: "header.portfolio", href: "/#portfolio" },
  { name: "header.blog", href: "/#blog" },
  { name: "header.contact", href: "/#contact" },
  { name: "resume.title", href: "/resume" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language } = useSettings()
  const { t } = useTranslation(language as any)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll function
  // Add proper type for the handleNavClick function
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a direct page link (not a hash), let the default behavior happen
    if (!href.includes("#")) return

    e.preventDefault()

    // If it's just the home link (#), scroll to top
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      setIsMobileMenuOpen(false)
      return
    }

    // Find the element to scroll to
    const element = document.querySelector(href.split("#")[1] ? `#${href.split("#")[1]}` : href)
    if (element) {
      // Get the header height to offset the scroll position
      const headerHeight = document.querySelector("header")?.offsetHeight || 0
      const elementPosition = element.getBoundingClientRect().top + window.scrollY

      // Scroll to the element with an offset for the header
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth",
      })

      // Close mobile menu if open
      setIsMobileMenuOpen(false)
    }
  }

  return (
    // Update the header background to ensure it's visible against all backgrounds
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-black/30 backdrop-blur-sm text-white"
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="text-xl md:text-2xl font-bold">
            Sujit Bhanderi
          </Link>

          {/* Desktop Navigation */}
          {/* Update the navigation links to ensure they're visible */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isScrolled ? "hover:bg-accent hover:text-accent-foreground" : "text-white hover:bg-white/10"
                  }`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {t(item.name)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            {/* <ModeToggle /> */}
            <SettingsButton />

            {/* Mobile Menu Button */}
            {/* Update the mobile menu button to be visible against all backgrounds */}
            <Button
              variant={isScrolled ? "ghost" : "outline"}
              size="icon"
              className={`md:hidden ${!isScrolled ? "text-white border-white/20 hover:bg-white/10" : ""}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {t(item.name)}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

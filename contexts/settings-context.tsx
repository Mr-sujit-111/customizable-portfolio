"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import type { LanguageCode } from "@/lib/i18n"

type FontOption = "inter" | "poppins" | "roboto" | "open-sans" | "lato" | "montserrat" | "raleway"
type FontSizeOption = "small" | "medium" | "large"
type LayoutModeOption = "boxed" | "full-width"
type TextDirectionOption = "ltr" | "rtl"
type SidebarPositionOption = "left" | "right"

interface AccessibilityOptions {
  highContrast: boolean
  reduceMotion: boolean
  increaseSpacing: boolean
}

interface SettingsContextType {
  // Theme
  theme: string
  setTheme: (theme: string) => void

  // Font
  font: FontOption
  setFont: (font: FontOption) => void
  fontSize: FontSizeOption
  setFontSize: (size: FontSizeOption) => void

  // Language
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void

  // Layout
  layoutMode: LayoutModeOption
  setLayoutMode: (mode: LayoutModeOption) => void
  textDirection: TextDirectionOption
  setTextDirection: (dir: TextDirectionOption) => void
  sidebarPosition: SidebarPositionOption
  setSidebarPosition: (pos: SidebarPositionOption) => void

  // Accessibility
  accessibility: AccessibilityOptions
  setAccessibilityOption: (option: keyof AccessibilityOptions, value: boolean) => void

  // Settings Panel
  isSettingsOpen: boolean
  setIsSettingsOpen: (open: boolean) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme: setNextTheme } = useTheme()

  // State for all settings
  const [font, setFont] = useState<FontOption>("inter")
  const [fontSize, setFontSize] = useState<FontSizeOption>("medium")
  const [language, setLanguage] = useState<LanguageCode>("en")
  const [layoutMode, setLayoutMode] = useState<LayoutModeOption>("full-width")
  const [textDirection, setTextDirection] = useState<TextDirectionOption>("ltr")
  const [sidebarPosition, setSidebarPosition] = useState<SidebarPositionOption>("left")
  const [accessibility, setAccessibility] = useState<AccessibilityOptions>({
    highContrast: false,
    reduceMotion: false,
    increaseSpacing: false,
  })
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  // Set theme wrapper
  const setTheme = (newTheme: string) => {
    setNextTheme(newTheme)
  }

  // Update accessibility option
  const setAccessibilityOption = (option: keyof AccessibilityOptions, value: boolean) => {
    setAccessibility((prev) => ({ ...prev, [option]: value }))
  }

  // Load settings from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadSettings = () => {
        // Font
        const savedFont = localStorage.getItem("portfolio-font")
        if (savedFont) setFont(savedFont as FontOption)

        // Font Size
        const savedFontSize = localStorage.getItem("portfolio-font-size")
        if (savedFontSize) setFontSize(savedFontSize as FontSizeOption)

        // Language
        const savedLanguage = localStorage.getItem("portfolio-language")
        if (savedLanguage) setLanguage(savedLanguage as LanguageCode)

        // Layout Mode
        const savedLayoutMode = localStorage.getItem("portfolio-layout-mode")
        if (savedLayoutMode) setLayoutMode(savedLayoutMode as LayoutModeOption)

        // Text Direction
        const savedTextDirection = localStorage.getItem("portfolio-text-direction")
        if (savedTextDirection) setTextDirection(savedTextDirection as TextDirectionOption)

        // Sidebar Position
        const savedSidebarPosition = localStorage.getItem("portfolio-sidebar-position")
        if (savedSidebarPosition) setSidebarPosition(savedSidebarPosition as SidebarPositionOption)

        // Accessibility
        const savedAccessibility = localStorage.getItem("portfolio-accessibility")
        if (savedAccessibility) setAccessibility(JSON.parse(savedAccessibility))
      }

      loadSettings()
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-font", font)
    }
  }, [font])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-font-size", fontSize)
    }
  }, [fontSize])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-language", language)
    }
  }, [language])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-layout-mode", layoutMode)
    }
  }, [layoutMode])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-text-direction", textDirection)
    }
  }, [textDirection])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-sidebar-position", sidebarPosition)
    }
  }, [sidebarPosition])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-accessibility", JSON.stringify(accessibility))
    }
  }, [accessibility])

  // Apply settings to document
  useEffect(() => {
    if (typeof document !== "undefined") {
      // Apply font
      document.body.className = document.body.className.replace(/font-\w+/, "")
      document.body.classList.add(`font-${font}`)

      // Apply font size
      document.documentElement.dataset.fontSize = fontSize

      // Apply text direction
      document.documentElement.dir = textDirection

      // Apply layout mode
      document.documentElement.dataset.layoutMode = layoutMode

      // Apply sidebar position
      document.documentElement.dataset.sidebarPosition = sidebarPosition

      // Apply accessibility options
      document.documentElement.dataset.highContrast = accessibility.highContrast.toString()
      document.documentElement.dataset.reduceMotion = accessibility.reduceMotion.toString()
      document.documentElement.dataset.increaseSpacing = accessibility.increaseSpacing.toString()

      if (accessibility.reduceMotion) {
        document.documentElement.style.setProperty("--reduce-motion", "reduce")
      } else {
        document.documentElement.style.setProperty("--reduce-motion", "no-preference")
      }
    }
  }, [font, fontSize, textDirection, layoutMode, sidebarPosition, accessibility])

  return (
    <SettingsContext.Provider
      value={{
        theme: theme || "system",
        setTheme,
        font,
        setFont,
        fontSize,
        setFontSize,
        language,
        setLanguage,
        layoutMode,
        setLayoutMode,
        textDirection,
        setTextDirection,
        sidebarPosition,
        setSidebarPosition,
        accessibility,
        setAccessibilityOption,
        isSettingsOpen,
        setIsSettingsOpen,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}

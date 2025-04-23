"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      storageKey="portfolio-theme"
      themes={["default", "purple", "green", "orange", "pink"]}
    >
      {children}
    </NextThemesProvider>
  )
}

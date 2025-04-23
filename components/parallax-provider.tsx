"use client"

import { type ReactNode, createContext, useContext } from "react"
import { type MotionValue, useScroll } from "framer-motion"

interface ParallaxContextType {
  scrollY: MotionValue<number>
}

const ParallaxContext = createContext<ParallaxContextType | null>(null)

export function useParallax() {
  const context = useContext(ParallaxContext)
  if (!context) {
    throw new Error("useParallax must be used within a ParallaxProvider")
  }
  return context
}

export function ParallaxProvider({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll()

  return <ParallaxContext.Provider value={{ scrollY }}>{children}</ParallaxContext.Provider>
}

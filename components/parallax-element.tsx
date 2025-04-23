"use client"

import { type ReactNode, useRef, useEffect, useState } from "react"
import { motion, useSpring, useTransform, useMotionValue, useInView } from "framer-motion"
import { useParallax } from "./parallax-provider"

interface ParallaxElementProps {
  children: ReactNode
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
  springConfig?: { stiffness: number; damping: number }
  rotateOnScroll?: boolean
  scale?: boolean
  depth?: number
  perspective?: number
  mouseTracking?: boolean
}

export function ParallaxElement({
  children,
  speed = 0.5,
  direction = "up",
  className = "",
  springConfig = { stiffness: 100, damping: 30 },
  rotateOnScroll = false,
  scale = false,
  depth = 0,
  perspective = 1000,
  mouseTracking = false,
}: ParallaxElementProps) {
  const { scrollY } = useParallax()
  const ref = useRef<HTMLDivElement>(null)
  const [transformValue, setTransformValue] = useState(0)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" })

  // Mouse tracking for 3D effect
  useEffect(() => {
    if (!mouseTracking || !ref.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()

      // Calculate position relative to the center of the element (-1 to 1)
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

      setMousePosition({ x, y })
    }

    const element = ref.current
    element.addEventListener("mousemove", handleMouseMove)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseTracking])

  // Reset mouse position when mouse leaves
  useEffect(() => {
    if (!mouseTracking || !ref.current) return

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 })
    }

    const element = ref.current
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [mouseTracking])

  // Parallax scrolling effect
  useEffect(() => {
    const updateTransformValue = () => {
      let newValue = 0
      switch (direction) {
        case "up":
          newValue = -scrollY.get() * speed
          break
        case "down":
          newValue = scrollY.get() * speed
          break
        case "left":
          newValue = -scrollY.get() * speed
          break
        case "right":
          newValue = scrollY.get() * speed
          break
        default:
          newValue = -scrollY.get() * speed
      }
      return newValue
    }

    const unsubscribe = scrollY.onChange(() => {
      setTransformValue(updateTransformValue())
    })

    setTransformValue(updateTransformValue())

    return () => unsubscribe()
  }, [scrollY, speed, direction])

  const smoothTransform = useSpring(transformValue, springConfig)

  // Calculate rotation based on scroll position
  const rotateX = useTransform(
    scrollY,
    [0, 1000],
    rotateOnScroll ? [0, direction === "up" || direction === "down" ? 10 : 0] : [0, 0],
  )

  const rotateY = useTransform(
    scrollY,
    [0, 1000],
    rotateOnScroll ? [0, direction === "left" || direction === "right" ? 10 : 0] : [0, 0],
  )

  // Scale effect
  const scaleValue = useTransform(scrollY, [0, 500, 1000], scale ? [1, 1.05, 1] : [1, 1, 1])

  // Mouse tracking rotation (3D effect)
  const mouseRotateX = useMotionValue(0)
  const mouseRotateY = useMotionValue(0)

  useEffect(() => {
    if (mouseTracking) {
      mouseRotateX.set(-mousePosition.y * 10) // Inverted for natural feel
      mouseRotateY.set(mousePosition.x * 10)
    } else {
      mouseRotateX.set(0)
      mouseRotateY.set(0)
    }
  }, [mousePosition, mouseTracking, mouseRotateX, mouseRotateY])

  // Combine all effects
  const style = {
    x: direction === "left" || direction === "right" ? smoothTransform : 0,
    y: direction === "up" || direction === "down" ? smoothTransform : 0,
    rotateX: mouseTracking ? mouseRotateX : rotateX,
    rotateY: mouseTracking ? mouseRotateY : rotateY,
    scale: scaleValue,
    z: depth,
    transformPerspective: perspective,
    opacity: isInView ? 1 : 0.3,
    transition: { opacity: { duration: 0.5 } },
  }

  return (
    <motion.div
      ref={ref}
      style={style}
      className={className}
      whileHover={mouseTracking ? { z: depth + 50 } : undefined}
    >
      {children}
    </motion.div>
  )
}

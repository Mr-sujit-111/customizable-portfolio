"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDownToLine, Github } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { ParallaxElement } from "./parallax-element"
import { useSettings } from "@/contexts/settings-context"
import { useTranslation } from "@/lib/i18n"
import Link from "next/link"

export function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Update the hero section to ensure header text is visible in all themes
  // Add a dark overlay to the background image and ensure text has proper contrast

  // In the background image section, update the opacity and add a stronger gradient overlay
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const { language } = useSettings()
  const { t } = useTranslation(language)

  // Floating animation variants
  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    },
  }

  // Staggered text animation
  const nameLetters = "Sujit Bhanderi".split("")

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Parallax Background with mouse movement */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: backgroundY,
          x: isHovering ? mousePosition.x : 0,
          scale: isHovering ? 1.05 : 1,
          transition: { scale: { duration: 0.8, ease: "easeOut" } },
        }}
      />

      {/* Animated particles overlay */}
      <div className="absolute inset-0 z-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Overlay with gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-10"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5], [0.7, 0.9]),
        }}
      />

      {/* Content */}
      <div className="container relative z-20 px-4 md:px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          style={{ y: textY, opacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ParallaxElement speed={0.2} direction="up" mouseTracking={true} perspective={1200}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 inline-block"
              whileHover={{ scale: 1.05, rotate: 1 }}
            >
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
                {t("hero.role")}
              </span>
            </motion.div>
          </ParallaxElement>

          <ParallaxElement speed={0.3} direction="up" rotateOnScroll={true}>
            <motion.div className="overflow-hidden">
              <motion.h1
                className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-white flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {nameLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.5 + index * 0.05,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      scale: 1.2,
                      color: "#60a5fa",
                      transition: { duration: 0.2 },
                    }}
                    className="inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>
          </ParallaxElement>

          <ParallaxElement speed={0.4} direction="up" scale={true}>
            <motion.p
              className="max-w-[800px] mx-auto text-xl md:text-2xl text-white/80 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{
                textShadow: "0 0 8px rgba(255,255,255,0.5)",
                color: "rgba(255,255,255,1)",
              }}
            >
              {t("hero.description")}
            </motion.p>
          </ParallaxElement>

          <ParallaxElement speed={0.5} direction="up" mouseTracking={true} depth={50}>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button size="lg" className="gap-2 text-lg px-6 relative overflow-hidden group" asChild>
                  <Link href="/resume">
                    <motion.span
                      className="absolute inset-0 bg-primary/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <ArrowDownToLine className="h-5 w-5 group-hover:animate-bounce" />
                    <span className="relative z-10">{t("hero.downloadResume")}</span>
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 text-lg px-6 bg-white/10 backdrop-blur-sm relative overflow-hidden group"
                  onClick={() => window.open("https://github.com/Mr-sujit-111", "_blank")}
                >
                  <motion.span
                    className="absolute inset-0 bg-white/10"
                    initial={{ scale: 0, borderRadius: "100%" }}
                    whileHover={{ scale: 1, borderRadius: "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <Github className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  <span className="relative z-10">{t("hero.exploreProjects")}</span>
                </Button>
              </motion.div>
            </motion.div>
          </ParallaxElement>
        </motion.div>
      </div>

      {/* Scroll Indicator with enhanced animation */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
      >
        <motion.div className="flex flex-col items-center gap-2" whileHover={{ scale: 1.1 }}>
          <motion.p
            className="text-white/70 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Scroll Down
          </motion.p>
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-3 bg-white rounded-full"
              animate={{
                y: [0, 10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

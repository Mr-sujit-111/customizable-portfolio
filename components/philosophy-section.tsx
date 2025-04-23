"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ParallaxElement } from "./parallax-element"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useSettings } from "@/contexts/settings-context"
import { useTranslation } from "@/lib/i18n"

const philosophyItems = [
  {
    title: "Fully Responsive Design",
    description: "Creating interfaces that work flawlessly across all device sizes",
    color: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-500",
  },
  {
    title: "Pixel-Perfect Implementation",
    description: "Meticulous attention to design details and specifications",
    color: "bg-purple-500/10 border-purple-500/20",
    iconColor: "text-purple-500",
  },
  {
    title: "Functional & Modernized UIs",
    description: "Building interfaces that are both beautiful and highly functional",
    color: "bg-green-500/10 border-green-500/20",
    iconColor: "text-green-500",
  },
  {
    title: "Cross-Browser Compatibility",
    description: "Ensuring consistent experiences across all modern browsers",
    color: "bg-orange-500/10 border-orange-500/20",
    iconColor: "text-orange-500",
  },
  {
    title: "Seamless Animated Experiences",
    description: "Adding thoughtful animations that enhance user experience",
    color: "bg-pink-500/10 border-pink-500/20",
    iconColor: "text-pink-500",
  },
  {
    title: "Timeline-Focused Delivery",
    description: "Committed to delivering high-quality work on schedule",
    color: "bg-cyan-500/10 border-cyan-500/20",
    iconColor: "text-cyan-500",
  },
]

export function PhilosophySection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const { language } = useSettings()
  const { t } = useTranslation(language as any)

  // 3D card effect for philosophy cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (hoveredCard !== index) return

    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    card.style.transform = `
      perspective(1000px)
      rotateY(${x * 15}deg)
      rotateX(${y * -15}deg)
      translateZ(20px)
    `
  }

  const resetCardTransform = (card: HTMLDivElement) => {
    card.style.transform = `
      perspective(1000px)
      rotateY(0deg)
      rotateX(0deg)
      translateZ(0px)
    `
  }

  return (
    <section ref={ref} className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <ParallaxElement speed={0.1} direction="up">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
        </ParallaxElement>
        <ParallaxElement speed={0.1} direction="down">
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
        </ParallaxElement>
        <ParallaxElement speed={0.2} direction="right" depth={30}>
          <motion.div
            className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-blue-500/5 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </ParallaxElement>
        <ParallaxElement speed={0.3} direction="left" depth={20}>
          <motion.div
            className="absolute bottom-1/3 -right-20 w-60 h-60 rounded-full bg-purple-500/5 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 2 }}
          />
        </ParallaxElement>

        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container px-4 md:px-6">
        <motion.div style={{ opacity }} className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <ParallaxElement speed={0.2} direction="up" mouseTracking={true} perspective={1200}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <motion.span
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium inline-block"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  {t("philosophy.title")}
                </motion.span>
                <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">{t("philosophy.heading")}</h2>
              </motion.div>
            </ParallaxElement>

            <ParallaxElement speed={0.3} direction="up" scale={true}>
              <motion.p
                className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {t("philosophy.description")}
              </motion.p>
            </ParallaxElement>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {philosophyItems.map((item, index) => (
              <ParallaxElement key={index} speed={0.1 * (index + 1)} direction="up">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={(e) => {
                    resetCardTransform(e.currentTarget)
                    setHoveredCard(null)
                  }}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  style={{ transition: "transform 0.2s ease-out" }}
                >
                  <Card
                    className={`h-full border ${item.color} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <motion.div
                          className="mt-1"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            scale: {
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                              delay: index * 0.3,
                            },
                            rotate: { type: "spring", stiffness: 400, damping: 10 },
                          }}
                        >
                          <Check className={`h-5 w-5 ${item.iconColor}`} />
                        </motion.div>
                        <div>
                          <motion.h3
                            className="text-lg font-semibold mb-2"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 * index + 0.3, duration: 0.5 }}
                          >
                            {item.title}
                          </motion.h3>
                          <motion.p
                            className="text-muted-foreground text-sm"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 * index + 0.4, duration: 0.5 }}
                          >
                            {item.description}
                          </motion.p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ParallaxElement>
            ))}
          </div>

          <ParallaxElement speed={0.2} direction="up">
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.p className="text-lg font-medium" whileHover={{ scale: 1.05 }}>
                {t("philosophy.poweredBy")}{" "}
                <motion.span
                  className="text-primary"
                  animate={{
                    color: ["hsl(var(--primary))", "hsl(var(--primary-foreground))", "hsl(var(--primary))"],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  Next.js, Tailwind CSS, Framer Motion, ShadCN UI
                </motion.span>
              </motion.p>
            </motion.div>
          </ParallaxElement>
        </motion.div>
      </div>
    </section>
  )
}

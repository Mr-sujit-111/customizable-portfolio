"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ParallaxElement } from "./parallax-element"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Layout, Smartphone, Gauge, LineChart, Layers, ArrowRight } from "lucide-react"
import { useSettings } from "@/contexts/settings-context"
import { useTranslation } from "@/lib/i18n"

const services = [
  {
    title: "Frontend Development",
    description:
      "Building responsive, performant, and accessible user interfaces with modern frameworks and libraries.",
    icon: Code,
    color: "bg-blue-500/10 border-blue-500/20 text-blue-500",
    features: [
      "React & Next.js Applications",
      "Responsive Web Design",
      "Progressive Web Apps",
      "Cross-browser Compatibility",
    ],
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive and engaging user experiences with a focus on usability and aesthetics.",
    icon: Layout,
    color: "bg-purple-500/10 border-purple-500/20 text-purple-500",
    features: ["User Interface Design", "Interaction Design", "Wireframing & Prototyping", "Design Systems"],
  },
  {
    title: "Mobile Development",
    description: "Developing cross-platform mobile applications with React Native for iOS and Android.",
    icon: Smartphone,
    color: "bg-green-500/10 border-green-500/20 text-green-500",
    features: ["React Native Apps", "Cross-platform Development", "Native Integrations", "App Store Deployment"],
  },
  {
    title: "Performance Optimization",
    description:
      "Improving application speed, responsiveness, and overall user experience through optimization techniques.",
    icon: Gauge,
    color: "bg-orange-500/10 border-orange-500/20 text-orange-500",
    features: [
      "Core Web Vitals Optimization",
      "Bundle Size Reduction",
      "Lazy Loading & Code Splitting",
      "Caching Strategies",
    ],
  },
  {
    title: "Data Visualization",
    description: "Transforming complex data into intuitive charts, graphs, and interactive visualizations.",
    icon: LineChart,
    color: "bg-pink-500/10 border-pink-500/20 text-pink-500",
    features: [
      "Interactive Dashboards",
      "Real-time Data Visualization",
      "Custom Chart Development",
      "D3.js & Chart.js Integration",
    ],
  },
  {
    title: "Frontend Architecture",
    description: "Designing scalable and maintainable frontend architectures for complex applications.",
    icon: Layers,
    color: "bg-cyan-500/10 border-cyan-500/20 text-cyan-500",
    features: ["Component Architecture", "State Management", "API Integration", "Testing Strategies"],
  },
]

export function ServicesSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const { language } = useSettings()
  const { t } = useTranslation(language as any)

  // 3D card effect for service cards
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
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden" id="services">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <ParallaxElement speed={0.2} direction="right" depth={30}>
          <motion.div
            className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </ParallaxElement>
        <ParallaxElement speed={0.3} direction="left" depth={20}>
          <motion.div
            className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl"
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
        <motion.div style={{ opacity }} className="max-w-6xl mx-auto">
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
                  Services
                </motion.span>
                <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">What I Offer</h2>
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
                Specialized frontend development services tailored to your project needs
              </motion.p>
            </ParallaxElement>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
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
                  <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div
                          className={`p-2 rounded-lg ${service.color}`}
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
                          <service.icon className="h-6 w-6" />
                        </motion.div>
                        <h3 className="text-xl font-bold">{service.title}</h3>
                      </div>

                      <p className="text-muted-foreground mb-4">{service.description}</p>

                      <ul className="space-y-2 mb-4">
                        {service.features.map((feature, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-2 text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 * index + 0.05 * i, duration: 0.5 }}
                          >
                            <motion.span
                              className={`text-primary mt-1`}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                                delay: i * 0.5,
                              }}
                            >
                              •
                            </motion.span>
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <motion.div
                        whileHover={{ scale: 1.05, x: 5 }}
                        className="flex items-center text-primary text-sm font-medium"
                      >
                        <span>Learn more</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ParallaxElement>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

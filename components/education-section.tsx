"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ParallaxElement } from "./parallax-element"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, Calendar } from "lucide-react"
import { useSettings } from "@/contexts/settings-context"
import { useTranslation } from "@/lib/i18n"

const education = [
  {
    degree: "Master of Computer Science",
    institution: "Stanford University",
    period: "2012-2014",
    description:
      "Specialized in Human-Computer Interaction and Frontend Engineering. Graduated with honors and completed thesis on 'Optimizing User Interfaces for Cognitive Accessibility'.",
    achievements: ["Dean's List", "4.0 GPA", "Research Assistant"],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
  },
  {
    degree: "Bachelor of Science in Information Technology",
    institution: "MIT",
    period: "2008-2012",
    description:
      "Focused on Web Development and User Experience Design. Participated in multiple hackathons and led the university's web development club.",
    achievements: ["Summa Cum Laude", "President of Web Dev Club", "Undergraduate Teaching Assistant"],
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
]

const certifications = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2022",
    icon: Award,
  },
  {
    name: "Google Professional Cloud Developer",
    issuer: "Google Cloud",
    date: "2021",
    icon: Award,
  },
  {
    name: "Advanced React & GraphQL",
    issuer: "Frontend Masters",
    date: "2020",
    icon: Award,
  },
  {
    name: "UI/UX Design Specialization",
    issuer: "Interaction Design Foundation",
    date: "2019",
    icon: Award,
  },
]

export function EducationSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const { language } = useSettings()
  const { t } = useTranslation(language as any)

  // 3D card effect for education cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (hoveredCard !== index) return

    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    card.style.transform = `
      perspective(1000px)
      rotateY(${x * 10}deg)
      rotateX(${y * -10}deg)
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
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-500/30"
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
                  {t("education.title")}
                </motion.span>
                <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">{t("education.heading")}</h2>
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
                {t("education.description")}
              </motion.p>
            </ParallaxElement>
          </div>

          {/* Education Timeline with 3D cards */}
          <div className="space-y-16 mb-20">
            {education.map((edu, index) => (
              <ParallaxElement key={index} speed={0.15 * (index + 1)} direction={index % 2 === 0 ? "left" : "right"}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={(e) => {
                    resetCardTransform(e.currentTarget)
                    setHoveredCard(null)
                  }}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  style={{ transition: "transform 0.2s ease-out" }}
                >
                  <Card className="overflow-hidden border-none shadow-lg">
                    <div className="grid md:grid-cols-2">
                      <div className="h-64 md:h-auto overflow-hidden">
                        <motion.img
                          src={edu.image || "/placeholder.svg"}
                          alt={edu.institution}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <CardContent className="p-8">
                        <motion.div
                          className="flex items-center gap-2 mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + 0.1 * index, duration: 0.5 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 500, damping: 10 }}
                          >
                            <GraduationCap className="h-5 w-5 text-primary" />
                          </motion.div>
                          <Badge variant="outline" className="text-sm font-medium py-1 px-3">
                            {edu.period}
                          </Badge>
                        </motion.div>
                        <motion.h3
                          className="text-2xl font-bold mb-1"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + 0.1 * index, duration: 0.5 }}
                        >
                          {edu.degree}
                        </motion.h3>
                        <motion.p
                          className="text-primary font-medium mb-4"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + 0.1 * index, duration: 0.5 }}
                        >
                          {edu.institution}
                        </motion.p>
                        <motion.p
                          className="text-muted-foreground mb-4"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + 0.1 * index, duration: 0.5 }}
                        >
                          {edu.description}
                        </motion.p>

                        <motion.h4
                          className="font-semibold mb-2"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.7 + 0.1 * index, duration: 0.5 }}
                        >
                          {t("education.achievements")}
                        </motion.h4>
                        <motion.ul
                          className="space-y-1"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8 + 0.1 * index, duration: 0.5 }}
                        >
                          {edu.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              className="flex items-start gap-2 text-sm"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.8 + 0.1 * index + 0.05 * i, duration: 0.5 }}
                            >
                              <motion.span
                                className="text-primary mt-1"
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
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              </ParallaxElement>
            ))}
          </div>

          {/* Certifications with floating animations */}
          <ParallaxElement speed={0.2} direction="up">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-card rounded-xl p-8 border shadow-md"
            >
              <motion.h3
                className="text-2xl font-bold mb-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {t("education.certifications")}
              </motion.h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index + 0.5, duration: 0.4 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    className="bg-muted/50 rounded-lg p-6 text-center border border-border/50 hover:shadow-md transition-all duration-300"
                  >
                    <motion.div
                      className="flex justify-center mb-4"
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        delay: index * 0.5,
                      }}
                    >
                      <motion.div className="bg-primary/10 p-3 rounded-full" whileHover={{ rotate: 10, scale: 1.1 }}>
                        <cert.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                    </motion.div>
                    <motion.h4
                      className="font-semibold mb-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 * index + 0.6, duration: 0.5 }}
                    >
                      {cert.name}
                    </motion.h4>
                    <motion.p
                      className="text-sm text-muted-foreground mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 * index + 0.7, duration: 0.5 }}
                    >
                      {cert.issuer}
                    </motion.p>
                    <motion.div
                      className="flex items-center justify-center gap-1 text-xs text-muted-foreground"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 * index + 0.8, duration: 0.5 }}
                    >
                      <Calendar className="h-3 w-3" />
                      <span>{cert.date}</span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ParallaxElement>
        </motion.div>
      </div>
    </section>
  )
}

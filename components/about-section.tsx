"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ParallaxElement } from "./parallax-element"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Layout, Lightbulb, Zap } from "lucide-react"
import { useSettings } from "@/contexts/settings-context"
import { useTranslation } from "@/lib/i18n"

export function AboutSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const { language } = useSettings()
  const { t } = useTranslation(language)

  const strengths = [
    {
      icon: Code,
      title: t("about.strength.technical.title"),
      description: t("about.strength.technical.description"),
    },
    {
      icon: Layout,
      title: t("about.strength.uiux.title"),
      description: t("about.strength.uiux.description"),
    },
    {
      icon: Zap,
      title: t("about.strength.performance.title"),
      description: t("about.strength.performance.description"),
    },
    {
      icon: Lightbulb,
      title: t("about.strength.problemSolving.title"),
      description: t("about.strength.problemSolving.description"),
    },
  ]

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden" id="about">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <ParallaxElement speed={0.2} direction="right">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        </ParallaxElement>
        <ParallaxElement speed={0.3} direction="left">
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </ParallaxElement>
      </div>

      <div className="container px-4 md:px-6">
        <motion.div style={{ opacity, scale }} className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <ParallaxElement speed={0.2} direction="up">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                  {t("about.title")}
                </span>
                <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">{t("about.heading")}</h2>
              </motion.div>
            </ParallaxElement>

            <ParallaxElement speed={0.3} direction="up">
              <motion.p
                className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {t("about.description")}
              </motion.p>
            </ParallaxElement>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {strengths.map((strength, index) => (
              <ParallaxElement key={index} speed={0.1 * (index + 1)} direction={index % 2 === 0 ? "left" : "right"}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <Card className="h-full border shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 bg-primary/10 p-3 rounded-lg">
                          <strength.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{strength.title}</h3>
                          <p className="text-muted-foreground">{strength.description}</p>
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
              className="mt-16 p-8 rounded-xl bg-muted/50 border border-border/50 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <blockquote className="text-xl italic text-muted-foreground">"{t("about.quote")}"</blockquote>
            </motion.div>
          </ParallaxElement>
        </motion.div>
      </div>
    </section>
  )
}

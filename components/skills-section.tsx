"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ParallaxElement } from "./parallax-element"
import { Progress } from "@/components/ui/progress"
import { useSettings } from "@/contexts/settings-context"
import { useTranslation } from "@/lib/i18n"

const skillCategories = [
  {
    name: "category.frontend",
    skills: [
      { name: "Next.js", level: 95 },
      { name: "React", level: 98 },
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "HTML5/CSS3", level: 98 },
    ],
  },
  {
    name: "category.ui",
    skills: [
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
      { name: "ShadCN UI", level: 90 },
      { name: "Material UI", level: 88 },
      { name: "Bootstrap", level: 92 },
    ],
  },
  {
    name: "category.state",
    skills: [
      { name: "Redux", level: 92 },
      { name: "Context API", level: 95 },
      { name: "Zustand", level: 85 },
      { name: "React Query", level: 88 },
      { name: "Git/GitHub", level: 90 },
    ],
  },
]

export function SkillsSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const { language } = useSettings()
  const { t } = useTranslation(language)

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden" id="skills">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <ParallaxElement speed={0.2} direction="left">
          <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </ParallaxElement>
        <ParallaxElement speed={0.3} direction="right">
          <div className="absolute bottom-1/4 -left-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl" />
        </ParallaxElement>
      </div>

      <div className="container px-4 md:px-6">
        <motion.div style={{ opacity }} className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <ParallaxElement speed={0.2} direction="up">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                  {t("skills.title")}
                </span>
                <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">{t("skills.heading")}</h2>
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
                {t("skills.description")}
              </motion.p>
            </ParallaxElement>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {skillCategories.map((category, categoryIndex) => (
              <ParallaxElement
                key={categoryIndex}
                speed={0.15 * (categoryIndex + 1)}
                direction={categoryIndex % 2 === 0 ? "left" : "right"}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * categoryIndex, duration: 0.5 }}
                  className="bg-card rounded-xl p-6 border shadow-sm"
                >
                  <h3 className="text-xl font-semibold mb-6">{t(`skills.${category.name}`)}</h3>
                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * skillIndex + 0.3 * categoryIndex, duration: 0.5 }}
                      >
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress
                          value={skill.level}
                          className="h-2"
                          indicatorClassName="bg-gradient-to-r from-primary to-primary/70"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </ParallaxElement>
            ))}

            <ParallaxElement speed={0.2} direction="up">
              <motion.div
                className="md:col-span-2 mt-8 p-8 rounded-xl bg-muted/50 border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4">{t("skills.additionalExpertise")}</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Webpack",
                    "Vite",
                    "Jest",
                    "Testing Library",
                    "Cypress",
                    "GraphQL",
                    "REST APIs",
                    "Responsive Design",
                    "Accessibility (a11y)",
                    "Performance Optimization",
                    "PWAs",
                    "Vercel",
                    "Netlify",
                    "CI/CD",
                    "Storybook",
                  ].map((skill, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.03 * index, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </ParallaxElement>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ParallaxElement } from "./parallax-element"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSettings } from "@/contexts/settings-context"
import { useTranslation } from "@/lib/i18n"

const experiences = [
  {
    role: "Lead Frontend Architect",
    company: "TechInnovate Solutions",
    period: "2021–Present",
    description:
      "Leading a team of 8 frontend developers in building enterprise-scale applications. Established coding standards, component libraries, and CI/CD pipelines that reduced development time by 40%. Implemented performance optimizations that improved load times by 65%.",
    achievements: [
      "Architected and delivered a complex SaaS platform serving 50,000+ daily users",
      "Reduced bundle size by 60% through code splitting and lazy loading strategies",
      "Mentored junior developers and conducted technical interviews",
      "Collaborated with UX team to create a design system used across all products",
    ],
    technologies: ["Next.js", "TypeScript", "React Query", "Redux", "Tailwind CSS", "Jest", "Cypress"],
  },
  {
    role: "Senior Frontend Developer",
    company: "Digital Dynamics Inc.",
    period: "2018–2021",
    description:
      "Led frontend development for multiple high-traffic web applications. Implemented responsive designs, state management solutions, and accessibility improvements. Collaborated with backend teams to design and consume RESTful APIs.",
    achievements: [
      "Rebuilt legacy application as a modern React SPA, improving user retention by 35%",
      "Implemented comprehensive test coverage that reduced production bugs by 80%",
      "Created reusable component library that accelerated development across teams",
      "Optimized rendering performance for data-heavy dashboards and visualizations",
    ],
    technologies: ["React", "Redux", "SCSS", "JavaScript", "Jest", "Webpack", "GraphQL"],
  },
  {
    role: "UI Engineer",
    company: "WebSphere Technologies",
    period: "2015–2018",
    description:
      "Developed responsive web interfaces for clients across various industries. Collaborated with designers to implement pixel-perfect UIs and ensure cross-browser compatibility. Created interactive prototypes for user testing.",
    achievements: [
      "Delivered 15+ client projects with 100% on-time completion rate",
      "Implemented mobile-first responsive designs that increased mobile conversions by 45%",
      "Developed custom JavaScript libraries for complex UI interactions",
      "Optimized asset delivery pipeline, reducing page load times by 30%",
    ],
    technologies: ["JavaScript", "HTML5", "CSS3", "jQuery", "Bootstrap", "Gulp", "LESS"],
  },
]

export function ExperienceSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const { language } = useSettings()
  const { t } = useTranslation(language)

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden" id="experience">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <ParallaxElement speed={0.2} direction="right">
          <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </ParallaxElement>
        <ParallaxElement speed={0.3} direction="left">
          <div className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl" />
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
                  {t("experience.title")}
                </span>
                <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">{t("experience.heading")}</h2>
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
                {t("experience.description")}
              </motion.p>
            </ParallaxElement>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {experiences.map((exp, index) => (
              <div key={index} className="mb-12 md:mb-24 relative">
                <ParallaxElement speed={0.15 * (index + 1)} direction={index % 2 === 0 ? "left" : "right"}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 * index, duration: 0.5 }}
                    className={`relative md:w-1/2 ${index % 2 === 0 ? "md:ml-auto md:pl-12" : "md:mr-auto md:pr-12"}`}
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute top-0 w-5 h-5 rounded-full border-4 border-background bg-primary ${
                        index % 2 === 0 ? "md:-left-2.5 left-0" : "md:-right-2.5 left-0"
                      }`}
                    />

                    {/* Date badge - absolute positioned for desktop */}
                    <div
                      className={`hidden md:block absolute top-0 ${
                        index % 2 === 0 ? "-left-32 text-right" : "-right-32 text-left"
                      }`}
                    >
                      <Badge variant="outline" className="text-sm font-medium py-1 px-3">
                        {exp.period}
                      </Badge>
                    </div>

                    <Card className="overflow-hidden border-border/50 shadow-md hover:shadow-lg transition-shadow duration-300">
                      {/* Mobile date badge */}
                      <div className="md:hidden p-4 pb-0">
                        <Badge variant="outline" className="text-sm font-medium py-1 px-3">
                          {exp.period}
                        </Badge>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold">{exp.role}</h3>
                        <p className="text-primary font-medium mb-4">{exp.company}</p>
                        <p className="text-muted-foreground mb-4">{exp.description}</p>

                        <h4 className="font-semibold mb-2">{t("experience.achievements")}</h4>
                        <ul className="space-y-1 mb-4">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <span className="text-primary mt-1">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {exp.technologies.map((tech, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ParallaxElement>
              </div>
            ))}
          </div>

          <ParallaxElement speed={0.2} direction="up">
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="bg-primary/10 hover:bg-primary/20 border-primary/20"
                asChild
              >
                <Link href="#contact">
                  <span>{t("experience.workTogether")}</span>
                </Link>
              </Button>
            </motion.div>
          </ParallaxElement>
        </motion.div>
      </div>
    </section>
  )
}

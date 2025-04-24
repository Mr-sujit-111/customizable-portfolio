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
import { Clock } from "lucide-react"

const experiences = [
  {
    role: "Freelance Frontend Developer",
    company: "Upwork",
    periodYears: "2024 – Present", // Just the year range for timeline
    periodFull: "Mar 2024 – Present", // Full date range for details
    duration: "Current", // Duration for separate display
    description:
      "Working as a freelance frontend developer on Upwork, delivering high-quality web applications using the latest technologies in the React and Next.js ecosystem. Partnered with international clients to build scalable, performant, and fully responsive UIs.",
    achievements: [
      "Built and deployed multiple production-grade web apps using Next.js 14/15 and App Router",
      "Integrated advanced features like server components, streaming, and dynamic SEO metadata",
      "Implemented design systems and responsive layouts with Tailwind CSS and Framer Motion",
      "Optimized Core Web Vitals and ensured accessibility best practices",
    ],
    technologies: [
      "Next.js (App Router)",
      "React.js",
      "Tailwind CSS",
      "Framer Motion",
      "Redux",
      "TypeScript",
      "ShadCN",
      "Vercel",
    ],
  },
  {
    role: "ReactJs Developer",
    company: "SoftX Solution",
    periodYears: "2022 – 2024", // Just the year range for timeline
    periodFull: "Jan 2022 – Mar 2024", // Full date range for details
    duration: "2 yrs 3 mos", // Duration for separate display
    description:
      "Worked as a full-time ReactJs Developer building responsive and optimized web applications. Collaborated with the backend team to integrate APIs and ensure seamless data flow. Delivered production-ready applications using modern frontend technologies.",
    achievements: [
      "Developed and maintained multiple client-facing projects using Next.js and React",
      "Implemented reusable components and design patterns to improve development efficiency",
      "Optimized performance using dynamic imports and lazy loading",
      "Worked closely with UI/UX designers to deliver pixel-perfect responsive layouts",
    ],
    technologies: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "Redux"],
  },
  {
    role: "ReactJs Trainee",
    company: "SoftX Solution",
    periodYears: "2021 – 2022", // Just the year range for timeline
    periodFull: "Nov 2021 – Jan 2022", // Full date range for details
    duration: "3 mos", // Duration for separate display
    description:
      "Completed a hands-on internship program focused on core React.js fundamentals, component design, and frontend project development best practices.",
    achievements: [
      "Built internal tools and dashboards as part of training projects",
      "Gained practical experience with React hooks and functional components",
      "Collaborated with senior developers for code reviews and knowledge sharing",
    ],
    technologies: ["React.js", "JavaScript", "HTML5", "CSS3"],
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
                      className={`absolute top-0 w-5 h-5 rounded-full border-4 border-background bg-primary ${index % 2 === 0 ? "md:-left-2.5 left-0" : "md:-right-2.5 left-0"
                        }`}
                    />

                    {/* Year range badge - absolute positioned for desktop */}
                    <div
                      className={`hidden md:block absolute top-0 ${index % 2 === 0 ? index === 0 ? "-left-[8.5rem] -top-1.5" : "-left-32 text-right" : "-right-32 text-left"
                        }`}
                    >
                      <Badge variant="outline" className="text-sm font-medium py-1 px-3">
                        {exp.periodYears}
                      </Badge>
                    </div>

                    <Card className="overflow-hidden border-border/50 shadow-md hover:shadow-lg transition-shadow duration-300">
                      {/* Mobile year range badge */}
                      <div className="md:hidden p-4 pb-0">
                        <Badge variant="outline" className="text-sm font-medium py-1 px-3">
                          {exp.periodYears}
                        </Badge>
                      </div>

                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{exp.role}</h3>
                            <p className="text-primary font-medium">{exp.company}</p>
                          </div>

                          {/* Duration badge with clock icon */}
                          <div className="flex items-center mt-2 sm:mt-0">
                            <Badge variant="secondary" className="flex items-center gap-1.5 py-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              <span className="text-xs font-medium">{exp.duration}</span>
                            </Badge>
                          </div>
                        </div>

                        {/* Full date range */}
                        <p className="text-sm text-muted-foreground mb-4">{exp.periodFull}</p>

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

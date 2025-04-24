"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useSettings } from "@/contexts/settings-context"
import { useTranslation } from "@/lib/i18n"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useRef, useState } from "react"
import { ParallaxElement } from "./parallax-element"

const testimonials = [
  {
    name: "Josh Keogh",
    role: "Project Manager",
    company: "",
    message:
      "I had the pleasure of working with Sujit, and I couldn't be more impressed. Not only did he deliver the project well before the deadline, but the quality of work exceeded my expectations. Sujit is not just a developer—he’s also a great problem solver who suggested valuable design improvements that made the final product even better.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Olivia Jack",
    role: "CEO",
    company: "TravelTix",
    message:
      "Working with Sujit was an outstanding experience! His expertise in cutting-edge technologies like Next.js, Tailwind CSS, and Framer Motion and ReactJs truly sets him apart. He seamlessly integrated animations and responsive designs, delivering a smooth and visually stunning frontend for my project",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Nitish Singhal",
    role: "CTO",
    company: "Aarogya",
    message:
      "excelent work",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Emily Rodriguez",
    role: "Project Manager",
    company: "WebSolutions",
    message:
      "I've worked with many developers, but Sujit stands out for his technical excellence and reliability. He communicates effectively, meets deadlines, and delivers polished, bug-free code.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export function TestimonialsSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right, 0 for initial

  const { language } = useSettings()
  const { t } = useTranslation(language as any)

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Simplified variants for testimonial card animations
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    }),
  }

  return (
    <section ref={ref} className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background Elements - Simplified */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl" />
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
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium inline-block">
                  {t("testimonials.title")}
                </span>
                <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">{t("testimonials.heading")}</h2>
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
                {t("testimonials.description")}
              </motion.p>
            </ParallaxElement>
          </div>

          <ParallaxElement speed={0.2} direction="up">
            <div className="relative">
              <div className="overflow-hidden">
                <AnimatePresence custom={direction} initial={false} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full"
                  >
                    <Card className="h-full border-none shadow-lg overflow-hidden">
                      <CardContent className="p-8">
                        <div className="mb-6">
                          <Quote className="h-10 w-10 text-primary/30" />
                        </div>
                        <div>
                          <p className="text-lg mb-8 italic">{testimonials[currentIndex].message}</p>
                          <div className="flex items-center gap-4">
                            {/* <Avatar className="h-14 w-14 border-2 border-primary/10">
                              <AvatarImage
                                src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                                alt={testimonials[currentIndex].name}
                              />
                              <AvatarFallback>{testimonials[currentIndex].name.charAt(0)}</AvatarFallback>
                            </Avatar> */}
                            <div>
                              <p className="font-semibold text-lg">{testimonials[currentIndex].name}</p>
                              <p className="text-muted-foreground">
                                {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  disabled={currentIndex === 0}
                  className="rounded-full h-10 w-10"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">{t("testimonials.previous")}</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  disabled={currentIndex === testimonials.length - 1}
                  className="rounded-full h-10 w-10"
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">{t("testimonials.next")}</span>
                </Button>
              </div>

              <div className="flex justify-center mt-6">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1)
                      setCurrentIndex(idx)
                    }}
                    className={`mx-1 h-2 rounded-full transition-all ${currentIndex === idx ? "bg-primary w-6" : "bg-primary/30 w-2"
                      }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </ParallaxElement>
        </motion.div>
      </div>
    </section>
  )
}

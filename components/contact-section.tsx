"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ParallaxElement } from "./parallax-element"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { useSettings } from "@/contexts/settings-context"
import { useTranslation } from "@/lib/i18n"

export function ContactSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const { language } = useSettings()
  const { t } = useTranslation(language)

  // Add form state and validation
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }))

    // Clear error when user types
    if (formErrors[id as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [id]: false,
      }))
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const errors = {
      name: !formState.name,
      email: !formState.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email),
      subject: !formState.subject,
      message: !formState.message,
    }

    setFormErrors(errors)

    // If there are errors, don't submit
    if (Object.values(errors).some(Boolean)) {
      return
    }

    // Submit form
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 relative overflow-hidden">
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
                  {t("contact.title")}
                </span>
                <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">{t("contact.heading")}</h2>
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
                {t("contact.description")}
              </motion.p>
            </ParallaxElement>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <ParallaxElement speed={0.2} direction="left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full border-none shadow-lg">
                  <CardContent className="p-8 border">
                    <h3 className="text-2xl font-bold mb-6">{t("contact.form.send")}</h3>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className={formErrors.name ? "text-destructive" : ""}>
                            {t("contact.form.name")} {formErrors.name && "*"}
                          </Label>
                          <Input
                            id="name"
                            placeholder={t("contact.form.name")}
                            className={`bg-background ${formErrors.name ? "border-destructive" : ""}`}
                            value={formState.name}
                            onChange={handleInputChange}
                          />
                          {formErrors.name && <p className="text-xs text-destructive">Name is required</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className={formErrors.email ? "text-destructive" : ""}>
                            {t("contact.form.email")} {formErrors.email && "*"}
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder={t("contact.form.email")}
                            className={`bg-background ${formErrors.email ? "border-destructive" : ""}`}
                            value={formState.email}
                            onChange={handleInputChange}
                          />
                          {formErrors.email && <p className="text-xs text-destructive">Valid email is required</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className={formErrors.subject ? "text-destructive" : ""}>
                          {t("contact.form.subject")} {formErrors.subject && "*"}
                        </Label>
                        <Input
                          id="subject"
                          placeholder={t("contact.form.subject")}
                          className={`bg-background ${formErrors.subject ? "border-destructive" : ""}`}
                          value={formState.subject}
                          onChange={handleInputChange}
                        />
                        {formErrors.subject && <p className="text-xs text-destructive">Subject is required</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className={formErrors.message ? "text-destructive" : ""}>
                          {t("contact.form.message")} {formErrors.message && "*"}
                        </Label>
                        <Textarea
                          id="message"
                          placeholder={t("contact.form.message")}
                          className={`min-h-[120px] bg-background ${formErrors.message ? "border-destructive" : ""}`}
                          value={formState.message}
                          onChange={handleInputChange}
                        />
                        {formErrors.message && <p className="text-xs text-destructive">Message is required</p>}
                      </div>
                      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          t("contact.form.send")
                        )}
                      </Button>

                      {submitSuccess && (
                        <div className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-md">
                          Your message has been sent successfully! We'll get back to you soon.
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </ParallaxElement>

            <ParallaxElement speed={0.2} direction="right">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full border-none shadow-lg">
                  <CardContent className="p-8 border">
                    <h3 className="text-2xl font-bold mb-6">{t("contact.connect")}</h3>
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-lg">Email</p>
                          <a
                            target="_blank"
                            href="mailto:sbhanderi11@gmail.com"
                            className="text-primary hover:underline transition-colors"
                          >
                            sbhanderi11@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Linkedin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-lg">LinkedIn</p>
                          <Link
                            target="_blank"
                            href="https://in.linkedin.com/in/sujit-bhanderi331"
                            className="text-primary hover:underline transition-colors"
                          >
                            linkedin.com/sujit-bhanderi331
                          </Link>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Github className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-lg">GitHub</p>
                          <Link
                            target="_blank"
                            href="https://github.com/Mr-sujit-111"
                            className="text-primary hover:underline transition-colors"
                          >
                            github.com/Mr-sujit-111
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </ParallaxElement>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

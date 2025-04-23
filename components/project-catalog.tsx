"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ParallaxElement } from "./parallax-element"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, ExternalLink, Github, Layers, Database, LineChart, Smartphone, Globe, ArrowRight, Eye } from "lucide-react"
import Link from "next/link"
import { useSettings } from "@/contexts/settings-context"
import { useTranslation } from "@/lib/i18n"

// Project data with real images
const projects = [
  {
    id: "dashboard",
    title: "Analytics Dashboard",
    description:
      "Enterprise analytics dashboard with real-time data visualization, customizable widgets, and comprehensive reporting tools.",
    longDescription:
      "This enterprise-grade dashboard provides administrators with comprehensive analytics and data visualization tools. Built with performance in mind, it features optimized rendering, lazy-loaded components, and smooth animations that enhance the user experience without sacrificing performance. The dashboard includes customizable widgets, real-time data updates, and export capabilities for reports.",
    techStack: ["Next.js", "TypeScript", "Recharts", "Tailwind CSS", "React Query"],
    github: "https://github.com/sujitbhanderi/analytics-dashboard",
    live: "https://analytics-dashboard.vercel.app",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    icon: LineChart,
    color: "bg-blue-500/10 border-blue-500/20 text-blue-500",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    description:
      "Full-featured online store with product filtering, cart management, payment processing, and order tracking.",
    longDescription:
      "This comprehensive e-commerce solution provides businesses with everything they need to sell products online. The platform includes advanced features like inventory management, dynamic pricing, customer accounts, wishlist functionality, and detailed analytics to help optimize sales performance. The checkout process is streamlined for maximum conversion, with multiple payment options and shipping integrations.",
    techStack: ["Next.js", "Redux", "Stripe", "MongoDB", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/sujitbhanderi/ecommerce-platform",
    live: "https://ecommerce-platform.vercel.app",
    image:
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    icon: Globe,
    color: "bg-green-500/10 border-green-500/20 text-green-500",
  },
  {
    id: "contracts",
    title: "Contract Management System",
    description:
      "Enterprise-grade contract manager with filterable tables, PDF exports, and automated workflow tracking.",
    longDescription:
      "This comprehensive contract management solution helps businesses track, manage, and analyze their contracts throughout the entire lifecycle. The platform includes advanced features like document versioning, approval workflows, automated reminders, and detailed audit trails to ensure compliance and reduce risk. The system integrates with popular CRM and ERP solutions for seamless data flow across the organization.",
    techStack: ["Next.js", "AG Grid", "Tailwind CSS", "React Query", "Redux", "TypeScript"],
    github: "https://github.com/sujitbhanderi/contract-platform",
    live: "https://contract-platform.vercel.app",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80",
    icon: Database,
    color: "bg-purple-500/10 border-purple-500/20 text-purple-500",
  },
  {
    id: "scheduler",
    title: "Time Entry Scheduler",
    description: "Modern time entry UI with dynamic grid layouts and animated deletions, built for productivity apps.",
    longDescription:
      "This intuitive time management application helps professionals track their work hours, manage projects, and analyze productivity patterns. The interface prioritizes ease of use with natural interactions like drag-and-drop, while the backend ensures accurate data processing and reporting capabilities. Features include recurring events, time tracking, project categorization, and detailed reporting with visual charts.",
    techStack: ["React", "Tailwind CSS", "Framer Motion", "Context API", "TypeScript"],
    github: "https://github.com/sujitbhanderi/time-entry-ui",
    live: "https://time-entry-ui.vercel.app",
    image:
      "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
    icon: Layers,
    color: "bg-orange-500/10 border-orange-500/20 text-orange-500",
  },
  {
    id: "realestate",
    title: "Real Estate Portal",
    description: "Interactive property search platform with map integration, filtering options, and virtual tours.",
    longDescription:
      "This sophisticated real estate platform connects buyers, sellers, and agents through an intuitive interface. Features include advanced property search with geolocation, virtual property tours, mortgage calculators, and a CRM system for agents to manage leads and client communications. The platform uses high-performance map rendering and image optimization to ensure a smooth experience even with large property catalogs.",
    techStack: ["Next.js", "Google Maps API", "Tailwind CSS", "Prisma", "PostgreSQL", "TypeScript"],
    github: "https://github.com/sujitbhanderi/realestate-portal",
    live: "https://realestate-portal.vercel.app",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80",
    icon: Globe,
    color: "bg-cyan-500/10 border-cyan-500/20 text-cyan-500",
  },
  {
    id: "mobile",
    title: "Mobile Banking App",
    description:
      "Secure and intuitive mobile banking application with transaction history, bill payments, and account management.",
    longDescription:
      "This mobile banking application provides users with a secure and intuitive way to manage their finances on the go. Features include real-time transaction history, bill payments, account management, and secure authentication methods including biometrics. The app is built with React Native for cross-platform compatibility and uses advanced encryption to ensure user data remains secure.",
    techStack: ["React Native", "Redux", "TypeScript", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/sujitbhanderi/mobile-banking",
    live: "https://mobile-banking.vercel.app",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    icon: Smartphone,
    color: "bg-pink-500/10 border-pink-500/20 text-pink-500",
  },
]

// 3D card effect with advanced mouse tracking
function useMousePosition3D(ref: React.RefObject<HTMLElement>) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()

      // Calculate position relative to the center of the element (-1 to 1)
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

      setPosition({ x, y })
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
      setIsHovering(false)
    }

    const element = ref.current
    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [ref])

  return { position, isHovering }
}

// Enhanced Project Card Component with 3D effect and advanced animations
function ProjectCard({
  project,
  onClick,
  isActive,
  isFocused,
  focusedId,
}: {
  project: (typeof projects)[0]
  onClick: () => void
  isActive: boolean
  isFocused: boolean
  focusedId: string | null
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { position, isHovering } = useMousePosition3D(cardRef)

  // Calculate if this card should be minimized (when another card is focused)
  const isMinimized = focusedId !== null && focusedId !== project.id

  // Card variants for different states
  const cardVariants = {
    normal: {
      scale: 1,
      opacity: 1,
      width: "100%",
      height: "100%",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    minimized: {
      scale: 0.8,
      opacity: 0.5,
      width: "100%",
      height: "100%",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    focused: {
      scale: 1.05,
      opacity: 1,
      width: "100%",
      height: "100%",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  }

  // Icon-only view for minimized cards
  const IconOnlyView = () => (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`p-4 rounded-full ${project.color}`}>
        <project.icon className="h-8 w-8" />
      </div>
    </motion.div>
  )

  return (
    <motion.div
      ref={cardRef}
      className="h-full cursor-pointer group relative"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: isMinimized ? 1 : 1.02 }}
      variants={cardVariants}
      animate={isMinimized ? "minimized" : isFocused ? "focused" : "normal"}
      style={{
        perspective: "1000px",
        zIndex: isFocused ? 10 : 1,
      }}
    >
      <AnimatePresence>
        {isMinimized && <IconOnlyView />}

        {!isMinimized && (
          <motion.div
            className="h-full bg-card rounded-xl overflow-hidden border shadow-md hover:shadow-xl transition-all duration-300"
            style={{
              rotateY: isHovering ? position.x * 15 : 0,
              rotateX: isHovering ? position.y * -15 : 0,
              transformStyle: "preserve-3d",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="relative h-48 overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                style={{
                  transformStyle: "preserve-3d",
                  z: 20,
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 transform"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex gap-2">
                  {project.techStack.slice(0, 3).map((tech, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-xs bg-black/30 backdrop-blur-sm text-white border-white/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 3 && (
                    <Badge
                      variant="outline"
                      className="text-xs bg-black/30 backdrop-blur-sm text-white border-white/20"
                    >
                      +{project.techStack.length - 3}
                    </Badge>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  className={`p-1.5 rounded-md ${project.color}`}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 500, damping: 10 }}
                >
                  <project.icon className="h-4 w-4" />
                </motion.div>
                <h3 className="text-xl font-bold">{project.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>

              <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="flex gap-2">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                    <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-full">
                      <Link href={project.github} target="_blank">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1, rotate: -5 }}>
                    <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-full">
                      <Link href={project.live} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Live Preview</span>
                      </Link>
                    </Button>
                  </motion.div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button variant="ghost" size="sm" className="gap-1 group">
                    <span>Details</span>
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </motion.div>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Enhanced Project Detail Component with advanced animations
function ProjectDetail({ project, onClose }: { project: (typeof projects)[0]; onClose: () => void }) {
  // Reference for 3D effect
  const detailRef = useRef<HTMLDivElement>(null)
  const { position, isHovering } = useMousePosition3D(detailRef)
  const { language } = useSettings()
  const { t } = useTranslation(language)

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop with blur effect */}
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Content with 3D effect */}
      <motion.div
        ref={detailRef}
        className="relative w-full max-w-5xl bg-card rounded-xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        style={{
          rotateY: isHovering ? position.x * 5 : 0,
          rotateX: isHovering ? position.y * -5 : 0,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
      >
        <motion.div
          className="absolute top-4 right-4 z-10"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-[300px] md:h-auto overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ transformStyle: "preserve-3d", z: 30 }}
              whileHover={{ scale: 1.05 }}
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  className={`p-2 rounded-lg ${project.color}`}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 500, damping: 10 }}
                >
                  <project.icon className="h-6 w-6" />
                </motion.div>
                <motion.h3
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {project.title}
                </motion.h3>
              </div>
              <motion.div
                className="flex flex-wrap gap-2 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {project.techStack.map((tech, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <Badge variant="secondary">{tech}</Badge>
                  </motion.div>
                ))}
              </motion.div>
              <motion.p
                className="text-muted-foreground mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {project.longDescription}
              </motion.p>
            </div>
            <motion.div
              className="mt-auto flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }}>
                <Button variant="outline" size="sm" asChild>
                  <Link href={project.github} target="_blank" className="flex items-center gap-1">
                    <Github className="h-4 w-4" />
                    GitHub Repository
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }}>
                <Button size="sm" asChild>
                  <Link href={project.live} target="_blank" className="flex items-center gap-1">
                    <ExternalLink className="h-4 w-4" />
                    Live Preview
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }}>
                <Button variant="secondary" size="sm" asChild>
                  <Link href={`/project/${project.id}`} className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    Explore Project
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Enhanced Filter Button Component with liquid animation
function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant={active ? "default" : "outline"}
        size="sm"
        onClick={onClick}
        className={`relative overflow-hidden ${active ? "text-primary-foreground" : ""}`}
      >
        {active && (
          <motion.div
            className="absolute inset-0 bg-primary"
            initial={{ scale: 0, borderRadius: "100%" }}
            animate={{ scale: 1, borderRadius: "0%" }}
            transition={{ duration: 0.4 }}
            layoutId="activeFilterBackground"
          />
        )}
        <span className="relative z-10">{children}</span>
      </Button>
    </motion.div>
  )
}

export function ProjectCatalog() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [focusedProject, setFocusedProject] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")

  const { language } = useSettings()
  const { t } = useTranslation(language)

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.id === filter)

  const selectedProject = projects.find((p) => p.id === activeProject)

  // Reset focused project when filter changes
  useEffect(() => {
    setFocusedProject(null)
  }, [filter])

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden" id="projects">
      {/* Background Elements with enhanced parallax */}
      <div className="absolute inset-0 -z-10">
        <ParallaxElement speed={0.2} direction="right" depth={50}>
          <motion.div
            className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </ParallaxElement>
        <ParallaxElement speed={0.3} direction="left" depth={30}>
          <motion.div
            className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
          />
        </ParallaxElement>
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
                  {t("projects.title")}
                </motion.span>
                <motion.h2
                  className="mt-6 text-4xl md:text-5xl font-bold tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  {t("projects.heading")}
                </motion.h2>
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
                {t("projects.description")}
              </motion.p>
            </ParallaxElement>
          </div>

          {/* Filters with enhanced animations */}
          <ParallaxElement speed={0.2} direction="up">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-12 flex flex-wrap justify-center gap-2"
            >
              <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
                {t("projects.category.all")}
              </FilterButton>
              <FilterButton active={filter === "dashboard"} onClick={() => setFilter("dashboard")}>
                {t("projects.category.dashboards")}
              </FilterButton>
              <FilterButton
                active={filter === "contracts" || filter === "realestate"}
                onClick={() => setFilter("contracts")}
              >
                {t("projects.category.enterprise")}
              </FilterButton>
              <FilterButton active={filter === "ecommerce"} onClick={() => setFilter("ecommerce")}>
                {t("projects.category.ecommerce")}
              </FilterButton>
              <FilterButton active={filter === "scheduler"} onClick={() => setFilter("scheduler")}>
                {t("projects.category.productivity")}
              </FilterButton>
            </motion.div>
          </ParallaxElement>

          {/* Projects Grid with advanced animations */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setActiveProject(project.id)}
                isActive={activeProject === project.id}
                isFocused={focusedProject === project.id}
                focusedId={focusedProject}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject && selectedProject && (
          <ProjectDetail project={selectedProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

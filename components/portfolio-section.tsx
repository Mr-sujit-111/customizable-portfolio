"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ParallaxElement } from "./parallax-element"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  X,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Code,
  Layout,
  Smartphone,
  LineChart,
  Database,
  Globe,
} from "lucide-react"
import { useSettings } from "@/contexts/settings-context"
import { useTranslation } from "@/lib/i18n"

// Generate a larger set of projects (35 total)
const generateProjects = () => {
  const baseProjects = [
    {
      id: "landing-page",
      title: "Landing Page",
      description: "A modern and responsive landing page for showcasing products with smooth animations.",
      image:
        "/projects/landing-page/thumbnail.png",
      category: "landing-page",
      techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "lucide Icons"],
      git: "https://github.com/Mr-sujit-111/landing-page",
      url: "https://landing-page-gamma-rouge.vercel.app/",
      icon: Globe, // Example icon, could be `Globe` or any other React Icon you choose
      color: "bg-green-500/10 border-green-500/20 text-green-500",
    },
  ]

  // Categories to cycle through
  const categories = ["dashboard", "ecommerce", "enterprise", "productivity", "mobile", "portfolio"]
  const icons = [LineChart, Globe, Database, Code, Smartphone, Layout]
  const colors = [
    "bg-blue-500/10 border-blue-500/20 text-blue-500",
    "bg-green-500/10 border-green-500/20 text-green-500",
    "bg-purple-500/10 border-purple-500/20 text-purple-500",
    "bg-orange-500/10 border-orange-500/20 text-orange-500",
    "bg-cyan-500/10 border-cyan-500/20 text-cyan-500",
    "bg-pink-500/10 border-pink-500/20 text-pink-500",
    "bg-indigo-500/10 border-indigo-500/20 text-indigo-500",
  ]

  // Generate additional projects to reach 35 total
  const additionalProjects = []
  for (let i = 0; i < 28; i++) {
    const categoryIndex = i % categories.length
    const iconIndex = i % icons.length
    const colorIndex = i % colors.length

    additionalProjects.push({
      id: `project-${i + 8}`,
      title: `Project ${i + 8}`,
      description: `Description for Project ${i + 8} with amazing features and functionality.`,
      image: `https://picsum.photos/seed/${i + 100}/800/600`,
      category: categories[categoryIndex],
      techStack: ["React", "TypeScript", "Tailwind CSS", "Next.js"].sort(() => Math.random() - 0.5),
      icon: icons[iconIndex],
      color: colors[colorIndex],
    })
  }

  return [...baseProjects]
  // return [...baseProjects, ...additionalProjects]
}

const allProjects = generateProjects()

// Project Card Component
function ProjectCard({ project, onClick }: { project: any; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePosition({ x, y })
  }

  return (
    <motion.div
      ref={cardRef}
      className="h-full cursor-pointer group"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className="h-full bg-card rounded-xl overflow-hidden border shadow-md hover:shadow-xl transition-all duration-300"
        style={{
          rotateY: isHovering ? mousePosition.x * 10 : 0,
          rotateX: isHovering ? mousePosition.y * -10 : 0,
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
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
              {project.techStack.slice(0, 3).map((tech: string, i: number) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-xs bg-black/30 backdrop-blur-sm text-white border-white/20"
                >
                  {tech}
                </Badge>
              ))}
              {project.techStack.length > 3 && (
                <Badge variant="outline" className="text-xs bg-black/30 backdrop-blur-sm text-white border-white/20">
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
                <a
                  href={project.git} // Replace with your GitHub URL
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: -5 }}>
                <a
                  href={project.url} // Replace with your GitHub URL
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Live Preview</span>
                  </Button>
                </a>
              </motion.div>
            </div>
            <motion.div whileHover={{ scale: 1.05, x: 3 }} transition={{ type: "spring" }}>
              <Button variant="ghost" size="sm">
                Details
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Project Detail Modal
function ProjectDetailModal({ project, onClose }: { project: any; onClose: () => void }) {
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
        className="relative w-full max-w-5xl bg-card rounded-xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
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
                {project.techStack.map((tech: string, i: number) => (
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
                {project.description}
              </motion.p>
              <motion.p
                className="text-muted-foreground mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                This project showcases advanced frontend techniques and modern design principles. It was built with a
                focus on performance, accessibility, and user experience.
              </motion.p>
            </div>
            <motion.div
              className="mt-auto flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }}>
                <a
                  href={project.git} // Replace with your GitHub URL
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Github className="h-4 w-4" />
                    GitHub Repository
                  </Button>
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }}>
                <a
                  href={project.url} // Replace with your GitHub URL
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm" className="flex items-center gap-1">
                    <ExternalLink className="h-4 w-4" />
                    Live Preview
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function PortfolioSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const [selectedProject, setSelectedProject] = useState<any | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const projectsPerPage = 9

  const { language } = useSettings()
  const { t } = useTranslation(language as any)

  // Filter projects based on search query and category
  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  // Categories for filtering
  const categories = [
    { value: "all", label: "All Projects" },
    { value: "dashboard", label: "Dashboards" },
    { value: "enterprise", label: "Enterprise" },
    { value: "ecommerce", label: "E-Commerce" },
    { value: "productivity", label: "Productivity" },
    { value: "mobile", label: "Mobile Apps" },
    { value: "portfolio", label: "Portfolios" },
  ]

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden" id="portfolio">
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
      </div>

      <div className="container px-4 md:px-6">
        <motion.div style={{ opacity }} className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
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
                  Portfolio
                </motion.span>
                <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">All Projects</h2>
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
                Browse through my complete collection of projects across various categories
              </motion.p>
            </ParallaxElement>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className="relative overflow-hidden"
                >
                  {selectedCategory === category.value && (
                    <motion.div
                      className="absolute inset-0 bg-primary"
                      initial={{ scale: 0, borderRadius: "100%" }}
                      animate={{ scale: 1, borderRadius: "0%" }}
                      transition={{ duration: 0.4 }}
                      layoutId="activeCategoryBackground"
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          {currentProjects.length > 0 ? (
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              layout
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {currentProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl text-muted-foreground">No projects found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
              >
                Reset Filters
              </Button>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 p-0 ${totalPages > 7 && page > 3 && page < totalPages - 2 && Math.abs(currentPage - page) > 1
                      ? "hidden"
                      : ""
                      }`}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Project count */}
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Showing {indexOfFirstProject + 1}-{Math.min(indexOfLastProject, filteredProjects.length)} of{" "}
            {filteredProjects.length} projects
          </div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  )
}

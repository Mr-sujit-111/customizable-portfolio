"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ParallaxElement } from "./parallax-element"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Add proper type for the project
interface Project {
  title: string
  description: string
  longDescription: string
  techStack: string[]
  github: string
  live: string
  image: string
  category: string
  icon: any // This should be a more specific type but we'll use any for now
  color: string
}

const projects = [
  {
    title: "Animated Dashboard UI",
    description:
      "Fully responsive admin dashboard with custom charts, Framer Motion transitions, and Tailwind UI layout. Features include real-time data visualization, theme customization, and responsive design for all devices.",
    longDescription:
      "This enterprise-grade dashboard provides administrators with comprehensive analytics and data visualization tools. Built with performance in mind, it features optimized rendering, lazy-loaded components, and smooth animations that enhance the user experience without sacrificing performance.",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "Chart.js", "TypeScript"],
    github: "https://github.com/sujitbhanderi/animated-dashboard",
    live: "https://animated-dashboard.vercel.app",
    image: "/placeholder.svg?height=400&width=600",
    category: "dashboard",
    icon: null,
    color: "bg-blue-500",
  },
  {
    title: "Contract Management Platform",
    description:
      "Enterprise-grade contract manager with filterable AG Grid tables, PDF exports, and date tracking. Streamlines contract workflows and provides powerful search capabilities.",
    longDescription:
      "This comprehensive contract management solution helps businesses track, manage, and analyze their contracts throughout the entire lifecycle. The platform includes advanced features like document versioning, approval workflows, automated reminders, and detailed audit trails to ensure compliance and reduce risk.",
    techStack: ["Next.js", "AG Grid", "Tailwind CSS", "React Query", "Redux", "TypeScript"],
    github: "https://github.com/sujitbhanderi/contract-platform",
    live: "https://contract-platform.vercel.app",
    image: "/placeholder.svg?height=400&width=600",
    category: "enterprise",
    icon: null,
    color: "bg-green-500",
  },
  {
    title: "Time Entry Scheduler",
    description:
      "Modern time entry UI with dynamic grid layouts and animated deletions, built for productivity apps. Features include drag-and-drop scheduling, recurring events, and detailed reporting.",
    longDescription:
      "This intuitive time management application helps professionals track their work hours, manage projects, and analyze productivity patterns. The interface prioritizes ease of use with natural interactions like drag-and-drop, while the backend ensures accurate data processing and reporting capabilities.",
    techStack: ["React", "Tailwind CSS", "Framer Motion", "Context API", "TypeScript"],
    github: "https://github.com/sujitbhanderi/time-entry-ui",
    live: "https://time-entry-ui.vercel.app",
    image: "/placeholder.svg?height=400&width=600",
    category: "productivity",
    icon: null,
    color: "bg-purple-500",
  },
  {
    title: "E-Commerce Platform",
    description:
      "Full-featured online store with product filtering, cart management, payment processing, and order tracking. Optimized for conversion and user experience.",
    longDescription:
      "This comprehensive e-commerce solution provides businesses with everything they need to sell products online. The platform includes advanced features like inventory management, dynamic pricing, customer accounts, wishlist functionality, and detailed analytics to help optimize sales performance.",
    techStack: ["Next.js", "Redux", "Stripe", "MongoDB", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/sujitbhanderi/ecommerce-platform",
    live: "https://ecommerce-platform.vercel.app",
    image: "/placeholder.svg?height=400&width=600",
    category: "e-commerce",
    icon: null,
    color: "bg-orange-500",
  },
  {
    title: "Real Estate Listing Portal",
    description:
      "Interactive property search platform with map integration, filtering options, and virtual tours. Designed for optimal user experience and lead generation.",
    longDescription:
      "This sophisticated real estate platform connects buyers, sellers, and agents through an intuitive interface. Features include advanced property search with geolocation, virtual property tours, mortgage calculators, and a CRM system for agents to manage leads and client communications.",
    techStack: ["Next.js", "Google Maps API", "Tailwind CSS", "Prisma", "PostgreSQL", "TypeScript"],
    github: "https://github.com/sujitbhanderi/realestate-portal",
    live: "https://realestate-portal.vercel.app",
    image: "/placeholder.svg?height=400&width=600",
    category: "enterprise",
    icon: null,
    color: "bg-green-500",
  },
  {
    title: "Content Management System",
    description:
      "Custom CMS with rich text editing, media management, and workflow controls. Built for content teams with a focus on collaboration and publishing efficiency.",
    longDescription:
      "This powerful content management system enables teams to create, edit, and publish content across multiple channels. The platform includes features like role-based access control, content versioning, scheduled publishing, SEO tools, and analytics integration to measure content performance.",
    techStack: ["React", "Node.js", "MongoDB", "Draft.js", "Express", "TypeScript"],
    github: "https://github.com/sujitbhanderi/custom-cms",
    live: "https://custom-cms.vercel.app",
    image: "/placeholder.svg?height=400&width=600",
    category: "productivity",
    icon: null,
    color: "bg-purple-500",
  },
]

const categories = [
  { value: "all", label: "All Projects" },
  { value: "dashboard", label: "Dashboards" },
  { value: "enterprise", label: "Enterprise" },
  { value: "e-commerce", label: "E-Commerce" },
  { value: "productivity", label: "Productivity" },
]

export function ProjectsSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const [activeCategory, setActiveCategory] = useState("all")

  // Update the showDetails state to handle project details properly
  const [activeProject, setActiveProject] = useState<Project | null>(projects[0])
  const [showDetails, setShowDetails] = useState(false)

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section ref={ref} className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <ParallaxElement speed={0.1} direction="up">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
        </ParallaxElement>
        <ParallaxElement speed={0.1} direction="down">
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
        </ParallaxElement>
        <ParallaxElement speed={0.2} direction="right">
          <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
        </ParallaxElement>
        <ParallaxElement speed={0.3} direction="left">
          <div className="absolute bottom-1/3 -right-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl" />
        </ParallaxElement>
      </div>

      <div className="container px-4 md:px-6">
        <motion.div style={{ opacity }} className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <ParallaxElement speed={0.2} direction="up">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">Portfolio</span>
                <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">Featured Projects</h2>
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
                A selection of my most impactful work across various industries and technologies
              </motion.p>
            </ParallaxElement>
          </div>

          <ParallaxElement speed={0.2} direction="up">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-12"
            >
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
                <TabsList className="w-full max-w-3xl mx-auto flex flex-wrap justify-center h-auto bg-transparent">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.value}
                      value={category.value}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 m-1"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </motion.div>
          </ParallaxElement>

          {showDetails ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-xl overflow-hidden border shadow-lg"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-[300px] md:h-auto overflow-hidden">
                  <img
                    src={activeProject?.image || "/placeholder.svg"}
                    alt={activeProject?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-2">{activeProject?.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {activeProject?.techStack.map((tech, i) => (
                        <Badge key={i} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">{activeProject?.longDescription}</p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={activeProject?.github} target="_blank" className="flex items-center gap-1">
                        <Github className="h-4 w-4" />
                        GitHub Repository
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={activeProject?.live} target="_blank" className="flex items-center gap-1">
                        <ExternalLink className="h-4 w-4" />
                        Live Preview
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setShowDetails(false)} className="ml-auto">
                      Back to Gallery
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredProjects.map((project, index) => (
                <ParallaxElement key={index} speed={0.1 * (index + 1)} direction="up">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="relative h-40 sm:h-48 overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className={`${project.color} text-xs`}>{project.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-1">{project.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.techStack.slice(0, 3).map((tech, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.techStack.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.techStack.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex justify-between items-center mt-auto">
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon" asChild className="h-8 w-8">
                              <Link href={project.github} target="_blank">
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                              </Link>
                            </Button>
                            <Button variant="outline" size="icon" asChild className="h-8 w-8">
                              <Link href={project.live} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Live Preview</span>
                              </Link>
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setActiveProject(project)
                              setShowDetails(true)
                            }}
                          >
                            Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ParallaxElement>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

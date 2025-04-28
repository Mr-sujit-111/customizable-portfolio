"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { useSettings } from "@/contexts/settings-context"
import { useTranslation } from "@/lib/i18n"

// Import project data
const projects = [
  {
    id: "landing-page",
    title: "Landing Page",
    description:
      "A modern and responsive landing page for showcasing products with smooth animations.",
    longDescription:
      "A sleek, responsive landing page built with Next.js, styled using Tailwind CSS, and animated with Framer Motion for smooth transitions. It showcases products in a modern grid layout with interactive hover effects and scroll-triggered animations. Lucide Icons enhance visual clarity throughout the UI. Perfect for performance-focused, mobile-friendly product displays.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "lucide Icons"],
    github: "https://github.com/Mr-sujit-111/landing-page",
    live: "https://landing-page-gamma-rouge.vercel.app/",
    image:
      "/projects/landing-page/thumbnail.png",
    features: [
      "Responsive design for desktop, tablet, and mobile devices",
      "Smooth animations using Framer Motion for enhanced user interaction",
      "Customizable components with modular and reusable design patterns",
      "Fast page load and routing with Next.js for optimal performance",
    ],
    challenges: [
      {
        challenge: "Ensuring full responsiveness across all devices",
        solution:
          "Utilized Tailwind CSS with a mobile-first approach and adaptive layout strategies to maintain seamless user experience on all screen sizes.",
      },
      {
        challenge: "Implementing smooth and performant animations",
        solution:
          "Integrated Framer Motion to create fluid transitions, scroll-based reveals, and hover effects without impacting rendering performance.",
      },
    ],
    screenshots: [
      {
        url: "/projects/landing-page/Screenshot_1.png",
        caption: "",
      },
      {
        url: "/projects/landing-page/Screenshot_2.png",
        caption: "",
      },
      {
        url: "/projects/landing-page/Screenshot_3.png",
        caption: "",
      },
      {
        url: "/projects/landing-page/Screenshot_4.png",
        caption: "",
      },
      {
        url: "/projects/landing-page/Screenshot_5.png",
        caption: "",
      },
      {
        url: "/projects/landing-page/Screenshot_6.png",
        caption: "",
      },
      {
        url: "/projects/landing-page/Screenshot_7.png",
        caption: "",
      },
      {
        url: "/projects/landing-page/Screenshot_8.png",
        caption: "",
      },

    ],
    videoUrl: "/projects/landing-page/video/Landing-page.mp4", // Example video URL
  },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useSettings()
  const { t } = useTranslation(language)
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (params.id) {
      const foundProject = projects.find((p) => p.id === params.id)
      if (foundProject) {
        setProject(foundProject)
      } else {
        // Project not found, redirect to projects page
        router.push("/#projects")
      }
      setLoading(false)
    }
  }, [params.id, router])

  // Get next and previous projects for navigation
  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1
  const prevProject = currentIndex > 0 ? projects.findIndex((p) => p.id === project.id) : -1
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  // Handle image navigation
  const nextImage = () => {
    if (project?.screenshots) {
      setCurrentImageIndex((prev) => (prev + 1) % project.screenshots.length)
    }
  }

  const prevImage = () => {
    if (project?.screenshots) {
      setCurrentImageIndex((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length)
    }
  }

  // Scroll gallery to current image
  useEffect(() => {
    if (galleryRef.current && project?.screenshots) {
      const scrollAmount = currentImageIndex * (galleryRef.current.scrollWidth / project.screenshots.length)
      galleryRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }, [currentImageIndex, project])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Button asChild>
          <Link href="/#projects">Back to Projects</Link>
        </Button>
      </div>
    )
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        {/* Back to projects button */}
        <div className="mb-8">
          <Button variant="outline" asChild>
            <Link href="/#projects" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("projectsDetail.backToProjects")}
            </Link>
          </Button>
        </div>

        {/* Project header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech: string, i: number) => (
              <Badge key={i} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          <p className="text-xl text-muted-foreground">{project.description}</p>
        </div>

        {/* Main content tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-3 md:w-[600px] mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
            {/* <TabsTrigger value="video">Demo Video</TabsTrigger> */}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">{t("projectsDetail.overview")}</h2>
                <p className="text-muted-foreground mb-6">{project.longDescription}</p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={project.github} target="_blank" className="flex items-center gap-1">
                      <Github className="h-4 w-4" />
                      {t("projectsDetail.sourceCode")}
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={project.live} target="_blank" className="flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      {t("projectsDetail.liveDemo")}
                    </Link>
                  </Button>
                </div>
              </div>

              <div>
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-auto rounded-lg shadow-md object-cover"
                />
              </div>
            </div>

            {/* Challenges and Solutions */}
            <div>
              <h2 className="text-2xl font-bold mb-4">{t("projectsDetail.challenges")}</h2>
              <div className="grid gap-4">
                {project.challenges.map((item: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">{item.challenge}</h3>
                      <p className="text-muted-foreground">{item.solution}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features">
            <h2 className="text-2xl font-bold mb-4">{t("projectsDetail.features")}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.features.map((feature: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <p>{feature}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="screenshots">
            <h2 className="text-2xl font-bold mb-4">{t("projectsDetail.screenshots")}</h2>

            {/* Main screenshot display */}
            <div className="mb-6 relative">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={project.screenshots[currentImageIndex].url || "/placeholder.svg"}
                  alt={project.screenshots[currentImageIndex].caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 text-center text-muted-foreground">{project.screenshots[currentImageIndex].caption}</p>

              {/* Navigation arrows */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={prevImage}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={nextImage}
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Next image</span>
              </Button>
            </div>

            {/* Thumbnail gallery */}
            <div className="overflow-x-auto pb-4" ref={galleryRef}>
              <div className="flex gap-4">
                {project.screenshots.map((screenshot: any, index: number) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 cursor-pointer transition-all duration-200 ${currentImageIndex === index ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"
                      }`}
                    style={{ width: "150px" }}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={screenshot.url || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-auto rounded-md object-cover aspect-video"
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="video">
            <h2 className="text-2xl font-bold mb-4">{t("projectsDetail.video")}</h2>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <iframe
                src={project.videoUrl}
                title={`${project.title} Demo Video`}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
            <p className="mt-4 text-muted-foreground text-center">
              Watch a complete demonstration of the {project.title} in action
            </p>
          </TabsContent>
        </Tabs>

        {/* Project navigation */}
        <div className="flex justify-between mt-12 pt-6 border-t">
          {previousProject ? (
            <Button variant="outline" asChild>
              <Link href={`/project/${previousProject.id}`} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>
                  <span className="text-muted-foreground block text-xs">{t("projectsDetail.previousProject")}</span>
                  {previousProject.title}
                </span>
              </Link>
            </Button>
          ) : (
            <div></div>
          )}

          {nextProject ? (
            <Button variant="outline" asChild>
              <Link href={`/project/${nextProject.id}`} className="flex items-center gap-2">
                <span>
                  <span className="text-muted-foreground block text-xs">{t("projectsDetail.nextProject")}</span>
                  {nextProject.title}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </main>
  )
}

"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ParallaxElement } from "./parallax-element"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { useSettings } from "@/contexts/settings-context"
import { useTranslation } from "@/lib/i18n"

// Sample blog posts data
const blogPosts = [
  {
    id: "modern-react-patterns",
    title: "Modern React Patterns for Cleaner Code",
    excerpt:
      "Explore the latest React patterns and best practices that can help you write cleaner, more maintainable code in your projects.",
    date: "2023-04-15",
    readTime: "8 min read",
    category: "React",
    image:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "tailwind-tips",
    title: "10 Tailwind CSS Tips to Boost Your Workflow",
    excerpt:
      "Discover practical Tailwind CSS tips and tricks that will help you build beautiful interfaces faster and with less effort.",
    date: "2023-03-22",
    readTime: "6 min read",
    category: "CSS",
    image:
      "https://images.unsplash.com/photo-1618788372246-79faff0c3742?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "nextjs-performance",
    title: "Optimizing Next.js Applications for Performance",
    excerpt:
      "Learn advanced techniques for optimizing your Next.js applications to achieve lightning-fast load times and smooth user experiences.",
    date: "2023-02-10",
    readTime: "10 min read",
    category: "Next.js",
    image:
      "https://images.unsplash.com/photo-1642059889811-3d50b86e2e8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "framer-motion-guide",
    title: "The Complete Guide to Framer Motion Animations",
    excerpt:
      "A comprehensive guide to creating stunning animations in your React applications using the powerful Framer Motion library.",
    date: "2023-01-18",
    readTime: "12 min read",
    category: "Animation",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "typescript-best-practices",
    title: "TypeScript Best Practices for Frontend Developers",
    excerpt:
      "Essential TypeScript patterns and practices that will help you write more robust and maintainable frontend code.",
    date: "2022-12-05",
    readTime: "9 min read",
    category: "TypeScript",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "accessibility-guide",
    title: "Building Accessible Web Applications: A Practical Guide",
    excerpt:
      "Learn how to make your web applications more accessible to users with disabilities, following WCAG guidelines and best practices.",
    date: "2022-11-14",
    readTime: "11 min read",
    category: "Accessibility",
    image:
      "https://images.unsplash.com/photo-1617471346061-5d329ab9c574?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
]

// Categories for filtering
const categories = [
  { value: "all", label: "All Posts" },
  { value: "React", label: "React" },
  { value: "CSS", label: "CSS" },
  { value: "Next.js", label: "Next.js" },
  { value: "Animation", label: "Animation" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Accessibility", label: "Accessibility" },
]

export function BlogSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const [selectedCategory, setSelectedCategory] = useState("all")

  const { language } = useSettings()
  const { t } = useTranslation(language as any)

  // Filter blog posts based on selected category
  const filteredPosts =
    selectedCategory === "all" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)

  // Format date function
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(language, options)
  }

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden" id="blog">
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
        <motion.div style={{ opacity }} className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <ParallaxElement speed={0.2} direction="up">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium inline-block">
                  Blog
                </span>
                <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">Latest Articles</h2>
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
                Insights, tutorials, and thoughts on frontend development and design
              </motion.p>
            </ParallaxElement>
          </div>

          {/* Category Filters */}
          <ParallaxElement speed={0.2} direction="up">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-12 flex flex-wrap justify-center gap-2"
            >
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
                      layoutId="activeBlogCategoryBackground"
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </Button>
              ))}
            </motion.div>
          </ParallaxElement>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <ParallaxElement key={post.id} speed={0.1 * (index + 1)} direction="up">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary/90 hover:bg-primary text-white border-none">{post.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                      <Link href={`/blog/${post.id}`} passHref>
                        <Button variant="ghost" className="group p-0 h-auto font-medium text-primary">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </ParallaxElement>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center">
            <Link href="/blog" passHref>
              <Button variant="outline" size="lg" className="group">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

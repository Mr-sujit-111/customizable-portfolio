"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, ChevronDown } from "lucide-react";
import { ParallaxElement } from "./parallax-element";

// Sample blog posts data (12 realistic posts)
const blogPosts = [
  {
    id: "modern-react-patterns",
    title: "Modern React Patterns for Cleaner Code",
    excerpt:
      "Explore the latest React patterns and best practices that can help you write cleaner, more maintainable code in your projects. Learn about hooks, context API, and more.",
    date: "2023-04-15",
    readTime: "8 min read",
    category: "React",
    image:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070",
    link: "https://react.dev/blog", // Official React blog
  },
  {
    id: "tailwind-tips",
    title: "10 Tailwind CSS Tips to Boost Your Workflow",
    excerpt:
      "Discover practical Tailwind CSS tips and tricks that will help you build beautiful interfaces faster and with less effort. From organization to optimization.",
    date: "2023-03-22",
    readTime: "6 min read",
    category: "CSS",
    image:
      "https://images.unsplash.com/photo-1618788372246-79faff0c3742?q=80&w=2070",
    link: "https://tailwindcss.com/blog", // Official Tailwind CSS blog
  },
  {
    id: "nextjs-performance",
    title: "Optimizing Next.js Applications for Performance",
    excerpt:
      "Learn advanced techniques for optimizing your Next.js applications to achieve lightning-fast load times and smooth user experiences. Focus on SSR and ISR.",
    date: "2023-02-10",
    readTime: "10 min read",
    category: "Next.js",
    image:
      "https://images.unsplash.com/photo-1642059889811-3d50b86e2e8e?q=80&w=2070",
    link: "https://nextjs.org/blog", // Official Next.js blog
  },
  {
    id: "framer-motion-guide",
    title: "The Complete Guide to Framer Motion Animations",
    excerpt:
      "A comprehensive guide to creating stunning animations in your React applications using the powerful Framer Motion library. From basics to advanced techniques.",
    date: "2023-01-18",
    readTime: "12 min read",
    category: "Animation",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070",
    link: "https://www.framer.com/blog/", // Official Framer blog
  },
  {
    id: "typescript-best-practices",
    title: "TypeScript Best Practices for Frontend Developers",
    excerpt:
      "Essential TypeScript patterns and practices that will help you write more robust and maintainable frontend code. Includes interfaces, generics, and utility types.",
    date: "2022-12-05",
    readTime: "9 min read",
    category: "TypeScript",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
    link: "https://devblogs.microsoft.com/typescript/", // Official TypeScript blog
  },
  {
    id: "accessibility-guide",
    title: "Building Accessible Web Applications: A Practical Guide",
    excerpt:
      "Learn how to make your web applications more accessible to users with disabilities, following WCAG guidelines and best practices. From semantic HTML to ARIA.",
    date: "2022-11-14",
    readTime: "11 min read",
    category: "Accessibility",
    image:
      "https://images.unsplash.com/photo-1617471346061-5d329ab9c574?q=80&w=2070",
    link: "https://web.dev/learn/accessibility/", // Google's web.dev accessibility section
  },
  {
    id: "serverless-architecture",
    title: "Building Serverless Applications with AWS Lambda",
    excerpt:
      "Explore how to build and deploy serverless applications using AWS Lambda and other cloud services. Reduce infrastructure costs and scale efficiently.",
    date: "2022-10-08",
    readTime: "13 min read",
    category: "Cloud",
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2070",
    link: "https://aws.amazon.com/blogs/compute/", // AWS Compute Blog (often covers Lambda)
  },
  {
    id: "design-system-creation",
    title: "Creating Your First Design System from Scratch",
    excerpt:
      "A step-by-step guide to creating a consistent and scalable design system for your organization. From color palettes to component libraries.",
    date: "2022-09-19",
    readTime: "15 min read",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2070",
    link: "https://uxdesign.cc/", // Popular UX Design publication (often covers design systems)
  },
  {
    id: "graphql-vs-rest",
    title: "GraphQL vs REST: Choosing the Right API Approach",
    excerpt:
      "An in-depth comparison between GraphQL and REST API architectures. Learn the pros, cons, and when to use each approach in your applications.",
    date: "2022-08-27",
    readTime: "10 min read",
    category: "API",
    image:
      "https://images.unsplash.com/photo-1580776058497-95970bfb345c?q=80&w=2070",
    link: "https://graphql.org/blog/", // Official GraphQL blog
  },
  {
    id: "web-security-essentials",
    title: "Web Security Essentials Every Developer Must Know",
    excerpt:
      "Critical security concepts and practices that every web developer should understand to protect applications from common vulnerabilities and attacks.",
    date: "2022-07-15",
    readTime: "14 min read",
    category: "Security",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070",
    link: "https://owasp.org/www-project-top-ten/", // OWASP Top Ten (a key resource for web security)
  },
  {
    id: "state-management-2023",
    title: "State Management in 2023: Beyond Redux",
    excerpt:
      "Explore modern state management solutions for React applications. From Context API to Recoil, Jotai, and Zustand - which one is right for your project?",
    date: "2022-06-22",
    readTime: "11 min read",
    category: "React",
    image:
      "https://images.unsplash.com/photo-1581093196277-9f6070db5ce4?q=80&w=2070",
    link: "https://blog.bitsrc.io/", // Bitovi's blog (often covers React state management)
  },
  {
    id: "micro-frontends",
    title: "Micro Frontends: Breaking Down the Monolith",
    excerpt:
      "How to implement the micro frontends architecture to scale your frontend development across multiple teams and improve maintainability.",
    date: "2022-05-18",
    readTime: "12 min read",
    category: "Architecture",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2074",
    link: "https://martinfowler.com/articles/microfrontends.html", // Martin Fowler's articles (influential in software architecture)
  },
];

// Categories for filtering
const categories = [
  { value: "all", label: "All Posts" },
  { value: "React", label: "React" },
  { value: "CSS", label: "CSS" },
  { value: "Next.js", label: "Next.js" },
  { value: "Animation", label: "Animation" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Accessibility", label: "Accessibility" },
  { value: "Cloud", label: "Cloud" },
  { value: "Design", label: "Design" },
  { value: "API", label: "API" },
  { value: "Security", label: "Security" },
  { value: "Architecture", label: "Architecture" },
];

export function BlogSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  // Filter blog posts based on selected category
  const filteredPosts =
    selectedCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  // Display posts - either all or just the first 6
  const displayPosts = showAll ? filteredPosts : filteredPosts.slice(0, 6);

  // Format date function
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };


  const handleShowLess = () => {
    setShowAll(false);
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50); // slight delay to ensure posts are collapsed before scrolling
  };
  return (
    <section
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
      id="blog"
    >
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
                <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">
                  Latest Articles
                </h2>
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
                Insights, tutorials, and thoughts on frontend development and
                design
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
                  variant={
                    selectedCategory === category.value ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(category.value);
                    setShowAll(false); // Reset showAll when changing categories
                  }}
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
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPosts.map((post, index) => {
              console.log(post, "post");

              return (
                <ParallaxElement
                  key={post.id}
                  speed={0.1 * (index % 6 + 1)}
                  direction="up"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      delay: 0.1 * (index % 6),
                      duration: 0.5,
                    }}
                    whileHover={{ y: -5 }}
                    layout
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
                          <Badge className="bg-primary/90 hover:bg-primary text-white border-none">
                            {post.category}
                          </Badge>
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
                        <h3 className="text-xl font-bold mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <a
                          href={`${post.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <Button
                            variant="ghost"
                            className="group p-0 h-auto font-medium text-primary"
                          >
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ParallaxElement>
              )
            })}
          </motion.div>

          {/* View More Button - Only show if there are more posts to display */}
          {filteredPosts.length > 6 && (
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
                className="group"
                onClick={() => showAll ? handleShowLess() : setShowAll(true)}
              >
                {!showAll ? "View More" : "View Less"}
                <ChevronDown className={`${showAll ? "rotate-180" : ""} ml-2 h-4 w-4 transition-transform group-hover:translate-y-1"`} />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

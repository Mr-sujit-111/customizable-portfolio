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
    features: [
      "Real-time data visualization with interactive charts",
      "Customizable dashboard widgets with drag-and-drop functionality",
      "Comprehensive reporting tools with export options (PDF, CSV, Excel)",
      "Role-based access control for different user types",
      "Dark and light theme support with custom color schemes",
      "Responsive design for desktop, tablet, and mobile devices",
      "Data filtering and advanced search capabilities",
      "Automated alerts and notifications for key metrics",
    ],
    challenges: [
      {
        challenge: "Performance optimization for large datasets",
        solution:
          "Implemented data virtualization, pagination, and efficient rendering techniques to handle millions of data points without compromising performance.",
      },
      {
        challenge: "Real-time updates without overwhelming the server",
        solution:
          "Used WebSockets with throttling and batching strategies to provide real-time updates while minimizing server load and network traffic.",
      },
      {
        challenge: "Complex filtering and data manipulation",
        solution:
          "Developed a custom query engine that processes complex filters client-side when possible, with server-side fallbacks for more intensive operations.",
      },
    ],
    screenshots: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        caption: "Main dashboard view with key performance indicators and real-time charts",
      },
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        caption: "Advanced analytics page with detailed data visualization",
      },
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        caption: "Custom report builder interface with drag-and-drop components",
      },
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        caption: "User management and role-based access control panel",
      },
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        caption: "Mobile view of the dashboard with responsive design",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example video URL
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
    features: [
      "Product catalog with advanced filtering and search capabilities",
      "User accounts with order history and saved payment methods",
      "Wishlist and favorites functionality",
      "Secure checkout with multiple payment options (Stripe, PayPal)",
      "Inventory management system with low stock alerts",
      "Order tracking and shipment notifications",
      "Admin dashboard for product, order, and customer management",
      "Analytics and reporting for sales performance",
    ],
    challenges: [
      {
        challenge: "Cart persistence across devices and sessions",
        solution:
          "Implemented a hybrid approach using local storage for anonymous users and database storage for logged-in users, with automatic merging when users log in.",
      },
      {
        challenge: "Handling high traffic during sales events",
        solution:
          "Utilized serverless functions, caching strategies, and database optimizations to handle traffic spikes without performance degradation.",
      },
      {
        challenge: "Secure payment processing and PCI compliance",
        solution:
          "Integrated with Stripe Elements to handle sensitive payment information off-site while maintaining a seamless checkout experience.",
      },
    ],
    screenshots: [
      {
        url: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        caption: "Homepage with featured products and promotional banners",
      },
      {
        url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        caption: "Product listing page with filtering options",
      },
      {
        url: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        caption: "Product detail page with image gallery and related items",
      },
      {
        url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        caption: "Shopping cart and checkout process",
      },
      {
        url: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        caption: "Admin dashboard for order management",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example video URL
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
    features: [
      "Contract creation with customizable templates and clauses",
      "Document versioning and change tracking",
      "Approval workflows with multi-level authorization",
      "Automated reminders for key dates and renewals",
      "Advanced search and filtering capabilities",
      "Detailed audit trails for compliance purposes",
      "Integration with CRM and ERP systems",
      "Reporting and analytics for contract performance",
    ],
    challenges: [
      {
        challenge: "Complex document versioning and comparison",
        solution:
          "Developed a custom diff algorithm that highlights changes between contract versions while maintaining document formatting and structure.",
      },
      {
        challenge: "Implementing flexible approval workflows",
        solution:
          "Created a configurable workflow engine that allows organizations to define custom approval processes with conditional logic and parallel approvals.",
      },
      {
        challenge: "Ensuring data security and compliance",
        solution:
          "Implemented role-based access control, encryption, and comprehensive audit logging to meet regulatory requirements like GDPR and HIPAA.",
      },
    ],
    screenshots: [
      {
        url: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80",
        caption: "Contract dashboard with status overview and upcoming renewals",
      },
      {
        url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80",
        caption: "Contract creation interface with template selection",
      },
      {
        url: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80",
        caption: "Document editor with version comparison view",
      },
      {
        url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80",
        caption: "Approval workflow configuration panel",
      },
      {
        url: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80",
        caption: "Analytics dashboard with contract performance metrics",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example video URL
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
    features: [
      "Intuitive time entry with drag-and-drop functionality",
      "Project and task categorization with color coding",
      "Recurring event scheduling with customizable patterns",
      "Time tracking with start/stop functionality",
      "Detailed reporting with visual charts and exports",
      "Team management and workload visualization",
      "Integration with popular project management tools",
      "Mobile-friendly interface for on-the-go time tracking",
    ],
    challenges: [
      {
        challenge: "Creating an intuitive drag-and-drop interface",
        solution:
          "Developed a custom grid system with Framer Motion that provides natural interactions with visual feedback and snapping to time increments.",
      },
      {
        challenge: "Handling complex recurring event patterns",
        solution:
          "Implemented a rule-based recurrence engine that can handle sophisticated patterns while maintaining performance.",
      },
      {
        challenge: "Synchronizing offline entries with the server",
        solution:
          "Built a robust offline-first architecture with IndexedDB that automatically syncs when connectivity is restored, handling conflict resolution intelligently.",
      },
    ],
    screenshots: [
      {
        url: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
        caption: "Weekly calendar view with time entries",
      },
      {
        url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
        caption: "Time entry creation interface with project selection",
      },
      {
        url: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
        caption: "Reporting dashboard with productivity analytics",
      },
      {
        url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
        caption: "Team workload visualization and management",
      },
      {
        url: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
        caption: "Mobile view of the time tracking interface",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example video URL
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
    features: [
      "Advanced property search with multiple filtering options",
      "Interactive map view with property clustering",
      "Virtual property tours with 360° images",
      "Mortgage calculator and affordability tools",
      "Saved searches and property alerts",
      "Agent finder and direct messaging",
      "CRM system for agents to manage leads",
      "Market trends and neighborhood analytics",
    ],
    challenges: [
      {
        challenge: "Optimizing map performance with thousands of properties",
        solution:
          "Implemented property clustering, viewport-based loading, and efficient marker management to maintain smooth performance even with large datasets.",
      },
      {
        challenge: "Creating immersive virtual tours",
        solution:
          "Developed a custom 360° viewer that loads high-resolution images progressively and supports hotspots for interactive elements.",
      },
      {
        challenge: "Accurate geolocation and neighborhood data",
        solution:
          "Integrated multiple data sources and implemented a geocoding cache to provide accurate and comprehensive location information.",
      },
    ],
    screenshots: [
      {
        url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80",
        caption: "Homepage with featured properties and search",
      },
      {
        url: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80",
        caption: "Map view with property markers and filtering",
      },
      {
        url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80",
        caption: "Property detail page with image gallery and features",
      },
      {
        url: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80",
        caption: "Virtual tour interface with 360° navigation",
      },
      {
        url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80",
        caption: "Agent dashboard with lead management",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example video URL
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
    features: [
      "Secure authentication with biometric options",
      "Real-time transaction history and account balances",
      "Bill payment and recurring payment scheduling",
      "Money transfers between accounts and to other users",
      "Mobile check deposit with image capture",
      "Budgeting tools and spending analytics",
      "Card management (freeze, report lost, set limits)",
      "ATM and branch locator with directions",
    ],
    challenges: [
      {
        challenge: "Ensuring security while maintaining usability",
        solution:
          "Implemented a layered security approach with biometrics, encryption, and session management that balances protection with a smooth user experience.",
      },
      {
        challenge: "Handling offline transactions",
        solution:
          "Developed a queuing system that securely stores pending transactions locally and executes them when connectivity is restored, with appropriate validations.",
      },
      {
        challenge: "Cross-platform consistency",
        solution:
          "Created a unified design system and component library that ensures consistent behavior and appearance across iOS and Android while respecting platform conventions.",
      },
    ],
    screenshots: [
      {
        url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        caption: "Login screen with biometric authentication",
      },
      {
        url: "https://images.unsplash.com/photo-1611174743420-3d7df880ce32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        caption: "Account dashboard with balances and recent transactions",
      },
      {
        url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        caption: "Money transfer interface with recipient selection",
      },
      {
        url: "https://images.unsplash.com/photo-1611174743420-3d7df880ce32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        caption: "Bill payment scheduling and management",
      },
      {
        url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        caption: "Spending analytics with category breakdown",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example video URL
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
          <TabsList className="grid grid-cols-4 md:w-[600px] mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
            <TabsTrigger value="video">Demo Video</TabsTrigger>
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
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-1">
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
                    className={`flex-shrink-0 cursor-pointer transition-all duration-200 ${
                      currentImageIndex === index ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"
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

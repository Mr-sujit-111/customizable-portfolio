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
  {
    id: "bootstrap-landing-page",
    title: "Bootstrap Landing Page",
    description: "Designed a modern, responsive landing page and portfolio using Bootstrap in Next.js, focusing on clean layout and smooth user experience.",
    longDescription: "A clean, responsive landing page developed using Bootstrap 4 and Next.js, emphasizing mobile-first design and performance optimization. The project showcases a professional portfolio layout, smooth navigation, and lightweight components using Lucide Icons for clarity. Custom CSS enhancements ensure unique branding while maintaining Bootstrap’s robust structure. Ideal for personal portfolios or small business websites requiring modern aesthetics and functionality.",
    techStack: ["Next.js", "CSS-3", "Bootstrap-4", "lucide Icons"],
    github: "https://github.com/Mr-sujit-111/Bootstrap-showcase",
    live: "https://bootstrap-teal-mu.vercel.app/",
    image: "/projects/Bootstrap/Sujit-Bhanderi-Frontend-Developer.png",
    features: [
      "Fully responsive layout adapting across all devices",
      "Mobile-first approach with Bootstrap’s grid system",
      "Professional portfolio sections with smooth navigation",
      "Integration of Lucide Icons for scalable UI elements",
      "Optimized loading performance for better UX",
    ],
    challenges: [
      {
        challenge: "1. Managing custom CSS overrides with Bootstrap defaults",
        solution: "Created scoped styles to extend Bootstrap classes while preserving modularity and preventing conflicts.",
      },
      {
        challenge: "2. Improving mobile performance and load times",
        solution: "Implemented image compression techniques and deferred script loading to enhance page speed, especially on mobile networks.",
      },
      {
        challenge: "3. Fine-tuning anchor link scrolling behavior",
        solution: "Customized smooth scrolling for anchor links to create a more polished and fluid navigation experience.",
      },
    ],
    screenshots: [
      {
        url: "/projects/Bootstrap/Sujit-Bhanderi-Frontend-Developer.png",
        caption: "",
      },
      {
        url: "/projects/Bootstrap/Sujit-Bhanderi-Frontend-Developer (1).png",
        caption: "",
      },
      {
        url: "/projects/Bootstrap/Sujit-Bhanderi-Frontend-Developer (2).png",
        caption: "",
      },
      {
        url: "/projects/Bootstrap/Sujit-Bhanderi-Frontend-Developer (3).png",
        caption: "",
      },
      {
        url: "/projects/Bootstrap/Sujit-Bhanderi-Frontend-Developer (4).png",
        caption: "",
      },
      {
        url: "/projects/Bootstrap/Sujit-Bhanderi-Frontend-Developer (5).png",
        caption: "",
      },
      {
        url: "/projects/Bootstrap/Sujit-Bhanderi-Frontend-Developer (6).png",
        caption: "",
      },
      {
        url: "/projects/Bootstrap/Sujit-Bhanderi-Frontend-Developer (7).png",
        caption: "",
      },
      {
        url: "/projects/Bootstrap/Sujit-Bhanderi-Frontend-Developer (8).png",
        caption: "",
      },
      {
        url: "/projects/Bootstrap/Sujit-Bhanderi-Frontend-Developer (9).png",
        caption: "",
      },
      {
        url: "/projects/Bootstrap/Sujit-Bhanderi-Frontend-Developer (10).png",
        caption: "",
      },
    ],
    videoUrl: "",
  },
  {
    id: "frammer-motion-portfolio",
    title: "Framer Motion Portfolio",
    description: "Built a dynamic and modern portfolio using Framer Motion and Next.js, focusing on smooth animations, responsive design, and an interactive user experience.",
    longDescription:
      "This portfolio showcases my frontend expertise using Framer Motion and Next.js. The layout is designed with Tailwind CSS and animated for an immersive experience. Components animate on scroll, hover, and route transitions. Developed using TypeScript for scalability and maintainability.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Typescript", "Lucide Icons"],
    github: "https://github.com/Mr-sujit-111/frammer-showcase",
    live: "https://frammer.vercel.app/",
    image: "/projects/frammer/Screenshot.png",
    features: [
      "Smooth scroll-based and page-transition animations",
      "Fully responsive layout for all screen sizes",
      "Interactive components with motion effects",
      "Optimized loading using dynamic imports",
      "Strong type safety using TypeScript",
      "Minimal and modern UI with Tailwind CSS",
    ],
    challenges: [
      {
        challenge: "Achieving smooth scroll-based animations",
        solution:
          "Utilized Framer Motion’s scroll animations with custom easing and staggered reveals.",
      },
      {
        challenge: "Maintaining performance during heavy animations",
        solution:
          "Leveraged lazy loading and reduced motion preferences for better performance.",
      },
      {
        challenge: "Ensuring type safety across dynamic components",
        solution:
          "Implemented TypeScript interfaces and type guards to validate props and component contracts.",
      },
      {
        challenge: "Integrating animation while preserving layout stability",
        solution:
          "Used layout animations and Framer Motion’s layoutId to avoid visual jumps.",
      },
      {
        challenge: "Managing interactive states with animation triggers",
        solution:
          "Combined useAnimation controls with state hooks for fine-grained motion control.",
      }
    ],
    screenshots: [
      {
        url: "/projects/frammer/Screenshot.png",
        caption: "",
      },
      {
        url: "/projects/frammer/Sujit-Bhanderi-Framer-Motion-Expert.png",
        caption: "",
      },
      {
        url: "/projects/frammer/Sujit-Bhanderi-Framer-Motion-Expert (1).png",
        caption: "",
      },
      {
        url: "/projects/frammer/Sujit-Bhanderi-Framer-Motion-Expert (2).png",
        caption: "",
      },
      {
        url: "/projects/frammer/Sujit-Bhanderi-Framer-Motion-Expert (3).png",
        caption: "",
      },
      {
        url: "/projects/frammer/Sujit-Bhanderi-Framer-Motion-Expert (4).png",
        caption: "",
      },
      {
        url: "/projects/frammer/Sujit-Bhanderi-Framer-Motion-Expert (5).png",
        caption: "",
      },
      {
        url: "/projects/frammer/Sujit-Bhanderi-Framer-Motion-Expert (6).png",
        caption: "",
      },
      {
        url: "/projects/frammer/Sujit-Bhanderi-Framer-Motion-Expert (7).png",
        caption: "",
      },
      {
        url: "/projects/frammer/Sujit-Bhanderi-Framer-Motion-Expert (8).png",
        caption: "",
      },
      {
        url: "/projects/frammer/Sujit-Bhanderi-Framer-Motion-Expert (9).png",
        caption: "",
      }
    ],
    videoUrl: ""
  },
  {
    id: "admin-panel-shadcn",
    title: "Admin Panel with Shadcn UI",
    description: "Developed a modern, fully responsive admin dashboard using Shadcn UI, TailwindCSS, Next.js, and TypeScript, featuring dynamic components, dark mode, and elegant layouts.",
    longDescription:
      "This project features an elegant, dark mode enabled admin panel developed using Shadcn UI and Next.js. TailwindCSS ensures responsive layouts while TypeScript enhances code safety. Dynamic components allow flexibility in managing dashboard data, while smooth animations enhance the user experience.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    github: "https://github.com/Mr-sujit-111/Shadcn-admin",
    live: "https://shadcn-admin-nu.vercel.app/",
    image: "/projects/admin/Admin-Dashboard.png",
    features: [
      "Fully responsive and mobile-friendly dashboard",
      "Dynamic, reusable components using Shadcn UI",
      "Dark mode toggle for improved user experience",
      "Customizable charts and tables for data management",
      "Optimized performance with Next.js and TypeScript",
      "Modern UI with Tailwind CSS for styling",
      "Easy-to-navigate sidebar with animated transitions",
    ],
    challenges: [
      {
        challenge: "Ensuring a fully responsive design across devices",
        solution:
          "Utilized TailwindCSS to implement a mobile-first approach with adaptive grid layouts.",
      },
      {
        challenge: "Implementing dynamic data management in the dashboard",
        solution:
          "Created reusable, dynamic components with Shadcn UI and managed state with React hooks.",
      },
      {
        challenge: "Designing a user-friendly and intuitive dark mode",
        solution:
          "Integrated a toggle for dark mode, using CSS variables to switch themes seamlessly.",
      },
      {
        challenge: "Optimizing performance for large data sets",
        solution:
          "Implemented pagination and lazy loading to handle large amounts of data efficiently.",
      },
      {
        challenge: "Ensuring cross-browser compatibility",
        solution:
          "Tested thoroughly on different browsers and used fallbacks for CSS properties to ensure consistency.",
      }
    ],
    screenshots: [
      {
        url: "/projects/admin/Admin-Dashboard (13).png",
        caption: "",
      },
      {
        url: "/projects/admin/Admin-Dashboard.png",
        caption: "",
      },
      {
        url: "/projects/admin/Admin-Dashboard (1).png",
        caption: "",
      },
      {
        url: "/projects/admin/Admin-Dashboard (2).png",
        caption: "",
      },
      {
        url: "/projects/admin/Admin-Dashboard (3).png",
        caption: "",
      },
      {
        url: "/projects/admin/Admin-Dashboard (4).png",
        caption: "",
      },
      {
        url: "/projects/admin/Admin-Dashboard (5).png",
        caption: "",
      },
      {
        url: "/projects/admin/Admin-Dashboard (6).png",
        caption: "",
      },
      {
        url: "/projects/admin/Admin-Dashboard (7).png",
        caption: "",
      },
      {
        url: "/projects/admin/Admin-Dashboard (8).png",
        caption: "",
      },
      {
        url: "/projects/admin/Admin-Dashboard (9).png",
        caption: "",
      },
      {
        url: "/projects/admin/Admin-Dashboard (10).png",
        caption: "",
      },
      {
        url: "/projects/admin/Admin-Dashboard (11).png",
        caption: "",
      },
      {
        url: "/projects/admin/Admin-Dashboard (12).png",
        caption: "",
      },

    ],
    videoUrl: ""
  },
  {
    id: "framer-parallax-scroll",
    title: "Framer Motion Parallax Scroll",
    description: "Built an interactive parallax scroll animation using Framer Motion and Next.js, showcasing smooth class-based animation effects and responsive scroll-driven layouts.",
    longDescription:
      "This project demonstrates a parallax scrolling effect built with Framer Motion and Next.js. The scroll-driven animations create a smooth and engaging experience as elements move in response to the user's scroll position. Tailwind CSS is used to ensure the design is fully responsive across devices.",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/Mr-sujit-111/frammer-animation",
    live: "https://frammer-animation.vercel.app/",
    image: "/projects/Frammer-animation/Scroll-Animations-with-Framer-Motion.png",
    features: [
      "Smooth parallax scrolling effects with Framer Motion",
      "Responsive design for optimal viewing on all devices",
      "Interactive animations based on user scroll position",
      "Optimized performance for smooth user experience",
      "Customizable animations and transitions",
    ],
    challenges: [
      {
        challenge: "Ensuring smooth animation performance across devices",
        solution:
          "Used Framer Motion's powerful animation API and optimized scroll-triggered animations to maintain performance.",
      },
      {
        challenge: "Creating a fully responsive layout with parallax effects",
        solution:
          "Leveraged Tailwind CSS's utility-first design approach to create a fluid, responsive layout that adapts to different screen sizes.",
      },
      {
        challenge: "Handling scroll-driven animations without affecting performance",
        solution:
          "Optimized scroll event handling using Framer Motion's animation hooks to achieve smooth and seamless parallax scrolling.",
      }
    ],
    screenshots: [
      {
        url: "/projects/Frammer-animation/Scroll-Animations-with-Framer-Motion.png",
        caption: "",
      },
      {
        url: "/projects/Frammer-animation/Scroll-Animations-with-Framer-Motion (1).png",
        caption: "",
      },
      {
        url: "/projects/Frammer-animation/Scroll-Animations-with-Framer-Motion (2).png",
        caption: "",
      },
      {
        url: "/projects/Frammer-animation/Scroll-Animations-with-Framer-Motion (3).png",
        caption: "",
      },
      {
        url: "/projects/Frammer-animation/Scroll-Animations-with-Framer-Motion (4).png",
        caption: "",
      },
      {
        url: "/projects/Frammer-animation/Scroll-Animations-with-Framer-Motion (5).png",
        caption: "",
      },
      {
        url: "/projects/Frammer-animation/Scroll-Animations-with-Framer-Motion (6).png",
        caption: "",
      },
      {
        url: "/projects/Frammer-animation/Scroll-Animations-with-Framer-Motion (7).png",
        caption: "",
      },
      {
        url: "/projects/Frammer-animation/Scroll-Animations-with-Framer-Motion (8).png",
        caption: "",
      },
      {
        url: "/projects/Frammer-animation/Scroll-Animations-with-Framer-Motion (9).png",
        caption: "",
      },
      {
        url: "/projects/Frammer-animation/Scroll-Animations-with-Framer-Motion (10).png",
        caption: "",
      },
      {
        url: "/projects/Frammer-animation/Scroll-Animations-with-Framer-Motion (11).png",
        caption: "",
      }
    ],
    videoUrl: ""
  },
  {
    id: "tshirt-design-app",
    title: "T-shirt Designer App",
    description:
      "Created an interactive T-shirt design tool using React.js, MUI, and Firebase, allowing users to drag and drop tattoos onto a T-shirt, customize tattoo size, change T-shirt colors, and download designs as images using html2canvas.",
    longDescription:
      "This T-shirt designer app allows users to customize T-shirt designs by adding tattoos, changing the size of the tattoos, adjusting T-shirt colors, and downloading their design as an image. Built with React.js, MUI, and Firebase, the app offers a drag-and-drop interface for ease of use, with html2canvas enabling image generation for downloads.",
    techStack: [
      "React.js",
      "MUI (@mui/material)",
      "CSS3",
      "HTML5",
      "Firebase",
      "html2canvas",
      "Drag and Drop (custom)",
    ],
    github: "https://github.com/Mr-sujit-111/tshirt-design",
    live: "https://t-shirt-design-5818e.web.app/",
    image: "/projects/t-shirt/T-shirt-Design-App (1).png",
    features: [
      "Interactive drag-and-drop T-shirt design interface",
      "Customization of tattoo size and T-shirt color",
      "Downloadable design images using html2canvas",
      "Real-time preview of custom designs",
      "User-friendly MUI-based interface",
    ],
    challenges: [
      {
        challenge: "Implementing drag-and-drop functionality",
        solution:
          "Developed a custom drag-and-drop system to allow users to easily add and position tattoos on the T-shirt.",
      },
      {
        challenge: "Generating downloadable design images",
        solution:
          "Utilized html2canvas to capture the canvas area and convert the design into an image format for easy download.",
      },
    ],
    screenshots: [
      {
        url: "/projects/t-shirt/T-shirt-Design-App.png",
        caption: "",
      },
      {
        url: "/projects/t-shirt/T-shirt-Design-App (1).png",
        caption: "",
      },
      {
        url: "/projects/t-shirt/T-shirt-Design-App (2).png",
        caption: "",
      },
      {
        url: "/projects/t-shirt/T-shirt-Design-App (3).png",
        caption: "",
      },
      {
        url: "/projects/t-shirt/T-shirt-Design-App (4).png",
        caption: "",
      },
      {
        url: "/projects/t-shirt/T-shirt-Design-App (5).png",
        caption: "",
      },
      {
        url: "/projects/t-shirt/T-shirt-Design-App (6).png",
        caption: "",
      },
      {
        url: "/projects/t-shirt/T-shirt-Design-App (7).png",
        caption: "",
      },
    ],
    videoUrl: "",
  },
  {
    id: "astrology-animated-app",
    title: "Astrology Animated App",
    description:
      "Developed an interactive astrology-based animated app using pure HTML, CSS3, and JavaScript. The app features a three-step journey where users select a zodiac sign, choose a random card, and reveal a final downloadable card result.",
    longDescription:
      "This astrology animated app lets users experience a three-step journey: selecting a zodiac sign, picking a random card, and unveiling a downloadable result card. Built with pure HTML, CSS3, and JavaScript, the app incorporates custom animations to make the experience engaging and fun.",
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6)",
      "Custom Animations",
    ],
    github: "https://github.com/Mr-sujit-111/animated-app",
    live: "https://animatedcontent.000webhostapp.com/",
    image: "/projects/Animated-cards/Animated-page.png",
    features: [
      "Interactive three-step process: select a zodiac, choose a card, reveal a result",
      "Custom animations for smooth transitions",
      "Simple and intuitive user interface",
      "Downloadable card result for users",
    ],
    challenges: [
      {
        challenge: "Creating smooth, custom animations",
        solution:
          "Used CSS3 animations and keyframes to animate card reveals, sign selection, and transitions between steps.",
      },
      {
        challenge: "Ensuring smooth performance across devices",
        solution:
          "Optimized animations for better performance on mobile devices and ensured responsiveness for a seamless experience.",
      },
    ],
    screenshots: [
      {
        url: "/projects/Animated-cards/Animated-page.png",
        caption: "",
      },
      {
        url: "/projects/Animated-cards/Animated-page (1).png",
        caption: "",
      },
      {
        url: "/projects/Animated-cards/Animated-page (2).png",
        caption: "",
      },
      {
        url: "/projects/Animated-cards/Animated-page (3).png",
        caption: "",
      },
      {
        url: "/projects/Animated-cards/Animated-page (4).png",
        caption: "",
      },
      {
        url: "/projects/Animated-cards/Animated-page (5).png",
        caption: "",
      },
    ],
    videoUrl: "",
  },
  {
    id: "claybymg-ecommerce",
    title: "ClayByMG E-commerce Website",
    description:
      "Developed a fully functional e-commerce website for clay material products using Next.js, Tailwind CSS, and TypeScript. Features include product listing, add-to-cart functionality with LocalStorage, dynamic content pages, a detailed About page, and a stunning responsive image slider powered by Swiper.js.",
    longDescription:
      "The ClayByMG E-commerce Website is a fully functional online store for clay materials. Built with Next.js, TypeScript, and Tailwind CSS, the website offers dynamic content pages, a responsive product listing, and an interactive image slider powered by Swiper.js. It also includes LocalStorage-based add-to-cart functionality for a seamless shopping experience.",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Swiper.js",
      "LocalStorage",
      "Responsive Design",
      "Framer Motion",
    ],
    github: "https://github.com/Mr-sujit-111/ClayByMG-Ecommerce",
    live: "https://www.claybymg.co.za/",
    image: "/projects/clay-by-mg/claybymg-co-za (1).png",
    features: [
      "Fully responsive e-commerce layout",
      "Product listing and detailed product pages",
      "Add-to-cart functionality with LocalStorage",
      "Swiper.js-powered responsive image slider",
      "Dynamic content rendering for the About page",
      "Optimized for both mobile and desktop devices",
    ],
    challenges: [
      {
        challenge: "Integrating Swiper.js for the image slider",
        solution:
          "Used Swiper.js to create a fully responsive and smooth image slider that adapts to different screen sizes.",
      },
      {
        challenge: "Ensuring dynamic content pages are loaded efficiently",
        solution:
          "Leveraged Next.js's dynamic routing and static site generation for fast content delivery and improved SEO.",
      },
    ],
    screenshots: [
      {
        url: "/projects/clay-by-mg/claybymg-co-za (1).png",
        caption: "",
      },
      {
        url: "/projects/clay-by-mg/claybymg-co-za (2).png",
        caption: "",
      },
      {
        url: "/projects/clay-by-mg/claybymg-co-za (3).png",
        caption: "",
      },
      {
        url: "/projects/clay-by-mg/claybymg-co-za (4).png",
        caption: "",
      },
      {
        url: "/projects/clay-by-mg/claybymg-co-za (5).png",
        caption: "",
      },
      {
        url: "/projects/clay-by-mg/claybymg-co-za-shop-stoneware-semplice.png",
        caption: "",
      },
      {
        url: "/projects/clay-by-mg/Clay-by-MG-Semplice-Espresso-Cup (1).png",
        caption: "",
      },
      {
        url: "/projects/clay-by-mg/Clay-by-MG-Semplice-Espresso-Cup.png",
        caption: "",
      },
      {
        url: "/projects/clay-by-mg/claybymg-co-za-about.png",
        caption: "",
      },
      {
        url: "/projects/clay-by-mg/claybymg-co-za-cart.png",
        caption: "",
      },
      {
        url: "/projects/clay-by-mg/claybymg-co-za-contact.png",
        caption: "",
      },
      {
        url: "/projects/clay-by-mg/claybymg-co-za-faq (1).png",
        caption: "",
      },
      {
        url: "/projects/clay-by-mg/claybymg-co-za-faq.png",
        caption: "",
      },
      {
        url: "/projects/clay-by-mg/Checkout-Clay-by-MG.png",
        caption: "",
      },

    ],
    videoUrl: "",
  },
  {
    id: "Clearviewcleaners-landing-page",
    title: "Cleaning-web App",
    description:
      "Designed and developed a professional landing page for a cleaning service business, ClearView Cleaners. Built using Next.js, Tailwind CSS, and TypeScript with a focus on a clean, responsive design. Features service highlights, about section, testimonials, and an engaging call-to-action to maximize customer conversions.",
    longDescription:
      "The Clearview Cleaners landing page is a clean, professional, and responsive website designed to showcase the services of a cleaning business. Built using Next.js, TypeScript, and Tailwind CSS, it includes sections such as service highlights, customer testimonials, and an about section, with a compelling call-to-action to boost conversions.",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Framer Motion",
      "Responsive Design",
      "Shadcn UI",
    ],
    github: "https://github.com/rushi9814/Cleaning-app",
    live: "https://clearviewcleaners.vercel.app/",
    image: "/projects/Cleaning/Clearview-Cleaners-Premium-Cleaning-Services.png",
    features: [
      "Clean and professional design tailored for a cleaning service business",
      "Fully responsive layout for both mobile and desktop users",
      "Service highlights and customer testimonials sections for trust-building",
      "Engaging call-to-action to increase customer conversions",
      "Smooth transitions and animations using Framer Motion",
    ],
    challenges: [
      {
        challenge: "Ensuring responsiveness across multiple devices",
        solution:
          "Utilized Tailwind CSS with a mobile-first approach to ensure the landing page adapts seamlessly to all screen sizes.",
      },
      {
        challenge: "Creating smooth animations for transitions",
        solution:
          "Leveraged Framer Motion to add smooth page transitions and hover effects to enhance the user experience.",
      },
    ],
    screenshots: [
      {
        url: "/projects/Cleaning/Clearview-Cleaners-Premium-Cleaning-Services.png",
        caption: "",
      },
      {
        url: "/projects/Cleaning/Clearview-Cleaners-Premium-Cleaning-Services (1).png",
        caption: "",
      },
      {
        url: "/projects/Cleaning/Clearview-Cleaners-Premium-Cleaning-Services (2).png",
        caption: "",
      },
      {
        url: "/projects/Cleaning/Clearview-Cleaners-Premium-Cleaning-Services (3).png",
        caption: "",
      },
      {
        url: "/projects/Cleaning/Clearview-Cleaners-Premium-Cleaning-Services (4).png",
        caption: "",
      },
    ],
    videoUrl: "",
  },
  {
    id: "flight-booking-app",
    title: "Flight Booking Application",
    description:
      "Developed a responsive flight booking application using Next.js and Tailwind CSS. Users can search for flights, view available options, and proceed through a seamless booking flow. Focused on modern, intuitive UI/UX and performance optimization.",
    longDescription:
      "The Flight Booking Application provides users with a seamless and responsive interface to search for flights, view available options, and complete bookings with ease. Built with Next.js and Tailwind CSS, it focuses on performance optimization, intuitive design, and a smooth user experience.",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Responsive Design",
      "Framer Motion",
    ],
    github: "https://github.com/Mr-sujit-111/flight-booking-app",
    live: "https://flight-booking-app-taupe.vercel.app/",
    image: "/projects/flight/React-App.png",
    features: [
      "Flight search functionality with filters for destinations, dates, and prices",
      "Responsive layout for both desktop and mobile users",
      "Modern UI/UX design with smooth animations and transitions using Framer Motion",
      "Booking flow with seamless navigation and performance optimization",
    ],
    challenges: [
      {
        challenge: "Ensuring a smooth user experience for mobile users",
        solution:
          "Used Tailwind CSS's responsive design utilities to create an interface that works perfectly across all screen sizes.",
      },
      {
        challenge: "Handling complex state for flight bookings",
        solution:
          "Utilized React Context API to manage global state for the booking flow, keeping the UI in sync with the user's selections.",
      },
    ],
    screenshots: [
      {
        url: "/projects/flight/React-App.png",
        caption: "",
      },
      {
        url: "/projects/flight/React-App (1).png",
        caption: "",
      },
      {
        url: "/projects/flight/React-App (2).png",
        caption: "",
      },
      {
        url: "/projects/flight/React-App (3).png",
        caption: "",
      },
      {
        url: "/projects/flight/React-App (4).png",
        caption: "",
      },
      {
        url: "/projects/flight/React-App (5).png",
        caption: "",
      },
      {
        url: "/projects/flight/React-App (6).png",
        caption: "",
      },
      {
        url: "/projects/flight/React-App (7).png",
        caption: "",
      },
      {
        url: "/projects/flight/React-App (8).png",
        caption: "",
      },
      {
        url: "/projects/flight/React-App (9).png",
        caption: "",
      },
      {
        url: "/projects/flight/React-App (10).png",
        caption: "",
      },
      {
        url: "/projects/flight/React-App (11).png",
        caption: "",
      },
      {
        url: "/projects/flight/React-App (12).png",
        caption: "",
      },
      {
        url: "/projects/flight/React-App (13).png",
        caption: "",
      },
      {
        url: "/projects/flight/React-App (14).png",
        caption: "",
      },
    ],
    videoUrl: "",
  },
  {
    id: "personal-portfolio",
    title: "Personal Portfolio Website",
    description:
      "Created a personal portfolio website to showcase my frontend development skills, projects, and experience. Built with React.js, Tailwind CSS, and TypeScript, featuring smooth animations, responsive design, and a clean, modern UI/UX.",
    longDescription:
      "The Personal Portfolio Website showcases my frontend development expertise and projects. It is built using React.js, Tailwind CSS, and TypeScript with a focus on responsive design, smooth animations, and a clean, modern UI. The website aims to highlight my skills and experiences effectively, with a user-friendly layout.",
    techStack: [
      "React.js",
      "Tailwind CSS",
      "TypeScript",
      "Framer Motion",
      "Responsive Design",
    ],
    github: "https://github.com/Mr-sujit-111/Personal-Portfolio",
    live: "https://sujit-cv.netlify.app/",
    image: "/projects/netlify-portfolio/Sujit-Portfolio.png",
    features: [
      "Responsive design for desktop, tablet, and mobile devices",
      "Smooth animations with Framer Motion for UI transitions",
      "Showcase of frontend development skills, projects, and experience",
      "Modern, clean user interface focusing on clarity and readability",
    ],
    challenges: [
      {
        challenge: "Ensuring smooth animations across devices",
        solution:
          "Used Framer Motion to create animations that adjust fluidly for different screen sizes and browsers.",
      },
      {
        challenge: "Optimizing performance for faster load times",
        solution:
          "Leveraged code splitting and lazy loading to ensure quick loading of pages and assets.",
      },
    ],
    screenshots: [
      {
        url: "/projects/netlify-portfolio/Sujit-Portfolio.png",
        caption: "",
      },
      {
        url: "/projects/netlify-portfolio/Sujit-Portfolio (1).png",
        caption: "",
      },
      {
        url: "/projects/netlify-portfolio/Sujit-Portfolio (2).png",
        caption: "",
      },
      {
        url: "/projects/netlify-portfolio/Sujit-Portfolio (3).png",
        caption: "",
      },
      {
        url: "/projects/netlify-portfolio/Sujit-Portfolio (4).png",
        caption: "",
      },
      {
        url: "/projects/netlify-portfolio/Sujit-Portfolio (5).png",
        caption: "",
      },
    ],
    videoUrl: "",
  },
  {
    id: "improved-animated-portfolio",
    title: "Animated Portfolio",
    description:
      "Built an enhanced animated portfolio with Next.js, Framer Motion, and TypeScript. Features include parallax animations, snap scroll, and responsive design for a smooth and dynamic user experience. This project showcases my skills with modern web technologies and animations.",
    longDescription:
      "The Animated Portfolio features a dynamic design with parallax animations, snap scroll effects, and a fully responsive layout. Built using Next.js, Framer Motion, and TypeScript, this portfolio emphasizes a smooth and immersive user experience, allowing users to interact with the content seamlessly. It demonstrates my proficiency in modern web technologies and animation techniques.",
    techStack: [
      "Next.js",
      "Framer Motion (Parallax Animations)",
      "Snap Scroll",
      "Responsive Design",
      "TypeScript",
    ],
    github: "https://github.com/Mr-sujit-111/modern-cv",
    live: "https://sujit-cv.vercel.app/",
    image: "/projects/vercel-portfolio/Create-Next-App.png",
    features: [
      "Parallax animations to create depth and dynamic visual effects",
      "Snap scroll functionality for smooth page transitions",
      "Fully responsive design for different screen sizes",
      "Modern, clean UI with engaging animations to enhance user experience",
    ],
    challenges: [
      {
        challenge: "Implementing smooth parallax animations across devices",
        solution:
          "Used Framer Motion to create animations that scale seamlessly across various screen sizes and devices.",
      },
      {
        challenge: "Ensuring quick load times for a performance-heavy website",
        solution:
          "Optimized image loading with lazy loading and used Next.js' static generation to improve overall performance.",
      },
    ],
    screenshots: [
      {
        url: "/projects/vercel-portfolio/Create-Next-App.png",
        caption: "",
      },
      {
        url: "/projects/vercel-portfolio/Create-Next-App (1).png",
        caption: "",
      },
      {
        url: "/projects/vercel-portfolio/Create-Next-App (2).png",
        caption: "",
      },
      {
        url: "/projects/vercel-portfolio/Create-Next-App (3).png",
        caption: "",
      },
      {
        url: "/projects/vercel-portfolio/Create-Next-App (4).png",
        caption: "",
      },
      {
        url: "/projects/vercel-portfolio/Create-Next-App (5).png",
        caption: "",
      },
      {
        url: "/projects/vercel-portfolio/Create-Next-App (6).png",
        caption: "",
      },
      {
        url: "/projects/vercel-portfolio/Create-Next-App (7).png",
        caption: "",
      },
      {
        url: "/projects/vercel-portfolio/Create-Next-App (8).png",
        caption: "",
      },
      {
        url: "/projects/vercel-portfolio/Create-Next-App (9).png",
        caption: "",
      },
      {
        url: "/projects/vercel-portfolio/Create-Next-App (10).png",
        caption: "",
      },
      {
        url: "/projects/vercel-portfolio/Create-Next-App (11).png",
        caption: "",
      },
      {
        url: "/projects/vercel-portfolio/Create-Next-App (12).png",
        caption: "",
      },
      {
        url: "/projects/vercel-portfolio/Create-Next-App (13).png",
        caption: "",
      },
      {
        url: "/projects/vercel-portfolio/Create-Next-App (14).png",
        caption: "",
      },
    ],
    videoUrl: "",
  },
  {
    id: "3d-animated-card-portfolio",
    title: "Customizable Advance Portfolio",
    description:
      "Created a 3D animated card portfolio using Next.js 15, Shadcn UI, TypeScript, and Tailwind CSS. Features custom animations on hover for each card, showcasing my frontend development skills with interactive and dynamic UI/UX design. This project is built for performance and smooth animations.",
    longDescription:
      "This 3D animated card portfolio highlights modern frontend development with Next.js 15 and Shadcn UI. The project features custom animations on hover for each card, offering a dynamic user experience while demonstrating advanced UI/UX design concepts. Built with a focus on smooth performance and responsiveness, this portfolio also showcases an interactive 3D card transition effect.",
    techStack: [
      "Next.js 15",
      "Shadcn UI",
      "TypeScript",
      "Tailwind CSS",
      "3D Card Transition",
    ],
    github: "https://github.com/Mr-sujit-111/customizable-portfolio",
    live: "https://customizable-portfolio-eta.vercel.app/",
    image: "/projects/frammer/portfolio.png",
    features: [
      "Custom hover animations for each card",
      "3D card transition effects",
      "Responsive design for desktop and mobile",
      "Modern UI/UX design showcasing advanced frontend skills",
    ],
    challenges: [
      {
        challenge: "Implementing smooth 3D animations for card transitions",
        solution:
          "Used CSS3 transform and transition properties combined with Tailwind CSS to achieve a fluid 3D card hover effect.",
      },
      {
        challenge: "Ensuring responsiveness and performance on mobile devices",
        solution:
          "Optimized media queries and Tailwind's responsive utilities to ensure smooth performance and appearance across devices.",
      },
    ],
    screenshots: [
      {
        url: "/projects/frammer/portfolio.png",
        caption: "",
      },
    ],
    videoUrl: "",
  },
  {
    id: "google-clone",
    title: "Google Clone",
    description:
      "Created a Google clone with search functionality using Next.js, Tailwind CSS, TypeScript, MUI, Redux, and Styled Components. The project mimics the core features of the Google homepage, including a search bar and responsive design, providing a smooth, modern user experience.",
    longDescription:
      "The Google Clone replicates the basic structure and functionality of the Google homepage, offering a responsive design with a search bar. Built using Next.js, Tailwind CSS, TypeScript, and various modern front-end tools, this project demonstrates the power of combining multiple technologies to achieve a modern user interface.",
    techStack: [
      "ReactJs",
      "MUI",
      "Redux",
      "Styled Components",
      "Search Functionality",
    ],
    github: "https://github.com/Mr-sujit-111/Google-clone",
    live: "https://clone-61cf3.web.app/",
    image: "/projects/google/Google.png",
    features: [
      "Search functionality mimicking Google's search bar",
      "Responsive layout for desktop and mobile views",
      "Modern UI design with smooth transitions and animations",
      "Real-time search results integration (optional)",
    ],
    challenges: [
      {
        challenge: "Implementing real-time search results",
        solution:
          "Used React state management with Redux to handle real-time search queries and responses from an API.",
      },
      {
        challenge: "Creating a responsive layout that mimics the Google homepage",
        solution:
          "Leveraged Tailwind CSS utilities for responsive design and Styled Components for custom styling.",
      },
    ],
    screenshots: [
      {
        url: "/projects/google/Google.png",
        caption: "",
      },
      {
        url: "/projects/google/Google (1).png",
        caption: "",
      },
      {
        url: "/projects/google/Google (2).png",
        caption: "",
      },
      {
        url: "/projects/google/Google (3).png",
        caption: "",
      },
    ],
    videoUrl: "",
  },
  {
    id: "amazon-clone",
    title: "Amazon Clone",
    description:
      "Created an Amazon clone with e-commerce functionalities using Next.js, Tailwind CSS, TypeScript, MUI, Redux, and Styled Components. The project mimics Amazon’s core features, such as product search, shopping cart, and responsive design, offering a modern user experience with dynamic state management and styled components.",
    longDescription:
      "The Amazon Clone replicates the e-commerce functionalities of Amazon, including product search, shopping cart, and user authentication. Built with modern technologies like Next.js, Tailwind CSS, and Redux, this project demonstrates a full-stack e-commerce application with smooth interactions and a responsive UI.",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "MUI",
      "Redux",
      "Styled Components",
      "E-commerce Functionality",
    ],
    github: "https://github.com/Mr-sujit-111/Amazon-clone",
    live: "https://amazon-clone-seven-xi.vercel.app/",
    image: "/projects/Amazon/Amazon-clone.png",
    features: [
      "User authentication and account management",
      "Product search and dynamic filtering",
      "Shopping cart with state persistence",
      "Responsive layout optimized for both desktop and mobile",
    ],
    challenges: [
      {
        challenge: "Integrating the shopping cart functionality",
        solution:
          "Utilized Redux for state management and MUI for smooth UI components to build a dynamic shopping cart.",
      },
      {
        challenge: "Mimicking Amazon's responsive layout and design",
        solution:
          "Leveraged Tailwind CSS utilities for rapid styling and created custom components using Styled Components.",
      },
    ],
    screenshots: [
      {
        url: "/projects/Amazon/Amazon-clone.png",
        caption: "",
      },
      {
        url: "/projects/Amazon/Amazon-clone (1).png",
        caption: "",
      },
      {
        url: "/projects/Amazon/Amazon-clone (2).png",
        caption: "",
      },
      {
        url: "/projects/Amazon/Amazon-clone (3).png",
        caption: "",
      },
      {
        url: "/projects/Amazon/amazon-clone-seven-xi-vercel-app-detail.png",
        caption: "",
      },
    ],
    videoUrl: "",
  }
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

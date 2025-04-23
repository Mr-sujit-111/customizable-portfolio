import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { PhilosophySection } from "@/components/philosophy-section"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ParallaxProvider } from "@/components/parallax-provider"
import { EducationSection } from "@/components/education-section"
import { ProjectCatalog } from "@/components/project-catalog"
import { LanguageDemo } from "@/components/language-demo"
import { ServicesSection } from "@/components/services-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { BlogSection } from "@/components/blog-section"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function Home() {
  return (
    <ParallaxProvider>
      <main className="min-h-screen bg-background">
        <HeroSection />
        <div className="container mx-auto px-4 md:px-6 pt-24">
          <LanguageDemo />
        </div>
        <AboutSection />
        <PhilosophySection />
        <SkillsSection />
        <ServicesSection />
        <ProjectCatalog />
        <PortfolioSection />
        <BlogSection />
        <EducationSection />
        <ExperienceSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <ScrollToTop />
        <ThemeSwitcher />
      </main>
    </ParallaxProvider>
  )
}

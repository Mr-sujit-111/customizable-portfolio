"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Download,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Github,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  Code,
} from "lucide-react"
import { useSettings } from "@/contexts/settings-context"
import { useTranslation } from "@/lib/i18n"
import { languageOptions } from "@/lib/i18n"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

const startingYear = 2021; // update to your actual starting year
const experienceYears = new Date().getFullYear() - startingYear;
// Resume data
const resumeData = {
  personalInfo: {
    name: "Sujit Bhanderi",
    title: "Senior Frontend Developer",
    email: "sbhanderi11@gmail.com",
    phone: "+91 7359068984",
    location: "Surat, Gujarat, India",
    website: "https://sujit-cv.netlify.app/",
    linkedin: "https://in.linkedin.com/in/sujit-bhanderi331",
    github: "https://github.com/Mr-sujit-111",
    summary:
      `Frontend developer with ${experienceYears}+ years of experience building responsive, performant web applications. Specialized in React, Next.js, and modern frontend technologies with a focus on creating exceptional user experiences.`,
  },
  experience: [
    {
      role: "Freelance Frontend Developer",
      company: "Upwork",
      period: "Mar 2024 – Present",
      duration: "Current",
      description:
        "Working as a freelance frontend developer on Upwork, delivering high-quality web applications using the latest technologies in the React and Next.js ecosystem. Partnered with international clients to build scalable, performant, and fully responsive UIs.",
      achievements: [
        "Built and deployed multiple production-grade web apps using Next.js 14/15 and App Router",
        "Integrated advanced features like server components, streaming, and dynamic SEO metadata",
        "Implemented design systems and responsive layouts with Tailwind CSS and Framer Motion",
        "Optimized Core Web Vitals and ensured accessibility best practices",
      ],
      technologies: [
        "Next.js (App Router)",
        "React.js",
        "Tailwind CSS",
        "Framer Motion",
        "Redux",
        "TypeScript",
        "ShadCN",
        "Vercel",
      ],
    },
    {
      role: "ReactJs Developer",
      company: "SoftX Solution",
      period: "Jan 2022 – Mar 2024",
      duration: "2 yrs 3 mos",
      description:
        "Worked as a full-time ReactJs Developer building responsive and optimized web applications. Collaborated with the backend team to integrate APIs and ensure seamless data flow. Delivered production-ready applications using modern frontend technologies.",
      achievements: [
        "Developed and maintained multiple client-facing projects using Next.js and React",
        "Implemented reusable components and design patterns to improve development efficiency",
        "Optimized performance using dynamic imports and lazy loading",
        "Worked closely with UI/UX designers to deliver pixel-perfect responsive layouts",
      ],
      technologies: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "Redux"],
    },
    {
      role: "ReactJs Trainee",
      company: "SoftX Solution",
      period: "Nov 2021 – Jan 2022",
      duration: "3 mos",
      description:
        "Completed a hands-on internship program focused on core React.js fundamentals, component design, and frontend project development best practices.",
      achievements: [
        "Built internal tools and dashboards as part of training projects",
        "Gained practical experience with React hooks and functional components",
        "Collaborated with senior developers for code reviews and knowledge sharing",
      ],
      technologies: ["React.js", "JavaScript", "HTML5", "CSS3"],
    },
  ],
  education: [
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "S.S Agrawal Institute of Engineering and Technology, Navsari (GTU)",
      period: "2019-2023",
      description:
        "Focused on frontend technologies and UI/UX design. Completed an internship at SoftX Solution during the 3rd year and received the Academic Excellence Award.",
      achievements: ["Academic Excellence Award", "Internship at SoftX Solution", "9.2 CGPA"],
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      degree: "Higher Secondary (12th Science)",
      institution: "Taravada Gurukul",
      period: "2017-2019",
      description:
        "Completed 12th Science with a strong focus on Mathematics and Physics. Developed early interest in computers and logical reasoning.",
      achievements: ["82% Overall", "Top performer in Math & Computer Science"],
      image:
        "https://images.unsplash.com/photo-1661708536171-6ab86f702736?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  skills: {
    technical: [
      { name: "Next.js", level: 95 },
      { name: "React", level: 98 },
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "HTML5/CSS3", level: 98 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
      { name: "Redux", level: 92 },
      { name: "React Query", level: 88 },
      { name: "Git/GitHub/Gitlab", level: 90 },
    ],
    soft: [
      "Team Leadership",
      "Project Management",
      "Communication",
      "Problem Solving",
      "Mentoring",
      "Time Management",
      "Client Relations",
      "Technical Writing",
    ],
  },
  certifications: [
    {
      name: "Academic excellence award",
      issuer: "SSAIET",
      date: "2018",
    },
    {
      name: "GTU Scholar Award 2019",
      issuer: "GTU",
      date: "2019",
    },
    {
      name: "Advanced React & GraphQL",
      issuer: "Frontend Masters",
      date: "2020",
    },
    {
      name: "UI/UX Design Specialization",
      issuer: "Interaction Design Foundation",
      date: "2019",
    },
  ],
  languages: [
    { name: "Gujarati", proficiency: "Native" },
    { name: "Hindi", proficiency: "Fluent" },
    { name: "English", proficiency: "Professional" },
  ],
}

export default function ResumePage() {
  const { language, setLanguage } = useSettings()
  const { t } = useTranslation(language as any)
  const [resumeView, setResumeView] = useState("modern")

  // Function to export resume as PDF
  const exportToPDF = async () => {
    const resumeElement = document.getElementById("resume-container")
    if (!resumeElement) return

    try {
      // Show loading state or notification here if needed

      const canvas = await html2canvas(resumeElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/png")

      // A4 dimensions in mm
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)

      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 0

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      pdf.save(`Sujit_Bhanderi_Resume_${language}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      // Show error notification here if needed
    }
  }

  return (
    <main className="min-h-screen bg-background py-24">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("resume.title")}</h1>
            <p className="text-muted-foreground">{t("resume.subtitle")}</p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    <span className="flex items-center gap-2">
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Tabs value={resumeView} onValueChange={setResumeView} className="w-[180px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="modern">{t("resume.modern")}</TabsTrigger>
                <TabsTrigger value="classic">{t("resume.classic")}</TabsTrigger>
              </TabsList>
            </Tabs>

            <Button onClick={exportToPDF} className="gap-2">
              <Download className="h-4 w-4" />
              {t("resume.exportPDF")}
            </Button>
          </div>
        </div>

        <div id="resume-container" className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Tabs value={resumeView} onValueChange={setResumeView}>
            <TabsContent value="modern" className="mt-0">
              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-primary">{resumeData.personalInfo.name}</h1>
                    <p className="text-xl text-muted-foreground">{resumeData.personalInfo.title}</p>
                  </div>
                  <div className="flex flex-col gap-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>{resumeData.personalInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>{resumeData.personalInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{resumeData.personalInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" />
                      <span>{resumeData.personalInfo.website}</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-2 text-primary">{t("resume.summary")}</h2>
                  <p className="text-muted-foreground">{resumeData.personalInfo.summary}</p>
                </div>

                {/* Experience */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    {t("resume.experience")}
                  </h2>
                  <div className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="grid md:grid-cols-[1fr_3fr] gap-4">
                        <div>
                          <p className="font-semibold">{exp?.period}</p>
                          <p className="text-muted-foreground">{exp.company}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{exp.role}</h3>
                          <p className="text-muted-foreground mb-2">{exp.description}</p>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="text-muted-foreground">
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    {t("resume.education")}
                  </h2>
                  <div className="space-y-6">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="grid md:grid-cols-[1fr_3fr] gap-4">
                        <div>
                          <p className="font-semibold">{edu.period}</p>
                          <p className="text-muted-foreground">{edu.institution}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{edu.degree}</h3>
                          <p className="text-muted-foreground mb-2">{edu.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {edu.achievements.map((achievement, i) => (
                              <Badge key={i} variant="outline">
                                {achievement}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    {t("resume.skills")}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold mb-3">{t("resume.technicalSkills")}</h3>
                      <div className="space-y-3">
                        {resumeData.skills.technical.map((skill, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{skill.name}</span>
                              <span className="text-muted-foreground">{skill.level}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">{t("resume.softSkills")}</h3>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.soft.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <h3 className="font-semibold mt-6 mb-3">{t("resume.languages")}</h3>
                      <div className="space-y-2">
                        {resumeData.languages.map((lang, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{lang.name}</span>
                            <span className="text-muted-foreground">{lang.proficiency}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    {t("resume.certifications")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resumeData.certifications.map((cert, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{cert.name}</h3>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{cert.issuer}</span>
                            <span>{cert.date}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="classic" className="mt-0">
              <div className="p-8 md:p-12">
                {/* Classic Resume Layout */}
                <div className="text-center mb-8 border-b pb-6">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{resumeData.personalInfo.name}</h1>
                  <p className="text-xl mb-4">{resumeData.personalInfo.title}</p>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" /> {resumeData.personalInfo.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-4 w-4" /> {resumeData.personalInfo.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {resumeData.personalInfo.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="h-4 w-4" /> {resumeData.personalInfo.website}
                    </span>
                    <span className="flex items-center gap-1">
                      <Linkedin className="h-4 w-4" /> {resumeData.personalInfo.linkedin}
                    </span>
                    <span className="flex items-center gap-1">
                      <Github className="h-4 w-4" /> {resumeData.personalInfo.github}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold uppercase mb-2 border-b">{t("resume.professionalSummary")}</h2>
                  <p>{resumeData.personalInfo.summary}</p>
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold uppercase mb-2 border-b">{t("resume.experience")}</h2>
                  <div className="space-y-4">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index}>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-1">
                          <h3 className="font-bold">
                            {exp.role}, {exp.company}
                          </h3>
                          <p className="text-sm">{exp.period}</p>
                        </div>
                        <p className="mb-2">{exp.description}</p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold uppercase mb-2 border-b">{t("resume.education")}</h2>
                  <div className="space-y-4">
                    {resumeData.education.map((edu, index) => (
                      <div key={index}>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-1">
                          <h3 className="font-bold">
                            {edu.degree}, {edu.institution}
                          </h3>
                          <p className="text-sm">{edu.period}</p>
                        </div>
                        <p className="mb-2">{edu.description}</p>
                        <p className="text-sm">
                          {t("resume.achievements")}: {edu.achievements.join(", ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold uppercase mb-2 border-b">{t("resume.skills")}</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-bold mb-2">{t("resume.technicalSkills")}</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {resumeData.skills.technical.map((skill, index) => (
                          <li key={index}>{skill.name}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">{t("resume.softSkills")}</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {resumeData.skills.soft.map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Languages & Certifications */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-lg font-bold uppercase mb-2 border-b">{t("resume.languages")}</h2>
                    <ul className="list-disc list-inside space-y-1">
                      {resumeData.languages.map((lang, index) => (
                        <li key={index}>
                          {lang.name} - {lang.proficiency}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold uppercase mb-2 border-b">{t("resume.certifications")}</h2>
                    <ul className="list-disc list-inside space-y-1">
                      {resumeData.certifications.map((cert, index) => (
                        <li key={index}>
                          {cert.name} - {cert.issuer}, {cert.date}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

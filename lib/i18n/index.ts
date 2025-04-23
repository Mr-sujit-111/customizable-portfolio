import { settings } from "./settings"
import { header } from "./header"
import { hero } from "./hero"
import { about } from "./about"
import { skills } from "./skills"
import { projects } from "./projects"
import { experience } from "./experience"
import { contact } from "./contact"
import { footer } from "./footer"
import { common } from "./common"
import { testimonials } from "./testimonials"
import { education } from "./education"
import { philosophy } from "./philosophy"
import { blog } from "./blog"
import { resume } from "./resume"
import { projectsDetail } from "./projects-detail"

export type LanguageCode = "en" | "fr" | "es" | "de" | "zh" | "hi" | "gu"

// Combine all translation sections
export const translations = {
  settings,
  header,
  hero,
  about,
  skills,
  projects,
  experience,
  contact,
  footer,
  common,
  testimonials,
  education,
  philosophy,
  blog,
  resume,
  projectsDetail,
}

// Fix TypeScript errors in the i18n implementation

// Update the useTranslation function to handle type safety better
export function useTranslation(language: LanguageCode = "en") {
  const t = (key: string): string => {
    // Split the key into section and subkey (e.g., "settings.title" -> ["settings", "title"])
    const [section, ...subKeyParts] = key.split(".")
    const subKey = subKeyParts.join(".")

    // Check if the section exists
    if (translations[section as keyof typeof translations]) {
      const sectionTranslations = translations[section as keyof typeof translations]

      // Check if the subkey exists in the section and language
      if (
        sectionTranslations &&
        subKey in sectionTranslations &&
        language in (sectionTranslations[subKey as keyof typeof sectionTranslations] || {})
      ) {
        return sectionTranslations[subKey as keyof typeof sectionTranslations][language]
      }

      // Fallback to English
      if (
        sectionTranslations &&
        subKey in sectionTranslations &&
        "en" in (sectionTranslations[subKey as keyof typeof sectionTranslations] || {})
      ) {
        return sectionTranslations[subKey as keyof typeof sectionTranslations]["en"]
      }
    }

    // Return the key if no translation is found
    return key
  }

  return { t }
}

// Language names and flags for the language selector
export const languageOptions = [
  {
    name: "English",
    value: "en",
    flag: "🇺🇸",
  },
  {
    name: "Français",
    value: "fr",
    flag: "🇫🇷",
  },
  {
    name: "Español",
    value: "es",
    flag: "🇪🇸",
  },
  {
    name: "Deutsch",
    value: "de",
    flag: "🇩🇪",
  },
  {
    name: "中文",
    value: "zh",
    flag: "🇨🇳",
  },
  {
    name: "हिन्दी",
    value: "hi",
    flag: "🇮🇳",
  },
  {
    name: "ગુજરાતી",
    value: "gu",
    flag: "🇮🇳",
  },
]

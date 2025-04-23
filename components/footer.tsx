"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Heart } from "lucide-react"
import Link from "next/link"
import { useSettings } from "@/contexts/settings-context"
import { useTranslation } from "@/lib/i18n"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const { language } = useSettings()
  const { t } = useTranslation(language as any)

  return (
    <footer className="py-12 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Sujit Bhanderi</h3>
            <p className="text-sm text-muted-foreground">{t("footer.description")}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>{t("footer.builtWith")}</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span>using Next.js, Tailwind CSS, ShadCN UI, Framer Motion</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("header.home")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("header.about")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("header.projects")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("header.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">{t("footer.connect")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com/sujitbhanderi"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com/in/sujitbhanderi"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com/sujitbhanderi"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:sujit.bhanderi@example.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Email
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">{t("footer.legal")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Sujit Bhanderi. {t("footer.copyright")}
          </p>
          <ModeToggle />
        </div>
      </div>
    </footer>
  )
}

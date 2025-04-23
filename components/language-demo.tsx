"use client"

import { useSettings } from "@/contexts/settings-context"
import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LanguageDemo() {
  const { language } = useSettings()
  const { t } = useTranslation(language as any)

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>
          {t("settings.language")}: {language.toUpperCase()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{t("hero.description")}</p>
        <p className="mb-2">{t("about.quote")}</p>
        <p>{t("contact.available.description")}</p>
      </CardContent>
    </Card>
  )
}

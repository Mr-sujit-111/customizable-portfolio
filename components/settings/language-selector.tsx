"use client"

import { useSettings } from "@/contexts/settings-context"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useTranslation, languageOptions } from "@/lib/i18n"

export function LanguageSelector() {
  const { language, setLanguage } = useSettings()
  const { t } = useTranslation(language as any)

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{t("settings.language.select")}</h3>
      <RadioGroup value={language} onValueChange={(value) => setLanguage(value as any)} className="space-y-3">
        {languageOptions.map((lang) => (
          <div key={lang.value} className="flex items-center space-x-2">
            <RadioGroupItem value={lang.value} id={lang.value} />
            <Label htmlFor={lang.value} className="flex items-center gap-2">
              <span className="text-xl">{lang.flag}</span>
              <span>{lang.name}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="mt-6 p-4 border rounded-md">
        <p className="text-sm text-muted-foreground">
          {t("settings.language.select")}:{" "}
          <span className="font-medium">{languageOptions.find((l) => l.value === language)?.name}</span>
        </p>
      </div>
    </div>
  )
}

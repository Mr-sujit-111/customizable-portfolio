"use client"

import { useSettings } from "@/contexts/settings-context"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/lib/i18n"

const fontOptions = [
  { name: "Inter", value: "inter" },
  { name: "Poppins", value: "poppins" },
  { name: "Roboto", value: "roboto" },
  { name: "Open Sans", value: "open-sans" },
  { name: "Lato", value: "lato" },
  { name: "Montserrat", value: "montserrat" },
  { name: "Raleway", value: "raleway" },
]

export function FontSelector() {
  const { font, setFont, fontSize, setFontSize, language } = useSettings()
  const { t } = useTranslation(language as any)

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t("settings.font.family")}</h3>
        <RadioGroup value={font} onValueChange={(value) => setFont(value as any)} className="grid grid-cols-1 gap-3">
          {fontOptions.map((fontOption) => (
            <div key={fontOption.value} className="flex items-center space-x-2">
              <RadioGroupItem value={fontOption.value} id={fontOption.value} />
              <Label htmlFor={fontOption.value} className={`flex-1 font-${fontOption.value}`}>
                {fontOption.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t("settings.font.size")}</h3>
        <Select value={fontSize} onValueChange={(value) => setFontSize(value as any)}>
          <SelectTrigger>
            <SelectValue placeholder={t("settings.font.size")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 p-4 border rounded-md">
        <h4 className="font-medium mb-2">{t("settings.font.preview")}</h4>
        <p className={`mb-2 font-${font}`}>{t("settings.font.preview.text")}</p>
        <p className={`text-sm text-muted-foreground font-${font}`}>{t("settings.font.preview.sample")}</p>
      </div>
    </div>
  )
}

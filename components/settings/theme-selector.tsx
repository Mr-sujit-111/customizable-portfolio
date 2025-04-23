"use client"

import { useSettings } from "@/contexts/settings-context"
import { Card } from "@/components/ui/card"
import { RadioGroup } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n"

const themes = [
  {
    name: "Light",
    value: "light",
    colors: {
      primary: "#3b82f6",
      background: "#ffffff",
      card: "#ffffff",
      text: "#0f172a",
    },
  },
  {
    name: "Dark",
    value: "dark",
    colors: {
      primary: "#60a5fa",
      background: "#0f172a",
      card: "#1e293b",
      text: "#f8fafc",
    },
  },
  {
    name: "Midnight",
    value: "midnight",
    colors: {
      primary: "#8b5cf6",
      background: "#09090b",
      card: "#18181b",
      text: "#fafafa",
    },
  },
  {
    name: "Forest",
    value: "forest",
    colors: {
      primary: "#22c55e",
      background: "#f8fafc",
      card: "#ffffff",
      text: "#0f172a",
    },
  },
  {
    name: "Ocean",
    value: "ocean",
    colors: {
      primary: "#0ea5e9",
      background: "#f0f9ff",
      card: "#ffffff",
      text: "#0c4a6e",
    },
  },
  {
    name: "Sunset",
    value: "sunset",
    colors: {
      primary: "#f97316",
      background: "#fff7ed",
      card: "#ffffff",
      text: "#7c2d12",
    },
  },
  {
    name: "Pastel",
    value: "pastel",
    colors: {
      primary: "#ec4899",
      background: "#fdf2f8",
      card: "#ffffff",
      text: "#831843",
    },
  },
  {
    name: "Neon",
    value: "neon",
    colors: {
      primary: "#10b981",
      background: "#0f172a",
      card: "#1e293b",
      text: "#ecfdf5",
    },
  },
  {
    name: "Monochrome",
    value: "monochrome",
    colors: {
      primary: "#525252",
      background: "#fafafa",
      card: "#ffffff",
      text: "#171717",
    },
  },
  {
    name: "Solarized",
    value: "solarized",
    colors: {
      primary: "#b58900",
      background: "#fdf6e3",
      card: "#eee8d5",
      text: "#073642",
    },
  },
]

export function ThemeSelector() {
  const { theme, setTheme, language } = useSettings()
  const { t } = useTranslation(language as any)

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{t("settings.theme.select")}</h3>
      <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-2 gap-4">
        {themes.map((themeOption) => (
          <label
            key={themeOption.value}
            className={cn("cursor-pointer", theme === themeOption.value && "ring-2 ring-primary")}
          >
            <input
              type="radio"
              value={themeOption.value}
              className="sr-only"
              onChange={() => setTheme(themeOption.value)}
              checked={theme === themeOption.value}
            />
            <Card className="overflow-hidden">
              <div className="h-24 w-full" style={{ backgroundColor: themeOption.colors.background }}>
                <div className="flex h-full p-2">
                  <div className="h-8 w-8 rounded-full" style={{ backgroundColor: themeOption.colors.primary }}></div>
                  <div className="flex-1"></div>
                  <div
                    className="h-16 w-16 rounded-md"
                    style={{
                      backgroundColor: themeOption.colors.card,
                      border: `1px solid ${themeOption.colors.primary}`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="p-3 text-center font-medium">{themeOption.name}</div>
            </Card>
          </label>
        ))}
      </RadioGroup>
    </div>
  )
}

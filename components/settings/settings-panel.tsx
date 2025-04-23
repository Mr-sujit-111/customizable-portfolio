"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSettings } from "@/contexts/settings-context"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { X } from "lucide-react"
import { ThemeSelector } from "./theme-selector"
import { FontSelector } from "./font-selector"
import { LanguageSelector } from "./language-selector"
import { useTranslation } from "@/lib/i18n"
import type { LanguageCode } from "@/lib/i18n/i18n-config"

export function SettingsPanel() {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    layoutMode,
    setLayoutMode,
    textDirection,
    setTextDirection,
    sidebarPosition,
    setSidebarPosition,
    accessibility,
    setAccessibilityOption,
    language,
  } = useSettings()

  const { t } = useTranslation(language as LanguageCode)
  const [activeTab, setActiveTab] = useState("theme")

  return (
    <AnimatePresence>
      {isSettingsOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setIsSettingsOpen(false)}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l shadow-lg z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{t("settings.title")}</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsSettingsOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">{t("common.close")}</span>
                </Button>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="theme">{t("settings.theme")}</TabsTrigger>
                  <TabsTrigger value="font">{t("settings.font")}</TabsTrigger>
                  <TabsTrigger value="language">{t("settings.language")}</TabsTrigger>
                  <TabsTrigger value="layout">{t("settings.layout")}</TabsTrigger>
                </TabsList>

                <TabsContent value="theme" className="space-y-6">
                  <ThemeSelector />
                </TabsContent>

                <TabsContent value="font" className="space-y-6">
                  <FontSelector />
                </TabsContent>

                <TabsContent value="language" className="space-y-6">
                  <LanguageSelector />
                </TabsContent>

                <TabsContent value="layout" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{t("settings.layout.mode")}</h3>
                    <RadioGroup
                      value={layoutMode}
                      onValueChange={(value) => setLayoutMode(value as "boxed" | "full-width")}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="full-width" id="full-width" />
                        <Label htmlFor="full-width">{t("settings.layout.fullWidth")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="boxed" id="boxed" />
                        <Label htmlFor="boxed">{t("settings.layout.boxed")}</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{t("settings.textDirection")}</h3>
                    <RadioGroup
                      value={textDirection}
                      onValueChange={(value) => setTextDirection(value as "ltr" | "rtl")}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ltr" id="ltr" />
                        <Label htmlFor="ltr">{t("settings.textDirection.ltr")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rtl" id="rtl" />
                        <Label htmlFor="rtl">{t("settings.textDirection.rtl")}</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{t("settings.sidebarPosition")}</h3>
                    <RadioGroup
                      value={sidebarPosition}
                      onValueChange={(value) => setSidebarPosition(value as "left" | "right")}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="left" id="left" />
                        <Label htmlFor="left">{t("settings.sidebarPosition.left")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="right" id="right" />
                        <Label htmlFor="right">{t("settings.sidebarPosition.right")}</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{t("settings.accessibility")}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="high-contrast">{t("settings.accessibility.highContrast")}</Label>
                        <Switch
                          id="high-contrast"
                          checked={accessibility.highContrast}
                          onCheckedChange={(checked) => setAccessibilityOption("highContrast", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="reduce-motion">{t("settings.accessibility.reduceMotion")}</Label>
                        <Switch
                          id="reduce-motion"
                          checked={accessibility.reduceMotion}
                          onCheckedChange={(checked) => setAccessibilityOption("reduceMotion", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="increase-spacing">{t("settings.accessibility.increaseSpacing")}</Label>
                        <Switch
                          id="increase-spacing"
                          checked={accessibility.increaseSpacing}
                          onCheckedChange={(checked) => setAccessibilityOption("increaseSpacing", checked)}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

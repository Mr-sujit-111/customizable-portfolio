"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Palette } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const themes = [
  { name: "Default", value: "default", color: "bg-blue-500" },
  { name: "Purple", value: "purple", color: "bg-purple-500" },
  { name: "Green", value: "green", color: "bg-green-500" },
  { name: "Orange", value: "orange", color: "bg-orange-500" },
  { name: "Pink", value: "pink", color: "bg-pink-500" },
]

export function ThemeSwitcher() {
  const { setTheme, theme: currentTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-8 left-8 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-md h-12 w-12 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Palette className="h-5 w-5" />
              <span className="sr-only">Change theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <div className="flex flex-col gap-2 p-2">
              <p className="text-sm font-medium">Color Theme</p>
              <div className="flex flex-wrap gap-2">
                {themes.map((theme) => (
                  <Button
                    key={theme.value}
                    variant="outline"
                    size="sm"
                    className={`flex items-center gap-2 ${
                      currentTheme === theme.value ? "border-primary" : "border-border"
                    }`}
                    onClick={() => {
                      setTheme(theme.value)
                      setIsOpen(false)
                    }}
                  >
                    <div className={`w-4 h-4 rounded-full ${theme.color}`} />
                    <span>{theme.name}</span>
                  </Button>
                ))}
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium mb-2">Mode</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={currentTheme === "light" ? "border-primary" : "border-border"}
                    onClick={() => {
                      setTheme("light")
                      setIsOpen(false)
                    }}
                  >
                    Light
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={currentTheme === "dark" ? "border-primary" : "border-border"}
                    onClick={() => {
                      setTheme("dark")
                      setIsOpen(false)
                    }}
                  >
                    Dark
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={currentTheme === "system" ? "border-primary" : "border-border"}
                    onClick={() => {
                      setTheme("system")
                      setIsOpen(false)
                    }}
                  >
                    System
                  </Button>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    </AnimatePresence>
  )
}

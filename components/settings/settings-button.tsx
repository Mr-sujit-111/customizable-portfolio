"use client"

import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSettings } from "@/contexts/settings-context"

export function SettingsButton() {
  const { setIsSettingsOpen } = useSettings()

  return (
    <Button variant="outline"
      size="icon"
      onClick={() => setIsSettingsOpen(true)}
      title="Settings"
      className=""
    >
      <Settings className="h-5 w-5" />
      <span className="sr-only">Settings</span>
    </Button>
  )
}

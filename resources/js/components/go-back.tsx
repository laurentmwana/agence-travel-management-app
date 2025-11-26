"use client"

import type React from "react"
import { Button } from "./ui/button"
import { ArrowUpRightFromSquare } from "lucide-react"
import { router } from "@inertiajs/react" // Importez router depuis @inertiajs/react
import type { LucideIcon } from "lucide-react" // Importez le type pour les icônes Lucide

type GoBackProps = {
  back?: string
  icon?: LucideIcon // Permet de passer une icône Lucide en prop
}

export const GoBack: React.FC<GoBackProps> = ({ back, icon: Icon = ArrowUpRightFromSquare }) => {
  if (!back) return null

  const handleGoBack = () => {
    router.get(back)
  }

  return (
    <Button size="sm" variant="ghost" onClick={handleGoBack}>
      <Icon size={15} /> {/* Utilise l'icône passée ou l'icône par défaut */}
    </Button>
  )
}

"use client"

import type { JsonModel } from "@/types/model"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface InputJsonProps {
  value: JsonModel[]
  onChange: (value: JsonModel[]) => void
  label?: string
  placeholder?: string
  error?: string
  className?: string
  disabled?: boolean
  required?: boolean
}

export const InputJson: React.FC<InputJsonProps> = ({
  value,
  onChange,
  label,
  error,
  className,
  disabled = false,
  required = false,
}) => {
  const total = value.reduce((sum, item) => sum + (item.amount || 0), 0)
  const formattedTotal = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(total)

  const handleAdd = () => {
    onChange([...value, { name: "", amount: 0 }])
  }

  const handleRemove = (index: number) => {
    const newValue = value.filter((_, i) => i !== index)
    onChange(newValue)
  }

  const handleNameChange = (index: number, name: string) => {
    const newValue = [...value]
    newValue[index] = { ...newValue[index], name }
    onChange(newValue)
  }

  const handleAmountChange = (index: number, amount: number) => {
    const newValue = [...value]
    newValue[index] = { ...newValue[index], amount }
    onChange(newValue)
  }

  return (
    <div className={cn("space-y-4 w-full", className)}>
      {label && (
        <Label className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <div className="space-y-3">
        {value.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:items-end gap-2 p-3 border rounded-lg bg-card">
            <div className="flex-1 space-y-1.5">
              <Label htmlFor={`name-${index}`} className="text-xs text-muted-foreground">
                Nom
              </Label>
              <Input
                id={`name-${index}`}
                type="text"
                value={item.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                disabled={disabled}
                placeholder="Entrer le nom"
                className="h-9"
              />
            </div>

            <div className="w-full sm:w-40 space-y-1.5">
              <Label htmlFor={`amount-${index}`} className="text-xs text-muted-foreground">
                Montant
              </Label>
              <Input
                id={`amount-${index}`}
                type="number"
                value={item.amount}
                onChange={(e) => handleAmountChange(index, Number(e.target.value))}
                disabled={disabled}
                placeholder="0"
                className="h-9"
                step="0.01"
              />
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemove(index)}
              disabled={disabled}
              className="h-9 w-9 text-muted-foreground hover:text-destructive self-end"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Supprimer l'élément</span>
            </Button>
          </div>
        ))}
      </div>

      <Button type="button" size="xs" variant="outline" onClick={handleAdd} disabled={disabled} className="w-full bg-transparent">
        <Plus className="h-4 w-4 mr-2" />
        Ajouter un élément
      </Button>

      {value.length > 0 && (
        <div className="flex items-center justify-between p-3 sm:p-4 border rounded-lg bg-muted/50">
          <span className="font-medium text-sm sm:text-base">Total</span>
          <span className="text-sm font-semibold tabular-nums">{formattedTotal} $</span>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

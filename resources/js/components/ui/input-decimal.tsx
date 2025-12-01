"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface InputDecimalProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string
  value?: number
  onChange?: (value: number | null) => void
  error?: string
  allowNegative?: boolean
  maxDecimals?: number
  min?: number
  max?: number
  formatDisplay?: boolean
}

export function InputDecimal({
  label,
  value,
  onChange,
  error,
  allowNegative = false,
  maxDecimals = 2,
  min,
  max,
  formatDisplay = true,
  className,
  ...props
}: InputDecimalProps) {
  const [displayValue, setDisplayValue] = React.useState("")
  const [isFocused, setIsFocused] = React.useState(false)

  React.useEffect(() => {
    if (value !== undefined && !isFocused) {
      if (value === null || value === 0) {
        setDisplayValue("")
      } else if (formatDisplay) {
        setDisplayValue(formatNumber(value))
      } else {
        setDisplayValue(value.toString())
      }
    }
  }, [value, isFocused, formatDisplay])

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimals,
    }).format(num)
  }

  const parseNumber = (str: string): number | null => {
    if (!str) return null
    // Remplacer les espaces et les virgules par le format standard
    const cleaned = str.replace(/\s/g, "").replace(",", ".")
    const num = Number.parseFloat(cleaned)
    return isNaN(num) ? null : num
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setDisplayValue(inputValue)

    // Permettre les valeurs vides
    if (inputValue === "" || inputValue === "-") {
      onChange?.(null)
      return
    }

    // Créer un regex dynamique basé sur les options
    const negativePattern = allowNegative ? "-?" : ""
    const regex = new RegExp(`^${negativePattern}\\d*[,.]?\\d*$`)

    // Vérifier si l'entrée correspond au format attendu
    const cleaned = inputValue.replace(/\s/g, "")
    if (!regex.test(cleaned)) {
      return
    }

    const parsedValue = parseNumber(inputValue)

    if (parsedValue !== null) {
      // Vérifier les limites min/max
      if (min !== undefined && parsedValue < min) return
      if (max !== undefined && parsedValue > max) return

      onChange?.(parsedValue)
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    const parsedValue = parseNumber(displayValue)

    if (parsedValue !== null && formatDisplay) {
      setDisplayValue(formatNumber(parsedValue))
    } else if (parsedValue === null) {
      setDisplayValue("")
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    if (value !== undefined && value !== null && formatDisplay) {
      setDisplayValue(value.toString().replace(".", ","))
    }
  }

  const showErrorState = !!error

  return (
    <div className="w-full space-y-2">
      {label && (
        <Label htmlFor={props.id} className={cn("text-sm font-medium", showErrorState && "text-destructive")}>
          {label}
          {props.required && <span className="ml-1 text-destructive">*</span>}
        </Label>
      )}
      <Input
        {...props}
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={cn(
          "transition-colors",
          showErrorState && "border-destructive focus-visible:ring-destructive",
          className,
        )}
        aria-invalid={showErrorState}
        aria-describedby={error ? `${props.id}-error` : undefined}
      />
      {error && (
        <p id={`${props.id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
{(min !== undefined || max !== undefined) && !error && (
  <p className="text-xs text-muted-foreground">
    {min !== undefined && max !== undefined
      ? `Valeur entre ${formatNumber(min)} et ${formatNumber(max)}`
      : min !== undefined
      ? `Valeur minimum : ${formatNumber(min)}`
      : `Valeur maximum : ${formatNumber(max as number)}`}
  </p>
)}
    </div>
  )
}

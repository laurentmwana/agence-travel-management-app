"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateOnlyPickerProps {
  value?: string
  onChange: (value: string | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  onlyMonth?: boolean
  onlyYear?: boolean
}

const stringToDate = (value?: string, onlyMonth?: boolean, onlyYear?: boolean): Date | undefined => {
  if (!value) return undefined

  if (onlyYear) {
    const y = Number(value)
    if (!y) return undefined
    return new Date(y, 0, 1)
  }

  if (onlyMonth) {
    const [y, m] = value.split("-").map(Number)
    if (!y || !m) return undefined
    return new Date(y, m - 1, 1)
  }

  const [y, m, d] = value.split("-").map(Number)
  if (!y || !m || !d) return undefined
  return new Date(y, m - 1, d)
}

const dateToString = (date?: Date, onlyMonth?: boolean, onlyYear?: boolean) => {
  if (!date) return ""
  const pad = (n: number) => n.toString().padStart(2, "0")

  if (onlyYear) {
    return `${date.getFullYear()}`
  }

  if (onlyMonth) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`
  }

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

const formatDisplayDate = (value?: string, onlyMonth?: boolean, onlyYear?: boolean): string => {
  if (!value) return ""

  const date = stringToDate(value, onlyMonth, onlyYear)
  if (!date) return value

  const options: Intl.DateTimeFormatOptions = onlyYear
    ? { year: "numeric" }
    : onlyMonth
      ? { year: "numeric", month: "long" }
      : { year: "numeric", month: "long", day: "numeric" }

  return date.toLocaleDateString("fr-FR", options)
}

export const DateOnlyPicker: React.FC<DateOnlyPickerProps> = ({
  value,
  onChange,
  placeholder = "Sélectionner une date",
  className,
  disabled = false,
  onlyMonth = false,
  onlyYear = false,
}) => {
  const [open, setOpen] = React.useState(false)
  const dateValue = stringToDate(value, onlyMonth, onlyYear)

  // Si les deux sont true, afficher la date d'aujourd'hui (juste la date, sans heure)
  const displayValue = React.useMemo(() => {
    if (onlyMonth && onlyYear) {
      const today = new Date()
      return today.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }
    return value ? formatDisplayDate(value, onlyMonth, onlyYear) : null
  }, [value, onlyMonth, onlyYear])

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      onChange(undefined)
      setOpen(false)
      return
    }

    onChange(dateToString(selectedDate, onlyMonth, onlyYear))
    setOpen(false)
  }

  // Si les deux props sont true, désactiver la sélection
  const isDisabled = disabled || (onlyMonth && onlyYear)

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal rounded-xl border-[1.5px] px-4 py-2.5 shadow-sm",
              "hover:bg-accent hover:text-accent-foreground transition-colors",
              "dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800",
              !displayValue && "text-muted-foreground",
            )}
            disabled={isDisabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            {displayValue || <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-0 rounded-xl shadow-lg border dark:border-neutral-700 dark:bg-neutral-900"
          align="start"
        >
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={handleDateSelect}
            disabled={disabled}
            className="rounded-xl"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

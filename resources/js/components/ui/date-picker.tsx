"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface DatePickerProps {
  value?: string
  onChange: (value: string | undefined) => void
  label?: string
  placeholder?: string
  error?: string
  className?: string
  disabled?: boolean
  required?: boolean
  onlyMonth?: boolean
}

const stringToDate = (value?: string, onlyMonth?: boolean): Date | undefined => {
  if (!value) return undefined

  if (onlyMonth) {
    const [y, m] = value.split("-").map(Number)
    if (!y || !m) return undefined
    return new Date(y, m - 1, 1)
  }

  const [datePart, timePart] = value.split(" ")
  if (!datePart || !timePart) return undefined
  const [y, m, d] = datePart.split("-").map(Number)
  const [h, i] = timePart.split(":").map(Number)
  return new Date(y, m - 1, d, h, i)
}

const dateToString = (date?: Date, onlyMonth?: boolean) => {
  if (!date) return ""
  const pad = (n: number) => n.toString().padStart(2, "0")

  if (onlyMonth) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`
  }

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Sélectionner date et heure",
  className,
  disabled = false,
  onlyMonth = false,
}) => {
  const [open, setOpen] = React.useState(false)
  const dateValue = stringToDate(value, onlyMonth)

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      onChange(undefined)
      return
    }
    let finalDate = selectedDate

    if (!onlyMonth && dateValue) {
      finalDate = new Date(selectedDate)
      finalDate.setHours(dateValue.getHours())
      finalDate.setMinutes(dateValue.getMinutes())
    }

    onChange(dateToString(finalDate, onlyMonth))
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":")
    if (!hours || !minutes) return

    const base = dateValue ? new Date(dateValue) : new Date()
    base.setHours(Number(hours))
    base.setMinutes(Number(minutes))

    onChange(dateToString(base, onlyMonth))
  }

  const timeValue = dateValue
    ? `${dateValue.getHours().toString().padStart(2, "0")}:${dateValue.getMinutes().toString().padStart(2, "0")}`
    : ""

  return (
    <div className={cn("flex flex-col gap-3 w-full transition-all duration-200", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal rounded-xl border-[1.5px] px-4 py-2 shadow-sm",
              "dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800",
              !value && "text-muted-foreground",
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4 opacity-80" />
            {value ? value : <span>{placeholder}</span>}
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
          {!onlyMonth && (
            <div className="p-3 border-t dark:border-neutral-700">
              <Input type="time" value={timeValue} onChange={handleTimeChange} disabled={disabled} className="w-full" />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

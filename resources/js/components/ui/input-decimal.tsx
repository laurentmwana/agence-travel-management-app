"use client"

import type * as React from "react"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"

type InputDecimalProps  ={
  id?: string,
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  placeholder?: string
  error?: string
  className?: string
  disabled?: boolean
  required?: boolean
}

export const InputDecimal: React.FC<InputDecimalProps> = ({
  id,
  value,
  onChange,
  min,
  max,
  step = 1,
  placeholder = "0",
  className,
  disabled = false,
}) => {
  const handleIncrement = () => {
    const newValue = value + step
    if (max === undefined || newValue <= max) {
      onChange(newValue)
    }
  }

  const handleDecrement = () => {
    const newValue = value - step
    if (min === undefined || newValue >= min) {
      onChange(newValue)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseFloat(e.target.value)
    if (!isNaN(newValue)) {
      if ((min === undefined || newValue >= min) && (max === undefined || newValue <= max)) {
        onChange(newValue)
      }
    } else if (e.target.value === "") {
      onChange(0)
    }
  }

  const isDecrementDisabled = disabled || (min !== undefined && value <= min)
  const isIncrementDisabled = disabled || (max !== undefined && value >= max)

  return (
    <InputGroup className={cn("w-full max-w-xs", className)}>
      <InputGroupAddon align="inline-start">
        <InputGroupButton
          size="icon-xs"
          onClick={handleDecrement}
          disabled={isDecrementDisabled}
          aria-label="Décrémenter"
        >
          <Minus />
        </InputGroupButton>
      </InputGroupAddon>

      <InputGroupInput
        type="number"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className="text-center tabular-nums"
      />

      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          onClick={handleIncrement}
          disabled={isIncrementDisabled}
          aria-label="Incrémenter"
        >
          <Plus />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

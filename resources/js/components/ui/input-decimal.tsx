"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface InputDecimalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  onValidValue?: (value: string) => void
  showError?: boolean
}

export function InputDecimal({ label, onValidValue, showError = true, className, ...props }: InputDecimalProps) {
  const [value, setValue] = React.useState("")
  const [isValid, setIsValid] = React.useState(true)
  const [touched, setTouched] = React.useState(false)

  const regex = /^\d+(\.\d+)?$/

  const validateInput = (inputValue: string) => {
    if (inputValue === "") {
      setIsValid(true)
      return
    }

    const valid = regex.test(inputValue)
    setIsValid(valid)

    if (valid && onValidValue) {
      onValidValue(inputValue)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsValid(false)
    const newValue = e.target.value
    setValue(newValue)
    validateInput(newValue)
  }

  const handleBlur = () => {
    setTouched(true)
  }

  const showErrorState = showError && touched && !isValid && value !== ""

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={props.id} className={cn(showErrorState && "text-destructive")}>
          {label}
        </Label>
      )}
      <Input
        {...props}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={cn(showErrorState && "border-destructive focus-visible:ring-destructive", className)}
        aria-invalid={showErrorState}
      />
    </div>
  )
}

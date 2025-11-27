"use client"

import React, { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils';
import { Skeleton } from './skeleton';

interface Option {
      name: string|React.ReactNode
      disabled?: boolean
      value: string|number
}

interface SelectGenerateProps {
  options: Option[]
  placeholder?: string
  onChange: (value: string) => void
  value: string,
      className?: string
isPending?: boolean
}

export const SelectGenerate: React.FC<SelectGenerateProps> = ({options, placeholder, onChange, value, className = '', isPending = false}) => {
  return isPending ? <SelectGenerateSkeleton className={className} /> : (
     <Select onValueChange={(value) => onChange(value)} defaultValue={value.toString()}>
  <SelectTrigger className={cn("w-full", className)}>
    <SelectValue placeholder={placeholder ?? "Selectionner une valeur"} />
  </SelectTrigger>
 <SelectContent>
    {options.map((option) => (
      <SelectItem key={option.value} value={option.value.toString()} disabled={option.disabled}>
        {option.name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
  )
};


const SelectGenerateSkeleton: FC<{className?: string}> = ({className}) => {
  return (  <Skeleton className={cn("h-9 w-full", className)}>
    <div className="flex items-center justify-center w-full py-1 text-center">
      <p className="text-sm text-muted-foreground">
      Chargement...
    </p>
    </div>
  </Skeleton>)
}
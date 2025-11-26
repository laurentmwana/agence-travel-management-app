"use client"

import { useEffect, useState, useCallback, type FC } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Filter, X, SortAsc, SortDesc } from "lucide-react"
import { router, usePage } from "@inertiajs/react"
import { ChipsSelector } from "./chips-select"
import { QueriesProps } from "@/types"

type SortableItem = {
  label: string
  value: string
}

type SortableSelectProps = {
  items: SortableItem[]
  sizeButton?: 'lg' | 'sm'
}

export const SortableSelect: FC<SortableSelectProps> = ({ items, sizeButton = 'sm'}) => {
  const [open, setOpen] = useState(false)
  const query = usePage<QueriesProps>().props.query

  const [sortField, setSortField] = useState<string>(query?.sort || items[0]?.value || "")
  const [order, setOrder] = useState<"asc" | "desc">(query?.dir || "desc")

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  const handleSubmit = useCallback(() => {
    router.get(window.location.pathname, { sort: sortField, dir: order }, { preserveState: true, preserveScroll: true })
    setOpen(false)
  }, [order, sortField])

  const handleReset = useCallback(() => {
    setSortField(items[0]?.value || "")
    setOrder("desc")
    router.get(window.location.pathname, {}, { preserveState: true, preserveScroll: true })
    setOpen(false)
  }, [items])

  const toggleOrder = useCallback(() => {
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"))
  }, [])

  return (
    <>
      <Button size={sizeButton === 'lg' ? 'lg' : 'sm'} variant="outline" className="relative bg-transparent" onClick={() => setOpen(true)}>
        <Filter className="h-4 w-4" />
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />

          <div className="relative bg-background border rounded-lg shadow-lg w-[800px] max-w-[90vw] max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <h3 className="text-lg font-semibold">{window.__("sortable.title")}</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="space-y-4">

                  <div className="flex items-center gap-2">
                    {order === "asc" ? (
                      <SortAsc className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <SortDesc className="h-4 w-4 text-muted-foreground" />
                    )}
                    <h4 className="text-sm font-medium">{window.__("sortable.sort")}</h4>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="text-sm">{window.__("sortable.sort_by")}</Label>
                      <ChipsSelector
                        items={items.map((item) => ({
                          id: item.value,
                          value: item.value,
                          label: item.label
                        }))}
                        mode="single"
                        selectedValues={sortField}
                        onSelectionChange={(value) => setSortField(value as string)}
                        placeholder={window.__("sortable.sort_by_placeholder")}
                        size="sm"
                        clearable={false}
                      />
                    </div>

                    <Button type="button" variant="outline" size="sm" onClick={toggleOrder}>
                      {order === "asc" ? (
                        <>
                          <SortAsc className="h-4 w-4 mr-2" />
                          <span>{window.__("sortable.az")}</span>
                        </>
                      ) : (
                        <>
                          <SortDesc className="h-4 w-4 mr-2" />
                          <span>{window.__("sortable.za")}</span>
                        </>
                      )}
                    </Button>

                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t p-6">
              <div className="flex justify-between gap-3">
                <Button size="sm" variant="outline" onClick={handleReset}>
                  {window.__("sortable.reset")}
                </Button>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
                    {window.__("sortable.cancel")}
                  </Button>

                  <Button size="sm" onClick={handleSubmit}>
                    {window.__("sortable.apply")}
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

"use client"

import { PaginationCollection } from "@/types"
import { Button } from "./button"
import { router } from "@inertiajs/react"

export const Pagination = ({
  items,
  pageNames = ['page']
}: {
  items: PaginationCollection<any>
  pageNames?: string[]
}) => {
  if (!items || (items && items.meta.links.length < 4)) {
    return null
  }

const handlePageChange = (path: string | null) => {
  if (path) {
    const currentUrl = new URL(window.location.href)
    const urlPath = new URL(path, window.location.origin)

    currentUrl.searchParams.forEach((value, key) => {
      if (!pageNames.includes(key) && !urlPath.searchParams.has(key)) {
        urlPath.searchParams.set(key, value)
      }
    })

    router.visit(urlPath.toString())
  }
}


  return (
    <nav className="flex items-center justify-between px-4 sm:px-0 mt-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {items.meta.from && items.meta.to ? (
              <>
                Affichage de <span className="font-medium">{items.meta.from}</span> à{" "}
                <span className="font-medium">{items.meta.to}</span> sur <span className="font-medium">{items.meta.total}</span>{" "}
                résultats
              </>
            ) : (
              <>
                <span className="font-medium">{items.meta.total}</span> résultats au total
              </>
            )}
          </p>
        </div>
        <div>
          <ul className="inline-flex -space-x-px text-sm gap-2">
            {items.meta.links.map((link, index) => (
              <li key={index}>
                <Button
                  onClick={() => handlePageChange(link.url)}
                  size="sm"
                  variant={link.active ? "default" : "secondary"}
                  disabled={!link.url}
                  className={!link.url ? "opacity-50 cursor-not-allowed" : ""}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: link.label,
                    }}
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

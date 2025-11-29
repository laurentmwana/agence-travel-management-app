"use client"

import { PaginationCollection } from "@/types/model"
import { Button } from "./button"
import { router } from "@inertiajs/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export const Pagination = ({
  items,
  pageNames = ["page"],
}: {
  items: PaginationCollection<any>
  pageNames?: string[]
}) => {
  if (!items || items.meta.links.length < 4) return null

  const handlePageChange = (path: string | null) => {
    if (!path) return

    const currentUrl = new URL(window.location.href)
    const urlPath = new URL(path, window.location.origin)

    currentUrl.searchParams.forEach((value, key) => {
      if (!pageNames.includes(key) && !urlPath.searchParams.has(key)) {
        urlPath.searchParams.set(key, value)
      }
    })

    router.visit(urlPath.toString())
  }

  return (
    <nav className="w-full mt-6" aria-label="Pagination">
      {/* Top info */}
      <div className="text-center text-muted-foreground text-sm mb-3">
        {items.meta.from && items.meta.to ? (
          <>
            <span className="font-semibold">{items.meta.from}</span> –{" "}
            <span className="font-semibold">{items.meta.to}</span> /{" "}
            <span className="font-semibold">{items.meta.total}</span>
          </>
        ) : (
          <span>{items.meta.total} résultats</span>
        )}
      </div>

      {/* Pagination Container */}
      <div
        className="
          w-full flex items-center justify-center 
          overflow-x-auto px-2 py-2
          scrollbar-none 
        "
      >
        <ul
          className="
            flex items-center gap-2 
            flex-wrap
            sm:gap-3
            whitespace-nowrap
          "
        >
          {/* Prev */}
          <li>
            <Button
              size="icon"
              variant="outline"
              disabled={!items.meta.links[0].url}
              onClick={() => handlePageChange(items.meta.links[0].url)}
              className="rounded-full h-9 w-9"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </li>

          {/* Pages */}
          {items.meta.links.slice(1, -1).map((link, index) => (
            <li key={index}>
              <Button
                onClick={() => handlePageChange(link.url)}
                disabled={!link.url}
                className={`
                  h-9 px-3 rounded-full text-sm transition text-muted-foreground cursor-pointer hover:border-primary
                  ${
                    link.active
                      ? "bg-primary text-primary-foreground font-semibold shadow"
                      : "bg-secondary hover:bg-secondary/80"
                  }
                `}
              >
                <span dangerouslySetInnerHTML={{ __html: link.label }} />
              </Button>
            </li>
          ))}

          {/* Next */}
          <li>
            <Button
              size="icon"
              variant="outline"
              disabled={!items.meta.links[items.meta.links.length - 1].url}
              onClick={() =>
                handlePageChange(
                  items.meta.links[items.meta.links.length - 1].url
                )
              }
              className="rounded-full h-9 w-9"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

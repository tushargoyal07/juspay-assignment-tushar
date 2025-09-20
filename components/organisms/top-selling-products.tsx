"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProductRow } from "@/components/molecules/product-row"
import { useAppSelector } from "@/lib/store"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

type ProductSortField = 'name' | 'price' | 'quantity' | 'revenue'
type ProductSortDirection = 'asc' | 'desc' | null

export function TopSellingProducts() {
  const topProducts = useAppSelector((state) => state.dashboard.topProducts)
  const { globalSearchTerm } = useAppSelector((state) => state.search)
  const [sortField, setSortField] = useState<ProductSortField | null>(null)
  const [sortDirection, setSortDirection] = useState<ProductSortDirection>(null)

  const handleSort = (field: ProductSortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (field: ProductSortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />
    if (sortDirection === 'asc') return <ArrowUp className="w-4 h-4" />
    if (sortDirection === 'desc') return <ArrowDown className="w-4 h-4" />
    return <ArrowUpDown className="w-4 h-4" />
  }

  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = topProducts

    // Filter by global search term
    if (globalSearchTerm) {
      filtered = topProducts.filter((product) =>
        product.name.toLowerCase().includes(globalSearchTerm.toLowerCase())
      )
    }

    // Sort if needed
    if (sortField && sortDirection) {
      filtered = [...filtered].sort((a, b) => {
        let aValue: any = a[sortField]
        let bValue: any = b[sortField]

        // Handle different data types
        if (sortField === 'price' || sortField === 'quantity' || sortField === 'revenue') {
          aValue = Number(aValue)
          bValue = Number(bValue)
        } else {
          aValue = String(aValue).toLowerCase()
          bValue = String(bValue).toLowerCase()
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [topProducts, globalSearchTerm, sortField, sortDirection])

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">Top Selling Products</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('name')}
                    className="h-auto p-0 font-medium text-muted-foreground hover:text-background flex items-center gap-1"
                  >
                    Name
                    {getSortIcon('name')}
                  </Button>
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('price')}
                    className="h-auto p-0 font-medium text-muted-foreground hover:text-background flex items-center gap-1 mx-auto"
                  >
                    Price
                    {getSortIcon('price')}
                  </Button>
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('quantity')}
                    className="h-auto p-0 font-medium text-muted-foreground hover:text-background flex items-center gap-1 mx-auto"
                  >
                    Quantity
                    {getSortIcon('quantity')}
                  </Button>
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('revenue')}
                    className="h-auto p-0 font-medium text-muted-foreground hover:text-background flex items-center gap-1 ml-auto"
                  >
                    Amount
                    {getSortIcon('revenue')}
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedAndFilteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                    {globalSearchTerm ? "No products found matching your search" : "No products found"}
                  </td>
                </tr>
              ) : (
                sortedAndFilteredProducts.map((product) => (
                  <ProductRow
                    key={product.id}
                    name={product.name}
                    quantity={product.quantity}
                    revenue={product.revenue}
                    price={product.price}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

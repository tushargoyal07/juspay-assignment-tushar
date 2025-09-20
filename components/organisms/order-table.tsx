"use client"

import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { TableRow } from "@/components/molecules/table-row"
import { useAppSelector, useAppDispatch } from "@/lib/store"
import { fetchOrders, setCurrentPage, createOrder } from "@/lib/features/orders/ordersSlice"
import { Search, Filter, Download, Plus, RefreshCw, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

type SortField = 'id' | 'customer' | 'location' | 'member' | 'status' | 'date' | 'amount'
type SortDirection = 'asc' | 'desc' | null

export function OrderTable() {
  const dispatch = useAppDispatch()
  const { orders, currentPage, totalPages, totalCount, isLoading, error } = useAppSelector((state) => state.orders)
  const { globalSearchTerm } = useAppSelector((state) => state.search)
  const [localSearchTerm, setLocalSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  // Use global search term if available, otherwise use local search term
  const searchTerm = globalSearchTerm || localSearchTerm

  useEffect(() => {
    console.log("[v0] Order table mounted, fetching orders...")
    dispatch(fetchOrders({ page: currentPage, limit: 10 }))
  }, [dispatch, currentPage])

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page))
    dispatch(fetchOrders({ page, limit: 10 }))
  }

  const handleRefresh = () => {
    console.log("[v0] Refreshing orders...")
    dispatch(fetchOrders({ page: currentPage, limit: 10 }))
  }

  const handleCreateOrder = () => {
    const mockOrder = {
      customer: `Customer ${Date.now()}`,
      location: "New Location",
      member: "System Generated",
      amount: Math.floor(Math.random() * 2000) + 100,
    }
    console.log("[v0] Creating new order:", mockOrder)
    dispatch(createOrder(mockOrder))
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />
    if (sortDirection === 'asc') return <ArrowUp className="w-4 h-4" />
    if (sortDirection === 'desc') return <ArrowDown className="w-4 h-4" />
    return <ArrowUpDown className="w-4 h-4" />
  }

  const sortedAndFilteredOrders = useMemo(() => {
    let filtered = orders.filter(
      (order) =>
        searchTerm === "" ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.member.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        let aValue: any = a[sortField]
        let bValue: any = b[sortField]

        // Handle different data types
        if (sortField === 'amount') {
          aValue = Number(aValue)
          bValue = Number(bValue)
        } else if (sortField === 'date') {
          // Simple date comparison - you might want to improve this
          aValue = new Date(aValue).getTime()
          bValue = new Date(bValue).getTime()
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
  }, [orders, searchTerm, sortField, sortDirection])

  const renderPaginationButtons = () => {
    const buttons = []
    const maxVisiblePages = 5

    // Previous button
    buttons.push(
      <Button
        key="prev"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1 || isLoading}
        className="px-3"
      >
        &lt;
      </Button>,
    )

    // Page numbers
    for (let i = 1; i <= Math.min(totalPages, maxVisiblePages); i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          disabled={isLoading}
          className="px-3"
        >
          {i}
        </Button>,
      )
    }

    // Next button
    buttons.push(
      <Button
        key="next"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages || isLoading}
        className="px-3"
      >
        &gt;
      </Button>,
    )

    return buttons
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Order List</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2" onClick={handleCreateOrder} disabled={isLoading}>
              <Plus className="w-4 h-4" />
              Add Order
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="pl-10"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md mb-4">
            <p className="text-sm font-medium">Error loading orders</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('id')}
                    className="h-auto p-0 font-medium text-muted-foreground hover:text-background flex items-center gap-1"
                  >
                    Order ID
                    {getSortIcon('id')}
                  </Button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('customer')}
                    className="h-auto p-0 font-medium text-muted-foreground hover:text-background flex items-center gap-1"
                  >
                    Customer
                    {getSortIcon('customer')}
                  </Button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('location')}
                    className="h-auto p-0 font-medium text-muted-foreground hover:text-background flex items-center gap-1"
                  >
                    Location
                    {getSortIcon('location')}
                  </Button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('member')}
                    className="h-auto p-0 font-medium text-muted-foreground hover:text-background flex items-center gap-1"
                  >
                    Member
                    {getSortIcon('member')}
                  </Button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('status')}
                    className="h-auto p-0 font-medium text-muted-foreground hover:text-background flex items-center gap-1"
                  >
                    Status
                    {getSortIcon('status')}
                  </Button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('date')}
                    className="h-auto p-0 font-medium text-muted-foreground hover:text-background flex items-center gap-1"
                  >
                    Date
                    {getSortIcon('date')}
                  </Button>
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('amount')}
                    className="h-auto p-0 font-medium text-muted-foreground hover:text-background flex items-center gap-1 ml-auto"
                  >
                    Amount
                    {getSortIcon('amount')}
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-32" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-28" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-36" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Skeleton className="h-4 w-16 ml-auto" />
                    </td>
                  </tr>
                ))
              ) : sortedAndFilteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                    {searchTerm ? "No orders found matching your search" : "No orders found"}
                  </td>
                </tr>
              ) : (
                sortedAndFilteredOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    id={order.id}
                    customer={order.customer}
                    location={order.location}
                    member={order.member}
                    status={order.status}
                    date={order.date}
                    amount={order.amount}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, totalCount)} of {totalCount} results
          </p>
          <div className="flex items-center gap-1">{renderPaginationButtons()}</div>
        </div>
      </CardContent>
    </Card>
  )
}

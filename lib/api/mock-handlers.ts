export const mockDashboardData = {
  metrics: {
    customers: Math.floor(Math.random() * 1000) + 3500,
    orders: Math.floor(Math.random() * 500) + 1000,
    revenue: Math.floor(Math.random() * 200) + 600,
    growth: Math.round((Math.random() * 40 + 10) * 10) / 10,
  },
  chartData: [
    { month: "Jan", projected: 400, actual: Math.floor(Math.random() * 100) + 350 },
    { month: "Feb", projected: 450, actual: Math.floor(Math.random() * 100) + 400 },
    { month: "Mar", projected: 500, actual: Math.floor(Math.random() * 100) + 450 },
    { month: "Apr", projected: 550, actual: Math.floor(Math.random() * 100) + 500 },
    { month: "May", projected: 600, actual: Math.floor(Math.random() * 100) + 550 },
    { month: "Jun", projected: 650, actual: Math.floor(Math.random() * 100) + 600 },
  ],
  topProducts: [
    {
      id: "1",
      name: "ASUS Rolex-high Wrist",
      quantity: Math.floor(Math.random() * 50) + 60,
      revenue: Math.round((Math.random() * 1000 + 2500) * 100) / 100,
      price: Math.round((Math.random() * 100 + 50) * 100) / 100,
    },
    {
      id: "2",
      name: "Marco Lightweight Shirt",
      quantity: Math.floor(Math.random() * 30) + 25,
      revenue: Math.round((Math.random() * 800 + 2200) * 100) / 100,
      price: Math.round((Math.random() * 100 + 50) * 100) / 100,
    },
    {
      id: "3",
      name: "Half Sleeve Shirt",
      quantity: Math.floor(Math.random() * 40) + 50,
      revenue: Math.round((Math.random() * 600 + 1800) * 100) / 100,
      price: Math.round((Math.random() * 100 + 50) * 100) / 100,
    },
    {
      id: "4",
      name: "Lightweight Jacket",
      quantity: Math.floor(Math.random() * 100) + 150,
      revenue: Math.round((Math.random() * 500 + 1200) * 100) / 100,
      price: Math.round((Math.random() * 100 + 50) * 100) / 100,
    },
    {
      id: "5",
      name: "Marco Shoes",
      quantity: Math.floor(Math.random() * 40) + 50,
      revenue: Math.round((Math.random() * 600 + 1500) * 100) / 100,
      price: Math.round((Math.random() * 100 + 50) * 100) / 100,
    },
  ],
  revenueByLocation: [
    { location: "New York", percentage: Math.floor(Math.random() * 10) + 35 },
    { location: "San Francisco", percentage: Math.floor(Math.random() * 10) + 25 },
    { location: "Sydney", percentage: Math.floor(Math.random() * 8) + 18 },
    { location: "Singapore", percentage: Math.floor(Math.random() * 6) + 8 },
  ],
}

const mockOrders = [
  {
    id: "ORD001",
    customer: "David Craig",
    location: "Landing Page",
    member: "Machine Line Oakland",
    status: "completed" as const,
    date: "Just now",
    amount: 1250.0,
  },
  {
    id: "ORD002",
    customer: "Andi Morrisom",
    location: "CRM Admin pages",
    member: "Larry San Francisco",
    status: "pending" as const,
    date: "4 minutes ago",
    amount: 890.5,
  },
  {
    id: "ORD003",
    customer: "Dave Gavin",
    location: "Client Project",
    member: "Boggart Avenue Grads",
    status: "completed" as const,
    date: "1 hour ago",
    amount: 2100.75,
  },
  {
    id: "ORD004",
    customer: "Georgina Night",
    location: "Admin Dashboard",
    member: "Restaurant Baton Rouge",
    status: "pending" as const,
    date: "Yesterday",
    amount: 675.25,
  },
  {
    id: "ORD005",
    customer: "Andi Lane",
    location: "App Landing Page",
    member: "Next Lane Growths",
    status: "completed" as const,
    date: "Feb 2, 2023",
    amount: 1450.0,
  },
  {
    id: "ORD006",
    customer: "Sarah Johnson",
    location: "E-commerce Store",
    member: "Tech Solutions Inc",
    status: "completed" as const,
    date: "2 hours ago",
    amount: 3200.50,
  },
  {
    id: "ORD007",
    customer: "Michael Chen",
    location: "Mobile App",
    member: "Digital Innovations",
    status: "pending" as const,
    date: "3 hours ago",
    amount: 1850.75,
  },
  {
    id: "ORD008",
    customer: "Emily Rodriguez",
    location: "Web Portal",
    member: "Cloud Systems",
    status: "completed" as const,
    date: "5 hours ago",
    amount: 2750.25,
  },
  {
    id: "ORD009",
    customer: "James Wilson",
    location: "API Integration",
    member: "Data Flow Corp",
    status: "cancelled" as const,
    date: "Yesterday",
    amount: 1200.00,
  },
  {
    id: "ORD010",
    customer: "Lisa Thompson",
    location: "Dashboard",
    member: "Analytics Pro",
    status: "completed" as const,
    date: "Yesterday",
    amount: 2100.00,
  },
  {
    id: "ORD011",
    customer: "Robert Brown",
    location: "Payment Gateway",
    member: "FinTech Solutions",
    status: "pending" as const,
    date: "2 days ago",
    amount: 4500.00,
  },
  {
    id: "ORD012",
    customer: "Maria Garcia",
    location: "User Management",
    member: "Security First",
    status: "completed" as const,
    date: "2 days ago",
    amount: 1650.50,
  },
  {
    id: "ORD013",
    customer: "John Smith",
    location: "Inventory System",
    member: "Retail Tech",
    status: "pending" as const,
    date: "3 days ago",
    amount: 3200.75,
  },
  {
    id: "ORD014",
    customer: "Anna Davis",
    location: "Reporting Module",
    member: "Business Intelligence",
    status: "completed" as const,
    date: "3 days ago",
    amount: 2800.25,
  },
  {
    id: "ORD015",
    customer: "Chris Lee",
    location: "Notification Center",
    member: "Communication Hub",
    status: "completed" as const,
    date: "4 days ago",
    amount: 1950.00,
  },
  {
    id: "ORD016",
    customer: "Jennifer White",
    location: "Search Engine",
    member: "Search Solutions",
    status: "pending" as const,
    date: "4 days ago",
    amount: 2400.50,
  },
  {
    id: "ORD017",
    customer: "David Miller",
    location: "Content Management",
    member: "Content Pro",
    status: "completed" as const,
    date: "5 days ago",
    amount: 3100.75,
  },
  {
    id: "ORD018",
    customer: "Rachel Green",
    location: "Analytics Dashboard",
    member: "Data Insights",
    status: "completed" as const,
    date: "5 days ago",
    amount: 2750.00,
  },
  {
    id: "ORD019",
    customer: "Mark Taylor",
    location: "Authentication System",
    member: "Secure Access",
    status: "cancelled" as const,
    date: "6 days ago",
    amount: 1800.25,
  },
  {
    id: "ORD020",
    customer: "Susan Anderson",
    location: "File Storage",
    member: "Cloud Storage Co",
    status: "completed" as const,
    date: "6 days ago",
    amount: 2200.50,
  },
  {
    id: "ORD021",
    customer: "Kevin Martinez",
    location: "Email Service",
    member: "Communication Pro",
    status: "pending" as const,
    date: "1 week ago",
    amount: 1650.75,
  },
  {
    id: "ORD022",
    customer: "Amanda Clark",
    location: "Database Management",
    member: "Data Systems",
    status: "completed" as const,
    date: "1 week ago",
    amount: 4200.00,
  },
  {
    id: "ORD023",
    customer: "Brian Hall",
    location: "API Gateway",
    member: "Integration Solutions",
    status: "completed" as const,
    date: "1 week ago",
    amount: 3500.25,
  },
  {
    id: "ORD024",
    customer: "Nicole Young",
    location: "Testing Framework",
    member: "Quality Assurance",
    status: "pending" as const,
    date: "1 week ago",
    amount: 2100.50,
  },
  {
    id: "ORD025",
    customer: "Daniel King",
    location: "Monitoring System",
    member: "Performance Monitor",
    status: "completed" as const,
    date: "2 weeks ago",
    amount: 2800.75,
  },
]

const mockNotifications = [
  {
    id: "1",
    type: "bug" as const,
    message: "You have a bug that needs attention",
    time: "9:00 AM",
    isRead: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    type: "user" as const,
    message: "New user registered",
    time: "8:45 AM",
    isRead: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    type: "bug" as const,
    message: "You have a bug that needs fixing",
    time: "8:30 AM",
    isRead: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    type: "subscription" as const,
    message: "Andi Lane subscribed to you",
    time: "8:15 AM",
    isRead: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    type: "data" as const,
    message: "Released a new version",
    time: "8:00 AM",
    isRead: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

let ordersData = [...mockOrders]
let notificationsData = [...mockNotifications]

// Simulate API endpoints
export const mockApiHandlers = {
  "/api/dashboard/overview": () => ({
    data: mockDashboardData,
    success: true,
  }),
  "/api/dashboard/metrics": () => ({
    data: mockDashboardData.metrics,
    success: true,
  }),
  "/api/dashboard/refresh-metrics": () => ({
    data: {
      ...mockDashboardData.metrics,
      customers: mockDashboardData.metrics.customers + Math.floor(Math.random() * 10),
      orders: mockDashboardData.metrics.orders + Math.floor(Math.random() * 5),
      revenue: Math.round((mockDashboardData.metrics.revenue + Math.random() * 20) * 100) / 100,
      growth: Math.round((Math.random() * 40 + 10) * 10) / 10,
    },
    success: true,
  }),
  "/api/orders": () => ({
    data: {
      orders: ordersData.slice(0, 10), // Default first page
      totalCount: ordersData.length,
      currentPage: 1,
      totalPages: Math.ceil(ordersData.length / 10),
    },
    success: true,
  }),
  "/api/orders/stats": () => {
    const stats = {
      totalOrders: ordersData.length,
      pendingOrders: ordersData.filter((o) => o.status === "pending").length,
      completedOrders: ordersData.filter((o) => o.status === "completed").length,
      cancelledOrders: ordersData.filter((o) => o.status === "cancelled").length,
      totalRevenue: ordersData.reduce((sum, order) => sum + order.amount, 0),
    }
    return {
      data: stats,
      success: true,
    }
  },
  "/api/notifications": () => ({
    data: {
      notifications: notificationsData,
      unreadCount: notificationsData.filter((n) => !n.isRead).length,
      totalCount: notificationsData.length,
    },
    success: true,
  }),
  "/api/notifications/unread-count": () => ({
    data: {
      count: notificationsData.filter((n) => !n.isRead).length,
    },
    success: true,
  }),
  "/api/notifications/read-all": () => {
    const unreadCount = notificationsData.filter((n) => !n.isRead).length
    notificationsData.forEach((n) => {
      n.isRead = true
      n.updatedAt = new Date().toISOString()
    })
    return {
      data: { updatedCount: unreadCount },
      success: true,
    }
  },
}

export const getDynamicHandler = (url: string, method: string, body?: any) => {
  // Handle orders with pagination
  if (url.startsWith("/api/orders") && method === "GET" && !url.includes("/api/orders/")) {
    const urlObj = new URL(url, "http://localhost:3000")
    const page = parseInt(urlObj.searchParams.get("page") || "1")
    const limit = parseInt(urlObj.searchParams.get("limit") || "10")

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedOrders = ordersData.slice(startIndex, endIndex)

    return {
      data: {
        orders: paginatedOrders,
        totalCount: ordersData.length,
        currentPage: page,
        totalPages: Math.ceil(ordersData.length / limit),
      },
      success: true,
    }
  }

  // Handle individual order fetch
  const orderMatch = url.match(/\/api\/orders\/([^/]+)$/)
  if (orderMatch && method === "GET") {
    const orderId = orderMatch[1]
    const order = ordersData.find((o) => o.id === orderId)
    return order ? { data: order, success: true } : null
  }

  // Handle order status update
  const statusMatch = url.match(/\/api\/orders\/([^/]+)\/status$/)
  if (statusMatch && method === "PUT") {
    const orderId = statusMatch[1]
    const orderIndex = ordersData.findIndex((o) => o.id === orderId)
    if (orderIndex !== -1 && body?.status) {
      ordersData[orderIndex] = { ...ordersData[orderIndex], status: body.status }
      return { data: ordersData[orderIndex], success: true }
    }
  }

  // Handle order creation
  if (url === "/api/orders" && method === "POST") {
    const newOrder = {
      id: `ORD${String(ordersData.length + 1).padStart(3, "0")}`,
      customer: body.customer,
      location: body.location,
      member: body.member,
      status: "pending" as const,
      date: "Just now",
      amount: body.amount,
    }
    ordersData.unshift(newOrder)
    return { data: newOrder, success: true }
  }

  // Handle order update
  if (orderMatch && method === "PUT") {
    const orderId = orderMatch[1]
    const orderIndex = ordersData.findIndex((o) => o.id === orderId)
    if (orderIndex !== -1) {
      ordersData[orderIndex] = { ...ordersData[orderIndex], ...body }
      return { data: ordersData[orderIndex], success: true }
    }
  }

  // Handle order deletion
  if (orderMatch && method === "DELETE") {
    const orderId = orderMatch[1]
    ordersData = ordersData.filter((o) => o.id !== orderId)
    return { data: null, success: true }
  }

  // Handle notification mark as read
  const notificationMatch = url.match(/\/api\/notifications\/([^/]+)\/read$/)
  if (notificationMatch && method === "PUT") {
    const notificationId = notificationMatch[1]
    const notificationIndex = notificationsData.findIndex((n) => n.id === notificationId)
    if (notificationIndex !== -1) {
      notificationsData[notificationIndex] = {
        ...notificationsData[notificationIndex],
        isRead: true,
        updatedAt: new Date().toISOString(),
      }
      return { data: notificationsData[notificationIndex], success: true }
    }
  }

  // Handle notification deletion
  const deleteNotificationMatch = url.match(/\/api\/notifications\/([^/]+)$/)
  if (deleteNotificationMatch && method === "DELETE") {
    const notificationId = deleteNotificationMatch[1]
    notificationsData = notificationsData.filter((n) => n.id !== notificationId)
    return { data: null, success: true }
  }

  return null
}

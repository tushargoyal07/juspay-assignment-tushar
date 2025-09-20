# Figma Dashboard - SaaS Analytics Platform

A modern, responsive SaaS dashboard built with React, Next.js, and Redux Toolkit. This project implements a comprehensive analytics platform with real-time data visualization, order management, and notification systems.

## 🚀 Live Demo

[Live Demo](https://assignment.tusharr.dev) | [View on GitHub](https://github.com/tushargoyal07/juspay-assignment-tushar)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **UI Components**: Radix UI + Tailwind CSS
- **Charts**: Recharts
- **Testing**: Jest + Playwright
- **Deployment**: Vercel

## 📋 Features

### Analytics Dashboard
- Real-time metrics visualization
- Interactive charts and graphs
- Revenue tracking by location
- Top-selling products analysis
- Projection vs actual performance

### Order Management
- Complete CRUD operations
- Order statistics and analytics
- Status management (pending, completed, cancelled)
- Pagination and filtering
- Real-time updates

### Notifications System
- Real-time notification updates
- Unread count tracking
- Notification categorization
- Mark as read functionality
- Real-time connection management

### User Experience
- Responsive design (mobile-first)
- Dark/light theme switching
- Smooth animations and transitions
- Accessible components (ARIA compliant)
- Loading states and error handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/figma-dashboard.git
cd figma-dashboard
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**
```
http://localhost:3000
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run end-to-end tests
npm run test:all     # Run all tests

# Code Quality
npm run lint         # Run ESLint
```

## 📖 Detailed Setup Guide

### Step 1: Environment Setup

#### Prerequisites Check
```bash
# Check Node.js version (requires 18+)
node --version

# Check npm version
npm --version

# If you don't have Node.js, download from https://nodejs.org/
```

#### Package Manager Options
```bash
# Option 1: Use npm (comes with Node.js)
npm install

# Option 2: Use yarn (install globally first)
npm install -g yarn
yarn install

# Option 3: Use pnpm (install globally first)
npm install -g pnpm
pnpm install
```

### Step 2: Project Setup

#### Clone and Install
```bash
# Clone the repository
git clone https://github.com/yourusername/figma-dashboard.git
cd figma-dashboard

# Install dependencies
npm install

# Verify installation
npm list --depth=0
```

#### Environment Configuration
```bash
# No environment variables needed for development
# The project uses mock data by default

# For production deployment, you may need:
# NEXT_PUBLIC_API_URL=https://your-api.com
# NEXT_PUBLIC_WS_URL=wss://your-websocket.com
```

### Step 3: Development Server

#### Start Development
```bash
# Start the development server
npm run dev

# The server will start on http://localhost:3000
# Hot reload is enabled for development
```

#### Verify Installation
1. Open http://localhost:3000 in your browser
2. You should see the dashboard with:
   - Analytics metrics
   - Interactive charts
   - Navigation sidebar
   - Theme toggle

### Step 4: Testing Setup

#### Run Tests
```bash
# Run all unit tests
npm run test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run end-to-end tests
npm run test:e2e

# Run all tests (unit + e2e)
npm run test:all
```

#### Test Coverage
```bash
# Generate coverage report
npm run test:coverage

# Open coverage report in browser
open coverage/lcov-report/index.html
```

### Step 5: Build and Production

#### Build for Production
```bash
# Create production build
npm run build

# Start production server
npm run start

# Verify build works
curl http://localhost:3000
```

#### Build Verification
```bash
# Check build output
ls -la .next/

# Verify static files
ls -la .next/static/

# Check bundle size
npm run build -- --analyze
```

### Step 6: Development Workflow

#### Code Quality
```bash
# Run linting
npm run lint

# Fix linting issues automatically
npm run lint -- --fix

# Type checking
npx tsc --noEmit
```

#### Git Workflow
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Figma Dashboard"

# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/figma-dashboard.git

# Push to GitHub
git push -u origin main
```

### Step 7: Troubleshooting

#### Common Issues

**Port Already in Use**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

**Dependencies Issues**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Or with yarn
rm -rf node_modules yarn.lock
yarn install
```

**Build Errors**
```bash
# Check TypeScript errors
npx tsc --noEmit

# Check for missing dependencies
npm ls

# Rebuild from scratch
rm -rf .next
npm run build
```

**Test Issues**
```bash
# Clear Jest cache
npm run test -- --clearCache

# Update test dependencies
npm install --save-dev @testing-library/jest-dom@latest
```

#### Performance Issues
```bash
# Analyze bundle size
npm run build -- --analyze

# Check for large dependencies
npx bundle-analyzer .next/static/chunks/*.js
```

### Step 8: Deployment Preparation

#### Pre-deployment Checklist
- [ ] All tests passing (`npm run test:all`)
- [ ] Build successful (`npm run build`)
- [ ] No linting errors (`npm run lint`)
- [ ] TypeScript compilation successful
- [ ] All features working in development

#### Deployment Commands
```bash
# Build for production
npm run build

# Test production build locally
npm run start

# Deploy to Vercel (if using Vercel CLI)
vercel

# Deploy to Netlify (if using Netlify CLI)
netlify deploy --prod
```

#### Custom Domain Setup
**Target Domain**: `assignment.tusharr.dev`

1. **Add Domain in Vercel Dashboard**
   - Go to Project → Settings → Domains
   - Add: `assignment.tusharr.dev`

2. **Configure DNS**
   ```
   Type: CNAME
   Name: assignment
   Target: cname.vercel-dns.com
   ```

3. **Verify Deployment**
   - Wait 5-10 minutes for DNS propagation
   - Test: `https://assignment.tusharr.dev`

**Detailed Setup**: See `CUSTOM_DOMAIN_SETUP.md`

## 🏗️ Project Architecture

## Project Structure

### Core Architecture
```
├── app/                    # Next.js App Router pages
├── components/            # Atomic design components
│   ├── atoms/            # Basic UI elements
│   ├── molecules/        # Simple component combinations
│   ├── organisms/        # Complex UI sections
│   ├── templates/        # Page layouts
│   └── ui/               # Reusable UI components
├── lib/                  # Core application logic
│   ├── api/              # API client and endpoints
│   ├── features/         # Redux slices
│   └── providers/        # Context providers
├── __tests__/            # Test files
└── public/               # Static assets
```

## Redux State Management

### Store Configuration
Located in `lib/store.ts`:
```typescript
export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    orders: ordersReducer,
    notifications: notificationsReducer,
    search: searchReducer,
  },
})
```

### Redux Slices

#### 1. Dashboard Slice (`lib/features/dashboard/dashboardSlice.ts`)
**Purpose**: Manages analytics dashboard data and metrics
**State Structure**:
```typescript
interface DashboardState {
  metrics: DashboardMetrics
  chartData: ChartData[]
  topProducts: ProductSales[]
  revenueByLocation: RevenueByLocation[]
  isLoading: boolean
  error: string | null
  lastUpdated: string | null
}
```
**Actions**:
- `fetchDashboardData()`: Fetches complete dashboard data
- `refreshMetrics()`: Updates metrics with new values
- `setLoading()`: Controls loading state
- `clearError()`: Clears error messages

#### 2. Orders Slice (`lib/features/orders/ordersSlice.ts`)
**Purpose**: Manages order data and statistics
**State Structure**:
```typescript
interface OrdersState {
  orders: Order[]
  currentPage: number
  totalPages: number
  totalCount: number
  isLoading: boolean
  error: string | null
  selectedOrder: Order | null
  stats: OrderStats | null
}
```
**Actions**:
- `fetchOrders()`: Retrieves paginated orders
- `fetchOrderStats()`: Gets order statistics
- `createOrder()`: Creates new order
- `updateOrder()`: Updates existing order
- `deleteOrder()`: Removes order
- `updateOrderStatus()`: Changes order status

#### 3. Notifications Slice (`lib/features/notifications/notificationsSlice.ts`)
**Purpose**: Handles notification system
**State Structure**:
```typescript
interface NotificationsState {
  notifications: Notification[]
  unreadCount: number
  isRealTimeConnected: boolean
  isLoading: boolean
  error: string | null
}
```
**Actions**:
- `fetchNotifications()`: Loads notifications
- `markAsRead()`: Marks notification as read
- `markAllAsRead()`: Marks all notifications as read
- `deleteNotification()`: Removes notification
- `subscribeToRealTimeNotifications()`: Establishes real-time connection

#### 4. Search Slice (`lib/features/search/searchSlice.ts`)
**Purpose**: Manages search functionality
**State Structure**:
```typescript
interface SearchState {
  query: string
  results: any[]
  isSearching: boolean
}
```

## API Layer

### API Client (`lib/api/client.ts`)
Centralized HTTP client with mock data integration:
- Handles request/response logging
- Simulates network delays
- Integrates with mock handlers
- Provides error handling

### Mock API Handlers (`lib/api/mock-handlers.ts`)
Comprehensive mock data system:
- **Dashboard Data**: Metrics, charts, products, revenue by location
- **Orders Data**: 25+ sample orders with CRUD operations
- **Notifications Data**: Real-time notification simulation
- **Dynamic Handlers**: Pagination, filtering, status updates

### API Endpoints

#### Dashboard Endpoints
- `GET /api/dashboard/overview`: Complete dashboard data
- `GET /api/dashboard/metrics`: Key metrics
- `POST /api/dashboard/refresh-metrics`: Update metrics

#### Orders Endpoints
- `GET /api/orders`: Paginated orders list
- `GET /api/orders/:id`: Single order details
- `POST /api/orders`: Create new order
- `PUT /api/orders/:id`: Update order
- `DELETE /api/orders/:id`: Delete order
- `PUT /api/orders/:id/status`: Update order status
- `GET /api/orders/stats`: Order statistics

#### Notifications Endpoints
- `GET /api/notifications`: All notifications
- `GET /api/notifications/unread-count`: Unread count
- `PUT /api/notifications/:id/read`: Mark as read
- `PUT /api/notifications/read-all`: Mark all as read
- `DELETE /api/notifications/:id`: Delete notification

## Component Architecture

### Atomic Design Implementation

#### Atoms (`components/atoms/`)
Basic UI building blocks:
- `metric-label.tsx`: Metric display labels
- `metric-value.tsx`: Metric value display
- `notification-icon.tsx`: Notification type icons
- `status-badge.tsx`: Status indicators

#### Molecules (`components/molecules/`)
Simple component combinations:
- `metric-card.tsx`: Metric display cards with trends
- `nav-item.tsx`: Navigation menu items
- `notification-item.tsx`: Individual notification display
- `product-row.tsx`: Product listing rows
- `table-row.tsx`: Generic table rows

#### Organisms (`components/organisms/`)
Complex UI sections:
- `dashboard-layout.tsx`: Main dashboard layout
- `metrics-overview.tsx`: Key metrics display
- `order-stats.tsx`: Order statistics cards
- `order-table.tsx`: Orders data table
- `sidebar.tsx`: Navigation sidebar
- `top-bar.tsx`: Header with notifications
- Chart components: `revenue-chart.tsx`, `projections-chart.tsx`, etc.

#### Templates (`components/templates/`)
Page-level layouts:
- `analytics-dashboard.tsx`: Main dashboard page
- `order-management.tsx`: Orders management page
- `notifications-page.tsx`: Notifications page

## Working Features

### 1. Analytics Dashboard (`/`)
**Components**: `AnalyticsDashboard` template
**Redux Integration**: Uses `dashboard` slice
**Features**:
- Real-time metrics display
- Interactive charts (Revenue, Projections, Sales)
- Top-selling products table
- Revenue by location visualization
- Refresh functionality with loading states

### 2. Order Management (`/orders`)
**Components**: `OrderManagement` template
**Redux Integration**: Uses `orders` slice
**Features**:
- Order statistics cards (Total, Completed, Pending, Revenue)
- Paginated orders table
- Order status management
- CRUD operations for orders
- Real-time stats updates

### 3. Notifications System (`/notifications`)
**Components**: `NotificationsPage` template
**Redux Integration**: Uses `notifications` slice
**Features**:
- Real-time notification updates
- Unread count display
- Mark as read functionality
- Notification filtering by type
- Real-time connection management

### 4. Navigation & Layout
**Components**: `DashboardLayout`, `Sidebar`, `TopBar`
**Features**:
- Responsive sidebar with collapse
- Theme switching (light/dark)
- Notification dropdown
- User profile management
- Breadcrumb navigation

## Redux Usage Patterns

### 1. Component Integration
```typescript
// Using Redux in components
const dispatch = useAppDispatch()
const { data, isLoading, error } = useAppSelector((state) => state.feature)

useEffect(() => {
  dispatch(fetchData())
}, [dispatch])
```

### 2. Async Actions
All data fetching uses `createAsyncThunk`:
```typescript
export const fetchData = createAsyncThunk(
  'feature/fetchData',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.getData(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
```

### 3. State Updates
Redux Toolkit's `createSlice` handles:
- Action creators
- Reducers
- Initial state
- Loading states
- Error handling

## Testing Implementation

### Unit Tests (`__tests__/`)
- **Component Tests**: Jest + React Testing Library
- **Slice Tests**: Redux state management testing
- **Utility Tests**: Helper function testing

### E2E Tests (`__tests__/e2e/`)
- **Playwright**: End-to-end user flows
- **Dashboard Navigation**: Complete user journeys
- **Order Management**: CRUD operations testing

### Test Commands
```bash
npm run test          # Unit tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
npm run test:e2e       # E2E tests
npm run test:all       # All tests
```

## Development Workflow

### 1. Starting Development
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server
```

### 2. Code Quality
```bash
npm run lint          # ESLint checking
npm run test          # Run tests
npm run test:coverage # Generate coverage
```

### 3. Component Development
1. Create component in appropriate atomic level
2. Add TypeScript interfaces
3. Implement Redux integration if needed
4. Write unit tests
5. Add to storybook (if applicable)

## Data Flow Architecture

### 1. User Interaction Flow
1. User interacts with component
2. Component dispatches Redux action
3. Async thunk calls API endpoint
4. Mock handler processes request
5. Response updates Redux state
6. Component re-renders with new data

### 2. Real-time Updates
1. WebSocket connection established
2. Server sends notification updates
3. Redux state updated automatically
4. UI reflects changes immediately

### 3. Error Handling
1. API errors caught in async thunks
2. Error state updated in Redux
3. Components display error messages
4. Retry mechanisms available

## Key Implementation Details

### 1. State Management
- **Centralized**: All state in Redux store
- **Normalized**: Proper data structure
- **Immutable**: Redux Toolkit ensures immutability
- **Typed**: Full TypeScript integration

### 2. API Integration
- **Mock First**: Development with mock data
- **Real API Ready**: Easy transition to real endpoints
- **Error Handling**: Comprehensive error management
- **Loading States**: User feedback during operations

### 3. Component Design
- **Atomic**: Follows atomic design principles
- **Reusable**: Components designed for reuse
- **Accessible**: ARIA compliance
- **Responsive**: Mobile-first design

### 4. Performance
- **Code Splitting**: Next.js automatic splitting
- **Lazy Loading**: Component-level lazy loading
- **Memoization**: React.memo for expensive components
- **Optimized Rendering**: Redux selectors prevent unnecessary renders

## Assignment Implementation Guide

### 1. Understanding the Codebase
- Study the Redux store structure
- Examine component hierarchy
- Review API integration patterns
- Understand testing setup

### 2. Adding New Features
1. Create Redux slice for new feature
2. Add API endpoints and handlers
3. Build components following atomic design
4. Integrate with existing layout
5. Write comprehensive tests

### 3. Modifying Existing Features
1. Update Redux slice if state changes needed
2. Modify API handlers for new endpoints
3. Update components with new functionality
4. Ensure backward compatibility
5. Update tests for new behavior

### 4. Best Practices
- Follow existing patterns
- Maintain TypeScript types
- Write tests for new functionality
- Use proper error handling
- Document complex logic
- Follow atomic design principles

## File Structure Reference

### Critical Files
- `lib/store.ts`: Redux store configuration
- `lib/providers/redux-provider.tsx`: Redux provider
- `app/layout.tsx`: Root layout with providers
- `lib/api/mock-handlers.ts`: Mock API implementation
- `components/templates/`: Page-level components

### Redux Files
- `lib/features/dashboard/dashboardSlice.ts`
- `lib/features/orders/ordersSlice.ts`
- `lib/features/notifications/notificationsSlice.ts`
- `lib/features/search/searchSlice.ts`

### API Files
- `lib/api/client.ts`: HTTP client
- `lib/api/dashboard.ts`: Dashboard endpoints
- `lib/api/orders.ts`: Orders endpoints
- `lib/api/notifications.ts`: Notifications endpoints

This documentation provides a comprehensive overview of the Figma Dashboard project, covering architecture, implementation details, and development guidelines for assignment completion.
# juspay-assignment-tushar

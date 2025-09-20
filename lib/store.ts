import { configureStore } from "@reduxjs/toolkit"
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import dashboardReducer from "./features/dashboard/dashboardSlice"
import ordersReducer from "./features/orders/ordersSlice"
import notificationsReducer from "./features/notifications/notificationsSlice"
import searchReducer from "./features/search/searchSlice"

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    orders: ordersReducer,
    notifications: notificationsReducer,
    search: searchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

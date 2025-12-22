"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { CartItem } from "./cart-context"

export interface Order {
  id: string
  date: string
  items: CartItem[]
  total: number
  status: "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: {
    name: string
    address: string
    city: string
    postalCode: string
    country: string
    phone: string
  }
  paymentMethod: string
  trackingNumber?: string
}

interface OrdersContextType {
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "date">) => string
  getOrderById: (id: string) => Order | undefined
  cancelOrder: (id: string) => void
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("uniqlo-orders")
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
    setIsLoaded(true)
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("uniqlo-orders", JSON.stringify(orders))
    }
  }, [orders, isLoaded])

  const addOrder = (orderData: Omit<Order, "id" | "date">): string => {
    const newOrder: Order = {
      ...orderData,
      id: "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString(),
    }

    setOrders((currentOrders) => [newOrder, ...currentOrders])
    return newOrder.id
  }

  const getOrderById = (id: string): Order | undefined => {
    return orders.find((order) => order.id === id)
  }

  const cancelOrder = (id: string) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) => (order.id === id ? { ...order, status: "cancelled" as const } : order)),
    )
  }

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        getOrderById,
        cancelOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (!context) {
    throw new Error("useOrders must be used within OrdersProvider")
  }
  return context
}

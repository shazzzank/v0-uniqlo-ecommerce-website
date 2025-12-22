"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "@/lib/products-data"

export interface CartItem {
  product: Product
  quantity: number
  size: string
  color: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity: number, size: string, color: string) => void
  removeFromCart: (productId: string, size: string, color: string) => void
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("uniqlo-cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("uniqlo-cart", JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id && item.size === size && item.color === color,
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [...currentItems, { product, quantity, size, color }]
    })
  }

  const removeFromCart = (productId: string, size: string, color: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => !(item.product.id === productId && item.size === size && item.color === color)),
    )
  }

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId && item.size === size && item.color === color ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AppLayout from "./components/layout/app-layout"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { OrdersProvider } from "@/contexts/orders-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UNIQLO - LifeWear",
  description: "Simple, high-quality, everyday clothing with a practical sense of beauty",
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <OrdersProvider>
                <AppLayout>{children}</AppLayout>
              </OrdersProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

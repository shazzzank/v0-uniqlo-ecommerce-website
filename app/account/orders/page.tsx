"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { useOrders } from "@/contexts/orders-context"

export default function OrdersPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { orders, cancelOrder } = useOrders()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const handleCancelOrder = (orderId: string) => {
    if (confirm("Are you sure you want to cancel this order?")) {
      cancelOrder(orderId)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Order History</h1>
        <Link href="/account">
          <Button variant="secondary">Back to Account</Button>
        </Link>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => {
            const orderDate = new Date(order.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })

            return (
              <GlassCard key={order.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Order {order.id}</h3>
                    <p className="text-sm text-gray-500">Placed on {orderDate}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-lg font-semibold">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-4">
                  {order.items.map((item) => (
                    <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex items-center gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <Link href={`/products/${item.product.id}`}>
                          <h4 className="font-medium text-gray-900 hover:text-red-600">{item.product.name}</h4>
                        </Link>
                        <p className="text-sm text-gray-500">
                          {item.color}, {item.size} - Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <Link href={`/order-confirmation?orderId=${order.id}`} className="flex-1">
                    <Button variant="secondary" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  {order.status === "processing" && (
                    <Button variant="secondary" className="flex-1" onClick={() => handleCancelOrder(order.id)}>
                      Cancel Order
                    </Button>
                  )}
                  <Link href="/products" className="flex-1">
                    <Button variant="ios" className="w-full">
                      Buy Again
                    </Button>
                  </Link>
                </div>
              </GlassCard>
            )
          })}
        </div>
      ) : (
        <GlassCard className="p-8 text-center">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-gray-100 rounded-full mb-4">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
            <Link href="/products">
              <Button variant="ios">Start Shopping</Button>
            </Link>
          </div>
        </GlassCard>
      )}
    </div>
  )
}

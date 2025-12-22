"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Check, ChevronDown, ChevronUp, Printer, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/card"
import { useOrders } from "@/contexts/orders-context"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get("orderId")
  const { getOrderById } = useOrders()
  const [showOrderDetails, setShowOrderDetails] = useState(true)

  const order = orderId ? getOrderById(orderId) : null

  useEffect(() => {
    if (!orderId || !order) {
      router.push("/")
    }
  }, [orderId, order, router])

  if (!order) {
    return null
  }

  const orderDate = new Date(order.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto">
        <GlassCard className="p-8 text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
          <p className="text-gray-600 mb-6">
            Your order has been received and is being processed. You will receive a confirmation email shortly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="ios" onClick={() => window.print()}>
              <Printer className="h-5 w-5 mr-2" />
              Print Receipt
            </Button>
            <Link href="/account/orders">
              <Button variant="secondary">View All Orders</Button>
            </Link>
          </div>
        </GlassCard>

        <GlassCard className="mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Order Details</h2>
              <button
                onClick={() => setShowOrderDetails(!showOrderDetails)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showOrderDetails ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {showOrderDetails && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Order Number</h3>
                  <p className="text-gray-900">{order.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Order Date</h3>
                  <p className="text-gray-900">{orderDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Order Status</h3>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 capitalize">
                      {order.status}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Payment Method</h3>
                  <p className="text-gray-900">{order.paymentMethod}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Shipping Address</h3>
                  <address className="not-italic text-gray-900">
                    {order.shippingAddress.name}
                    <br />
                    {order.shippingAddress.address}
                    <br />
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                    <br />
                    {order.shippingAddress.country}
                  </address>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Contact</h3>
                  <p className="text-gray-900">{order.shippingAddress.phone}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium mb-4">Order Items</h3>
                <div className="divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <div key={`${item.product.id}-${item.size}-${item.color}`} className="py-4 flex items-center">
                      <div className="flex-shrink-0 relative w-16 h-16">
                        <Image
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <Link href={`/products/${item.product.id}`}>
                          <h4 className="text-sm font-medium text-gray-900 hover:text-red-600">{item.product.name}</h4>
                        </Link>
                        <p className="text-sm text-gray-500">
                          {item.color}, {item.size}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">x{item.quantity}</span>
                        <span className="text-sm font-medium text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ${order.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">Included</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </GlassCard>

        <GlassCard className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-red-600 font-medium">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Order Processing</h3>
                <p className="text-gray-600">
                  Your order is being processed and prepared for shipping. You will receive an email when your order
                  ships.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-red-600 font-medium">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Shipping</h3>
                <p className="text-gray-600">
                  Your order will be shipped soon. You will receive a tracking number once your order ships.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-red-600 font-medium">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Delivery</h3>
                <p className="text-gray-600">
                  Your order will be delivered to the shipping address you provided. Someone may need to sign for the
                  package.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="text-center mb-8">
          <Link href="/products">
            <Button variant="ios" className="flex items-center mx-auto">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

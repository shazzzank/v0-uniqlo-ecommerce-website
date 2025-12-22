"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { products } from "@/lib/products-data"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart()
  const router = useRouter()
  const [promoCode, setPromoCode] = useState("")

  const subtotal = getCartTotal()
  const shipping = subtotal > 50 ? 0 : 4.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const recommendedProducts = products.filter((p) => !items.find((item) => item.product.id === p.id)).slice(0, 3)

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {items.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <GlassCard className="overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Cart Items ({getCartCount()})</h2>
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      className="py-6 flex flex-col sm:flex-row"
                    >
                      <div className="flex-shrink-0 relative w-full sm:w-32 h-32 mb-4 sm:mb-0">
                        <Image
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                      <div className="flex-1 sm:ml-6 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <Link href={`/products/${item.product.id}`}>
                              <h3 className="text-lg font-medium text-gray-900 hover:text-red-600">
                                {item.product.name}
                              </h3>
                            </Link>
                            <p className="text-lg font-medium text-gray-900">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            <p>Color: {item.color}</p>
                            <p>Size: {item.size}</p>
                            <p className="font-medium text-gray-700">${item.product.price} each</p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded-full">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                              className="p-1 rounded-l-full hover:bg-gray-100"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                              className="p-1 rounded-r-full hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                            className="text-gray-400 hover:text-red-600 flex items-center"
                          >
                            <Trash2 className="h-5 w-5" />
                            <span className="ml-1 text-sm">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Recommended Products */}
            {recommendedProducts.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {recommendedProducts.map((product) => (
                    <GlassCard key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Link href={`/products/${product.id}`}>
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                      </div>
                      <div className="p-4">
                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-semibold text-gray-900 mb-1 hover:text-red-600">{product.name}</h3>
                        </Link>
                        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">${product.price}</span>
                          <Button variant="ios" size="sm" onClick={() => router.push(`/products/${product.id}`)}>
                            View
                          </Button>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <GlassCard className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="ios" className="w-full py-6" onClick={() => router.push("/checkout")}>
                  Proceed to Checkout
                </Button>
                <div className="mt-4 text-center">
                  <Link href="/products" className="text-red-600 hover:text-red-500 flex items-center justify-center">
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Promo Code</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 rounded-l-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <Button variant="ios" className="rounded-l-none">
                    Apply
                  </Button>
                </div>
              </div>

              {/* Shipping & Returns */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-500">
                <p className="mb-2">Free shipping on orders over $50</p>
                <p>30-day easy returns</p>
              </div>
            </GlassCard>
          </div>
        </div>
      ) : (
        <GlassCard className="p-8 text-center">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-gray-100 rounded-full mb-4">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/products">
              <Button variant="ios" className="flex items-center">
                Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Recommended Products */}
          {products.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4 text-left">Recommended for You</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.slice(0, 3).map((product) => (
                  <GlassCard key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Link href={`/products/${product.id}`}>
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    </div>
                    <div className="p-4">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-gray-900 mb-1 hover:text-red-600">{product.name}</h3>
                      </Link>
                      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">${product.price}</span>
                        <Button variant="ios" size="sm" onClick={() => router.push(`/products/${product.id}`)}>
                          View
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}
        </GlassCard>
      )}
    </div>
  )
}

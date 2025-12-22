"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/card"
import { IosInput } from "@/components/ui/input"
import { useCart } from "@/contexts/cart-context"
import { useOrders } from "@/contexts/orders-context"
import { useAuth } from "@/contexts/auth-context"

// Mock cart data (This will be replaced by useCart hook)
// const cartItems = [
//   {
//     id: 1,
//     name: "Ultra Light Down Jacket",
//     price: 59.9,
//     color: "Black",
//     size: "M",
//     quantity: 1,
//     image: "/placeholder.svg?height=400&width=300",
//   },
//   {
//     id: 2,
//     name: "Heattech Crew Neck Long Sleeve T-Shirt",
//     price: 14.9,
//     color: "White",
//     size: "L",
//     quantity: 2,
//     image: "/placeholder.svg?height=400&width=300",
//   },
// ]

// const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
// const shipping = subtotal > 50 ? 0 : 4.99
// const tax = subtotal * 0.08
// const total = subtotal + shipping + tax

type CheckoutStep = "information" | "shipping" | "payment" | "review"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getCartTotal, clearCart } = useCart()
  const { addOrder } = useOrders()
  const { user, isAuthenticated } = useAuth()

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("information")
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    address: "",
    apartment: "",
    city: "",
    country: "United States",
    state: "",
    zipCode: "",
    phone: user?.phone || "",
    shippingMethod: "standard",
    paymentMethod: "credit-card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    savePaymentInfo: false,
  })

  const subtotal = getCartTotal()
  const shipping =
    formData.shippingMethod === "standard"
      ? subtotal > 50
        ? 0
        : 4.99
      : formData.shippingMethod === "express"
        ? 14.99
        : 24.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (currentStep === "information") {
      setCurrentStep("shipping")
    } else if (currentStep === "shipping") {
      setCurrentStep("payment")
    } else if (currentStep === "payment") {
      setCurrentStep("review")
    } else if (currentStep === "review") {
      setIsProcessing(true)

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const orderId = addOrder({
        items,
        total,
        status: "processing",
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          address: formData.address,
          city: formData.city,
          postalCode: formData.zipCode,
          country: formData.country,
          phone: formData.phone,
        },
        paymentMethod:
          formData.paymentMethod === "credit-card"
            ? `Credit Card ending in ${formData.cardNumber.slice(-4)}`
            : formData.paymentMethod === "paypal"
              ? "PayPal"
              : "Apple Pay",
      })

      clearCart()
      router.push(`/order-confirmation?orderId=${orderId}`)
    }
  }

  const goBack = () => {
    if (currentStep === "shipping") {
      setCurrentStep("information")
    } else if (currentStep === "payment") {
      setCurrentStep("shipping")
    } else if (currentStep === "review") {
      setCurrentStep("payment")
    }
  }

  if (items.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassCard className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some items to your cart before checking out.</p>
          <Link href="/products">
            <Button variant="ios">Continue Shopping</Button>
          </Link>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <GlassCard className="p-6">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center">
                <div
                  className={`flex items-center ${currentStep === "information" ? "text-red-600" : "text-gray-500"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep === "information" ? "bg-red-600 text-white" : "bg-gray-200"
                    }`}
                  >
                    1
                  </div>
                  <span className="ml-2 hidden sm:inline">Information</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
                <div className={`flex items-center ${currentStep === "shipping" ? "text-red-600" : "text-gray-500"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep === "shipping" ? "bg-red-600 text-white" : "bg-gray-200"
                    }`}
                  >
                    2
                  </div>
                  <span className="ml-2 hidden sm:inline">Shipping</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
                <div className={`flex items-center ${currentStep === "payment" ? "text-red-600" : "text-gray-500"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep === "payment" ? "bg-red-600 text-white" : "bg-gray-200"
                    }`}
                  >
                    3
                  </div>
                  <span className="ml-2 hidden sm:inline">Payment</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
                <div className={`flex items-center ${currentStep === "review" ? "text-red-600" : "text-gray-500"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep === "review" ? "bg-red-600 text-white" : "bg-gray-200"
                    }`}
                  >
                    4
                  </div>
                  <span className="ml-2 hidden sm:inline">Review</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Information Step */}
              {currentStep === "information" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <IosInput
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First name
                        </label>
                        <IosInput
                          id="firstName"
                          name="firstName"
                          type="text"
                          autoComplete="given-name"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last name
                        </label>
                        <IosInput
                          id="lastName"
                          name="lastName"
                          type="text"
                          autoComplete="family-name"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <IosInput
                          id="address"
                          name="address"
                          type="text"
                          autoComplete="street-address"
                          required
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
                          Apartment, suite, etc. (optional)
                        </label>
                        <IosInput
                          id="apartment"
                          name="apartment"
                          type="text"
                          value={formData.apartment}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <IosInput
                          id="city"
                          name="city"
                          type="text"
                          autoComplete="address-level2"
                          required
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          required
                          value={formData.country}
                          onChange={handleChange}
                          className="flex h-12 w-full rounded-2xl border-0 bg-gray-100/80 px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="Mexico">Mexico</option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State / Province
                        </label>
                        <IosInput
                          id="state"
                          name="state"
                          type="text"
                          autoComplete="address-level1"
                          required
                          value={formData.state}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP / Postal code
                        </label>
                        <IosInput
                          id="zipCode"
                          name="zipCode"
                          type="text"
                          autoComplete="postal-code"
                          required
                          value={formData.zipCode}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <IosInput
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" variant="ios">
                      Continue to Shipping
                    </Button>
                  </div>
                </div>
              )}

              {/* Shipping Step */}
              {currentStep === "shipping" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
                    <div className="space-y-4">
                      <label className="flex items-center p-4 border border-gray-200 rounded-2xl bg-white/60 backdrop-blur-sm cursor-pointer hover:bg-white/80">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="standard"
                          checked={formData.shippingMethod === "standard"}
                          onChange={handleChange}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded-full"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between">
                            <span className="block text-sm font-medium text-gray-900">Standard Shipping</span>
                            <span className="text-sm font-medium text-gray-900">
                              {subtotal > 50 ? "Free" : "$4.99"}
                            </span>
                          </div>
                          <span className="block text-sm text-gray-500">3-5 business days</span>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border border-gray-200 rounded-2xl bg-white/60 backdrop-blur-sm cursor-pointer hover:bg-white/80">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="express"
                          checked={formData.shippingMethod === "express"}
                          onChange={handleChange}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded-full"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between">
                            <span className="block text-sm font-medium text-gray-900">Express Shipping</span>
                            <span className="text-sm font-medium text-gray-900">$14.99</span>
                          </div>
                          <span className="block text-sm text-gray-500">2-3 business days</span>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border border-gray-200 rounded-2xl bg-white/60 backdrop-blur-sm cursor-pointer hover:bg-white/80">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="overnight"
                          checked={formData.shippingMethod === "overnight"}
                          onChange={handleChange}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded-full"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between">
                            <span className="block text-sm font-medium text-gray-900">Overnight Shipping</span>
                            <span className="text-sm font-medium text-gray-900">$24.99</span>
                          </div>
                          <span className="block text-sm text-gray-500">Next business day</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="secondary" onClick={goBack}>
                      Back
                    </Button>
                    <Button type="submit" variant="ios">
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === "payment" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    <div className="space-y-4">
                      <label className="flex items-center p-4 border border-gray-200 rounded-2xl bg-white/60 backdrop-blur-sm">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit-card"
                          checked={formData.paymentMethod === "credit-card"}
                          onChange={handleChange}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded-full"
                        />
                        <div className="ml-3 flex items-center">
                          <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="block text-sm font-medium text-gray-900">Credit Card</span>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border border-gray-200 rounded-2xl bg-white/60 backdrop-blur-sm">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === "paypal"}
                          onChange={handleChange}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded-full"
                        />
                        <div className="ml-3 flex items-center">
                          {/* Removed SVG for PayPal, as per updates */}
                          <span className="block text-sm font-medium text-gray-900">PayPal</span>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border border-gray-200 rounded-2xl bg-white/60 backdrop-blur-sm">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="apple-pay"
                          checked={formData.paymentMethod === "apple-pay"}
                          onChange={handleChange}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded-full"
                        />
                        <div className="ml-3 flex items-center">
                          {/* Removed SVG for Apple Pay, as per updates */}
                          <span className="block text-sm font-medium text-gray-900">Apple Pay</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === "credit-card" && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <IosInput
                          id="cardNumber"
                          name="cardNumber"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          required
                          value={formData.cardNumber}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <IosInput
                          id="cardName"
                          name="cardName"
                          type="text"
                          required
                          value={formData.cardName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <IosInput
                            id="expiryDate"
                            name="expiryDate"
                            type="text"
                            placeholder="MM/YY"
                            required
                            value={formData.expiryDate}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <IosInput
                            id="cvv"
                            name="cvv"
                            type="text"
                            placeholder="123"
                            required
                            value={formData.cvv}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      {/* Removed "Save this payment information for next time" checkbox as per updates */}
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Button type="button" variant="secondary" onClick={goBack}>
                      Back
                    </Button>
                    <Button type="submit" variant="ios">
                      Review Order
                    </Button>
                  </div>
                </div>
              )}

              {/* Review Step */}
              {currentStep === "review" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>

                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium">Contact Information</h3>
                        <button
                          type="button"
                          onClick={() => setCurrentStep("information")}
                          className="text-sm text-red-600 hover:text-red-500"
                        >
                          Edit
                        </button>
                      </div>
                      <GlassCard className="p-4">
                        <p className="text-gray-700">{formData.email}</p>
                        <p className="text-gray-700">{formData.phone}</p>
                      </GlassCard>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium">Shipping Address</h3>
                        <button
                          type="button"
                          onClick={() => setCurrentStep("information")}
                          className="text-sm text-red-600 hover:text-red-500"
                        >
                          Edit
                        </button>
                      </div>
                      <GlassCard className="p-4">
                        <p className="text-gray-700">
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p className="text-gray-700">{formData.address}</p>
                        {formData.apartment && <p className="text-gray-700">{formData.apartment}</p>}
                        <p className="text-gray-700">
                          {formData.city}, {formData.state} {formData.zipCode}
                        </p>
                        <p className="text-gray-700">{formData.country}</p>
                      </GlassCard>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium">Shipping Method</h3>
                        <button
                          type="button"
                          onClick={() => setCurrentStep("shipping")}
                          className="text-sm text-red-600 hover:text-red-500"
                        >
                          Edit
                        </button>
                      </div>
                      <GlassCard className="p-4">
                        <p className="text-gray-700">
                          {formData.shippingMethod === "standard"
                            ? "Standard Shipping (3-5 business days)"
                            : formData.shippingMethod === "express"
                              ? "Express Shipping (2-3 business days)"
                              : "Overnight Shipping (Next business day)"}
                        </p>
                      </GlassCard>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium">Payment Method</h3>
                        <button
                          type="button"
                          onClick={() => setCurrentStep("payment")}
                          className="text-sm text-red-600 hover:text-red-500"
                        >
                          Edit
                        </button>
                      </div>
                      <GlassCard className="p-4">
                        {formData.paymentMethod === "credit-card" ? (
                          <div className="flex items-center">
                            <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                            <span>Credit Card ending in {formData.cardNumber.slice(-4)}</span>
                          </div>
                        ) : formData.paymentMethod === "paypal" ? (
                          <span>PayPal</span>
                        ) : (
                          <span>Apple Pay</span>
                        )}
                      </GlassCard>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="secondary" onClick={goBack}>
                      Back
                    </Button>
                    <Button type="submit" variant="ios" disabled={isProcessing}>
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </GlassCard>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <GlassCard className="p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex items-center">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.product.images[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{item.product.name}</h4>
                    <p className="text-sm text-gray-500">
                      {item.color}, {item.size}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
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
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">${total.toFixed(2)}</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

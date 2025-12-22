"use client"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Package, Heart, CreditCard, MapPin, Settings, LogOut, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { useOrders } from "@/contexts/orders-context"
import { useWishlist } from "@/contexts/wishlist-context"

const accountLinks = [
  { name: "Profile", href: "/account/profile", icon: User },
  { name: "Orders", href: "/account/orders", icon: Package },
  { name: "Wishlist", href: "/wishlist", icon: Heart },
  { name: "Payment Methods", href: "/account/payment", icon: CreditCard },
  { name: "Addresses", href: "/account/addresses", icon: MapPin },
  { name: "Account Settings", href: "/account/settings", icon: Settings },
]

export default function AccountPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()
  const { orders } = useOrders()
  const { items: wishlistItems } = useWishlist()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const recentOrders = orders.slice(0, 2)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Profile Card */}
        <GlassCard className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 bg-gray-200 flex items-center justify-center">
              <User className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500 mb-2">{user.email}</p>
            <Link href="/account/profile" className="w-full">
              <Button variant="secondary" className="mt-4 w-full">
                Edit Profile
              </Button>
            </Link>
          </div>
        </GlassCard>

        {/* Account Navigation */}
        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold mb-4">Account</h2>
          <nav className="space-y-2">
            {accountLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <link.icon className="h-5 w-5 text-gray-500 mr-3" />
                  <span>{link.name}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 rounded-xl hover:bg-gray-100 transition-colors text-red-600"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Sign Out</span>
            </button>
          </nav>
        </GlassCard>

        {/* Recent Orders */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Link href="/account/orders" className="text-sm text-red-600 hover:text-red-500">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => {
                const orderDate = new Date(order.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
                return (
                  <Link
                    key={order.id}
                    href={`/account/orders`}
                    className="block p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-500">{orderDate}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                        <p className="text-sm font-medium mt-1">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </Link>
                )
              })
            ) : (
              <p className="text-gray-500 text-center py-4">No orders yet</p>
            )}
          </div>
        </GlassCard>

        {/* Wishlist Preview */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Wishlist</h2>
            <Link href="/wishlist" className="text-sm text-red-600 hover:text-red-500">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {wishlistItems.length > 0 ? (
              wishlistItems.slice(0, 2).map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="flex items-center p-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.images[0] || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4 col-span-2">Your wishlist is empty</p>
            )}
          </div>
        </GlassCard>

        {/* Help & Support */}
        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold mb-4">Help & Support</h2>
          <div className="space-y-3">
            <Link
              href="/help"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span>FAQ</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span>Contact Us</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
            <Link
              href="/store-locator"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span>Store Locator</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, Heart, User, Menu, X, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { getCartCount } = useCart()
  const { isAuthenticated } = useAuth()

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: Package },
    { name: "Cart", href: "/cart", icon: ShoppingBag, badge: getCartCount() },
    { name: "Wishlist", href: "/wishlist", icon: Heart },
    { name: "Account", href: isAuthenticated ? "/account" : "/login", icon: User },
  ]

  const headerNavLinks = [
    { name: "Women", href: "/products" },
    { name: "Men", href: "/products" },
    { name: "Kids", href: "/products" },
    { name: "Baby", href: "/products" },
    { name: "Sale", href: "/products" },
  ]

  return (
    <div className="min-h-screen bg-gradient-cool">
      {/* Header */}
      <header className="sticky top-0 z-10">
        <div className="glass mx-4 my-4 px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-red-600">
            UNIQLO
          </Link>

          <nav className="hidden lg:flex items-center space-x-6">
            {headerNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center text-sm font-medium relative ${
                  isActive(item.href) ? "text-red-600" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                <item.icon className="h-5 w-5 mr-1" />
                <span className="hidden lg:inline">{item.name}</span>
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            ))}
          </div>

          <Button
            variant="secondary"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="glass mx-4 p-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <div className="pb-4 border-b border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Categories</p>
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block py-2 text-sm font-medium text-gray-700 hover:text-red-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center text-sm font-medium relative ${
                    isActive(item.href) ? "text-red-600" : "text-gray-700 hover:text-gray-900"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.name}
                  {item.badge && item.badge > 0 ? (
                    <span className="ml-2 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 pb-24">{children}</main>

      <footer className="glass mx-4 mb-24 md:mb-8 p-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About UNIQLO</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-red-600">
                  Company Information
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-red-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-red-600">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-red-600">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-red-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sm text-gray-600 hover:text-red-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sm text-gray-600 hover:text-red-600">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/store-locator" className="text-sm text-gray-600 hover:text-red-600">
                  Store Locator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-gray-600 hover:text-red-600">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-gray-600 hover:text-red-600">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-gray-600 hover:text-red-600">
                  Kids
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-gray-600 hover:text-red-600">
                  Baby
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-red-600">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-red-600">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-red-600">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-red-600">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>&copy; 2025 UNIQLO. All rights reserved.</p>
        </div>
      </footer>

      {/* iOS-style bottom menu (mobile only) */}
      <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="glass-dark flex items-center justify-around px-6 py-3 space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center relative ${
                isActive(item.href) ? "text-red-500" : "text-gray-300 hover:text-white"
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.name}</span>
              {item.badge && item.badge > 0 ? (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

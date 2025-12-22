"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Trash2, ShoppingBag, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/card"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"

export default function WishlistPage() {
  const router = useRouter()
  const { items, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (product: any) => {
    const defaultSize = product.sizes[0]
    const defaultColor = product.colors[0]
    addToCart(product, 1, defaultSize, defaultColor)
    router.push("/cart")
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => (
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
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 glass rounded-full hover:bg-white/80 transition-colors"
                >
                  <Heart className="h-4 w-4 fill-red-600 text-red-600" />
                </button>
              </div>
              <div className="p-4">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-red-600">{product.name}</h3>
                </Link>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-lg">${product.price}</span>
                  {!product.inStock && <span className="text-xs text-red-600">Out of Stock</span>}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ios"
                    size="sm"
                    className="flex-1"
                    disabled={!product.inStock}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => removeFromWishlist(product.id)} className="px-3">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <GlassCard className="p-8 text-center">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-gray-100 rounded-full mb-4">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Save your favorite items to your wishlist</p>
            <Link href="/products">
              <Button variant="ios" className="flex items-center">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </GlassCard>
      )}
    </div>
  )
}

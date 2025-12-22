"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, Filter, Grid, List, Heart, Star, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/card"
import { IosInput } from "@/components/ui/input"
import { useWishlist } from "@/contexts/wishlist-context"
import { products, getProductsByCategory } from "@/lib/products-data"

const categories = ["All", "Outerwear", "Tops", "Bottoms", "Innerwear"]
const colors = ["All", "Navy", "Black", "Red", "Gray", "White", "Beige"]
const priceRanges = [
  { label: "All", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 - $50", min: 25, max: 50 },
  { label: "$50 - $75", min: 50, max: 75 },
  { label: "Over $75", min: 75, max: Number.POSITIVE_INFINITY },
]

export default function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All")
  const [selectedColor, setSelectedColor] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    let filtered = products

    if (selectedCategory !== "All") {
      filtered = getProductsByCategory(selectedCategory)
    }

    if (selectedColor !== "All") {
      filtered = filtered.filter((product) => product.colors.includes(selectedColor))
    }

    if (selectedPriceRange.label !== "All") {
      filtered = filtered.filter(
        (product) => product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max,
      )
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "newest":
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, selectedColor, selectedPriceRange, sortBy, searchQuery])

  const toggleWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    if (isInWishlist(productId)) {
      removeFromWishlist(productId)
    } else {
      addToWishlist(product)
    }
  }

  const clearFilters = () => {
    setSelectedCategory("All")
    setSelectedColor("All")
    setSelectedPriceRange(priceRanges[0])
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen">
      <div className="glass my-6 p-4 flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <IosInput
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <Button variant="secondary" className="ml-4 rounded-full" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm">
                Clear All
              </Button>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="mr-2 rounded-full"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Color</h3>
              <div className="space-y-2">
                {colors.map((color) => (
                  <label key={color} className="flex items-center">
                    <input
                      type="radio"
                      name="color"
                      checked={selectedColor === color}
                      onChange={() => setSelectedColor(color)}
                      className="mr-2 rounded-full"
                    />
                    <span className="text-sm">{color}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Price</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label key={range.label} className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      checked={selectedPriceRange.label === range.label}
                      onChange={() => setSelectedPriceRange(range)}
                      className="mr-2 rounded-full"
                    />
                    <span className="text-sm">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="flex-1">
          <GlassCard className="p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{filteredProducts.length} products</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="flex border border-gray-200 rounded-full overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-gray-100" : ""}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-gray-100" : ""}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </GlassCard>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
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
                    {product.featured && (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                        FEATURED
                      </span>
                    )}
                    {!product.inStock && (
                      <span className="absolute top-3 left-3 bg-gray-600 text-white text-xs px-3 py-1 rounded-full">
                        OUT OF STOCK
                      </span>
                    )}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 glass rounded-full hover:bg-white/80 transition-colors"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isInWishlist(product.id) ? "fill-red-600 text-red-600" : "text-gray-400"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-red-600">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                    {product.rating && (
                      <div className="flex items-center mb-3">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">${product.price}</span>
                      <Button
                        variant="ios"
                        size="sm"
                        disabled={!product.inStock}
                        onClick={() => router.push(`/products/${product.id}`)}
                        className={!product.inStock ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""}
                      >
                        {product.inStock ? "View" : "Sold Out"}
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProducts.map((product) => (
                <GlassCard key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex">
                    <div className="relative w-48 h-48 flex-shrink-0">
                      <Link href={`/products/${product.id}`}>
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </Link>
                      {product.featured && (
                        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <Link href={`/products/${product.id}`}>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-red-600">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-gray-500 mb-2">{product.category}</p>
                          {product.rating && (
                            <div className="flex items-center mb-4">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-600 ml-1">
                                {product.rating} ({product.reviews} reviews)
                              </span>
                            </div>
                          )}
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                          <div className="flex items-center space-x-2 mb-4">
                            <span className="text-2xl font-bold">${product.price}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-4">
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="p-2 glass rounded-full hover:bg-white/80 transition-colors"
                          >
                            <Heart
                              className={`h-5 w-5 ${
                                isInWishlist(product.id) ? "fill-red-600 text-red-600" : "text-gray-400"
                              }`}
                            />
                          </button>
                          <Button
                            variant="ios"
                            disabled={!product.inStock}
                            onClick={() => router.push(`/products/${product.id}`)}
                            className={!product.inStock ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""}
                          >
                            {product.inStock ? "View Details" : "Sold Out"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <GlassCard className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
              <Button variant="ios" onClick={clearFilters}>
                Clear Filters
              </Button>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  )
}

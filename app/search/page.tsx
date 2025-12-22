"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { SearchIcon, Filter, X, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/card"
import { IosInput } from "@/components/ui/input"
import { products } from "@/lib/products-data"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"

const searchSuggestions = [
  "jacket",
  "t-shirt",
  "pants",
  "sweater",
  "jeans",
  "shirt",
  "heattech",
  "down jacket",
  "cashmere",
  "flannel",
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const queryParam = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [searchResults, setSearchResults] = useState(products)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const { addItem } = useCart()
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist()

  useEffect(() => {
    if (queryParam) {
      handleSearch(queryParam)
    }
  }, [queryParam])

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredSuggestions(
        searchSuggestions.filter((suggestion) => suggestion.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    } else {
      setFilteredSuggestions([])
    }
  }, [searchQuery])

  const handleSearch = (query: string = searchQuery) => {
    setIsSearching(true)
    setShowSuggestions(false)

    setTimeout(() => {
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
    handleSearch(suggestion)
  }

  const toggleWishlist = (productId: number) => {
    if (wishlistItems.some((item) => item.id === productId)) {
      removeFromWishlist(productId)
    } else {
      const product = products.find((p) => p.id === productId)
      if (product) {
        addToWishlist(product)
      }
    }
  }

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Search</h1>

      {/* Search Bar */}
      <GlassCard className="p-6 mb-8">
        <div className="relative">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <IosInput
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowSuggestions(e.target.value.length > 0)
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(searchQuery.length > 0)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("")
                  setShowSuggestions(false)
                  setSearchResults(products)
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white rounded-2xl shadow-lg border border-gray-200">
              <ul className="py-2">
                {filteredSuggestions.map((suggestion, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      <SearchIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{suggestion}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex space-x-2">
            <Button variant="secondary" size="sm" className="rounded-full">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Link href="/products?category=women">
              <Button variant="secondary" size="sm" className="rounded-full">
                Women
              </Button>
            </Link>
            <Link href="/products?category=men">
              <Button variant="secondary" size="sm" className="rounded-full">
                Men
              </Button>
            </Link>
            <Link href="/products?category=kids">
              <Button variant="secondary" size="sm" className="rounded-full">
                Kids
              </Button>
            </Link>
          </div>
          <Button variant="ios" size="sm" onClick={() => handleSearch()}>
            Search
          </Button>
        </div>
      </GlassCard>

      {isSearching ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-red-600"></div>
          <p className="mt-4 text-gray-600">Searching...</p>
        </div>
      ) : searchQuery ? (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Search Results for "{searchQuery}" ({searchResults.length})
            </h2>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <GlassCard key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                        NEW
                      </span>
                    )}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 glass rounded-full hover:bg-white/80 transition-colors"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          wishlistItems.some((item) => item.id === product.id)
                            ? "fill-red-600 text-red-600"
                            : "text-gray-400"
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
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">${product.price}</span>
                      <Button variant="ios" size="sm" onClick={() => handleAddToCart(product)}>
                        Add
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : (
            <GlassCard className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-gray-500 mb-6">
                We couldn't find any products matching "{searchQuery}". Please try a different search term.
              </p>
              <div className="max-w-md mx-auto">
                <h4 className="font-medium mb-2">Popular searches:</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {searchSuggestions.slice(0, 5).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>
          )}
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-6">Popular Searches</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-4 glass text-left hover:bg-white/80 transition-colors rounded-2xl"
              >
                <div className="flex items-center">
                  <SearchIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="font-medium">{suggestion}</span>
                </div>
              </button>
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-12 mb-6">Trending Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <GlassCard key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 glass rounded-full hover:bg-white/80 transition-colors"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        wishlistItems.some((item) => item.id === product.id)
                          ? "fill-red-600 text-red-600"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
                <div className="p-4">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-red-600">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">${product.price}</span>
                    <Button variant="ios" size="sm" onClick={() => handleAddToCart(product)}>
                      Add
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

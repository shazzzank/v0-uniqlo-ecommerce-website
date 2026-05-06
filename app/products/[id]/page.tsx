"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Heart, Share2, Star, Truck, ShieldCheck, ArrowRight, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { getProductById, products } from "@/lib/products-data"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const product = getProductById(params.id)

  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    if (product) {
      if (!selectedColor && product.colors.length > 0) {
        setSelectedColor(product.colors[0].name)
      }
      if (!selectedSize && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0])
      }
    }
  }, [product?.id])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassCard className="p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
          <Link href="/products">
            <Button variant="ios">Back to Products</Button>
          </Link>
        </GlassCard>
      </div>
    )
  }

  const isWishlisted = isInWishlist(product.id)

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color")
      return
    }
    addToCart(product, quantity, selectedSize, selectedColor)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color")
      return
    }
    addToCart(product, quantity, selectedSize, selectedColor)
    router.push("/checkout")
  }

  const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 my-6 text-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          Home
        </Link>
        <span className="text-gray-400">/</span>
        <Link href="/products" className="text-gray-500 hover:text-gray-700">
          Products
        </Link>
        <span className="text-gray-400">/</span>
        <Link href={`/products?category=${product.category}`} className="text-gray-500 hover:text-gray-700">
          {product.category}
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      {/* Back Button (Mobile) */}
      <div className="lg:hidden mb-4">
        <Link href="/products">
          <Button variant="secondary" size="sm" className="rounded-full">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <GlassCard className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </GlassCard>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`glass overflow-hidden rounded-xl ${selectedImage === index ? "ring-2 ring-red-600" : ""}`}
              >
                <div className="relative aspect-square">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <GlassCard className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating || 0} ({product.reviews || 0} reviews)
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={toggleWishlist} className="p-2 glass rounded-full hover:bg-white/80 transition-colors">
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-600 text-red-600" : "text-gray-400"}`} />
                </button>
                <button className="p-2 glass rounded-full hover:bg-white/80 transition-colors">
                  <Share2 className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.inStock ? (
                <span className="text-green-600 text-sm font-medium">In Stock</span>
              ) : (
                <span className="text-red-600 text-sm font-medium">Out of Stock</span>
              )}
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Color: {selectedColor}</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedColor === color
                        ? "bg-black text-white"
                        : "bg-white/60 backdrop-blur-sm border border-gray-200 text-gray-900 hover:bg-gray-50"
                    }`}
                    aria-label={`Color: ${color}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">Size: {selectedSize}</h3>
                <button className="text-sm font-medium text-red-600 hover:text-red-500">Size Guide</button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-sm font-medium rounded-full ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white/60 backdrop-blur-sm border border-gray-200 text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="p-2 border border-gray-300 rounded-l-full"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-t border-b border-gray-300 py-2"
                />
                <button onClick={incrementQuantity} className="p-2 border border-gray-300 rounded-r-full">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <Button variant="ios" className="flex-1 py-6" onClick={handleAddToCart} disabled={!product.inStock}>
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </Button>
              <Button variant="secondary" className="flex-1 py-6" onClick={handleBuyNow} disabled={!product.inStock}>
                Buy Now
              </Button>
            </div>

            {/* Shipping & Returns */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Free Shipping & Returns</h4>
                  <p className="text-sm text-gray-500">Free standard shipping on orders over $50</p>
                </div>
              </div>
              <div className="flex items-start">
                <ShieldCheck className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Satisfaction Guaranteed</h4>
                  <p className="text-sm text-gray-500">30-day money back guarantee</p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Product Details Tabs */}
          <GlassCard className="mt-6 p-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-4 px-1 text-sm font-medium ${
                  activeTab === "description"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("features")}
                className={`ml-8 pb-4 px-1 text-sm font-medium ${
                  activeTab === "features"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`ml-8 pb-4 px-1 text-sm font-medium ${
                  activeTab === "reviews"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Reviews ({product.reviews})
              </button>
            </div>

            <div className="pt-6">
              {activeTab === "description" && <p className="text-gray-700">{product.description}</p>}

              {activeTab === "features" && (
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">Based on {product.reviews || 0} reviews</span>
                  </div>

                  <Button variant="secondary">Write a Review</Button>

                  <p className="text-gray-500 text-sm">
                    Reviews are loaded dynamically based on the product. This is a placeholder.
                  </p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
            <Link href="/products" className="text-red-600 hover:text-red-500 flex items-center">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <GlassCard key={relatedProduct.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <Image
                      src={relatedProduct.images[0] || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
                <div className="p-4">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-1 hover:text-red-600">{relatedProduct.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-2">{relatedProduct.category}</p>
                  <span className="font-bold">${relatedProduct.price}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

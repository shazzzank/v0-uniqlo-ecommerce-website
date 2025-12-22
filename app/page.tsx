"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/card"
import { getFeaturedProducts } from "@/lib/products-data"

// Mock featured products
// const featuredProducts = [
//   {
//     id: 1,
//     name: "Ultra Light Down Jacket",
//     price: 59.9,
//     image: "/placeholder.svg?height=400&width=300",
//     category: "Outerwear",
//   },
//   {
//     id: 2,
//     name: "Heattech Crew Neck Long Sleeve T-Shirt",
//     price: 14.9,
//     image: "/placeholder.svg?height=400&width=300",
//     category: "Basics",
//   },
//   {
//     id: 4,
//     name: "Cashmere Crew Neck Sweater",
//     price: 79.9,
//     image: "/placeholder.svg?height=400&width=300",
//     category: "Knitwear",
//   },
//   {
//     id: 5,
//     name: "Flannel Checked Long Sleeve Shirt",
//     price: 29.9,
//     image: "/placeholder.svg?height=400&width=300",
//     category: "Shirts",
//   },
// ]

// Mock collections
const collections = [
  {
    id: 1,
    name: "Summer Essentials",
    description: "Light, breathable pieces for warm weather",
    image: "/summer-clothing-collection.jpg",
    link: "/products?category=Tops",
  },
  {
    id: 2,
    name: "Workwear",
    description: "Professional attire for the modern workplace",
    image: "/professional-workwear-collection.jpg",
    link: "/products?category=Bottoms",
  },
  {
    id: 3,
    name: "Loungewear",
    description: "Comfortable styles for home and relaxation",
    image: "/comfortable-loungewear-collection.jpg",
    link: "/products?category=Innerwear",
  },
]

// Mock hero slides
const heroSlides = [
  {
    id: 1,
    title: "Summer Collection 2024",
    subtitle: "Light fabrics for warm days",
    image: "/summer-fashion-hero-banner.jpg",
    buttonText: "Shop Now",
    buttonLink: "/products",
  },
  {
    id: 2,
    title: "AIRism Technology",
    subtitle: "Cool and dry all day long",
    image: "/airism-technology-fabric.jpg",
    buttonText: "Discover AIRism",
    buttonLink: "/products?category=Innerwear",
  },
  {
    id: 3,
    title: "Sustainable Fashion",
    subtitle: "Better clothes for a better future",
    image: "/sustainable-fashion-collage.png",
    buttonText: "Learn More",
    buttonLink: "/about",
  },
]

export default function HomePage() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const featuredProducts = getFeaturedProducts()

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
  }

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <div className="relative h-[80vh] mb-12 overflow-hidden rounded-3xl">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center">
              <div className="container mx-auto px-6">
                <div className="max-w-xl text-white">
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">{slide.title}</h1>
                  <p className="text-xl mb-6">{slide.subtitle}</p>
                  <Link href={slide.buttonLink}>
                    <Button variant="ios" size="lg">
                      {slide.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 glass p-2 rounded-full hover:bg-white/80 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 glass p-2 rounded-full hover:bg-white/80 transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Link href="/products" className="text-red-600 hover:text-red-500 flex items-center">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/products?category=Outerwear" className="group">
            <GlassCard className="p-0 overflow-hidden">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/outerwear-jackets-coats.jpg"
                  alt="Outerwear"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-semibold">Outerwear</h3>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Link>

          <Link href="/products?category=Tops" className="group">
            <GlassCard className="p-0 overflow-hidden">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/shirts-tops-tshirts.jpg"
                  alt="Tops"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-semibold">Tops</h3>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Link>

          <Link href="/products?category=Bottoms" className="group">
            <GlassCard className="p-0 overflow-hidden">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/pants-jeans-trousers.jpg"
                  alt="Bottoms"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-semibold">Bottoms</h3>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Link>

          <Link href="/products?category=Innerwear" className="group">
            <GlassCard className="p-0 overflow-hidden">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/innerwear-heattech-airism.jpg"
                  alt="Innerwear"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-semibold">Innerwear</h3>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/products" className="text-red-600 hover:text-red-500 flex items-center">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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

      {/* Collections */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link key={collection.id} href={collection.link} className="group">
              <GlassCard className="p-0 overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-semibold mb-2">{collection.name}</h3>
                      <p className="text-sm opacity-90">{collection.description}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>

      {/* Innovation Section */}
      <GlassCard className="p-8 mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Innovation in Every Thread</h2>
            <p className="text-gray-700 mb-4">
              From HEATTECH that keeps you warm to AIRism that keeps you cool, our innovative fabrics are designed to
              improve your daily life.
            </p>
            <p className="text-gray-700 mb-6">
              Discover how our cutting-edge technology and thoughtful design come together to create LifeWear that works
              for everyone.
            </p>
            <Link href="/about">
              <Button variant="ios">
                Learn About Our Technology
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2 relative h-80 w-full rounded-2xl overflow-hidden">
            <Image src="/textile-technology-innovation.jpg" alt="UNIQLO Innovation" fill className="object-cover" />
          </div>
        </div>
      </GlassCard>

      {/* Newsletter Signup */}
      <GlassCard className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Stay in the Loop</h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Be the first to know about new arrivals, exclusive offers, and special events. Join our newsletter today.
        </p>
        <div className="max-w-md mx-auto flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-l-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <Button variant="ios" className="rounded-l-none">
            Subscribe
          </Button>
        </div>
      </GlassCard>
    </div>
  )
}

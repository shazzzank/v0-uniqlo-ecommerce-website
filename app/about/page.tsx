"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] mb-12 overflow-hidden rounded-3xl">
        <Image src="/placeholder.svg?height=800&width=1600" alt="UNIQLO Store" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About UNIQLO</h1>
              <p className="text-xl mb-6">
                Simple, high-quality, everyday clothing with a practical sense of beauty—accessible to all.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <GlassCard className="p-8 mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              UNIQLO was founded in 1984 in Hiroshima, Japan, as a unisex casual wear store. What began as a single
              store has grown into a global brand with over 2,000 stores in 25 countries.
            </p>
            <p className="text-gray-700 mb-4">
              Our philosophy is rooted in the Japanese values of simplicity, quality, and longevity. We believe that
              well-designed clothes should be comfortable, affordable, and made to last.
            </p>
            <p className="text-gray-700">
              Today, UNIQLO is known for its innovative fabrics, timeless designs, and commitment to sustainability. We
              continue to evolve while staying true to our core belief that clothes should improve lives.
            </p>
          </div>
          <div className="md:w-1/2 relative h-80 w-full rounded-2xl overflow-hidden">
            <Image src="/placeholder.svg?height=600&width=800" alt="UNIQLO History" fill className="object-cover" />
          </div>
        </div>
      </GlassCard>

      {/* Our Philosophy */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Philosophy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p className="text-gray-600">
              We are committed to creating high-quality clothing that is durable, comfortable, and designed to last. Our
              rigorous quality control ensures that every garment meets our exacting standards.
            </p>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
            <p className="text-gray-600">
              We believe that everyone should have access to well-designed, high-quality clothing. Our products are
              priced fairly to ensure they are accessible to as many people as possible.
            </p>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-gray-600">
              We are dedicated to reducing our environmental impact through responsible manufacturing, innovative
              materials, and recycling initiatives. We believe in creating clothes that are good for people and the
              planet.
            </p>
          </GlassCard>
        </div>
      </div>

      {/* LifeWear */}
      <GlassCard className="p-8 mb-12">
        <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">LifeWear: Clothing for a Better Life</h2>
            <p className="text-gray-700 mb-4">
              LifeWear is our concept of creating perfect clothing that meets the needs of everyone's daily lifestyles.
              Simple apparel with a not-so-simple purpose: to make your life better.
            </p>
            <p className="text-gray-700 mb-4">
              LifeWear is innovative high-quality clothing that is universal in design and comfort. It is made for
              everyone, everywhere.
            </p>
            <p className="text-gray-700">
              Our clothes are constantly being innovated, bringing more warmth, more lightness, better design, and
              better comfort to your life.
            </p>
          </div>
          <div className="md:w-1/2 relative h-80 w-full rounded-2xl overflow-hidden">
            <Image src="/placeholder.svg?height=600&width=800" alt="UNIQLO LifeWear" fill className="object-cover" />
          </div>
        </div>
      </GlassCard>

      {/* Innovation */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Innovation in Fabric</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="p-6">
            <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=300" alt="HEATTECH" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-semibold mb-2">HEATTECH</h3>
            <p className="text-gray-600 mb-4">
              Revolutionary fabric that generates heat from your body moisture, keeping you warm without bulk.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=300" alt="AIRism" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AIRism</h3>
            <p className="text-gray-600 mb-4">
              Smooth, lightweight fabric that wicks moisture, releases heat, and neutralizes odors for all-day comfort.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=300" alt="Ultra Light Down" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ultra Light Down</h3>
            <p className="text-gray-600 mb-4">
              Incredibly light and warm down jackets that can be packed into a compact pouch for easy carrying.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=300" alt="BLOCKTECH" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-semibold mb-2">BLOCKTECH</h3>
            <p className="text-gray-600 mb-4">
              Water-repellent, windproof, and breathable fabric that protects you from the elements.
            </p>
          </GlassCard>
        </div>
      </div>

      {/* Sustainability */}
      <GlassCard className="p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Commitment to Sustainability</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Environmental Impact</h3>
            <p className="text-gray-700 mb-4">
              We are committed to reducing our environmental footprint through innovative production methods,
              responsible sourcing, and efficient use of resources.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Reducing water usage in manufacturing by 40% since 2017</li>
              <li>Transitioning to renewable energy in our stores and factories</li>
              <li>Developing eco-friendly materials and recycling technologies</li>
              <li>Minimizing packaging waste and using recycled materials</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Social Responsibility</h3>
            <p className="text-gray-700 mb-4">
              We believe in treating people with respect and dignity throughout our supply chain and in the communities
              where we operate.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Ensuring safe and fair working conditions in all factories</li>
              <li>Supporting education and empowerment initiatives</li>
              <li>Clothing recycling program in stores worldwide</li>
              <li>Disaster relief efforts and community support</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link href="/sustainability">
            <Button variant="ios">
              Learn More About Our Sustainability Efforts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </GlassCard>

      {/* Global Presence */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Global Presence</h2>
        <div className="relative h-96 rounded-3xl overflow-hidden">
          <Image src="/placeholder.svg?height=800&width=1600" alt="UNIQLO Global Map" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-2">25+ Countries</h3>
              <p className="text-xl mb-4">Over 2,000 Stores Worldwide</p>
              <Link href="/store-locator">
                <Button variant="ios">Find a Store Near You</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Join Our Team */}
      <GlassCard className="p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          We're always looking for passionate individuals who share our values and vision. Explore career opportunities
          at UNIQLO and be part of our global team.
        </p>
        <Button variant="ios" size="lg">
          View Career Opportunities
        </Button>
      </GlassCard>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin, Phone, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/card"
import { IosInput } from "@/components/ui/input"

// Mock store data
const stores = [
  {
    id: 1,
    name: "UNIQLO Fifth Avenue",
    address: "666 Fifth Avenue, New York, NY 10103",
    phone: "(212) 555-1234",
    hours: "Mon-Sat: 10am-9pm, Sun: 11am-7pm",
    distance: 0.5,
    coordinates: { lat: 40.7587, lng: -73.9787 },
  },
  {
    id: 2,
    name: "UNIQLO SoHo",
    address: "546 Broadway, New York, NY 10012",
    phone: "(212) 555-5678",
    hours: "Mon-Sat: 10am-9pm, Sun: 11am-7pm",
    distance: 1.2,
    coordinates: { lat: 40.7234, lng: -73.9987 },
  },
  {
    id: 3,
    name: "UNIQLO 34th Street",
    address: "31 W 34th St, New York, NY 10001",
    phone: "(212) 555-9012",
    hours: "Mon-Sat: 9am-10pm, Sun: 10am-9pm",
    distance: 1.8,
    coordinates: { lat: 40.7484, lng: -73.9857 },
  },
  {
    id: 4,
    name: "UNIQLO Atlantic Terminal",
    address: "139 Flatbush Ave, Brooklyn, NY 11217",
    phone: "(718) 555-3456",
    hours: "Mon-Sat: 10am-9pm, Sun: 11am-7pm",
    distance: 3.5,
    coordinates: { lat: 40.6848, lng: -73.9774 },
  },
  {
    id: 5,
    name: "UNIQLO Garden State Plaza",
    address: "1 Garden State Plaza, Paramus, NJ 07652",
    phone: "(201) 555-7890",
    hours: "Mon-Sat: 10am-9:30pm, Sun: 11am-7pm",
    distance: 15.7,
    coordinates: { lat: 40.9159, lng: -74.0776 },
  },
]

export default function StoreLocatorPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStore, setSelectedStore] = useState<number | null>(null)
  const [filteredStores, setFilteredStores] = useState(stores)

  const handleSearch = () => {
    if (!searchQuery) {
      setFilteredStores(stores)
      return
    }

    const filtered = stores.filter(
      (store) =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredStores(filtered)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Store Locator</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Search and Store List */}
        <div className="lg:w-1/3">
          <GlassCard className="p-6 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <IosInput
                type="text"
                placeholder="Enter city, state, or zip code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10"
              />
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="secondary" size="sm" className="rounded-full">
                Use My Location
              </Button>
              <Button variant="ios" size="sm" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </GlassCard>

          <div className="space-y-4">
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <GlassCard
                  key={store.id}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedStore === store.id ? "ring-2 ring-red-600" : ""
                  }`}
                  onClick={() => setSelectedStore(store.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{store.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{store.address}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1 text-red-600" />
                        <span>{store.distance} miles away</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </GlassCard>
              ))
            ) : (
              <GlassCard className="p-6 text-center">
                <p className="text-gray-600">No stores found matching your search.</p>
                <Button variant="secondary" className="mt-4" onClick={() => setFilteredStores(stores)}>
                  Show All Stores
                </Button>
              </GlassCard>
            )}
          </div>
        </div>

        {/* Map and Store Details */}
        <div className="lg:w-2/3">
          <GlassCard className="p-0 overflow-hidden">
            <div className="aspect-[16/9] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304605!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b30eac9f%3A0x7955b1c5ed0ba813!2sUNIQLO%20Fifth%20Avenue!5e0!3m2!1sen!2sus!4v1654321234567!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>

            {selectedStore !== null && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {filteredStores.find((store) => store.id === selectedStore)?.name}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-gray-600">
                        {filteredStores.find((store) => store.id === selectedStore)?.address}
                      </p>
                      <div className="mt-2 flex space-x-2">
                        <Button variant="secondary" size="sm">
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-600">
                        {filteredStores.find((store) => store.id === selectedStore)?.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium">Store Hours</h3>
                      <p className="text-gray-600">
                        {filteredStores.find((store) => store.id === selectedStore)?.hours}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium mb-2">Available Services</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm">Click & Collect</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm">Returns</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm">Alterations</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm">Recycling</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      </div>

      {/* Store Features */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Store Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Click & Collect</h3>
            <p className="text-gray-600">Order online and pick up in-store within 2 hours. Free for all orders.</p>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">In-Store Returns</h3>
            <p className="text-gray-600">Return online purchases in any store. Quick and hassle-free process.</p>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Alterations</h3>
            <p className="text-gray-600">Professional alteration services available in-store for a perfect fit.</p>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

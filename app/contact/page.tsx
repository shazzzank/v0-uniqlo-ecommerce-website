"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/card"
import { IosInput } from "@/components/ui/input"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    orderNumber: "",
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const contactSubmission = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
    }

    const existingSubmissions = JSON.parse(localStorage.getItem("contact_submissions") || "[]")
    localStorage.setItem("contact_submissions", JSON.stringify([...existingSubmissions, contactSubmission]))

    console.log("Form submitted:", contactSubmission)
    setFormSubmitted(true)
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Message Sent!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for contacting us. We've received your message and will respond within 24 hours.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setFormData({
                      name: "",
                      email: "",
                      subject: "",
                      message: "",
                      orderNumber: "",
                    })
                    setFormSubmitted(false)
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <IosInput
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <IosInput
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="flex h-12 w-full rounded-2xl border-0 bg-gray-100/80 px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order Inquiry</option>
                      <option value="return">Return/Exchange</option>
                      <option value="product">Product Information</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {formData.subject === "order" && (
                    <div>
                      <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Order Number (optional)
                      </label>
                      <IosInput
                        id="orderNumber"
                        name="orderNumber"
                        type="text"
                        value={formData.orderNumber}
                        onChange={handleChange}
                        placeholder="e.g. ORD-12345678"
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="flex w-full rounded-2xl border-0 bg-gray-100/80 px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    ></textarea>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="privacy"
                      name="privacy"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                      I agree to the{" "}
                      <Link href="/privacy-policy" className="text-red-600 hover:text-red-500">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <Button type="submit" variant="ios" className="w-full">
                    Send Message
                  </Button>
                </form>
              </>
            )}
          </GlassCard>
        </div>

        {/* Contact Info */}
        <div>
          <GlassCard className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Phone</h3>
                  <p className="text-gray-600">1-800-123-4567</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 9am-6pm EST</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Email</h3>
                  <p className="text-gray-600">support@uniqlo.com</p>
                  <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MessageSquare className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Live Chat</h3>
                  <p className="text-gray-600">Chat with our support team</p>
                  <p className="text-sm text-gray-500">Available 24/7</p>
                  <Button variant="secondary" className="mt-2">
                    Start Chat
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-xl font-semibold mb-6">Visit Us</h2>
            <div className="space-y-4">
              <div className="aspect-video relative rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215053348223!2d-73.9888803!3d40.7487994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b30eac9f%3A0x7955b1c5ed0ba813!2sUNIQLO%20Fifth%20Avenue!5e0!3m2!1sen!2sus!4v1654321234567!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Headquarters</h3>
                  <address className="not-italic text-gray-600">
                    666 Fifth Avenue
                    <br />
                    New York, NY 10103
                    <br />
                    United States
                  </address>
                </div>
              </div>
              <Link href="/store-locator">
                <Button variant="secondary" className="w-full">
                  Find a Store Near You
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

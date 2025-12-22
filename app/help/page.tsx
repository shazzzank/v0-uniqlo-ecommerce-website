"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, Search, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/card"
import { IosInput } from "@/components/ui/input"

// Mock FAQ data
const faqCategories = [
  {
    name: "Orders & Shipping",
    faqs: [
      {
        question: "How do I track my order?",
        answer:
          "You can track your order by logging into your account and visiting the 'Orders' section. Alternatively, you can use the tracking number provided in your shipping confirmation email.",
      },
      {
        question: "What are the shipping options?",
        answer:
          "We offer standard shipping (3-5 business days), express shipping (1-2 business days), and overnight shipping (next business day). Free standard shipping is available for orders over $50.",
      },
      {
        question: "Can I change or cancel my order?",
        answer:
          "Orders can be changed or canceled within 1 hour of placing them. Please contact our customer service team as soon as possible if you need to make changes.",
      },
    ],
  },
  {
    name: "Returns & Refunds",
    faqs: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for most items. Products must be unworn, unwashed, and with all original tags attached. Some items, like underwear and face masks, cannot be returned for hygiene reasons.",
      },
      {
        question: "How do I return an item?",
        answer:
          "To return an item, log into your account, go to 'Orders', select the order containing the item you wish to return, and follow the return instructions. You can also initiate a return from our Returns Portal.",
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Once your return is received and inspected, we will process your refund. This typically takes 3-5 business days. The time it takes for the refund to appear in your account depends on your payment method and financial institution.",
      },
    ],
  },
  {
    name: "Products & Sizing",
    faqs: [
      {
        question: "How do I find the right size?",
        answer:
          "We provide detailed size guides for all our products. You can find the size guide on each product page. If you're between sizes, we generally recommend sizing up for a more comfortable fit.",
      },
      {
        question: "Are your products sustainable?",
        answer:
          "We are committed to sustainability and are continuously working to improve our practices. Many of our products use recycled materials, and we're working towards more sustainable packaging and production methods.",
      },
      {
        question: "How should I care for my UNIQLO clothes?",
        answer:
          "Care instructions are provided on the label of each garment. Generally, we recommend washing in cold water and air drying to extend the life of your clothes and reduce environmental impact.",
      },
    ],
  },
  {
    name: "Account & Payment",
    faqs: [
      {
        question: "How do I create an account?",
        answer:
          "You can create an account by clicking on the 'Account' icon in the top navigation and selecting 'Register'. You'll need to provide your email address and create a password.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "To reset your password, click on 'Account', then 'Sign In', and select 'Forgot Password'. Follow the instructions sent to your email to create a new password.",
      },
    ],
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Orders & Shipping")
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({})

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName)
  }

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }))
  }

  const filteredFaqs = searchQuery
    ? faqCategories
        .map((category) => ({
          ...category,
          faqs: category.faqs.filter(
            (faq) =>
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.faqs.length > 0)
    : faqCategories

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Help & FAQ</h1>

      {/* Search Bar */}
      <GlassCard className="p-6 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <IosInput
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </GlassCard>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <GlassCard className="p-6 text-center">
          <Mail className="h-8 w-8 mx-auto mb-4 text-red-600" />
          <h3 className="text-lg font-semibold mb-2">Email Us</h3>
          <p className="text-gray-600 mb-4">Get a response within 24 hours</p>
          <Link href="/contact">
            <Button variant="ios" className="w-full">
              Send Email
            </Button>
          </Link>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <Phone className="h-8 w-8 mx-auto mb-4 text-red-600" />
          <h3 className="text-lg font-semibold mb-2">Call Us</h3>
          <p className="text-gray-600 mb-4">Mon-Fri, 9am-6pm EST</p>
          <Button variant="ios" className="w-full">
            1-800-123-4567
          </Button>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <MapPin className="h-8 w-8 mx-auto mb-4 text-red-600" />
          <h3 className="text-lg font-semibold mb-2">Find a Store</h3>
          <p className="text-gray-600 mb-4">Visit us in person</p>
          <Link href="/store-locator">
            <Button variant="ios" className="w-full">
              Store Locator
            </Button>
          </Link>
        </GlassCard>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-6">
        {filteredFaqs.map((category) => (
          <GlassCard key={category.name} className="overflow-hidden">
            <button
              className="flex items-center justify-between w-full p-6 text-left"
              onClick={() => toggleCategory(category.name)}
            >
              <h2 className="text-xl font-semibold">{category.name}</h2>
              {expandedCategory === category.name ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedCategory === category.name && (
              <div className="px-6 pb-6">
                <div className="space-y-4">
                  {category.faqs.map((faq, index) => {
                    const questionId = `${category.name}-${index}`
                    return (
                      <div key={questionId} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          className="flex items-center justify-between w-full p-4 text-left bg-white/60 backdrop-blur-sm hover:bg-gray-50"
                          onClick={() => toggleQuestion(questionId)}
                        >
                          <h3 className="font-medium">{faq.question}</h3>
                          {expandedQuestions[questionId] ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                        {expandedQuestions[questionId] && (
                          <div className="p-4 bg-gray-50">
                            <p className="text-gray-700">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </GlassCard>
        ))}
      </div>

      {/* Still Need Help */}
      <GlassCard className="p-8 text-center mt-12">
        <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Can't find what you're looking for? Our customer service team is here to help you with any questions or
          concerns.
        </p>
        <Link href="/contact">
          <Button variant="ios" size="lg">
            Contact Us
          </Button>
        </Link>
      </GlassCard>
    </div>
  )
}

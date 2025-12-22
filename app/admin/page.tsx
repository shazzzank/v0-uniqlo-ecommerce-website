"use client"

import { useState } from "react"
import Image from "next/image"
import {
  BarChart3,
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
} from "lucide-react"

// Mock data
const stats = [
  { title: "Total Revenue", value: "$124,563", change: "+12.5%", icon: TrendingUp },
  { title: "Orders", value: "1,234", change: "+8.2%", icon: ShoppingCart },
  { title: "Products", value: "456", change: "+3.1%", icon: Package },
  { title: "Customers", value: "2,891", change: "+15.3%", icon: Users },
]

const recentOrders = [
  {
    id: "#3102",
    customer: "Sophia Anderson",
    date: "2024-01-15",
    status: "Delivered",
    total: "$89.90",
  },
  {
    id: "#3101",
    customer: "Michael Chen",
    date: "2024-01-15",
    status: "Processing",
    total: "$156.80",
  },
  {
    id: "#3100",
    customer: "Emma Wilson",
    date: "2024-01-14",
    status: "Shipped",
    total: "$234.50",
  },
]

const products = [
  {
    id: 1,
    name: "Ultra Light Down Jacket",
    category: "Outerwear",
    price: 59.9,
    stock: 45,
    status: "Active",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Heattech Crew Neck T-Shirt",
    category: "Basics",
    price: 14.9,
    stock: 128,
    status: "Active",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Smart Ankle Pants",
    category: "Bottoms",
    price: 39.9,
    stock: 0,
    status: "Out of Stock",
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      case "Shipped":
        return "bg-blue-100 text-blue-800"
      case "Active":
        return "bg-green-100 text-green-800"
      case "Out of Stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-red-600">UNIQLO Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                View Store
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-sm p-6">
            <nav className="space-y-2">
              {[
                { id: "dashboard", label: "Dashboard", icon: BarChart3 },
                { id: "products", label: "Products", icon: Package },
                { id: "orders", label: "Orders", icon: ShoppingCart },
                { id: "customers", label: "Customers", icon: Users },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id ? "bg-red-50 text-red-600" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.title} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-sm text-green-600">{stat.change}</p>
                        </div>
                        <stat.icon className="h-8 w-8 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">Recent Orders</h2>
                      <button className="text-red-600 hover:text-red-700 text-sm">View All</button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                  <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Product</span>
                  </button>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      <Download className="h-4 w-4" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={40}
                                height={40}
                                className="rounded-lg object-cover"
                              />
                              <span className="text-sm font-medium text-gray-900">{product.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">${product.price}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{product.stock}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}
                            >
                              {product.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <Download className="h-4 w-4" />
                    <span>Export Orders</span>
                  </button>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.total}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <Edit className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Customers Tab */}
            {activeTab === "customers" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <Download className="h-4 w-4" />
                    <span>Export Customers</span>
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <p className="text-gray-500">Customer management features coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

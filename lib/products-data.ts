export interface Product {
  id: string
  name: string
  price: number
  category: string
  images: string[]
  description: string
  sizes: string[]
  colors: string[]
  inStock: boolean
  featured?: boolean
  rating?: number
  reviews?: number
  features: string[]
}

export const products: Product[] = [
  {
    id: "1",
    name: "Ultra Light Down Jacket",
    price: 79.9,
    category: "Outerwear",
    images: ["/blue-down-jacket.jpg"],
    description:
      "Lightweight and warm down jacket perfect for layering. Features water-repellent finish and compact storage pouch.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Black", "Red", "Gray"],
    inStock: true,
    featured: true,
    rating: 4.5,
    reviews: 234,
    features: ["Water-repellent", "Compact storage pouch"],
  },
  {
    id: "2",
    name: "Supima Cotton T-Shirt",
    price: 14.9,
    category: "Tops",
    images: ["/white-cotton-tshirt.jpg"],
    description: "Premium Supima cotton crew neck t-shirt. Soft, durable, and comfortable for everyday wear.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Navy", "Gray", "Beige"],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 567,
    features: ["Premium Supima cotton", "Soft", "Durable"],
  },
  {
    id: "3",
    name: "Stretch Selvedge Slim-Fit Jeans",
    price: 49.9,
    category: "Bottoms",
    images: ["/dark-blue-jeans.jpg"],
    description: "Classic slim-fit jeans with stretch for comfort. Made with premium selvedge denim.",
    sizes: ["28", "29", "30", "31", "32", "33", "34", "36"],
    colors: ["Dark Blue", "Light Blue", "Black"],
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: 423,
    features: ["Stretch", "Premium selvedge denim"],
  },
  {
    id: "4",
    name: "Cashmere Blend Crew Neck Sweater",
    price: 89.9,
    category: "Tops",
    images: ["/gray-cashmere-sweater.png"],
    description: "Luxuriously soft cashmere blend sweater. Perfect for layering or wearing alone.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Gray", "Navy", "Black", "Camel"],
    inStock: true,
    rating: 4.8,
    reviews: 189,
    features: ["Luxuriously soft", "Cashmere blend"],
  },
  {
    id: "5",
    name: "AIRism UV Protection Long-Sleeve T-Shirt",
    price: 19.9,
    category: "Tops",
    images: ["/black-long-sleeve-shirt.png"],
    description: "Moisture-wicking, quick-drying fabric with UV protection. Ideal for active lifestyles.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Navy", "Gray"],
    inStock: true,
    rating: 4.4,
    reviews: 312,
    features: ["UV protection", "Moisture-wicking", "Quick-drying"],
  },
  {
    id: "6",
    name: "Smart Ankle Pants",
    price: 39.9,
    category: "Bottoms",
    images: ["/navy-ankle-pants.jpg"],
    description: "Versatile ankle-length pants with a modern fit. Machine washable and wrinkle-resistant.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Black", "Beige", "Gray"],
    inStock: true,
    rating: 4.5,
    reviews: 278,
    features: ["Versatile", "Modern fit", "Machine washable", "Wrinkle-resistant"],
  },
  {
    id: "7",
    name: "Flannel Checked Long-Sleeve Shirt",
    price: 29.9,
    category: "Tops",
    images: ["/red-flannel-shirt.jpg"],
    description: "Soft cotton flannel shirt with a classic check pattern. Perfect for casual wear.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Blue", "Green", "Gray"],
    inStock: true,
    rating: 4.3,
    reviews: 156,
    features: ["Soft cotton flannel", "Classic check pattern"],
  },
  {
    id: "8",
    name: "Heattech Extra Warm Crew Neck T-Shirt",
    price: 19.9,
    category: "Innerwear",
    images: ["/black-thermal-shirt.jpg"],
    description:
      "Advanced heat-retention technology keeps you warm in cold weather. Moisture-wicking and odor-resistant.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Gray", "White"],
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: 445,
    features: ["Heat-retention technology", "Moisture-wicking", "Odor-resistant"],
  },
]

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id)
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category)
}

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.featured)
}

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.category.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery),
  )
}

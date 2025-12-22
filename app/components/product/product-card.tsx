import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  colors: number
}

export default function ProductCard({ id, name, price, image, colors }: ProductCardProps) {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-3xl">
        <Link href={`/products/${id}`}>
          <div className="aspect-square relative">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </div>
        </Link>

        <button
          className="absolute top-3 right-3 p-2 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white"
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4" />
        </button>

        {colors > 1 && (
          <div className="absolute bottom-3 left-3 px-2 py-1 text-xs rounded-full bg-white/70 backdrop-blur-sm">
            {colors} colors
          </div>
        )}
      </div>

      <div className="mt-3 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{name}</h3>
          <p className="mt-1 text-sm text-gray-500">${price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

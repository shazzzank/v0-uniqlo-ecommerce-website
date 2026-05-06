'use client'

import Link from 'next/link'
import { AlertTriangle, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/card'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Something went wrong</h1>
        <p className="text-gray-600 mb-2">We encountered an unexpected error. Don&apos;t worry, our team has been notified.</p>
        
        {error.message && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6 text-left">
            <p className="text-sm text-red-700 font-mono">{error.message}</p>
          </div>
        )}

        <div className="space-y-3">
          <Button 
            onClick={reset}
            variant="ios"
            className="w-full"
          >
            Try Again
          </Button>
          
          <Link href="/" className="block">
            <Button 
              variant="secondary"
              className="w-full"
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Home
            </Button>
          </Link>
        </div>

        {error.digest && (
          <p className="text-xs text-gray-400 mt-4">Error ID: {error.digest}</p>
        )}
      </GlassCard>
    </div>
  )
}

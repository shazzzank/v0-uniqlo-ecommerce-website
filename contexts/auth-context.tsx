"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  dateOfBirth?: string
  gender?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("uniqlo-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoaded(true)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      if (user) {
        localStorage.setItem("uniqlo-user", JSON.stringify(user))
      } else {
        localStorage.removeItem("uniqlo-user")
      }
    }
  }, [user, isLoaded])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Get stored users
    const usersJson = localStorage.getItem("uniqlo-users")
    const users = usersJson ? JSON.parse(usersJson) : []

    // Find user
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      return { success: true }
    }

    return { success: false, error: "Invalid email or password" }
  }

  const register = async (
    email: string,
    password: string,
    name: string,
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Get stored users
    const usersJson = localStorage.getItem("uniqlo-users")
    const users = usersJson ? JSON.parse(usersJson) : []

    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return { success: false, error: "Email already registered" }
    }

    // Create new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password,
      name,
    }

    // Save to storage
    users.push(newUser)
    localStorage.setItem("uniqlo-users", JSON.stringify(users))

    // Set current user
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)

    return { success: true }
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)

    // Update in users storage
    const usersJson = localStorage.getItem("uniqlo-users")
    const users = usersJson ? JSON.parse(usersJson) : []
    const updatedUsers = users.map((u: any) => (u.id === user.id ? { ...u, ...updates } : u))
    localStorage.setItem("uniqlo-users", JSON.stringify(updatedUsers))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

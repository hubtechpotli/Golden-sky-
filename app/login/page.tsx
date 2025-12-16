"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn, User, Lock } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Frontend-only login - no validation needed
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4">
      <Card className="w-full max-w-md shadow-2xl border-2">
        <CardHeader className="space-y-3 text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-2">
            <LogIn className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold">Agency Parking Yard</CardTitle>
          <CardDescription className="text-base">Login to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="userId" className="text-sm font-semibold">
                User ID
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter your user ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="#" className="text-sm text-primary hover:underline font-medium">
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="w-full h-12 text-base font-semibold">
              <LogIn className="w-5 h-5 mr-2" />
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, LogIn } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white border-b border-border shadow-sm" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/image.png"
              alt="Golden Sky Logo"
              width={150}
              height={60}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              About Us
            </Link>
            <Link href="/services" className="text-foreground hover:text-primary transition-colors font-medium">
              Services
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact Us
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <SignedOut>
              <SignInButton 
                mode="modal" 
                redirectUrl="/admin"
                forceRedirectUrl="/admin"
                appearance={{
                  elements: {
                    footer: "hidden",
                  },
                }}
              >
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Admin Login
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
              <Link href="/admin">
                <Button variant="ghost" className="text-sm">
                  Admin Panel
                </Button>
              </Link>
            </SignedIn>
            <a href="tel:9709770712">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-white">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground hover:text-primary transition-colors font-medium text-left px-4 py-2"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground hover:text-primary transition-colors font-medium text-left px-4 py-2"
              >
                About Us
              </Link>
              <Link
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground hover:text-primary transition-colors font-medium text-left px-4 py-2"
              >
                Services
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground hover:text-primary transition-colors font-medium text-left px-4 py-2"
              >
                Contact Us
              </Link>
              <SignedOut>
                <div className="px-4" onClick={() => setIsMobileMenuOpen(false)}>
                  <SignInButton 
                    mode="modal" 
                    redirectUrl="/admin"
                    forceRedirectUrl="/admin"
                    appearance={{
                      elements: {
                        footer: "hidden",
                      },
                    }}
                  >
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Admin Login
                    </Button>
                  </SignInButton>
                </div>
              </SignedOut>
              <SignedIn>
                <div className="px-4 space-y-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex justify-center">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                  <Link href="/admin" className="block">
                    <Button variant="ghost" className="w-full text-sm">
                      Admin Panel
                    </Button>
                  </Link>
                </div>
              </SignedIn>
              <a href="tel:9709770712" className="px-4">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Button>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

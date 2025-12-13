"use client"

import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Recover Your Assets?</h2>
          <p className="text-xl mb-12 text-primary-foreground/90">
            Let us help you maximize recovery of outstanding debts and focus on your core business
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:8603331004">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 w-full sm:w-auto">
                <Phone className="w-5 h-5 mr-2" />
                Call: 8603331004
              </Button>
            </a>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

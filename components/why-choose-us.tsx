"use client"

import { CheckCircle2 } from "lucide-react"

const benefits = [
  "Small firm with passion and energy to recover your assets quickly",
  "Years of experience in loan recovery and debt collection",
  "Skilled team capable of connecting with third-party payers directly",
  "No-risk fee structure - you only pay on successful recovery",
  "Ethical and friendly approach maintaining business relationships",
  "Advanced technology for real-time vehicle tracking and updates",
]

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img src="/images/hero-image.png" alt="Professional Team" className="w-full h-full object-cover" />
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Why We Stand Out</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We understand the increasing costs of client acquisition and the pressures of late debt. Our goal is to
              build lasting strategic relationships by recovering outstanding amounts using the most effective methods
              possible.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

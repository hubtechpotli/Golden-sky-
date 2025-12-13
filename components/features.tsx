"use client"

import { Shield, TrendingUp, Users, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"

const features = [
  {
    icon: Shield,
    title: "Trusted & Reliable",
    description:
      "We follow ethical standards in debt collection, protecting your brand value and maintaining confidentiality.",
  },
  {
    icon: TrendingUp,
    title: "Fast Recovery",
    description: "Our systematic approach and dedicated teams ensure quick asset recovery and debt resolution.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Experienced professionals with extensive knowledge in vehicle tracking and loan recovery operations.",
  },
  {
    icon: Zap,
    title: "Technology Driven",
    description: "Advanced mobile application and real-time tracking systems for efficient defaulter tracing.",
  },
]

export function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Why Choose Golden Sky</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional collection and recovery solutions backed by technology and expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

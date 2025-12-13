"use client"

import { Card } from "@/components/ui/card"
import { FileSearch, Target, TrendingUp, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: FileSearch,
    title: "Case Evaluation",
    description: "We carefully study and assess each case, establishing initial communication with defaulters.",
    step: "01",
  },
  {
    icon: Target,
    title: "Strategy Planning",
    description: "Develop a customized recovery strategy based on case specifics and debtor profile.",
    step: "02",
  },
  {
    icon: TrendingUp,
    title: "Active Recovery",
    description: "Execute recovery operations with our trained teams and advanced tracking technology.",
    step: "03",
  },
  {
    icon: CheckCircle,
    title: "Resolution",
    description: "Secure payment and asset recovery while maintaining professional relationships.",
    step: "04",
  },
]

export function Process() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Our Recovery Process</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A systematic, measured approach that delivers results swiftly and cost-effectively
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-24 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-1/2 z-0" />
              )}
              <Card className="p-8 hover:shadow-xl transition-all duration-300 relative z-10 border-2 hover:border-primary/50 bg-card">
                <div className="text-6xl font-bold text-primary/10 mb-4">{step.step}</div>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

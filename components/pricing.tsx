import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Standard Plan",
    price: "₹1,180",
    period: "per month",
    gst: "(₹1,000 + 18% GST)",
    description: "Essential features for small collection teams",
    features: ["Limited feature access", "Basic vehicle tracking", "Monthly database updates", "Email support"],
    highlighted: false,
  },
  {
    name: "Premium Plan",
    price: "₹3,540",
    period: "per month",
    gst: "(₹3,000 + 18% GST)",
    description: "Full features for professional teams",
    features: [
      "All features included",
      "Advanced tracking & GPS",
      "Real-time updates",
      "Priority 24/7 support",
      "Server charges included",
      "Software development access",
    ],
    highlighted: true,
  },
]

export function Pricing() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Application Plans</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the perfect plan for your collection team needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`p-8 ${
                  plan.highlighted ? "border-4 border-primary shadow-2xl scale-105" : "border-2 hover:border-primary/50"
                } transition-all relative`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                    RECOMMENDED
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2 text-foreground">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{plan.gst}</p>
                <p className="text-muted-foreground mb-8">{plan.description}</p>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <Button
                    className={`w-full ${
                      plan.highlighted ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/90"
                    }`}
                    size="lg"
                  >
                    Get Started
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-8 bg-card rounded-2xl border-2 max-w-4xl mx-auto">
            <h4 className="text-xl font-bold mb-4 text-foreground">Registration Requirements:</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Complete KYC verification with original documents</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Application activation link sent to registered email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Monthly billing cycle with secure payment options</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

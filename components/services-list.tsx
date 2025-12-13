import { Card } from "@/components/ui/card"
import { Building2, Users, Smartphone, Shield } from "lucide-react"

const services = [
  {
    icon: Building2,
    title: "Services to Banks/NBFCs",
    description:
      "We collect data of default assets from Banks/NBFCs and trace defaulters with our collection teams at different locations. We trace vehicles and inform banks so they can take legal action as per agreements.",
    features: [
      "Vehicle tracking and tracing services",
      "Defaulter location identification",
      "Legal documentation support",
      "Real-time status updates",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile Application Solution",
    description:
      "Advanced Android application for efficient vehicle tracking and recovery. Updated monthly with defaulter lists from Banks/NBFCs, enabling collection teams to trace vehicles quickly.",
    features: [
      "Real-time vehicle tracking",
      "Updated defaulter database",
      "GPS location services",
      "Instant bank notifications",
    ],
  },
  {
    icon: Users,
    title: "Collection Team Services",
    description:
      "We provide Android Application access to collection teams for efficient vehicle tracing. Monthly charges include server, software development, and all associated services.",
    features: [
      "Premium Plan: Full features at ₹3,540/month",
      "Standard Plan: Limited features at ₹1,180/month",
      "Complete KYC verification process",
      "24/7 technical support",
    ],
  },
  {
    icon: Shield,
    title: "One-off Debt Recovery",
    description:
      "Specialized services for individual debt recovery cases and receivable management. We offer customized solutions tailored to specific organizational requirements.",
    features: [
      "Individual case handling",
      "Receivable management services",
      "Custom recovery strategies",
      "Ethical collection practices",
    ],
  },
]

export function ServicesList() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">What We Offer</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive collection and recovery solutions backed by technology
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-8 border-2 hover:border-primary/50 transition-all hover:shadow-xl">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

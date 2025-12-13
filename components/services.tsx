import { Building2, FileText, TrendingUp, Users, HeadphonesIcon, Briefcase } from "lucide-react"
import { Card } from "@/components/ui/card"

export function Services() {
  const services = [
    {
      icon: Building2,
      title: "Business Administration",
      description: "Comprehensive administration solutions for businesses of all sizes",
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Efficient handling and organization of business documents and records",
    },
    {
      icon: TrendingUp,
      title: "Recovery Services",
      description: "Professional debt recovery and obligation accumulation services",
    },
    {
      icon: Users,
      title: "Client Relations",
      description: "Managing customer relationships with professionalism and care",
    },
    {
      icon: HeadphonesIcon,
      title: "Consultation",
      description: "Expert business consultation and strategic planning services",
    },
    {
      icon: Briefcase,
      title: "Corporate Solutions",
      description: "Tailored solutions for corporate and enterprise clients",
    },
  ]

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Comprehensive business solutions tailored to your needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card
                  key={index}
                  className="group p-8 cursor-pointer transition-all hover:-translate-y-2"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center mb-6 transition-colors">
                    <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

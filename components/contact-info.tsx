import { Card } from "@/components/ui/card"
import { Phone, MapPin, Clock } from "lucide-react"

const contactDetails = [
  {
    icon: Phone,
    title: "Request",
    details: ["+91 8603331004"],
    action: "tel:8603331004",
  },
  {
    icon: Phone,
    title: "Any Enquiries",
    details: ["+91 9709770712", "Prince Raj"],
    action: "tel:9709770712",
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["Dhanbad, Jharkhand", "826001, India"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Saturday: 9:00 AM - 6:00 PM", "Sunday: Closed"],
  },
]

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-4 text-foreground">Get in Touch</h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          We're here to help you with professional collection and recovery solutions. Reach out to us through any of the
          channels below.
        </p>
      </div>

      <div className="space-y-4">
        {contactDetails.map((detail, index) => (
          <Card key={index} className="p-6 border-2 hover:border-primary/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <detail.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{detail.title}</h3>
                {detail.action ? (
                  <div>
                    <a href={detail.action} className="text-muted-foreground hover:text-primary transition-colors">
                      {detail.details[0]}
                    </a>
                    {detail.details.length > 1 && (
                      <p className="text-muted-foreground mt-1">
                        {detail.details.slice(1).join(", ")}
                      </p>
                    )}
                  </div>
                ) : (
                  detail.details.map((line, idx) => (
                    <p key={idx} className="text-muted-foreground">
                      {line}
                    </p>
                  ))
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-8 bg-primary text-primary-foreground border-0">
        <h3 className="text-2xl font-bold mb-4">GST Information</h3>
        <p className="text-primary-foreground/90 text-lg">
          <span className="font-semibold">GST Number:</span> 10QKGPK5121Q1ZS
        </p>
      </Card>

      <div className="relative h-64 rounded-2xl overflow-hidden">
        <img src="/mobile-app-interface-financial.jpg" alt="Office" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

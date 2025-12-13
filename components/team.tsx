import { Card } from "@/components/ui/card"
import { Phone, MapPin } from "lucide-react"

export function Team() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Leadership</h2>
            <p className="text-xl text-muted-foreground">Meet the person driving Golden Sky forward</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-12 text-center border-2 hover:border-primary/50 transition-all">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl font-bold text-primary">PK</span>
              </div>
              <h3 className="text-3xl font-bold mb-2 text-foreground">Prince Kumar</h3>
              <p className="text-xl text-primary mb-8">Director & Founder</p>

              <div className="space-y-4 text-left max-w-md mx-auto">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5 text-primary" />
                  <a href="tel:8603331004" className="hover:text-primary transition-colors">
                    +91 8603331004
                  </a>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Dhanbad, Jharkhand 826001</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

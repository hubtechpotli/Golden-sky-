import { Shield, Lock, Handshake, Zap } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Ethical Standards",
    description:
      "We subscribe to the highest moral standards in debt collection, understanding its impact on ongoing client-debtor relationships.",
  },
  {
    icon: Lock,
    title: "Confidentiality",
    description:
      "We guarantee that all data provided to us remains confidential and offer Non-Disclosure agreements when desired.",
  },
  {
    icon: Handshake,
    title: "Brand Protection",
    description:
      "We protect one of the most critical parts of our clients' business - their brand value and reputation.",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description:
      "Our no-risk fee structure means we only get paid when we successfully recover your outstanding amounts.",
  },
]

export function Values() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Principles that guide our approach to collection and recovery
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex gap-6 p-8 bg-card rounded-2xl border-2 hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

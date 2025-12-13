import { Card } from "@/components/ui/card"
import { Target, Eye, Award } from "lucide-react"

export function Mission() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-foreground">Who We Are</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Golden Sky offers practical, effective, and ethical services appropriate for all sizes of business
                associations. We work to remove the obstacles that stand between our clients and their outstanding
                debts, maximizing recovery through professional methods.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our friendly, convincing, persistent yet professional approach to debt collection delivers better
                results than traditional strong-arm tactics. We understand that debt collection is part of a continuing
                relationship between the client and the debtor.
              </p>
            </div>

            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/professional-business-team-meeting.png"
                alt="Team Meeting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-2 hover:border-primary/50 transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To collect outstanding debts in the shortest time possible while maintaining strong relationships with
                key organizations in selected market segments.
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-primary/50 transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be recognized as the organization of choice regarding performance and results, serving as an
                extension of our clients' business approach.
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-primary/50 transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Our Values</h3>
              <p className="text-muted-foreground leading-relaxed">
                Integrity, honesty, confidentiality, and ethical standards guide everything we do. We protect your brand
                value as our own.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

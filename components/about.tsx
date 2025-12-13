import { Shield, Target, Users, Award } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">About Golden Sky</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your trusted partner for comprehensive business solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Who We Are</h3>
              <p className="text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Golden Sky</span> offers practical, effective and
                professional business administration services appropriate for all sizes of business associations. We
                work to remove obstacles that prevent our customers from achieving extraordinary results.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our purpose is simple yet powerful: to deliver superior obligation accumulation recovery results while
                maintaining the highest standards of professionalism and customer care. We understand that business
                reputation is invaluable, which is why we ensure complete confidentiality and security.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Our Commitment</h3>
              <p className="text-muted-foreground leading-relaxed">
                We buy into the highest ethical standards and understand that trust is the foundation of successful
                business relationships. Your information remains classified and secure at all times.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Being aware of the importance of business image and reputation, we guarantee that we safeguard one of
                the most critical parts of your business - your credibility. We comprehend the significance of
                confidentiality in all our dealings.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-foreground">Trust & Security</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Complete confidentiality and secure handling of all business information
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-foreground">Result-Oriented</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Focused on delivering exceptional results that exceed expectations
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-foreground">Client-Centric</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Personalized approach tailored to your unique business needs
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-foreground">Professional</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Highest standards of professionalism in all our services
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

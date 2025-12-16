import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Team } from "@/components/team"
import { AuthorisedPartners } from "@/components/authorised-partners"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Services />
      <Process />
      <WhyChooseUs />
      <Team />
      <AuthorisedPartners />
      <CTA />
      <Footer />
    </main>
  )
}

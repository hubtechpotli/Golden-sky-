import { Header } from "@/components/header"
import { AboutHero } from "@/components/about-hero"
import { Mission } from "@/components/mission"
import { Values } from "@/components/values"
import { Team } from "@/components/team"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutHero />
      <Mission />
      <Values />
      <Team />
      <Footer />
    </main>
  )
}

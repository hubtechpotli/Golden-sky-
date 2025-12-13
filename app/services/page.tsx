import { Header } from "@/components/header"
import { ServicesHero } from "@/components/services-hero"
import { ServicesList } from "@/components/services-list"
import { Pricing } from "@/components/pricing"
import { Footer } from "@/components/footer"

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ServicesHero />
      <ServicesList />
      <Pricing />
      <Footer />
    </main>
  )
}

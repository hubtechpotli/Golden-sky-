import { Header } from "@/components/header"
import { ContactHero } from "@/components/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContactHero />
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <ContactForm />
        <ContactInfo />
      </div>
      <Footer />
    </main>
  )
}

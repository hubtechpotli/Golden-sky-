"use client"

import { Card } from "@/components/ui/card"
import { Shield } from "lucide-react"

const partnerLogos = [
  {
    name: "Bajaj Finserv",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Bajaj_Finserv_Logo.svg/2560px-Bajaj_Finserv_Logo.svg.png",
  },
  {
    name: "Partner 2",
    logo: "https://img.autocarpro.in/autocarpro/98c26857-e54c-4739-acf7-0c5e3b0c9040_images-_4_.jpg?w=750&h=490&q=75&c=1",
  },
  {
    name: "Partner 3",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1FHQyhypc3cDcvcvHcOXftqLToy_zcU_rhA&s",
  },
  {
    name: "Partner 4",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtBTfAY0syAR8Aryuec1aK8JNofjlICuNSbg&s",
  },
  {
    name: "Partner 5",
    logo: "https://play-lh.googleusercontent.com/UY5DoXlkiiyCta9unTfRYa9db3g7MqoKFr0CFjPu2KXsxAZlx3onzA5xxZmx31CRKuTR",
  },
  {
    name: "Partner 6",
    logo: "https://www.businessremedies.com/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-19-at-9.33.53-PM.jpeg",
  },
  {
    name: "Partner 7",
    logo: "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/post_attachments/wp-content/uploads/2022/09/Bike-bazaar.jpg",
  },
  {
    name: "Partner 8",
    logo: "https://inclusivecapitalism.file.force.com/servlet/servlet.ImageServer?id=015AJ00000098tE&oid=00D3h000003Srjx&lastMod=1678696050000",
  },
  {
    name: "Partner 9",
    logo: "https://www.livelaw.in/h-upload/2019/09/19/364637-hero-fincorp.jpg",
  },
  {
    name: "Partner 10",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXrNvpcYH2_m4E4N6w_RpxSPWhNUyLIBAV5A&s",
  },
]

export function AuthorisedPartners() {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Authorised Partners</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-foreground bg-clip-text">
              Authorised Bank and Finance
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by leading financial institutions and banks across India
            </p>
          </div>

          {/* Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {partnerLogos.map((partner, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 bg-card p-6 flex items-center justify-center aspect-square"
              >
                {/* Gradient Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Logo */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="relative w-full h-full max-w-[120px] max-h-[80px] flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <Card className="inline-block px-8 py-4 border-2 bg-gradient-to-r from-primary/5 to-primary/10">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Golden Sky</span> - Authorised collection agency
                working with leading banks and financial institutions
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}


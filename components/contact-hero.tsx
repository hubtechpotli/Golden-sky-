export function ContactHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary/90 to-primary overflow-hidden">
      <div className="absolute inset-0">
        <img src="/communication-network.jpg" alt="Contact Us" className="w-full h-full object-cover opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6">Say Hello</h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed">
            Let's discuss how we can help you recover your outstanding assets
          </p>
        </div>
      </div>
    </section>
  )
}

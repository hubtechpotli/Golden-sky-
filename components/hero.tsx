"use client"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="w-full h-screen overflow-x-auto snap-x snap-mandatory flex">
        <div className="min-w-full h-full snap-center flex-shrink-0 relative">
          <img
            src="https://images.pexels.com/photos/210990/pexels-photo-210990.jpeg?cs=srgb&dl=pexels-kunitsky-210990.jpg&fm=jpg"
            alt="Business office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="min-w-full h-full snap-center flex-shrink-0 relative">
          <img
            src="https://wallpapers.com/images/hd/accounting-pie-graph-cwjojcbmhkjgqpvz.jpg"
            alt="Accounting charts"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white drop-shadow-2xl tracking-wider mb-4">
            GOLDEN SKY
          </h1>
          <p className="text-xl md:text-3xl text-white/90 drop-shadow-lg font-light">Collection & Recovery Agency</p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-white/60" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <svg
          className="w-6 h-6 text-white/40 animate-bounce-horizontal ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </section>
  )
}

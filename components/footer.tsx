import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Image
                  src="/image.png"
                  alt="Golden Sky Logo"
                  width={150}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-primary-foreground/80 leading-relaxed mb-4">
                Professional collection and recovery solutions for banks, NBFCs, and businesses. Ethical, efficient, and
                technology-driven debt recovery services.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <Link href="/" className="hover:text-primary-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-primary-foreground transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary-foreground transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li className="font-semibold text-primary-foreground">Prince Kumar</li>
                <li>Dhanbad, Jharkhand</li>
                <li>826001, India</li>
                <li>
                  <a href="tel:8603331004" className="hover:text-primary-foreground transition-colors">
                    +91 8603331004
                  </a>
                </li>
                <li className="text-xs pt-2">GST: 10QKGPK5121Q1ZS</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
            <p>© {new Date().getFullYear()} Golden Sky - Collection & Recovery Agency. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

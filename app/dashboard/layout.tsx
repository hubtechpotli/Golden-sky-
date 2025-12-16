import { requireAdmin } from "@/lib/admin"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdmin() // This will redirect if not admin

  return (
    <div className="min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  )
}


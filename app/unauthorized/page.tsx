import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldX } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-32 pb-16 px-4">
        <div className="container max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                <ShieldX className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-3xl mb-2">Access Denied</CardTitle>
              <CardDescription className="text-lg">
                You don't have permission to access this page. This area is restricted to administrators only.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/">
                <Button className="mt-4">
                  Return to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  )
}


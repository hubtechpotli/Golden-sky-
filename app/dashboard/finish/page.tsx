"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, CreditCard, User, FileText, CheckCheck, PartyPopper, Home } from "lucide-react"
import { useRouter } from "next/navigation"

export default function FinishPage() {
  const router = useRouter()

  const steps = [
    { id: 1, title: "Verify Pan Card", icon: CreditCard },
    { id: 2, title: "Profile", icon: User },
    { id: 3, title: "KYC Document", icon: FileText },
    { id: 4, title: "Finish", icon: CheckCheck },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Agency Registration</h1>
          <p className="text-muted-foreground text-lg">Complete your profile to get started</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-1 bg-primary -z-10" />
            {steps.map((step) => {
              const StepIcon = step.icon
              return (
                <div key={step.id} className="flex flex-col items-center gap-2 bg-background px-2">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 bg-primary border-primary text-primary-foreground">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-center max-w-[80px] text-foreground">{step.title}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Success Message */}
        <Card className="shadow-xl border-primary/20">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <PartyPopper className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl mb-2">Registration Complete!</CardTitle>
            <CardDescription className="text-lg">
              Congratulations! Your agency registration has been submitted successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg">What happens next?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Your application will be reviewed by our team within 2-3 business days
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    We will verify all your documents and contact information
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    You will receive an email confirmation once your account is activated
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Our support team will contact you at 9709770712 if any additional information is needed
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-center text-muted-foreground">
                <strong>Reference ID:</strong> GSCA{Math.floor(Math.random() * 1000000)}
                <br />
                Please save this reference number for future correspondence
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={() => router.push("/")} className="flex-1 h-12 text-base font-semibold">
                <Home className="w-5 h-5 mr-2" />
                Return to Home
              </Button>
              <Button onClick={() => window.print()} variant="outline" className="flex-1 h-12 text-base font-semibold">
                Print Confirmation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

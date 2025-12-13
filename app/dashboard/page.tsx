"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, CreditCard, User, FileText, CheckCheck, Info } from "lucide-react"

export default function DashboardPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [panCard, setPanCard] = useState("")
  const router = useRouter()

  const steps = [
    { id: 1, title: "Verify Pan Card", icon: CreditCard },
    { id: 2, title: "Profile", icon: User },
    { id: 3, title: "KYC Document", icon: FileText },
    { id: 4, title: "Finish", icon: CheckCheck },
  ]

  const handleNext = () => {
    if (currentStep === 1) {
      router.push("/dashboard/profile")
    } else if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

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
            <div className="absolute top-5 left-0 right-0 h-1 bg-border -z-10">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
            {steps.map((step) => {
              const StepIcon = step.icon
              return (
                <div key={step.id} className="flex flex-col items-center gap-2 bg-background px-2">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-border text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.id ? <CheckCircle2 className="w-6 h-6" /> : <StepIcon className="w-6 h-6" />}
                  </div>
                  <span
                    className={`text-xs font-medium text-center max-w-[80px] ${
                      currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Verify Your Pan Card</CardTitle>
            <CardDescription>Please enter your PAN card number to proceed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-semibold mb-1">Demo Note</p>
                  <p>
                    Click Continue to see the next page. This is for your reference so you can see how your website is
                    building.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="panCard" className="text-base font-semibold">
                Pan Card No
              </Label>
              <Input
                id="panCard"
                type="text"
                placeholder="Enter PAN Card Number (e.g., CKPPJ4814G)"
                value={panCard}
                onChange={(e) => setPanCard(e.target.value.toUpperCase())}
                className="h-12 text-base"
                maxLength={10}
              />
              <p className="text-xs text-muted-foreground">Format: AAAAA9999A (5 letters, 4 numbers, 1 letter)</p>
            </div>

            <div className="flex gap-4 pt-6">
              <Button onClick={handleNext} className="flex-1 h-12 text-base font-semibold">
                Continue to Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

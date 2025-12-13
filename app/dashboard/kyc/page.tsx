"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CheckCircle2, CreditCard, User, FileText, CheckCheck, Upload, File, Info } from "lucide-react"

export default function KYCPage() {
  const router = useRouter()
  const [files, setFiles] = useState({
    panCard: null as File | null,
    aadhar: null as File | null,
    photo: null as File | null,
    bankProof: null as File | null,
  })

  const handleFileChange = (field: string, file: File | null) => {
    setFiles({ ...files, [field]: file })
  }

  const handleNext = () => {
    router.push("/dashboard/finish")
  }

  const handleBack = () => {
    router.push("/dashboard/profile")
  }

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
            <div className="absolute top-5 left-0 right-0 h-1 bg-border -z-10">
              <div className="h-full bg-primary transition-all duration-500" style={{ width: "66.66%" }} />
            </div>
            {steps.map((step) => {
              const StepIcon = step.icon
              const currentStep = 3
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

        {/* KYC Document Upload */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Upload KYC Documents</CardTitle>
            <CardDescription>Please upload the required documents for verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-semibold mb-1">Demo Note</p>
                  <p>
                    Click Submit Documents to see the final page. This is for your reference so you can see how your
                    website is building.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* PAN Card */}
              <div className="space-y-3">
                <Label htmlFor="panCardUpload" className="text-base font-semibold">
                  PAN Card Copy
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
                  <input
                    id="panCardUpload"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange("panCard", e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <label htmlFor="panCardUpload" className="cursor-pointer flex flex-col items-center gap-2">
                    {files.panCard ? (
                      <>
                        <File className="w-10 h-10 text-primary" />
                        <span className="text-sm text-foreground font-medium">{files.panCard.name}</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Click to upload PAN Card</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Aadhar Card */}
              <div className="space-y-3">
                <Label htmlFor="aadharUpload" className="text-base font-semibold">
                  Aadhar Card Copy
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
                  <input
                    id="aadharUpload"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange("aadhar", e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <label htmlFor="aadharUpload" className="cursor-pointer flex flex-col items-center gap-2">
                    {files.aadhar ? (
                      <>
                        <File className="w-10 h-10 text-primary" />
                        <span className="text-sm text-foreground font-medium">{files.aadhar.name}</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Click to upload Aadhar Card</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Passport Photo */}
              <div className="space-y-3">
                <Label htmlFor="photoUpload" className="text-base font-semibold">
                  Passport Size Photo
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
                  <input
                    id="photoUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange("photo", e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <label htmlFor="photoUpload" className="cursor-pointer flex flex-col items-center gap-2">
                    {files.photo ? (
                      <>
                        <File className="w-10 h-10 text-primary" />
                        <span className="text-sm text-foreground font-medium">{files.photo.name}</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Click to upload Photo</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Bank Proof */}
              <div className="space-y-3">
                <Label htmlFor="bankProofUpload" className="text-base font-semibold">
                  Bank Account Proof
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
                  <input
                    id="bankProofUpload"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange("bankProof", e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <label htmlFor="bankProofUpload" className="cursor-pointer flex flex-col items-center gap-2">
                    {files.bankProof ? (
                      <>
                        <File className="w-10 h-10 text-primary" />
                        <span className="text-sm text-foreground font-medium">{files.bankProof.name}</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Click to upload Bank Proof</span>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> Please ensure all documents are clear and readable. Accepted formats: JPG, PNG,
                PDF. Maximum file size: 5MB per document.
              </p>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 h-12 text-base font-semibold bg-transparent"
              >
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1 h-12 text-base font-semibold">
                Submit Documents
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CheckCircle2, CreditCard, User, FileText, CheckCheck, Upload, File, Info, Loader2, AlertCircle } from "lucide-react"
import { uploadFile, updateAgencyRegistration } from "@/lib/database"

export default function KYCPage() {
  const router = useRouter()
  const [registrationId, setRegistrationId] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({
    panCard: false,
    aadhar: false,
    photo: false,
    bankProof: false,
  })
  const [files, setFiles] = useState({
    panCard: null as File | null,
    aadhar: null as File | null,
    photo: null as File | null,
    bankProof: null as File | null,
  })
  const [uploadedUrls, setUploadedUrls] = useState({
    panCard: "",
    aadhar: "",
    photo: "",
    bankProof: "",
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get registration ID from localStorage
    const id = localStorage.getItem('currentRegistrationId')
    if (id) {
      setRegistrationId(id)
    } else {
      // If no ID, redirect back to profile
      router.push("/dashboard/profile")
    }
  }, [router])

  const handleFileChange = (field: string, file: File | null) => {
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError(`${field} file is too large. Maximum size is 5MB.`)
        return
      }
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf']
      if (!validTypes.includes(file.type)) {
        setError(`${field} file type not supported. Please upload JPG, PNG, or PDF.`)
        return
      }
      setError(null)
    }
    setFiles({ ...files, [field]: file })
  }

  const uploadSingleFile = async (file: File, fieldName: string): Promise<string> => {
    if (!registrationId) throw new Error("Registration ID not found")
    
    const folder = `registrations/${registrationId}`
    const fileName = fieldName
    return await uploadFile(file, folder, fileName)
  }

  const handleNext = async () => {
    if (!registrationId) {
      setError("Registration ID not found. Please go back and complete the profile step.")
      return
    }

    setIsUploading(true)
    setError(null)
    const fileUrls: Record<string, string> = {}

    try {
      // Upload PAN Card
      if (files.panCard) {
        setUploadProgress(prev => ({ ...prev, panCard: true }))
        try {
          const url = await uploadSingleFile(files.panCard, "pan-card")
          fileUrls.pan_card_file = url
          setUploadedUrls(prev => ({ ...prev, panCard: url }))
        } catch (err) {
          console.error("Error uploading PAN card:", err)
          throw new Error("Failed to upload PAN card. Please try again.")
        } finally {
          setUploadProgress(prev => ({ ...prev, panCard: false }))
        }
      }

      // Upload Aadhar Card
      if (files.aadhar) {
        setUploadProgress(prev => ({ ...prev, aadhar: true }))
        try {
          const url = await uploadSingleFile(files.aadhar, "aadhar")
          fileUrls.aadhar_file = url
          setUploadedUrls(prev => ({ ...prev, aadhar: url }))
        } catch (err) {
          console.error("Error uploading Aadhar card:", err)
          throw new Error("Failed to upload Aadhar card. Please try again.")
        } finally {
          setUploadProgress(prev => ({ ...prev, aadhar: false }))
        }
      }

      // Upload Photo
      if (files.photo) {
        setUploadProgress(prev => ({ ...prev, photo: true }))
        try {
          const url = await uploadSingleFile(files.photo, "photo")
          fileUrls.photo_file = url
          setUploadedUrls(prev => ({ ...prev, photo: url }))
        } catch (err) {
          console.error("Error uploading photo:", err)
          throw new Error("Failed to upload photo. Please try again.")
        } finally {
          setUploadProgress(prev => ({ ...prev, photo: false }))
        }
      }

      // Upload Bank Proof
      if (files.bankProof) {
        setUploadProgress(prev => ({ ...prev, bankProof: true }))
        try {
          const url = await uploadSingleFile(files.bankProof, "bank-proof")
          fileUrls.bank_proof_file = url
          setUploadedUrls(prev => ({ ...prev, bankProof: url }))
        } catch (err) {
          console.error("Error uploading bank proof:", err)
          throw new Error("Failed to upload bank proof. Please try again.")
        } finally {
          setUploadProgress(prev => ({ ...prev, bankProof: false }))
        }
      }

      // Update registration with file URLs
      if (Object.keys(fileUrls).length > 0) {
        await updateAgencyRegistration(registrationId, fileUrls)
      }

      // Clear registration ID from localStorage
      localStorage.removeItem('currentRegistrationId')
      
      // Navigate to finish page
      router.push("/dashboard/finish")
    } catch (err: any) {
      console.error("Error uploading files:", err)
      setError(err.message || "Failed to upload documents. Please try again.")
    } finally {
      setIsUploading(false)
    }
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

  const isAnyFileSelected = files.panCard || files.aadhar || files.photo || files.bankProof
  const isUploadingAny = uploadProgress.panCard || uploadProgress.aadhar || uploadProgress.photo || uploadProgress.bankProof

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
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-red-800 dark:text-red-200">
                    <p className="font-semibold mb-1">Error</p>
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-semibold mb-1">Upload Instructions</p>
                  <p>
                    Upload clear, readable documents. Accepted formats: JPG, PNG, PDF. Maximum file size: 5MB per document.
                    You can upload all documents or just the ones you have available.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* PAN Card */}
              <div className="space-y-3">
                <Label htmlFor="panCardUpload" className="text-base font-semibold">
                  PAN Card Copy {files.panCard && <span className="text-green-600">✓</span>}
                </Label>
                <div className={`border-2 border-dashed rounded-lg p-6 hover:border-primary transition-colors cursor-pointer ${
                  uploadProgress.panCard ? "border-primary bg-primary/5" : "border-border"
                }`}>
                  <input
                    id="panCardUpload"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange("panCard", e.target.files?.[0] || null)}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <label htmlFor="panCardUpload" className="cursor-pointer flex flex-col items-center gap-2">
                    {uploadProgress.panCard ? (
                      <>
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        <span className="text-sm text-primary font-medium">Uploading...</span>
                      </>
                    ) : files.panCard ? (
                      <>
                        <File className="w-10 h-10 text-primary" />
                        <span className="text-sm text-foreground font-medium text-center break-words">{files.panCard.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {(files.panCard.size / 1024 / 1024).toFixed(2)} MB
                        </span>
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
                  Aadhar Card Copy {files.aadhar && <span className="text-green-600">✓</span>}
                </Label>
                <div className={`border-2 border-dashed rounded-lg p-6 hover:border-primary transition-colors cursor-pointer ${
                  uploadProgress.aadhar ? "border-primary bg-primary/5" : "border-border"
                }`}>
                  <input
                    id="aadharUpload"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange("aadhar", e.target.files?.[0] || null)}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <label htmlFor="aadharUpload" className="cursor-pointer flex flex-col items-center gap-2">
                    {uploadProgress.aadhar ? (
                      <>
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        <span className="text-sm text-primary font-medium">Uploading...</span>
                      </>
                    ) : files.aadhar ? (
                      <>
                        <File className="w-10 h-10 text-primary" />
                        <span className="text-sm text-foreground font-medium text-center break-words">{files.aadhar.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {(files.aadhar.size / 1024 / 1024).toFixed(2)} MB
                        </span>
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
                  Passport Size Photo {files.photo && <span className="text-green-600">✓</span>}
                </Label>
                <div className={`border-2 border-dashed rounded-lg p-6 hover:border-primary transition-colors cursor-pointer ${
                  uploadProgress.photo ? "border-primary bg-primary/5" : "border-border"
                }`}>
                  <input
                    id="photoUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange("photo", e.target.files?.[0] || null)}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <label htmlFor="photoUpload" className="cursor-pointer flex flex-col items-center gap-2">
                    {uploadProgress.photo ? (
                      <>
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        <span className="text-sm text-primary font-medium">Uploading...</span>
                      </>
                    ) : files.photo ? (
                      <>
                        <File className="w-10 h-10 text-primary" />
                        <span className="text-sm text-foreground font-medium text-center break-words">{files.photo.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {(files.photo.size / 1024 / 1024).toFixed(2)} MB
                        </span>
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
                  Bank Account Proof {files.bankProof && <span className="text-green-600">✓</span>}
                </Label>
                <div className={`border-2 border-dashed rounded-lg p-6 hover:border-primary transition-colors cursor-pointer ${
                  uploadProgress.bankProof ? "border-primary bg-primary/5" : "border-border"
                }`}>
                  <input
                    id="bankProofUpload"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange("bankProof", e.target.files?.[0] || null)}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <label htmlFor="bankProofUpload" className="cursor-pointer flex flex-col items-center gap-2">
                    {uploadProgress.bankProof ? (
                      <>
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        <span className="text-sm text-primary font-medium">Uploading...</span>
                      </>
                    ) : files.bankProof ? (
                      <>
                        <File className="w-10 h-10 text-primary" />
                        <span className="text-sm text-foreground font-medium text-center break-words">{files.bankProof.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {(files.bankProof.size / 1024 / 1024).toFixed(2)} MB
                        </span>
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
                <strong>Note:</strong> Please ensure all documents are clear and readable. Accepted formats: JPG, PNG, PDF.
                Maximum file size: 5MB per document. You can skip documents and upload them later if needed.
              </p>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 h-12 text-base font-semibold bg-transparent"
                disabled={isUploading}
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1 h-12 text-base font-semibold"
                disabled={isUploading || !isAnyFileSelected}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {isUploadingAny ? "Uploading..." : "Saving..."}
                  </>
                ) : (
                  "Submit Documents"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

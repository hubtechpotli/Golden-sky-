"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, CreditCard, User, FileText, CheckCheck, Info } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    panCard: "",
    agentName: "",
    fatherName: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    address: "",
    draNumber: "",
    aadharNumber: "",
    state: "",
    city: "",
    facebook: "",
    instagram: "",
    familyName1: "",
    familyRelation1: "",
    familyMobile1: "",
    familyName2: "",
    familyRelation2: "",
    familyMobile2: "",
    accountName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleNext = () => {
    router.push("/dashboard/kyc")
  }

  const handleBack = () => {
    router.push("/dashboard")
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
              <div className="h-full bg-primary transition-all duration-500" style={{ width: "33.33%" }} />
            </div>
            {steps.map((step) => {
              const StepIcon = step.icon
              const currentStep = 2
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

        {/* Profile Form */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Agent Contact Details Entry Form</CardTitle>
            <CardDescription>Fill in your personal and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-semibold mb-1">Demo Note</p>
                  <p>
                    Click Continue to KYC to see the next page. This is for your reference so you can see how your
                    website is building.
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="panCard">Pan Card No</Label>
                  <Input
                    id="panCard"
                    placeholder="CKPPJ4814G"
                    value={formData.panCard}
                    onChange={(e) => handleChange("panCard", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agentName">Agent Name</Label>
                  <Input
                    id="agentName"
                    placeholder="Enter First & Last Name"
                    value={formData.agentName}
                    onChange={(e) => handleChange("agentName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fatherName">Father's Name</Label>
                  <Input
                    id="fatherName"
                    placeholder="Enter Father's Name"
                    value={formData.fatherName}
                    onChange={(e) => handleChange("fatherName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number (Verify With OTP)</Label>
                  <Input
                    id="mobile"
                    placeholder="Enter 10 Digit Mobile Number"
                    value={formData.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    maxLength={10}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternateMobile">Alternate Number (Verify With OTP)</Label>
                  <Input
                    id="alternateMobile"
                    placeholder="Enter 10 Digit Mobile Number"
                    value={formData.alternateMobile}
                    onChange={(e) => handleChange("alternateMobile", e.target.value)}
                    maxLength={10}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Id (Verify With OTP)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter Valid Email Id"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter Your Full Address With Your City Pin Code"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="draNumber">DRA Number</Label>
                  <Input
                    id="draNumber"
                    placeholder="Enter DRA Number"
                    value={formData.draNumber}
                    onChange={(e) => handleChange("draNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aadharNumber">Aadhar Number</Label>
                  <Input
                    id="aadharNumber"
                    placeholder="Enter Aadhar Number"
                    value={formData.aadharNumber}
                    onChange={(e) => handleChange("aadharNumber", e.target.value)}
                    maxLength={12}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select value={formData.state} onValueChange={(value) => handleChange("state", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jharkhand">Jharkhand</SelectItem>
                      <SelectItem value="bihar">Bihar</SelectItem>
                      <SelectItem value="west-bengal">West Bengal</SelectItem>
                      <SelectItem value="odisha">Odisha</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Enter City"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook Profile Link</Label>
                  <Input
                    id="facebook"
                    placeholder="https://facebook.com/..."
                    value={formData.facebook}
                    onChange={(e) => handleChange("facebook", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram Profile Link</Label>
                  <Input
                    id="instagram"
                    placeholder="https://instagram.com/..."
                    value={formData.instagram}
                    onChange={(e) => handleChange("instagram", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Family Relation Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Agent Family Relation Details</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="familyName1">Family Relation Name-1</Label>
                  <Input
                    id="familyName1"
                    placeholder="Enter Name"
                    value={formData.familyName1}
                    onChange={(e) => handleChange("familyName1", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="familyRelation1">Relation</Label>
                  <Select
                    value={formData.familyRelation1}
                    onValueChange={(value) => handleChange("familyRelation1", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Relation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="father">Father</SelectItem>
                      <SelectItem value="mother">Mother</SelectItem>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="familyMobile1">Mobile Number (Verify With OTP)</Label>
                  <Input
                    id="familyMobile1"
                    placeholder="Enter 10 Digit Mobile Number"
                    value={formData.familyMobile1}
                    onChange={(e) => handleChange("familyMobile1", e.target.value)}
                    maxLength={10}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="familyName2">Family Relation Name-2</Label>
                  <Input
                    id="familyName2"
                    placeholder="Enter Name"
                    value={formData.familyName2}
                    onChange={(e) => handleChange("familyName2", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="familyRelation2">Relation</Label>
                  <Select
                    value={formData.familyRelation2}
                    onValueChange={(value) => handleChange("familyRelation2", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Relation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="father">Father</SelectItem>
                      <SelectItem value="mother">Mother</SelectItem>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="familyMobile2">Mobile Number (Verify With OTP)</Label>
                  <Input
                    id="familyMobile2"
                    placeholder="Enter 10 Digit Mobile Number"
                    value={formData.familyMobile2}
                    onChange={(e) => handleChange("familyMobile2", e.target.value)}
                    maxLength={10}
                  />
                </div>
              </div>
            </div>

            {/* Bank Account Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Agent Bank Account Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Name</Label>
                  <Input
                    id="accountName"
                    placeholder="Enter Name In Bank Account"
                    value={formData.accountName}
                    onChange={(e) => handleChange("accountName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    placeholder="Enter Bank Name"
                    value={formData.bankName}
                    onChange={(e) => handleChange("bankName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Only Saving Bank Account Number"
                    value={formData.accountNumber}
                    onChange={(e) => handleChange("accountNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input
                    id="ifscCode"
                    placeholder="Enter Bank IFSC Code"
                    value={formData.ifscCode}
                    onChange={(e) => handleChange("ifscCode", e.target.value)}
                  />
                </div>
              </div>
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
                Continue to KYC
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

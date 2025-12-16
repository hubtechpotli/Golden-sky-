"use client"

import { useState } from "react"
import { MessageCircle, X, Send, ArrowLeft, Building2, Users, Smartphone, Shield, FileText, TrendingUp, HeadphonesIcon, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { saveWhatsAppInquiry } from "@/lib/database"

const services = [
  {
    icon: Building2,
    title: "Services to Banks/NBFCs",
    shortTitle: "Banks/NBFCs Services",
  },
  {
    icon: Smartphone,
    title: "Mobile Application Solution",
    shortTitle: "Mobile App Solution",
  },
  {
    icon: Users,
    title: "Collection Team Services",
    shortTitle: "Collection Services",
  },
  {
    icon: Shield,
    title: "One-off Debt Recovery",
    shortTitle: "Debt Recovery",
  },
  {
    icon: FileText,
    title: "Document Management",
    shortTitle: "Document Management",
  },
  {
    icon: TrendingUp,
    title: "Recovery Services",
    shortTitle: "Recovery Services",
  },
  {
    icon: HeadphonesIcon,
    title: "Consultation",
    shortTitle: "Consultation",
  },
  {
    icon: Briefcase,
    title: "Corporate Solutions",
    shortTitle: "Corporate Solutions",
  },
]

const WHATSAPP_NUMBER = "918603331004" // Replace with your WhatsApp number (without +)

export function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<"services" | "details">("services")
  const [selectedService, setSelectedService] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  })

  const handleServiceSelect = (serviceTitle: string) => {
    setSelectedService(serviceTitle)
    setStep("details")
    setFormData((prev) => ({
      ...prev,
      message: `Hello, I'm interested in: ${serviceTitle}`,
    }))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSendMessage = async () => {
    const { name, phone, message } = formData
    
    // Save to database
    try {
      await saveWhatsAppInquiry({
        name,
        phone,
        service: selectedService,
        message,
      })
    } catch (error) {
      console.error("Error saving WhatsApp inquiry:", error)
      // Continue even if database save fails
    }

    // Open WhatsApp
    const fullMessage = `*Golden Sky - Collection & Recovery Agency*\n\n*Service:* ${selectedService}\n*Name:* ${name}\n*Phone:* ${phone}\n\n*Message:*\n${message}`
    const encodedMessage = encodeURIComponent(fullMessage)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
    
    window.open(whatsappUrl, "_blank")
    
    // Reset form
    setFormData({ name: "", phone: "", message: "" })
    setSelectedService("")
    setStep("services")
    setIsOpen(false)
  }

  const handleBack = () => {
    if (step === "details") {
      setStep("services")
      setSelectedService("")
    } else {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* WhatsApp Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="Open WhatsApp Chat"
      >
        <MessageCircle className="w-8 h-8 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
      </button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Chat Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Golden Sky</h3>
                <p className="text-xs text-white/80">Collection & Recovery Agency</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto bg-[#ECE5DD] p-4">
            {step === "services" ? (
              <div className="space-y-2">
                <div className="bg-white rounded-lg p-3 shadow-sm mb-4">
                  <p className="text-sm text-gray-700">
                    👋 Hello! Please select a service you're interested in:
                  </p>
                </div>
                <div className="space-y-2">
                  {services.map((service, index) => {
                    const Icon = service.icon
                    return (
                      <button
                        key={index}
                        onClick={() => handleServiceSelect(service.title)}
                        className="w-full bg-white rounded-lg p-3 shadow-sm hover:bg-gray-50 transition-colors text-left flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 bg-[#25D366]/10 rounded-lg flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                          <Icon className="w-5 h-5 text-[#075E54]" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 flex-1">
                          {service.shortTitle}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Selected Service Message */}
                <div className="bg-[#DCF8C6] rounded-lg p-3 shadow-sm ml-auto max-w-[80%]">
                  <p className="text-sm text-gray-800">
                    Selected: <strong>{selectedService}</strong>
                  </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Your Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Additional Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your requirement..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={4}
                      className="w-full resize-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Footer */}
          <div className="bg-white border-t border-gray-200 p-4">
            {step === "details" && (
              <div className="flex items-center gap-2 mb-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              </div>
            )}
            <div className="flex items-center gap-2">
              {step === "details" ? (
                <Button
                  onClick={handleSendMessage}
                  disabled={!formData.name || !formData.phone}
                  className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send to WhatsApp
                </Button>
              ) : (
                <div className="w-full text-center text-xs text-gray-500">
                  Select a service to continue
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}



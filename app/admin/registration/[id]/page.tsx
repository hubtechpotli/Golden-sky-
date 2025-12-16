"use client"

import { useCallback, useMemo, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Building,
  FileText,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Banknote,
  Users as UsersIcon,
  Globe,
  Image as ImageIcon,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useIsAdmin } from "@/lib/admin-client"
import { useUser } from "@clerk/nextjs"
import { useRegistration } from "@/lib/hooks/use-registration"
import { supabase } from "@/lib/supabase"
import { mutate } from "swr"

// Document Preview Component with error handling
function DocumentPreview({ url, title, type }: { url: string; title: string; type: "document" | "photo" }) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  
  // Validate URL
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return (
      <div className="space-y-2">
        <p className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</p>
        <div className="border-2 rounded-lg p-6 bg-muted/50">
          <p className="text-xs sm:text-sm text-center text-muted-foreground">No document uploaded</p>
        </div>
      </div>
    )
  }

  const isImage = url.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  const isPdf = url.match(/\.(pdf)$/i)
  const aspectClass = type === "photo" ? "aspect-square" : "aspect-video"

  return (
    <div className="space-y-2">
      <p className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="border-2 rounded-lg overflow-hidden hover:border-primary transition-colors bg-muted/50">
          {isImage && !imageError ? (
            <div className={`relative ${aspectClass} bg-muted`}>
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
                  <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                </div>
              )}
              <img
                src={url}
                alt={title}
                className={`w-full h-full object-cover ${imageLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
                onLoad={() => setImageLoading(false)}
                onError={(e) => {
                  console.error(`Failed to load image for ${title}:`, url)
                  setImageError(true)
                  setImageLoading(false)
                }}
                loading="lazy"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ) : isPdf || imageError ? (
            <div className="p-6 hover:bg-accent transition-colors">
              <ImageIcon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-xs sm:text-sm text-center text-primary group-hover:underline">
                {isPdf ? "View PDF" : "View Document"}
              </p>
              {imageError && (
                <p className="text-xs text-muted-foreground text-center mt-1">Click to open in new tab</p>
              )}
            </div>
          ) : (
            <div className="p-6 hover:bg-accent transition-colors">
              <ImageIcon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-xs sm:text-sm text-center text-primary group-hover:underline">View Document</p>
            </div>
          )}
        </div>
      </a>
    </div>
  )
}

export default function RegistrationDetailPage() {
  const { user, isLoaded } = useUser()
  const isAdmin = useIsAdmin()
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const { registration, isLoading, mutate: mutateRegistration } = useRegistration(id)

  const updateStatus = useCallback(
    async (newStatus: "approved" | "rejected") => {
      if (!registration) return

      try {
        const { error } = await supabase
          .from("agency_registrations")
          .update({ status: newStatus, updated_at: new Date().toISOString() })
          .eq("id", id)

        if (error) {
          console.error("Error updating status:", error)
          alert("Failed to update status")
        } else {
          // Optimistically update the cache
          mutateRegistration({ ...registration, status: newStatus }, false)
          // Revalidate both the detail and list
          mutate("agency-registrations")
          mutate(`agency-registration-${id}`)
        }
      } catch (error) {
        console.error("Error:", error)
        alert("Failed to update status")
      }
    },
    [registration, id, mutateRegistration]
  )

  const formatDate = useCallback((dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "long",
      timeStyle: "short",
    })
  }, [])

  const getStatusBadge = useCallback((status?: string) => {
    const statusMap = {
      approved: {
        label: "Approved",
        icon: CheckCircle2,
        className: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
      },
      rejected: {
        label: "Rejected",
        icon: XCircle,
        className: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
      },
      pending: {
        label: "Pending",
        icon: Clock,
        className: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
      },
    }
    const statusInfo = statusMap[(status || "pending") as keyof typeof statusMap] || statusMap.pending
    const Icon = statusInfo.icon
    return (
      <Badge variant="outline" className={`${statusInfo.className} gap-1.5 px-3 py-1.5`}>
        <Icon className="w-3.5 h-3.5" />
        {statusInfo.label}
      </Badge>
    )
  }, [])

  if (isLoaded && !isAdmin) {
    router.push("/unauthorized")
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="h-20 md:h-24"></div>
        <div className="container max-w-6xl mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-12 w-32 mb-6" />
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="border-2">
                  <CardHeader>
                    <Skeleton className="h-6 w-48" />
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Skeleton className="h-20" />
                      <Skeleton className="h-20" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="border-2">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!registration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="h-20 md:h-24"></div>
        <div className="flex items-center justify-center px-4 min-h-[calc(100vh-5rem)]">
          <Card className="max-w-md w-full">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">Registration not found</p>
              <Link href="/admin">
                <Button>Back to Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Spacer for fixed header */}
      <div className="h-20"></div>
      <div className="container max-w-6xl mx-auto py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-3 sm:mb-4 md:mb-6">
          <Link href="/admin">
            <Button variant="ghost" className="mb-2 sm:mb-3 gap-2 text-xs sm:text-sm md:text-base p-2 sm:p-3">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-1 sm:mb-2">
                Registration Details
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base">Complete information about this agency registration</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {getStatusBadge(registration.status)}
              {registration.status !== "approved" && (
                <Button
                  onClick={() => updateStatus("approved")}
                  className="bg-green-600 hover:bg-green-700 gap-1.5 sm:gap-2 text-xs sm:text-sm"
                  size="sm"
                >
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Approve</span>
                  <span className="sm:hidden">✓</span>
                </Button>
              )}
              {registration.status !== "rejected" && (
                <Button 
                  onClick={() => updateStatus("rejected")} 
                  variant="destructive" 
                  className="gap-1.5 sm:gap-2 text-xs sm:text-sm"
                  size="sm"
                >
                  <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Reject</span>
                  <span className="sm:hidden">✗</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6">
            {/* Personal Information */}
            <Card className="border-2 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6 pb-2 sm:pb-3">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Agent Name</p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold break-words">{registration.agent_name || "N/A"}</p>
                  </div>
                  {registration.father_name && (
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Father's Name</p>
                      <p className="text-sm sm:text-base md:text-lg break-words">{registration.father_name}</p>
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                      Email
                    </p>
                    <p className="text-sm sm:text-base md:text-lg break-words">{registration.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      Mobile
                    </p>
                    <p className="text-sm sm:text-base md:text-lg">{registration.mobile}</p>
                  </div>
                  {registration.alternate_mobile && (
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Alternate Mobile</p>
                      <p className="text-sm sm:text-base md:text-lg">{registration.alternate_mobile}</p>
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                      <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
                      PAN Card
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-mono">{registration.pan_card}</p>
                  </div>
                  {registration.aadhar_number && (
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Aadhar Number</p>
                      <p className="text-sm sm:text-base md:text-lg font-mono">{registration.aadhar_number}</p>
                    </div>
                  )}
                  {registration.dra_number && (
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">DRA Number</p>
                      <p className="text-sm sm:text-base md:text-lg">{registration.dra_number}</p>
                    </div>
                  )}
                  {registration.address && (
                    <div className="space-y-1 sm:col-span-2">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        Address
                      </p>
                      <p className="text-sm sm:text-base md:text-lg break-words">{registration.address}</p>
                    </div>
                  )}
                  {registration.city && (
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">City</p>
                      <p className="text-sm sm:text-base md:text-lg">{registration.city}</p>
                    </div>
                  )}
                  {registration.state && (
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">State</p>
                      <p className="text-sm sm:text-base md:text-lg">{registration.state}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Family Information */}
            {(registration.family_name_1 || registration.family_name_2) && (
              <Card className="border-2 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                  <CardTitle className="flex items-center gap-2">
                    <UsersIcon className="w-5 h-5" />
                    Family Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {registration.family_name_1 && (
                      <>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Family Member 1 Name</p>
                          <p className="text-lg">{registration.family_name_1}</p>
                        </div>
                        {registration.family_relation_1 && (
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Relation</p>
                            <p className="text-lg">{registration.family_relation_1}</p>
                          </div>
                        )}
                        {registration.family_mobile_1 && (
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Mobile</p>
                            <p className="text-lg">{registration.family_mobile_1}</p>
                          </div>
                        )}
                      </>
                    )}
                    {registration.family_name_2 && (
                      <>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Family Member 2 Name</p>
                          <p className="text-lg">{registration.family_name_2}</p>
                        </div>
                        {registration.family_relation_2 && (
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Relation</p>
                            <p className="text-lg">{registration.family_relation_2}</p>
                          </div>
                        )}
                        {registration.family_mobile_2 && (
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Mobile</p>
                            <p className="text-lg">{registration.family_mobile_2}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Bank Information */}
            {(registration.bank_name || registration.account_number) && (
              <Card className="border-2 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                  <CardTitle className="flex items-center gap-2">
                    <Banknote className="w-5 h-5" />
                    Bank Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {registration.account_name && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Account Name</p>
                        <p className="text-lg">{registration.account_name}</p>
                      </div>
                    )}
                    {registration.bank_name && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                          <Building className="w-4 h-4" />
                          Bank Name
                        </p>
                        <p className="text-lg">{registration.bank_name}</p>
                      </div>
                    )}
                    {registration.account_number && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Account Number</p>
                        <p className="text-lg font-mono">{registration.account_number}</p>
                      </div>
                    )}
                    {registration.ifsc_code && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">IFSC Code</p>
                        <p className="text-lg font-mono">{registration.ifsc_code}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Social Media */}
            {(registration.facebook || registration.instagram) && (
              <Card className="border-2 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Social Media
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {registration.facebook && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Facebook</p>
                        <a
                          href={registration.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg text-primary hover:underline"
                        >
                          {registration.facebook}
                        </a>
                      </div>
                    )}
                    {registration.instagram && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Instagram</p>
                        <a
                          href={registration.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg text-primary hover:underline"
                        >
                          {registration.instagram}
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Documents */}
            {(registration.pan_card_file ||
              registration.aadhar_file ||
              registration.photo_file ||
              registration.bank_proof_file) && (
              <Card className="border-2 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6 pb-2 sm:pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {registration.pan_card_file && (
                      <DocumentPreview
                        url={registration.pan_card_file}
                        title="PAN Card"
                        type="document"
                      />
                    )}
                    {registration.aadhar_file && (
                      <DocumentPreview
                        url={registration.aadhar_file}
                        title="Aadhar Card"
                        type="document"
                      />
                    )}
                    {registration.photo_file && (
                      <DocumentPreview
                        url={registration.photo_file}
                        title="Photo"
                        type="photo"
                      />
                    )}
                    {registration.bank_proof_file && (
                      <DocumentPreview
                        url={registration.bank_proof_file}
                        title="Bank Proof"
                        type="document"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-2 shadow-lg sticky top-6">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                <CardTitle>Registration Info</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Submitted On
                  </p>
                  <p className="text-lg font-semibold">{formatDate(registration.created_at)}</p>
                </div>
                {registration.updated_at && registration.updated_at !== registration.created_at && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Last Updated
                    </p>
                    <p className="text-lg font-semibold">{formatDate(registration.updated_at)}</p>
                  </div>
                )}
                <Separator />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Registration ID</p>
                  <p className="text-sm font-mono text-muted-foreground break-all">{registration.id}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

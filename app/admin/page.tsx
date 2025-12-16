"use client"

import { useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Eye, Calendar, Mail, Phone, CreditCard, ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import { useIsAdmin } from "@/lib/admin-client"
import { useUser } from "@clerk/nextjs"
import { useRegistrations } from "@/lib/hooks/use-registrations"
import { RegistrationListSkeleton } from "@/components/admin/registration-skeleton"
import { StatsSkeleton } from "@/components/admin/stats-skeleton"
import { useSWRConfig } from "swr"
import { supabase } from "@/lib/supabase"

interface AgencyRegistration {
  id: string
  pan_card: string
  agent_name: string
  email: string
  mobile: string
  status: string
  created_at: string
}

export default function AdminDashboard() {
  const { user, isLoaded } = useUser()
  const isAdmin = useIsAdmin()
  const router = useRouter()
  const { registrations, isLoading } = useRegistrations()
  const { mutate: globalMutate } = useSWRConfig()

  // Memoize computed values
  const stats = useMemo(() => {
    const pendingCount = registrations.filter((r) => r.status === "pending" || !r.status).length
    const approvedCount = registrations.filter((r) => r.status === "approved").length
    const rejectedCount = registrations.filter((r) => r.status === "rejected").length
    return { pendingCount, approvedCount, rejectedCount }
  }, [registrations])

  // Memoize formatDate function
  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    })
  }, [])

  // Memoize status badge
  const getStatusBadge = useCallback((status: string) => {
    const statusMap = {
      approved: { label: "Approved", className: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20" },
      rejected: { label: "Rejected", className: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20" },
      pending: { label: "Pending", className: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20" },
    }
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending
    return (
      <Badge variant="outline" className={statusInfo.className}>
        {statusInfo.label}
      </Badge>
    )
  }, [])

  // Prefetch registration details on hover
  const handleLinkHover = useCallback((id: string) => {
    globalMutate(`agency-registration-${id}`, async () => {
      const { data } = await supabase
        .from("agency_registrations")
        .select("*")
        .eq("id", id)
        .single()
      return data
    }, false) // false = don't revalidate, just prefetch
  }, [globalMutate])

  if (isLoaded && !isAdmin) {
    router.push("/unauthorized")
    return null
  }

  return (
    <>
      {/* Spacer for fixed header - ensures content starts below header */}
      <div className="h-20 w-full block"></div>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 -mt-20">
        <div className="container max-w-7xl mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Header Section - Always Visible */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  View and manage all agency registrations
                </p>
              </div>
              <div className="flex items-center w-full sm:w-auto">
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button size="default" className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl w-full sm:w-auto text-sm sm:text-base">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">New Registration</span>
                    <span className="sm:hidden">New</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        {/* Stats Cards */}
        {isLoading ? (
          <StatsSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6 md:mb-8">
            <Card className="border-2 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-1 sm:pb-2 px-2 sm:px-3 md:px-4 pt-2 sm:pt-3 md:pt-4">
                <CardTitle className="text-[10px] xs:text-xs sm:text-sm font-medium text-muted-foreground leading-tight">Total</CardTitle>
                <Users className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
              </CardHeader>
              <CardContent className="px-2 sm:px-3 md:px-4 pb-2 sm:pb-3 md:pb-4">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">{registrations.length}</div>
                <p className="text-[10px] xs:text-xs text-muted-foreground mt-0.5 sm:mt-1 leading-tight">All time</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-950/20 dark:to-yellow-900/10 border-yellow-200 dark:border-yellow-900">
              <CardHeader className="flex flex-row items-center justify-between pb-1 sm:pb-2 px-2 sm:px-3 md:px-4 pt-2 sm:pt-3 md:pt-4">
                <CardTitle className="text-[10px] xs:text-xs sm:text-sm font-medium text-muted-foreground leading-tight">Pending</CardTitle>
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              </CardHeader>
              <CardContent className="px-2 sm:px-3 md:px-4 pb-2 sm:pb-3 md:pb-4">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pendingCount}</div>
                <p className="text-[10px] xs:text-xs text-muted-foreground mt-0.5 sm:mt-1 leading-tight">Awaiting</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10 border-green-200 dark:border-green-900">
              <CardHeader className="flex flex-row items-center justify-between pb-1 sm:pb-2 px-2 sm:px-3 md:px-4 pt-2 sm:pt-3 md:pt-4">
                <CardTitle className="text-[10px] xs:text-xs sm:text-sm font-medium text-muted-foreground leading-tight">Approved</CardTitle>
                <Users className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
              </CardHeader>
              <CardContent className="px-2 sm:px-3 md:px-4 pb-2 sm:pb-3 md:pb-4">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">{stats.approvedCount}</div>
                <p className="text-[10px] xs:text-xs text-muted-foreground mt-0.5 sm:mt-1 leading-tight">Approved</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-red-900/10 border-red-200 dark:border-red-900">
              <CardHeader className="flex flex-row items-center justify-between pb-1 sm:pb-2 px-2 sm:px-3 md:px-4 pt-2 sm:pt-3 md:pt-4">
                <CardTitle className="text-[10px] xs:text-xs sm:text-sm font-medium text-muted-foreground leading-tight">Rejected</CardTitle>
                <Users className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              </CardHeader>
              <CardContent className="px-2 sm:px-3 md:px-4 pb-2 sm:pb-3 md:pb-4">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400">{stats.rejectedCount}</div>
                <p className="text-[10px] xs:text-xs text-muted-foreground mt-0.5 sm:mt-1 leading-tight">Rejected</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Registrations List */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-primary/10 px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6 pb-3 sm:pb-4">
            <div className="flex flex-col gap-2 sm:gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">Agency Registrations</CardTitle>
                  <CardDescription className="mt-1 text-xs sm:text-sm">All agency registration submissions</CardDescription>
                </div>
                {!isLoading && (
                  <Badge variant="secondary" className="text-[10px] xs:text-xs sm:text-sm px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 flex-shrink-0">
                    {registrations.length}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            {isLoading ? (
              <RegistrationListSkeleton />
            ) : registrations.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No registrations yet</h3>
                <p className="text-muted-foreground mb-4">New agency registrations will appear here</p>
                <Link href="/dashboard">
                  <Button>Go to Registration Form</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {registrations.map((reg) => (
                  <Card
                    key={reg.id}
                    className="group hover:shadow-md transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-r from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50"
                  >
                    <CardContent className="p-3 sm:p-4 md:p-6">
                      <div className="flex flex-col gap-3 sm:gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground flex-1 min-w-0 break-words">{reg.agent_name || "N/A"}</h3>
                              <div className="flex-shrink-0">
                                {getStatusBadge(reg.status || "pending")}
                              </div>
                            </div>
                            <div className="flex flex-col gap-1.5 sm:gap-2 text-[11px] xs:text-xs sm:text-sm text-muted-foreground">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="font-medium">PAN:</span>
                                <span className="truncate">{reg.pan_card}</span>
                              </div>
                              <div className="flex items-center gap-1.5 min-w-0">
                                <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="truncate">{reg.email}</span>
                              </div>
                              <div className="flex items-center gap-1.5 min-w-0">
                                <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="truncate">{reg.mobile}</span>
                              </div>
                              <div className="flex items-center gap-1.5 min-w-0">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="truncate text-[10px] xs:text-xs">{formatDate(reg.created_at)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center w-full">
                          <Link
                            href={`/admin/registration/${reg.id}`}
                            className="w-full"
                            onMouseEnter={() => handleLinkHover(reg.id)}
                            prefetch={true}
                          >
                            <Button
                              variant="default"
                              size="sm"
                              className="gap-2 shadow-md hover:shadow-lg transition-shadow w-full text-xs sm:text-sm"
                            >
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">View Details</span>
                              <span className="sm:hidden">View</span>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        </div>
      </div>
    </>
  )
}

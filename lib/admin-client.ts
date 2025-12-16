"use client"

import { useUser } from "@clerk/nextjs"

// List of admin email addresses (must match server-side list)
const ADMIN_EMAILS = [
  "ravijha110903@gmail.com", // Add your admin email here
  "rajabhi63565@gmail.com", // Add your admin email here
  // Add more admin emails as needed
]

export function useIsAdmin() {
  const { user, isLoaded } = useUser()

  if (!isLoaded || !user) {
    return false
  }

  const userEmail = user.emailAddresses[0]?.emailAddress || ""
  return ADMIN_EMAILS.includes(userEmail)
}


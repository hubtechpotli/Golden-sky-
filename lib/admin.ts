import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

// List of admin email addresses (you can also use Clerk roles/organizations)
const ADMIN_EMAILS = [
  "ravijha110903@gmail.com", // Add your admin email here
  // Add more admin emails as needed
]

export async function requireAdmin() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect("/sign-in?redirect_url=/admin")
  }

  const user = await currentUser()
  
  if (!user) {
    redirect("/sign-in?redirect_url=/admin")
  }

  // Check if user is admin by email
  const isAdmin = ADMIN_EMAILS.includes(user.emailAddresses[0]?.emailAddress || "")
  
  if (!isAdmin) {
    redirect("/unauthorized")
  }

  return { user, userId }
}

export async function isAdminUser() {
  try {
    const { userId } = await auth()
    if (!userId) return false

    const user = await currentUser()
    if (!user) return false

    return ADMIN_EMAILS.includes(user.emailAddresses[0]?.emailAddress || "")
  } catch {
    return false
  }
}


import { supabase } from './supabase'
import type { ContactFormData, AgencyRegistration, WhatsAppInquiry } from './database.types'

// Contact Form Functions
export async function saveContactForm(data: ContactFormData) {
  const { data: result, error } = await supabase
    .from('contact_forms')
    .insert([data])
    .select()
    .single()

  if (error) {
    console.error('Error saving contact form:', error)
    throw error
  }

  return result
}

// Agency Registration Functions
export async function saveAgencyRegistration(data: AgencyRegistration) {
  const { data: result, error } = await supabase
    .from('agency_registrations')
    .insert([data])
    .select()
    .single()

  if (error) {
    console.error('Error saving agency registration:', error)
    throw error
  }

  return result
}

export async function updateAgencyRegistration(id: string, data: Partial<AgencyRegistration>) {
  const { data: result, error } = await supabase
    .from('agency_registrations')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating agency registration:', error)
    throw error
  }

  return result
}

export async function getAgencyRegistration(id: string) {
  const { data, error } = await supabase
    .from('agency_registrations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching agency registration:', error)
    throw error
  }

  return data
}

// WhatsApp Inquiry Functions
export async function saveWhatsAppInquiry(data: WhatsAppInquiry) {
  const { data: result, error } = await supabase
    .from('whatsapp_inquiries')
    .insert([data])
    .select()
    .single()

  if (error) {
    console.error('Error saving WhatsApp inquiry:', error)
    throw error
  }

  return result
}

// File Upload Functions
export async function uploadFile(file: File, folder: string, fileName: string) {
  const fileExt = file.name.split('.').pop()
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9-_]/g, '_')
  const filePath = `${folder}/${sanitizedFileName}-${Date.now()}.${fileExt}`

  // Upload file to Supabase storage
  const { data, error } = await supabase.storage
    .from('documents')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || 'application/octet-stream'
    })

  if (error) {
    console.error('Error uploading file:', error)
    throw error
  }

  // Get public URL (works even for private buckets, but requires proper RLS policies)
  const { data: { publicUrl } } = supabase.storage
    .from('documents')
    .getPublicUrl(data.path)

  return publicUrl
}


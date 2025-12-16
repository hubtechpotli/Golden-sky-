// Database types for Supabase tables

export interface ContactFormData {
  id?: string
  name: string
  email: string
  phone: string
  message: string
  created_at?: string
}

export interface AgencyRegistration {
  id?: string
  pan_card: string
  agent_name: string
  father_name?: string
  mobile: string
  alternate_mobile?: string
  email: string
  address?: string
  dra_number?: string
  aadhar_number?: string
  state?: string
  city?: string
  facebook?: string
  instagram?: string
  family_name_1?: string
  family_relation_1?: string
  family_mobile_1?: string
  family_name_2?: string
  family_relation_2?: string
  family_mobile_2?: string
  account_name?: string
  bank_name?: string
  account_number?: string
  ifsc_code?: string
  pan_card_file?: string
  aadhar_file?: string
  photo_file?: string
  bank_proof_file?: string
  status?: 'pending' | 'approved' | 'rejected'
  created_at?: string
  updated_at?: string
}

export interface WhatsAppInquiry {
  id?: string
  name: string
  phone: string
  service: string
  message: string
  created_at?: string
}


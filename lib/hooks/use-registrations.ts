import useSWR from 'swr'
import { supabase } from '@/lib/supabase'
import type { AgencyRegistration } from '@/lib/database.types'

const fetcher = async (): Promise<AgencyRegistration[]> => {
  const { data, error } = await supabase
    .from('agency_registrations')
    .select('id, pan_card, agent_name, email, mobile, status, created_at')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export function useRegistrations() {
  const { data, error, isLoading, mutate } = useSWR<AgencyRegistration[]>(
    'agency-registrations',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 5000, // Dedupe requests within 5 seconds
      refreshInterval: 0, // Disable auto-refresh
      keepPreviousData: true, // Keep previous data while fetching
    }
  )

  return {
    registrations: data || [],
    isLoading,
    isError: error,
    mutate,
  }
}


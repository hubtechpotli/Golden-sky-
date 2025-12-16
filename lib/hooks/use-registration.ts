import useSWR from 'swr'
import { supabase } from '@/lib/supabase'
import type { AgencyRegistration } from '@/lib/database.types'

const fetcher = async (id: string): Promise<AgencyRegistration> => {
  const { data, error } = await supabase
    .from('agency_registrations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export function useRegistration(id: string | undefined) {
  const { data, error, isLoading, mutate } = useSWR<AgencyRegistration>(
    id ? `agency-registration-${id}` : null,
    () => fetcher(id!),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 10000,
      keepPreviousData: true,
    }
  )

  return {
    registration: data,
    isLoading,
    isError: error,
    mutate,
  }
}


import { SupabaseClient, createClient } from '@supabase/supabase-js'

const supabaseUrl: string = process.env.VITE_SUPABASE_URL || ''
const supabaseKey: string = process.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and key are required')
}

let supabase: SupabaseClient

try {
  supabase = createClient(supabaseUrl, supabaseKey)
} catch (error) {
  throw new Error('Cannot create Supabase client')
}

export default supabase

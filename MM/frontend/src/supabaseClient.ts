import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'project_url' // Paste your Project URL here
const supabaseAnonKey = 'anom-key' // Paste your anon key here

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

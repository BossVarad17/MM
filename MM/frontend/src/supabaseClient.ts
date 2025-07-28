import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oaphmhwtcnpjxoezkorv.supabase.co' // Paste your Project URL here
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hcGhtaHd0Y25wanhvZXprb3J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MTgyNzIsImV4cCI6MjA2OTI5NDI3Mn0.tkAj5pQcIWVAOATDDf6YsPG6aSJVxX4sPFonzbEUm_A' // Paste your anon key here

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

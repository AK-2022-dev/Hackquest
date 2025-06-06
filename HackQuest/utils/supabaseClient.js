// utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dkukgjisafbtgluplyek.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrdWtnamlzYWZidGdsdXBseWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMjk3OTgsImV4cCI6MjA2NDgwNTc5OH0.Uf9TxDcJtdB13InatFKT4ntg906Xw93bacDLhWIYnYU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { writable } from 'svelte/store'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// @ts-ignore
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const user = writable(supabase.auth.user())
supabase.auth.onAuthStateChange((_, { user: newuser }) => {
  user.set(newuser)
})

export { user, supabase }

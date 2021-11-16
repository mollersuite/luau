import { writable } from 'svelte/store'
import { createClient } from '@supabase/supabase-js'
import { browser } from '$app/env'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// @ts-ignore
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  fetch: fetch.bind(globalThis)
})

const user = writable(browser ? supabase.auth.user() : undefined)
supabase?.auth?.onAuthStateChange((_, { user: newuser }) => {
  user.set(newuser)
})

export { user, supabase }

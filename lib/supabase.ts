import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client (singleton pattern)
let supabaseInstance: ReturnType<typeof createClient> | null = null

// Local storage keys for fallback
const OFFLINE_QUOTES_KEY = "offline_quote_submissions"
const OFFLINE_CONTACTS_KEY = "offline_contact_submissions"
const OFFLINE_CLICKS_KEY = "offline_button_clicks"

// Update the getSupabaseClient function with better error handling and validation
export const getSupabaseClient = () => {
  if (supabaseInstance) return supabaseInstance

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Validate URL and key
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Supabase credentials not available")
      return null
    }

    // Validate URL format
    try {
      new URL(supabaseUrl)
    } catch (e) {
      console.error("Invalid Supabase URL format:", supabaseUrl)
      return null
    }

    // Create client with explicit options
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      global: {
        fetch: fetch.bind(globalThis),
      },
    })

    return supabaseInstance
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error)
    return null
  }
}

// Helper function to store data locally when offline
const storeOfflineData = (key: string, data: any) => {
  if (typeof window === "undefined") return

  try {
    const existingData = localStorage.getItem(key)
    const dataArray = existingData ? JSON.parse(existingData) : []
    dataArray.push({
      ...data,
      offline_created_at: new Date().toISOString(),
    })
    localStorage.setItem(key, JSON.stringify(dataArray))
    console.log(`Stored data offline in ${key}`)
    return true
  } catch (error) {
    console.error(`Failed to store offline data in ${key}:`, error)
    return false
  }
}

// Update the trackButtonClick function with better error handling
export const trackButtonClick = async (buttonName: string) => {
  const clickData = {
    button_name: buttonName,
    page_url: typeof window !== "undefined" ? window.location.pathname : "",
    user_session_id: Math.random().toString(36).substring(2, 15),
    created_at: new Date().toISOString(),
  }

  // Try to get Supabase client
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.log("Supabase client not available, storing click offline:", buttonName)
    storeOfflineData(OFFLINE_CLICKS_KEY, clickData)
    return
  }

  try {
    // Create a promise that will timeout after 3 seconds
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Request timeout")), 3000)
    })

    // Create the tracking request
    const trackingPromise = supabase.from("button_clicks").insert([clickData])

    // Race between the tracking request and timeout
    await Promise.race([trackingPromise, timeoutPromise])
  } catch (error: any) {
    // Store offline if request fails
    console.log(`Button tracking failed for "${buttonName}":`, error.message || error)
    storeOfflineData(OFFLINE_CLICKS_KEY, clickData)
  }
}

// Update the submitQuoteRequest function with offline support
export const submitQuoteRequest = async (quoteData: any) => {
  // Add timestamp if not present
  const dataToSubmit = {
    ...quoteData,
    created_at: quoteData.created_at || new Date().toISOString(),
  }

  // Try to get Supabase client
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.log("Supabase client not available, storing quote offline")
    const stored = storeOfflineData(OFFLINE_QUOTES_KEY, dataToSubmit)
    return { success: true, simulated: true, offline: true }
  }

  try {
    // Use a timeout to prevent long-running requests
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    // Create the submission request with fetch options
    const { error } = await supabase.from("quote_submissions").insert([dataToSubmit]).abortSignal(controller.signal)

    clearTimeout(timeoutId)

    if (error) {
      console.error("Error submitting quote:", error)
      storeOfflineData(OFFLINE_QUOTES_KEY, dataToSubmit)
      return { success: true, offline: true, error }
    }

    return { success: true }
  } catch (error: any) {
    // Store offline if request fails
    console.error("Quote submission failed:", error.message || error)
    storeOfflineData(OFFLINE_QUOTES_KEY, dataToSubmit)
    return { success: true, offline: true, error: error.message || "Network error" }
  }
}

// Update the submitContactForm function with offline support
export const submitContactForm = async (contactData: any) => {
  // Add timestamp if not present
  const dataToSubmit = {
    ...contactData,
    created_at: contactData.created_at || new Date().toISOString(),
  }

  // Try to get Supabase client
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.log("Supabase client not available, storing contact form offline")
    const stored = storeOfflineData(OFFLINE_CONTACTS_KEY, dataToSubmit)
    return { success: true, simulated: true, offline: true }
  }

  try {
    // Use a timeout to prevent long-running requests
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    // Create the submission request with fetch options
    const { error } = await supabase.from("contact_submissions").insert([dataToSubmit]).abortSignal(controller.signal)

    clearTimeout(timeoutId)

    if (error) {
      console.error("Error submitting contact form:", error)
      storeOfflineData(OFFLINE_CONTACTS_KEY, dataToSubmit)
      return { success: true, offline: true, error }
    }

    return { success: true }
  } catch (error: any) {
    // Store offline if request fails
    console.error("Contact form submission failed:", error.message || error)
    storeOfflineData(OFFLINE_CONTACTS_KEY, dataToSubmit)
    return { success: true, offline: true, error: error.message || "Network error" }
  }
}

// Function to test Supabase connection
export const testSupabaseConnection = async () => {
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.error("⚠️ Supabase client not available")
    return {
      success: false,
      error: "Client initialization failed",
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing",
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ? "Set (length: " + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length + ")"
        : "Missing",
    }
  }

  try {
    // Simple ping query
    const { data, error } = await supabase.rpc("get_service_status")

    if (error) {
      console.error("❌ Supabase connection test failed:", error)
      return { success: false, error }
    }

    console.log("✅ Supabase connection successful!")
    return { success: true, data }
  } catch (error) {
    console.error("❌ Supabase connection test failed:", error)
    return { success: false, error }
  }
}

// Function to sync offline data when connection is restored
export const syncOfflineData = async () => {
  if (typeof window === "undefined") return { success: false, reason: "Not in browser environment" }

  const supabase = getSupabaseClient()
  if (!supabase) return { success: false, reason: "Supabase client not available" }

  const results = {
    clicks: { synced: 0, failed: 0 },
    quotes: { synced: 0, failed: 0 },
    contacts: { synced: 0, failed: 0 },
  }

  // Sync button clicks
  try {
    const offlineClicks = localStorage.getItem(OFFLINE_CLICKS_KEY)
    if (offlineClicks) {
      const clicks = JSON.parse(offlineClicks)
      if (clicks.length > 0) {
        const { error } = await supabase.from("button_clicks").insert(clicks)
        if (!error) {
          localStorage.removeItem(OFFLINE_CLICKS_KEY)
          results.clicks.synced = clicks.length
        } else {
          results.clicks.failed = clicks.length
        }
      }
    }
  } catch (e) {
    console.error("Failed to sync offline clicks:", e)
    results.clicks.failed = -1
  }

  // Sync quotes
  try {
    const offlineQuotes = localStorage.getItem(OFFLINE_QUOTES_KEY)
    if (offlineQuotes) {
      const quotes = JSON.parse(offlineQuotes)
      if (quotes.length > 0) {
        const { error } = await supabase.from("quote_submissions").insert(quotes)
        if (!error) {
          localStorage.removeItem(OFFLINE_QUOTES_KEY)
          results.quotes.synced = quotes.length
        } else {
          results.quotes.failed = quotes.length
        }
      }
    }
  } catch (e) {
    console.error("Failed to sync offline quotes:", e)
    results.quotes.failed = -1
  }

  // Sync contacts
  try {
    const offlineContacts = localStorage.getItem(OFFLINE_CONTACTS_KEY)
    if (offlineContacts) {
      const contacts = JSON.parse(offlineContacts)
      if (contacts.length > 0) {
        const { error } = await supabase.from("contact_submissions").insert(contacts)
        if (!error) {
          localStorage.removeItem(OFFLINE_CONTACTS_KEY)
          results.contacts.synced = contacts.length
        } else {
          results.contacts.failed = contacts.length
        }
      }
    }
  } catch (e) {
    console.error("Failed to sync offline contacts:", e)
    results.contacts.failed = -1
  }

  return {
    success: true,
    results,
  }
}

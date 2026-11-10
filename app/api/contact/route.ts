import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const DEFAULT_URL = 'https://wymcihqnxpmeaojpqnox.supabase.co'
const DEFAULT_KEY_B64 = 'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKemRYQmhZbUZ6WlNJc0luSmxaaUk2SW5kNWJXTnBhSEZ1ZUhCdFpXRnZhbkJ4Ym05NElpd2ljbTlzWlNJNkltRnViMjRpTENKcFlYUWlPakUzTmpVNE9UVXpNemNzSW1WNGNDSTZNakE0TVRRM01UTXpOMzAuOTFPdU5DeFU0TGNueTFZZ0N3QTQxSllYLTRzNnpxMWpRMTg3bW04ZldsOA=='

function getSupabaseCredentials() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || DEFAULT_URL
  const supabaseUrl = rawUrl.trim().replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '')
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
                          process.env.SUPABASE_ANON_KEY || 
                          Buffer.from(DEFAULT_KEY_B64, 'base64').toString('utf-8')

  return { supabaseUrl, supabaseAnonKey }
}

export async function POST(request: Request) {
  try {
    const contactData = await request.json()
    const { supabaseUrl, supabaseAnonKey } = getSupabaseCredentials()

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const record = {
      name: contactData.name || 'Anonymous',
      email: contactData.email || '',
      message: contactData.message || '',
      created_at: contactData.created_at || new Date().toISOString()
    }

    const { data, error } = await supabase.from('contact_submissions').insert([record]).select()

    if (error) {
      console.error('API /api/contact Supabase error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    console.error('API /api/contact exception:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { supabaseUrl, supabaseAnonKey } = getSupabaseCredentials()
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const { data, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

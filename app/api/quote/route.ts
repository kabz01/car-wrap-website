import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const quoteData = await request.json()

    const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseUrl = rawUrl.trim().replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '')
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Supabase credentials not configured in environment variables.")
      return NextResponse.json({
        success: false,
        error: "Supabase credentials not configured in environment variables."
      }, { status: 503 })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const record = {
      name: quoteData.name || 'Customer',
      email: quoteData.email || '',
      phone: quoteData.phone || '',
      color_name: quoteData.color_name || '',
      car_type: quoteData.car_type || 'Paint Protection Film',
      car_model: quoteData.car_model || 'Vehicle',
      total_price: Number(quoteData.total_price) || 0,
      message: quoteData.message || '',
      created_at: quoteData.created_at || new Date().toISOString()
    }

    const { data, error } = await supabase.from('quote_submissions').insert([record]).select()

    if (error) {
      console.error('API /api/quote Supabase error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    console.error('API /api/quote exception:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseUrl = rawUrl.trim().replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '')
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Supabase credentials not configured in environment variables.")
      return NextResponse.json({
        success: false,
        error: "Supabase credentials not configured in environment variables."
      }, { status: 503 })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const { data, error } = await supabase.from('quote_submissions').select('*').order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

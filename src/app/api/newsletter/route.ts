import { NextRequest, NextResponse } from 'next/server'
import { supabaseServiceRole } from '../../../../lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const token = request.headers.get('x-mg')
    
    if (token !== 'JP1tQEcZqamQ5z0jXHFqlaapMw4jjZekVGkDC0GvAZHpoS9bea23GopvjwRRUweu') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 410 }
      )
    }

    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServiceRole
      .from('newsletter')
      .insert([{ 
        email: body.email, 
        subscribed_from: "kongres.misterogrande.pl" 
      }])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      )
    }

    return NextResponse.json({ response: data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

const CULQI_SECRET_KEY = process.env.CULQI_SECRET_KEY || 'sk_test_5daf52c2c1b85891'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { token, amount, email, description } = await request.json()

    if (!token || !amount) {
      return NextResponse.json(
        { error: 'Token y monto son requeridos' },
        { status: 400 }
      )
    }

    // Create charge in Culqi
    const response = await fetch('https://api.culqi.com/v2/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CULQI_SECRET_KEY}`,
      },
      body: JSON.stringify({
        amount, // In cents (e.g., 5000 = S/. 50.00)
        currency_code: 'PEN',
        email: email || session.user.email,
        source_id: token,
        description: description || 'Consulta médica - Ciruplástica',
        antifraud_details: {
          address: 'Lima, Perú',
          address_city: 'Lima',
          country_code: 'PE',
          first_name: session.user.name?.split(' ')[0] || 'Cliente',
          last_name: session.user.name?.split(' ').slice(1).join(' ') || 'Paciente',
          phone_number: '999999999',
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Culqi error:', data)
      return NextResponse.json(
        { error: data.user_message || data.merchant_message || 'Error al procesar el pago' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      chargeId: data.id,
      message: 'Pago procesado exitosamente',
    })
  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json(
      { error: 'Error al procesar el pago' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { createVerificationToken } from '@/lib/tokens'
import { sendPasswordResetEmail } from '@/lib/email'

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = forgotPasswordSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const { email } = result.data

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    // Siempre responder con éxito para no revelar si el email existe
    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'Si el email existe, recibirás un enlace para restablecer tu contraseña',
      })
    }

    // Crear token de reset
    const token = await createVerificationToken(user.email, 'password_reset')

    // Enviar email
    await sendPasswordResetEmail(user.email, token, user.name || undefined)

    return NextResponse.json({
      success: true,
      message: 'Si el email existe, recibirás un enlace para restablecer tu contraseña',
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}

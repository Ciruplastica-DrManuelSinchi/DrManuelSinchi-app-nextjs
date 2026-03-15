import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hashPassword, validatePasswordStrength } from '@/lib/password'
import { createVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/email'

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar datos
    const result = registerSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { name, email, phone, password } = result.data

    // Validar fortaleza de contraseña
    const passwordValidation = validatePasswordStrength(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: passwordValidation.errors[0] },
        { status: 400 }
      )
    }

    // Verificar si el email ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Este email ya está registrado' },
        { status: 400 }
      )
    }

    // Hash de contraseña
    const hashedPassword = await hashPassword(password)

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        phone,
        password: hashedPassword,
        role: 'PATIENT',
        status: 'PENDING_VERIFICATION',
      },
    })

    // Crear token de verificación
    const token = await createVerificationToken(user.email, 'email')

    // Enviar email de verificación
    const emailResult = await sendVerificationEmail(user.email, token, name)

    if (!emailResult.success) {
      console.error('Error enviando email:', emailResult.error)
      // Aún así, la cuenta se creó - el usuario puede solicitar reenvío
    }

    return NextResponse.json(
      {
        success: true,
        message: emailResult.success
          ? 'Cuenta creada. Revisa tu email para verificar tu cuenta.'
          : 'Cuenta creada. Hubo un problema enviando el email de verificación. Por favor solicita un reenvío.',
        emailSent: emailResult.success,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Error al crear la cuenta' },
      { status: 500 }
    )
  }
}

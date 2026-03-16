import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hashPassword, validatePasswordStrength } from '@/lib/password'
import { verifyToken, deleteToken } from '@/lib/tokens'

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = resetPasswordSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const { token, password } = result.data

    // Validar fortaleza de contraseña
    const passwordValidation = validatePasswordStrength(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: passwordValidation.errors[0] },
        { status: 400 }
      )
    }

    // Verificar token
    const tokenResult = await verifyToken(token, 'password_reset')

    if (!tokenResult.valid || !tokenResult.identifier) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 400 }
      )
    }

    // Hash de nueva contraseña
    const hashedPassword = await hashPassword(password)

    // Actualizar contraseña
    await prisma.user.update({
      where: { email: tokenResult.identifier },
      data: {
        password: hashedPassword,
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    })

    // Eliminar token usado
    await deleteToken(token)

    return NextResponse.json({
      success: true,
      message: 'Contraseña actualizada correctamente',
    })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Error al restablecer la contraseña' },
      { status: 500 }
    )
  }
}

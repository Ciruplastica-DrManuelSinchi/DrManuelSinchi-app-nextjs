import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken, deleteToken } from '@/lib/tokens'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: 'Token no proporcionado' },
        { status: 400 }
      )
    }

    // Verificar token
    const result = await verifyToken(token, 'email')

    if (!result.valid || !result.identifier) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 400 }
      )
    }

    // Actualizar usuario
    await prisma.user.update({
      where: { email: result.identifier },
      data: {
        emailVerified: new Date(),
        status: 'ACTIVE',
      },
    })

    // Eliminar token usado
    await deleteToken(token)

    return NextResponse.json({
      success: true,
      message: 'Email verificado correctamente',
    })
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Error al verificar el email' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/login?error=missing_token', request.url))
  }

  // Verificar token
  const result = await verifyToken(token, 'email')

  if (!result.valid || !result.identifier) {
    return NextResponse.redirect(new URL('/login?error=invalid_token', request.url))
  }

  // Actualizar usuario
  await prisma.user.update({
    where: { email: result.identifier },
    data: {
      emailVerified: new Date(),
      status: 'ACTIVE',
    },
  })

  // Eliminar token usado
  await deleteToken(token)

  return NextResponse.redirect(new URL('/login?verified=true', request.url))
}

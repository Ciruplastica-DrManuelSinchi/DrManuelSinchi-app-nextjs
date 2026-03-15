import crypto from 'crypto'
import { prisma } from './prisma'

export function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex')
}

export async function createVerificationToken(
  identifier: string,
  type: 'email' | 'password_reset' = 'email'
): Promise<string> {
  const token = generateToken()
  const expires = new Date()

  // Tiempo de expiración según el tipo
  if (type === 'email') {
    expires.setHours(expires.getHours() + 24) // 24 horas
  } else {
    expires.setHours(expires.getHours() + 1) // 1 hora
  }

  // Eliminar tokens anteriores del mismo tipo para este usuario
  await prisma.verificationToken.deleteMany({
    where: {
      identifier,
      type,
    },
  })

  // Crear nuevo token
  await prisma.verificationToken.create({
    data: {
      identifier,
      token,
      expires,
      type,
    },
  })

  return token
}

export async function verifyToken(
  token: string,
  type: 'email' | 'password_reset' = 'email'
): Promise<{ valid: boolean; identifier?: string }> {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      token,
      type,
      expires: {
        gt: new Date(),
      },
    },
  })

  if (!verificationToken) {
    return { valid: false }
  }

  return {
    valid: true,
    identifier: verificationToken.identifier,
  }
}

export async function deleteToken(token: string): Promise<void> {
  await prisma.verificationToken.deleteMany({
    where: { token },
  })
}

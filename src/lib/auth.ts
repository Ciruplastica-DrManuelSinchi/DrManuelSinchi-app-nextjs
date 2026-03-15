import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import { verifyPassword } from './password'
import type { UserRole, AccountStatus } from '@prisma/client'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email y contraseña son requeridos')
        }

        const email = credentials.email as string
        const password = credentials.password as string

        // Buscar usuario
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        })

        if (!user || !user.password) {
          throw new Error('Credenciales inválidas')
        }

        // Verificar si la cuenta está bloqueada
        if (user.lockedUntil && user.lockedUntil > new Date()) {
          const minutesLeft = Math.ceil(
            (user.lockedUntil.getTime() - Date.now()) / 60000
          )
          throw new Error(
            `Cuenta bloqueada. Intenta de nuevo en ${minutesLeft} minutos`
          )
        }

        // Verificar contraseña
        const isValid = await verifyPassword(password, user.password)

        if (!isValid) {
          // Incrementar intentos fallidos
          const failedAttempts = user.failedLoginAttempts + 1
          const updates: {
            failedLoginAttempts: number
            lockedUntil?: Date
          } = {
            failedLoginAttempts: failedAttempts,
          }

          // Bloquear después de 5 intentos
          if (failedAttempts >= 5) {
            updates.lockedUntil = new Date(Date.now() + 15 * 60 * 1000) // 15 minutos
          }

          await prisma.user.update({
            where: { id: user.id },
            data: updates,
          })

          throw new Error('Credenciales inválidas')
        }

        // Verificar estado de la cuenta
        if (user.status === 'SUSPENDED') {
          throw new Error('Tu cuenta ha sido suspendida')
        }

        // Verificar si el email está verificado
        if (user.status === 'PENDING_VERIFICATION' || !user.emailVerified) {
          throw new Error('Por favor verifica tu email antes de iniciar sesión')
        }

        // Login exitoso - resetear intentos fallidos
        await prisma.user.update({
          where: { id: user.id },
          data: {
            failedLoginAttempts: 0,
            lockedUntil: null,
            lastLoginAt: new Date(),
          },
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          status: user.status,
          emailVerified: user.emailVerified,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role = user.role as UserRole
        token.status = user.status as AccountStatus
        token.emailVerified = user.emailVerified
      }

      // Actualizar token cuando se actualiza la sesión
      if (trigger === 'update' && session) {
        token.name = session.name
        token.email = session.email
      }

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.status = token.status
        session.user.emailVerified = token.emailVerified
      }
      return session
    },
  },
})

import { UserRole, AccountStatus } from '@prisma/client'
import 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role: UserRole
      status: AccountStatus
      emailVerified: Date | null
    }
  }

  interface User {
    id: string
    email: string
    name?: string | null
    image?: string | null
    role: UserRole
    status: AccountStatus
    emailVerified: Date | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: UserRole
    status: AccountStatus
    emailVerified: Date | null
  }
}

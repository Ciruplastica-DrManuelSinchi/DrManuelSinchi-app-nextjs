import { Suspense } from 'react'
import AuthCard from '@/app/components/auth/AuthCard'
import LoginForm from '@/app/components/auth/LoginForm'

export const metadata = {
  title: 'Iniciar Sesión | Ciruplástica',
  description: 'Inicia sesión en tu cuenta de Ciruplástica',
}

export default function LoginPage() {
  return (
    <AuthCard
      title="Bienvenido de vuelta"
      subtitle="Ingresa a tu cuenta"
    >
      <Suspense fallback={<div className="py-8 text-center text-gray-500">Cargando...</div>}>
        <LoginForm />
      </Suspense>
    </AuthCard>
  )
}

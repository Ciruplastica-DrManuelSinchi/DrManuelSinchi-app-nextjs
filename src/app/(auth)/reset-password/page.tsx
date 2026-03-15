import { Suspense } from 'react'
import AuthCard from '@/app/components/auth/AuthCard'
import ResetPasswordForm from '@/app/components/auth/ResetPasswordForm'

export const metadata = {
  title: 'Restablecer Contraseña | Ciruplástica',
  description: 'Crea una nueva contraseña para tu cuenta',
}

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="Nueva contraseña"
      subtitle="Crea una contraseña segura"
    >
      <Suspense fallback={<div className="py-8 text-center text-gray-500">Cargando...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthCard>
  )
}

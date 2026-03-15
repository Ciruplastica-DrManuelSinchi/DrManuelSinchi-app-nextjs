import AuthCard from '@/app/components/auth/AuthCard'
import ForgotPasswordForm from '@/app/components/auth/ForgotPasswordForm'

export const metadata = {
  title: 'Recuperar Contraseña | Ciruplástica',
  description: 'Recupera el acceso a tu cuenta de Ciruplástica',
}

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="¿Olvidaste tu contraseña?"
      subtitle="No te preocupes, te ayudamos"
    >
      <ForgotPasswordForm />
    </AuthCard>
  )
}

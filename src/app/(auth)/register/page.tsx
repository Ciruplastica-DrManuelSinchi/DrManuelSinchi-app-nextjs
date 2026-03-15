import AuthCard from '@/app/components/auth/AuthCard'
import RegisterForm from '@/app/components/auth/RegisterForm'

export const metadata = {
  title: 'Crear Cuenta | Ciruplástica',
  description: 'Regístrate en Ciruplástica y agenda tu consulta',
}

export default function RegisterPage() {
  return (
    <AuthCard
      title="Crea tu cuenta"
      subtitle="Únete a Ciruplástica"
    >
      <RegisterForm />
    </AuthCard>
  )
}

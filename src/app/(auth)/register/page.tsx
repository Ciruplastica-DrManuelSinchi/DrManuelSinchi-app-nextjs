import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import AuthCard from '@/app/components/auth/AuthCard'
import RegisterForm from '@/app/components/auth/RegisterForm'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('auth.register')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function RegisterPage() {
  const t = await getTranslations('auth.register')

  return (
    <AuthCard
      title={t('pageTitle')}
      subtitle={t('pageSubtitle')}
    >
      <RegisterForm />
    </AuthCard>
  )
}

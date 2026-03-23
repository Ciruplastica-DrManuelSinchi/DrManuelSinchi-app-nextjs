import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import AuthCard from '@/app/components/auth/AuthCard'
import LoginForm from '@/app/components/auth/LoginForm'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('auth.login')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function LoginPage() {
  const t = await getTranslations('auth.login')

  return (
    <AuthCard
      title={t('pageTitle')}
      subtitle={t('pageSubtitle')}
    >
      <Suspense fallback={<div className="py-8 text-center text-gray-500">{t('loading')}</div>}>
        <LoginForm />
      </Suspense>
    </AuthCard>
  )
}

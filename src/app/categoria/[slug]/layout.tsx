import ClientLayout from '@/app/components/layout/ClientLayout'

export default function DynamicCategoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}

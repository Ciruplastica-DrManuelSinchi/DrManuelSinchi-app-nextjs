import ClientLayout from '@/app/components/layout/ClientLayout'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}

import { Metadata } from 'next'
import ClientLayout from '@/app/components/layout/ClientLayout'

export const metadata: Metadata = {
    title: 'Videos Educativos | Cirugía Plástica y Medicina Estética',
    description: 'Videos educativos sobre cirugía plástica, medicina estética y procedimientos del Dr. Manuel Sinchi. Aprende sobre rinoplastia, lipoescultura, botox y más.',
    openGraph: {
        title: 'Videos Educativos | Dr. Manuel Sinchi - Ciruplástica',
        description: 'Contenido educativo sobre cirugía plástica y medicina estética. Conoce nuestros procedimientos en detalle.',
        type: 'website',
    },
}

export default function VideosLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <ClientLayout>{children}</ClientLayout>
}

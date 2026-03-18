import { Metadata } from 'next'
import BookingForm from '@/app/components/booking/BookingForm'
import { prisma } from '@/lib/prisma'
import { Calendar, Clock, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reservar Cita | Ciruplástica - Dr. Manuel Sinchi',
  description: 'Agenda tu consulta de evaluación con el Dr. Manuel Sinchi. Cirugía plástica, medicina estética y cirugía reconstructiva en Lima, Perú.',
}

export default async function ReservarPage({
  searchParams,
}: {
  searchParams: Promise<{ procedimiento?: string }>
}) {
  const params = await searchParams

  // Cargar procedimientos activos desde la base de datos
  const categories = await prisma.procedureCategory.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
    include: {
      procedures: {
        where: { isActive: true },
        orderBy: { order: 'asc' },
      },
    },
  })

  const proceduresList = categories.flatMap((category) =>
    category.procedures.map((procedure) => ({
      id: procedure.slug,
      name: procedure.name,
      category: category.slug,
      categoryLabel: category.name,
    }))
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <section className="bg-primary pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Reserva tu Consulta
            </h1>
            <p className="text-lg text-white/80">
              Da el primer paso hacia el cambio que deseas. Agenda tu evaluación personalizada con el Dr. Sinchi.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-3xl shadow-card p-6 md:p-8">
                  <h2 className="text-2xl font-display font-bold text-dark mb-6">
                    Información de tu cita
                  </h2>
                  <BookingForm
                    procedures={proceduresList}
                    preSelectedProcedure={params.procedimiento}
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-6">
                {/* Info Card */}
                <div className="bg-white rounded-3xl shadow-card p-6">
                  <h3 className="font-semibold text-dark mb-4">
                    ¿Qué incluye la consulta?
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Evaluación personalizada con el Dr. Sinchi</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Plan de tratamiento a medida</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Resolución de todas tus dudas</span>
                    </li>
                  </ul>
                </div>

                {/* Security Card */}
                <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-6 text-white">
                  <h3 className="font-semibold mb-3">
                    Pago 100% Seguro
                  </h3>
                  <p className="text-sm text-white/80 mb-4">
                    Aceptamos tarjetas de crédito/débito y Yape. Tu información está protegida.
                  </p>
                  <div className="flex items-center gap-3 text-white/70 text-xs">
                    <Shield className="w-4 h-4" />
                    <span>Procesado por Culqi - Certificado PCI DSS</span>
                  </div>
                </div>

                {/* Horarios */}
                <div className="bg-white rounded-3xl shadow-card p-6">
                  <h3 className="font-semibold text-dark mb-4">
                    Horarios de atención
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lunes - Viernes</span>
                      <span className="font-medium text-dark">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sábados</span>
                      <span className="font-medium text-dark">9:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Domingos</span>
                      <span className="text-gray-400">Cerrado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

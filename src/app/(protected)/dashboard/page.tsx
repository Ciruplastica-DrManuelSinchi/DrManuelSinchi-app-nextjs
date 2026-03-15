'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Calendar,
  Clock,
  User,
  FileText,
  MessageSquare,
  Bell,
  ChevronRight,
  Sparkles,
  Heart,
  Shield,
} from 'lucide-react'

const quickActions = [
  {
    title: 'Agendar Consulta',
    description: 'Reserva una cita con el Dr. Sinchi',
    icon: Calendar,
    href: 'https://api.whatsapp.com/send?phone=51961360074&text=Deseo%20agendar%20una%20consulta',
    color: 'bg-primary',
    external: true,
  },
  {
    title: 'Mi Perfil',
    description: 'Ver y editar tu información',
    icon: User,
    href: '/profile',
    color: 'bg-accent',
  },
  {
    title: 'Procedimientos',
    description: 'Explora nuestros tratamientos',
    icon: Sparkles,
    href: '/cirugia-plastica-facial',
    color: 'bg-purple-500',
  },
  {
    title: 'Preguntas Frecuentes',
    description: 'Resuelve tus dudas',
    icon: MessageSquare,
    href: '/preguntas-frecuentes',
    color: 'bg-teal-500',
  },
]

const upcomingFeatures = [
  {
    title: 'Historial de Consultas',
    description: 'Próximamente podrás ver tu historial de citas y tratamientos.',
    icon: FileText,
  },
  {
    title: 'Notificaciones',
    description: 'Recibe recordatorios de tus citas y ofertas especiales.',
    icon: Bell,
  },
  {
    title: 'Chat con el Doctor',
    description: 'Comunicación directa para seguimiento post-operatorio.',
    icon: MessageSquare,
  },
]

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="container-custom flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const firstName = session?.user?.name?.split(' ')[0] || 'Usuario'
  const currentHour = new Date().getHours()
  const greeting =
    currentHour < 12
      ? 'Buenos días'
      : currentHour < 18
        ? 'Buenas tardes'
        : 'Buenas noches'

  return (
    <div className="container-custom">
      {/* Header de bienvenida */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
          {greeting}, {firstName}
        </h1>
        <p className="text-gray-600">
          Bienvenido a tu panel de paciente de Ciruplástica
        </p>
      </motion.div>

      {/* Tarjeta de estado de cuenta */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 md:p-8 text-white mb-8 shadow-lg"
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium text-sm">
                Cuenta Verificada
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold mb-1">
              {session?.user?.name}
            </h2>
            <p className="text-white/80 text-sm">{session?.user?.email}</p>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
            <Heart className="w-4 h-4 text-accent" />
            <span className="text-sm">Paciente</span>
          </div>
        </div>
      </motion.div>

      {/* Acciones rápidas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            const Component = action.external ? 'a' : Link
            const props = action.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {}

            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 3) }}
              >
                <Component
                  href={action.href}
                  {...props}
                  className="block bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100"
                >
                  <div
                    className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                  <div className="mt-3 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Ir</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Component>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Próximas funcionalidades */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Próximamente
        </h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {upcomingFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`flex items-start gap-4 p-5 ${
                  index !== upcomingFeatures.length - 1
                    ? 'border-b border-gray-100'
                    : ''
                }`}
              >
                <div className="bg-gray-100 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
                <span className="ml-auto text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full whitespace-nowrap">
                  Pronto
                </span>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Info de contacto */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-accent/10 rounded-xl p-6 border border-accent/20"
      >
        <div className="flex items-start gap-4">
          <div className="bg-accent w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">
              ¿Necesitas ayuda?
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Nuestro equipo está disponible para atenderte de lunes a sábado de
              9:00 AM a 7:00 PM.
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=51961360074&text=Hola,%20necesito%20ayuda"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline"
            >
              Contactar por WhatsApp
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

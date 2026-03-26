'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Calendar,
  Clock,
  User,
  MessageSquare,
  ChevronRight,
  Sparkles,
  Heart,
  Shield,
  Plus,
  CalendarCheck,
  CheckCircle,
  CreditCard,
} from 'lucide-react'
import BookingList from '@/app/components/booking/BookingList'

interface Booking {
  id: string
  procedureName: string
  procedureCategory: string
  date: string
  timeSlot: string
  message?: string
  status: 'AWAITING_PAYMENT' | 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'EXPIRED'
  paymentDeadline?: string
  createdAt: string
}

const quickActions = [
  {
    title: 'Nueva Reserva',
    description: 'Agenda una consulta',
    icon: Plus,
    href: '/reservar',
    color: 'bg-primary',
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
    title: 'Preguntas',
    description: 'Resuelve tus dudas',
    icon: MessageSquare,
    href: '/preguntas-frecuentes',
    color: 'bg-teal-500',
  },
]

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loadingBookings, setLoadingBookings] = useState(true)

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings')
      if (response.ok) {
        const data = await response.json()
        setBookings(data.bookings)
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoadingBookings(false)
    }
  }

  useEffect(() => {
    if (session?.user) {
      fetchBookings()
    }
  }, [session])

  const handlePaymentComplete = () => {
    // Refrescar las reservas después de completar el pago
    fetchBookings()
  }

  const handleCancelBooking = async (id: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cancel: true }),
      })

      if (response.ok) {
        setBookings(prev =>
          prev.map(b => (b.id === id ? { ...b, status: 'CANCELLED' as const } : b))
        )
      }
    } catch (error) {
      console.error('Error cancelling booking:', error)
    }
  }

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

  // Filtrar reservas
  const awaitingPaymentCount = bookings.filter(b => b.status === 'AWAITING_PAYMENT').length
  const confirmedCount = bookings.filter(b => b.status === 'CONFIRMED').length
  const completedCount = bookings.filter(b => b.status === 'COMPLETED').length

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

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
          {awaitingPaymentCount > 0 && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-orange-300">
                <CreditCard className="w-5 h-5" />
                {awaitingPaymentCount}
              </div>
              <p className="text-xs text-white/70 mt-1">Por pagar</p>
            </div>
          )}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold">
              <CalendarCheck className="w-5 h-5" />
              {confirmedCount}
            </div>
            <p className="text-xs text-white/70 mt-1">Confirmadas</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold">
              <CheckCircle className="w-5 h-5" />
              {completedCount}
            </div>
            <p className="text-xs text-white/70 mt-1">Completadas</p>
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 3) }}
              >
                <Link
                  href={action.href}
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
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Próximas Citas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Mis Reservas
          </h2>
          {bookings.length > 0 && (
            <Link
              href="/reservar"
              className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
            >
              Nueva reserva
              <Plus className="w-4 h-4" />
            </Link>
          )}
        </div>

        {loadingBookings ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-500 mt-4">Cargando reservas...</p>
          </div>
        ) : bookings.length > 0 ? (
          <BookingList
            bookings={bookings.slice(0, 5)}
            onCancelBooking={handleCancelBooking}
            onPaymentComplete={handlePaymentComplete}
          />
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No tienes citas programadas
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Agenda tu primera consulta con el Dr. Sinchi
            </p>
            <Link href="/reservar" className="btn-primary inline-flex">
              Agendar Cita
            </Link>
          </div>
        )}

        {bookings.length > 0 && (
          <div className="text-center mt-4">
            <Link
              href="/dashboard/mis-reservas"
              className="text-sm text-primary font-medium hover:underline inline-flex items-center gap-1"
            >
              Ver todas las reservas ({bookings.length})
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </motion.div>

      {/* Info de contacto */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-accent/10 rounded-xl p-6 border border-accent/20"
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
              9:00 AM a 6:00 PM.
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

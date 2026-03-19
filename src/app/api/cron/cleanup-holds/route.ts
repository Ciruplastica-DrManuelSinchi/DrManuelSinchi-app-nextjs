import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Esta API se ejecuta a medianoche para limpiar reservas expiradas
// También se puede llamar manualmente si es necesario

// GET /api/cron/cleanup-holds - Limpiar reservas expiradas
export async function GET(request: NextRequest) {
  try {
    // Verificar token de autorización para cron jobs (opcional)
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    // Si hay un CRON_SECRET configurado, verificar
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // 1. Expirar reservas AWAITING_PAYMENT que pasaron su deadline
    const expiredAwaitingPayment = await prisma.booking.updateMany({
      where: {
        status: 'AWAITING_PAYMENT',
        paymentDeadline: { lt: new Date() }
      },
      data: {
        status: 'EXPIRED'
      }
    })

    // 2. Marcar como expiradas las reservas PENDING con pago pendiente
    // que tienen más de 24 horas sin confirmación de pago
    const expiredPendingPayment = await prisma.booking.updateMany({
      where: {
        status: 'PENDING',
        createdAt: {
          lt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 24 horas
        },
        payment: {
          status: 'pending' // Solo Yape/WhatsApp que no han sido verificados
        }
      },
      data: {
        status: 'EXPIRED'
      }
    })

    // 3. (Opcional) Eliminar registros EXPIRED muy antiguos (más de 30 días)
    const deletedOldExpired = await prisma.booking.deleteMany({
      where: {
        status: 'EXPIRED',
        updatedAt: {
          lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 días
        }
      }
    })

    return NextResponse.json({
      success: true,
      expiredAwaitingPayment: expiredAwaitingPayment.count,
      expiredPendingPayment: expiredPendingPayment.count,
      deletedOldExpired: deletedOldExpired.count,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error cleaning up bookings:', error)
    return NextResponse.json(
      { error: 'Error al limpiar reservas' },
      { status: 500 }
    )
  }
}

// POST también para compatibilidad con algunos servicios de cron
export async function POST(request: NextRequest) {
  return GET(request)
}

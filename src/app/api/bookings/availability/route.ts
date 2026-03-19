import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// Expirar reservas que pasaron su deadline de pago
async function expireOverdueBookings() {
  await prisma.booking.updateMany({
    where: {
      status: 'AWAITING_PAYMENT',
      paymentDeadline: { lt: new Date() }
    },
    data: {
      status: 'EXPIRED'
    }
  })
}

// GET /api/bookings/availability?date=YYYY-MM-DD - Obtener slots ocupados para una fecha
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json(
        { error: 'Fecha requerida' },
        { status: 400 }
      )
    }

    // Expirar reservas vencidas
    await expireOverdueBookings()

    const bookingDate = new Date(date)
    const startOfDay = new Date(bookingDate.setHours(0, 0, 0, 0))
    const endOfDay = new Date(bookingDate.setHours(23, 59, 59, 999))

    // Obtener reservas activas para ese día
    const bookings = await prisma.booking.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: { in: ['AWAITING_PAYMENT', 'PENDING', 'CONFIRMED'] },
        // Para AWAITING_PAYMENT, solo considerar las que no han expirado
        OR: [
          { status: { in: ['PENDING', 'CONFIRMED'] } },
          {
            status: 'AWAITING_PAYMENT',
            paymentDeadline: { gt: new Date() }
          }
        ]
      },
      select: {
        timeSlot: true,
        status: true,
        userId: true,
        paymentDeadline: true,
      },
    })

    // Mapear a formato de slots ocupados
    const occupiedSlots = bookings.map(b => ({
      timeSlot: b.timeSlot,
      type: b.status === 'AWAITING_PAYMENT' ? 'awaiting_payment' : 'booked',
      // Solo incluir info del usuario si es el usuario actual
      isCurrentUser: session?.user?.id ? b.userId === session.user.id : false,
      expiresAt: b.status === 'AWAITING_PAYMENT' ? b.paymentDeadline : null,
    }))

    return NextResponse.json({ occupiedSlots })
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json(
      { error: 'Error al obtener disponibilidad' },
      { status: 500 }
    )
  }
}

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

// GET /api/bookings/availability?date=YYYY-MM-DD&modalidad=PRESENCIAL - Obtener slots ocupados para una fecha
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const modalidad = searchParams.get('modalidad') as 'PRESENCIAL' | 'VIRTUAL' | null

    if (!date) {
      return NextResponse.json(
        { error: 'Fecha requerida' },
        { status: 400 }
      )
    }

    // Expirar reservas vencidas
    await expireOverdueBookings()

    // Usar UTC para que coincida con cómo se almacenan las fechas (new Date("YYYY-MM-DD") = UTC midnight)
    const startOfDay = new Date(date + 'T00:00:00.000Z')
    const endOfDay = new Date(date + 'T23:59:59.999Z')

    // Obtener reservas activas para ese día
    const bookings = await prisma.booking.findMany({
      where: {
        date: { gte: startOfDay, lte: endOfDay },
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

    // Obtener slots bloqueados por el admin para ese día
    const blockedFilter = modalidad
      ? { OR: [{ modalidad: null }, { modalidad }] }
      : {}

    const adminBlocks = await prisma.blockedSlot.findMany({
      where: {
        date: { gte: startOfDay, lte: endOfDay },
        ...blockedFilter,
      },
      select: {
        timeSlot: true,
        reason: true,
        notes: true,
      },
    })

    // Verificar si hay bloqueo de día completo
    const hasFullDayBlock = adminBlocks.some(b => b.timeSlot === null)

    // Mapear reservas a slots ocupados
    const occupiedSlots = bookings.map(b => ({
      timeSlot: b.timeSlot,
      type: b.status === 'AWAITING_PAYMENT' ? 'awaiting_payment' as const : 'booked' as const,
      isCurrentUser: session?.user?.id ? b.userId === session.user.id : false,
      expiresAt: b.status === 'AWAITING_PAYMENT' ? b.paymentDeadline : null,
    }))

    // Añadir slots bloqueados por el admin (sólo los que tienen timeSlot específico)
    const adminBlockedSlots = adminBlocks
      .filter(b => b.timeSlot !== null)
      .map(b => ({
        timeSlot: b.timeSlot as string,
        type: 'admin_blocked' as const,
        isCurrentUser: false,
        expiresAt: null,
      }))

    return NextResponse.json({
      occupiedSlots: [...occupiedSlots, ...adminBlockedSlots],
      isFullyBlocked: hasFullDayBlock,
    })
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json(
      { error: 'Error al obtener disponibilidad' },
      { status: 500 }
    )
  }
}

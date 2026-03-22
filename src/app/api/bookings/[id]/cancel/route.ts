import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST /api/bookings/[id]/cancel - Cancelar una reserva
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    const { id } = params

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Buscar la reserva
    const booking = await prisma.booking.findUnique({
      where: { id },
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Reserva no encontrada' },
        { status: 404 }
      )
    }

    // Verificar que la reserva pertenece al usuario
    if (booking.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 403 }
      )
    }

    // Solo se pueden cancelar reservas en estados específicos
    if (!['AWAITING_PAYMENT', 'PENDING', 'CONFIRMED'].includes(booking.status)) {
      return NextResponse.json(
        { error: 'Esta reserva no puede ser cancelada' },
        { status: 400 }
      )
    }

    // Cancelar la reserva
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        paymentDeadline: null,
      },
    })

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
      message: 'Reserva cancelada exitosamente',
    })
  } catch (error) {
    console.error('Error cancelling booking:', error)
    return NextResponse.json(
      { error: 'Error al cancelar reserva' },
      { status: 500 }
    )
  }
}

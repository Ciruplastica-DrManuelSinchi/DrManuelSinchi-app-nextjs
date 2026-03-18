import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { cancelCalendarEvent } from '@/lib/google-calendar'

// GET /api/bookings/[id] - Obtener detalle de una reserva
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const booking = await prisma.booking.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        payment: true,
      },
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Reserva no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error('Error fetching booking:', error)
    return NextResponse.json(
      { error: 'Error al obtener reserva' },
      { status: 500 }
    )
  }
}

// PATCH /api/bookings/[id] - Actualizar reserva (solo mensaje o cancelar)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { message, cancel } = body

    // Verificar que la reserva existe y pertenece al usuario
    const existingBooking = await prisma.booking.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Reserva no encontrada' },
        { status: 404 }
      )
    }

    // No permitir modificar reservas completadas o canceladas
    if (['COMPLETED', 'CANCELLED'].includes(existingBooking.status)) {
      return NextResponse.json(
        { error: 'No se puede modificar una reserva completada o cancelada' },
        { status: 400 }
      )
    }

    const updateData: { message?: string; status?: 'CANCELLED' } = {}

    if (message !== undefined) {
      updateData.message = message
    }

    if (cancel === true) {
      updateData.status = 'CANCELLED'
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: updateData,
    })

    // Si se canceló, también cancelar el evento en Google Calendar
    if (cancel === true && existingBooking.calendarEventId) {
      await cancelCalendarEvent(existingBooking.calendarEventId)
    }

    return NextResponse.json({
      success: true,
      booking,
      message: cancel ? 'Reserva cancelada' : 'Reserva actualizada',
    })
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json(
      { error: 'Error al actualizar reserva' },
      { status: 500 }
    )
  }
}

// DELETE /api/bookings/[id] - Cancelar reserva
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Verificar que la reserva existe y pertenece al usuario
    const existingBooking = await prisma.booking.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Reserva no encontrada' },
        { status: 404 }
      )
    }

    // No permitir cancelar reservas ya completadas
    if (existingBooking.status === 'COMPLETED') {
      return NextResponse.json(
        { error: 'No se puede cancelar una reserva completada' },
        { status: 400 }
      )
    }

    // Cancelar evento en Google Calendar si existe
    if (existingBooking.calendarEventId) {
      await cancelCalendarEvent(existingBooking.calendarEventId)
    }

    // Cancelar en lugar de eliminar (soft delete)
    await prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
    })

    return NextResponse.json({
      success: true,
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

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { cancelCalendarEvent, updateCalendarEvent } from '@/lib/google-calendar'

// GET /api/admin/bookings/[id] - Obtener detalle de reserva
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true,
          },
        },
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

// PATCH /api/admin/bookings/[id] - Actualizar estado de reserva
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { status, date, timeSlot } = body

    // Verificar que la reserva existe
    const existingBooking = await prisma.booking.findUnique({
      where: { id },
    })

    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Reserva no encontrada' },
        { status: 404 }
      )
    }

    const updateData: Record<string, unknown> = {}

    if (status && ['AWAITING_PAYMENT', 'PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'EXPIRED'].includes(status)) {
      updateData.status = status
    }

    if (date) {
      const newDate = new Date(date)
      if (isNaN(newDate.getTime())) {
        return NextResponse.json(
          { error: 'Fecha inválida' },
          { status: 400 }
        )
      }
      updateData.date = newDate
    }

    if (timeSlot) {
      updateData.timeSlot = timeSlot
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    // Sincronizar con Google Calendar
    if (existingBooking.calendarEventId) {
      // Si se canceló la reserva, cancelar el evento del calendario
      if (status === 'CANCELLED') {
        await cancelCalendarEvent(existingBooking.calendarEventId)
      }
      // Si se cambió la fecha/hora, actualizar el evento
      else if (date || timeSlot) {
        await updateCalendarEvent(existingBooking.calendarEventId, {
          date: date ? new Date(date) : existingBooking.date,
          timeSlot: timeSlot || existingBooking.timeSlot,
          patientName: booking.user.name || 'Paciente',
          procedureName: existingBooking.procedureName,
        })
      }
    }

    return NextResponse.json({
      success: true,
      booking,
      message: 'Reserva actualizada correctamente',
    })
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json(
      { error: 'Error al actualizar reserva' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/bookings/[id] - Eliminar reserva permanentemente
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Verificar que la reserva existe
    const existingBooking = await prisma.booking.findUnique({
      where: { id },
    })

    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Reserva no encontrada' },
        { status: 404 }
      )
    }

    // Cancelar evento en Google Calendar si existe
    if (existingBooking.calendarEventId) {
      await cancelCalendarEvent(existingBooking.calendarEventId)
    }

    // Eliminar reserva (y pagos asociados por cascade)
    await prisma.booking.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Reserva eliminada permanentemente',
    })
  } catch (error) {
    console.error('Error deleting booking:', error)
    return NextResponse.json(
      { error: 'Error al eliminar reserva' },
      { status: 500 }
    )
  }
}

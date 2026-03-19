import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createCalendarEvent } from '@/lib/google-calendar'
import { z } from 'zod'

const completePaymentSchema = z.object({
  paymentMethod: z.enum(['culqi', 'yape', 'whatsapp']),
  paymentReference: z.string().optional(),
  paymentAmount: z.number(),
})

const paymentMethodMap = {
  culqi: 'CULQI_CARD',
  yape: 'YAPE',
  whatsapp: 'WHATSAPP_ONLY',
} as const

// POST /api/bookings/[id]/complete-payment - Completar pago de una reserva
export async function POST(
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

    const result = completePaymentSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const { paymentMethod, paymentReference, paymentAmount } = result.data

    // Buscar la reserva
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { user: true },
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

    // Verificar estado de la reserva
    if (booking.status !== 'AWAITING_PAYMENT') {
      if (booking.status === 'EXPIRED') {
        return NextResponse.json(
          { error: 'Esta reserva ha expirado. Por favor, crea una nueva reserva.' },
          { status: 400 }
        )
      }
      return NextResponse.json(
        { error: 'Esta reserva ya fue procesada' },
        { status: 400 }
      )
    }

    // Verificar que no haya pasado el deadline
    if (booking.paymentDeadline && new Date() > booking.paymentDeadline) {
      // Marcar como expirada
      await prisma.booking.update({
        where: { id },
        data: { status: 'EXPIRED' },
      })

      return NextResponse.json(
        { error: 'El tiempo para completar el pago ha expirado. Por favor, crea una nueva reserva.' },
        { status: 400 }
      )
    }

    // Actualizar reserva y crear pago en transacción
    const updatedBooking = await prisma.$transaction(async (tx) => {
      // Crear el pago
      await tx.payment.create({
        data: {
          bookingId: id,
          amount: paymentAmount,
          method: paymentMethodMap[paymentMethod],
          culqiChargeId: paymentMethod === 'culqi' ? paymentReference : null,
          status: paymentMethod === 'culqi' ? 'completed' : 'pending',
        },
      })

      // Actualizar la reserva a PENDING
      const updated = await tx.booking.update({
        where: { id },
        data: {
          status: 'PENDING',
          paymentDeadline: null, // Ya no necesita deadline
        },
        include: {
          payment: true,
        },
      })

      return updated
    })

    // Crear evento en Google Calendar
    const calendarResult = await createCalendarEvent({
      patientName: session.user.name || 'Paciente',
      patientEmail: session.user.email!,
      procedureName: booking.procedureName,
      procedureCategory: booking.procedureCategory,
      date: booking.date,
      timeSlot: booking.timeSlot,
      message: booking.message || undefined,
      bookingId: booking.id,
    })

    // Guardar el ID del evento si se creó exitosamente
    if (calendarResult.success && calendarResult.eventId) {
      await prisma.booking.update({
        where: { id: booking.id },
        data: { calendarEventId: calendarResult.eventId },
      })
    }

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
      calendarEventCreated: calendarResult.success,
      message: calendarResult.success
        ? 'Pago completado. Recibirás una invitación de calendario en tu correo.'
        : 'Pago completado. Te contactaremos pronto para confirmar tu cita.',
    })
  } catch (error) {
    console.error('Error completing payment:', error)
    return NextResponse.json(
      { error: 'Error al procesar el pago' },
      { status: 500 }
    )
  }
}

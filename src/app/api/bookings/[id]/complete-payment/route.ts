import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createCalendarEvent } from '@/lib/google-calendar'
import { z } from 'zod'

const completePaymentSchema = z.object({
  paymentMethod: z.enum(['culqi', 'yape', 'whatsapp', 'card', 'simulated']),
  paymentReference: z.string().optional(),
  paymentAmount: z.number(),
})

const paymentMethodMap = {
  culqi: 'CULQI_CARD',
  card: 'CULQI_CARD',
  yape: 'YAPE',
  whatsapp: 'WHATSAPP_ONLY',
  simulated: 'SIMULATED',
} as const

// POST /api/bookings/[id]/complete-payment - Completar pago de una reserva
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

    // Determinar si el pago se verifica automáticamente o requiere revisión manual
    const isManualPayment = ['yape', 'whatsapp'].includes(paymentMethod)
    const newStatus = isManualPayment ? 'PENDING' : 'CONFIRMED'

    // Actualizar reserva y crear pago en transacción
    const updatedBooking = await prisma.$transaction(async (tx) => {
      await tx.payment.create({
        data: {
          bookingId: id,
          amount: paymentAmount,
          method: paymentMethodMap[paymentMethod],
          culqiChargeId: paymentReference || null,
          status: isManualPayment ? 'pending' : 'completed',
        },
      })

      const updated = await tx.booking.update({
        where: { id },
        data: {
          status: newStatus,
          paymentDeadline: null,
        },
        include: {
          payment: true,
        },
      })

      return updated
    })

    // Solo crear evento en Google Calendar si se confirma automáticamente
    let calendarEventCreated = false
    if (!isManualPayment) {
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

      if (calendarResult.success && calendarResult.eventId) {
        await prisma.booking.update({
          where: { id: booking.id },
          data: { calendarEventId: calendarResult.eventId },
        })
        calendarEventCreated = true
      }
    }

    const message = isManualPayment
      ? 'Pago registrado. Un administrador verificará tu pago y confirmará tu cita.'
      : calendarEventCreated
        ? 'Pago completado. Tu cita ha sido confirmada. Recibirás una invitación de calendario en tu correo.'
        : 'Pago completado. Tu cita ha sido confirmada.'

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
      calendarEventCreated,
      message,
    })
  } catch (error) {
    console.error('Error completing payment:', error)
    return NextResponse.json(
      { error: 'Error al procesar el pago' },
      { status: 500 }
    )
  }
}

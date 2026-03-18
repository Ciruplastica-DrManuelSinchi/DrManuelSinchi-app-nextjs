import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createCalendarEvent } from '@/lib/google-calendar'
import { z } from 'zod'

const createBookingSchema = z.object({
  procedureId: z.string().min(1, 'El procedimiento es requerido'),
  procedureName: z.string().min(1, 'El nombre del procedimiento es requerido'),
  procedureCategory: z.string().min(1, 'La categoría es requerida'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Fecha inválida'),
  timeSlot: z.string().min(1, 'El horario es requerido'),
  message: z.string().optional(),
  paymentMethod: z.enum(['culqi', 'yape', 'whatsapp']).optional(),
  paymentReference: z.string().optional(),
  paymentAmount: z.number().optional(),
})

const paymentMethodMap = {
  culqi: 'CULQI_CARD',
  yape: 'YAPE',
  whatsapp: 'WHATSAPP_ONLY',
} as const

// GET /api/bookings - Obtener reservas del usuario actual
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: session.user.id },
      orderBy: { date: 'desc' },
      include: {
        payment: {
          select: {
            id: true,
            amount: true,
            method: true,
            status: true,
          },
        },
      },
    })

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Error al obtener reservas' },
      { status: 500 }
    )
  }
}

// POST /api/bookings - Crear nueva reserva
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()

    const result = createBookingSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const { procedureId, procedureName, procedureCategory, date, timeSlot, message, paymentMethod, paymentReference, paymentAmount } = result.data

    // Verificar que la fecha sea futura
    const bookingDate = new Date(date)
    if (bookingDate < new Date()) {
      return NextResponse.json(
        { error: 'La fecha debe ser futura' },
        { status: 400 }
      )
    }

    // Verificar disponibilidad del horario
    const existingBooking = await prisma.booking.findFirst({
      where: {
        date: bookingDate,
        timeSlot,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    })

    if (existingBooking) {
      return NextResponse.json(
        { error: 'Este horario ya no está disponible' },
        { status: 400 }
      )
    }

    // Crear reserva con pago
    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        procedureId,
        procedureName,
        procedureCategory,
        date: bookingDate,
        timeSlot,
        message,
        status: 'PENDING',
        ...(paymentMethod && paymentAmount && {
          payment: {
            create: {
              amount: paymentAmount,
              method: paymentMethodMap[paymentMethod],
              culqiChargeId: paymentMethod === 'culqi' ? paymentReference : null,
              status: paymentMethod === 'culqi' ? 'completed' : 'pending',
            },
          },
        }),
      },
      include: {
        payment: true,
      },
    })

    // Crear evento en Google Calendar y enviar invitación al paciente
    const calendarResult = await createCalendarEvent({
      patientName: session.user.name || 'Paciente',
      patientEmail: session.user.email!,
      procedureName,
      procedureCategory,
      date: bookingDate,
      timeSlot,
      message,
      bookingId: booking.id,
    })

    // Guardar el ID del evento si se creó exitosamente
    if (calendarResult.success && calendarResult.eventId) {
      await prisma.booking.update({
        where: { id: booking.id },
        data: { calendarEventId: calendarResult.eventId },
      })
    }

    return NextResponse.json(
      {
        success: true,
        booking,
        calendarEventCreated: calendarResult.success,
        message: calendarResult.success
          ? 'Reserva creada exitosamente. Recibirás una invitación de calendario en tu correo.'
          : 'Reserva creada exitosamente. Te contactaremos pronto para confirmar.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Error al crear reserva' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const PAYMENT_DEADLINE_MINUTES = 30

const createBookingSchema = z.object({
  // Datos personales
  birthDate: z.string().optional(),
  documentType: z.enum(['DNI', 'CE', 'PASSPORT']).optional(),
  documentNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  occupation: z.string().optional(),
  // Datos de la cita
  procedureId: z.string().min(1, 'El procedimiento es requerido'),
  procedureName: z.string().min(1, 'El nombre del procedimiento es requerido'),
  procedureCategory: z.string().min(1, 'La categoría es requerida'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Fecha inválida'),
  timeSlot: z.string().min(1, 'El horario es requerido'),
  weight: z.number().optional(),
  height: z.number().optional(),
  referralSource: z.string().optional(),
  message: z.string().optional(),
})

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

// GET /api/bookings - Obtener reservas del usuario actual
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Expirar reservas vencidas
    await expireOverdueBookings()

    const bookings = await prisma.booking.findMany({
      where: {
        userId: session.user.id,
        // Mostrar todas las reservas incluyendo pendientes de pago y expiradas
      },
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

// POST /api/bookings - Crear nueva reserva (estado AWAITING_PAYMENT)
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

    const {
      // Datos personales
      birthDate,
      documentType,
      documentNumber,
      address,
      city,
      occupation,
      // Datos de la cita
      procedureId,
      procedureName,
      procedureCategory,
      date,
      timeSlot,
      weight,
      height,
      referralSource,
      message,
    } = result.data

    // Expirar reservas vencidas primero
    await expireOverdueBookings()

    // Verificar que la fecha sea futura
    const bookingDate = new Date(date)
    if (bookingDate < new Date()) {
      return NextResponse.json(
        { error: 'La fecha debe ser futura' },
        { status: 400 }
      )
    }

    // Verificar si el usuario ya tiene una reserva AWAITING_PAYMENT activa
    const userPendingBooking = await prisma.booking.findFirst({
      where: {
        userId: session.user.id,
        status: 'AWAITING_PAYMENT',
        paymentDeadline: { gt: new Date() }
      },
    })

    if (userPendingBooking) {
      return NextResponse.json(
        {
          error: 'Ya tienes una reserva pendiente de pago. Debes completar el pago o cancelarla antes de crear otra.',
          existingBooking: {
            id: userPendingBooking.id,
            date: userPendingBooking.date,
            timeSlot: userPendingBooking.timeSlot,
            procedureName: userPendingBooking.procedureName,
            paymentDeadline: userPendingBooking.paymentDeadline,
          }
        },
        { status: 409 }
      )
    }

    // Verificar si ya existe una reserva activa para ese slot
    const existingBooking = await prisma.booking.findFirst({
      where: {
        date: bookingDate,
        timeSlot,
        status: { in: ['AWAITING_PAYMENT', 'PENDING', 'CONFIRMED'] },
        // Si es AWAITING_PAYMENT, verificar que no haya expirado
        OR: [
          { status: { in: ['PENDING', 'CONFIRMED'] } },
          {
            status: 'AWAITING_PAYMENT',
            paymentDeadline: { gt: new Date() }
          }
        ]
      },
    })

    if (existingBooking) {
      return NextResponse.json(
        { error: 'Este horario ya está reservado' },
        { status: 409 }
      )
    }

    // Calcular deadline de pago (30 minutos)
    const paymentDeadline = new Date(Date.now() + PAYMENT_DEADLINE_MINUTES * 60 * 1000)

    // Crear reserva con estado AWAITING_PAYMENT
    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        // Datos personales
        birthDate: birthDate ? new Date(birthDate) : undefined,
        documentType: documentType || undefined,
        documentNumber: documentNumber || undefined,
        address: address || undefined,
        city: city || undefined,
        occupation: occupation || undefined,
        // Datos de la cita
        procedureId,
        procedureName,
        procedureCategory,
        date: bookingDate,
        timeSlot,
        weight: weight || undefined,
        height: height || undefined,
        referralSource: referralSource || undefined,
        message: message || undefined,
        // Estado
        status: 'AWAITING_PAYMENT',
        paymentDeadline,
      },
    })

    return NextResponse.json(
      {
        success: true,
        booking,
        paymentDeadline,
        message: `Tienes ${PAYMENT_DEADLINE_MINUTES} minutos para completar el pago`,
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

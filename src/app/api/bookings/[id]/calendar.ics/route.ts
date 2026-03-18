import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateICSFile } from '@/lib/google-calendar'

// GET /api/bookings/[id]/calendar.ics - Descargar archivo ICS
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
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Reserva no encontrada' },
        { status: 404 }
      )
    }

    // Generar archivo ICS
    const icsContent = generateICSFile({
      patientName: booking.user.name || 'Paciente',
      patientEmail: booking.user.email,
      procedureName: booking.procedureName,
      procedureCategory: booking.procedureCategory,
      date: booking.date,
      timeSlot: booking.timeSlot,
      message: booking.message || undefined,
      bookingId: booking.id,
    })

    // Devolver como archivo descargable
    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="cita-ciruplastica-${booking.id}.ics"`,
      },
    })
  } catch (error) {
    console.error('Error generating ICS:', error)
    return NextResponse.json(
      { error: 'Error al generar archivo de calendario' },
      { status: 500 }
    )
  }
}

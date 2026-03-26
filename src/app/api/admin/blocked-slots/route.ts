import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createBlockSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Fecha inválida'),
  timeSlots: z.array(z.string()).optional(), // vacío o null = día completo
  reason: z.enum(['OPERACION', 'PACIENTE_PREVIO', 'OTRO']),
  modalidad: z.enum(['PRESENCIAL', 'VIRTUAL']).nullable().optional(),
  notes: z.string().optional(),
})

// GET /api/admin/blocked-slots - Listar todos los bloqueos
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    const where: Record<string, unknown> = {}
    if (from || to) {
      where.date = {}
      if (from) (where.date as Record<string, unknown>).gte = new Date(from + 'T00:00:00.000Z')
      if (to) (where.date as Record<string, unknown>).lte = new Date(to + 'T23:59:59.999Z')
    }

    const blocks = await prisma.blockedSlot.findMany({
      where,
      orderBy: [{ date: 'asc' }, { timeSlot: 'asc' }],
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
      },
    })

    return NextResponse.json({ blocks })
  } catch (error) {
    console.error('Error fetching blocked slots:', error)
    return NextResponse.json({ error: 'Error al obtener bloqueos' }, { status: 500 })
  }
}

// POST /api/admin/blocked-slots - Crear uno o varios bloqueos
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const result = createBlockSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 })
    }

    const { date, timeSlots, reason, modalidad, notes } = result.data

    // Parsear la fecha como local (sin UTC offset)
    const [year, month, day] = date.split('-').map(Number)
    const blockDate = new Date(year, month - 1, day, 12, 0, 0) // mediodía para evitar problemas de zona horaria

    if (timeSlots && timeSlots.length > 0) {
      // Crear un bloqueo por cada slot
      const created = await prisma.$transaction(
        timeSlots.map((slot) =>
          prisma.blockedSlot.create({
            data: {
              date: blockDate,
              timeSlot: slot,
              reason,
              modalidad: modalidad ?? null,
              notes: notes || null,
              createdById: session.user.id,
            },
          })
        )
      )
      return NextResponse.json({ success: true, blocks: created }, { status: 201 })
    } else {
      // Día completo
      const block = await prisma.blockedSlot.create({
        data: {
          date: blockDate,
          timeSlot: null,
          reason,
          modalidad: modalidad ?? null,
          notes: notes || null,
          createdById: session.user.id,
        },
      })
      return NextResponse.json({ success: true, block }, { status: 201 })
    }
  } catch (error) {
    console.error('Error creating blocked slot:', error)
    return NextResponse.json({ error: 'Error al crear bloqueo' }, { status: 500 })
  }
}

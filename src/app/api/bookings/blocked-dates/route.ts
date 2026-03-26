import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/bookings/blocked-dates?start=YYYY-MM-DD&end=YYYY-MM-DD&modalidad=PRESENCIAL
// Retorna las fechas con bloqueos (parciales o totales) para el calendario
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const start = searchParams.get('start')
    const end = searchParams.get('end')
    const modalidad = searchParams.get('modalidad') as 'PRESENCIAL' | 'VIRTUAL' | null

    if (!start || !end) {
      return NextResponse.json({ error: 'start y end son requeridos' }, { status: 400 })
    }

    // Usar UTC para que coincida con cómo se almacenan las fechas
    const startDate = new Date(start + 'T00:00:00.000Z')
    const endDate = new Date(end + 'T23:59:59.999Z')

    // Filtrar por modalidad: incluir bloqueos sin modalidad (afectan a todas) o de la modalidad específica
    const modalidadFilter = modalidad
      ? { OR: [{ modalidad: null }, { modalidad }] }
      : {}

    const blocks = await prisma.blockedSlot.findMany({
      where: {
        date: { gte: startDate, lte: endDate },
        ...modalidadFilter,
      },
      select: {
        date: true,
        timeSlot: true,
        reason: true,
        modalidad: true,
      },
      orderBy: { date: 'asc' },
    })

    // Agrupar por fecha
    const byDate: Record<string, { hasFullDayBlock: boolean; blockedSlots: string[]; reasons: string[] }> = {}

    for (const block of blocks) {
      const dateKey = block.date.toISOString().split('T')[0]
      if (!byDate[dateKey]) {
        byDate[dateKey] = { hasFullDayBlock: false, blockedSlots: [], reasons: [] }
      }
      if (!block.timeSlot) {
        byDate[dateKey].hasFullDayBlock = true
      } else {
        byDate[dateKey].blockedSlots.push(block.timeSlot)
      }
      if (!byDate[dateKey].reasons.includes(block.reason)) {
        byDate[dateKey].reasons.push(block.reason)
      }
    }

    return NextResponse.json({ blockedDates: byDate })
  } catch (error) {
    console.error('Error fetching blocked dates:', error)
    return NextResponse.json({ error: 'Error al obtener fechas bloqueadas' }, { status: 500 })
  }
}

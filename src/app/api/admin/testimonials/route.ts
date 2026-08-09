import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({ error: 'Error al obtener testimonios' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { name, text, rating, source, procedure, order, isActive } = body

    if (!name || !text) {
      return NextResponse.json({ error: 'Nombre y texto son requeridos' }, { status: 400 })
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        text,
        rating: rating || 5,
        source: source || 'google',
        procedure: procedure || null,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    })

    return NextResponse.json({ success: true, testimonial })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json({ error: 'Error al crear testimonio' }, { status: 500 })
  }
}

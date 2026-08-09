import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id } = params
    const body = await request.json()
    const { name, text, rating, source, procedure, order, isActive } = body

    const updateData: Record<string, unknown> = {}
    if (name !== undefined) updateData.name = name
    if (text !== undefined) updateData.text = text
    if (rating !== undefined) updateData.rating = rating
    if (source !== undefined) updateData.source = source
    if (procedure !== undefined) updateData.procedure = procedure || null
    if (order !== undefined) updateData.order = order
    if (isActive !== undefined) updateData.isActive = isActive

    const testimonial = await prisma.testimonial.update({ where: { id }, data: updateData })
    return NextResponse.json({ success: true, testimonial })
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return NextResponse.json({ error: 'Error al actualizar testimonio' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    await prisma.testimonial.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true, message: 'Testimonio eliminado' })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json({ error: 'Error al eliminar testimonio' }, { status: 500 })
  }
}

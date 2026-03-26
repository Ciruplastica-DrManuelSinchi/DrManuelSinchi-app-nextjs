import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// DELETE /api/admin/blocked-slots/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    await prisma.blockedSlot.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blocked slot:', error)
    return NextResponse.json({ error: 'Error al eliminar bloqueo' }, { status: 500 })
  }
}

// PATCH /api/admin/blocked-slots/[id] - Actualizar notas/razón
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const block = await prisma.blockedSlot.update({
      where: { id: params.id },
      data: {
        notes: body.notes !== undefined ? body.notes : undefined,
        reason: body.reason !== undefined ? body.reason : undefined,
      },
    })
    return NextResponse.json({ success: true, block })
  } catch (error) {
    console.error('Error updating blocked slot:', error)
    return NextResponse.json({ error: 'Error al actualizar bloqueo' }, { status: 500 })
  }
}

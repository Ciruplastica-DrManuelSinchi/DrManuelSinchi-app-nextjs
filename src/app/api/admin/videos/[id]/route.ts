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
    const { title, description, youtubeId, category, views, isFeatured, order, isActive } = body

    const updateData: Record<string, unknown> = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (youtubeId !== undefined) updateData.youtubeId = youtubeId
    if (category !== undefined) updateData.category = category
    if (views !== undefined) updateData.views = views
    if (isFeatured !== undefined) updateData.isFeatured = isFeatured
    if (order !== undefined) updateData.order = order
    if (isActive !== undefined) updateData.isActive = isActive

    const video = await prisma.video.update({ where: { id }, data: updateData })
    return NextResponse.json({ success: true, video })
  } catch (error) {
    console.error('Error updating video:', error)
    return NextResponse.json({ error: 'Error al actualizar video' }, { status: 500 })
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

    await prisma.video.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true, message: 'Video eliminado' })
  } catch (error) {
    console.error('Error deleting video:', error)
    return NextResponse.json({ error: 'Error al eliminar video' }, { status: 500 })
  }
}

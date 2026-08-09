import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const category = request.nextUrl.searchParams.get('category')
    const where: Record<string, unknown> = {}
    if (category) where.category = category

    const videos = await prisma.video.findMany({
      where,
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({ videos })
  } catch (error) {
    console.error('Error fetching videos:', error)
    return NextResponse.json({ error: 'Error al obtener videos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, youtubeId, category, views, isFeatured, order, isActive } = body

    if (!title || !youtubeId) {
      return NextResponse.json({ error: 'Título y YouTube ID son requeridos' }, { status: 400 })
    }

    const video = await prisma.video.create({
      data: {
        title,
        description: description || '',
        youtubeId,
        category: category || 'facial',
        views: views || '',
        isFeatured: isFeatured || false,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    })

    return NextResponse.json({ success: true, video })
  } catch (error) {
    console.error('Error creating video:', error)
    return NextResponse.json({ error: 'Error al crear video' }, { status: 500 })
  }
}

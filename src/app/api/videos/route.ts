import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get('category')
    const featured = request.nextUrl.searchParams.get('featured')

    const where: Record<string, unknown> = { isActive: true }
    if (category) where.category = category
    if (featured === 'true') where.isFeatured = true

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

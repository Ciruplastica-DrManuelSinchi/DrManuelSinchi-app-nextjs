import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET /api/procedures/[slug]/media — public, returns DB-managed media for a procedure
export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    const [procedure, featuredCases] = await Promise.all([
      prisma.procedure.findUnique({
        where: { slug },
        select: { infoImage: true, videos: true },
      }),
      prisma.realCase.findMany({
        where: { procedureSlug: slug, isFeatured: true, isActive: true },
        orderBy: { order: 'asc' },
        select: { beforeImage: true, afterImage: true, procedureName: true },
      }),
    ])

    return NextResponse.json({
      infoImage: procedure?.infoImage || null,
      videos: procedure?.videos || null,
      featuredCases: featuredCases.map(c => ({
        before: c.beforeImage,
        after: c.afterImage,
        label: c.procedureName,
      })),
    })
  } catch {
    return NextResponse.json({ infoImage: null, videos: null, featuredCases: [] })
  }
}

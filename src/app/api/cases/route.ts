import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/cases - Obtener casos reales activos (público)
export async function GET() {
  try {
    const cases = await prisma.realCase.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            urlPath: true,
          },
        },
      },
    })

    // Formatear respuesta para el frontend
    const formattedCases = cases.map((c) => ({
      id: c.id,
      procedure: c.procedureName,
      procedureSlug: c.procedureSlug,
      category: c.category.slug,
      categoryLabel: c.category.name,
      categoryPath: c.category.urlPath || c.category.slug,
      patientInfo: c.patientInfo,
      description: c.description,
      beforeImage: c.beforeImage,
      afterImage: c.afterImage,
    }))

    return NextResponse.json({
      cases: formattedCases,
    })
  } catch (error) {
    console.error('Error fetching cases:', error)
    return NextResponse.json(
      { error: 'Error al obtener casos' },
      { status: 500 }
    )
  }
}

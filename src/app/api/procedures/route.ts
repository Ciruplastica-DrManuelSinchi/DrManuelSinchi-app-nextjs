import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/procedures - Obtener procedimientos activos (público)
export async function GET() {
  try {
    const categories = await prisma.procedureCategory.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        procedures: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
          select: {
            id: true,
            name: true,
            slug: true,
            order: true,
          },
        },
      },
    })

    // Transformar a formato plano para el formulario de reservas
    const procedures = categories.flatMap((category) =>
      category.procedures.map((procedure) => ({
        id: procedure.slug, // Usar slug como ID para compatibilidad
        name: procedure.name,
        category: category.slug,
        categoryLabel: category.name,
      }))
    )

    return NextResponse.json({
      procedures,
      categories: categories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        procedureCount: c.procedures.length,
      })),
    })
  } catch (error) {
    console.error('Error fetching procedures:', error)
    return NextResponse.json(
      { error: 'Error al obtener procedimientos' },
      { status: 500 }
    )
  }
}

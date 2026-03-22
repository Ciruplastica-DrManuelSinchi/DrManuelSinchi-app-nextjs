import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Forzar renderizado dinámico para esta ruta
export const dynamic = 'force-dynamic'

const createProcedureSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  slug: z.string().min(1, 'El slug es requerido').regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  categoryId: z.string().min(1, 'La categoría es requerida'),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
})

// GET /api/admin/procedures - Listar procedimientos
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const search = searchParams.get('search')
    const isActive = searchParams.get('isActive')

    const where: Record<string, unknown> = {}

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (isActive !== null && isActive !== '') {
      where.isActive = isActive === 'true'
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
      ]
    }

    const procedures = await prisma.procedure.findMany({
      where,
      orderBy: [
        { category: { order: 'asc' } },
        { order: 'asc' },
      ],
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    })

    // Obtener categorías para el filtro
    const categories = await prisma.procedureCategory.findMany({
      orderBy: { order: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    })

    return NextResponse.json({
      procedures,
      categories,
    })
  } catch (error) {
    console.error('Error fetching procedures:', error)
    return NextResponse.json(
      { error: 'Error al obtener procedimientos' },
      { status: 500 }
    )
  }
}

// POST /api/admin/procedures - Crear procedimiento
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const result = createProcedureSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const { name, slug, categoryId, order, isActive } = result.data

    // Verificar que el slug no exista
    const existing = await prisma.procedure.findUnique({
      where: { slug },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Ya existe un procedimiento con ese slug' },
        { status: 400 }
      )
    }

    // Verificar que la categoría existe
    const category = await prisma.procedureCategory.findUnique({
      where: { id: categoryId },
    })

    if (!category) {
      return NextResponse.json(
        { error: 'La categoría no existe' },
        { status: 400 }
      )
    }

    const procedure = await prisma.procedure.create({
      data: {
        name,
        slug,
        categoryId,
        order: order ?? 0,
        isActive: isActive ?? true,
      },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
    })

    return NextResponse.json(
      { success: true, procedure },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating procedure:', error)
    return NextResponse.json(
      { error: 'Error al crear procedimiento' },
      { status: 500 }
    )
  }
}

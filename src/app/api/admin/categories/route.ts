import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createCategorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  slug: z.string().min(1, 'El slug es requerido').regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  description: z.string().optional(),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
})

// GET /api/admin/categories - Listar categorías
export async function GET() {
  try {
    const session = await auth()

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const categories = await prisma.procedureCategory.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { procedures: true },
        },
      },
    })

    return NextResponse.json({
      categories: categories.map((c) => ({
        ...c,
        procedureCount: c._count.procedures,
      })),
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Error al obtener categorías' },
      { status: 500 }
    )
  }
}

// POST /api/admin/categories - Crear categoría
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const result = createCategorySchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const { name, slug, description, order, isActive } = result.data

    // Verificar que el slug no exista
    const existing = await prisma.procedureCategory.findUnique({
      where: { slug },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Ya existe una categoría con ese slug' },
        { status: 400 }
      )
    }

    const category = await prisma.procedureCategory.create({
      data: {
        name,
        slug,
        description,
        order: order ?? 0,
        isActive: isActive ?? true,
      },
    })

    return NextResponse.json(
      { success: true, category },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Error al crear categoría' },
      { status: 500 }
    )
  }
}

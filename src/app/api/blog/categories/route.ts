import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createCategorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  slug: z.string().min(1, 'El slug es requerido'),
  description: z.string().optional(),
  color: z.string().optional(),
  order: z.number().optional(),
})

// GET /api/blog/categories - Obtener categorías
export async function GET() {
  try {
    const categories = await prisma.blogCategory.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: {
            posts: {
              where: { status: 'PUBLISHED' }
            }
          }
        }
      }
    })

    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Error al obtener categorías' }, { status: 500 })
  }
}

// POST /api/blog/categories - Crear categoría (admin)
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'ADMIN') {
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

    const { name, slug, description, color, order } = result.data

    // Verificar slug único
    const existingCategory = await prisma.blogCategory.findUnique({ where: { slug } })
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Ya existe una categoría con este slug' },
        { status: 409 }
      )
    }

    const category = await prisma.blogCategory.create({
      data: {
        name,
        slug,
        description,
        color,
        order: order || 0,
      }
    })

    return NextResponse.json({ success: true, category }, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json({ error: 'Error al crear categoría' }, { status: 500 })
  }
}

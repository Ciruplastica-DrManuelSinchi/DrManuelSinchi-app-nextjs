import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Forzar renderizado dinámico para esta ruta
export const dynamic = 'force-dynamic'

// GET /api/admin/categories/[id] - Obtener categoría
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const category = await prisma.procedureCategory.findUnique({
      where: { id },
      include: {
        procedures: {
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({ category })
  } catch (error) {
    console.error('Error fetching category:', error)
    return NextResponse.json(
      { error: 'Error al obtener categoría' },
      { status: 500 }
    )
  }
}

// PATCH /api/admin/categories/[id] - Actualizar categoría
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { name, slug, description, order, isActive } = body

    // Verificar que la categoría existe
    const existing = await prisma.procedureCategory.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      )
    }

    // Si cambia el slug, verificar que no exista
    if (slug && slug !== existing.slug) {
      const slugExists = await prisma.procedureCategory.findUnique({
        where: { slug },
      })
      if (slugExists) {
        return NextResponse.json(
          { error: 'Ya existe una categoría con ese slug' },
          { status: 400 }
        )
      }
    }

    const updateData: Record<string, unknown> = {}
    if (name !== undefined) updateData.name = name
    if (slug !== undefined) updateData.slug = slug
    if (description !== undefined) updateData.description = description
    if (order !== undefined) updateData.order = order
    if (isActive !== undefined) updateData.isActive = isActive

    const category = await prisma.procedureCategory.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      category,
    })
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { error: 'Error al actualizar categoría' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/categories/[id] - Eliminar categoría
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Verificar que la categoría existe
    const existing = await prisma.procedureCategory.findUnique({
      where: { id },
      include: {
        _count: { select: { procedures: true } },
      },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      )
    }

    // Advertir si tiene procedimientos
    if (existing._count.procedures > 0) {
      return NextResponse.json(
        { error: `No se puede eliminar. Esta categoría tiene ${existing._count.procedures} procedimientos asociados.` },
        { status: 400 }
      )
    }

    await prisma.procedureCategory.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Categoría eliminada',
    })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: 'Error al eliminar categoría' },
      { status: 500 }
    )
  }
}

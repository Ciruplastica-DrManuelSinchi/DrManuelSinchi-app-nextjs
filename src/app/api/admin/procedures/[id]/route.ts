import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/admin/procedures/[id] - Obtener procedimiento
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

    const procedure = await prisma.procedure.findUnique({
      where: { id },
      include: {
        category: true,
      },
    })

    if (!procedure) {
      return NextResponse.json(
        { error: 'Procedimiento no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ procedure })
  } catch (error) {
    console.error('Error fetching procedure:', error)
    return NextResponse.json(
      { error: 'Error al obtener procedimiento' },
      { status: 500 }
    )
  }
}

// PATCH /api/admin/procedures/[id] - Actualizar procedimiento
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
    const { name, slug, categoryId, order, isActive } = body

    // Verificar que el procedimiento existe
    const existing = await prisma.procedure.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Procedimiento no encontrado' },
        { status: 404 }
      )
    }

    // Si cambia el slug, verificar que no exista
    if (slug && slug !== existing.slug) {
      const slugExists = await prisma.procedure.findUnique({
        where: { slug },
      })
      if (slugExists) {
        return NextResponse.json(
          { error: 'Ya existe un procedimiento con ese slug' },
          { status: 400 }
        )
      }
    }

    // Si cambia la categoría, verificar que existe
    if (categoryId && categoryId !== existing.categoryId) {
      const category = await prisma.procedureCategory.findUnique({
        where: { id: categoryId },
      })
      if (!category) {
        return NextResponse.json(
          { error: 'La categoría no existe' },
          { status: 400 }
        )
      }
    }

    const updateData: Record<string, unknown> = {}
    if (name !== undefined) updateData.name = name
    if (slug !== undefined) updateData.slug = slug
    if (categoryId !== undefined) updateData.categoryId = categoryId
    if (order !== undefined) updateData.order = order
    if (isActive !== undefined) updateData.isActive = isActive

    const procedure = await prisma.procedure.update({
      where: { id },
      data: updateData,
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
    })

    return NextResponse.json({
      success: true,
      procedure,
    })
  } catch (error) {
    console.error('Error updating procedure:', error)
    return NextResponse.json(
      { error: 'Error al actualizar procedimiento' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/procedures/[id] - Eliminar procedimiento
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

    // Verificar que el procedimiento existe
    const existing = await prisma.procedure.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Procedimiento no encontrado' },
        { status: 404 }
      )
    }

    await prisma.procedure.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Procedimiento eliminado',
    })
  } catch (error) {
    console.error('Error deleting procedure:', error)
    return NextResponse.json(
      { error: 'Error al eliminar procedimiento' },
      { status: 500 }
    )
  }
}

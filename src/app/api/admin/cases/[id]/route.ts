import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Forzar renderizado dinámico para esta ruta
export const dynamic = 'force-dynamic'

// GET /api/admin/cases/[id] - Obtener caso
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    const { id } = params

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const realCase = await prisma.realCase.findUnique({
      where: { id },
      include: {
        category: true,
      },
    })

    if (!realCase) {
      return NextResponse.json(
        { error: 'Caso no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ case: realCase })
  } catch (error) {
    console.error('Error fetching case:', error)
    return NextResponse.json(
      { error: 'Error al obtener caso' },
      { status: 500 }
    )
  }
}

// PATCH /api/admin/cases/[id] - Actualizar caso
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    const { id } = params

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const {
      procedureName,
      procedureSlug,
      categoryId,
      patientInfo,
      description,
      beforeImage,
      afterImage,
      order,
      isActive,
    } = body

    // Verificar que el caso existe
    const existing = await prisma.realCase.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Caso no encontrado' },
        { status: 404 }
      )
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
    if (procedureName !== undefined) updateData.procedureName = procedureName
    if (procedureSlug !== undefined) updateData.procedureSlug = procedureSlug
    if (categoryId !== undefined) updateData.categoryId = categoryId
    if (patientInfo !== undefined) updateData.patientInfo = patientInfo
    if (description !== undefined) updateData.description = description
    if (beforeImage !== undefined) updateData.beforeImage = beforeImage
    if (afterImage !== undefined) updateData.afterImage = afterImage
    if (order !== undefined) updateData.order = order
    if (isActive !== undefined) updateData.isActive = isActive

    const realCase = await prisma.realCase.update({
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
      case: realCase,
    })
  } catch (error) {
    console.error('Error updating case:', error)
    return NextResponse.json(
      { error: 'Error al actualizar caso' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/cases/[id] - Eliminar caso
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    const { id } = params

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Verificar que el caso existe
    const existing = await prisma.realCase.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Caso no encontrado' },
        { status: 404 }
      )
    }

    await prisma.realCase.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Caso eliminado',
    })
  } catch (error) {
    console.error('Error deleting case:', error)
    return NextResponse.json(
      { error: 'Error al eliminar caso' },
      { status: 500 }
    )
  }
}

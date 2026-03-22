import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Forzar renderizado dinámico para esta ruta
export const dynamic = 'force-dynamic'

// GET /api/admin/cases - Listar todos los casos
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const categoryId = searchParams.get('categoryId')
    const isActive = searchParams.get('isActive')

    const where: Record<string, unknown> = {}

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (isActive !== null && isActive !== '') {
      where.isActive = isActive === 'true'
    }

    const cases = await prisma.realCase.findMany({
      where,
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

    return NextResponse.json({ cases })
  } catch (error) {
    console.error('Error fetching cases:', error)
    return NextResponse.json(
      { error: 'Error al obtener casos' },
      { status: 500 }
    )
  }
}

// POST /api/admin/cases - Crear nuevo caso
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

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

    // Validaciones
    if (!procedureName || !procedureSlug || !categoryId || !patientInfo || !description) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
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

    const realCase = await prisma.realCase.create({
      data: {
        procedureName,
        procedureSlug,
        categoryId,
        patientInfo,
        description,
        beforeImage: beforeImage || '',
        afterImage: afterImage || '',
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
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
    console.error('Error creating case:', error)
    return NextResponse.json(
      { error: 'Error al crear caso' },
      { status: 500 }
    )
  }
}

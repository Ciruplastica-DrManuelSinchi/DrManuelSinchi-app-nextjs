import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createPostSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  slug: z.string().min(1, 'El slug es requerido'),
  excerpt: z.string().min(1, 'El extracto es requerido'),
  content: z.string().min(1, 'El contenido es requerido'),
  coverImage: z.string().optional(),
  categoryId: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  featured: z.boolean().optional(),
})

// Calcular tiempo de lectura (palabras / 200 palabras por minuto)
function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '') // Remove HTML tags
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / 200)
}

// GET /api/blog/posts - Obtener posts (público o admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')
    const admin = searchParams.get('admin') === 'true'

    // Si es admin, verificar autenticación
    if (admin) {
      const session = await auth()
      if (!session?.user || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
      }
    }

    const where: Record<string, unknown> = {}

    // Si no es admin, solo mostrar publicados
    if (!admin) {
      where.status = 'PUBLISHED'
    } else if (status) {
      where.status = status
    }

    if (category) {
      where.categoryId = category
    }

    if (featured === 'true') {
      where.featured = true
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        take: limit,
        skip: (page - 1) * limit,
        include: {
          category: {
            select: { id: true, name: true, slug: true, color: true }
          }
        }
      }),
      prisma.blogPost.count({ where })
    ])

    return NextResponse.json({
      posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Error al obtener posts' }, { status: 500 })
  }
}

// POST /api/blog/posts - Crear nuevo post (admin)
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const result = createPostSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      categoryId,
      metaTitle,
      metaDescription,
      status,
      featured,
    } = result.data

    // Verificar slug único
    const existingPost = await prisma.blogPost.findUnique({ where: { slug } })
    if (existingPost) {
      return NextResponse.json(
        { error: 'Ya existe un post con este slug' },
        { status: 409 }
      )
    }

    const readingTime = calculateReadingTime(content)
    const publishedAt = status === 'PUBLISHED' ? new Date() : null

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        categoryId: categoryId || null,
        metaTitle,
        metaDescription,
        status: status || 'DRAFT',
        featured: featured || false,
        publishedAt,
        readingTime,
      },
      include: {
        category: true
      }
    })

    return NextResponse.json({ success: true, post }, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Error al crear post' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updatePostSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  coverImage: z.string().nullable().optional(),
  categoryId: z.string().nullable().optional(),
  metaTitle: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  featured: z.boolean().optional(),
})

function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '')
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / 200)
}

// GET /api/blog/posts/[id] - Obtener post por ID o slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const bySlug = searchParams.get('bySlug') === 'true'
    const incrementViews = searchParams.get('views') === 'true'

    const post = await prisma.blogPost.findFirst({
      where: bySlug ? { slug: id } : { id },
      include: {
        category: {
          select: { id: true, name: true, slug: true, color: true }
        }
      }
    })

    if (!post) {
      return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 })
    }

    // Si es público y no está publicado, no mostrar
    const session = await auth()
    const isAdmin = session?.user?.role === 'ADMIN'

    if (!isAdmin && post.status !== 'PUBLISHED') {
      return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 })
    }

    // Incrementar vistas si se solicita
    if (incrementViews && post.status === 'PUBLISHED') {
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { views: { increment: 1 } }
      })
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json({ error: 'Error al obtener post' }, { status: 500 })
  }
}

// PUT /api/blog/posts/[id] - Actualizar post (admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const result = updatePostSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const existingPost = await prisma.blogPost.findUnique({ where: { id } })
    if (!existingPost) {
      return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 })
    }

    const data = result.data

    // Si cambia el slug, verificar que sea único
    if (data.slug && data.slug !== existingPost.slug) {
      const slugExists = await prisma.blogPost.findFirst({
        where: { slug: data.slug, id: { not: id } }
      })
      if (slugExists) {
        return NextResponse.json(
          { error: 'Ya existe un post con este slug' },
          { status: 409 }
        )
      }
    }

    // Calcular tiempo de lectura si cambia el contenido
    if (data.content) {
      (data as Record<string, unknown>).readingTime = calculateReadingTime(data.content)
    }

    // Si se publica por primera vez, establecer publishedAt
    if (data.status === 'PUBLISHED' && existingPost.status !== 'PUBLISHED') {
      (data as Record<string, unknown>).publishedAt = new Date()
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data,
      include: {
        category: true
      }
    })

    return NextResponse.json({ success: true, post })
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json({ error: 'Error al actualizar post' }, { status: 500 })
  }
}

// DELETE /api/blog/posts/[id] - Eliminar post (admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id } = await params

    const post = await prisma.blogPost.findUnique({ where: { id } })
    if (!post) {
      return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 })
    }

    await prisma.blogPost.delete({ where: { id } })

    return NextResponse.json({ success: true, message: 'Post eliminado' })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ error: 'Error al eliminar post' }, { status: 500 })
  }
}

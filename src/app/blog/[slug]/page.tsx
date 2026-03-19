import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Calendar, Clock, ArrowLeft, User, Eye, Share2 } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug, status: 'PUBLISHED' }
  })

  if (!post) {
    return { title: 'Post no encontrado' }
  }

  return {
    title: post.metaTitle || `${post.title} | Blog - Dr. Manuel Sinchi`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.authorName],
    },
  }
}

export const revalidate = 60

async function getPost(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      category: {
        select: { id: true, name: true, slug: true, color: true }
      }
    }
  })
  return post
}

async function getRelatedPosts(categoryId: string | null, currentPostId: string) {
  const posts = await prisma.blogPost.findMany({
    where: {
      status: 'PUBLISHED',
      id: { not: currentPostId },
      ...(categoryId && { categoryId })
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
    include: {
      category: {
        select: { name: true, color: true }
      }
    }
  })
  return posts
}

function formatDate(date: Date | null) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Incrementar vistas
async function incrementViews(postId: string) {
  await prisma.blogPost.update({
    where: { id: postId },
    data: { views: { increment: 1 } }
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post || post.status !== 'PUBLISHED') {
    notFound()
  }

  // Incrementar vistas
  incrementViews(post.id)

  const relatedPosts = await getRelatedPosts(post.categoryId, post.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <section className="bg-primary pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Link>

            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.authorName}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </span>
              {post.readingTime && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} min de lectura
                </span>
              )}
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {post.views} vistas
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-card p-8 md:p-12">
              {/* Categoría */}
              {post.category && (
                <div className="mb-6">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: post.category.color || '#391142',
                      color: '#ffffff'
                    }}
                  >
                    {post.category.name}
                  </span>
                </div>
              )}

              {/* Imagen de portada */}
              {post.coverImage && (
                <div className="relative w-full h-64 md:h-96 mb-8 rounded-2xl overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Extracto */}
              <p className="text-xl text-gray-600 mb-8 font-medium leading-relaxed border-l-4 border-primary pl-4">
                {post.excerpt}
              </p>

              {/* Contenido */}
              <div
                className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-dark prose-a:text-primary prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Compartir */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 text-sm">Compartir:</span>
                    <div className="flex gap-2">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://ciruplastica.pe/blog/${post.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                        aria-label="Compartir en Facebook"
                      >
                        <Share2 className="w-4 h-4" />
                      </a>
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - https://ciruplastica.pe/blog/${post.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                        aria-label="Compartir en WhatsApp"
                      >
                        <Share2 className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <Link
                    href="/reservar"
                    className="btn-primary"
                  >
                    Reservar consulta
                  </Link>
                </div>
              </div>
            </div>

            {/* Posts relacionados */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-display font-bold text-dark mb-8">
                  Artículos relacionados
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <article className="bg-white rounded-2xl shadow-card overflow-hidden h-full">
                        <div className="relative h-40">
                          {relatedPost.coverImage ? (
                            <Image
                              src={relatedPost.coverImage}
                              alt={relatedPost.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                              <span className="text-3xl">📝</span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-dark group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-2">
                            {formatDate(relatedPost.publishedAt)}
                          </p>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

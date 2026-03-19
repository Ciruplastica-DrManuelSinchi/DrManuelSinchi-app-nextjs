import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { Calendar, Clock, ArrowRight, Tag, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | Ciruplástica - Dr. Manuel Sinchi',
  description: 'Artículos y consejos sobre cirugía plástica, medicina estética y cuidados postoperatorios del Dr. Manuel Sinchi.',
}

export const revalidate = 60 // Revalidar cada minuto

interface Props {
  searchParams: Promise<{ categoria?: string; buscar?: string }>
}

async function getPosts(categorySlug?: string, searchQuery?: string) {
  const posts = await prisma.blogPost.findMany({
    where: {
      status: 'PUBLISHED',
      ...(categorySlug && {
        category: {
          slug: categorySlug
        }
      }),
      ...(searchQuery && {
        OR: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          { excerpt: { contains: searchQuery, mode: 'insensitive' } },
          { content: { contains: searchQuery, mode: 'insensitive' } },
        ]
      })
    },
    orderBy: { publishedAt: 'desc' },
    include: {
      category: {
        select: { id: true, name: true, slug: true, color: true }
      }
    }
  })
  return posts
}

async function getCategories() {
  const categories = await prisma.blogCategory.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
    include: {
      _count: {
        select: {
          posts: { where: { status: 'PUBLISHED' } }
        }
      }
    }
  })
  return categories
}

function formatDate(date: Date | null) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams
  const categorySlug = params.categoria
  const searchQuery = params.buscar

  const [posts, categories] = await Promise.all([
    getPosts(categorySlug, searchQuery),
    getCategories()
  ])

  const currentCategory = categorySlug
    ? categories.find(c => c.slug === categorySlug)
    : null

  const featuredPost = posts.find(p => p.featured) || posts[0]
  const otherPosts = posts.filter(p => p.id !== featuredPost?.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <section className="bg-primary pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              {currentCategory ? currentCategory.name : 'Blog'}
            </h1>
            <p className="text-lg text-white/80">
              {currentCategory
                ? `Artículos sobre ${currentCategory.name.toLowerCase()}`
                : 'Artículos, consejos y novedades sobre cirugía plástica y medicina estética'
              }
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Barra de búsqueda */}
            <form className="mb-8 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="buscar"
                  placeholder="Buscar artículos..."
                  defaultValue={searchQuery || ''}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                {categorySlug && (
                  <input type="hidden" name="categoria" value={categorySlug} />
                )}
              </div>
            </form>

            {/* Categorías */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-12 justify-center">
                <Link
                  href="/blog"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    !categorySlug
                      ? 'bg-primary text-white'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary'
                  }`}
                >
                  Todos
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/blog?categoria=${category.slug}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      categorySlug === category.slug
                        ? 'text-white'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary'
                    }`}
                    style={{
                      backgroundColor: categorySlug === category.slug ? (category.color || '#391142') : undefined,
                      borderColor: categorySlug !== category.slug ? (category.color || undefined) : undefined
                    }}
                  >
                    {category.name}
                    <span className={`ml-1 ${categorySlug === category.slug ? 'text-white/70' : 'text-gray-400'}`}>
                      ({category._count.posts})
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {/* Mensaje de búsqueda activa */}
            {searchQuery && (
              <div className="mb-8 text-center">
                <p className="text-gray-600">
                  Resultados para: <span className="font-semibold text-primary">&quot;{searchQuery}&quot;</span>
                  {currentCategory && (
                    <span> en <span className="font-semibold">{currentCategory.name}</span></span>
                  )}
                </p>
                <Link
                  href={categorySlug ? `/blog?categoria=${categorySlug}` : '/blog'}
                  className="text-sm text-primary hover:underline mt-1 inline-block"
                >
                  Limpiar búsqueda
                </Link>
              </div>
            )}

            {posts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tag className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-600 mb-2">
                  {searchQuery ? 'Sin resultados' : 'Próximamente'}
                </h2>
                <p className="text-gray-500 mb-4">
                  {searchQuery
                    ? `No encontramos artículos que coincidan con "${searchQuery}"`
                    : 'Estamos preparando contenido interesante para ti.'
                  }
                </p>
                {(searchQuery || categorySlug) && (
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    Ver todos los artículos
                  </Link>
                )}
              </div>
            ) : (
              <>
                {/* Post Destacado */}
                {featuredPost && (
                  <Link href={`/blog/${featuredPost.slug}`} className="block mb-12 group">
                    <article className="bg-white rounded-3xl shadow-card overflow-hidden">
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="relative h-64 md:h-auto min-h-[300px]">
                          {featuredPost.coverImage ? (
                            <Image
                              src={featuredPost.coverImage}
                              alt={featuredPost.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              <span className="text-6xl">📝</span>
                            </div>
                          )}
                          {featuredPost.featured && (
                            <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-medium">
                              Destacado
                            </div>
                          )}
                        </div>
                        <div className="p-8 flex flex-col justify-center">
                          {featuredPost.category && (
                            <span
                              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 w-fit"
                              style={{
                                backgroundColor: `${featuredPost.category.color}20` || '#f3f4f6',
                                color: featuredPost.category.color || '#6b7280'
                              }}
                            >
                              {featuredPost.category.name}
                            </span>
                          )}
                          <h2 className="text-2xl md:text-3xl font-display font-bold text-dark mb-4 group-hover:text-primary transition-colors">
                            {featuredPost.title}
                          </h2>
                          <p className="text-gray-600 mb-6 line-clamp-3">
                            {featuredPost.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(featuredPost.publishedAt)}
                            </span>
                            {featuredPost.readingTime && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {featuredPost.readingTime} min de lectura
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                )}

                {/* Grid de Posts */}
                {otherPosts.length > 0 && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherPosts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                        <article className="bg-white rounded-2xl shadow-card overflow-hidden h-full flex flex-col">
                          <div className="relative h-48">
                            {post.coverImage ? (
                              <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                                <span className="text-4xl">📝</span>
                              </div>
                            )}
                          </div>
                          <div className="p-6 flex flex-col flex-1">
                            {post.category && (
                              <span
                                className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-3 w-fit"
                                style={{
                                  backgroundColor: `${post.category.color}20` || '#f3f4f6',
                                  color: post.category.color || '#6b7280'
                                }}
                              >
                                {post.category.name}
                              </span>
                            )}
                            <h3 className="text-lg font-semibold text-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(post.publishedAt)}
                              </span>
                              <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                                Leer más
                                <ArrowRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Contador de resultados */}
                <div className="mt-12 text-center text-sm text-gray-500">
                  Mostrando {posts.length} artículo{posts.length !== 1 ? 's' : ''}
                  {currentCategory && ` en ${currentCategory.name}`}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

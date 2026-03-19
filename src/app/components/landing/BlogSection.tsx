import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { Calendar, ArrowRight } from 'lucide-react'

async function getLatestPosts() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take: 3,
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

export default async function BlogSection() {
  const posts = await getLatestPosts()

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Blog
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-4">
            Artículos y Consejos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Información útil sobre cirugía plástica, medicina estética y cuidados para tu bienestar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <article className="bg-white rounded-2xl shadow-card overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-52">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-4xl">📝</span>
                    </div>
                  )}
                  {post.category && (
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: post.category.color || '#391142' }}
                      >
                        {post.category.name}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                      Leer más
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Ver todos los artículos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

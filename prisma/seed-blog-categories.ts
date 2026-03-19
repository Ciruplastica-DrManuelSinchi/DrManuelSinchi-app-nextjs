import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const defaultCategories = [
  {
    name: 'Cirugía Plástica',
    slug: 'cirugia-plastica',
    description: 'Artículos sobre procedimientos de cirugía plástica',
    color: '#391142',
    order: 1,
  },
  {
    name: 'Medicina Estética',
    slug: 'medicina-estetica',
    description: 'Tratamientos no invasivos y medicina estética',
    color: '#d4a853',
    order: 2,
  },
  {
    name: 'Cuidados Postoperatorios',
    slug: 'cuidados-postoperatorios',
    description: 'Consejos y guías para el cuidado después de cirugía',
    color: '#2563eb',
    order: 3,
  },
  {
    name: 'Consejos de Belleza',
    slug: 'consejos-belleza',
    description: 'Tips y recomendaciones para el cuidado personal',
    color: '#ec4899',
    order: 4,
  },
  {
    name: 'Noticias',
    slug: 'noticias',
    description: 'Novedades y actualizaciones de la clínica',
    color: '#10b981',
    order: 5,
  },
]

async function main() {
  console.log('Seeding blog categories...')

  for (const category of defaultCategories) {
    const existing = await prisma.blogCategory.findUnique({
      where: { slug: category.slug },
    })

    if (!existing) {
      await prisma.blogCategory.create({
        data: category,
      })
      console.log(`Created category: ${category.name}`)
    } else {
      console.log(`Category already exists: ${category.name}`)
    }
  }

  console.log('Done!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

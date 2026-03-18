import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Datos de categorías
const categories = [
  {
    name: 'Cirugía Plástica Facial',
    slug: 'facial',
    urlPath: 'cirugia-plastica-facial',
    description: 'Procedimientos estéticos y reconstructivos del rostro',
    order: 1,
  },
  {
    name: 'Cirugía Plástica Corporal',
    slug: 'corporal',
    urlPath: 'cirugia-plastica-corporal',
    description: 'Procedimientos estéticos y reconstructivos del cuerpo',
    order: 2,
  },
  {
    name: 'Medicina Estética',
    slug: 'estetica',
    urlPath: 'medicina-estetica',
    description: 'Tratamientos no quirúrgicos de rejuvenecimiento',
    order: 3,
  },
  {
    name: 'Cirugía Reconstructiva',
    slug: 'reconstructiva',
    urlPath: 'cirugia-reconstructiva',
    description: 'Procedimientos de reconstrucción y reparación',
    order: 4,
  },
]

// Datos de procedimientos por categoría
const proceduresByCategory: Record<string, Array<{ name: string; slug: string; order: number }>> = {
  facial: [
    { name: 'Rinoplastia', slug: 'rinoplastia', order: 1 },
    { name: 'Blefaroplastia', slug: 'blefaroplastia', order: 2 },
    { name: 'Lifting Facial', slug: 'lifting-facial', order: 3 },
    { name: 'Otoplastia', slug: 'otoplastia', order: 4 },
    { name: 'Mentoplastia', slug: 'mentoplastia', order: 5 },
    { name: 'Bichectomía', slug: 'bichectomia', order: 6 },
    { name: 'Liposucción de Papada', slug: 'lipo-papada', order: 7 },
    { name: 'Rellenos Faciales', slug: 'rellenos-faciales', order: 8 },
    { name: 'Aumento de Pómulos', slug: 'aumento-pomulos', order: 9 },
    { name: 'Marcación Mandibular', slug: 'marcacion-mandibular', order: 10 },
    { name: 'Afinamiento Facial', slug: 'afinamiento-facial', order: 11 },
    { name: 'Perfiloplastia', slug: 'perfiloplastia', order: 12 },
    { name: 'Extracción de Lunares', slug: 'extraccion-lunares', order: 13 },
  ],
  corporal: [
    { name: 'Lipoescultura', slug: 'lipo-escultura', order: 1 },
    { name: 'Abdominoplastia', slug: 'abdominoplastia', order: 2 },
    { name: 'Lipoabdominoplastia', slug: 'lipoabdominoplastia', order: 3 },
    { name: 'Mamoplastia de Aumento', slug: 'mamoplastia-aumento', order: 4 },
    { name: 'Mamoplastia de Reducción', slug: 'mamoplastia-reduccion', order: 5 },
    { name: 'Mastopexia', slug: 'mastopexia', order: 6 },
    { name: 'Gluteoplastia', slug: 'gluteoplastia', order: 7 },
    { name: 'Mommy Makeover', slug: 'mommy-makeover', order: 8 },
    { name: 'Ginecomastia', slug: 'ginecomastia', order: 9 },
    { name: 'Cirugía de Género', slug: 'cirugia-genero', order: 10 },
    { name: 'Reconstrucción de Mama', slug: 'reconstruccion-mama', order: 11 },
  ],
  estetica: [
    { name: 'Botox', slug: 'botox', order: 1 },
    { name: 'Ácido Hialurónico', slug: 'acido-hialuronico', order: 2 },
    { name: 'Relleno de Labios', slug: 'rellenos-labios', order: 3 },
    { name: 'Bioestimuladores', slug: 'bioestimuladores', order: 4 },
    { name: 'Plasma Rico en Plaquetas', slug: 'plasma-rico-plaquetas', order: 5 },
    { name: 'Radiofrecuencia y Ultrasonido', slug: 'radiofrecuencia-ultrasonido', order: 6 },
    { name: 'Láser Facial', slug: 'laser-facial', order: 7 },
    { name: 'Vitamina C Endovenosa', slug: 'vitamina-c-endovenosa', order: 8 },
    { name: 'Tratamientos Postoperatorios', slug: 'tratamientos-postoperatorios', order: 9 },
  ],
  reconstructiva: [
    { name: 'Tratamiento de Cicatrices', slug: 'cicatrices', order: 1 },
    { name: 'Quemaduras', slug: 'quemaduras', order: 2 },
    { name: 'Heridas y Úlceras', slug: 'heridas-ulceras', order: 3 },
    { name: 'Tumores y Carcinomas', slug: 'tumores-carcinomas', order: 4 },
    { name: 'Retiro de Biopolímeros', slug: 'retiro-biopolimeros', order: 5 },
  ],
}

// Datos de casos reales (antes/después)
interface RealCaseData {
  procedureName: string
  procedureSlug: string
  categorySlug: string
  patientInfo: string
  description: string
  beforeImage: string
  afterImage: string
  order: number
}

const realCasesData: RealCaseData[] = [
  // ==================== FACIAL ====================
  {
    procedureName: 'Rinoplastia',
    procedureSlug: 'rinoplastia',
    categorySlug: 'facial',
    patientInfo: 'Paciente femenina, 28 años',
    description: 'Corrección de dorso y punta nasal para lograr un perfil más armonioso y natural.',
    beforeImage: '/images/before-after/rinoplastia-before.jpg',
    afterImage: '/images/before-after/rinoplastia-after.png',
    order: 1,
  },
  {
    procedureName: 'Rinoplastia',
    procedureSlug: 'rinoplastia',
    categorySlug: 'facial',
    patientInfo: 'Paciente masculino, 32 años',
    description: 'Rinoseptoplastia para mejorar estética y respiración.',
    beforeImage: '/images/before-after/rinoplastia-before.jpg',
    afterImage: '/images/before-after/rinoplastia-after.png',
    order: 2,
  },
  {
    procedureName: 'Blefaroplastia',
    procedureSlug: 'blefaroplastia',
    categorySlug: 'facial',
    patientInfo: 'Paciente femenina, 45 años',
    description: 'Blefaroplastia superior e inferior para rejuvenecer la mirada.',
    beforeImage: '/images/before-after/blefaroplastia-before.jpg',
    afterImage: '/images/before-after/blefaroplastia-after.jpg',
    order: 3,
  },
  {
    procedureName: 'Lifting Facial',
    procedureSlug: 'lifting-facial',
    categorySlug: 'facial',
    patientInfo: 'Paciente femenina, 52 años',
    description: 'Lifting facial y cervical con técnica SMAS para rejuvenecimiento completo.',
    beforeImage: '/images/before-after/lifting-facial-before.jpg',
    afterImage: '/images/before-after/lifting-facial-after.jpg',
    order: 4,
  },
  {
    procedureName: 'Bichectomía',
    procedureSlug: 'bichectomia',
    categorySlug: 'facial',
    patientInfo: 'Paciente femenina, 26 años',
    description: 'Afinamiento facial mediante extracción de bolsas de Bichat.',
    beforeImage: '/images/before-after/bichectomia-before.jpg',
    afterImage: '/images/before-after/bichectomia-after.jpg',
    order: 5,
  },

  // ==================== CORPORAL ====================
  {
    procedureName: 'Lipoescultura',
    procedureSlug: 'lipo-escultura',
    categorySlug: 'corporal',
    patientInfo: 'Paciente femenina, 34 años',
    description: 'Lipoescultura HD de abdomen, flancos y espalda con definición muscular.',
    beforeImage: '/images/before-after/lipoescultura-before.jpg',
    afterImage: '/images/before-after/lipoescultura-after.jpg',
    order: 6,
  },
  {
    procedureName: 'Abdominoplastia',
    procedureSlug: 'abdominoplastia',
    categorySlug: 'corporal',
    patientInfo: 'Paciente femenina, 38 años',
    description: 'Abdominoplastia completa post-embarazo con reparación de diástasis.',
    beforeImage: '/images/before-after/abdominoplastia-before.jpg',
    afterImage: '/images/before-after/abdominoplastia-after.jpg',
    order: 7,
  },
  {
    procedureName: 'Mamoplastia de Aumento',
    procedureSlug: 'mamoplastia-aumento',
    categorySlug: 'corporal',
    patientInfo: 'Paciente femenina, 29 años',
    description: 'Aumento mamario con implantes de silicona perfil alto, 350cc.',
    beforeImage: '/images/before-after/mamoplastia-before.jpg',
    afterImage: '/images/before-after/mamoplastia-after.jpg',
    order: 8,
  },
  {
    procedureName: 'Gluteoplastia',
    procedureSlug: 'gluteoplastia',
    categorySlug: 'corporal',
    patientInfo: 'Paciente femenina, 31 años',
    description: 'Aumento de glúteos con transferencia de grasa (BBL).',
    beforeImage: '/images/before-after/gluteoplastia-before.jpg',
    afterImage: '/images/before-after/gluteoplastia-after.jpg',
    order: 9,
  },
  {
    procedureName: 'Mommy Makeover',
    procedureSlug: 'mommy-makeover',
    categorySlug: 'corporal',
    patientInfo: 'Paciente femenina, 36 años',
    description: 'Combinación de abdominoplastia, liposucción y mastopexia.',
    beforeImage: '/images/before-after/mommy-makeover-before.jpg',
    afterImage: '/images/before-after/mommy-makeover-after.jpg',
    order: 10,
  },

  // ==================== ESTÉTICA ====================
  {
    procedureName: 'Botox',
    procedureSlug: 'botox',
    categorySlug: 'estetica',
    patientInfo: 'Paciente femenina, 42 años',
    description: 'Aplicación de toxina botulínica en frente, entrecejo y patas de gallo.',
    beforeImage: '/images/before-after/botox-before.jpg',
    afterImage: '/images/before-after/botox-after.jpg',
    order: 11,
  },
  {
    procedureName: 'Ácido Hialurónico',
    procedureSlug: 'acido-hialuronico',
    categorySlug: 'estetica',
    patientInfo: 'Paciente femenina, 38 años',
    description: 'Relleno de surcos nasogenianos y aumento de labios.',
    beforeImage: '/images/before-after/acido-hialuronico-before.jpg',
    afterImage: '/images/before-after/acido-hialuronico-after.jpg',
    order: 12,
  },
  {
    procedureName: 'Bioestimuladores',
    procedureSlug: 'bioestimuladores',
    categorySlug: 'estetica',
    patientInfo: 'Paciente femenina, 48 años',
    description: 'Tratamiento con Radiesse para estimular colágeno y mejorar flacidez.',
    beforeImage: '/images/before-after/bioestimuladores-before.jpg',
    afterImage: '/images/before-after/bioestimuladores-after.jpg',
    order: 13,
  },

  // ==================== RECONSTRUCTIVA ====================
  {
    procedureName: 'Cicatrices',
    procedureSlug: 'cicatrices',
    categorySlug: 'reconstructiva',
    patientInfo: 'Paciente masculino, 35 años',
    description: 'Revisión y corrección de cicatriz queloide en región torácica.',
    beforeImage: '/images/before-after/cicatrices-before.jpg',
    afterImage: '/images/before-after/cicatrices-after.jpg',
    order: 14,
  },
  {
    procedureName: 'Reconstrucción de Mama',
    procedureSlug: 'reconstruccion-mama',
    categorySlug: 'corporal',
    patientInfo: 'Paciente femenina, 47 años',
    description: 'Reconstrucción mamaria post-mastectomía con expansor tisular.',
    beforeImage: '/images/before-after/reconstruccion-mama-before.jpg',
    afterImage: '/images/before-after/reconstruccion-mama-after.jpg',
    order: 15,
  },
  {
    procedureName: 'Retiro de Biopolímeros',
    procedureSlug: 'retiro-biopolimeros',
    categorySlug: 'reconstructiva',
    patientInfo: 'Paciente femenina, 40 años',
    description: 'Extracción de biopolímeros en glúteos con reconstrucción.',
    beforeImage: '/images/before-after/retiro-biopolimeros-before.jpg',
    afterImage: '/images/before-after/retiro-biopolimeros-after.jpg',
    order: 16,
  },
]

async function main() {
  console.log('🌱 Iniciando seed de procedimientos y casos reales...')

  // Mapa para guardar IDs de categorías
  const categoryMap: Record<string, string> = {}

  // Crear categorías
  for (const category of categories) {
    const created = await prisma.procedureCategory.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        urlPath: category.urlPath,
        description: category.description,
        order: category.order,
      },
      create: category,
    })
    categoryMap[category.slug] = created.id
    console.log(`✅ Categoría: ${created.name}`)

    // Crear procedimientos de esta categoría
    const procedures = proceduresByCategory[category.slug] || []
    for (const procedure of procedures) {
      await prisma.procedure.upsert({
        where: { slug: procedure.slug },
        update: {
          name: procedure.name,
          order: procedure.order,
          categoryId: created.id,
        },
        create: {
          name: procedure.name,
          slug: procedure.slug,
          order: procedure.order,
          categoryId: created.id,
        },
      })
      console.log(`   - ${procedure.name}`)
    }
  }

  // Crear casos reales
  console.log('')
  console.log('🖼️  Creando casos reales...')

  // Primero eliminar casos existentes para evitar duplicados
  await prisma.realCase.deleteMany({})

  for (const caseData of realCasesData) {
    const categoryId = categoryMap[caseData.categorySlug]
    if (!categoryId) {
      console.log(`   ⚠️ Categoría no encontrada: ${caseData.categorySlug}`)
      continue
    }

    await prisma.realCase.create({
      data: {
        procedureName: caseData.procedureName,
        procedureSlug: caseData.procedureSlug,
        categoryId: categoryId,
        patientInfo: caseData.patientInfo,
        description: caseData.description,
        beforeImage: caseData.beforeImage,
        afterImage: caseData.afterImage,
        order: caseData.order,
      },
    })
    console.log(`   ✅ ${caseData.procedureName} - ${caseData.patientInfo}`)
  }

  // Contar totales
  const totalCategories = await prisma.procedureCategory.count()
  const totalProcedures = await prisma.procedure.count()
  const totalCases = await prisma.realCase.count()

  console.log('')
  console.log(`🎉 Seed completado:`)
  console.log(`   - ${totalCategories} categorías`)
  console.log(`   - ${totalProcedures} procedimientos`)
  console.log(`   - ${totalCases} casos reales`)
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

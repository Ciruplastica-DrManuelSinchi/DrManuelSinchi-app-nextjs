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

  // ==================== VIDEOS ====================
  console.log('')
  console.log('🎬 Creando videos...')

  const videosData = [
    { title: 'Todo sobre la Rinoplastia', description: 'El Dr. Manuel Sinchi explica todo lo que necesitas saber sobre la rinoplastia.', youtubeId: 'cy5N4Z_DRmM', category: 'facial', views: '2.5K', isFeatured: true, order: 1 },
    { title: 'Rinoplastia ultrasónica vs convencional', description: 'Comparativa entre técnicas de rinoplastia y sus beneficios.', youtubeId: 'EfC0TdjHIv8', category: 'facial', views: '1.8K', isFeatured: false, order: 2 },
    { title: 'Resultados naturales con Rinoseptoplastia Ultrasónica', description: 'Caso real mostrando resultados naturales de rinoseptoplastia.', youtubeId: '7oveiyGPTW8', category: 'facial', views: '1.2K', isFeatured: false, order: 3 },
    { title: 'Caso real: Perfilamiento facial', description: 'Resultado de perfilamiento facial con bichectomía.', youtubeId: 'r_ptdooFxDA', category: 'facial', views: '980', isFeatured: false, order: 4 },
    { title: 'Caso real: Afinamiento de rostro', description: 'Transformación con afinamiento de rostro.', youtubeId: '9isCtT3yYk0', category: 'facial', views: '1.1K', isFeatured: false, order: 5 },
    { title: 'Caso real: Rinoplastia y Afinamiento Facial', description: 'Combinación de procedimientos para un resultado armónico.', youtubeId: '9rmvDWxDHIE', category: 'facial', views: '1.5K', isFeatured: false, order: 6 },
    { title: 'PERFILOPLASTIA: Rinoplastia ultrasónica + Mentoplastia', description: 'Perfiloplastia completa con rinoplastia y mentoplastia.', youtubeId: 'PnuhU1EBdXQ', category: 'facial', views: '2.1K', isFeatured: false, order: 7 },
    { title: 'Mentoplastia: lo que debes saber', description: 'Información completa sobre la cirugía de mentón.', youtubeId: 'WDsZMaIWFYk', category: 'facial', views: '890', isFeatured: false, order: 8 },
    { title: 'Liposucción de papada: antes y después', description: 'Resultados reales de liposucción de papada.', youtubeId: '8ldGYrTf488', category: 'facial', views: '1.3K', isFeatured: false, order: 9 },
    { title: 'Caso de liposucción de papada', description: 'Transformación con liposucción de papada.', youtubeId: '24c5BD3LU1s', category: 'facial', views: '760', isFeatured: false, order: 10 },
    { title: 'Cambio sutil, resultado natural - Lifting', description: 'Caso de lifting facial con resultado natural.', youtubeId: 'kEQEN_kO4a0', category: 'facial', views: '1.4K', isFeatured: false, order: 11 },
    { title: 'PERFILOPLASTIA: Rinoplastia + Afinamiento facial', description: 'Combinación de procedimientos faciales.', youtubeId: '0zQ0cvgBYrs', category: 'facial', views: '1.7K', isFeatured: false, order: 12 },
    { title: 'Lipoescultura, Rinoseptoplastia y Afinamiento facial', description: 'Transformación completa con múltiples procedimientos.', youtubeId: 'wxMCK-kXHeg', category: 'facial', views: '2.3K', isFeatured: false, order: 13 },
    { title: 'Resultado de una Blefaroplastia Inferior', description: 'Caso real de blefaroplastia inferior.', youtubeId: 't4CJHFDtT-w', category: 'facial', views: '1.6K', isFeatured: false, order: 14 },
    { title: 'Rinoseptoplastia y Blefaroplastia', description: 'Combinación de cirugía de nariz y párpados.', youtubeId: '2UThbvUrJ0Y', category: 'facial', views: '1.2K', isFeatured: false, order: 15 },
    { title: 'Caso real de OTOPLASTIA', description: 'Corrección de orejas prominentes.', youtubeId: 'POg1Mb-UHcs', category: 'facial', views: '890', isFeatured: false, order: 16 },
    { title: '¿Desde qué edad se puede corregir las orejas?', description: 'Información sobre otoplastia en diferentes edades.', youtubeId: 'cTv5VZm7o6k', category: 'facial', views: '1.1K', isFeatured: false, order: 17 },
    { title: '¿Tienes las orejas prominentes?', description: 'Todo sobre la corrección de orejas prominentes.', youtubeId: 'UnkpLmMddCw', category: 'facial', views: '980', isFeatured: false, order: 18 },
    { title: 'Lo que debes saber sobre la lipoescultura', description: 'Entrevista en Radio Miraflores sobre lipoescultura.', youtubeId: 'fUUGe4-wLnc', category: 'corporal', views: '3.1K', isFeatured: true, order: 19 },
    { title: 'Lipoescultura vs. Lipoabdominoplastia', description: 'Diferencias entre estos dos procedimientos corporales.', youtubeId: 'ZBiNoZkeF2E', category: 'corporal', views: '2.1K', isFeatured: false, order: 20 },
    { title: 'Resultado real de lipoescultura', description: 'Caso real mostrando resultados de lipoescultura.', youtubeId: '8GrpYNpd9Js', category: 'corporal', views: '1.9K', isFeatured: false, order: 21 },
    { title: 'Caso real: Mamá de 2 hijos recupera su figura', description: 'Transformación con abdominoplastia post embarazo.', youtubeId: 'Z6Jq0DVJdzs', category: 'corporal', views: '2.8K', isFeatured: false, order: 22 },
    { title: 'Caso de Pilar: Lipoabdominoplastia', description: 'Resultado de lipoabdominoplastia.', youtubeId: '7GFKXZEwiis', category: 'corporal', views: '1.5K', isFeatured: false, order: 23 },
    { title: '¿Cómo elegir el IMPLANTE MAMARIO ideal?', description: 'Guía completa para elegir implantes mamarios.', youtubeId: '7PJPZJw9AL8', category: 'corporal', views: '3.2K', isFeatured: true, order: 24 },
    { title: 'Implantes mamarios: Cirugía de aumento', description: 'Todo sobre la cirugía de aumento de mamas.', youtubeId: 'kgu9YpK7uzs', category: 'corporal', views: '2.4K', isFeatured: false, order: 25 },
    { title: 'Caso real de mamoplastia', description: 'Resultado de aumento mamario.', youtubeId: '6pN61A1gLHI', category: 'corporal', views: '1.8K', isFeatured: false, order: 26 },
    { title: '¿Te hiciste una lipotransferencia? ¡Cuídala así!', description: 'Cuidados post lipotransferencia glútea.', youtubeId: 'LZeJiFcQtnI', category: 'corporal', views: '1.6K', isFeatured: false, order: 27 },
    { title: 'Transformación con Liposucción + Transferencia de grasa', description: 'Caso de lipoescultura con transferencia a glúteos.', youtubeId: '5-75lv9Q4nI', category: 'corporal', views: '2.2K', isFeatured: false, order: 28 },
    { title: 'Descubre todo sobre el Lip Lift', description: 'El Dr. Manuel Sinchi explica el procedimiento de Lip Lift.', youtubeId: 'pkUsW_-EHBI', category: 'estetica', views: '1.9K', isFeatured: false, order: 29 },
    { title: 'Todo lo que debes saber sobre el Lip Lift', description: 'Información completa sobre el levantamiento de labio.', youtubeId: '61QYlk7UzFk', category: 'estetica', views: '1.4K', isFeatured: false, order: 30 },
  ]

  await prisma.video.deleteMany({})
  for (const video of videosData) {
    await prisma.video.create({ data: video })
  }
  console.log(`   ✅ ${videosData.length} videos creados`)

  // ==================== TESTIMONIOS ====================
  console.log('')
  console.log('💬 Creando testimonios...')

  const testimonialsData = [
    { name: 'Pilar del Castillo', text: 'Excelente atención y resultados. El Dr. Sinchi me explicó todo el proceso con mucha claridad y profesionalismo. Los resultados superaron mis expectativas.', rating: 5, source: 'google', procedure: 'Rinoplastia', order: 1 },
    { name: 'Eduardo Carhuas', text: 'Muy buen servicio y profesionalismo por parte del doctor. Me sentí en confianza desde la primera consulta. Lo recomiendo ampliamente.', rating: 5, source: 'google', procedure: 'Lipoescultura', order: 2 },
    { name: 'Daniel Castañeda', text: 'Quiero expresar mi agradecimiento al Dr. Sinchi por el excelente trabajo realizado en mi cirugía. El trato fue 10/10, siempre amable y profesional.', rating: 5, source: 'google', order: 3 },
    { name: 'Vilma Rodriguez Quiroz', text: 'Excelente profesional, resultado 100% garantizado.', rating: 5, source: 'google', procedure: 'Blefaroplastia', order: 4 },
    { name: 'Ana García', text: 'Después de mucho buscar, encontré al Dr. Sinchi y fue la mejor decisión. Profesionalismo y resultados excepcionales.', rating: 5, source: 'google', procedure: 'Mamoplastia', order: 5 },
    { name: 'Roberto Mendoza', text: 'Excelente doctor, muy profesional y atento. Los resultados fueron exactamente lo que esperaba. Totalmente recomendado.', rating: 5, source: 'google', order: 6 },
  ]

  await prisma.testimonial.deleteMany({})
  for (const testimonial of testimonialsData) {
    await prisma.testimonial.create({ data: testimonial })
  }
  console.log(`   ✅ ${testimonialsData.length} testimonios creados`)

  // Contar totales
  const totalCategories = await prisma.procedureCategory.count()
  const totalProcedures = await prisma.procedure.count()
  const totalCases = await prisma.realCase.count()
  const totalVideos = await prisma.video.count()
  const totalTestimonials = await prisma.testimonial.count()

  console.log('')
  console.log(`🎉 Seed completado:`)
  console.log(`   - ${totalCategories} categorías`)
  console.log(`   - ${totalProcedures} procedimientos`)
  console.log(`   - ${totalCases} casos reales`)
  console.log(`   - ${totalVideos} videos`)
  console.log(`   - ${totalTestimonials} testimonios`)
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

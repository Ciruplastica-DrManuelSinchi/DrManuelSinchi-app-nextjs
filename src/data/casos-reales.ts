export type CaseCategory = 'todos' | 'facial' | 'corporal' | 'estetica' | 'reconstructiva'

export interface Case {
    id: number
    procedure: string
    category: Exclude<CaseCategory, 'todos'>
    patientInfo: string
    description: string
    beforeImage: string
    afterImage: string
    procedureSlug: string
    categoryPath: string
}

export const categories = [
    { id: 'todos' as CaseCategory, label: 'Todos' },
    { id: 'facial' as CaseCategory, label: 'Cirugía Facial' },
    { id: 'corporal' as CaseCategory, label: 'Cirugía Corporal' },
    { id: 'estetica' as CaseCategory, label: 'Medicina Estética' },
    { id: 'reconstructiva' as CaseCategory, label: 'Reconstructiva' },
]

export const cases: Case[] = [
    // ==================== FACIAL ====================
    {
        id: 1,
        procedure: 'Rinoplastia',
        category: 'facial',
        patientInfo: 'Paciente femenina, 28 años',
        description: 'Corrección de dorso y punta nasal para lograr un perfil más armonioso y natural.',
        beforeImage: '/images/before-after/rinoplastia-before.jpg',
        afterImage: '/images/before-after/rinoplastia-after.png',
        procedureSlug: 'rinoplastia',
        categoryPath: 'cirugia-plastica-facial',
    },
    {
        id: 2,
        procedure: 'Rinoplastia',
        category: 'facial',
        patientInfo: 'Paciente masculino, 32 años',
        description: 'Rinoseptoplastia para mejorar estética y respiración.',
        beforeImage: '/images/before-after/rinoplastia-before.jpg',
        afterImage: '/images/before-after/rinoplastia-after.png',
        procedureSlug: 'rinoplastia',
        categoryPath: 'cirugia-plastica-facial',
    },
    {
        id: 3,
        procedure: 'Blefaroplastia',
        category: 'facial',
        patientInfo: 'Paciente femenina, 45 años',
        description: 'Blefaroplastia superior e inferior para rejuvenecer la mirada.',
        beforeImage: '/images/before-after/blefaroplastia-before.jpg',
        afterImage: '/images/before-after/blefaroplastia-after.jpg',
        procedureSlug: 'blefaroplastia',
        categoryPath: 'cirugia-plastica-facial',
    },
    {
        id: 4,
        procedure: 'Lifting Facial',
        category: 'facial',
        patientInfo: 'Paciente femenina, 52 años',
        description: 'Lifting facial y cervical con técnica SMAS para rejuvenecimiento completo.',
        beforeImage: '/images/before-after/lifting-facial-before.jpg',
        afterImage: '/images/before-after/lifting-facial-after.jpg',
        procedureSlug: 'lifting-facial',
        categoryPath: 'cirugia-plastica-facial',
    },
    {
        id: 5,
        procedure: 'Bichectomía',
        category: 'facial',
        patientInfo: 'Paciente femenina, 26 años',
        description: 'Afinamiento facial mediante extracción de bolsas de Bichat.',
        beforeImage: '/images/before-after/bichectomia-before.jpg',
        afterImage: '/images/before-after/bichectomia-after.jpg',
        procedureSlug: 'bichectomia',
        categoryPath: 'cirugia-plastica-facial',
    },

    // ==================== CORPORAL ====================
    {
        id: 6,
        procedure: 'Lipoescultura',
        category: 'corporal',
        patientInfo: 'Paciente femenina, 34 años',
        description: 'Lipoescultura HD de abdomen, flancos y espalda con definición muscular.',
        beforeImage: '/images/before-after/lipoescultura-before.jpg',
        afterImage: '/images/before-after/lipoescultura-after.jpg',
        procedureSlug: 'lipo-escultura',
        categoryPath: 'cirugia-plastica-corporal',
    },
    {
        id: 7,
        procedure: 'Abdominoplastia',
        category: 'corporal',
        patientInfo: 'Paciente femenina, 38 años',
        description: 'Abdominoplastia completa post-embarazo con reparación de diástasis.',
        beforeImage: '/images/before-after/abdominoplastia-before.jpg',
        afterImage: '/images/before-after/abdominoplastia-after.jpg',
        procedureSlug: 'abdominoplastia',
        categoryPath: 'cirugia-plastica-corporal',
    },
    {
        id: 8,
        procedure: 'Mamoplastia de Aumento',
        category: 'corporal',
        patientInfo: 'Paciente femenina, 29 años',
        description: 'Aumento mamario con implantes de silicona perfil alto, 350cc.',
        beforeImage: '/images/before-after/mamoplastia-before.jpg',
        afterImage: '/images/before-after/mamoplastia-after.jpg',
        procedureSlug: 'mamoplastia-aumento',
        categoryPath: 'cirugia-plastica-corporal',
    },
    {
        id: 9,
        procedure: 'Gluteoplastia',
        category: 'corporal',
        patientInfo: 'Paciente femenina, 31 años',
        description: 'Aumento de glúteos con transferencia de grasa (BBL).',
        beforeImage: '/images/before-after/gluteoplastia-before.jpg',
        afterImage: '/images/before-after/gluteoplastia-after.jpg',
        procedureSlug: 'gluteoplastia',
        categoryPath: 'cirugia-plastica-corporal',
    },
    {
        id: 10,
        procedure: 'Mommy Makeover',
        category: 'corporal',
        patientInfo: 'Paciente femenina, 36 años',
        description: 'Combinación de abdominoplastia, liposucción y mastopexia.',
        beforeImage: '/images/before-after/mommy-makeover-before.jpg',
        afterImage: '/images/before-after/mommy-makeover-after.jpg',
        procedureSlug: 'mommy-makeover',
        categoryPath: 'cirugia-plastica-corporal',
    },

    // ==================== ESTÉTICA ====================
    {
        id: 11,
        procedure: 'Botox',
        category: 'estetica',
        patientInfo: 'Paciente femenina, 42 años',
        description: 'Aplicación de toxina botulínica en frente, entrecejo y patas de gallo.',
        beforeImage: '/images/before-after/botox-before.jpg',
        afterImage: '/images/before-after/botox-after.jpg',
        procedureSlug: 'botox',
        categoryPath: 'medicina-estetica',
    },
    {
        id: 12,
        procedure: 'Ácido Hialurónico',
        category: 'estetica',
        patientInfo: 'Paciente femenina, 38 años',
        description: 'Relleno de surcos nasogenianos y aumento de labios.',
        beforeImage: '/images/before-after/acido-hialuronico-before.jpg',
        afterImage: '/images/before-after/acido-hialuronico-after.jpg',
        procedureSlug: 'acido-hialuronico',
        categoryPath: 'medicina-estetica',
    },
    {
        id: 13,
        procedure: 'Bioestimuladores',
        category: 'estetica',
        patientInfo: 'Paciente femenina, 48 años',
        description: 'Tratamiento con Radiesse para estimular colágeno y mejorar flacidez.',
        beforeImage: '/images/before-after/bioestimuladores-before.jpg',
        afterImage: '/images/before-after/bioestimuladores-after.jpg',
        procedureSlug: 'bioestimuladores',
        categoryPath: 'medicina-estetica',
    },

    // ==================== RECONSTRUCTIVA ====================
    {
        id: 14,
        procedure: 'Cicatrices',
        category: 'reconstructiva',
        patientInfo: 'Paciente masculino, 35 años',
        description: 'Revisión y corrección de cicatriz queloide en región torácica.',
        beforeImage: '/images/before-after/cicatrices-before.jpg',
        afterImage: '/images/before-after/cicatrices-after.jpg',
        procedureSlug: 'cicatrices',
        categoryPath: 'cirugia-reconstructiva',
    },
    {
        id: 15,
        procedure: 'Reconstrucción de Mama',
        category: 'reconstructiva',
        patientInfo: 'Paciente femenina, 47 años',
        description: 'Reconstrucción mamaria post-mastectomía con expansor tisular.',
        beforeImage: '/images/before-after/reconstruccion-mama-before.jpg',
        afterImage: '/images/before-after/reconstruccion-mama-after.jpg',
        procedureSlug: 'reconstruccion-mama',
        categoryPath: 'cirugia-plastica-corporal',
    },
    {
        id: 16,
        procedure: 'Retiro de Biopolímeros',
        category: 'reconstructiva',
        patientInfo: 'Paciente femenina, 40 años',
        description: 'Extracción de biopolímeros en glúteos con reconstrucción.',
        beforeImage: '/images/before-after/retiro-biopolimeros-before.jpg',
        afterImage: '/images/before-after/retiro-biopolimeros-after.jpg',
        procedureSlug: 'retiro-biopolimeros',
        categoryPath: 'cirugia-reconstructiva',
    },
]

export function getCasesByCategory(category: CaseCategory): Case[] {
    if (category === 'todos') {
        return cases
    }
    return cases.filter(c => c.category === category)
}

export function getCaseById(id: number): Case | undefined {
    return cases.find(c => c.id === id)
}

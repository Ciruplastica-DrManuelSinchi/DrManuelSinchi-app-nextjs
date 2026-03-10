import { LucideIcon } from 'lucide-react'

// ============================================
// PROCEDURE PAGE TYPES
// ============================================

export interface ProcedureHero {
    badge: string
    title: string
    description: string
    duration: string
    recovery: string
    anesthesia: string
    heroImage: string
    whatsappMessage?: string
}

export interface ProcedureBenefit {
    icon: LucideIcon
    title: string
    description: string
}

export interface ProcedureInfo {
    title: string
    content: string[]
    image: string
    highlights?: {
        title: string
        icon?: LucideIcon
        items: string[]
    }
}

export interface BeforeAfterCase {
    before: string
    after: string
    label: string
}

export interface ProcessStep {
    step: number
    title: string
    description: string
    duration: string
    icon: LucideIcon
}

export interface FAQ {
    question: string
    answer: string
}

export interface Video {
    title: string
    thumbnail: string
    duration: string
    youtubeId?: string
}

export interface DoctorCredential {
    value: string
    label: string
}

export interface DoctorSection {
    title: string
    subtitle: string
    description: string
    image: string
    credentials: DoctorCredential[]
    features: string[]
}

export interface CTASection {
    title: string
    description: string
    whatsappNumber: string
    phoneNumber: string
}

// ============================================
// MAIN PROCEDURE DATA INTERFACE
// ============================================

export interface ProcedureData {
    // SEO & Routing
    slug: string
    category: 'facial' | 'corporal' | 'estetica' | 'reconstructiva'
    categoryLabel: string
    categoryPath: string

    // Hero Section
    hero: ProcedureHero

    // Content Sections
    info: ProcedureInfo
    benefits: ProcedureBenefit[]
    beforeAfter: BeforeAfterCase[]
    process: ProcessStep[]
    videos: Video[]
    faqs: FAQ[]

    // Doctor Section (optional - uses default if not provided)
    doctor?: Partial<DoctorSection>

    // CTA Section (optional - uses default if not provided)
    cta?: Partial<CTASection>
}

// ============================================
// DEFAULT VALUES
// ============================================

export const defaultDoctor: DoctorSection = {
    title: '¿Por qué operarte con el Dr. Sinchi?',
    subtitle: 'Tu Cirujano',
    description: 'Con más de 15 años de experiencia y miles de procedimientos exitosos, el Dr. Manuel Sinchi es referente en cirugía plástica en Perú.',
    image: '/images/dr-sinchi-portrait.jpg',
    credentials: [
        { value: '15+', label: 'Años de experiencia' },
        { value: '5000+', label: 'Cirugías realizadas' },
        { value: '98%', label: 'Satisfacción de pacientes' },
        { value: '5', label: 'Calificación Google' },
    ],
    features: [
        'Especialista certificado en Cirugía Plástica',
        'Miembro de sociedades internacionales',
        'Técnicas quirúrgicas de vanguardia',
        'Resultados naturales comprobados',
        'Seguimiento post-operatorio completo',
    ],
}

export const defaultCTA: CTASection = {
    title: 'Da el primer paso hacia el cambio que deseas',
    description: 'Agenda tu consulta de valoración y recibe un plan personalizado sin compromiso.',
    whatsappNumber: '51961360074',
    phoneNumber: '+51961360074',
}

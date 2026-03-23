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
    youtubeId?: string | null
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
// ENGLISH TRANSLATION OVERRIDES
// ============================================

export interface ProcedureTranslation {
    categoryLabel?: string
    hero?: Partial<Omit<ProcedureHero, 'whatsappMessage'>>
    info?: {
        title?: string
        content?: string[]
        highlights?: {
            title?: string
            items?: string[]
        }
    }
    benefits?: Array<{ title: string; description: string }>
    process?: Array<{ title: string; description: string; duration?: string }>
    faqs?: FAQ[]
    doctor?: {
        title?: string
        subtitle?: string
        description?: string
        features?: string[]
        credentials?: DoctorCredential[]
    }
    cta?: {
        title?: string
        description?: string
    }
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

    // English translations (optional overrides)
    en?: ProcedureTranslation
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

export const defaultDoctorEn: Partial<DoctorSection> = {
    title: 'Why choose Dr. Sinchi?',
    subtitle: 'Your Surgeon',
    description: 'With over 15 years of experience and thousands of successful procedures, Dr. Manuel Sinchi is a leading plastic surgeon in Peru.',
    credentials: [
        { value: '15+', label: 'Years of experience' },
        { value: '5000+', label: 'Surgeries performed' },
        { value: '98%', label: 'Patient satisfaction' },
        { value: '5', label: 'Google rating' },
    ],
    features: [
        'Board-certified Plastic Surgeon',
        'Member of international societies',
        'Cutting-edge surgical techniques',
        'Proven natural results',
        'Complete post-operative follow-up',
    ],
}

export const defaultCTA: CTASection = {
    title: 'Da el primer paso hacia el cambio que deseas',
    description: 'Agenda tu consulta de valoración y recibe un plan personalizado sin compromiso.',
    whatsappNumber: '51961360074',
    phoneNumber: '+51961360074',
}

export const defaultCTAEn: Partial<CTASection> = {
    title: 'Take the first step towards the change you desire',
    description: 'Schedule your evaluation consultation and receive a personalized plan with no commitment.',
}

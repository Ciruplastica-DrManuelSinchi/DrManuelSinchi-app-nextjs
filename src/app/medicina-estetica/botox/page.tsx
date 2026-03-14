"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Timer,
    Star,
    Zap,
    Clock
} from 'lucide-react'

// ============================================
// BOTOX DATA
// ============================================

const botoxData: ProcedureData = {
    // Routing & Category
    slug: 'botox',
    category: 'estetica',
    categoryLabel: 'Medicina Estética',
    categoryPath: '/medicina-estetica',

    // Hero Section
    hero: {
        badge: 'Tratamiento Anti-Arrugas',
        title: 'Botox',
        description: 'Suaviza las arrugas de expresión y previene la formación de nuevas líneas. El tratamiento más popular para un rostro más joven y descansado.',
        duration: '15-30 min',
        recovery: 'Inmediata',
        anesthesia: 'Sin anestesia',
        whatsappMessage: 'Hola, me interesa información sobre Botox',
    },

    // Info Section
    info: {
        title: '¿Qué es el Botox?',
        content: [
            'El Botox (toxina botulínica tipo A) es un tratamiento inyectable que relaja temporalmente los músculos faciales responsables de las arrugas de expresión. Es el procedimiento estético no quirúrgico más realizado en el mundo.',
            'Actúa bloqueando las señales nerviosas que causan las contracciones musculares, <strong class="text-primary">suavizando las arrugas existentes y previniendo la formación de nuevas</strong>. Los resultados son naturales y no alteran tu capacidad de expresión.',
        ],
        image: '/images/procedures/que-es/botox-tecnica.jpg',
        highlights: {
            title: 'Zonas de Aplicación',
            icon: Zap,
            items: [
                'Frente (líneas horizontales)',
                'Entrecejo (líneas del "11")',
                'Patas de gallo',
                'Líneas de conejo (nariz)',
                'Elevación de cejas',
                'Sudoración excesiva (hiperhidrosis)',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Clock,
            title: 'Rápido y Sin Dolor',
            description: 'Procedimiento de 15-30 minutos sin tiempo de recuperación.',
        },
        {
            icon: Zap,
            title: 'Resultados Visibles',
            description: 'Efectos notables en 3-7 días que duran 4-6 meses.',
        },
        {
            icon: Shield,
            title: 'Seguro y Probado',
            description: 'Más de 20 años de uso médico y estético comprobado.',
        },
        {
            icon: Heart,
            title: 'Natural',
            description: 'Suaviza arrugas sin perder expresión facial.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/botox-before.jpg',
            after: '/images/before-after/botox-after.jpg',
            label: 'Caso 1 - Frente y entrecejo',
        },
        {
            before: '/images/before-after/botox-before.jpg',
            after: '/images/before-after/botox-after.jpg',
            label: 'Caso 2 - Patas de gallo',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Evaluación facial, análisis de arrugas y planificación del tratamiento.',
            duration: '20-30 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Aplicación del Botox',
            description: 'Inyecciones precisas con agujas ultrafinas. Prácticamente indoloro.',
            duration: '15-30 min',
            icon: Sparkles,
        },
        {
            step: 3,
            title: 'Post-Tratamiento',
            description: 'Puedes retomar actividades inmediatamente con cuidados mínimos.',
            duration: 'Inmediato',
            icon: Timer,
        },
        {
            step: 4,
            title: 'Resultados',
            description: 'Efecto visible en 3-7 días, resultado óptimo a las 2 semanas.',
            duration: '3-14 días',
            icon: Star,
        },
    ],

    // Videos
    videos: [

    ],

    // FAQs
    faqs: [
        {
            question: '¿A qué edad se recomienda empezar con Botox?',
            answer: 'No hay una edad específica. Puede usarse de forma preventiva desde los 25-30 años o cuando empiezan a notarse las primeras líneas de expresión. También se usa de forma correctiva a cualquier edad.',
        },
        {
            question: '¿El Botox duele?',
            answer: 'Las inyecciones se realizan con agujas muy finas y causan mínima molestia, similar a un pequeño pinchazo. La mayoría de pacientes lo toleran perfectamente sin anestesia.',
        },
        {
            question: '¿Cuánto duran los efectos?',
            answer: 'Los resultados duran típicamente entre 4-6 meses. Con aplicaciones regulares, algunos pacientes notan que los efectos se prolongan progresivamente.',
        },
        {
            question: '¿Quedaré con expresión congelada?',
            answer: 'No si se aplica correctamente. El objetivo es suavizar las arrugas manteniendo tu expresión natural. Utilizamos técnicas y dosis personalizadas para resultados sutiles.',
        },
        {
            question: '¿Puedo hacer vida normal después?',
            answer: 'Sí, puedes retomar tus actividades inmediatamente. Solo se recomienda no acostarse ni hacer ejercicio intenso por 4 horas, y no masajear la zona tratada.',
        },
        {
            question: '¿El Botox previene arrugas?',
            answer: 'Sí, el Botox no solo trata las arrugas existentes sino que previene la formación de nuevas al reducir los movimientos musculares repetitivos que las causan.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '8000+', label: 'Aplicaciones de Botox' },
            { value: '99%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Luce más joven sin cirugía',
        description: 'Agenda tu cita y descubre cómo el Botox puede rejuvenecer tu rostro de forma natural.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function BotoxPage() {
    return <ProcedurePage data={botoxData} />
}

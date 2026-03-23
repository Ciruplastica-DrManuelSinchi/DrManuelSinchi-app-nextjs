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

    en: {
        categoryLabel: 'Aesthetic Medicine',
        hero: {
            badge: 'Anti-Wrinkle Treatment',
            title: 'Botox',
            description: 'Smooth expression wrinkles and prevent the formation of new lines. The most popular treatment for a younger, more rested face.',
            duration: '15-30 min',
            recovery: 'Immediate',
            anesthesia: 'None required',
        },
        info: {
            title: 'What is Botox?',
            content: [
                'Botox (botulinum toxin type A) is an injectable treatment that temporarily relaxes the facial muscles responsible for expression wrinkles. It is the most performed non-surgical aesthetic procedure in the world.',
                'It works by blocking the nerve signals that cause muscle contractions, <strong class="text-primary">smoothing existing wrinkles and preventing the formation of new ones</strong>. The results are natural and do not alter your ability to express yourself.',
            ],
            highlights: {
                title: 'Treatment Areas',
                items: [
                    'Forehead (horizontal lines)',
                    'Frown lines ("11" lines)',
                    'Crow\'s feet',
                    'Bunny lines (nose)',
                    'Eyebrow lift',
                    'Excessive sweating (hyperhidrosis)',
                ],
            },
        },
        benefits: [
            {
                title: 'Fast and Painless',
                description: '15-30 minute procedure with no recovery time.',
            },
            {
                title: 'Visible Results',
                description: 'Noticeable effects in 3-7 days that last 4-6 months.',
            },
            {
                title: 'Safe and Proven',
                description: 'Over 20 years of proven medical and aesthetic use.',
            },
            {
                title: 'Natural',
                description: 'Smooths wrinkles without losing facial expression.',
            },
        ],
        process: [
            {
                title: 'Assessment Consultation',
                description: 'Facial evaluation, wrinkle analysis and treatment planning.',
                duration: '20-30 min',
            },
            {
                title: 'Botox Application',
                description: 'Precise injections with ultra-fine needles. Virtually painless.',
                duration: '15-30 min',
            },
            {
                title: 'Post-Treatment',
                description: 'You can resume activities immediately with minimal care.',
                duration: 'Immediate',
            },
            {
                title: 'Results',
                description: 'Visible effect in 3-7 days, optimal result at 2 weeks.',
                duration: '3-14 days',
            },
        ],
        faqs: [
            {
                question: 'At what age is it recommended to start Botox?',
                answer: 'There is no specific age. It can be used preventively from age 25-30 or when the first expression lines start to appear. It is also used correctively at any age.',
            },
            {
                question: 'Does Botox hurt?',
                answer: 'The injections are performed with very fine needles and cause minimal discomfort, similar to a small pinprick. Most patients tolerate it perfectly without anesthesia.',
            },
            {
                question: 'How long do the effects last?',
                answer: 'Results typically last between 4-6 months. With regular applications, some patients notice that the effects progressively last longer.',
            },
            {
                question: 'Will I look frozen?',
                answer: 'Not if applied correctly. The goal is to soften wrinkles while maintaining your natural expression. We use personalized techniques and doses for subtle results.',
            },
            {
                question: 'Can I go about my normal life afterward?',
                answer: 'Yes, you can resume your activities immediately. It is only recommended not to lie down or do intense exercise for 4 hours, and not to massage the treated area.',
            },
            {
                question: 'Does Botox prevent wrinkles?',
                answer: 'Yes, Botox not only treats existing wrinkles but also prevents the formation of new ones by reducing the repetitive muscle movements that cause them.',
            },
        ],
        cta: {
            title: 'Look younger without surgery',
            description: 'Schedule your appointment and discover how Botox can rejuvenate your face naturally.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function BotoxPage() {
    return <ProcedurePage data={botoxData} />
}

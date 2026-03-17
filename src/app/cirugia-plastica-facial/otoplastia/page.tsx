"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Timer,
    Star,
    Ear,
    Users
} from 'lucide-react'

// ============================================
// OTOPLASTIA DATA
// ============================================

const otoplastiaData: ProcedureData = {
    // Routing & Category
    slug: 'otoplastia',
    category: 'facial',
    categoryLabel: 'Cirugía Facial',
    categoryPath: '/cirugia-plastica-facial',

    // Hero Section
    hero: {
        badge: 'Corrección de Orejas',
        title: 'Otoplastia',
        description: 'Corrige orejas prominentes, asimétricas o con malformaciones. Un procedimiento que mejora la autoestima tanto en niños como en adultos.',
        duration: '1-2 horas',
        recovery: '7 días recuperación',
        anesthesia: 'Anestesia local + sedación',
        whatsappMessage: 'Hola, me interesa información sobre otoplastia',
    },

    // Info Section
    info: {
        title: '¿Qué es la Otoplastia?',
        content: [
            'La otoplastia es una cirugía que corrige la forma, posición y proporción de las orejas. Es más conocida por tratar las "orejas de soplillo" o prominentes, pero también corrige asimetrías, lóbulos grandes y otras malformaciones.',
            'Es un procedimiento muy gratificante que puede realizarse <strong class="text-primary">desde los 6-7 años de edad</strong>, cuando las orejas han alcanzado casi su tamaño adulto. En adultos, la cirugía se realiza con anestesia local.',
        ],
        image: '/images/procedures/que-es/otoplastia-tecnica.jpg',
        highlights: {
            title: 'Correcciones que realiza la Otoplastia',
            icon: Ear,
            items: [
                'Reposicionamiento de orejas (orejas prominentes)',
                'Reducción de orejas (macrotia)',
                'Reconstrucción de orejas (microtia)',
                'Malformaciones de oreja (criptotia, oreja constricta, etc)',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Users,
            title: 'Para Todas las Edades',
            description: 'Apto para niños desde 6 años y adultos sin límite de edad.',
        },
        {
            icon: Ear,
            title: 'Resultados Naturales',
            description: 'Orejas con apariencia natural y proporcionada.',
        },
        {
            icon: Shield,
            title: 'Cicatriz Oculta',
            description: 'La incisión se realiza detrás de la oreja, invisible.',
        },
        {
            icon: Heart,
            title: 'Mejora Autoestima',
            description: 'Impacto positivo en la confianza y bienestar emocional.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/otoplastia-before.jpg',
            after: '/images/before-after/otoplastia-after.jpg',
            label: 'Caso 1 - Orejas prominentes',
        },
        {
            before: '/images/before-after/otoplastia-before.jpg',
            after: '/images/before-after/otoplastia-after.jpg',
            label: 'Caso 2 - Corrección bilateral',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Evaluación de las orejas, análisis de expectativas y planificación.',
            duration: '30-45 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación',
            description: 'Exámenes pre-quirúrgicos básicos y preparación para la cirugía.',
            duration: '1 semana antes',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Procedimiento Quirúrgico',
            description: 'Cirugía ambulatoria con anestesia local (adultos) o general (niños).',
            duration: '1-2 horas',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Recuperación con Banda',
            description: 'Uso de banda elástica protectora y cuidados post-operatorios.',
            duration: '7 días',
            icon: Timer,
        },
        {
            step: 5,
            title: 'Resultado Final',
            description: 'Orejas en su nueva posición, resultado definitivo visible.',
            duration: '1-2 meses',
            icon: Star,
        },
    ],

    // Videos
    videos: [
        {
            title: 'Caso real de OTOPLASTIA',
            youtubeId: 'POg1Mb-UHcs'
        },
        {
            title: '¿Desde qué edad se puede corregir las orejas prominentes? 👂',
            youtubeId: 'cTv5VZm7o6k'
        },
        {
            title: '🎥 ¿Tienes las orejas prominentes?',
            youtubeId: 'UnkpLmMddCw'
        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿A qué edad se puede realizar la otoplastia?',
            answer: 'En niños, se recomienda a partir de los 6-7 años cuando las orejas han alcanzado aproximadamente el 90% de su tamaño adulto. En adultos, puede realizarse a cualquier edad si el paciente está en buenas condiciones de salud.',
        },
        {
            question: '¿La otoplastia deja cicatrices visibles?',
            answer: 'No, la incisión se realiza en el surco detrás de la oreja, donde queda completamente oculta. Incluso con el cabello recogido, la cicatriz no es visible.',
        },
        {
            question: '¿Es dolorosa la cirugía?',
            answer: 'El procedimiento se realiza con anestesia, por lo que no hay dolor durante la cirugía. Después, hay molestias leves que se controlan fácilmente con analgésicos. Los niños suelen tolerarla muy bien.',
        },
        {
            question: '¿Cuánto tiempo debo usar la banda?',
            answer: 'Se recomienda usar la banda elástica las 24 horas durante la primera semana, y luego solo para dormir durante 3-4 semanas adicionales para proteger las orejas.',
        },
        {
            question: '¿Los resultados son permanentes?',
            answer: 'Sí, los resultados son permanentes. Una vez que las orejas cicatrizan en su nueva posición, mantienen esa forma de por vida.',
        },
        {
            question: '¿Mi hijo puede volver al colegio pronto?',
            answer: 'Generalmente, los niños pueden volver al colegio en 7-10 días. Se recomienda evitar deportes de contacto y educación física durante 4-6 semanas.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '1200+', label: 'Otoplastias realizadas' },
            { value: '99%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Corrige la forma de tus orejas',
        description: 'Agenda tu consulta de valoración y descubre cómo la otoplastia puede mejorar tu apariencia y confianza.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function OtoplastiaPage() {
    return <ProcedurePage data={otoplastiaData} />
}

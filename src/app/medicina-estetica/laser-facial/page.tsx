"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    Zap,
    Sun
} from 'lucide-react'

// ============================================
// LÁSER FACIAL DATA
// ============================================

const laserFacialData: ProcedureData = {
    slug: 'laser-facial',
    category: 'estetica',
    categoryLabel: 'Medicina Estética',
    categoryPath: '/medicina-estetica',

    hero: {
        badge: 'Rejuvenecimiento con Láser',
        title: 'Láser Facial',
        description: 'Tratamientos con tecnología láser para rejuvenecimiento, manchas, cicatrices y textura de la piel. Resultados precisos con las últimas tecnologías disponibles.',
        duration: '30-60 min',
        recovery: '3-7 días',
        anesthesia: 'Anestesia tópica',
        whatsappMessage: 'Hola, me interesa información sobre láser facial',
    },

    info: {
        title: '¿Cómo funciona el Láser Facial?',
        content: [
            'Los tratamientos láser utilizan luz de alta energía para tratar diversas condiciones de la piel. Dependiendo del tipo de láser, podemos tratar manchas, arrugas, cicatrices, poros dilatados y mejorar la textura general de la piel.',
            'Disponemos de diferentes tecnologías: <strong class="text-primary">Láser fraccionado</strong> para rejuvenecimiento, <strong class="text-primary">Láser Q-Switched</strong> para pigmentaciones, y <strong class="text-primary">IPL (Luz Pulsada Intensa)</strong> para manchas y rojeces.',
        ],
        image: '/images/procedures/que-es/laser-facial.jpg',
        highlights: {
            title: 'Tratamientos Disponibles',
            icon: Zap,
            items: [
                'Rejuvenecimiento facial',
                'Eliminación de manchas',
                'Tratamiento de cicatrices',
                'Reducción de poros',
                'Mejora de textura',
                'Tratamiento de rojeces',
            ],
        },
    },

    benefits: [
        {
            icon: Zap,
            title: 'Tecnología Avanzada',
            description: 'Equipos de última generación para resultados precisos.',
        },
        {
            icon: Sun,
            title: 'Elimina Manchas',
            description: 'Tratamiento efectivo para hiperpigmentación.',
        },
        {
            icon: Sparkles,
            title: 'Mejora Textura',
            description: 'Piel más suave, uniforme y luminosa.',
        },
        {
            icon: Heart,
            title: 'Estimula Colágeno',
            description: 'Rejuvenecimiento desde las capas profundas.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/laser-before.jpg',
            after: '/images/before-after/laser-after.jpg',
            label: 'Caso 1 - Manchas solares',
        },
        {
            before: '/images/before-after/laser-before-2.jpg',
            after: '/images/before-after/laser-after-2.jpg',
            label: 'Caso 2 - Rejuvenecimiento',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Evaluación de la Piel',
            description: 'Análisis de tu tipo de piel y condiciones a tratar.',
            duration: '20-30 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación',
            description: 'Limpieza y aplicación de anestesia tópica si es necesario.',
            duration: '15-20 min',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Tratamiento Láser',
            description: 'Aplicación del láser con parámetros personalizados.',
            duration: '30-60 min',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Cuidados Post',
            description: 'Hidratación, protección solar estricta y seguimiento.',
            duration: '3-7 días',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Es doloroso el tratamiento láser?',
            answer: 'La sensación varía según el tipo de láser. Generalmente se siente como pequeños pinchazos o calor. Usamos anestesia tópica para mayor comodidad.',
        },
        {
            question: '¿Cuántas sesiones necesito?',
            answer: 'Para manchas: 2-4 sesiones. Para rejuvenecimiento: 3-6 sesiones. Para cicatrices: 4-6 sesiones. Depende de la condición específica.',
        },
        {
            question: '¿Hay tiempo de recuperación?',
            answer: 'Depende del tratamiento. Láseres suaves no tienen downtime. Láseres ablativos requieren 5-7 días de recuperación con descamación.',
        },
        {
            question: '¿Puedo hacerlo si tengo piel oscura?',
            answer: 'Sí, pero requiere precauciones especiales. Algunos láseres son más seguros que otros para pieles oscuras. Lo evaluamos en consulta.',
        },
        {
            question: '¿En qué época del año es mejor?',
            answer: 'Idealmente en meses de menos sol (otoño-invierno) ya que la protección solar post-tratamiento es crucial.',
        },
        {
            question: '¿Los resultados son permanentes?',
            answer: 'Para manchas: pueden requerir mantenimiento si hay exposición solar. Para rejuvenecimiento: los beneficios de colágeno son duraderos con cuidados.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '3000+', label: 'Tratamientos láser' },
            { value: '97%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'Renueva tu piel con tecnología láser',
        description: 'Agenda tu consulta para evaluar qué tratamiento láser es ideal para ti.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function LaserFacialPage() {
    return <ProcedurePage data={laserFacialData} />
}

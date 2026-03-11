"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Timer,
    Star,
    Scissors,
    Target
} from 'lucide-react'

// ============================================
// ABDOMINOPLASTIA DATA
// ============================================

const abdominoplastiaData: ProcedureData = {
    // Routing & Category
    slug: 'abdominoplastia',
    category: 'corporal',
    categoryLabel: 'Cirugía Corporal',
    categoryPath: '/cirugia-plastica-corporal',

    // Hero Section
    hero: {
        badge: 'Abdomen Plano y Tonificado',
        title: 'Abdominoplastia',
        description: 'Recupera un abdomen plano y firme eliminando el exceso de piel y grasa, reparando los músculos abdominales para una silueta más definida.',
        duration: '2-4 horas',
        recovery: '14-21 días recuperación',
        anesthesia: 'Anestesia general',
        heroImage: '/images/procedures/abdominoplastia.jpg',
        whatsappMessage: 'Hola, me interesa información sobre abdominoplastia',
    },

    // Info Section
    info: {
        title: '¿Qué es la Abdominoplastia?',
        content: [
            'La abdominoplastia, también conocida como "tummy tuck", es una cirugía que elimina el exceso de piel y grasa del abdomen, además de reparar los músculos abdominales debilitados o separados (diástasis de rectos).',
            'Es especialmente beneficiosa para personas que han experimentado cambios significativos de peso, mujeres después del embarazo, o quienes tienen flacidez abdominal que no responde a dieta ni ejercicio. El resultado es un <strong class="text-primary">abdomen más plano, firme y definido</strong>.',
        ],
        image: '/images/procedures/abdominoplastia.jpg',
        highlights: {
            title: 'Tipos de Abdominoplastia',
            icon: Scissors,
            items: [
                'Abdominoplastia completa (clásica)',
                'Mini abdominoplastia',
                'Abdominoplastia extendida',
                'Abdominoplastia con liposucción',
                'Abdominoplastia circunferencial',
                'Reparación de diástasis de rectos',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Target,
            title: 'Abdomen Plano',
            description: 'Elimina exceso de piel y grasa para un abdomen definido.',
        },
        {
            icon: Scissors,
            title: 'Músculos Reparados',
            description: 'Corrige la separación muscular (diástasis de rectos).',
        },
        {
            icon: Shield,
            title: 'Resultados Duraderos',
            description: 'Con peso estable, los resultados son permanentes.',
        },
        {
            icon: Heart,
            title: 'Mejora Postura',
            description: 'La reparación muscular mejora soporte y postura.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/abdominoplastia-before.jpg',
            after: '/images/before-after/abdominoplastia-after.jpg',
            label: 'Caso 1 - Abdominoplastia completa',
        },
        {
            before: '/images/before-after/abdominoplastia-before.jpg',
            after: '/images/before-after/abdominoplastia-after.jpg',
            label: 'Caso 2 - Post embarazo',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Evaluación abdominal completa, análisis de piel, grasa y músculos.',
            duration: '45-60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación Pre-quirúrgica',
            description: 'Exámenes de laboratorio, evaluación cardiológica y preparación física.',
            duration: '2 semanas antes',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Procedimiento Quirúrgico',
            description: 'Cirugía bajo anestesia general en clínica certificada.',
            duration: '2-4 horas',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Recuperación Hospitalaria',
            description: 'Monitoreo post-operatorio, manejo del dolor y movilización temprana.',
            duration: '1-2 noches',
            icon: Timer,
        },
        {
            step: 5,
            title: 'Recuperación en Casa',
            description: 'Uso de faja compresiva, cuidados de herida y seguimiento cercano.',
            duration: '3-6 semanas',
            icon: Star,
        },
    ],

    // Videos
    videos: [
        {
            title: '¿Qué es la abdominoplastia?',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '5:45',
        },
        {
            title: 'Abdominoplastia: recuperación paso a paso',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '6:20',
        },
        {
            title: 'Testimonio: Mi experiencia con abdominoplastia',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '4:30',
        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿Soy candidata para una abdominoplastia?',
            answer: 'Los candidatos ideales son personas con exceso de piel abdominal, grasa localizada que no responde a dieta/ejercicio, o músculos abdominales debilitados. Es importante tener un peso estable y no planear embarazos futuros.',
        },
        {
            question: '¿Cuál es la diferencia entre abdominoplastia y liposucción?',
            answer: 'La liposucción solo elimina grasa, mientras que la abdominoplastia también elimina exceso de piel y repara los músculos. Frecuentemente se combinan para mejores resultados.',
        },
        {
            question: '¿La cicatriz es muy visible?',
            answer: 'La cicatriz se ubica en la línea del bikini, diseñada para ser cubierta por ropa interior. Con el tiempo y cuidados adecuados, se vuelve menos notoria.',
        },
        {
            question: '¿Cuánto tiempo debo usar la faja?',
            answer: 'Se recomienda usar faja compresiva las 24 horas durante las primeras 4-6 semanas, luego de forma progresiva hasta completar 2-3 meses.',
        },
        {
            question: '¿Puedo tener hijos después de una abdominoplastia?',
            answer: 'Sí, es posible embarazarse después. Sin embargo, el embarazo puede afectar los resultados. Por eso recomendamos realizar la cirugía cuando no se planean más embarazos.',
        },
        {
            question: '¿Cuándo puedo volver a hacer ejercicio?',
            answer: 'Caminatas suaves desde la primera semana. Ejercicio cardiovascular ligero a las 4-6 semanas. Ejercicios abdominales y de alta intensidad después de 8-12 semanas.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '1500+', label: 'Abdominoplastias realizadas' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Recupera el abdomen que siempre soñaste',
        description: 'Agenda tu consulta de valoración y descubre cómo la abdominoplastia puede transformar tu figura.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function AbdominoplastiaPage() {
    return <ProcedurePage data={abdominoplastiaData} />
}

"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Timer,
    Star,
    ArrowDown,
    Activity
} from 'lucide-react'

// ============================================
// MAMOPLASTIA DE REDUCCIÓN DATA
// ============================================

const mamoplastiaReduccionData: ProcedureData = {
    // Routing & Category
    slug: 'mamoplastia-reduccion',
    category: 'corporal',
    categoryLabel: 'Cirugía Corporal',
    categoryPath: '/cirugia-plastica-corporal',

    // Hero Section
    hero: {
        badge: 'Reducción de Senos',
        title: 'Mamoplastia de Reducción',
        description: 'Reduce el tamaño de tus senos aliviando molestias físicas y mejorando tu proporción corporal. Recupera comodidad y bienestar en tu día a día.',
        duration: '2-3 horas',
        recovery: '14-21 días recuperación',
        anesthesia: 'Anestesia general',
        whatsappMessage: 'Hola, me interesa información sobre mamoplastia de reducción',
    },

    // Info Section
    info: {
        title: '¿Qué es la Mamoplastia de Reducción?',
        content: [
            'La mamoplastia de reducción es una cirugía que disminuye el tamaño de los senos removiendo tejido mamario, grasa y piel. Además de mejorar la estética, alivia síntomas físicos asociados a senos muy grandes.',
            'Es un procedimiento que combina la reducción del volumen con el <strong class="text-primary">levantamiento y remodelación</strong> de los senos, logrando una forma más armónica y proporcionada con el resto del cuerpo.',
        ],
        image: '/images/procedures/que-es/mamoplastia-reduccion-tecnica.jpg',
        highlights: {
            title: 'Beneficios de la Reducción',
            icon: ArrowDown,
            items: [
                'Alivio de dolor de espalda y cuello',
                'Elimina marcas de los tirantes',
                'Mayor comodidad al hacer ejercicio',
                'Mejora la postura',
                'Facilita encontrar ropa adecuada',
                'Senos más firmes y proporcionados',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Activity,
            title: 'Alivio Físico',
            description: 'Elimina dolor de espalda, cuello y hombros.',
        },
        {
            icon: ArrowDown,
            title: 'Proporción Ideal',
            description: 'Senos acordes a tu estructura corporal.',
        },
        {
            icon: Shield,
            title: 'Resultados Duraderos',
            description: 'Cambio permanente en tamaño y forma.',
        },
        {
            icon: Heart,
            title: 'Mayor Comodidad',
            description: 'Libertad para hacer ejercicio y vestirte.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/mamoplastia-reduccion-before.jpg',
            after: '/images/before-after/mamoplastia-reduccion-after.jpg',
            label: 'Caso 1 - Reducción moderada',
        },
        {
            before: '/images/before-after/mamoplastia-reduccion-before.jpg',
            after: '/images/before-after/mamoplastia-reduccion-after.jpg',
            label: 'Caso 2 - Reducción significativa',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Evaluación mamaria, discusión del tamaño deseado y planificación.',
            duration: '45-60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación Pre-quirúrgica',
            description: 'Exámenes, mamografía y preparación física para la cirugía.',
            duration: '2 semanas antes',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Procedimiento Quirúrgico',
            description: 'Reducción y remodelación bajo anestesia general.',
            duration: '2-3 horas',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Recuperación Hospitalaria',
            description: 'Monitoreo post-operatorio y cuidados iniciales.',
            duration: '1 noche',
            icon: Timer,
        },
        {
            step: 5,
            title: 'Recuperación en Casa',
            description: 'Uso de sujetador especial, cuidados de herida y seguimiento.',
            duration: '3-6 semanas',
            icon: Star,
        },
    ],

    // Videos
    videos: [
        {
            title: '¿En qué consiste la reducción de senos?',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '5:30',
        },
        {
            title: 'Recuperación de mamoplastia de reducción',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '4:45',
        },
        {
            title: 'Testimonio: Mi vida después de la reducción',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '6:10',
        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿Cuánto se puede reducir el tamaño?',
            answer: 'La cantidad de reducción depende de tu anatomía y objetivos. En la consulta discutiremos el tamaño ideal considerando tus proporciones corporales y expectativas.',
        },
        {
            question: '¿Las cicatrices son muy notorias?',
            answer: 'Las cicatrices son inevitables pero se ubican estratégicamente: alrededor de la areola, verticalmente hacia el surco y a veces en el surco. Con el tiempo y cuidados adecuados se vuelven menos visibles.',
        },
        {
            question: '¿Podré amamantar después?',
            answer: 'En muchos casos sí es posible amamantar, aunque puede haber una reducción en la producción de leche. Utilizamos técnicas que preservan los conductos cuando es posible.',
        },
        {
            question: '¿El seguro cubre esta cirugía?',
            answer: 'En algunos casos, cuando hay síntomas físicos documentados (dolor de espalda, lesiones en hombros, etc.), el seguro puede cubrir parte del procedimiento. Te ayudamos con la documentación necesaria.',
        },
        {
            question: '¿Cuánto peso se remueve?',
            answer: 'Varía según cada caso. En reducciones moderadas se remueven 300-500g por seno. En casos de hipertrofia severa puede ser 1kg o más por lado.',
        },
        {
            question: '¿Los senos pueden volver a crecer?',
            answer: 'El tejido removido no crece nuevamente. Sin embargo, cambios de peso significativos o embarazos pueden afectar el tamaño. Por eso recomendamos peso estable antes de la cirugía.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '800+', label: 'Reducciones realizadas' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Recupera tu comodidad y bienestar',
        description: 'Agenda tu consulta de valoración y descubre cómo la reducción mamaria puede mejorar tu calidad de vida.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function MamoplastiaReduccionPage() {
    return <ProcedurePage data={mamoplastiaReduccionData} />
}

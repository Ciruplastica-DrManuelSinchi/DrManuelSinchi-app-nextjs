"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    CircleDot,
    Scissors
} from 'lucide-react'

// ============================================
// EXTRACCIÓN DE LUNARES DATA
// ============================================

const extraccionLunaresData: ProcedureData = {
    // Routing & Category
    slug: 'extraccion-lunares',
    category: 'estetica',
    categoryLabel: 'Medicina Estética',
    categoryPath: '/medicina-estetica',

    // Hero Section
    hero: {
        badge: 'Dermatología Estética',
        title: 'Extracción de Lunares',
        description: 'Remoción segura de lunares, verrugas y lesiones cutáneas con técnicas que minimizan cicatrices. Incluye análisis patológico cuando es necesario.',
        duration: '15-30 min',
        recovery: '5-7 días',
        anesthesia: 'Anestesia local',
        whatsappMessage: 'Hola, me interesa información sobre extracción de lunares',
    },

    // Info Section
    info: {
        title: '¿En qué consiste la Extracción de Lunares?',
        content: [
            'La extracción de lunares es un procedimiento ambulatorio que permite remover lesiones cutáneas de forma segura. Puede realizarse por razones estéticas o médicas, especialmente cuando hay sospecha de cambios anormales.',
            'Utilizamos técnicas como <strong class="text-primary">excisión quirúrgica, shaving o electrocoagulación</strong>, seleccionando la más adecuada según el tipo, tamaño y ubicación de la lesión para obtener el mejor resultado estético.',
        ],
        image: '/images/procedures/que-es/extraccion-lunares-tecnica.jpg',
        highlights: {
            title: 'Lesiones que tratamos',
            icon: CircleDot,
            items: [
                'Lunares (nevos)',
                'Verrugas',
                'Queratosis seborreicas',
                'Fibromas',
                'Quistes epidérmicos',
                'Lesiones sospechosas',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Shield,
            title: 'Análisis Patológico',
            description: 'Enviamos las muestras a estudio cuando es necesario.',
        },
        {
            icon: Scissors,
            title: 'Mínima Cicatriz',
            description: 'Técnicas que minimizan las marcas residuales.',
        },
        {
            icon: CircleDot,
            title: 'Remoción Completa',
            description: 'Extracción total de la lesión en una sesión.',
        },
        {
            icon: Heart,
            title: 'Tranquilidad',
            description: 'Descarta malignidad con el estudio histopatológico.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/lunares-before.jpg',
            after: '/images/before-after/lunares-after.jpg',
            label: 'Caso 1 - Lunar facial',
        },
        {
            before: '/images/before-after/lunares-before.jpg',
            after: '/images/before-after/lunares-after.jpg',
            label: 'Caso 2 - Múltiples lesiones',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Evaluación de la Lesión',
            description: 'Examen visual y dermatoscópico para determinar el tipo de lesión.',
            duration: '15-20 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Anestesia Local',
            description: 'Aplicación de anestesia para un procedimiento indoloro.',
            duration: '5 min',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Extracción',
            description: 'Remoción de la lesión con la técnica más apropiada.',
            duration: '15-30 min',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Cicatrización',
            description: 'Cuidados de la herida y espera del resultado patológico si aplica.',
            duration: '5-14 días',
            icon: Star,
        },
    ],

    // Videos
    videos: [
        {
            title: '¿Cuándo debo remover un lunar?',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '4:15',
        },
        {
            title: 'Técnicas de extracción de lunares',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '5:00',
        },
        {
            title: 'Cuidados después de remover un lunar',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '3:30',
        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿Cuándo debo preocuparme por un lunar?',
            answer: 'Usa la regla ABCDE: Asimetría, Bordes irregulares, Color variado, Diámetro mayor a 6mm, Evolución (cambios). Si notas alguno de estos signos, consulta inmediatamente.',
        },
        {
            question: '¿La extracción es dolorosa?',
            answer: 'No, se aplica anestesia local que adormece completamente la zona. Solo sentirás el pequeño pinchazo inicial de la anestesia.',
        },
        {
            question: '¿Quedará cicatriz?',
            answer: 'Toda extracción deja alguna marca, pero utilizamos técnicas que minimizan la cicatriz. El resultado final depende del tamaño, ubicación y cuidados posteriores.',
        },
        {
            question: '¿El lunar puede volver a salir?',
            answer: 'Si se extrae completamente, no debería recurrir. Sin embargo, pueden aparecer nuevos lunares con el tiempo, especialmente con exposición solar.',
        },
        {
            question: '¿Siempre se envía a patología?',
            answer: 'No siempre. Se envía cuando hay características sospechosas, cambios recientes, o por solicitud del paciente. Las lesiones claramente benignas pueden no requerirlo.',
        },
        {
            question: '¿Cuántos lunares se pueden quitar en una sesión?',
            answer: 'Depende del tamaño y ubicación. Generalmente se pueden remover varios lunares pequeños en una sola sesión. Lo evaluamos en la consulta.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '4000+', label: 'Lesiones removidas' },
            { value: '99%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Remueve esas lesiones que te incomodan',
        description: 'Agenda tu consulta para evaluar tus lunares y lesiones de forma segura.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function ExtraccionLunaresPage() {
    return <ProcedurePage data={extraccionLunaresData} />
}

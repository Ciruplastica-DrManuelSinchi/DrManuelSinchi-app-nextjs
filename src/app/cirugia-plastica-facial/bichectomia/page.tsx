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
    Zap
} from 'lucide-react'

// ============================================
// BICHECTOMÍA DATA
// ============================================

const bichectomiaData: ProcedureData = {
    // Routing & Category
    slug: 'bichectomia',
    category: 'facial',
    categoryLabel: 'Cirugía Facial',
    categoryPath: '/cirugia-plastica-facial',

    // Hero Section
    hero: {
        badge: 'Definición Facial',
        title: 'Bichectomía',
        description: 'Define tu rostro eliminando las bolsas de Bichat. Un procedimiento rápido que afina tus mejillas y resalta tus pómulos naturalmente.',
        duration: '45 minutos',
        recovery: '3-5 días recuperación',
        anesthesia: 'Anestesia local',
        whatsappMessage: 'Hola, me interesa información sobre bichectomía',
    },

    // Info Section
    info: {
        title: '¿Qué es la Bichectomía?',
        content: [
            'La bichectomía es un procedimiento quirúrgico que consiste en la extracción de las bolsas de Bichat, cúmulos de grasa ubicados en las mejillas. Este procedimiento afina el rostro y define los pómulos, creando un aspecto más angular y estilizado.',
            'Es una cirugía <strong class="text-primary">mínimamente invasiva</strong> que se realiza a través de pequeñas incisiones dentro de la boca, sin dejar cicatrices visibles. El procedimiento es rápido y la recuperación muy corta.',
        ],
        image: '/images/procedures/que-es/bichectomia-tecnica.jpg',
        highlights: {
            title: 'Beneficios de la Bichectomía',
            icon: Sparkles,
            items: [
                'Rostro más definido y angular',
                'Pómulos más prominentes',
                'Sin cicatrices visibles',
                'Procedimiento ambulatorio',
                'Recuperación rápida',
                'Resultados permanentes',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Scissors,
            title: 'Mínimamente Invasiva',
            description: 'Procedimiento rápido sin cicatrices externas visibles.',
        },
        {
            icon: Zap,
            title: 'Recuperación Express',
            description: 'Retoma tus actividades en solo 3-5 días.',
        },
        {
            icon: Shield,
            title: 'Resultados Permanentes',
            description: 'La grasa extraída no vuelve a aparecer.',
        },
        {
            icon: Heart,
            title: 'Aspecto Natural',
            description: 'Define tu rostro sin parecer operado.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/bichectomia-before.jpg',
            after: '/images/before-after/bichectomia-after.jpg',
            label: 'Caso 1 - Definición de pómulos',
        },
        {
            before: '/images/before-after/bichectomia-before.jpg',
            after: '/images/before-after/bichectomia-after.jpg',
            label: 'Caso 2 - Afinamiento facial',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Evaluación facial, análisis de proporciones y simulación de resultados.',
            duration: '30 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Día de la Cirugía',
            description: 'Procedimiento ambulatorio con anestesia local en consultorio.',
            duration: '45 min',
            icon: Sparkles,
        },
        {
            step: 3,
            title: 'Recuperación Inmediata',
            description: 'Puedes irte a casa el mismo día con indicaciones de cuidado.',
            duration: 'Mismo día',
            icon: Timer,
        },
        {
            step: 4,
            title: 'Cuidados Post-operatorios',
            description: 'Dieta blanda, enjuagues y control de inflamación.',
            duration: '3-5 días',
            icon: Shield,
        },
        {
            step: 5,
            title: 'Resultado Final',
            description: 'Definición completa del rostro una vez desaparezca la inflamación.',
            duration: '1-2 meses',
            icon: Star,
        },
    ],

    // Videos
    videos: [
        {
            title: 'Caso real: Perfilamiento facial',
            youtubeId: 'r_ptdooFxDA'
            
        },
        {
            title: 'Caso real: Afinamiento de rostro',
            youtubeId: '9isCtT3yYk0'
            
        },
        {
            title: 'Caso real: Rinoplastia y Afinamiento Facial',
            youtubeId: '9rmvDWxDHIE'
            
        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿Soy candidato para una bichectomía?',
            answer: 'Los candidatos ideales son personas con rostro redondeado debido a las bolsas de Bichat prominentes, no por sobrepeso. Durante la consulta evaluaremos si este procedimiento es adecuado para ti o si otras opciones serían más beneficiosas.',
        },
        {
            question: '¿La bichectomía es permanente?',
            answer: 'Sí, los resultados son permanentes. Las bolsas de Bichat no se regeneran una vez extraídas. El resultado final se aprecia completamente después de 1-2 meses cuando desaparece toda la inflamación.',
        },
        {
            question: '¿Quedan cicatrices?',
            answer: 'No hay cicatrices visibles. Las incisiones se realizan dentro de la boca, en la parte interna de las mejillas. Cicatrizan completamente en 7-10 días.',
        },
        {
            question: '¿Qué cuidados debo tener después?',
            answer: 'Debes seguir una dieta blanda por 5-7 días, realizar enjuagues con antiséptico bucal, evitar alimentos calientes y no fumar. La inflamación es normal los primeros días.',
        },
        {
            question: '¿Puedo combinar la bichectomía con otros procedimientos?',
            answer: 'Sí, es muy común combinarla con liposucción de papada, mentoplastia o rellenos faciales para resultados más armónicos y completos.',
        },
        {
            question: '¿A qué edad se puede hacer?',
            answer: 'Se recomienda después de los 18-20 años cuando el rostro ha terminado de desarrollarse. No hay límite de edad superior si el paciente está en buenas condiciones de salud.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '2000+', label: 'Bichectomías realizadas' },
            { value: '99%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Define tu rostro con la bichectomía',
        description: 'Agenda tu consulta de valoración y descubre cómo resaltar tus pómulos naturalmente.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function BichectomiaPage() {
    return <ProcedurePage data={bichectomiaData} />
}

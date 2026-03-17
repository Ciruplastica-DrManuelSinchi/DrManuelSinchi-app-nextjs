"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    UserCircle,
    Layers
} from 'lucide-react'

// ============================================
// PERFILOPLASTIA DATA
// ============================================

const perfiloplastiaData: ProcedureData = {
    slug: 'perfiloplastia',
    category: 'facial',
    categoryLabel: 'Cirugía Plástica Facial',
    categoryPath: '/cirugia-plastica-facial',

    hero: {
        badge: 'Armonización del Perfil',
        title: 'Perfiloplastia',
        description: 'Armoniza tu perfil facial combinando rinoplastia con mentoplastia y/o afinamiento facial. Logra un perfil equilibrado y atractivo en una sola intervención.',
        duration: '2-4 horas',
        recovery: '14-21 días',
        anesthesia: 'General',
        whatsappMessage: 'Hola, me interesa información sobre perfiloplastia',
    },

    info: {
        title: '¿Qué es la Perfiloplastia?',
        content: [
            'La perfiloplastia es un procedimiento combinado diseñado para armonizar el perfil facial completo. Consiste en intervenir simultáneamente la nariz y el mentón (y otras estructuras si es necesario) para lograr proporciones ideales.',
            'Las combinaciones más comunes son: <strong class="text-primary">Rinoplastia + Mentoplastia</strong> para corregir el perfil lateral, y <strong class="text-primary">Rinoplastia + Afinamiento Facial</strong> para una transformación más completa incluyendo mandíbula, papada y mejillas.',
        ],
        image: '/images/procedures/que-es/perfiloplastia.jpg',
        highlights: {
            title: 'Combinaciones Disponibles',
            icon: UserCircle,
            items: [
                'Rinoplastia + Mentoplastia',
                'Rinoplastia + Afinamiento facial',
                'Rinoplastia + Marcación mandibular',
                'Corrección de perfil convexo',
                'Corrección de perfil cóncavo',
                'Armonización completa',
            ],
        },
    },

    benefits: [
        {
            icon: UserCircle,
            title: 'Perfil Armonioso',
            description: 'Nariz, mentón y mandíbula en equilibrio perfecto.',
        },
        {
            icon: Layers,
            title: 'Procedimiento Único',
            description: 'Múltiples mejoras en una sola cirugía.',
        },
        {
            icon: Sparkles,
            title: 'Resultados Integrales',
            description: 'Transformación completa del perfil facial.',
        },
        {
            icon: Heart,
            title: 'Menor Recuperación',
            description: 'Un solo período de recuperación para todas las mejoras.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/perfiloplastia-before.jpg',
            after: '/images/before-after/perfiloplastia-after.jpg',
            label: 'Caso 1 - Rinoplastia + Mentoplastia',
        },
        {
            before: '/images/before-after/perfiloplastia-before-2.jpg',
            after: '/images/before-after/perfiloplastia-after-2.jpg',
            label: 'Caso 2 - Perfiloplastia completa',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Análisis del Perfil',
            description: 'Evaluación fotográfica y cefalométrica de tu perfil facial.',
            duration: '45-60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Diseño del Plan',
            description: 'Planificación de los procedimientos necesarios y simulación de resultados.',
            duration: 'En consulta',
            icon: Sparkles,
        },
        {
            step: 3,
            title: 'Cirugía Combinada',
            description: 'Realización de rinoplastia, mentoplastia y otros procedimientos según el plan.',
            duration: '2-4 horas',
            icon: Shield,
        },
        {
            step: 4,
            title: 'Recuperación',
            description: 'Uso de férula nasal y/o mentonera. Inflamación que cede en semanas.',
            duration: '14-21 días',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Por qué combinar rinoplastia y mentoplastia?',
            answer: 'Nariz y mentón se relacionan entre sí. A veces una nariz parece grande porque el mentón es pequeño. Al corregir ambos, se logra un perfil más armónico.',
        },
        {
            question: '¿Es más riesgoso operar varios procedimientos juntos?',
            answer: 'No necesariamente. Combinar procedimientos con un equipo experimentado es seguro y reduce el número total de anestesias y recuperaciones.',
        },
        {
            question: '¿Cómo se determina qué procedimientos necesito?',
            answer: 'Mediante análisis fotográfico del perfil, mediciones faciales y tus objetivos personales. Diseñamos un plan personalizado en la consulta.',
        },
        {
            question: '¿Cuánto tiempo toma ver el resultado final?',
            answer: 'La inflamación mayor cede en 2-3 semanas. El resultado de la nariz continúa refinándose hasta 12 meses, pero se aprecia muy bien desde el mes 3.',
        },
        {
            question: '¿Puedo incluir otros procedimientos?',
            answer: 'Sí, frecuentemente se incluyen bichectomía, liposucción de papada, aumento de pómulos u otros según las necesidades del paciente.',
        },
        {
            question: '¿Los resultados son permanentes?',
            answer: 'Sí, tanto los cambios en la nariz como en el mentón/mandíbula son permanentes.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '400+', label: 'Perfiloplastias realizadas' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'Transforma tu perfil de manera integral',
        description: 'Agenda tu consulta para diseñar tu plan de perfiloplastia personalizado.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function PerfiloplastiaPage() {
    return <ProcedurePage data={perfiloplastiaData} />
}

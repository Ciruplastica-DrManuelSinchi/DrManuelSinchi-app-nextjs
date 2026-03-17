"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Calendar,
    Star,
    Activity,
    Waves,
    Wind
} from 'lucide-react'

// ============================================
// TRATAMIENTOS POSTOPERATORIOS DATA
// ============================================

const tratamientosPostopData: ProcedureData = {
    slug: 'tratamientos-postoperatorios',
    category: 'estetica',
    categoryLabel: 'Medicina Estética',
    categoryPath: '/medicina-estetica',

    hero: {
        badge: 'Recuperación Óptima',
        title: 'Tratamientos Postoperatorios',
        description: 'Acelera tu recuperación y optimiza los resultados de tu cirugía con nuestros tratamientos especializados: masajes, drenaje linfático, ultrasonido y carboxiterapia.',
        duration: '45-60 min',
        recovery: 'Inmediata',
        anesthesia: 'Sin anestesia',
        whatsappMessage: 'Hola, me interesa información sobre tratamientos postoperatorios',
    },

    info: {
        title: '¿Por qué son importantes los tratamientos postoperatorios?',
        content: [
            'Los tratamientos postoperatorios son fundamentales para una recuperación óptima después de cirugías plásticas. Ayudan a reducir la inflamación, prevenir fibrosis, mejorar la circulación y acelerar la cicatrización.',
            'Ofrecemos un programa completo que incluye: <strong class="text-primary">Drenaje linfático manual</strong>, <strong class="text-primary">Ultrasonido terapéutico</strong>, <strong class="text-primary">Masajes postquirúrgicos</strong> y <strong class="text-primary">Carboxiterapia</strong> para resultados superiores.',
        ],
        image: '/images/procedures/que-es/tratamientos-postoperatorios.jpg',
        highlights: {
            title: 'Tratamientos Disponibles',
            icon: Activity,
            items: [
                'Drenaje linfático manual',
                'Masajes postquirúrgicos',
                'Ultrasonido terapéutico',
                'Carboxiterapia',
                'Presoterapia',
                'Terapia de vacío',
            ],
        },
    },

    benefits: [
        {
            icon: Waves,
            title: 'Reduce Inflamación',
            description: 'Elimina líquidos y descongestiona los tejidos.',
        },
        {
            icon: Shield,
            title: 'Previene Fibrosis',
            description: 'Evita la formación de tejido fibroso y nódulos.',
        },
        {
            icon: Activity,
            title: 'Mejora Circulación',
            description: 'Acelera la recuperación de los tejidos.',
        },
        {
            icon: Wind,
            title: 'Carboxiterapia',
            description: 'CO2 que mejora oxigenación y reduce hematomas.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/postop-before.jpg',
            after: '/images/before-after/postop-after.jpg',
            label: 'Caso 1 - Recuperación post-lipo',
        },
        {
            before: '/images/before-after/postop-before-2.jpg',
            after: '/images/before-after/postop-after-2.jpg',
            label: 'Caso 2 - Post-abdominoplastia',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Evaluación Post-cirugía',
            description: 'Revisión del estado de los tejidos y plan de tratamiento.',
            duration: '15 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Drenaje Linfático',
            description: 'Masaje especializado para eliminar líquidos.',
            duration: '30-45 min',
            icon: Waves,
        },
        {
            step: 3,
            title: 'Terapias Complementarias',
            description: 'Ultrasonido, carboxiterapia según el caso.',
            duration: '15-30 min',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Plan de Seguimiento',
            description: 'Sesiones programadas hasta recuperación completa.',
            duration: '2-8 semanas',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Cuándo debo empezar los tratamientos?',
            answer: 'Generalmente iniciamos entre 24-72 horas post-cirugía, dependiendo del procedimiento realizado. Tu cirujano te indicará el momento ideal.',
        },
        {
            question: '¿Cuántas sesiones necesito?',
            answer: 'Típicamente 10-20 sesiones, 2-3 veces por semana inicialmente, luego se espacian. Depende del tipo de cirugía y tu evolución.',
        },
        {
            question: '¿Es doloroso?',
            answer: 'Los primeros drenajes pueden ser incómodos porque los tejidos están sensibles. Se trabaja con la presión adecuada para cada etapa.',
        },
        {
            question: '¿Qué es la fibrosis y cómo se previene?',
            answer: 'La fibrosis es la formación de tejido cicatricial duro bajo la piel. Se previene con masajes, ultrasonido y movilización temprana de los tejidos.',
        },
        {
            question: '¿Qué hace la carboxiterapia?',
            answer: 'Inyecta CO2 subcutáneo que mejora la oxigenación, reduce hematomas, estimula circulación y ayuda a eliminar grasa residual.',
        },
        {
            question: '¿Puedo hacer drenaje en casa?',
            answer: 'Puedes hacer auto-masajes suaves, pero el drenaje linfático profesional es mucho más efectivo. Te enseñamos técnicas complementarias para casa.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '5000+', label: 'Tratamientos realizados' },
            { value: '99%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'Optimiza tu recuperación postoperatoria',
        description: 'Agenda tus sesiones de tratamiento postoperatorio para mejores resultados.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function TratamientosPostoperatoriosPage() {
    return <ProcedurePage data={tratamientosPostopData} />
}

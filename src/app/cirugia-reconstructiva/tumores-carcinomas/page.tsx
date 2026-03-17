"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Shield,
    Heart,
    Calendar,
    Star,
    Search,
    Scissors,
    HeartPulse
} from 'lucide-react'

// ============================================
// TUMORES Y CARCINOMAS DATA
// ============================================

const tumoresCarcinomasData: ProcedureData = {
    slug: 'tumores-carcinomas',
    category: 'reconstructiva',
    categoryLabel: 'Cirugía Reconstructiva',
    categoryPath: '/cirugia-reconstructiva',

    hero: {
        badge: 'Cirugía Oncológica',
        title: 'Reconstrucción y Extracción de Tumores',
        description: 'Extracción de tumores benignos y carcinomas no-melanoma de piel con técnicas reconstructivas que minimizan las secuelas estéticas. Atención integral con enfoque oncológico y estético.',
        duration: '30 min - 3 horas',
        recovery: '1-4 semanas',
        anesthesia: 'Local / General',
        whatsappMessage: 'Hola, me interesa información sobre extracción de tumores de piel',
    },

    info: {
        title: '¿Qué tumores de piel tratamos?',
        content: [
            'Tratamos tumores cutáneos benignos (quistes, lipomas, nevos) y carcinomas no-melanoma como el carcinoma basocelular y espinocelular. La cirugía busca la extracción completa del tumor con márgenes oncológicos adecuados.',
            'Como cirujanos plásticos, aportamos valor en la <strong class="text-primary">reconstrucción del defecto</strong> resultante, utilizando técnicas como colgajos locales, injertos de piel y otras para lograr el mejor resultado estético posible.',
        ],
        image: '/images/procedures/que-es/tumores-carcinomas.jpg',
        highlights: {
            title: 'Lesiones que Tratamos',
            icon: Search,
            items: [
                'Carcinoma basocelular',
                'Carcinoma espinocelular',
                'Tumores benignos (lipomas, quistes)',
                'Nevos atípicos',
                'Queratoacantomas',
                'Reconstrucción post-Mohs',
            ],
        },
    },

    benefits: [
        {
            icon: Shield,
            title: 'Márgenes Oncológicos',
            description: 'Extracción completa con márgenes de seguridad adecuados.',
        },
        {
            icon: Scissors,
            title: 'Reconstrucción Estética',
            description: 'Técnicas que minimizan las cicatrices visibles.',
        },
        {
            icon: HeartPulse,
            title: 'Estudio Patológico',
            description: 'Todas las muestras se envían a análisis histopatológico.',
        },
        {
            icon: Heart,
            title: 'Seguimiento Integral',
            description: 'Control oncológico y estético a largo plazo.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/tumor-before.jpg',
            after: '/images/before-after/tumor-after.jpg',
            label: 'Caso 1 - Carcinoma basocelular nasal',
        },
        {
            before: '/images/before-after/tumor-before-2.jpg',
            after: '/images/before-after/tumor-after-2.jpg',
            label: 'Caso 2 - Reconstrucción facial',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Evaluación',
            description: 'Examen de la lesión, dermatoscopía y planificación quirúrgica.',
            duration: '30-45 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Cirugía',
            description: 'Extracción con márgenes y reconstrucción inmediata.',
            duration: '30 min - 3 hrs',
            icon: Scissors,
        },
        {
            step: 3,
            title: 'Patología',
            description: 'Análisis del tejido para confirmar extracción completa.',
            duration: '7-10 días',
            icon: Search,
        },
        {
            step: 4,
            title: 'Seguimiento',
            description: 'Controles para vigilar recurrencia y resultado estético.',
            duration: 'Continuo',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Cómo sé si una lesión es maligna?',
            answer: 'Las señales de alarma incluyen: crecimiento reciente, sangrado, cambios de color, bordes irregulares, ulceración. Ante cualquier duda, es mejor evaluarla.',
        },
        {
            question: '¿La cirugía es ambulatoria?',
            answer: 'La mayoría de casos son ambulatorios con anestesia local. Tumores grandes o en ubicaciones complejas pueden requerir quirófano y sedación.',
        },
        {
            question: '¿Quedará cicatriz?',
            answer: 'Siempre hay alguna cicatriz, pero utilizamos técnicas de cirugía plástica para hacerla lo menos visible posible.',
        },
        {
            question: '¿Qué es la cirugía de Mohs?',
            answer: 'Es una técnica de extracción por capas con análisis inmediato de márgenes. Cuando se realiza por un dermatólogo, nosotros hacemos la reconstrucción.',
        },
        {
            question: '¿El carcinoma puede reaparecer?',
            answer: 'Si se extirpa completamente, la recurrencia local es rara. Pero pueden aparecer nuevos tumores en otras áreas, por lo que el seguimiento es importante.',
        },
        {
            question: '¿Trabajan con oncólogos?',
            answer: 'Sí, coordinamos con dermatólogos y oncólogos cuando es necesario para un manejo integral del paciente.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '500+', label: 'Tumores extirpados' },
            { value: '99%', label: 'Márgenes libres' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'No ignores esa lesión sospechosa',
        description: 'Agenda tu evaluación para determinar el mejor tratamiento.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function TumoresCarcinomasPage() {
    return <ProcedurePage data={tumoresCarcinomasData} />
}

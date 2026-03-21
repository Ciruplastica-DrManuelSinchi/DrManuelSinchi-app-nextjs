"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    Activity,
    Stethoscope
} from 'lucide-react'

// ============================================
// HERIDAS Y ÚLCERAS COMPLEJAS DATA
// ============================================

const heridasUlcerasData: ProcedureData = {
    // Routing & Category
    slug: 'heridas-ulceras',
    category: 'reconstructiva',
    categoryLabel: 'Cirugía Reconstructiva',
    categoryPath: '/cirugia-reconstructiva',

    // Hero Section
    hero: {
        badge: 'Manejo Especializado',
        title: 'Heridas y Úlceras Complejas',
        description: 'Tratamiento integral de heridas crónicas y úlceras que no cicatrizan. Enfoque multidisciplinario para restaurar la integridad de los tejidos.',
        duration: 'Variable',
        recovery: 'Según el caso',
        anesthesia: 'Según procedimiento',
        whatsappMessage: 'Hola, me interesa información sobre tratamiento de heridas complejas',
    },

    // Info Section
    info: {
        title: '¿Qué son las Heridas y Úlceras Complejas?',
        content: [
            'Las heridas complejas son aquellas que no cicatrizan en el tiempo esperado o que presentan complicaciones como infección, exposición de estructuras profundas o pérdida significativa de tejido. Las úlceras crónicas incluyen las úlceras por presión, vasculares y diabéticas.',
            'El manejo requiere un <strong class="text-primary">enfoque integral</strong> que incluye control de factores de riesgo, tratamiento de la causa subyacente, manejo local de la herida y, cuando es necesario, procedimientos quirúrgicos reconstructivos.',
        ],
        image: '/images/procedures/que-es/heridas-y-ulceras-tecnica.jpg',
        highlights: {
            title: 'Tipos de Heridas que Tratamos',
            icon: Activity,
            items: [
                'Úlceras por presión',
                'Úlceras diabéticas',
                'Úlceras vasculares (venosas/arteriales)',
                'Heridas traumáticas complejas',
                'Dehiscencias quirúrgicas',
                'Heridas infectadas',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Stethoscope,
            title: 'Enfoque Multidisciplinario',
            description: 'Coordinamos con otros especialistas según la causa.',
        },
        {
            icon: Activity,
            title: 'Tratamiento Integral',
            description: 'Abordamos la herida y los factores que impiden su cierre.',
        },
        {
            icon: Shield,
            title: 'Técnicas Avanzadas',
            description: 'Terapia de presión negativa, injertos, colgajos.',
        },
        {
            icon: Heart,
            title: 'Seguimiento Cercano',
            description: 'Curaciones y controles frecuentes hasta la cicatrización.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/heridas-before.jpg',
            after: '/images/before-after/heridas-after.jpg',
            label: 'Caso 1 - Úlcera por presión',
        },
        {
            before: '/images/before-after/heridas-before.jpg',
            after: '/images/before-after/heridas-after.jpg',
            label: 'Caso 2 - Herida compleja',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Evaluación Inicial',
            description: 'Análisis de la herida, causa subyacente y estado general del paciente.',
            duration: '45-60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Plan de Tratamiento',
            description: 'Diseño de estrategia integral: control de causa, manejo local y cirugía si aplica.',
            duration: 'En consulta',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Tratamiento Activo',
            description: 'Curaciones, terapia de presión negativa, desbridamiento, procedimientos quirúrgicos.',
            duration: 'Semanas a meses',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Cierre y Seguimiento',
            description: 'Logro del cierre de la herida y prevención de recurrencia.',
            duration: 'Variable',
            icon: Star,
        },
    ],

    // Videos
    videos: [
    ],

    // FAQs
    faqs: [
        {
            question: '¿Por qué mi herida no cicatriza?',
            answer: 'Las heridas pueden no cicatrizar por múltiples factores: mala circulación, diabetes descontrolada, infección, presión continua, desnutrición, medicamentos, o enfermedades que afectan la cicatrización.',
        },
        {
            question: '¿Qué es la terapia de presión negativa (VAC)?',
            answer: 'Es un sistema que aplica presión negativa controlada sobre la herida mediante una esponja y succión. Estimula la formación de tejido nuevo, reduce el edema y controla el exudado.',
        },
        {
            question: '¿Cuándo se necesita cirugía?',
            answer: 'La cirugía se considera cuando la herida no puede cerrar por sí sola, hay exposición de hueso o tendones, o se necesitan colgajos o injertos para lograr cobertura.',
        },
        {
            question: '¿Cómo prevenir úlceras por presión?',
            answer: 'Cambios frecuentes de posición, colchones especiales, buena nutrición, hidratación de la piel y vigilancia de zonas de presión en pacientes postrados.',
        },
        {
            question: '¿Cuánto tiempo toma curar una herida crónica?',
            answer: 'Depende del tipo, tamaño y causa. Puede tomar desde semanas hasta meses. Lo importante es el enfoque correcto y la paciencia en el tratamiento.',
        },
        {
            question: '¿Trabajan con otros especialistas?',
            answer: 'Sí, frecuentemente coordinamos con cirugía vascular, endocrinología, infectología, nutrición y otras especialidades según las necesidades del paciente.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '500+', label: 'Heridas complejas tratadas' },
            { value: '90%', label: 'Tasa de cierre exitoso' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: '¿Tienes una herida que no cicatriza?',
        description: 'Agenda tu consulta para una evaluación completa y un plan de tratamiento personalizado.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function HeridasUlcerasPage() {
    return <ProcedurePage data={heridasUlcerasData} />
}

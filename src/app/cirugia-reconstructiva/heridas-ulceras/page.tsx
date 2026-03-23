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

    en: {
        categoryLabel: 'Reconstructive Surgery',
        hero: {
            badge: 'Specialized Management',
            title: 'Wound & Ulcer Treatment',
            description: 'Comprehensive treatment of chronic wounds and non-healing ulcers. A multidisciplinary approach to restore tissue integrity.',
            duration: 'Variable',
            recovery: 'Case by case',
            anesthesia: 'Depends on procedure',
        },
        info: {
            title: 'What Are Complex Wounds and Ulcers?',
            content: [
                'Complex wounds are those that do not heal within the expected timeframe or that present complications such as infection, exposure of deep structures, or significant tissue loss. Chronic ulcers include pressure ulcers, vascular ulcers, and diabetic ulcers.',
                'Management requires a <strong class="text-primary">comprehensive approach</strong> that includes controlling risk factors, treating the underlying cause, local wound management, and, when necessary, reconstructive surgical procedures.',
            ],
            highlights: {
                title: 'Types of Wounds We Treat',
                items: [
                    'Pressure ulcers',
                    'Diabetic ulcers',
                    'Vascular ulcers (venous/arterial)',
                    'Complex traumatic wounds',
                    'Surgical wound dehiscence',
                    'Infected wounds',
                ],
            },
        },
        benefits: [
            {
                title: 'Multidisciplinary Approach',
                description: 'We coordinate with other specialists depending on the cause.',
            },
            {
                title: 'Comprehensive Treatment',
                description: 'We address both the wound and the factors preventing its closure.',
            },
            {
                title: 'Advanced Techniques',
                description: 'Negative pressure therapy, skin grafts, and flaps.',
            },
            {
                title: 'Close Follow-Up',
                description: 'Frequent dressing changes and check-ups until full healing.',
            },
        ],
        process: [
            {
                title: 'Initial Assessment',
                description: 'Analysis of the wound, underlying cause, and overall patient condition.',
                duration: '45-60 min',
            },
            {
                title: 'Treatment Plan',
                description: 'Design of a comprehensive strategy: cause control, local management, and surgery if applicable.',
                duration: 'During consultation',
            },
            {
                title: 'Active Treatment',
                description: 'Dressing changes, negative pressure therapy, debridement, and surgical procedures.',
                duration: 'Weeks to months',
            },
            {
                title: 'Closure and Follow-Up',
                description: 'Achieving wound closure and preventing recurrence.',
                duration: 'Variable',
            },
        ],
        faqs: [
            {
                question: 'Why is my wound not healing?',
                answer: 'Wounds may fail to heal due to multiple factors: poor circulation, uncontrolled diabetes, infection, continuous pressure, malnutrition, medications, or diseases that impair healing.',
            },
            {
                question: 'What is negative pressure therapy (VAC)?',
                answer: 'It is a system that applies controlled negative pressure to the wound using a foam dressing and suction. It stimulates the formation of new tissue, reduces edema, and controls wound exudate.',
            },
            {
                question: 'When is surgery necessary?',
                answer: 'Surgery is considered when the wound cannot close on its own, there is exposure of bone or tendons, or flaps and grafts are needed to achieve coverage.',
            },
            {
                question: 'How can pressure ulcers be prevented?',
                answer: 'Frequent repositioning, specialized mattresses, proper nutrition, skin hydration, and monitoring of pressure points in bedridden patients.',
            },
            {
                question: 'How long does it take to heal a chronic wound?',
                answer: 'It depends on the type, size, and cause. It can take from weeks to months. The key is the correct approach and patience throughout the treatment process.',
            },
            {
                question: 'Do you work with other specialists?',
                answer: 'Yes, we frequently coordinate with vascular surgery, endocrinology, infectious disease, nutrition, and other specialties based on the patient\'s needs.',
            },
        ],
        cta: {
            title: 'Do you have a wound that won\'t heal?',
            description: 'Schedule your consultation for a complete evaluation and personalized treatment plan.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function HeridasUlcerasPage() {
    return <ProcedurePage data={heridasUlcerasData} />
}

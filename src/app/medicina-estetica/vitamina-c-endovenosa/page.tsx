"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Shield,
    Heart,
    Calendar,
    Star,
    Droplets,
    Sun,
    Zap
} from 'lucide-react'

// ============================================
// VITAMINA C ENDOVENOSA DATA
// ============================================

const vitaminaCData: ProcedureData = {
    slug: 'vitamina-c-endovenosa',
    category: 'estetica',
    categoryLabel: 'Medicina Estética',
    categoryPath: '/medicina-estetica',

    hero: {
        badge: 'Terapia Intravenosa',
        title: 'Vitamina C Endovenosa',
        description: 'Terapia antioxidante potente que mejora la calidad de la piel, estimula el sistema inmune y proporciona energía. Absorción directa y efectiva al torrente sanguíneo.',
        duration: '30-60 min',
        recovery: 'Inmediata',
        anesthesia: 'Sin anestesia',
        whatsappMessage: 'Hola, me interesa información sobre vitamina C endovenosa',
    },

    info: {
        title: '¿Qué es la Vitamina C Endovenosa?',
        content: [
            'La vitamina C endovenosa es una terapia que administra altas dosis de ácido ascórbico directamente al torrente sanguíneo, logrando concentraciones mucho más altas que las posibles por vía oral.',
            'Esta terapia es un <strong class="text-primary">potente antioxidante</strong> que combate los radicales libres, <strong class="text-primary">estimula la producción de colágeno</strong> para una piel más firme, y <strong class="text-primary">fortalece el sistema inmunológico</strong>. Además, proporciona energía y vitalidad.',
        ],
        image: '/images/procedures/que-es/vitamina-c-tecnica.jpg',
        highlights: {
            title: 'Beneficios de la Terapia',
            icon: Droplets,
            items: [
                'Antioxidante potente',
                'Estimula colágeno',
                'Mejora luminosidad de piel',
                'Fortalece sistema inmune',
                'Aumenta energía',
                'Acelera recuperación',
            ],
        },
    },

    benefits: [
        {
            icon: Sun,
            title: 'Piel Luminosa',
            description: 'Mejora la textura y brillo natural de la piel.',
        },
        {
            icon: Shield,
            title: 'Antioxidante',
            description: 'Combate el daño de los radicales libres.',
        },
        {
            icon: Zap,
            title: 'Energía',
            description: 'Mayor vitalidad y sensación de bienestar.',
        },
        {
            icon: Heart,
            title: 'Inmunidad',
            description: 'Fortalece las defensas del organismo.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/vitaminac-before.jpg',
            after: '/images/before-after/vitaminac-after.jpg',
            label: 'Caso 1 - Mejora de luminosidad',
        },
        {
            before: '/images/before-after/vitaminac-before-2.jpg',
            after: '/images/before-after/vitaminac-after-2.jpg',
            label: 'Caso 2 - Rejuvenecimiento',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Evaluación Inicial',
            description: 'Revisión de tu estado de salud y objetivos del tratamiento.',
            duration: '15 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación',
            description: 'Canalización de vía periférica.',
            duration: '5 min',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Infusión',
            description: 'Administración de la vitamina C endovenosa.',
            duration: '30-60 min',
            icon: Droplets,
        },
        {
            step: 4,
            title: 'Recuperación',
            description: 'Puedes retomar tus actividades inmediatamente.',
            duration: 'Inmediata',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Por qué endovenosa y no oral?',
            answer: 'Por vía oral, el intestino solo absorbe una cantidad limitada. Por vía endovenosa logramos concentraciones en sangre 100 veces mayores.',
        },
        {
            question: '¿Cada cuánto debo hacerme el tratamiento?',
            answer: 'Para mantenimiento: 1 vez por semana o cada 2 semanas. Para tratamiento intensivo: 2-3 veces por semana por un período determinado.',
        },
        {
            question: '¿Es seguro?',
            answer: 'Sí, es un tratamiento muy seguro en personas sanas. Se requiere evaluación previa para descartar algunas condiciones como deficiencia de G6PD.',
        },
        {
            question: '¿Hay efectos secundarios?',
            answer: 'Raramente. Puede haber sensación de frío durante la infusión o ligera irritación en el sitio de punción. Los efectos graves son muy raros.',
        },
        {
            question: '¿Cuándo veré resultados en mi piel?',
            answer: 'Muchos pacientes notan mejora en luminosidad desde las primeras sesiones. Los beneficios en firmeza se acumulan con el tiempo.',
        },
        {
            question: '¿Puedo combinarlo con otros tratamientos estéticos?',
            answer: 'Sí, de hecho potencia los resultados de otros tratamientos como láser, peelings y bioestimuladores.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '2000+', label: 'Infusiones realizadas' },
            { value: '99%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'Revitaliza tu cuerpo desde adentro',
        description: 'Agenda tu sesión de vitamina C endovenosa para mejorar tu piel e inmunidad.',
    },

    en: {
        categoryLabel: 'Aesthetic Medicine',
        hero: {
            badge: 'Intravenous Therapy',
            title: 'Intravenous Vitamin C',
            description: 'Powerful antioxidant therapy that improves skin quality, stimulates the immune system and provides energy. Direct and effective absorption into the bloodstream.',
            duration: '30-60 min',
            recovery: 'Immediate',
            anesthesia: 'None required',
        },
        info: {
            title: 'What is Intravenous Vitamin C?',
            content: [
                'Intravenous vitamin C is a therapy that administers high doses of ascorbic acid directly into the bloodstream, achieving concentrations much higher than those possible by oral intake.',
                'This therapy is a <strong class="text-primary">potent antioxidant</strong> that combats free radicals, <strong class="text-primary">stimulates collagen production</strong> for firmer skin, and <strong class="text-primary">strengthens the immune system</strong>. It also provides energy and vitality.',
            ],
            highlights: {
                title: 'Therapy Benefits',
                items: [
                    'Potent antioxidant',
                    'Stimulates collagen',
                    'Improves skin radiance',
                    'Strengthens immune system',
                    'Increases energy',
                    'Accelerates recovery',
                ],
            },
        },
        benefits: [
            {
                title: 'Radiant Skin',
                description: 'Improves natural skin texture and glow.',
            },
            {
                title: 'Antioxidant',
                description: 'Combats damage from free radicals.',
            },
            {
                title: 'Energy',
                description: 'Greater vitality and sense of well-being.',
            },
            {
                title: 'Immunity',
                description: 'Strengthens the body\'s defenses.',
            },
        ],
        process: [
            {
                title: 'Initial Evaluation',
                description: 'Review of your health status and treatment goals.',
                duration: '15 min',
            },
            {
                title: 'Preparation',
                description: 'Peripheral IV line placement.',
                duration: '5 min',
            },
            {
                title: 'Infusion',
                description: 'Administration of intravenous vitamin C.',
                duration: '30-60 min',
            },
            {
                title: 'Recovery',
                description: 'You can resume your activities immediately.',
                duration: 'Immediate',
            },
        ],
        faqs: [
            {
                question: 'Why intravenous and not oral?',
                answer: 'Taken orally, the intestine only absorbs a limited amount. Intravenously, we achieve blood concentrations 100 times higher.',
            },
            {
                question: 'How often should I have the treatment?',
                answer: 'For maintenance: once a week or every 2 weeks. For intensive treatment: 2-3 times per week for a set period.',
            },
            {
                question: 'Is it safe?',
                answer: 'Yes, it is a very safe treatment for healthy individuals. Prior evaluation is required to rule out certain conditions such as G6PD deficiency.',
            },
            {
                question: 'Are there side effects?',
                answer: 'Rarely. There may be a sensation of cold during the infusion or slight irritation at the puncture site. Serious effects are very rare.',
            },
            {
                question: 'When will I see results in my skin?',
                answer: 'Many patients notice improvement in radiance from the first sessions. Firmness benefits accumulate over time.',
            },
            {
                question: 'Can I combine it with other aesthetic treatments?',
                answer: 'Yes, in fact it enhances the results of other treatments such as laser, peels and biostimulators.',
            },
        ],
        cta: {
            title: 'Revitalize your body from within',
            description: 'Schedule your intravenous vitamin C session to improve your skin and immunity.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function VitaminaCEndovenosaPage() {
    return <ProcedurePage data={vitaminaCData} />
}

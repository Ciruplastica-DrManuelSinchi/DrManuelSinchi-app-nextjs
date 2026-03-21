"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    Zap,
    RefreshCw
} from 'lucide-react'

// ============================================
// BIOESTIMULADORES DATA
// ============================================

const bioestimuladoresData: ProcedureData = {
    slug: 'bioestimuladores',
    category: 'estetica',
    categoryLabel: 'Medicina Estética',
    categoryPath: '/medicina-estetica',

    hero: {
        badge: 'Rejuvenecimiento Natural',
        title: 'Bioestimuladores',
        description: 'Estimula la producción natural de colágeno en tu piel para un rejuvenecimiento progresivo y duradero. Resultados naturales que mejoran con el tiempo.',
        duration: '30-45 min',
        recovery: '1-3 días',
        anesthesia: 'Anestesia tópica',
        whatsappMessage: 'Hola, me interesa información sobre bioestimuladores',
    },

    info: {
        title: '¿Qué son los Bioestimuladores?',
        content: [
            'Los bioestimuladores son sustancias inyectables que estimulan a tu propio cuerpo a producir colágeno nuevo. A diferencia de los rellenos tradicionales que añaden volumen inmediato, los bioestimuladores trabajan gradualmente mejorando la calidad de la piel desde adentro.',
            'Los más utilizados son el <strong class="text-primary">Ácido Poliláctico (Sculptra)</strong> y la <strong class="text-primary">Hidroxiapatita de Calcio (Radiesse)</strong>. Ambos son reabsorbibles y seguros, con resultados que pueden durar hasta 2 años.',
        ],
        image: '/images/procedures/que-es/bioestimuladores-tecnica.jpg',
        highlights: {
            title: 'Tipos de Bioestimuladores',
            icon: Zap,
            items: [
                'Ácido Poliláctico (Sculptra)',
                'Hidroxiapatita de Calcio (Radiesse)',
                'Policaprolactona',
                'Tratamiento facial',
                'Tratamiento corporal',
                'Rejuvenecimiento de manos',
            ],
        },
    },

    benefits: [
        {
            icon: RefreshCw,
            title: 'Colágeno Natural',
            description: 'Estimula tu propio cuerpo a producir colágeno nuevo.',
        },
        {
            icon: Sparkles,
            title: 'Resultados Progresivos',
            description: 'Mejora gradual y natural, no cambios abruptos.',
        },
        {
            icon: Heart,
            title: 'Larga Duración',
            description: 'Efectos que pueden durar hasta 2 años.',
        },
        {
            icon: Shield,
            title: 'Seguro y Reabsorbible',
            description: 'Productos biocompatibles que el cuerpo absorbe naturalmente.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/bioestimuladores-before.jpg',
            after: '/images/before-after/bioestimuladores-after.jpg',
            label: 'Caso 1 - Rejuvenecimiento facial',
        },
        {
            before: '/images/before-after/bioestimuladores-before-2.jpg',
            after: '/images/before-after/bioestimuladores-after-2.jpg',
            label: 'Caso 2 - Mejora de textura',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Evaluación de la Piel',
            description: 'Análisis de la calidad de tu piel y grado de flacidez.',
            duration: '20-30 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación',
            description: 'Limpieza y aplicación de anestesia tópica.',
            duration: '15 min',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Aplicación',
            description: 'Inyección del bioestimulador en puntos estratégicos.',
            duration: '30-45 min',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Resultados',
            description: 'Mejora gradual visible en semanas a meses.',
            duration: '2-6 meses',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Cuál es la diferencia entre bioestimuladores y rellenos?',
            answer: 'Los rellenos (como ácido hialurónico) dan volumen inmediato. Los bioestimuladores estimulan la producción de colágeno para una mejora gradual y más natural de la calidad de la piel.',
        },
        {
            question: '¿Cuántas sesiones necesito?',
            answer: 'Generalmente 2-3 sesiones separadas por 4-6 semanas. Luego se pueden hacer sesiones de mantenimiento cada 12-18 meses.',
        },
        {
            question: '¿Cuándo veré los resultados?',
            answer: 'Los primeros cambios se notan a las 4-6 semanas. El resultado máximo se aprecia a los 3-6 meses, cuando se ha formado nuevo colágeno.',
        },
        {
            question: '¿Es doloroso?',
            answer: 'Hay molestias mínimas. Usamos anestesia tópica y los productos contienen lidocaína. La mayoría de pacientes lo tolera muy bien.',
        },
        {
            question: '¿Qué cuidados debo tener después?',
            answer: 'Masajes en la zona tratada (te enseñamos cómo), evitar ejercicio intenso 24-48 horas, y protección solar.',
        },
        {
            question: '¿Puedo combinarlo con otros tratamientos?',
            answer: 'Sí, se complementa muy bien con botox, ácido hialurónico y otros tratamientos. Diseñamos un plan integral según tus necesidades.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '1500+', label: 'Tratamientos realizados' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'Estimula tu colágeno naturalmente',
        description: 'Agenda tu consulta para conocer cómo los bioestimuladores pueden rejuvenecer tu piel.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function BioestimuladoresPage() {
    return <ProcedurePage data={bioestimuladoresData} />
}

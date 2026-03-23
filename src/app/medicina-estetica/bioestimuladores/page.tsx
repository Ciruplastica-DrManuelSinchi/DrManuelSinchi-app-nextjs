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

    en: {
        categoryLabel: 'Aesthetic Medicine',
        hero: {
            badge: 'Natural Rejuvenation',
            title: 'Biostimulators',
            description: 'Stimulate your skin\'s natural collagen production for progressive and long-lasting rejuvenation. Natural results that improve over time.',
            duration: '30-45 min',
            recovery: '1-3 days',
            anesthesia: 'Topical anesthesia',
        },
        info: {
            title: 'What are Biostimulators?',
            content: [
                'Biostimulators are injectable substances that stimulate your own body to produce new collagen. Unlike traditional fillers that add immediate volume, biostimulators work gradually improving skin quality from within.',
                'The most commonly used are <strong class="text-primary">Poly-L-Lactic Acid (Sculptra)</strong> and <strong class="text-primary">Calcium Hydroxyapatite (Radiesse)</strong>. Both are resorbable and safe, with results that can last up to 2 years.',
            ],
            highlights: {
                title: 'Types of Biostimulators',
                items: [
                    'Poly-L-Lactic Acid (Sculptra)',
                    'Calcium Hydroxyapatite (Radiesse)',
                    'Polycaprolactone',
                    'Facial treatment',
                    'Body treatment',
                    'Hand rejuvenation',
                ],
            },
        },
        benefits: [
            {
                title: 'Natural Collagen',
                description: 'Stimulates your own body to produce new collagen.',
            },
            {
                title: 'Progressive Results',
                description: 'Gradual and natural improvement, no abrupt changes.',
            },
            {
                title: 'Long-Lasting',
                description: 'Effects that can last up to 2 years.',
            },
            {
                title: 'Safe and Resorbable',
                description: 'Biocompatible products that the body naturally absorbs.',
            },
        ],
        process: [
            {
                title: 'Skin Evaluation',
                description: 'Analysis of your skin quality and degree of laxity.',
                duration: '20-30 min',
            },
            {
                title: 'Preparation',
                description: 'Cleansing and application of topical anesthesia.',
                duration: '15 min',
            },
            {
                title: 'Application',
                description: 'Injection of the biostimulator at strategic points.',
                duration: '30-45 min',
            },
            {
                title: 'Results',
                description: 'Gradual improvement visible within weeks to months.',
                duration: '2-6 months',
            },
        ],
        faqs: [
            {
                question: 'What is the difference between biostimulators and fillers?',
                answer: 'Fillers (such as hyaluronic acid) provide immediate volume. Biostimulators stimulate collagen production for a gradual and more natural improvement in skin quality.',
            },
            {
                question: 'How many sessions do I need?',
                answer: 'Generally 2-3 sessions spaced 4-6 weeks apart. Maintenance sessions can then be done every 12-18 months.',
            },
            {
                question: 'When will I see results?',
                answer: 'The first changes are noticeable at 4-6 weeks. The maximum result is appreciated at 3-6 months, when new collagen has formed.',
            },
            {
                question: 'Is it painful?',
                answer: 'There is minimal discomfort. We use topical anesthesia and the products contain lidocaine. Most patients tolerate it very well.',
            },
            {
                question: 'What care should I take afterward?',
                answer: 'Massages on the treated area (we will teach you how), avoid intense exercise for 24-48 hours, and use sun protection.',
            },
            {
                question: 'Can I combine it with other treatments?',
                answer: 'Yes, it complements very well with botox, hyaluronic acid and other treatments. We design a comprehensive plan according to your needs.',
            },
        ],
        cta: {
            title: 'Stimulate your collagen naturally',
            description: 'Schedule your consultation to learn how biostimulators can rejuvenate your skin.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function BioestimuladoresPage() {
    return <ProcedurePage data={bioestimuladoresData} />
}

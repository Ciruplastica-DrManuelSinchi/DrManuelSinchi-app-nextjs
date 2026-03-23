"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Timer,
    Star,
    ArrowUp,
    TrendingUp
} from 'lucide-react'

// ============================================
// MASTOPEXIA DATA
// ============================================

const mastopexiaData: ProcedureData = {
    // Routing & Category
    slug: 'mastopexia',
    category: 'corporal',
    categoryLabel: 'Cirugía Corporal',
    categoryPath: '/cirugia-plastica-corporal',

    // Hero Section
    hero: {
        badge: 'Levantamiento de Senos',
        title: 'Mastopexia',
        description: 'Recupera la firmeza y juventud de tus senos con el levantamiento mamario. Corrige la caída y devuelve la proyección natural a tu busto.',
        duration: '2-3 horas',
        recovery: '14-21 días recuperación',
        anesthesia: 'Anestesia general',
        whatsappMessage: 'Hola, me interesa información sobre mastopexia',
    },

    // Info Section
    info: {
        title: '¿Qué es la Mastopexia?',
        content: [
            'La mastopexia o levantamiento de senos es una cirugía que corrige la caída (ptosis) mamaria, elevando y remodelando los senos para devolverles una posición más juvenil y firme.',
            'Durante el procedimiento se remueve el exceso de piel, se reposiciona el pezón y la areola, y se remodela el tejido mamario. Puede combinarse con <strong class="text-primary">implantes</strong> si se desea aumentar el volumen (mastopexia con aumento).',
        ],
        image: '/images/procedures/que-es/mastopexia-tecnica.jpg',
        highlights: {
            title: 'Tipos de Mastopexia',
            icon: ArrowUp,
            items: [
                'Mastopexia periareolar (mínima)',
                'Mastopexia vertical (lollipop)',
                'Mastopexia en ancla (ptosis severa)',
                'Mastopexia con aumento',
                'Mastopexia con reducción',
                'Corrección de asimetrías',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: ArrowUp,
            title: 'Senos Elevados',
            description: 'Corrige la caída y devuelve la proyección juvenil.',
        },
        {
            icon: TrendingUp,
            title: 'Forma Mejorada',
            description: 'Senos más redondos, firmes y proporcionados.',
        },
        {
            icon: Shield,
            title: 'Resultados Duraderos',
            description: 'Con cuidados adecuados, resultados de larga duración.',
        },
        {
            icon: Heart,
            title: 'Autoconfianza',
            description: 'Recupera la seguridad en tu apariencia.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/mastopexia-before.jpg',
            after: '/images/before-after/mastopexia-after.jpg',
            label: 'Caso 1 - Mastopexia sin implantes',
        },
        {
            before: '/images/before-after/mastopexia-before.jpg',
            after: '/images/before-after/mastopexia-after.jpg',
            label: 'Caso 2 - Mastopexia con aumento',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Evaluación del grado de caída, discusión de técnica y expectativas.',
            duration: '45-60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación Pre-quirúrgica',
            description: 'Exámenes, mamografía y preparación física.',
            duration: '1-2 semanas antes',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Procedimiento Quirúrgico',
            description: 'Levantamiento y remodelación bajo anestesia general.',
            duration: '2-3 horas',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Recuperación Inicial',
            description: 'Alta el mismo día o al día siguiente. Uso de sujetador especial.',
            duration: '1-2 días',
            icon: Timer,
        },
        {
            step: 5,
            title: 'Seguimiento y Resultado',
            description: 'Cuidados de cicatrices, controles y resultado final.',
            duration: '3-6 meses',
            icon: Star,
        },
    ],

    // Videos
    videos: [
        {
            title: '¿Qué es la mastopexia?',
            youtubeId: null,
        },
        {
            title: 'Mastopexia con o sin implantes',
            youtubeId: null,
        },
        {
            title: 'Recuperación del levantamiento de senos',
            youtubeId: null,
        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿Necesito implantes con la mastopexia?',
            answer: 'No necesariamente. Si estás conforme con tu volumen actual, solo se realiza el levantamiento. Si deseas más volumen o más proyección, se pueden agregar implantes (mastopexia con aumento).',
        },
        {
            question: '¿A qué edad se recomienda la mastopexia?',
            answer: 'No hay edad específica. Se recomienda cuando hay caída mamaria que afecta la estética o autoestima. Es preferible realizarla cuando no se planean más embarazos.',
        },
        {
            question: '¿Las cicatrices son muy visibles?',
            answer: 'Las cicatrices dependen del grado de caída. Pueden ser alrededor de la areola, vertical hacia el surco, o en forma de ancla. Con el tiempo y cuidados adecuados se atenúan significativamente.',
        },
        {
            question: '¿Podré amamantar después?',
            answer: 'En la mayoría de casos sí. Las técnicas modernas preservan los conductos mamarios. Sin embargo, hay factores individuales que pueden afectar la lactancia.',
        },
        {
            question: '¿Cuánto duran los resultados?',
            answer: 'Los resultados son duraderos pero no permanentes. La gravedad, cambios de peso y el envejecimiento natural afectarán los senos con el tiempo. Usar sujetador y mantener peso estable ayuda a prolongar los resultados.',
        },
        {
            question: '¿Cuál es la diferencia entre mastopexia y aumento?',
            answer: 'La mastopexia levanta y remodela los senos sin añadir volumen. El aumento incrementa el tamaño con implantes. Pueden combinarse para levantar y aumentar simultáneamente.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '1200+', label: 'Mastopexias realizadas' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Recupera la firmeza de tus senos',
        description: 'Agenda tu consulta de valoración y descubre cómo la mastopexia puede rejuvenecer tu busto.',
    },

    en: {
        categoryLabel: 'Body Plastic Surgery',
        hero: {
            badge: 'Breast Lift',
            title: 'Mastopexy',
            description: 'Restore the firmness and youth of your breasts with a breast lift. Correct sagging and return the natural projection to your bust.',
            duration: '2-3 hours',
            recovery: '14-21 days recovery',
            anesthesia: 'General anesthesia',
        },
        info: {
            title: 'What is Mastopexy?',
            content: [
                'Mastopexy, or breast lift, is a surgery that corrects breast ptosis (sagging), elevating and reshaping the breasts to restore a more youthful and firm position.',
                'During the procedure, excess skin is removed, the nipple and areola are repositioned, and the breast tissue is reshaped. It can be combined with <strong class="text-primary">implants</strong> if increased volume is desired (mastopexy with augmentation).',
            ],
            highlights: {
                title: 'Types of Mastopexy',
                items: [
                    'Periareolar mastopexy (minimal)',
                    'Vertical mastopexy (lollipop)',
                    'Anchor mastopexy (severe ptosis)',
                    'Mastopexy with augmentation',
                    'Mastopexy with reduction',
                    'Asymmetry correction',
                ],
            },
        },
        benefits: [
            {
                title: 'Lifted Breasts',
                description: 'Corrects sagging and restores youthful projection.',
            },
            {
                title: 'Improved Shape',
                description: 'Rounder, firmer, and more proportionate breasts.',
            },
            {
                title: 'Long-Lasting Results',
                description: 'With proper care, long-lasting results.',
            },
            {
                title: 'Self-Confidence',
                description: 'Regain confidence in your appearance.',
            },
        ],
        process: [
            {
                title: 'Assessment Consultation',
                description: 'Evaluation of the degree of ptosis, discussion of technique and expectations.',
                duration: '45-60 min',
            },
            {
                title: 'Pre-surgical Preparation',
                description: 'Lab tests, mammogram, and physical preparation.',
                duration: '1-2 weeks prior',
            },
            {
                title: 'Surgical Procedure',
                description: 'Lifting and reshaping under general anesthesia.',
                duration: '2-3 hours',
            },
            {
                title: 'Initial Recovery',
                description: 'Same-day or next-day discharge. Use of special bra.',
                duration: '1-2 days',
            },
            {
                title: 'Follow-up and Result',
                description: 'Scar care, check-ups, and final result.',
                duration: '3-6 months',
            },
        ],
        faqs: [
            {
                question: 'Do I need implants with mastopexy?',
                answer: 'Not necessarily. If you are satisfied with your current volume, only the lift is performed. If you want more volume or projection, implants can be added (mastopexy with augmentation).',
            },
            {
                question: 'At what age is mastopexy recommended?',
                answer: 'There is no specific age. It is recommended when breast sagging affects aesthetics or self-esteem. It is preferable to perform it when no more pregnancies are planned.',
            },
            {
                question: 'Are the scars very visible?',
                answer: 'Scars depend on the degree of ptosis. They may be around the areola, vertical toward the fold, or anchor-shaped. Over time and with proper care they fade significantly.',
            },
            {
                question: 'Will I be able to breastfeed afterward?',
                answer: 'In most cases yes. Modern techniques preserve the mammary ducts. However, individual factors may affect breastfeeding.',
            },
            {
                question: 'How long do the results last?',
                answer: 'Results are long-lasting but not permanent. Gravity, weight changes, and natural aging will affect the breasts over time. Wearing a bra and maintaining stable weight helps prolong results.',
            },
            {
                question: 'What is the difference between mastopexy and augmentation?',
                answer: 'Mastopexy lifts and reshapes the breasts without adding volume. Augmentation increases size with implants. They can be combined to lift and augment simultaneously.',
            },
        ],
        cta: {
            title: 'Restore the firmness of your breasts',
            description: 'Schedule your assessment consultation and discover how mastopexy can rejuvenate your bust.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function MastopexiaPage() {
    return <ProcedurePage data={mastopexiaData} />
}

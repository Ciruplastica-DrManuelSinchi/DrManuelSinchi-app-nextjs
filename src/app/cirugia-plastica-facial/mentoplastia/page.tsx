"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Timer,
    Star,
    Maximize2,
    Smile
} from 'lucide-react'

// ============================================
// MENTOPLASTIA DATA
// ============================================

const mentoplastiaData: ProcedureData = {
    // Routing & Category
    slug: 'mentoplastia',
    category: 'facial',
    categoryLabel: 'Cirugía Facial',
    categoryPath: '/cirugia-plastica-facial',

    // Hero Section
    hero: {
        badge: 'Armonía del Perfil',
        title: 'Mentoplastia',
        description: 'Equilibra tu perfil facial con un mentón proporcionado. Aumenta, reduce o proyecta tu mentón para lograr la armonía perfecta.',
        duration: '1-2 horas',
        recovery: '7-10 días recuperación',
        anesthesia: 'Anestesia local + sedación',
        whatsappMessage: 'Hola, me interesa información sobre mentoplastia',
    },

    // Info Section
    info: {
        title: '¿Qué es la Mentoplastia?',
        content: [
            'La mentoplastia es una cirugía que modifica la forma, tamaño y proyección del mentón para lograr un perfil facial equilibrado. Puede realizarse mediante implantes de silicona o mediante osteotomía (modificación del hueso).',
            'Este procedimiento es especialmente efectivo para corregir mentones <strong class="text-primary">retraídos, prominentes o asimétricos</strong>. Frecuentemente se combina con rinoplastia para lograr una armonía facial completa.',
        ],
        image: '/images/procedures/que-es/mentoplastia-tecnica.jpg',
        highlights: {
            title: 'Tipos de Mentoplastia',
            icon: Maximize2,
            items: [
                'Aumento con implante de silicona',
                'Reducción del mentón',
                'Proyección hacia adelante',
                'Corrección de asimetrías',
                'Osteotomía (modificación ósea)',
                'Combinación con rinoplastia (perfiloplastia)',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Maximize2,
            title: 'Perfil Equilibrado',
            description: 'Logra proporciones faciales armónicas y atractivas.',
        },
        {
            icon: Smile,
            title: 'Mejora la Mandíbula',
            description: 'Define la línea mandibular y el contorno facial.',
        },
        {
            icon: Shield,
            title: 'Resultados Permanentes',
            description: 'El cambio es definitivo y natural.',
        },
        {
            icon: Heart,
            title: 'Mínima Cicatriz',
            description: 'Incisión oculta dentro de la boca o bajo el mentón.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/mentoplastia-before.jpg',
            after: '/images/before-after/mentoplastia-after.jpg',
            label: 'Caso 1 - Aumento de mentón',
        },
        {
            before: '/images/before-after/mentoplastia-before.jpg',
            after: '/images/before-after/mentoplastia-after.jpg',
            label: 'Caso 2 - Perfiloplastia',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Análisis facial, cefalometría y planificación con simulación digital.',
            duration: '45 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación Pre-quirúrgica',
            description: 'Exámenes médicos y selección del tipo de procedimiento o implante.',
            duration: '1 semana antes',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Procedimiento Quirúrgico',
            description: 'Cirugía ambulatoria con anestesia local y sedación.',
            duration: '1-2 horas',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Recuperación Inicial',
            description: 'Uso de mentón era de compresión, dieta blanda y control de inflamación.',
            duration: '7-10 días',
            icon: Timer,
        },
        {
            step: 5,
            title: 'Resultado Final',
            description: 'Apreciación completa del nuevo perfil una vez baje la inflamación.',
            duration: '2-3 meses',
            icon: Star,
        },
    ],

    // Videos
    videos: [
        {
            title: 'Caso real: PERFILAMIENTO FACIAL',
            youtubeId: 'r_ptdooFxDA'
        },
        {
            title: '✨ PERFILOPLASTIA: Rinoplastia ultrasónica + Mentoplastia con implante ✨',
            youtubeId: 'PnuhU1EBdXQ'
        },
        {
            title: 'Mentoplastia: lo que debes saber',
            youtubeId: 'WDsZMaIWFYk'
        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿Qué es mejor: implante o osteotomía?',
            answer: 'Depende del caso. Los implantes son ideales para aumentos moderados y tienen recuperación más rápida. La osteotomía (corte del hueso) es preferible para cambios mayores, reducciones o cuando se necesita mover el mentón en múltiples direcciones.',
        },
        {
            question: '¿Los implantes de mentón son seguros?',
            answer: 'Sí, los implantes de silicona sólida son muy seguros y han sido utilizados por décadas. Son biocompatibles, no se rompen y raramente causan problemas. Se integran bien con los tejidos.',
        },
        {
            question: '¿Dónde queda la cicatriz?',
            answer: 'La incisión puede realizarse dentro de la boca (sin cicatriz visible) o bajo el mentón (cicatriz mínima de 2-3 cm que se oculta en el pliegue natural).',
        },
        {
            question: '¿Se puede combinar con rinoplastia?',
            answer: 'Sí, la combinación de rinoplastia y mentoplastia se conoce como perfiloplastia y es muy común. Permite equilibrar el perfil facial completo en una sola cirugía.',
        },
        {
            question: '¿Cuánto dura la recuperación?',
            answer: 'La mayoría de pacientes retoman actividades normales en 7-10 días. Hay inflamación inicial que disminuye gradualmente. El resultado final se aprecia en 2-3 meses.',
        },
        {
            question: '¿Es un procedimiento doloroso?',
            answer: 'El dolor post-operatorio es leve a moderado y se controla bien con analgésicos. Hay sensación de tensión y adormecimiento temporal del labio inferior que se resuelve en semanas.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '500+', label: 'Mentoplastias realizadas' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Logra el perfil facial que siempre deseaste',
        description: 'Agenda tu consulta de valoración y descubre cómo la mentoplastia puede equilibrar tu rostro.',
    },

    en: {
        categoryLabel: 'Facial Plastic Surgery',
        hero: {
            badge: 'Profile Harmony',
            title: 'Mentoplasty',
            description: 'Balance your facial profile with a proportionate chin. Augment, reduce, or project your chin to achieve perfect harmony.',
            duration: '1-2 hours',
            recovery: '7-10 days recovery',
            anesthesia: 'Local anesthesia + sedation',
        },
        info: {
            title: 'What is Mentoplasty?',
            content: [
                'Mentoplasty is a surgery that modifies the shape, size, and projection of the chin to achieve a balanced facial profile. It can be performed using silicone implants or through osteotomy (bone modification).',
                'This procedure is especially effective for correcting <strong class="text-primary">retruded, prominent, or asymmetric chins</strong>. It is frequently combined with rhinoplasty to achieve complete facial harmony.',
            ],
            highlights: {
                title: 'Types of Mentoplasty',
                items: [
                    'Augmentation with silicone implant',
                    'Chin reduction',
                    'Forward projection',
                    'Asymmetry correction',
                    'Osteotomy (bone modification)',
                    'Combination with rhinoplasty (profiloplasty)',
                ],
            },
        },
        benefits: [
            {
                title: 'Balanced Profile',
                description: 'Achieve harmonious and attractive facial proportions.',
            },
            {
                title: 'Improved Jawline',
                description: 'Defines the mandibular line and facial contour.',
            },
            {
                title: 'Permanent Results',
                description: 'The change is definitive and natural.',
            },
            {
                title: 'Minimal Scarring',
                description: 'Incision hidden inside the mouth or under the chin.',
            },
        ],
        process: [
            {
                title: 'Assessment Consultation',
                description: 'Facial analysis, cephalometry, and planning with digital simulation.',
                duration: '45 min',
            },
            {
                title: 'Pre-surgical Preparation',
                description: 'Medical exams and selection of procedure type or implant.',
                duration: '1 week before',
            },
            {
                title: 'Surgical Procedure',
                description: 'Outpatient surgery with local anesthesia and sedation.',
                duration: '1-2 hours',
            },
            {
                title: 'Initial Recovery',
                description: 'Use of compression chin strap, soft diet, and swelling control.',
                duration: '7-10 days',
            },
            {
                title: 'Final Result',
                description: 'Full appreciation of the new profile once swelling subsides.',
                duration: '2-3 months',
            },
        ],
        faqs: [
            {
                question: 'What is better: implant or osteotomy?',
                answer: 'It depends on the case. Implants are ideal for moderate augmentations and have a faster recovery. Osteotomy (bone cutting) is preferable for larger changes, reductions, or when the chin needs to be moved in multiple directions.',
            },
            {
                question: 'Are chin implants safe?',
                answer: 'Yes, solid silicone implants are very safe and have been used for decades. They are biocompatible, do not break, and rarely cause problems. They integrate well with tissues.',
            },
            {
                question: 'Where is the scar?',
                answer: 'The incision can be made inside the mouth (no visible scar) or under the chin (minimal scar of 2-3 cm hidden in the natural fold).',
            },
            {
                question: 'Can it be combined with rhinoplasty?',
                answer: 'Yes, the combination of rhinoplasty and mentoplasty is known as profiloplasty and is very common. It allows for balancing the complete facial profile in a single surgery.',
            },
            {
                question: 'How long is the recovery?',
                answer: 'Most patients resume normal activities in 7-10 days. There is initial swelling that gradually decreases. The final result is appreciated in 2-3 months.',
            },
            {
                question: 'Is the procedure painful?',
                answer: 'Post-operative pain is mild to moderate and well-controlled with analgesics. There is a sensation of tension and temporary numbness of the lower lip that resolves in weeks.',
            },
        ],
        cta: {
            title: 'Achieve the facial profile you have always desired',
            description: 'Schedule your assessment consultation and discover how mentoplasty can balance your face.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function MentoplastiaPage() {
    return <ProcedurePage data={mentoplastiaData} />
}

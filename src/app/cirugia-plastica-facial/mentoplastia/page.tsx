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
            title: '¿Qué es la mentoplastia?',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '4:20',
        },
        {
            title: 'Mentoplastia con implante vs osteotomía',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '5:15',
        },
        {
            title: 'Perfiloplastia: rinoplastia + mentoplastia',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '6:02',
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
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function MentoplastiaPage() {
    return <ProcedurePage data={mentoplastiaData} />
}

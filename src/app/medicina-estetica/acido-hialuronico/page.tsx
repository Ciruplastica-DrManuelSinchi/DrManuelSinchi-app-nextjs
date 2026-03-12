"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    Droplets,
    RefreshCw
} from 'lucide-react'

// ============================================
// ÁCIDO HIALURÓNICO DATA
// ============================================

const acidoHialuronicoData: ProcedureData = {
    // Routing & Category
    slug: 'acido-hialuronico',
    category: 'estetica',
    categoryLabel: 'Medicina Estética',
    categoryPath: '/medicina-estetica',

    // Hero Section
    hero: {
        badge: 'Relleno y Volumen',
        title: 'Ácido Hialurónico',
        description: 'Restaura el volumen perdido, rellena arrugas y mejora la hidratación profunda de tu piel. Resultados naturales e inmediatos.',
        duration: '30-45 min',
        recovery: 'Inmediata',
        anesthesia: 'Anestesia tópica',
        whatsappMessage: 'Hola, me interesa información sobre ácido hialurónico',
    },

    // Info Section
    info: {
        title: '¿Qué es el Ácido Hialurónico?',
        content: [
            'El ácido hialurónico es una sustancia que se encuentra naturalmente en nuestro cuerpo, especialmente en la piel, donde retiene agua y mantiene la hidratación y volumen. Con la edad, su producción disminuye.',
            'Los rellenos de ácido hialurónico restauran el volumen perdido, rellenan arrugas y surcos, y mejoran los contornos faciales. Es <strong class="text-primary">completamente biocompatible y reversible</strong>, lo que lo convierte en uno de los tratamientos más seguros.',
        ],
        image: '/images/procedures/que-es/acido-hialuronico-tecnica.jpg',
        highlights: {
            title: 'Aplicaciones del Ácido Hialurónico',
            icon: Droplets,
            items: [
                'Surcos nasogenianos',
                'Líneas de marioneta',
                'Aumento de labios',
                'Volumen en pómulos',
                'Ojeras y valle de lágrimas',
                'Perfilado mandibular',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Droplets,
            title: 'Hidratación Profunda',
            description: 'Atrae y retiene agua mejorando la calidad de la piel.',
        },
        {
            icon: RefreshCw,
            title: 'Reversible',
            description: 'Puede disolverse si no estás satisfecho con el resultado.',
        },
        {
            icon: Shield,
            title: 'Biocompatible',
            description: 'Sustancia natural del cuerpo, muy bajo riesgo de reacción.',
        },
        {
            icon: Heart,
            title: 'Resultados Inmediatos',
            description: 'Ves el cambio desde la primera sesión.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/acido-hialuronico-before.jpg',
            after: '/images/before-after/acido-hialuronico-after.jpg',
            label: 'Caso 1 - Surcos nasogenianos',
        },
        {
            before: '/images/before-after/acido-hialuronico-before.jpg',
            after: '/images/before-after/acido-hialuronico-after.jpg',
            label: 'Caso 2 - Volumen pómulos',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Análisis facial, identificación de áreas a tratar y planificación.',
            duration: '20-30 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación',
            description: 'Limpieza facial y aplicación de anestesia tópica si es necesario.',
            duration: '15 min',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Aplicación del Relleno',
            description: 'Inyección precisa del ácido hialurónico en las zonas planificadas.',
            duration: '30-45 min',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Resultado',
            description: 'Resultados visibles inmediatamente, óptimos en 1-2 semanas.',
            duration: 'Inmediato',
            icon: Star,
        },
    ],

    // Videos
    videos: [
        {
            title: '¿Qué es el ácido hialurónico?',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '4:20',
        },
        {
            title: 'Rellenos faciales: todo lo que debes saber',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '5:45',
        },
        {
            title: 'Mi experiencia con ácido hialurónico',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '4:10',
        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿Cuánto duran los resultados?',
            answer: 'Dependiendo de la zona y el tipo de producto, los resultados duran entre 6-18 meses. Los labios duran menos (6-9 meses) mientras que los pómulos pueden durar más de un año.',
        },
        {
            question: '¿El procedimiento es doloroso?',
            answer: 'Las molestias son mínimas. Utilizamos anestesia tópica y muchos productos contienen lidocaína incorporada. La mayoría de pacientes lo describen como muy tolerable.',
        },
        {
            question: '¿Qué es el "efecto Tyndall"?',
            answer: 'Es un efecto azulado que puede ocurrir si el producto se coloca muy superficialmente, especialmente en zonas de piel fina. Con técnica adecuada es evitable, y si ocurre, es tratable.',
        },
        {
            question: '¿Puedo disolver el ácido hialurónico si no me gusta?',
            answer: 'Sí, existe una enzima llamada hialuronidasa que disuelve el ácido hialurónico en caso de resultados insatisfactorios o complicaciones. Esta es una gran ventaja sobre otros rellenos.',
        },
        {
            question: '¿Hay efectos secundarios?',
            answer: 'Puede haber leve hinchazón, enrojecimiento o moretones que desaparecen en 3-7 días. Las complicaciones serias son muy raras con un profesional experimentado.',
        },
        {
            question: '¿Puedo combinar ácido hialurónico con Botox?',
            answer: 'Sí, de hecho es muy común. El Botox trata las arrugas dinámicas (de expresión) mientras que el ácido hialurónico restaura volumen. Juntos logran un rejuvenecimiento completo.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '5000+', label: 'Tratamientos realizados' },
            { value: '99%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Recupera el volumen y la juventud de tu rostro',
        description: 'Agenda tu consulta y descubre cómo el ácido hialurónico puede rejuvenecer tu apariencia.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function AcidoHialuronicoPage() {
    return <ProcedurePage data={acidoHialuronicoData} />
}

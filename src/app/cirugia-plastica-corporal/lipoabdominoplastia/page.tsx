"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    Zap,
    Layers,
    Target
} from 'lucide-react'

// ============================================
// LIPOABDOMINOPLASTIA DATA
// ============================================

const lipoabdominoplastiaData: ProcedureData = {
    slug: 'lipoabdominoplastia',
    category: 'corporal',
    categoryLabel: 'Cirugía Plástica Corporal',
    categoryPath: '/cirugia-plastica-corporal',

    hero: {
        badge: 'Contorno Corporal Avanzado',
        title: 'Lipoabdominoplastia',
        description: 'La evolución de la abdominoplastia tradicional. Combina liposucción de alta definición con retiro de piel para lograr un abdomen plano, tonificado y con marcación muscular.',
        duration: '3-5 horas',
        recovery: '3-4 semanas',
        anesthesia: 'General',
        whatsappMessage: 'Hola, me interesa información sobre lipoabdominoplastia',
    },

    info: {
        title: '¿Qué es la Lipoabdominoplastia?',
        content: [
            'La lipoabdominoplastia es un procedimiento avanzado que combina lo mejor de la liposucción de alta definición con la abdominoplastia. A diferencia de la abdominoplastia tradicional, permite esculpir el abdomen mientras se retira el exceso de piel.',
            'Ofrecemos técnicas de última generación: <strong class="text-primary">Lipoabdominoplastia HD</strong> con marcación de abdominales, <strong class="text-primary">Renuvion J-Plasma</strong> para retracción de piel y <strong class="text-primary">BodyTite</strong> con radiofrecuencia interna para resultados superiores.',
        ],
        image: '/images/procedures/que-es/lipoabdominoplastia-tecnica.jpg',
        highlights: {
            title: 'Técnicas Disponibles',
            icon: Layers,
            items: [
                'Lipoabdominoplastia HD',
                'Renuvion J-Plasma',
                'BodyTite (radiofrecuencia)',
                'Marcación de abdominales',
                'Mini lipoabdominoplastia',
                'Reparación de diástasis',
            ],
        },
    },

    benefits: [
        {
            icon: Target,
            title: 'Definición Muscular',
            description: 'Marcación de abdominales y línea alba visible.',
        },
        {
            icon: Zap,
            title: 'Tecnología Avanzada',
            description: 'J-Plasma y BodyTite para retracción de piel superior.',
        },
        {
            icon: Layers,
            title: 'Procedimiento Integral',
            description: 'Elimina grasa y piel en una sola intervención.',
        },
        {
            icon: Heart,
            title: 'Resultados Superiores',
            description: 'Abdomen más natural y definido que la técnica tradicional.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/lipoabdominoplastia-before.jpg',
            after: '/images/before-after/lipoabdominoplastia-after.jpg',
            label: 'Caso 1 - Lipoabdominoplastia HD',
        },
        {
            before: '/images/before-after/lipoabdominoplastia-before-2.jpg',
            after: '/images/before-after/lipoabdominoplastia-after-2.jpg',
            label: 'Caso 2 - Con J-Plasma',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Evaluación Corporal',
            description: 'Análisis de grasa, piel y musculatura abdominal.',
            duration: '45-60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Plan Quirúrgico',
            description: 'Diseño del contorno y selección de tecnologías a utilizar.',
            duration: 'En consulta',
            icon: Sparkles,
        },
        {
            step: 3,
            title: 'Cirugía',
            description: 'Liposucción HD, aplicación de tecnología y retiro de piel.',
            duration: '3-5 horas',
            icon: Shield,
        },
        {
            step: 4,
            title: 'Recuperación',
            description: 'Uso de faja, drenajes iniciales, masajes postoperatorios.',
            duration: '3-4 semanas',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Cuál es la diferencia con la abdominoplastia tradicional?',
            answer: 'La lipoabdominoplastia añade liposucción HD para esculpir y definir. Además, las técnicas como J-Plasma mejoran la retracción de la piel para resultados superiores.',
        },
        {
            question: '¿Qué es el Renuvion J-Plasma?',
            answer: 'Es una tecnología que combina gas helio con energía de radiofrecuencia para contraer la piel desde adentro. Mejora significativamente la retracción cutánea.',
        },
        {
            question: '¿Y el BodyTite?',
            answer: 'BodyTite usa radiofrecuencia bipolar que derrite grasa y contrae la piel simultáneamente. Es excelente para zonas con flacidez moderada.',
        },
        {
            question: '¿Se pueden marcar los abdominales?',
            answer: 'Sí, la técnica HD permite crear las sombras naturales de la musculatura abdominal, incluyendo el "six pack" y la línea alba.',
        },
        {
            question: '¿Cuánto dura el resultado?',
            answer: 'El resultado es permanente siempre que mantengas un peso estable. Las células de grasa eliminadas no regresan.',
        },
        {
            question: '¿Cuándo puedo retomar ejercicio?',
            answer: 'Caminatas suaves desde la semana 1. Ejercicio moderado a las 4-6 semanas. Ejercicio intenso a los 2-3 meses.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '1000+', label: 'Lipoabdominoplastias' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'Logra el abdomen que siempre soñaste',
        description: 'Agenda tu consulta para conocer qué técnica de lipoabdominoplastia es ideal para ti.',
    },

    en: {
        categoryLabel: 'Body Plastic Surgery',
        hero: {
            badge: 'Advanced Body Contouring',
            title: 'Lipoabdominoplasty',
            description: 'The evolution of traditional abdominoplasty. Combines high-definition liposuction with skin removal to achieve a flat, toned abdomen with muscle definition.',
            duration: '3-5 hours',
            recovery: '3-4 weeks recovery',
            anesthesia: 'General anesthesia',
        },
        info: {
            title: 'What is Lipoabdominoplasty?',
            content: [
                'Lipoabdominoplasty is an advanced procedure that combines the best of high-definition liposuction with abdominoplasty. Unlike traditional abdominoplasty, it allows sculpting of the abdomen while removing excess skin.',
                'We offer state-of-the-art techniques: <strong class="text-primary">HD Lipoabdominoplasty</strong> with abdominal muscle definition, <strong class="text-primary">Renuvion J-Plasma</strong> for skin retraction, and <strong class="text-primary">BodyTite</strong> with internal radiofrequency for superior results.',
            ],
            highlights: {
                title: 'Available Techniques',
                items: [
                    'HD Lipoabdominoplasty',
                    'Renuvion J-Plasma',
                    'BodyTite (radiofrequency)',
                    'Abdominal muscle definition',
                    'Mini lipoabdominoplasty',
                    'Diastasis repair',
                ],
            },
        },
        benefits: [
            {
                title: 'Muscle Definition',
                description: 'Visible abdominal and linea alba definition.',
            },
            {
                title: 'Advanced Technology',
                description: 'J-Plasma and BodyTite for superior skin retraction.',
            },
            {
                title: 'Comprehensive Procedure',
                description: 'Eliminates fat and skin in a single intervention.',
            },
            {
                title: 'Superior Results',
                description: 'More natural and defined abdomen than traditional technique.',
            },
        ],
        process: [
            {
                title: 'Body Assessment',
                description: 'Analysis of fat, skin, and abdominal musculature.',
                duration: '45-60 min',
            },
            {
                title: 'Surgical Plan',
                description: 'Contour design and selection of technologies to be used.',
                duration: 'During consultation',
            },
            {
                title: 'Surgery',
                description: 'HD liposuction, technology application, and skin removal.',
                duration: '3-5 hours',
            },
            {
                title: 'Recovery',
                description: 'Use of compression garment, initial drains, post-operative massages.',
                duration: '3-4 weeks',
            },
        ],
        faqs: [
            {
                question: 'What is the difference from traditional abdominoplasty?',
                answer: 'Lipoabdominoplasty adds HD liposuction for sculpting and definition. Additionally, techniques like J-Plasma improve skin retraction for superior results.',
            },
            {
                question: 'What is Renuvion J-Plasma?',
                answer: 'It is a technology that combines helium gas with radiofrequency energy to contract the skin from the inside. It significantly improves skin retraction.',
            },
            {
                question: 'What about BodyTite?',
                answer: 'BodyTite uses bipolar radiofrequency that melts fat and contracts skin simultaneously. It is excellent for areas with moderate laxity.',
            },
            {
                question: 'Can the abdominals be defined?',
                answer: 'Yes, the HD technique allows creating the natural shadows of abdominal musculature, including the "six pack" and the linea alba.',
            },
            {
                question: 'How long do the results last?',
                answer: 'The result is permanent as long as you maintain a stable weight. The eliminated fat cells do not return.',
            },
            {
                question: 'When can I resume exercise?',
                answer: 'Light walks from week 1. Moderate exercise at 4-6 weeks. Intense exercise at 2-3 months.',
            },
        ],
        cta: {
            title: 'Achieve the abdomen you have always dreamed of',
            description: 'Schedule your consultation to learn which lipoabdominoplasty technique is ideal for you.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function LipoabdominoplastiaPage() {
    return <ProcedurePage data={lipoabdominoplastiaData} />
}

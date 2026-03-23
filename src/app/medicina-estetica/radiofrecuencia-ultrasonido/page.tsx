"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    Radio,
    Waves
} from 'lucide-react'

// ============================================
// RADIOFRECUENCIA Y ULTRASONIDO DATA
// ============================================

const radiofrecuenciaData: ProcedureData = {
    slug: 'radiofrecuencia-ultrasonido',
    category: 'estetica',
    categoryLabel: 'Medicina Estética',
    categoryPath: '/medicina-estetica',

    hero: {
        badge: 'Tecnología de Tensado',
        title: 'Radiofrecuencia y Ultrasonido Facial',
        description: 'Tratamientos no invasivos que utilizan energía para tensar la piel, estimular colágeno y reducir la flacidez. Resultados visibles sin cirugía ni tiempo de recuperación.',
        duration: '30-60 min',
        recovery: 'Sin recuperación',
        anesthesia: 'Sin anestesia',
        whatsappMessage: 'Hola, me interesa información sobre radiofrecuencia y ultrasonido facial',
    },

    info: {
        title: '¿Cómo funcionan estos tratamientos?',
        content: [
            'La radiofrecuencia y el ultrasonido son tecnologías que utilizan diferentes tipos de energía para calentar las capas profundas de la piel, estimulando la producción de colágeno y elastina sin dañar la superficie.',
            'La <strong class="text-primary">Radiofrecuencia</strong> usa ondas electromagnéticas para calentar los tejidos y promover la retracción del colágeno. El <strong class="text-primary">Ultrasonido focalizado (HIFU)</strong> penetra más profundamente, llegando incluso a la capa muscular (SMAS).',
        ],
        image: '/images/procedures/que-es/radiofrecuencia-ultrasonido.jpg',
        highlights: {
            title: 'Tecnologías Disponibles',
            icon: Radio,
            items: [
                'Radiofrecuencia monopolar',
                'Radiofrecuencia bipolar',
                'Ultrasonido focalizado (HIFU)',
                'Tratamiento de rostro completo',
                'Tratamiento de cuello',
                'Contorno de papada',
            ],
        },
    },

    benefits: [
        {
            icon: Radio,
            title: 'No Invasivo',
            description: 'Sin agujas, sin incisiones, sin tiempo de recuperación.',
        },
        {
            icon: Waves,
            title: 'Estimula Colágeno',
            description: 'Mejora progresiva y natural de la firmeza.',
        },
        {
            icon: Heart,
            title: 'Sin Downtime',
            description: 'Vuelve a tus actividades inmediatamente.',
        },
        {
            icon: Sparkles,
            title: 'Resultados Duraderos',
            description: 'Efectos que continúan mejorando por meses.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/radiofrecuencia-before.jpg',
            after: '/images/before-after/radiofrecuencia-after.jpg',
            label: 'Caso 1 - Tensado facial',
        },
        {
            before: '/images/before-after/ultrasonido-before.jpg',
            after: '/images/before-after/ultrasonido-after.jpg',
            label: 'Caso 2 - HIFU facial',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Evaluación',
            description: 'Análisis de tu piel y selección de la tecnología adecuada.',
            duration: '15-20 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación',
            description: 'Limpieza de la piel y aplicación de gel conductor.',
            duration: '10 min',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Tratamiento',
            description: 'Aplicación de la energía en las zonas a tratar.',
            duration: '30-60 min',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Resultados',
            description: 'Mejora inmediata inicial, resultado óptimo en 2-3 meses.',
            duration: 'Progresivo',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Cuál es mejor: radiofrecuencia o ultrasonido?',
            answer: 'Depende del objetivo. El ultrasonido (HIFU) penetra más profundo y es mejor para flacidez moderada a severa. La radiofrecuencia es excelente para mejora de textura y flacidez leve.',
        },
        {
            question: '¿Es doloroso?',
            answer: 'La radiofrecuencia es muy tolerable, se siente como calor. El ultrasonido puede generar algunas molestias durante el tratamiento, pero es manejable.',
        },
        {
            question: '¿Cuántas sesiones necesito?',
            answer: 'Para radiofrecuencia: 4-8 sesiones. Para HIFU: generalmente 1 sesión anual. Depende del estado de tu piel y objetivos.',
        },
        {
            question: '¿Reemplaza al lifting quirúrgico?',
            answer: 'No lo reemplaza, pero es una excelente opción para quienes no desean cirugía o quieren mantener resultados previos. Ideal para flacidez leve a moderada.',
        },
        {
            question: '¿Hay efectos secundarios?',
            answer: 'Puede haber enrojecimiento temporal que dura pocas horas. Con HIFU puede haber sensibilidad leve algunos días. No hay efectos secundarios importantes.',
        },
        {
            question: '¿A qué edad puedo empezar?',
            answer: 'Se recomienda a partir de los 30-35 años como prevención, o cuando comiences a notar pérdida de firmeza.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '2000+', label: 'Tratamientos realizados' },
            { value: '97%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'Tensa tu piel sin cirugía',
        description: 'Agenda tu consulta para conocer qué tecnología es ideal para ti.',
    },

    en: {
        categoryLabel: 'Aesthetic Medicine',
        hero: {
            badge: 'Skin Tightening Technology',
            title: 'Radiofrequency & Facial Ultrasound',
            description: 'Non-invasive treatments that use energy to tighten the skin, stimulate collagen and reduce laxity. Visible results without surgery or downtime.',
            duration: '30-60 min',
            recovery: 'No downtime',
            anesthesia: 'None required',
        },
        info: {
            title: 'How Do These Treatments Work?',
            content: [
                'Radiofrequency and ultrasound are technologies that use different types of energy to heat the deep layers of the skin, stimulating collagen and elastin production without damaging the surface.',
                '<strong class="text-primary">Radiofrequency</strong> uses electromagnetic waves to heat the tissues and promote collagen retraction. <strong class="text-primary">Focused Ultrasound (HIFU)</strong> penetrates more deeply, reaching even the muscle layer (SMAS).',
            ],
            highlights: {
                title: 'Available Technologies',
                items: [
                    'Monopolar radiofrequency',
                    'Bipolar radiofrequency',
                    'Focused ultrasound (HIFU)',
                    'Full face treatment',
                    'Neck treatment',
                    'Double chin contouring',
                ],
            },
        },
        benefits: [
            {
                title: 'Non-Invasive',
                description: 'No needles, no incisions, no recovery time.',
            },
            {
                title: 'Stimulates Collagen',
                description: 'Progressive and natural improvement of firmness.',
            },
            {
                title: 'No Downtime',
                description: 'Return to your activities immediately.',
            },
            {
                title: 'Long-Lasting Results',
                description: 'Effects that continue improving for months.',
            },
        ],
        process: [
            {
                title: 'Evaluation',
                description: 'Analysis of your skin and selection of the appropriate technology.',
                duration: '15-20 min',
            },
            {
                title: 'Preparation',
                description: 'Skin cleansing and application of conductive gel.',
                duration: '10 min',
            },
            {
                title: 'Treatment',
                description: 'Application of energy to the areas to be treated.',
                duration: '30-60 min',
            },
            {
                title: 'Results',
                description: 'Initial immediate improvement, optimal result in 2-3 months.',
                duration: 'Progressive',
            },
        ],
        faqs: [
            {
                question: 'Which is better: radiofrequency or ultrasound?',
                answer: 'It depends on the goal. Ultrasound (HIFU) penetrates deeper and is better for moderate to severe laxity. Radiofrequency is excellent for texture improvement and mild laxity.',
            },
            {
                question: 'Is it painful?',
                answer: 'Radiofrequency is very tolerable, you feel it as heat. Ultrasound may cause some discomfort during treatment, but it is manageable.',
            },
            {
                question: 'How many sessions do I need?',
                answer: 'For radiofrequency: 4-8 sessions. For HIFU: generally 1 annual session. It depends on your skin condition and goals.',
            },
            {
                question: 'Does it replace surgical lifting?',
                answer: 'It does not replace it, but it is an excellent option for those who do not want surgery or want to maintain previous results. Ideal for mild to moderate laxity.',
            },
            {
                question: 'Are there side effects?',
                answer: 'There may be temporary redness lasting a few hours. With HIFU there may be mild sensitivity for a few days. There are no significant side effects.',
            },
            {
                question: 'At what age can I start?',
                answer: 'It is recommended from age 30-35 as prevention, or when you begin to notice loss of firmness.',
            },
        ],
        cta: {
            title: 'Tighten your skin without surgery',
            description: 'Schedule your consultation to find out which technology is ideal for you.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function RadiofrecuenciaUltrasonidoPage() {
    return <ProcedurePage data={radiofrecuenciaData} />
}

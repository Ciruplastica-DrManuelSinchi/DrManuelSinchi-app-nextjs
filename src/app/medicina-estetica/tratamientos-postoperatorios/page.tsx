"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Calendar,
    Star,
    Activity,
    Waves,
    Wind
} from 'lucide-react'

// ============================================
// TRATAMIENTOS POSTOPERATORIOS DATA
// ============================================

const tratamientosPostopData: ProcedureData = {
    slug: 'tratamientos-postoperatorios',
    category: 'estetica',
    categoryLabel: 'Medicina Estética',
    categoryPath: '/medicina-estetica',

    hero: {
        badge: 'Recuperación Óptima',
        title: 'Tratamientos Postoperatorios',
        description: 'Acelera tu recuperación y optimiza los resultados de tu cirugía con nuestros tratamientos especializados: masajes, drenaje linfático, ultrasonido y carboxiterapia.',
        duration: '45-60 min',
        recovery: 'Inmediata',
        anesthesia: 'Sin anestesia',
        whatsappMessage: 'Hola, me interesa información sobre tratamientos postoperatorios',
    },

    info: {
        title: '¿Por qué son importantes los tratamientos postoperatorios?',
        content: [
            'Los tratamientos postoperatorios son fundamentales para una recuperación óptima después de cirugías plásticas. Ayudan a reducir la inflamación, prevenir fibrosis, mejorar la circulación y acelerar la cicatrización.',
            'Ofrecemos un programa completo que incluye: <strong class="text-primary">Drenaje linfático manual</strong>, <strong class="text-primary">Ultrasonido terapéutico</strong>, <strong class="text-primary">Masajes postquirúrgicos</strong> y <strong class="text-primary">Carboxiterapia</strong> para resultados superiores.',
        ],
        image: '/images/procedures/que-es/tratamientos-postoperatorios.jpg',
        highlights: {
            title: 'Tratamientos Disponibles',
            icon: Activity,
            items: [
                'Drenaje linfático manual',
                'Masajes postquirúrgicos',
                'Ultrasonido terapéutico',
                'Carboxiterapia',
                'Presoterapia',
                'Terapia de vacío',
            ],
        },
    },

    benefits: [
        {
            icon: Waves,
            title: 'Reduce Inflamación',
            description: 'Elimina líquidos y descongestiona los tejidos.',
        },
        {
            icon: Shield,
            title: 'Previene Fibrosis',
            description: 'Evita la formación de tejido fibroso y nódulos.',
        },
        {
            icon: Activity,
            title: 'Mejora Circulación',
            description: 'Acelera la recuperación de los tejidos.',
        },
        {
            icon: Wind,
            title: 'Carboxiterapia',
            description: 'CO2 que mejora oxigenación y reduce hematomas.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/postop-before.jpg',
            after: '/images/before-after/postop-after.jpg',
            label: 'Caso 1 - Recuperación post-lipo',
        },
        {
            before: '/images/before-after/postop-before-2.jpg',
            after: '/images/before-after/postop-after-2.jpg',
            label: 'Caso 2 - Post-abdominoplastia',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Evaluación Post-cirugía',
            description: 'Revisión del estado de los tejidos y plan de tratamiento.',
            duration: '15 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Drenaje Linfático',
            description: 'Masaje especializado para eliminar líquidos.',
            duration: '30-45 min',
            icon: Waves,
        },
        {
            step: 3,
            title: 'Terapias Complementarias',
            description: 'Ultrasonido, carboxiterapia según el caso.',
            duration: '15-30 min',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Plan de Seguimiento',
            description: 'Sesiones programadas hasta recuperación completa.',
            duration: '2-8 semanas',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Cuándo debo empezar los tratamientos?',
            answer: 'Generalmente iniciamos entre 24-72 horas post-cirugía, dependiendo del procedimiento realizado. Tu cirujano te indicará el momento ideal.',
        },
        {
            question: '¿Cuántas sesiones necesito?',
            answer: 'Típicamente 10-20 sesiones, 2-3 veces por semana inicialmente, luego se espacian. Depende del tipo de cirugía y tu evolución.',
        },
        {
            question: '¿Es doloroso?',
            answer: 'Los primeros drenajes pueden ser incómodos porque los tejidos están sensibles. Se trabaja con la presión adecuada para cada etapa.',
        },
        {
            question: '¿Qué es la fibrosis y cómo se previene?',
            answer: 'La fibrosis es la formación de tejido cicatricial duro bajo la piel. Se previene con masajes, ultrasonido y movilización temprana de los tejidos.',
        },
        {
            question: '¿Qué hace la carboxiterapia?',
            answer: 'Inyecta CO2 subcutáneo que mejora la oxigenación, reduce hematomas, estimula circulación y ayuda a eliminar grasa residual.',
        },
        {
            question: '¿Puedo hacer drenaje en casa?',
            answer: 'Puedes hacer auto-masajes suaves, pero el drenaje linfático profesional es mucho más efectivo. Te enseñamos técnicas complementarias para casa.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '5000+', label: 'Tratamientos realizados' },
            { value: '99%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'Optimiza tu recuperación postoperatoria',
        description: 'Agenda tus sesiones de tratamiento postoperatorio para mejores resultados.',
    },

    en: {
        categoryLabel: 'Aesthetic Medicine',
        hero: {
            badge: 'Optimal Recovery',
            title: 'Post-Operative Treatments',
            description: 'Accelerate your recovery and optimize the results of your surgery with our specialized treatments: massages, lymphatic drainage, ultrasound and carboxytherapy.',
            duration: '45-60 min',
            recovery: 'Immediate',
            anesthesia: 'None required',
        },
        info: {
            title: 'Why Are Post-Operative Treatments Important?',
            content: [
                'Post-operative treatments are essential for optimal recovery after plastic surgeries. They help reduce inflammation, prevent fibrosis, improve circulation and accelerate healing.',
                'We offer a comprehensive program that includes: <strong class="text-primary">Manual lymphatic drainage</strong>, <strong class="text-primary">Therapeutic ultrasound</strong>, <strong class="text-primary">Post-surgical massages</strong> and <strong class="text-primary">Carboxytherapy</strong> for superior results.',
            ],
            highlights: {
                title: 'Available Treatments',
                items: [
                    'Manual lymphatic drainage',
                    'Post-surgical massages',
                    'Therapeutic ultrasound',
                    'Carboxytherapy',
                    'Pressotherapy',
                    'Vacuum therapy',
                ],
            },
        },
        benefits: [
            {
                title: 'Reduces Inflammation',
                description: 'Eliminates fluids and decongests the tissues.',
            },
            {
                title: 'Prevents Fibrosis',
                description: 'Avoids the formation of fibrous tissue and nodules.',
            },
            {
                title: 'Improves Circulation',
                description: 'Accelerates tissue recovery.',
            },
            {
                title: 'Carboxytherapy',
                description: 'CO2 that improves oxygenation and reduces bruising.',
            },
        ],
        process: [
            {
                title: 'Post-Surgery Evaluation',
                description: 'Review of tissue condition and treatment plan.',
                duration: '15 min',
            },
            {
                title: 'Lymphatic Drainage',
                description: 'Specialized massage to eliminate fluids.',
                duration: '30-45 min',
            },
            {
                title: 'Complementary Therapies',
                description: 'Ultrasound, carboxytherapy as needed per case.',
                duration: '15-30 min',
            },
            {
                title: 'Follow-Up Plan',
                description: 'Scheduled sessions until complete recovery.',
                duration: '2-8 weeks',
            },
        ],
        faqs: [
            {
                question: 'When should I start the treatments?',
                answer: 'Generally we start between 24-72 hours post-surgery, depending on the procedure performed. Your surgeon will indicate the ideal time.',
            },
            {
                question: 'How many sessions do I need?',
                answer: 'Typically 10-20 sessions, 2-3 times per week initially, then spaced out. It depends on the type of surgery and your progress.',
            },
            {
                question: 'Is it painful?',
                answer: 'The first drainages may be uncomfortable because the tissues are sensitive. We work with the appropriate pressure for each stage.',
            },
            {
                question: 'What is fibrosis and how is it prevented?',
                answer: 'Fibrosis is the formation of hard scar tissue under the skin. It is prevented with massages, ultrasound and early tissue mobilization.',
            },
            {
                question: 'What does carboxytherapy do?',
                answer: 'It injects subcutaneous CO2 that improves oxygenation, reduces bruising, stimulates circulation and helps eliminate residual fat.',
            },
            {
                question: 'Can I do drainage at home?',
                answer: 'You can do gentle self-massages, but professional lymphatic drainage is much more effective. We teach you complementary techniques for home.',
            },
        ],
        cta: {
            title: 'Optimize your post-operative recovery',
            description: 'Schedule your post-operative treatment sessions for better results.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function TratamientosPostoperatoriosPage() {
    return <ProcedurePage data={tratamientosPostopData} />
}

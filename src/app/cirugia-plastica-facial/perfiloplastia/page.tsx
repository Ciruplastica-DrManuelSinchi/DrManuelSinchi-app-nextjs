"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    UserCircle,
    Layers
} from 'lucide-react'

// ============================================
// PERFILOPLASTIA DATA
// ============================================

const perfiloplastiaData: ProcedureData = {
    slug: 'perfiloplastia',
    category: 'facial',
    categoryLabel: 'Cirugía Plástica Facial',
    categoryPath: '/cirugia-plastica-facial',

    hero: {
        badge: 'Armonización del Perfil',
        title: 'Perfiloplastia',
        description: 'Armoniza tu perfil facial combinando rinoplastia con mentoplastia y/o afinamiento facial. Logra un perfil equilibrado y atractivo en una sola intervención.',
        duration: '2-4 horas',
        recovery: '14-21 días',
        anesthesia: 'General',
        whatsappMessage: 'Hola, me interesa información sobre perfiloplastia',
    },

    info: {
        title: '¿Qué es la Perfiloplastia?',
        content: [
            'La perfiloplastia es un procedimiento combinado diseñado para armonizar el perfil facial completo. Consiste en intervenir simultáneamente la nariz y el mentón (y otras estructuras si es necesario) para lograr proporciones ideales.',
            'Las combinaciones más comunes son: <strong class="text-primary">Rinoplastia + Mentoplastia</strong> para corregir el perfil lateral, y <strong class="text-primary">Rinoplastia + Afinamiento Facial</strong> para una transformación más completa incluyendo mandíbula, papada y mejillas.',
        ],
        image: '/images/procedures/que-es/perfiloplastia-tecnica.jpg',
        highlights: {
            title: 'Combinaciones Disponibles',
            icon: UserCircle,
            items: [
                'Rinoplastia + Mentoplastia',
                'Rinoplastia + Afinamiento facial',
                'Rinoplastia + Marcación mandibular',
                'Corrección de perfil convexo',
                'Corrección de perfil cóncavo',
                'Armonización completa',
            ],
        },
    },

    benefits: [
        {
            icon: UserCircle,
            title: 'Perfil Armonioso',
            description: 'Nariz, mentón y mandíbula en equilibrio perfecto.',
        },
        {
            icon: Layers,
            title: 'Procedimiento Único',
            description: 'Múltiples mejoras en una sola cirugía.',
        },
        {
            icon: Sparkles,
            title: 'Resultados Integrales',
            description: 'Transformación completa del perfil facial.',
        },
        {
            icon: Heart,
            title: 'Menor Recuperación',
            description: 'Un solo período de recuperación para todas las mejoras.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/perfiloplastia-before.jpg',
            after: '/images/before-after/perfiloplastia-after.jpg',
            label: 'Caso 1 - Rinoplastia + Mentoplastia',
        },
        {
            before: '/images/before-after/perfiloplastia-before-2.jpg',
            after: '/images/before-after/perfiloplastia-after-2.jpg',
            label: 'Caso 2 - Perfiloplastia completa',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Análisis del Perfil',
            description: 'Evaluación fotográfica y cefalométrica de tu perfil facial.',
            duration: '45-60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Diseño del Plan',
            description: 'Planificación de los procedimientos necesarios y simulación de resultados.',
            duration: 'En consulta',
            icon: Sparkles,
        },
        {
            step: 3,
            title: 'Cirugía Combinada',
            description: 'Realización de rinoplastia, mentoplastia y otros procedimientos según el plan.',
            duration: '2-4 horas',
            icon: Shield,
        },
        {
            step: 4,
            title: 'Recuperación',
            description: 'Uso de férula nasal y/o mentonera. Inflamación que cede en semanas.',
            duration: '14-21 días',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Por qué combinar rinoplastia y mentoplastia?',
            answer: 'Nariz y mentón se relacionan entre sí. A veces una nariz parece grande porque el mentón es pequeño. Al corregir ambos, se logra un perfil más armónico.',
        },
        {
            question: '¿Es más riesgoso operar varios procedimientos juntos?',
            answer: 'No necesariamente. Combinar procedimientos con un equipo experimentado es seguro y reduce el número total de anestesias y recuperaciones.',
        },
        {
            question: '¿Cómo se determina qué procedimientos necesito?',
            answer: 'Mediante análisis fotográfico del perfil, mediciones faciales y tus objetivos personales. Diseñamos un plan personalizado en la consulta.',
        },
        {
            question: '¿Cuánto tiempo toma ver el resultado final?',
            answer: 'La inflamación mayor cede en 2-3 semanas. El resultado de la nariz continúa refinándose hasta 12 meses, pero se aprecia muy bien desde el mes 3.',
        },
        {
            question: '¿Puedo incluir otros procedimientos?',
            answer: 'Sí, frecuentemente se incluyen bichectomía, liposucción de papada, aumento de pómulos u otros según las necesidades del paciente.',
        },
        {
            question: '¿Los resultados son permanentes?',
            answer: 'Sí, tanto los cambios en la nariz como en el mentón/mandíbula son permanentes.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '400+', label: 'Perfiloplastias realizadas' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'Transforma tu perfil de manera integral',
        description: 'Agenda tu consulta para diseñar tu plan de perfiloplastia personalizado.',
    },

    en: {
        categoryLabel: 'Facial Plastic Surgery',
        hero: {
            badge: 'Profile Harmonization',
            title: 'Profiloplasty',
            description: 'Harmonize your facial profile by combining rhinoplasty with mentoplasty and/or facial slimming. Achieve a balanced and attractive profile in a single intervention.',
            duration: '2-4 hours',
            recovery: '14-21 days',
            anesthesia: 'General anesthesia',
        },
        info: {
            title: 'What is Profiloplasty?',
            content: [
                'Profiloplasty is a combined procedure designed to harmonize the complete facial profile. It involves simultaneously intervening on the nose and chin (and other structures if necessary) to achieve ideal proportions.',
                'The most common combinations are: <strong class="text-primary">Rhinoplasty + Mentoplasty</strong> to correct the lateral profile, and <strong class="text-primary">Rhinoplasty + Facial Slimming</strong> for a more complete transformation including jawline, double chin, and cheeks.',
            ],
            highlights: {
                title: 'Available Combinations',
                items: [
                    'Rhinoplasty + Mentoplasty',
                    'Rhinoplasty + Facial slimming',
                    'Rhinoplasty + Mandibular contouring',
                    'Convex profile correction',
                    'Concave profile correction',
                    'Complete harmonization',
                ],
            },
        },
        benefits: [
            {
                title: 'Harmonious Profile',
                description: 'Nose, chin, and jaw in perfect balance.',
            },
            {
                title: 'Single Procedure',
                description: 'Multiple improvements in a single surgery.',
            },
            {
                title: 'Comprehensive Results',
                description: 'Complete transformation of the facial profile.',
            },
            {
                title: 'Shorter Recovery',
                description: 'A single recovery period for all improvements.',
            },
        ],
        process: [
            {
                title: 'Profile Analysis',
                description: 'Photographic and cephalometric evaluation of your facial profile.',
                duration: '45-60 min',
            },
            {
                title: 'Plan Design',
                description: 'Planning of the necessary procedures and results simulation.',
                duration: 'At consultation',
            },
            {
                title: 'Combined Surgery',
                description: 'Rhinoplasty, mentoplasty, and other procedures performed according to the plan.',
                duration: '2-4 hours',
            },
            {
                title: 'Recovery',
                description: 'Use of nasal splint and/or chin strap. Swelling subsides over weeks.',
                duration: '14-21 days',
            },
        ],
        faqs: [
            {
                question: 'Why combine rhinoplasty and mentoplasty?',
                answer: 'The nose and chin are related. Sometimes a nose appears large because the chin is small. By correcting both, a more harmonious profile is achieved.',
            },
            {
                question: 'Is it riskier to have several procedures together?',
                answer: 'Not necessarily. Combining procedures with an experienced team is safe and reduces the total number of anesthesias and recoveries.',
            },
            {
                question: 'How is it determined which procedures I need?',
                answer: 'Through photographic profile analysis, facial measurements, and your personal goals. We design a personalized plan during the consultation.',
            },
            {
                question: 'How long does it take to see the final result?',
                answer: 'Major swelling subsides in 2-3 weeks. The nasal result continues to refine for up to 12 months, but looks very good from month 3 onwards.',
            },
            {
                question: 'Can I include other procedures?',
                answer: 'Yes, bichectomy, chin liposuction, cheek augmentation, and others are frequently included according to the patient\'s needs.',
            },
            {
                question: 'Are the results permanent?',
                answer: 'Yes, both changes to the nose and to the chin/jaw are permanent.',
            },
        ],
        cta: {
            title: 'Transform your profile comprehensively',
            description: 'Schedule your consultation to design your personalized profiloplasty plan.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function PerfiloplastiaPage() {
    return <ProcedurePage data={perfiloplastiaData} />
}

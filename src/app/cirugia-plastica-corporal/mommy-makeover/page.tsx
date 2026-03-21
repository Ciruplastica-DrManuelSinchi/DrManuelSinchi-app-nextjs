"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    Baby,
    Layers,
    RefreshCw
} from 'lucide-react'

// ============================================
// MOMMY MAKEOVER DATA
// ============================================

const mommyMakeoverData: ProcedureData = {
    slug: 'mommy-makeover',
    category: 'corporal',
    categoryLabel: 'Cirugía Plástica Corporal',
    categoryPath: '/cirugia-plastica-corporal',

    hero: {
        badge: 'Transformación Post-Maternidad',
        title: 'Mommy Makeover',
        description: 'Recupera tu figura después del embarazo con un plan quirúrgico integral. Combinamos cirugía de mamas, abdomen y contorno corporal en una o dos etapas para resultados transformadores.',
        duration: '4-6 horas',
        recovery: '4-6 semanas',
        anesthesia: 'General',
        whatsappMessage: 'Hola, me interesa información sobre mommy makeover',
    },

    info: {
        title: '¿Qué es el Mommy Makeover?',
        content: [
            'El Mommy Makeover es un conjunto de procedimientos diseñados para restaurar el cuerpo de la mujer después del embarazo y la lactancia. Se personaliza según las necesidades de cada paciente para abordar los cambios específicos que experimentó su cuerpo.',
            'Típicamente incluye procedimientos como: <strong class="text-primary">Mamoplastia</strong> (aumento, reducción o lifting de senos), <strong class="text-primary">Lipoabdominoplastia</strong> para el abdomen, <strong class="text-primary">Liposucción</strong> de flancos y espalda, y <strong class="text-primary">Gluteoplastia</strong> si se desea.',
        ],
        image: '/images/procedures/que-es/mommy-makeover-tecnica.jpg',
        highlights: {
            title: 'Procedimientos Comunes',
            icon: Baby,
            items: [
                'Mastopexia (lifting de senos)',
                'Mamoplastia de aumento',
                'Lipoabdominoplastia',
                'Reparación de diástasis',
                'Liposucción de flancos',
                'Gluteoplastia (opcional)',
            ],
        },
    },

    benefits: [
        {
            icon: RefreshCw,
            title: 'Restauración Completa',
            description: 'Aborda todos los cambios del embarazo en un plan integral.',
        },
        {
            icon: Layers,
            title: 'Una Recuperación',
            description: 'Múltiples procedimientos con un solo período de recuperación.',
        },
        {
            icon: Heart,
            title: 'Autoestima Renovada',
            description: 'Recupera la confianza en tu cuerpo post-maternidad.',
        },
        {
            icon: Sparkles,
            title: 'Plan Personalizado',
            description: 'Diseñado específicamente para tus necesidades.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/mommy-before.jpg',
            after: '/images/before-after/mommy-after.jpg',
            label: 'Caso 1 - Mommy Makeover completo',
        },
        {
            before: '/images/before-after/mommy-before-2.jpg',
            after: '/images/before-after/mommy-after-2.jpg',
            label: 'Caso 2 - Abdomen y mamas',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Evaluación Integral',
            description: 'Análisis de mamas, abdomen, y áreas de preocupación.',
            duration: '60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Plan Personalizado',
            description: 'Diseño del conjunto de procedimientos según tus objetivos.',
            duration: 'En consulta',
            icon: Sparkles,
        },
        {
            step: 3,
            title: 'Cirugía Combinada',
            description: 'Realización de todos los procedimientos planificados.',
            duration: '4-6 horas',
            icon: Shield,
        },
        {
            step: 4,
            title: 'Recuperación',
            description: 'Seguimiento cercano, uso de fajas, y cuidados específicos.',
            duration: '4-6 semanas',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Cuánto tiempo después del parto puedo hacerme el Mommy Makeover?',
            answer: 'Recomendamos esperar al menos 6 meses después del parto y 3-6 meses después de terminar la lactancia. Idealmente cuando el peso se haya estabilizado.',
        },
        {
            question: '¿Puedo tener más hijos después?',
            answer: 'Sí, es posible. Sin embargo, un nuevo embarazo afectará los resultados. Lo ideal es realizar el procedimiento cuando hayas completado tu familia.',
        },
        {
            question: '¿Es seguro combinar tantos procedimientos?',
            answer: 'Sí, cuando se realiza por un equipo experimentado con protocolos de seguridad adecuados. Evaluamos cada caso individualmente.',
        },
        {
            question: '¿Cuánto tiempo estaré fuera de actividades?',
            answer: 'Reposo estricto 1-2 semanas. Actividades ligeras a las 2-3 semanas. Actividades normales a las 4-6 semanas. Ejercicio intenso a los 2-3 meses.',
        },
        {
            question: '¿Los resultados son permanentes?',
            answer: 'Sí, siempre que mantengas un peso estable y no tengas más embarazos. Los implantes mamarios pueden requerir revisión a largo plazo.',
        },
        {
            question: '¿Podemos hacerlo en etapas?',
            answer: 'Sí, algunas pacientes prefieren dividir los procedimientos en 2 cirugías separadas por algunos meses. Lo evaluamos según cada caso.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '500+', label: 'Mommy Makeovers' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'Recupera tu cuerpo después de la maternidad',
        description: 'Agenda tu consulta para diseñar tu plan de Mommy Makeover personalizado.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function MommyMakeoverPage() {
    return <ProcedurePage data={mommyMakeoverData} />
}

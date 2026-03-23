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

    en: {
        categoryLabel: 'Body Plastic Surgery',
        hero: {
            badge: 'Post-Maternity Transformation',
            title: 'Mommy Makeover',
            description: 'Restore your figure after pregnancy with a comprehensive surgical plan. We combine breast, abdomen, and body contouring surgery in one or two stages for transformative results.',
            duration: '4-6 hours',
            recovery: '4-6 weeks recovery',
            anesthesia: 'General anesthesia',
        },
        info: {
            title: 'What is a Mommy Makeover?',
            content: [
                'The Mommy Makeover is a set of procedures designed to restore a woman\'s body after pregnancy and breastfeeding. It is personalized according to each patient\'s needs to address the specific changes their body experienced.',
                'It typically includes procedures such as: <strong class="text-primary">Mammoplasty</strong> (breast augmentation, reduction, or lift), <strong class="text-primary">Lipoabdominoplasty</strong> for the abdomen, <strong class="text-primary">Liposuction</strong> of flanks and back, and <strong class="text-primary">Gluteoplasty</strong> if desired.',
            ],
            highlights: {
                title: 'Common Procedures',
                items: [
                    'Mastopexy (breast lift)',
                    'Breast augmentation',
                    'Lipoabdominoplasty',
                    'Diastasis repair',
                    'Flank liposuction',
                    'Gluteoplasty (optional)',
                ],
            },
        },
        benefits: [
            {
                title: 'Complete Restoration',
                description: 'Addresses all pregnancy changes in a comprehensive plan.',
            },
            {
                title: 'One Recovery',
                description: 'Multiple procedures with a single recovery period.',
            },
            {
                title: 'Renewed Self-Esteem',
                description: 'Regain confidence in your post-maternity body.',
            },
            {
                title: 'Personalized Plan',
                description: 'Designed specifically for your needs.',
            },
        ],
        process: [
            {
                title: 'Comprehensive Evaluation',
                description: 'Analysis of breasts, abdomen, and areas of concern.',
                duration: '60 min',
            },
            {
                title: 'Personalized Plan',
                description: 'Design of the set of procedures according to your goals.',
                duration: 'During consultation',
            },
            {
                title: 'Combined Surgery',
                description: 'Execution of all planned procedures.',
                duration: '4-6 hours',
            },
            {
                title: 'Recovery',
                description: 'Close follow-up, use of compression garments, and specific care.',
                duration: '4-6 weeks',
            },
        ],
        faqs: [
            {
                question: 'How long after childbirth can I have a Mommy Makeover?',
                answer: 'We recommend waiting at least 6 months after delivery and 3-6 months after finishing breastfeeding. Ideally when weight has stabilized.',
            },
            {
                question: 'Can I have more children afterward?',
                answer: 'Yes, it is possible. However, a new pregnancy will affect the results. The ideal is to perform the procedure when you have completed your family.',
            },
            {
                question: 'Is it safe to combine so many procedures?',
                answer: 'Yes, when performed by an experienced team with appropriate safety protocols. We evaluate each case individually.',
            },
            {
                question: 'How long will I be out of activities?',
                answer: 'Strict rest for 1-2 weeks. Light activities at 2-3 weeks. Normal activities at 4-6 weeks. Intense exercise at 2-3 months.',
            },
            {
                question: 'Are the results permanent?',
                answer: 'Yes, as long as you maintain a stable weight and have no more pregnancies. Breast implants may require revision in the long term.',
            },
            {
                question: 'Can we do it in stages?',
                answer: 'Yes, some patients prefer to divide the procedures into 2 surgeries separated by a few months. We evaluate this according to each case.',
            },
        ],
        cta: {
            title: 'Restore your body after motherhood',
            description: 'Schedule your consultation to design your personalized Mommy Makeover plan.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function MommyMakeoverPage() {
    return <ProcedurePage data={mommyMakeoverData} />
}

"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    Droplets,
    Syringe,
    CircleDot
} from 'lucide-react'

// ============================================
// RELLENOS FACIALES DATA
// ============================================

const rellenosFacialesData: ProcedureData = {
    slug: 'rellenos-faciales',
    category: 'facial',
    categoryLabel: 'Cirugía Plástica Facial',
    categoryPath: '/cirugia-plastica-facial',

    hero: {
        badge: 'Rejuvenecimiento Facial',
        title: 'Rellenos Faciales',
        description: 'Restaura el volumen perdido y rejuvenece tu rostro con técnicas de relleno facial. Ofrecemos transferencia de grasa, ácido hialurónico e implantes faciales para resultados naturales y duraderos.',
        duration: '30-90 min',
        recovery: '3-14 días',
        anesthesia: 'Local / Sedación',
        whatsappMessage: 'Hola, me interesa información sobre rellenos faciales',
    },

    info: {
        title: '¿Qué son los Rellenos Faciales?',
        content: [
            'Los rellenos faciales son procedimientos diseñados para restaurar el volumen perdido por el envejecimiento, corregir asimetrías o mejorar los contornos del rostro. Son una solución versátil que puede aplicarse en pómulos, surcos nasogenianos, labios, mentón y otras áreas.',
            'Ofrecemos tres opciones principales: <strong class="text-primary">Transferencia de grasa autóloga</strong> (usando tu propia grasa), <strong class="text-primary">Ácido Hialurónico</strong> (relleno temporal reabsorbible) e <strong class="text-primary">Implantes faciales</strong> (solución permanente de silicona).',
        ],
        image: '/images/procedures/que-es/rellenos-faciales-tecnica.jpg',
        highlights: {
            title: 'Tipos de Rellenos',
            icon: Droplets,
            items: [
                'Transferencia de grasa autóloga',
                'Ácido Hialurónico (temporal)',
                'Implantes faciales de silicona',
                'Relleno de pómulos',
                'Relleno de surcos',
                'Aumento de labios',
            ],
        },
    },

    benefits: [
        {
            icon: Droplets,
            title: 'Transferencia de Grasa',
            description: 'Usa tu propia grasa para resultados naturales y permanentes.',
        },
        {
            icon: Syringe,
            title: 'Ácido Hialurónico',
            description: 'Relleno temporal, seguro y reversible si es necesario.',
        },
        {
            icon: CircleDot,
            title: 'Implantes Faciales',
            description: 'Solución permanente para aumento de volumen definido.',
        },
        {
            icon: Heart,
            title: 'Resultados Naturales',
            description: 'Técnicas que respetan la armonía de tu rostro.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/rellenos-before.jpg',
            after: '/images/before-after/rellenos-after.jpg',
            label: 'Caso 1 - Relleno de pómulos',
        },
        {
            before: '/images/before-after/rellenos-before-2.jpg',
            after: '/images/before-after/rellenos-after-2.jpg',
            label: 'Caso 2 - Surcos nasogenianos',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Evaluación Facial',
            description: 'Análisis de tu estructura facial y definición del plan de tratamiento.',
            duration: '30-45 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Selección del Relleno',
            description: 'Determinamos si usaremos grasa, ácido hialurónico o implantes.',
            duration: 'En consulta',
            icon: Sparkles,
        },
        {
            step: 3,
            title: 'Procedimiento',
            description: 'Aplicación del relleno con técnicas precisas y seguras.',
            duration: '30-90 min',
            icon: Shield,
        },
        {
            step: 4,
            title: 'Recuperación',
            description: 'Inflamación inicial que se resuelve en días. Resultados progresivos.',
            duration: '3-14 días',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Cuál es la diferencia entre los tipos de relleno?',
            answer: 'La transferencia de grasa usa tu propia grasa (permanente), el ácido hialurónico es temporal (6-18 meses) y los implantes son permanentes. Cada uno tiene indicaciones específicas.',
        },
        {
            question: '¿Cuánto dura el ácido hialurónico?',
            answer: 'Dependiendo del área y el tipo de producto, dura entre 6 y 18 meses. Luego se reabsorbe naturalmente.',
        },
        {
            question: '¿La transferencia de grasa es permanente?',
            answer: 'Sí, aunque se reabsorbe un porcentaje inicial (30-50%), la grasa que sobrevive es permanente. Por eso a veces se requiere más de una sesión.',
        },
        {
            question: '¿Los implantes faciales son seguros?',
            answer: 'Sí, son de silicona de grado médico. Se usan desde hace décadas con excelentes resultados y bajo índice de complicaciones.',
        },
        {
            question: '¿Puedo combinar diferentes tipos de relleno?',
            answer: 'Sí, de hecho es común combinar técnicas. Por ejemplo, implantes en mentón y ácido hialurónico en labios.',
        },
        {
            question: '¿Cuándo veré los resultados finales?',
            answer: 'Con ácido hialurónico los resultados son inmediatos. Con grasa, espera 3-6 meses. Con implantes, los resultados son inmediatos tras bajar la inflamación.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '2000+', label: 'Rellenos realizados' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'Recupera el volumen y juventud de tu rostro',
        description: 'Agenda tu consulta para evaluar cuál es la mejor opción de relleno facial para ti.',
    },

    en: {
        categoryLabel: 'Facial Plastic Surgery',
        hero: {
            badge: 'Facial Rejuvenation',
            title: 'Facial Fillers',
            description: 'Restore lost volume and rejuvenate your face with facial filler techniques. We offer fat transfer, hyaluronic acid, and facial implants for natural and long-lasting results.',
            duration: '30-90 min',
            recovery: '3-14 days',
            anesthesia: 'Local / Sedation',
        },
        info: {
            title: 'What are Facial Fillers?',
            content: [
                'Facial fillers are procedures designed to restore volume lost through aging, correct asymmetries, or improve facial contours. They are a versatile solution that can be applied to cheekbones, nasolabial folds, lips, chin, and other areas.',
                'We offer three main options: <strong class="text-primary">Autologous fat transfer</strong> (using your own fat), <strong class="text-primary">Hyaluronic Acid</strong> (temporary resorbable filler), and <strong class="text-primary">Facial implants</strong> (permanent silicone solution).',
            ],
            highlights: {
                title: 'Types of Fillers',
                items: [
                    'Autologous fat transfer',
                    'Hyaluronic Acid (temporary)',
                    'Silicone facial implants',
                    'Cheek filler',
                    'Groove filler',
                    'Lip augmentation',
                ],
            },
        },
        benefits: [
            {
                title: 'Fat Transfer',
                description: 'Uses your own fat for natural and permanent results.',
            },
            {
                title: 'Hyaluronic Acid',
                description: 'Temporary, safe, and reversible filler if needed.',
            },
            {
                title: 'Facial Implants',
                description: 'Permanent solution for defined volume augmentation.',
            },
            {
                title: 'Natural Results',
                description: 'Techniques that respect the harmony of your face.',
            },
        ],
        process: [
            {
                title: 'Facial Evaluation',
                description: 'Analysis of your facial structure and definition of the treatment plan.',
                duration: '30-45 min',
            },
            {
                title: 'Filler Selection',
                description: 'We determine whether to use fat, hyaluronic acid, or implants.',
                duration: 'At consultation',
            },
            {
                title: 'Procedure',
                description: 'Application of filler with precise and safe techniques.',
                duration: '30-90 min',
            },
            {
                title: 'Recovery',
                description: 'Initial swelling that resolves in days. Progressive results.',
                duration: '3-14 days',
            },
        ],
        faqs: [
            {
                question: 'What is the difference between the types of fillers?',
                answer: 'Fat transfer uses your own fat (permanent), hyaluronic acid is temporary (6-18 months), and implants are permanent. Each has specific indications.',
            },
            {
                question: 'How long does hyaluronic acid last?',
                answer: 'Depending on the area and type of product, it lasts between 6 and 18 months. Then it is naturally reabsorbed.',
            },
            {
                question: 'Is fat transfer permanent?',
                answer: 'Yes, although an initial percentage is reabsorbed (30-50%), the surviving fat is permanent. That is why more than one session is sometimes required.',
            },
            {
                question: 'Are facial implants safe?',
                answer: 'Yes, they are medical-grade silicone. They have been used for decades with excellent results and a low complication rate.',
            },
            {
                question: 'Can I combine different types of fillers?',
                answer: 'Yes, in fact it is common to combine techniques. For example, implants in the chin and hyaluronic acid in the lips.',
            },
            {
                question: 'When will I see the final results?',
                answer: 'With hyaluronic acid, results are immediate. With fat, expect 3-6 months. With implants, results are immediate after swelling subsides.',
            },
        ],
        cta: {
            title: 'Restore the volume and youthfulness of your face',
            description: 'Schedule your consultation to evaluate which facial filler option is best for you.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function RellenosFacialesPage() {
    return <ProcedurePage data={rellenosFacialesData} />
}

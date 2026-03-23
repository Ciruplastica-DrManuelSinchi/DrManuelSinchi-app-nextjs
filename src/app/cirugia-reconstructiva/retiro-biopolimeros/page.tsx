"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    AlertTriangle,
    Trash2,
    HeartPulse
} from 'lucide-react'

// ============================================
// RETIRO DE BIOPOLÍMEROS DATA
// ============================================

const retiroBiopolimerosData: ProcedureData = {
    slug: 'retiro-biopolimeros',
    category: 'reconstructiva',
    categoryLabel: 'Cirugía Reconstructiva',
    categoryPath: '/cirugia-reconstructiva',

    hero: {
        badge: 'Extracción Especializada',
        title: 'Retiro de Biopolímeros y Cuerpos Extraños',
        description: 'Extracción segura de biopolímeros, silicona líquida y otros materiales inyectados ilegalmente. Tratamiento de complicaciones y reconstrucción de los tejidos afectados.',
        duration: '2-6 horas',
        recovery: '2-6 semanas',
        anesthesia: 'General',
        whatsappMessage: 'Hola, me interesa información sobre retiro de biopolímeros',
    },

    info: {
        title: '¿Qué son los Biopolímeros?',
        content: [
            'Los biopolímeros son sustancias como silicona líquida, PMMA, aceites y otros materiales que fueron inyectados (generalmente de forma ilegal) para aumentar volumen en glúteos, cara, senos u otras áreas. Estos materiales pueden causar complicaciones graves.',
            'El retiro de biopolímeros es un procedimiento complejo que requiere <strong class="text-primary">experiencia en cirugía reconstructiva</strong>. Extraemos el mayor volumen posible del material y tratamos los tejidos dañados, aunque la remoción completa no siempre es posible.',
        ],
        image: '/images/procedures/que-es/retiro-de-biopolimeros-tecnica.jpg',
        highlights: {
            title: 'Materiales que Retiramos',
            icon: AlertTriangle,
            items: [
                'Silicona líquida industrial',
                'Biopolímeros (PMMA)',
                'Aceites minerales',
                'Parafina',
                'Metacrilato',
                'Otros cuerpos extraños',
            ],
        },
    },

    benefits: [
        {
            icon: Trash2,
            title: 'Extracción Máxima',
            description: 'Técnicas para remover la mayor cantidad posible de material.',
        },
        {
            icon: Shield,
            title: 'Manejo de Complicaciones',
            description: 'Tratamiento de infecciones, fístulas y granulomas.',
        },
        {
            icon: HeartPulse,
            title: 'Reconstrucción',
            description: 'Restauración de los tejidos afectados cuando es posible.',
        },
        {
            icon: Heart,
            title: 'Alivio de Síntomas',
            description: 'Reducción del dolor, inflamación y molestias.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/biopolimeros-before.jpg',
            after: '/images/before-after/biopolimeros-after.jpg',
            label: 'Caso 1 - Retiro de glúteos',
        },
        {
            before: '/images/before-after/biopolimeros-before-2.jpg',
            after: '/images/before-after/biopolimeros-after-2.jpg',
            label: 'Caso 2 - Retiro facial',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Evaluación Exhaustiva',
            description: 'Historia clínica, exámenes de laboratorio, imágenes (ecografía/RMN).',
            duration: '60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación',
            description: 'Optimización de condiciones de salud, tratamiento de infecciones activas.',
            duration: 'Variable',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Cirugía',
            description: 'Extracción del material y reconstrucción de los tejidos.',
            duration: '2-6 horas',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Recuperación',
            description: 'Drenajes, antibióticos, curaciones y seguimiento estrecho.',
            duration: '2-6 semanas',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Se puede remover todo el biopolímero?',
            answer: 'Desafortunadamente, la remoción completa rara vez es posible porque el material se infiltra en los tejidos. El objetivo es extraer la mayor cantidad posible y tratar las complicaciones.',
        },
        {
            question: '¿Cuáles son los síntomas de complicaciones?',
            answer: 'Dolor, endurecimiento, cambios de color en la piel, migración del material, fístulas (orificios que drenan), fiebre, y en casos severos afectación sistémica.',
        },
        {
            question: '¿Es una cirugía riesgosa?',
            answer: 'Es una cirugía compleja con riesgos significativos: sangrado, infección, daño a estructuras, necesidad de múltiples cirugías. Por eso debe realizarse por especialistas.',
        },
        {
            question: '¿Cuántas cirugías se necesitan?',
            answer: 'Depende de la cantidad de material y la ubicación. Algunos casos se resuelven en una cirugía, otros requieren 2-3 o más intervenciones.',
        },
        {
            question: '¿El seguro cubre este procedimiento?',
            answer: 'Generalmente no se considera estético sino médico cuando hay complicaciones. Cada caso debe evaluarse con la aseguradora.',
        },
        {
            question: '¿Puedo ponerme implantes después?',
            answer: 'En algunos casos es posible reconstruir con implantes o grasa después de que los tejidos sanen completamente. Se evalúa caso a caso.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '200+', label: 'Retiros de biopolímeros' },
            { value: '95%', label: 'Mejoría de síntomas' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'No vivas más con las complicaciones de los biopolímeros',
        description: 'Agenda tu evaluación para conocer tus opciones de tratamiento.',
    },

    en: {
        categoryLabel: 'Reconstructive Surgery',
        hero: {
            badge: 'Specialized Extraction',
            title: 'Biopolymer Removal',
            description: 'Safe removal of biopolymers, liquid silicone, and other illegally injected materials. Treatment of complications and reconstruction of affected tissues.',
            duration: '2-6 hours',
            recovery: '2-6 weeks',
            anesthesia: 'General anesthesia',
        },
        info: {
            title: 'What Are Biopolymers?',
            content: [
                'Biopolymers are substances such as liquid silicone, PMMA, oils, and other materials that were injected (usually illegally) to add volume to the buttocks, face, breasts, or other areas. These materials can cause serious complications.',
                'Biopolymer removal is a complex procedure that requires <strong class="text-primary">expertise in reconstructive surgery</strong>. We extract as much of the material as possible and treat the damaged tissues, although complete removal is not always achievable.',
            ],
            highlights: {
                title: 'Materials We Remove',
                items: [
                    'Industrial liquid silicone',
                    'Biopolymers (PMMA)',
                    'Mineral oils',
                    'Paraffin',
                    'Methacrylate',
                    'Other foreign bodies',
                ],
            },
        },
        benefits: [
            {
                title: 'Maximum Extraction',
                description: 'Techniques to remove as much material as possible.',
            },
            {
                title: 'Complication Management',
                description: 'Treatment of infections, fistulas, and granulomas.',
            },
            {
                title: 'Reconstruction',
                description: 'Restoration of affected tissues whenever possible.',
            },
            {
                title: 'Symptom Relief',
                description: 'Reduction of pain, inflammation, and discomfort.',
            },
        ],
        process: [
            {
                title: 'Comprehensive Evaluation',
                description: 'Medical history, laboratory tests, and imaging (ultrasound/MRI).',
                duration: '60 min',
            },
            {
                title: 'Preparation',
                description: 'Optimization of health conditions and treatment of active infections.',
                duration: 'Variable',
            },
            {
                title: 'Surgery',
                description: 'Extraction of the material and reconstruction of the affected tissues.',
                duration: '2-6 hours',
            },
            {
                title: 'Recovery',
                description: 'Drains, antibiotics, wound care, and close follow-up.',
                duration: '2-6 weeks',
            },
        ],
        faqs: [
            {
                question: 'Can all of the biopolymer be removed?',
                answer: 'Unfortunately, complete removal is rarely possible because the material infiltrates surrounding tissues. The goal is to extract as much as possible and treat the complications.',
            },
            {
                question: 'What are the symptoms of complications?',
                answer: 'Pain, hardening, skin discoloration, material migration, fistulas (draining openings), fever, and in severe cases, systemic involvement.',
            },
            {
                question: 'Is this a high-risk surgery?',
                answer: 'It is a complex surgery with significant risks: bleeding, infection, damage to surrounding structures, and the need for multiple surgeries. For this reason, it must be performed by specialists.',
            },
            {
                question: 'How many surgeries are needed?',
                answer: 'It depends on the amount of material and its location. Some cases can be resolved in a single surgery, while others require 2-3 or more interventions.',
            },
            {
                question: 'Does insurance cover this procedure?',
                answer: 'When complications are present, it is generally considered a medical rather than cosmetic procedure. Each case must be evaluated with the insurance provider.',
            },
            {
                question: 'Can I get implants afterward?',
                answer: 'In some cases, reconstruction with implants or fat transfer is possible once the tissues have fully healed. Each case is evaluated individually.',
            },
        ],
        cta: {
            title: 'Don\'t live with biopolymer complications any longer',
            description: 'Schedule your evaluation to learn about your treatment options.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function RetiroBiopolimerosPage() {
    return <ProcedurePage data={retiroBiopolimerosData} />
}

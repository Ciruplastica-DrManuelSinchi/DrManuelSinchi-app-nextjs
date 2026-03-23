"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    Smile,
    Target
} from 'lucide-react'

// ============================================
// RELLENOS DE LABIOS DATA
// ============================================

const rellenosLabiosData: ProcedureData = {
    // Routing & Category
    slug: 'rellenos-labios',
    category: 'estetica',
    categoryLabel: 'Medicina Estética',
    categoryPath: '/medicina-estetica',

    // Hero Section
    hero: {
        badge: 'Aumento de Labios',
        title: 'Rellenos de Labios',
        description: 'Aumenta el volumen, define el contorno y mejora la simetría de tus labios. Resultados naturales que realzan tu sonrisa.',
        duration: '20-30 min',
        recovery: 'Inmediata',
        anesthesia: 'Anestesia tópica',
        whatsappMessage: 'Hola, me interesa información sobre rellenos de labios',
    },

    // Info Section
    info: {
        title: '¿Qué son los Rellenos de Labios?',
        content: [
            'Los rellenos de labios utilizan ácido hialurónico para aumentar el volumen, definir el contorno y mejorar la forma de los labios. Es uno de los tratamientos estéticos más populares para realzar la sensualidad del rostro.',
            'Ofrecemos resultados desde <strong class="text-primary">muy sutiles hasta más pronunciados</strong>, según tus preferencias. El objetivo es lograr labios armónicos que complementen tus rasgos faciales de forma natural.',
        ],
        image: '/images/procedures/que-es/relleno-labios-tecnica.jpg',
        highlights: {
            title: 'Lo que podemos lograr',
            icon: Smile,
            items: [
                'Aumento de volumen sutil o pronunciado',
                'Definición del arco de cupido',
                'Corrección de asimetrías',
                'Hidratación y suavidad',
                'Perfilado del borde bermellón',
                'Corrección de líneas del fumador',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Smile,
            title: 'Labios Naturales',
            description: 'Volumen que se ve y se siente natural.',
        },
        {
            icon: Target,
            title: 'Personalizado',
            description: 'Adaptamos el resultado a tu rostro y deseos.',
        },
        {
            icon: Shield,
            title: 'Reversible',
            description: 'El ácido hialurónico puede disolverse si deseas.',
        },
        {
            icon: Heart,
            title: 'Resultados Inmediatos',
            description: 'Ves el cambio desde el primer momento.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/rellenos-labios-before.jpg',
            after: '/images/before-after/rellenos-labios-after.jpg',
            label: 'Caso 1 - Aumento sutil',
        },
        {
            before: '/images/before-after/rellenos-labios-before.jpg',
            after: '/images/before-after/rellenos-labios-after.jpg',
            label: 'Caso 2 - Definición de contorno',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Análisis de tus labios, discusión de expectativas y planificación.',
            duration: '15-20 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación',
            description: 'Aplicación de anestesia tópica para mayor comodidad.',
            duration: '15 min',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Aplicación del Relleno',
            description: 'Inyección precisa de ácido hialurónico con técnica depurada.',
            duration: '20-30 min',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Resultado',
            description: 'Resultado visible inmediatamente, óptimo a los 7-14 días.',
            duration: 'Inmediato',
            icon: Star,
        },
    ],

    // Videos
    videos: [
        {
            title: '🎥 Descubre todo sobre el Lip Lift con el Dr. Manuel Sinchi 💋',
            youtubeId: 'pkUsW_-EHBI'
        },
        {
            title: '🎥 Todo lo que debes saber sobre el Lip Lift con el Dr. Manuel Sinchi',
            youtubeId: '61QYlk7UzFk'
        },
        {
            title: '🎥 Descubre todo sobre el Lip Lift con el Dr. Manuel Sinchi 💋',
            youtubeId: 'pkUsW_-EHBI'
        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿Cuánto duran los rellenos de labios?',
            answer: 'Típicamente entre 6-9 meses, dependiendo del metabolismo individual, la cantidad de producto y el estilo de vida. Los labios son una zona de mucho movimiento, por lo que el producto se absorbe más rápido.',
        },
        {
            question: '¿Los labios quedarán muy grandes?',
            answer: 'El tamaño final lo decides tú. Trabajamos de forma conservadora y progresiva. Es mejor empezar con menos y añadir después si deseas más volumen.',
        },
        {
            question: '¿Es doloroso?',
            answer: 'Aplicamos anestesia tópica antes del procedimiento y los productos contienen lidocaína. Las molestias son mínimas y muy tolerables.',
        },
        {
            question: '¿Habrá mucha inflamación?',
            answer: 'Es normal tener inflamación por 2-5 días después del tratamiento. Los labios pueden verse más grandes de lo esperado inicialmente, pero esto se normaliza.',
        },
        {
            question: '¿Puedo besarme después?',
            answer: 'Se recomienda evitar presión excesiva en los labios por 24-48 horas. Después de este tiempo, puedes hacer vida completamente normal.',
        },
        {
            question: '¿Los rellenos se pueden disolver?',
            answer: 'Sí, una de las grandes ventajas del ácido hialurónico es que puede disolverse con hialuronidasa si el resultado no te satisface o hay alguna complicación.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '3000+', label: 'Rellenos de labios' },
            { value: '99%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Realza tu sonrisa con labios perfectos',
        description: 'Agenda tu consulta y descubre cómo los rellenos de labios pueden transformar tu rostro.',
    },

    en: {
        categoryLabel: 'Aesthetic Medicine',
        hero: {
            badge: 'Lip Augmentation',
            title: 'Lip Fillers',
            description: 'Increase volume, define the contour and improve the symmetry of your lips. Natural results that enhance your smile.',
            duration: '20-30 min',
            recovery: 'Immediate',
            anesthesia: 'Topical anesthesia',
        },
        info: {
            title: 'What are Lip Fillers?',
            content: [
                'Lip fillers use hyaluronic acid to increase volume, define the contour and improve the shape of the lips. It is one of the most popular aesthetic treatments for enhancing the sensuality of the face.',
                'We offer results ranging from <strong class="text-primary">very subtle to more pronounced</strong>, according to your preferences. The goal is to achieve harmonious lips that complement your facial features naturally.',
            ],
            highlights: {
                title: 'What We Can Achieve',
                items: [
                    'Subtle or pronounced volume increase',
                    'Cupid\'s bow definition',
                    'Asymmetry correction',
                    'Hydration and softness',
                    'Vermilion border definition',
                    'Smoker\'s lines correction',
                ],
            },
        },
        benefits: [
            {
                title: 'Natural Lips',
                description: 'Volume that looks and feels natural.',
            },
            {
                title: 'Personalized',
                description: 'We tailor the result to your face and desires.',
            },
            {
                title: 'Reversible',
                description: 'Hyaluronic acid can be dissolved if desired.',
            },
            {
                title: 'Immediate Results',
                description: 'You see the change from the very first moment.',
            },
        ],
        process: [
            {
                title: 'Assessment Consultation',
                description: 'Analysis of your lips, discussion of expectations and planning.',
                duration: '15-20 min',
            },
            {
                title: 'Preparation',
                description: 'Application of topical anesthesia for greater comfort.',
                duration: '15 min',
            },
            {
                title: 'Filler Application',
                description: 'Precise injection of hyaluronic acid with refined technique.',
                duration: '20-30 min',
            },
            {
                title: 'Result',
                description: 'Result visible immediately, optimal at 7-14 days.',
                duration: 'Immediate',
            },
        ],
        faqs: [
            {
                question: 'How long do lip fillers last?',
                answer: 'Typically between 6-9 months, depending on individual metabolism, the amount of product and lifestyle. Lips are a high-movement area, so the product is absorbed faster.',
            },
            {
                question: 'Will my lips look too big?',
                answer: 'The final size is up to you. We work conservatively and progressively. It is better to start with less and add more if you want greater volume afterward.',
            },
            {
                question: 'Is it painful?',
                answer: 'We apply topical anesthesia before the procedure and the products contain lidocaine. Discomfort is minimal and very tolerable.',
            },
            {
                question: 'Will there be a lot of swelling?',
                answer: 'It is normal to have swelling for 2-5 days after treatment. The lips may look larger than expected initially, but this normalizes.',
            },
            {
                question: 'Can I kiss after the procedure?',
                answer: 'It is recommended to avoid excessive pressure on the lips for 24-48 hours. After this time, you can return to completely normal life.',
            },
            {
                question: 'Can the fillers be dissolved?',
                answer: 'Yes, one of the great advantages of hyaluronic acid is that it can be dissolved with hyaluronidase if the result is unsatisfactory or there is any complication.',
            },
        ],
        cta: {
            title: 'Enhance your smile with perfect lips',
            description: 'Schedule your consultation and discover how lip fillers can transform your face.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function RellenosLabiosPage() {
    return <ProcedurePage data={rellenosLabiosData} />
}

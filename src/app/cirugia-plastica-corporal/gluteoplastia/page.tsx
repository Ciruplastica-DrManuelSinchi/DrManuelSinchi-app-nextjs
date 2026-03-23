"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Timer,
    Star,
    TrendingUp,
    CircleDot
} from 'lucide-react'

// ============================================
// GLUTEOPLASTIA DATA
// ============================================

const gluteoplastiaData: ProcedureData = {
    // Routing & Category
    slug: 'gluteoplastia',
    category: 'corporal',
    categoryLabel: 'Cirugía Corporal',
    categoryPath: '/cirugia-plastica-corporal',

    // Hero Section
    hero: {
        badge: 'Aumento de Glúteos',
        title: 'Gluteoplastia',
        description: 'Aumenta y moldea tus glúteos para lograr una figura más curvilínea y proporcionada. Implantes o lipotransferencia (BBL) según tus necesidades.',
        duration: '2-3 horas',
        recovery: '14-21 días recuperación',
        anesthesia: 'Anestesia general',
        whatsappMessage: 'Hola, me interesa información sobre gluteoplastia',
    },

    // Info Section
    info: {
        title: '¿Qué es la Gluteoplastia?',
        content: [
            'La gluteoplastia es un procedimiento quirúrgico que aumenta el volumen y mejora la forma de los glúteos. Puede realizarse mediante implantes de silicona o mediante lipotransferencia (también conocido como BBL - Brazilian Butt Lift).',
            'La técnica de <strong class="text-primary">lipotransferencia o BBL</strong> utiliza tu propia grasa extraída de otras zonas del cuerpo (abdomen, cintura, espalda) y la reinyecta en los glúteos, logrando un resultado natural y doble beneficio.',
        ],
        image: '/images/procedures/que-es/gluteoplastia-tecnica.jpg',
        highlights: {
            title: 'Técnicas Disponibles',
            icon: TrendingUp,
            items: [
                'Lipotransferencia (BBL)',
                'Implantes de glúteos',
                'Técnica combinada',
                'Levantamiento de glúteos',
                'Remodelación del contorno',
                'Corrección de asimetrías',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: TrendingUp,
            title: 'Glúteos Voluminosos',
            description: 'Aumenta tamaño y proyección de forma natural.',
        },
        {
            icon: CircleDot,
            title: 'Figura Curvilínea',
            description: 'Mejora la proporción y armonía corporal.',
        },
        {
            icon: Shield,
            title: 'BBL Natural',
            description: 'Usa tu propia grasa sin materiales externos.',
        },
        {
            icon: Heart,
            title: 'Doble Beneficio',
            description: 'Moldea otras zonas al extraer grasa para BBL.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/gluteoplastia-before.jpg',
            after: '/images/before-after/gluteoplastia-after.jpg',
            label: 'Caso 1 - BBL',
        },
        {
            before: '/images/before-after/gluteoplastia-before.jpg',
            after: '/images/before-after/gluteoplastia-after.jpg',
            label: 'Caso 2 - Implantes',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Evaluación corporal, análisis de grasa disponible y selección de técnica.',
            duration: '45-60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación Pre-quirúrgica',
            description: 'Exámenes de laboratorio, evaluación cardiológica y preparación.',
            duration: '2 semanas antes',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Procedimiento Quirúrgico',
            description: 'Liposucción + lipotransferencia o colocación de implantes.',
            duration: '2-3 horas',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Recuperación Inicial',
            description: 'Cuidados especiales al sentarse. Uso de faja compresiva.',
            duration: '2-3 semanas',
            icon: Timer,
        },
        {
            step: 5,
            title: 'Resultado Final',
            description: 'Asentamiento de grasa o implantes y apreciación del resultado.',
            duration: '3-6 meses',
            icon: Star,
        },
    ],

    // Videos
    videos: [
       {
            title: '¿Te hiciste una lipotransferencia? ¡Cuídala bien así!',
            youtubeId: 'LZeJiFcQtnI',
        },
        {
            title: 'Transformación total con Liposucción + RibxCar + Transferencia de grasa 💥',
            youtubeId: '5-75lv9Q4nI',
        },
        {
            title: '👉 ¿Te hiciste una lipotransferencia? ¡Cuídala bien así! 👈',
            youtubeId: 'LZeJiFcQtnI',
        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿Qué es mejor: BBL o implantes?',
            answer: 'Depende de cada caso. El BBL es ideal si tienes suficiente grasa corporal para transferir y deseas un resultado natural. Los implantes son mejores si tienes poca grasa disponible o deseas un aumento mayor.',
        },
        {
            question: '¿Cuánta grasa sobrevive en el BBL?',
            answer: 'Aproximadamente 60-70% de la grasa transferida se integra permanentemente. Por eso se transfiere un volumen mayor al deseado, anticipando la reabsorción parcial.',
        },
        {
            question: '¿Puedo sentarme después del BBL?',
            answer: 'Se recomienda evitar sentarse directamente sobre los glúteos durante las primeras 2-3 semanas. Debes usar un cojín especial y preferir acostarte o estar de pie.',
        },
        {
            question: '¿Los implantes de glúteos son seguros?',
            answer: 'Sí, los implantes de silicona para glúteos son seguros y han sido usados por décadas. Son más firmes que los implantes mamarios y están diseñados para soportar presión.',
        },
        {
            question: '¿Cuánto dura el resultado?',
            answer: 'El BBL es permanente una vez que la grasa se integra (3-6 meses). Los implantes también son permanentes, aunque pueden requerir revisión después de 10-15 años.',
        },
        {
            question: '¿Puedo hacer ejercicio después?',
            answer: 'Caminatas suaves desde la segunda semana. Ejercicio cardiovascular ligero a las 4-6 semanas. Sentadillas y ejercicios de glúteos después de 8-12 semanas.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '1000+', label: 'Gluteoplastias realizadas' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Logra los glúteos que siempre soñaste',
        description: 'Agenda tu consulta de valoración y descubre cuál es la mejor técnica para ti.',
    },

    en: {
        categoryLabel: 'Body Plastic Surgery',
        hero: {
            badge: 'Buttock Augmentation',
            title: 'Gluteoplasty',
            description: 'Augment and shape your buttocks to achieve a more curvaceous and proportionate figure. Implants or fat transfer (BBL) depending on your needs.',
            duration: '2-3 hours',
            recovery: '14-21 days recovery',
            anesthesia: 'General anesthesia',
        },
        info: {
            title: 'What is Gluteoplasty?',
            content: [
                'Gluteoplasty is a surgical procedure that increases the volume and improves the shape of the buttocks. It can be performed using silicone implants or through fat transfer (also known as BBL - Brazilian Butt Lift).',
                'The <strong class="text-primary">fat transfer or BBL</strong> technique uses your own fat extracted from other areas of the body (abdomen, waist, back) and reinjected into the buttocks, achieving a natural result with a dual benefit.',
            ],
            highlights: {
                title: 'Available Techniques',
                items: [
                    'Fat transfer (BBL)',
                    'Buttock implants',
                    'Combined technique',
                    'Buttock lift',
                    'Contour reshaping',
                    'Asymmetry correction',
                ],
            },
        },
        benefits: [
            {
                title: 'Voluminous Buttocks',
                description: 'Increases size and projection naturally.',
            },
            {
                title: 'Curvaceous Figure',
                description: 'Improves body proportion and harmony.',
            },
            {
                title: 'Natural BBL',
                description: 'Uses your own fat without external materials.',
            },
            {
                title: 'Dual Benefit',
                description: 'Shapes other areas while extracting fat for BBL.',
            },
        ],
        process: [
            {
                title: 'Assessment Consultation',
                description: 'Body evaluation, analysis of available fat, and technique selection.',
                duration: '45-60 min',
            },
            {
                title: 'Pre-surgical Preparation',
                description: 'Lab tests, cardiological evaluation, and preparation.',
                duration: '2 weeks prior',
            },
            {
                title: 'Surgical Procedure',
                description: 'Liposuction + fat transfer or implant placement.',
                duration: '2-3 hours',
            },
            {
                title: 'Initial Recovery',
                description: 'Special care when sitting. Use of compression garment.',
                duration: '2-3 weeks',
            },
            {
                title: 'Final Result',
                description: 'Fat or implant settling and appreciation of the outcome.',
                duration: '3-6 months',
            },
        ],
        faqs: [
            {
                question: 'What is better: BBL or implants?',
                answer: 'It depends on each case. BBL is ideal if you have enough body fat to transfer and want a natural result. Implants are better if you have little available fat or desire a larger augmentation.',
            },
            {
                question: 'How much fat survives in BBL?',
                answer: 'Approximately 60-70% of the transferred fat permanently integrates. That is why a larger volume than desired is transferred, anticipating partial reabsorption.',
            },
            {
                question: 'Can I sit after BBL?',
                answer: 'It is recommended to avoid sitting directly on the buttocks during the first 2-3 weeks. You should use a special cushion and prefer lying down or standing.',
            },
            {
                question: 'Are buttock implants safe?',
                answer: 'Yes, silicone buttock implants are safe and have been used for decades. They are firmer than breast implants and are designed to withstand pressure.',
            },
            {
                question: 'How long do the results last?',
                answer: 'BBL is permanent once the fat integrates (3-6 months). Implants are also permanent, although they may require revision after 10-15 years.',
            },
            {
                question: 'Can I exercise afterward?',
                answer: 'Light walks from the second week. Light cardiovascular exercise at 4-6 weeks. Squats and glute exercises after 8-12 weeks.',
            },
        ],
        cta: {
            title: 'Achieve the buttocks you have always dreamed of',
            description: 'Schedule your assessment consultation and discover which technique is best for you.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function GluteoplastiaPage() {
    return <ProcedurePage data={gluteoplastiaData} />
}

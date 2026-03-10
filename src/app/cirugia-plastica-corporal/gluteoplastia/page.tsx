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
        heroImage: '/images/procedures/gluteoplastia-hero.jpg',
        whatsappMessage: 'Hola, me interesa información sobre gluteoplastia',
    },

    // Info Section
    info: {
        title: '¿Qué es la Gluteoplastia?',
        content: [
            'La gluteoplastia es un procedimiento quirúrgico que aumenta el volumen y mejora la forma de los glúteos. Puede realizarse mediante implantes de silicona o mediante lipotransferencia (también conocido como BBL - Brazilian Butt Lift).',
            'La técnica de <strong class="text-primary">lipotransferencia o BBL</strong> utiliza tu propia grasa extraída de otras zonas del cuerpo (abdomen, cintura, espalda) y la reinyecta en los glúteos, logrando un resultado natural y doble beneficio.',
        ],
        image: '/images/procedures/gluteoplastia-tecnica.jpg',
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
            title: '¿Qué es el BBL (Brazilian Butt Lift)?',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '5:45',
        },
        {
            title: 'BBL vs Implantes de glúteos',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '6:20',
        },
        {
            title: 'Recuperación de la gluteoplastia',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '4:30',
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
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function GluteoplastiaPage() {
    return <ProcedurePage data={gluteoplastiaData} />
}

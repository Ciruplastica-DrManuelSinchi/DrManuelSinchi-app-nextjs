"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Eye,
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Timer,
    Star,
    Sun
} from 'lucide-react'

// ============================================
// BLEFAROPLASTIA DATA
// ============================================

const blefaroplastiaData: ProcedureData = {
    // Routing & Category
    slug: 'blefaroplastia',
    category: 'facial',
    categoryLabel: 'Cirugía Facial',
    categoryPath: '/cirugia-plastica-facial',

    // Hero Section
    hero: {
        badge: 'Rejuvenecimiento de Mirada',
        title: 'Blefaroplastia',
        description: 'Rejuvenece tu mirada eliminando el exceso de piel y bolsas en los párpados. Resultados naturales que te harán lucir descansado y fresco.',
        duration: '1-2 horas',
        recovery: '5-7 días recuperación',
        anesthesia: 'Anestesia local + sedación',
        whatsappMessage: 'Hola, me interesa información sobre blefaroplastia',
    },

    // Info Section
    info: {
        title: '¿Qué es la Blefaroplastia?',
        content: [
            'La blefaroplastia es una cirugía que corrige el exceso de piel, músculo y grasa en los párpados superiores e inferiores. Es uno de los procedimientos más efectivos para rejuvenecer la mirada y eliminar el aspecto de cansancio.',
            'Este procedimiento puede realizarse en párpados superiores, inferiores o ambos, según las necesidades de cada paciente. Las <strong class="text-primary">incisiones se ocultan en los pliegues naturales</strong>, dejando cicatrices prácticamente invisibles.',
        ],
        image: '/images/procedures/que-es/blefaroplastia-tecnica.jpg',
        highlights: {
            title: 'Beneficios de la Blefaroplastia',
            icon: Eye,
            items: [
                'Mirada más joven y descansada',
                'Elimina bolsas y ojeras',
                'Mejora el campo visual',
                'Cicatrices imperceptibles',
                'Resultados duraderos',
                'Recuperación rápida',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Eye,
            title: 'Mirada Rejuvenecida',
            description: 'Elimina años de tu rostro con una mirada fresca y descansada.',
        },
        {
            icon: Sun,
            title: 'Aspecto Natural',
            description: 'Resultados sutiles que realzan tu belleza sin parecer operado.',
        },
        {
            icon: Shield,
            title: 'Procedimiento Seguro',
            description: 'Técnica mínimamente invasiva con rápida recuperación.',
        },
        {
            icon: Heart,
            title: 'Alta Satisfacción',
            description: 'Uno de los procedimientos con mayor índice de satisfacción.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/blefaroplastia-before.jpg',
            after: '/images/before-after/blefaroplastia-after.jpg',
            label: 'Caso 1 - Párpados superiores',
        },
        {
            before: '/images/before-after/blefaroplastia-before.jpg',
            after: '/images/before-after/blefaroplastia-after.jpg',
            label: 'Caso 2 - Completa',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Evaluación de párpados, análisis de expectativas y planificación del procedimiento.',
            duration: '30-45 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación Pre-quirúrgica',
            description: 'Exámenes oftalmológicos y médicos previos a la cirugía.',
            duration: '1 semana antes',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Procedimiento Quirúrgico',
            description: 'Cirugía ambulatoria con anestesia local y sedación para tu comodidad.',
            duration: '1-2 horas',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Recuperación Inicial',
            description: 'Aplicación de frío, reposo y control de la inflamación.',
            duration: '5-7 días',
            icon: Timer,
        },
        {
            step: 5,
            title: 'Resultado Final',
            description: 'Desaparición de la inflamación residual y apreciación del resultado definitivo.',
            duration: '2-3 meses',
            icon: Star,
        },
    ],

    // Videos
    videos: [
        {
            title: '👀 Resultado de una Blefaroplastia Inferior ',
            youtubeId: 't4CJHFDtT-w'
        },
        {
            title: 'Rinoseptoplastia y Blefaroplastia',
            youtubeId: '2UThbvUrJ0Y'
        },
        {
            title: '👀 Resultado de una Blefaroplastia Inferior ',
            youtubeId: 't4CJHFDtT-w'
        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿A qué edad se recomienda la blefaroplastia?',
            answer: 'No hay una edad específica. El procedimiento se recomienda cuando existe exceso de piel o bolsas que afectan la estética o la visión. Generalmente esto ocurre a partir de los 35-40 años, aunque puede variar según la genética.',
        },
        {
            question: '¿La blefaroplastia deja cicatrices visibles?',
            answer: 'Las incisiones se realizan en los pliegues naturales del párpado superior y justo debajo de las pestañas en el inferior. Una vez cicatrizadas, son prácticamente imperceptibles.',
        },
        {
            question: '¿Puedo operarme solo los párpados superiores o inferiores?',
            answer: 'Sí, el procedimiento puede realizarse solo en párpados superiores, solo en inferiores, o en ambos según tus necesidades. Durante la consulta evaluaremos qué opción es la más adecuada para ti.',
        },
        {
            question: '¿Cuánto duran los resultados?',
            answer: 'Los resultados son duraderos, generalmente entre 10-15 años o más. El envejecimiento continúa naturalmente, pero siempre lucirás mejor que si no te hubieras operado.',
        },
        {
            question: '¿Cuándo puedo volver a trabajar?',
            answer: 'La mayoría de pacientes retoman sus actividades laborales entre 7-10 días después de la cirugía. El maquillaje puede usarse después de 10-14 días.',
        },
        {
            question: '¿Es doloroso el procedimiento?',
            answer: 'La cirugía se realiza con anestesia local y sedación, por lo que no sentirás dolor. En el postoperatorio, las molestias son leves y se controlan fácilmente con medicación.',
        },
        {
            question: '¿Puede la blefaroplastia mejorar mi visión?',
            answer: 'Sí, cuando el exceso de piel en los párpados superiores es significativo, puede obstruir el campo visual. La blefaroplastia corrige esto, mejorando tanto la estética como la función.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '1500+', label: 'Blefaroplastias realizadas' },
            { value: '99%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Recupera la juventud de tu mirada',
        description: 'Agenda tu consulta de valoración y descubre cómo la blefaroplastia puede rejuvenecer tu rostro.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function BlefaroplastiaPage() {
    return <ProcedurePage data={blefaroplastiaData} />
}

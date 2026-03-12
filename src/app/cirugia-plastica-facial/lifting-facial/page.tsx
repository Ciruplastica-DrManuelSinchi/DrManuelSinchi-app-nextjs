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
    Clock
} from 'lucide-react'

// ============================================
// LIFTING FACIAL DATA
// ============================================

const liftingFacialData: ProcedureData = {
    // Routing & Category
    slug: 'lifting-facial',
    category: 'facial',
    categoryLabel: 'Cirugía Facial',
    categoryPath: '/cirugia-plastica-facial',

    // Hero Section
    hero: {
        badge: 'Rejuvenecimiento Integral',
        title: 'Lifting Facial',
        description: 'Rejuvenece tu rostro de forma integral corrigiendo la flacidez y las arrugas. Resultados naturales que te devuelven una apariencia fresca y descansada.',
        duration: '3-4 horas',
        recovery: '14-21 días recuperación',
        anesthesia: 'Anestesia general',
        whatsappMessage: 'Hola, me interesa información sobre lifting facial',
    },

    // Info Section
    info: {
        title: '¿Qué es el Lifting Facial?',
        content: [
            'El lifting facial, también conocido como ritidectomía, es una cirugía que corrige los signos del envejecimiento en el rostro y cuello. Reposiciona los tejidos faciales profundos, elimina el exceso de piel y restaura los contornos juveniles.',
            'Utilizamos técnicas avanzadas de <strong class="text-primary">lifting SMAS (Sistema Músculo-Aponeurótico Superficial)</strong> que trabajan las capas profundas del rostro, logrando resultados más naturales y duraderos que las técnicas superficiales.',
        ],
        image: '/images/procedures/que-es/lifting-facial-tecnica.jpg',
        highlights: {
            title: 'Áreas que trata el Lifting Facial',
            icon: Sparkles,
            items: [
                'Mejillas caídas y surcos nasogenianos',
                'Líneas de marioneta',
                'Papada y cuello flácido',
                'Mandíbula poco definida',
                'Arrugas profundas del rostro',
                'Pérdida de volumen facial',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: TrendingUp,
            title: 'Rejuvenecimiento Completo',
            description: 'Corrige múltiples signos de envejecimiento en un solo procedimiento.',
        },
        {
            icon: Clock,
            title: 'Resultados Duraderos',
            description: 'Efectos que perduran entre 7-10 años o más.',
        },
        {
            icon: Shield,
            title: 'Técnica SMAS',
            description: 'Trabajamos capas profundas para resultados más naturales.',
        },
        {
            icon: Heart,
            title: 'Aspecto Natural',
            description: 'Sin el look "operado", mantienes tu expresión natural.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/lifting-facial-before.jpg',
            after: '/images/before-after/lifting-facial-after.jpg',
            label: 'Caso 1 - Lifting completo',
        },
        {
            before: '/images/before-after/lifting-facial-before.jpg',
            after: '/images/before-after/lifting-facial-after.jpg',
            label: 'Caso 2 - Lifting + cuello',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Evaluación facial integral, análisis de envejecimiento y planificación personalizada.',
            duration: '60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación Pre-quirúrgica',
            description: 'Exámenes completos, evaluación cardiológica y preparación física.',
            duration: '2 semanas antes',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Procedimiento Quirúrgico',
            description: 'Cirugía con técnica SMAS bajo anestesia general en clínica certificada.',
            duration: '3-4 horas',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Recuperación Hospitalaria',
            description: 'Monitoreo post-operatorio, manejo del dolor y cuidados iniciales.',
            duration: '1 noche',
            icon: Timer,
        },
        {
            step: 5,
            title: 'Recuperación en Casa',
            description: 'Retiro de puntos progresivo, control de inflamación y seguimiento.',
            duration: '14-21 días',
            icon: Star,
        },
    ],

    // Videos
    videos: [
        {
            title: '¿Qué es el lifting facial SMAS?',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '6:15',
        },
        {
            title: 'Recuperación del lifting facial: día a día',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '5:42',
        },
        {
            title: 'Testimonio: Mi experiencia con lifting facial',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '4:58',
        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿A qué edad es recomendable hacerse un lifting facial?',
            answer: 'Generalmente se realiza entre los 45-70 años, cuando hay signos evidentes de flacidez facial. Sin embargo, la edad ideal depende del grado de envejecimiento individual. Algunos pacientes se benefician a los 40 años, otros esperan hasta los 60.',
        },
        {
            question: '¿Cuánto duran los resultados del lifting facial?',
            answer: 'Los resultados duran típicamente entre 7-10 años. El envejecimiento continúa naturalmente, pero siempre lucirás años más joven que si no te hubieras operado. Muchos pacientes optan por un segundo lifting después de una década.',
        },
        {
            question: '¿El lifting facial deja cicatrices visibles?',
            answer: 'Las incisiones se ocultan estratégicamente en la línea del cabello, alrededor de las orejas y debajo del mentón. Una vez cicatrizadas (3-6 meses), son prácticamente imperceptibles.',
        },
        {
            question: '¿Puedo combinar el lifting con otros procedimientos?',
            answer: 'Sí, es muy común combinar el lifting facial con blefaroplastia (párpados), lifting de cuello, lipotransferencia facial o láser de resurfacing para resultados más completos.',
        },
        {
            question: '¿Cuánto tiempo de reposo necesito?',
            answer: 'Se recomienda 2-3 semanas de reposo social. Puedes retomar actividades ligeras a las 2 semanas y ejercicio después de 4-6 semanas. La inflamación visible desaparece en 3-4 semanas.',
        },
        {
            question: '¿Es muy doloroso el procedimiento?',
            answer: 'El lifting facial tiene una recuperación moderada. Hay inflamación y algo de incomodidad los primeros días, pero el dolor es manejable con medicación. La mayoría de pacientes describen más molestias que dolor intenso.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '800+', label: 'Liftings realizados' },
            { value: '97%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Recupera la juventud de tu rostro',
        description: 'Agenda tu consulta de valoración y descubre cómo el lifting facial puede rejuvenecerte naturalmente.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function LiftingFacialPage() {
    return <ProcedurePage data={liftingFacialData} />
}

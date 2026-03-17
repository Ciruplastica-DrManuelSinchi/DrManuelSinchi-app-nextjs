"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    Minimize2,
    Scissors
} from 'lucide-react'

// ============================================
// AFINAMIENTO FACIAL DATA
// ============================================

const afinamientoFacialData: ProcedureData = {
    slug: 'afinamiento-facial',
    category: 'facial',
    categoryLabel: 'Cirugía Plástica Facial',
    categoryPath: '/cirugia-plastica-facial',

    hero: {
        badge: 'Armonización Facial',
        title: 'Afinamiento Facial',
        description: 'Transforma tu rostro con un tratamiento integral que combina bichectomía, liposucción de papada/cara, marcación mandibular y mentoplastia para lograr un óvalo facial más definido y estilizado.',
        duration: '2-3 horas',
        recovery: '14-21 días',
        anesthesia: 'Sedación o general',
        whatsappMessage: 'Hola, me interesa información sobre afinamiento facial',
    },

    info: {
        title: '¿Qué es el Afinamiento Facial?',
        content: [
            'El afinamiento facial es un procedimiento integral que combina múltiples técnicas para lograr un rostro más delgado, definido y armonioso. Es ideal para quienes desean una transformación completa del tercio inferior del rostro.',
            'Este tratamiento incluye: <strong class="text-primary">Bichectomía</strong> (extracción de bolsas de Bichat), <strong class="text-primary">Liposucción de papada y cara</strong>, <strong class="text-primary">Marcación mandibular</strong> y <strong class="text-primary">Mentoplastia</strong>. La combinación de estas técnicas logra resultados superiores a cada procedimiento por separado.',
        ],
        image: '/images/procedures/que-es/afinamiento-facial.jpg',
        highlights: {
            title: 'Procedimientos Incluidos',
            icon: Minimize2,
            items: [
                'Bichectomía bilateral',
                'Liposucción de papada',
                'Liposucción facial',
                'Marcación mandibular',
                'Mentoplastia de aumento',
                'Definición del óvalo facial',
            ],
        },
    },

    benefits: [
        {
            icon: Minimize2,
            title: 'Rostro Afinado',
            description: 'Reduce el volumen facial para un aspecto más estilizado.',
        },
        {
            icon: Sparkles,
            title: 'Mandíbula Definida',
            description: 'Línea mandibular angular y marcada.',
        },
        {
            icon: Scissors,
            title: 'Sin Papada',
            description: 'Eliminación del exceso de grasa submentoniana.',
        },
        {
            icon: Heart,
            title: 'Armonía Completa',
            description: 'Mejora integral de las proporciones faciales.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/afinamiento-before.jpg',
            after: '/images/before-after/afinamiento-after.jpg',
            label: 'Caso 1 - Afinamiento completo',
        },
        {
            before: '/images/before-after/afinamiento-before-2.jpg',
            after: '/images/before-after/afinamiento-after-2.jpg',
            label: 'Caso 2 - Transformación facial',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Evaluación Integral',
            description: 'Análisis completo del rostro y diseño del plan de afinamiento.',
            duration: '45-60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Planificación',
            description: 'Selección de procedimientos específicos según tus necesidades.',
            duration: 'En consulta',
            icon: Sparkles,
        },
        {
            step: 3,
            title: 'Cirugía Combinada',
            description: 'Realización de todos los procedimientos en una sola intervención.',
            duration: '2-3 horas',
            icon: Shield,
        },
        {
            step: 4,
            title: 'Recuperación',
            description: 'Uso de mentonera, inflamación que cede gradualmente. Resultado final en 3-6 meses.',
            duration: '14-21 días',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Es necesario hacer todos los procedimientos juntos?',
            answer: 'No necesariamente. Evaluamos qué combinación necesitas. Sin embargo, hacerlos juntos optimiza resultados, reduce costos y tiempos de recuperación.',
        },
        {
            question: '¿Cuánto tiempo dura la inflamación?',
            answer: 'La mayor inflamación dura 2-3 semanas. A las 4-6 semanas se ve un buen resultado, pero el definitivo toma 3-6 meses.',
        },
        {
            question: '¿El resultado es permanente?',
            answer: 'Sí, la bichectomía y liposucción eliminan células grasas permanentemente. Los implantes de mentón y mandíbula también son permanentes.',
        },
        {
            question: '¿Quedan cicatrices visibles?',
            answer: 'No, todas las incisiones son intraorales (dentro de la boca) o pequeñas punciones debajo del mentón que son prácticamente invisibles.',
        },
        {
            question: '¿Es doloroso el postoperatorio?',
            answer: 'Hay molestias moderadas los primeros días, controlables con analgésicos. La mayoría de pacientes describe más incomodidad que dolor.',
        },
        {
            question: '¿Cuándo puedo volver al trabajo?',
            answer: 'Generalmente entre 7-14 días, dependiendo del tipo de trabajo. Para actividades sociales, recomendamos esperar 2-3 semanas.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '600+', label: 'Afinamientos faciales' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'Transforma tu rostro con el afinamiento facial',
        description: 'Agenda tu consulta para diseñar el plan de afinamiento ideal para ti.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function AfinamientoFacialPage() {
    return <ProcedurePage data={afinamientoFacialData} />
}

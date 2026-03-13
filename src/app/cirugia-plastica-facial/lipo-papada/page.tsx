"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Timer,
    Star,
    Zap,
    Target
} from 'lucide-react'

// ============================================
// LIPOSUCCIÓN DE PAPADA DATA
// ============================================

const lipoPapadaData: ProcedureData = {
    // Routing & Category
    slug: 'lipo-papada',
    category: 'facial',
    categoryLabel: 'Cirugía Facial',
    categoryPath: '/cirugia-plastica-facial',

    // Hero Section
    hero: {
        badge: 'Definición del Cuello',
        title: 'Liposucción de Papada',
        description: 'Elimina la grasa submentoniana y define tu cuello. Un procedimiento mínimamente invasivo que rejuvenece tu perfil de forma natural.',
        duration: '1 hora',
        recovery: '5-7 días recuperación',
        anesthesia: 'Anestesia local + sedación',
        whatsappMessage: 'Hola, me interesa información sobre liposucción de papada',
    },

    // Info Section
    info: {
        title: '¿Qué es la Liposucción de Papada?',
        content: [
            'La liposucción de papada, también conocida como liposucción submentoniana, es un procedimiento que elimina la grasa acumulada debajo del mentón. Esta grasa, conocida como "doble mentón" o papada, es resistente a dieta y ejercicio.',
            'Mediante pequeñas incisiones prácticamente invisibles, se utiliza una <strong class="text-primary">cánula fina para aspirar la grasa</strong>, definiendo el ángulo cérvico-facial y rejuveneciendo el perfil. Es un procedimiento ambulatorio con recuperación rápida.',
        ],
        image: '/images/procedures/que-es/lipo-papada-tecnica.jpg',
        highlights: {
            title: 'Beneficios del Procedimiento',
            icon: Target,
            items: [
                'Elimina el doble mentón',
                'Define el ángulo del cuello',
                'Rejuvenece el perfil facial',
                'Procedimiento ambulatorio',
                'Mínimas incisiones',
                'Recuperación rápida',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Zap,
            title: 'Mínimamente Invasivo',
            description: 'Pequeñas incisiones de 3mm que no dejan cicatrices visibles.',
        },
        {
            icon: Target,
            title: 'Resultados Precisos',
            description: 'Eliminación selectiva de grasa con contorno definido.',
        },
        {
            icon: Shield,
            title: 'Grasa No Regresa',
            description: 'Las células de grasa eliminadas no se regeneran.',
        },
        {
            icon: Heart,
            title: 'Perfil Rejuvenecido',
            description: 'Cuello definido que te hace lucir más joven.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/lipo-papada-before.jpg',
            after: '/images/before-after/lipo-papada-after.jpg',
            label: 'Caso 1 - Definición de cuello',
        },
        {
            before: '/images/before-after/lipo-papada-before.jpg',
            after: '/images/before-after/lipo-papada-after.jpg',
            label: 'Caso 2 - Eliminación de papada',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Evaluación de la grasa submentoniana, elasticidad de piel y expectativas.',
            duration: '30 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Día del Procedimiento',
            description: 'Cirugía ambulatoria con anestesia local y sedación para tu comodidad.',
            duration: '1 hora',
            icon: Sparkles,
        },
        {
            step: 3,
            title: 'Recuperación Inmediata',
            description: 'Puedes irte a casa el mismo día. Se coloca una mentonera de compresión.',
            duration: 'Mismo día',
            icon: Timer,
        },
        {
            step: 4,
            title: 'Uso de Mentonera',
            description: 'Compresión para reducir inflamación y ayudar a la retracción de piel.',
            duration: '5-7 días',
            icon: Shield,
        },
        {
            step: 5,
            title: 'Resultado Final',
            description: 'Definición completa del cuello una vez desaparezca la inflamación.',
            duration: '1-3 meses',
            icon: Star,
        },
    ],

    // Videos
    videos: [
        {
            title: 'Caso de afinamiento de rostro',
            youtubeId: '9isCtT3yYk0'
        },
        {
            title: 'Liposucción de papada: antes y después',
            youtubeId: '8ldGYrTf488'
        },
        {
            title: 'Caso de liposucción de papada',
            youtubeId: '24c5BD3LU1s'
        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿La papada vuelve a aparecer después?',
            answer: 'No, las células de grasa eliminadas no se regeneran. Sin embargo, si ganas peso significativo, las células restantes pueden aumentar de tamaño. Mantener un peso estable asegura resultados duraderos.',
        },
        {
            question: '¿Quedan cicatrices visibles?',
            answer: 'Las incisiones son de solo 2-3mm, ubicadas debajo del mentón y detrás de los lóbulos de las orejas. Son prácticamente invisibles una vez cicatrizadas.',
        },
        {
            question: '¿Qué pasa si mi piel está flácida?',
            answer: 'En casos de piel con buena elasticidad, esta se retrae naturalmente después de la liposucción. Si hay flacidez significativa, puede ser necesario combinar con un mini lifting de cuello para mejores resultados.',
        },
        {
            question: '¿Cuánto tiempo debo usar la mentonera?',
            answer: 'Se recomienda usar la mentonera las 24 horas durante los primeros 5-7 días, y luego solo de noche por 2-3 semanas adicionales para optimizar la retracción de la piel.',
        },
        {
            question: '¿Puedo volver al trabajo rápido?',
            answer: 'La mayoría de pacientes retoman actividades laborales (no físicas) en 3-5 días. La inflamación inicial es moderada y disminuye rápidamente.',
        },
        {
            question: '¿Se puede combinar con otros procedimientos?',
            answer: 'Sí, frecuentemente se combina con bichectomía, mentoplastia, rellenos faciales o lifting de cuello para un rejuvenecimiento facial más completo.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '1800+', label: 'Liposucciones faciales' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Elimina tu papada y define tu cuello',
        description: 'Agenda tu consulta de valoración y descubre cómo rejuvenecer tu perfil de forma natural.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function LipoPapadaPage() {
    return <ProcedurePage data={lipoPapadaData} />
}

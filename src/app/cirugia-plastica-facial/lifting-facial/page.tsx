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
        badge: 'Estiramiento Facial',
        title: 'Lifting Facial y Lifting de Cejas',
        description: 'Rejuvenece tu rostro con técnicas de estiramiento facial. Incluye Lifting de Cejas (Fox-eyes), Lifting Frontal, Lifting Facial completo y Lifting Cervical para resultados naturales.',
        duration: '1-4 horas',
        recovery: '7-21 días recuperación',
        anesthesia: 'Local con sedación / General',
        whatsappMessage: 'Hola, me interesa información sobre lifting facial',
    },

    // Info Section
    info: {
        title: '¿Qué es el Lifting (Estiramiento Facial)?',
        content: [
            'El lifting o estiramiento facial incluye diversas técnicas para rejuvenecer diferentes zonas del rostro. Desde el popular <strong class="text-primary">Lifting de Cejas (Fox-eyes)</strong> que crea una mirada almendrada y felina, hasta el lifting facial completo que corrige la flacidez de todo el rostro.',
            'Ofrecemos: <strong class="text-primary">Lifting de Cejas / Fox-eyes</strong> (levantamiento de cejas para mirada más expresiva), <strong class="text-primary">Lifting Frontal</strong> (frente y entrecejo), <strong class="text-primary">Lifting Facial</strong> (tercio medio e inferior) y <strong class="text-primary">Lifting Cervical</strong> (cuello y papada).',
        ],
        image: '/images/procedures/que-es/lifting-facial-tecnica.jpg',
        highlights: {
            title: 'Tipos de Lifting Disponibles',
            icon: Sparkles,
            items: [
                'Lifting de Cejas (Fox-eyes)',
                'Levantamiento de cejas',
                'Lifting Frontal',
                'Lifting Facial (SMAS)',
                'Lifting Cervical (cuello)',
                'Mini-lifting facial',
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
            title: 'Cambio sutil, resultado natural',
            youtubeId: 'kEQEN_kO4a0'
        },
        {
            title: 'PERFILOPLASTIA: Rinoplastia ultrasónica + Afinamiento facial',
            youtubeId: '0zQ0cvgBYrs'

        },
        {
            title: 'Caso real: Lipoescultura, Rinoseptoplastia y Afinamiento facial',
            youtubeId: 'wxMCK-kXHeg'

        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿Qué es el Lifting de Cejas o Fox-eyes?',
            answer: 'El Lifting de Cejas eleva las cejas caídas para abrir la mirada. El "Fox-eyes" es una técnica que además inclina las cejas hacia arriba en el extremo externo, creando un aspecto almendrado y felino muy popular actualmente. Es ideal para pacientes jóvenes que desean este look específico.',
        },
        {
            question: '¿Cuál es la diferencia entre los tipos de lifting?',
            answer: 'El Lifting de Cejas/Fox-eyes solo trabaja las cejas. El Lifting Frontal incluye frente y entrecejo. El Lifting Facial trata mejillas, mandíbula y surcos. El Lifting Cervical se enfoca en cuello y papada. Pueden combinarse según tus necesidades.',
        },
        {
            question: '¿A qué edad es recomendable hacerse un lifting?',
            answer: 'Depende del tipo. El Fox-eyes se realiza desde los 25-30 años por estética. El lifting frontal desde los 35-40. El lifting facial completo generalmente entre 45-70 años cuando hay flacidez evidente.',
        },
        {
            question: '¿Cuánto duran los resultados?',
            answer: 'El Fox-eyes dura 2-5 años. El lifting frontal 5-7 años. El lifting facial completo 7-10 años. El envejecimiento continúa naturalmente, pero siempre lucirás mejor que si no te hubieras operado.',
        },
        {
            question: '¿El lifting deja cicatrices visibles?',
            answer: 'Las incisiones se ocultan en la línea del cabello, detrás de las orejas o en pliegues naturales. Para Fox-eyes, las técnicas con hilos no dejan cicatrices visibles. Una vez cicatrizadas son prácticamente imperceptibles.',
        },
        {
            question: '¿Puedo combinar diferentes tipos de lifting?',
            answer: 'Sí, es muy común. Por ejemplo: Fox-eyes + Blefaroplastia, o Lifting Facial + Lifting Cervical. También se combina con rinoplastia, rellenos o lipotransferencia para resultados más completos.',
        },
        {
            question: '¿Cuánto tiempo de recuperación necesito?',
            answer: 'El Fox-eyes requiere 5-7 días. El lifting frontal 7-10 días. El lifting facial completo 2-3 semanas de reposo social. La inflamación visible desaparece gradualmente.',
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

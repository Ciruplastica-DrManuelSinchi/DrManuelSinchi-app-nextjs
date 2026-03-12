"use client"
//La dirección llega a una carpeta, no a archivos especificos
import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Zap,
    Eye,
    Shield,
    Heart,
    Calendar,
    Sparkles,
    Timer,
    Star
} from 'lucide-react'

// ============================================
// RINOPLASTIA DATA
// ============================================

const rinoplastiaData: ProcedureData = {
    // Routing & Category
    slug: 'rinoplastia',
    category: 'facial',
    categoryLabel: 'Cirugía Facial',
    categoryPath: '/cirugia-plastica-facial',

    // Hero Section
    hero: {
        badge: 'Técnica Ultrasónica Disponible',
        title: 'Rinoplastia',
        description: 'Transforma tu nariz con resultados naturales y armónicos. Técnica ultrasónica para una recuperación más rápida y resultados más precisos.',
        duration: '2-3 horas',
        recovery: '7-10 días recuperación',
        anesthesia: 'Anestesia general',
        whatsappMessage: 'Hola, me interesa información sobre rinoplastia',
    },

    // Info Section
    info: {
        title: '¿Qué es la Rinoplastia?',
        content: [
            'La rinoplastia es una cirugía que permite modificar la forma, tamaño y proporciones de la nariz para lograr un equilibrio armónico con el resto del rostro. Puede corregir tanto aspectos estéticos como funcionales.',
            'En nuestra clínica utilizamos la <strong class="text-primary">técnica ultrasónica (Piezo)</strong>, un avance revolucionario que permite esculpir el hueso nasal con instrumentos piezoeléctricos de alta precisión, sin necesidad de martillo y cincel tradicionales.',
        ],
        image: '/images/procedures/que-es/rinoplastia-tecnica.jpg',
        highlights: {
            title: 'Ventajas de la Técnica Ultrasónica',
            icon: Zap,
            items: [
                'Menor inflamación y hematomas',
                'Recuperación más rápida',
                'Mayor precisión en el tallado',
                'Resultados más predecibles',
                'Menos trauma en tejidos',
                'Menor riesgo de irregularidades',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Zap,
            title: 'Técnica Ultrasónica',
            description: 'Menor trauma, mayor precisión y recuperación más rápida.',
        },
        {
            icon: Eye,
            title: 'Resultados Naturales',
            description: 'Armonía facial respetando tus rasgos únicos.',
        },
        {
            icon: Shield,
            title: 'Máxima Seguridad',
            description: 'Protocolos certificados y equipos de última generación.',
        },
        {
            icon: Heart,
            title: 'Atención Personalizada',
            description: 'Seguimiento completo antes, durante y después.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/rinoplastia-before.png',
            after: '/images/before-after/rinoplastia-after.png',
            label: 'Caso 1 - Perfil',
        },
        {
            before: '/images/before-after/rinoplastia-before.png',
            after: '/images/before-after/rinoplastia-after.png',
            label: 'Caso 2 - Frontal',
        },
        {
            before: '/images/before-after/rinoplastia-before.png',
            after: '/images/before-after/rinoplastia-after.png',
            label: 'Caso 3 - Perfil',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Evaluación facial completa, análisis de expectativas y planificación personalizada.',
            duration: '45-60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación Pre-quirúrgica',
            description: 'Exámenes médicos, indicaciones y preparación para la cirugía.',
            duration: '1-2 semanas antes',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Procedimiento Quirúrgico',
            description: 'Cirugía con técnica ultrasónica bajo anestesia general o sedación.',
            duration: '2-3 horas',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Recuperación Inicial',
            description: 'Uso de férula nasal, control del edema y seguimiento cercano.',
            duration: '7-10 días',
            icon: Timer,
        },
        {
            step: 5,
            title: 'Resultado Final',
            description: 'Reducción progresiva de la inflamación hasta ver el resultado definitivo.',
            duration: '6-12 meses',
            icon: Star,
        },
    ],

    // Videos
    videos: [
        {
            title: 'Todo sobre la Rinoplastia / Dr. Manuel Sinchi',
            youtubeId: 'cy5N4Z_DRmM'
        },
        {
            title: 'Rinoplastia ultrasónica vs convencional',
            youtubeId: 'EfC0TdjHIv8'
        },
        {
            title: 'Resultados naturales con Rinoseptoplastia Ultrasónica',
            youtubeId: '7oveiyGPTW8'
        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿Soy candidato(a) para una rinoplastia?',
            answer: 'Los candidatos ideales son personas mayores de 18 años con desarrollo facial completo, buena salud general, expectativas realistas y que deseen mejorar la apariencia o función de su nariz. Durante la consulta evaluaremos tu caso particular.',
        },
        {
            question: '¿Cuál es la diferencia entre rinoplastia, rinoseptoplastia y rinoplastia secundaria?',
            answer: 'La rinoplastia es la cirugía estética de la nariz. La rinoseptoplastia combina la corrección estética con la del tabique nasal (mejora funcional). La rinoplastia secundaria es una revisión de una cirugía nasal previa.',
        },
        {
            question: '¿Cuál es la edad mínima para una rinoplastia?',
            answer: 'Se recomienda esperar hasta que el desarrollo facial esté completo: aproximadamente 16-17 años en mujeres y 17-18 años en hombres. Sin embargo, cada caso se evalúa individualmente.',
        },
        {
            question: '¿Qué es la rinoplastia ultrasónica y por qué es mejor?',
            answer: 'Es una técnica avanzada que utiliza instrumentos piezoeléctricos para esculpir el hueso nasal con extrema precisión. Ventajas: menos hematomas, menor inflamación, recuperación más rápida y resultados más predecibles.',
        },
        {
            question: '¿Cuánto tiempo dura la recuperación?',
            answer: 'La férula se retira a los 7-10 días. Puedes retomar actividades ligeras en 2 semanas. El ejercicio intenso se permite después de 4-6 semanas. La inflamación residual desaparece gradualmente en 6-12 meses.',
        },
        {
            question: '¿La rinoplastia es dolorosa?',
            answer: 'La cirugía se realiza bajo anestesia, por lo que no sentirás dolor durante el procedimiento. Post-operatoriamente, las molestias son manejables con medicación y suelen ser mínimas con la técnica ultrasónica.',
        },
        {
            question: '¿Quedan cicatrices visibles?',
            answer: 'En la rinoplastia cerrada, las incisiones son internas y no dejan cicatrices visibles. En la técnica abierta, hay una pequeña incisión en la columela que se vuelve prácticamente imperceptible.',
        },
    ],

    // Doctor Section (uses defaults, but override credentials for rinoplastia)
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '3000+', label: 'Rinoplastias realizadas' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '200+', label: 'Casos ultrasónicos' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Da el primer paso hacia la nariz que siempre soñaste',
        description: 'Agenda tu consulta de valoración y recibe un plan personalizado sin compromiso.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function RinoplastiaPage() {
    return <ProcedurePage data={rinoplastiaData} />
}

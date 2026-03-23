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

    en: {
        categoryLabel: 'Facial Plastic Surgery',
        hero: {
            badge: 'Ultrasonic Technique Available',
            title: 'Rhinoplasty',
            description: 'Transform your nose with natural and harmonious results. Ultrasonic technique for faster recovery and more precise results.',
            duration: '2-3 hours',
            recovery: '7-10 days recovery',
            anesthesia: 'General anesthesia',
        },
        info: {
            title: 'What is Rhinoplasty?',
            content: [
                'Rhinoplasty is a surgery that allows modifying the shape, size, and proportions of the nose to achieve a harmonious balance with the rest of the face. It can correct both aesthetic and functional aspects.',
                'At our clinic we use the <strong class="text-primary">ultrasonic technique (Piezo)</strong>, a revolutionary advance that allows sculpting the nasal bone with high-precision piezoelectric instruments, without the need for traditional hammer and chisel.',
            ],
            highlights: {
                title: 'Advantages of the Ultrasonic Technique',
                items: [
                    'Less swelling and bruising',
                    'Faster recovery',
                    'Greater precision in sculpting',
                    'More predictable results',
                    'Less tissue trauma',
                    'Lower risk of irregularities',
                ],
            },
        },
        benefits: [
            {
                title: 'Ultrasonic Technique',
                description: 'Less trauma, greater precision, and faster recovery.',
            },
            {
                title: 'Natural Results',
                description: 'Facial harmony respecting your unique features.',
            },
            {
                title: 'Maximum Safety',
                description: 'Certified protocols and state-of-the-art equipment.',
            },
            {
                title: 'Personalized Care',
                description: 'Complete follow-up before, during, and after.',
            },
        ],
        process: [
            {
                title: 'Assessment Consultation',
                description: 'Complete facial evaluation, expectation analysis, and personalized planning.',
                duration: '45-60 min',
            },
            {
                title: 'Pre-surgical Preparation',
                description: 'Medical exams, instructions, and preparation for surgery.',
                duration: '1-2 weeks before',
            },
            {
                title: 'Surgical Procedure',
                description: 'Surgery with ultrasonic technique under general anesthesia or sedation.',
                duration: '2-3 hours',
            },
            {
                title: 'Initial Recovery',
                description: 'Use of nasal splint, edema control, and close follow-up.',
                duration: '7-10 days',
            },
            {
                title: 'Final Result',
                description: 'Progressive reduction of swelling until the definitive result is seen.',
                duration: '6-12 months',
            },
        ],
        faqs: [
            {
                question: 'Am I a candidate for rhinoplasty?',
                answer: 'Ideal candidates are people over 18 years with complete facial development, good general health, realistic expectations, and who wish to improve the appearance or function of their nose. During the consultation we will evaluate your particular case.',
            },
            {
                question: 'What is the difference between rhinoplasty, septorhinoplasty, and secondary rhinoplasty?',
                answer: 'Rhinoplasty is aesthetic nose surgery. Septorhinoplasty combines aesthetic correction with nasal septum correction (functional improvement). Secondary rhinoplasty is a revision of a previous nasal surgery.',
            },
            {
                question: 'What is the minimum age for rhinoplasty?',
                answer: 'It is recommended to wait until facial development is complete: approximately 16-17 years in women and 17-18 years in men. However, each case is evaluated individually.',
            },
            {
                question: 'What is ultrasonic rhinoplasty and why is it better?',
                answer: 'It is an advanced technique that uses piezoelectric instruments to sculpt the nasal bone with extreme precision. Advantages: fewer bruises, less swelling, faster recovery, and more predictable results.',
            },
            {
                question: 'How long does recovery take?',
                answer: 'The splint is removed at 7-10 days. You can resume light activities in 2 weeks. Intense exercise is allowed after 4-6 weeks. Residual swelling gradually disappears in 6-12 months.',
            },
            {
                question: 'Is rhinoplasty painful?',
                answer: 'Surgery is performed under anesthesia, so you will not feel pain during the procedure. Post-operatively, discomfort is manageable with medication and tends to be minimal with the ultrasonic technique.',
            },
            {
                question: 'Are there visible scars?',
                answer: 'In closed rhinoplasty, incisions are internal and leave no visible scars. In the open technique, there is a small incision on the columella that becomes practically imperceptible.',
            },
        ],
        cta: {
            title: 'Take the first step toward the nose you have always dreamed of',
            description: 'Schedule your assessment consultation and receive a personalized plan with no commitment.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function RinoplastiaPage() {
    return <ProcedurePage data={rinoplastiaData} />
}

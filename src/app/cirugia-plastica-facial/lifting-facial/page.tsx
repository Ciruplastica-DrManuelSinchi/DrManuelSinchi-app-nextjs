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

    en: {
        categoryLabel: 'Facial Plastic Surgery',
        hero: {
            badge: 'Facelift',
            title: 'Face Lift and Brow Lift',
            description: 'Rejuvenate your face with facial lifting techniques. Includes Brow Lift (Fox-eyes), Forehead Lift, full Facelift, and Neck Lift for natural results.',
            duration: '1-4 hours',
            recovery: '7-21 days recovery',
            anesthesia: 'Local with sedation / General',
        },
        info: {
            title: 'What is a Face Lift?',
            content: [
                'The facelift or face lifting includes various techniques to rejuvenate different areas of the face. From the popular <strong class="text-primary">Brow Lift (Fox-eyes)</strong> that creates an almond-shaped, feline gaze, to the full facelift that corrects sagging throughout the face.',
                'We offer: <strong class="text-primary">Brow Lift / Fox-eyes</strong> (eyebrow lifting for a more expressive gaze), <strong class="text-primary">Forehead Lift</strong> (forehead and frown area), <strong class="text-primary">Face Lift</strong> (middle and lower third) and <strong class="text-primary">Neck Lift</strong> (neck and double chin).',
            ],
            highlights: {
                title: 'Available Lifting Types',
                items: [
                    'Brow Lift (Fox-eyes)',
                    'Eyebrow lift',
                    'Forehead Lift',
                    'Face Lift (SMAS)',
                    'Neck Lift',
                    'Mini-facelift',
                ],
            },
        },
        benefits: [
            {
                title: 'Complete Rejuvenation',
                description: 'Corrects multiple signs of aging in a single procedure.',
            },
            {
                title: 'Long-lasting Results',
                description: 'Effects that last between 7-10 years or more.',
            },
            {
                title: 'SMAS Technique',
                description: 'We work on deep layers for more natural results.',
            },
            {
                title: 'Natural Appearance',
                description: 'Without the "operated" look, you maintain your natural expression.',
            },
        ],
        process: [
            {
                title: 'Assessment Consultation',
                description: 'Comprehensive facial evaluation, aging analysis, and personalized planning.',
                duration: '60 min',
            },
            {
                title: 'Pre-surgical Preparation',
                description: 'Complete exams, cardiological evaluation, and physical preparation.',
                duration: '2 weeks before',
            },
            {
                title: 'Surgical Procedure',
                description: 'Surgery with SMAS technique under general anesthesia in a certified clinic.',
                duration: '3-4 hours',
            },
            {
                title: 'Hospital Recovery',
                description: 'Post-operative monitoring, pain management, and initial care.',
                duration: '1 night',
            },
            {
                title: 'Home Recovery',
                description: 'Progressive suture removal, swelling control, and follow-up.',
                duration: '14-21 days',
            },
        ],
        faqs: [
            {
                question: 'What is a Brow Lift or Fox-eyes?',
                answer: 'The Brow Lift raises drooping eyebrows to open the gaze. The "Fox-eyes" is a technique that also tilts the eyebrows upward at the outer end, creating an almond-shaped and feline appearance that is very popular today. It is ideal for young patients who desire this specific look.',
            },
            {
                question: 'What is the difference between the types of lifts?',
                answer: 'The Brow Lift/Fox-eyes only works on the eyebrows. The Forehead Lift includes the forehead and frown area. The Facelift treats cheeks, jawline, and creases. The Neck Lift focuses on the neck and double chin. They can be combined according to your needs.',
            },
            {
                question: 'At what age is a facelift recommended?',
                answer: 'It depends on the type. Fox-eyes can be done from 25-30 years for aesthetics. Forehead lift from 35-40. A full facelift is generally done between 45-70 years when there is evident sagging.',
            },
            {
                question: 'How long do the results last?',
                answer: 'Fox-eyes lasts 2-5 years. Forehead lift lasts 5-7 years. Full facelift lasts 7-10 years. Natural aging continues, but you will always look better than if you had not had the surgery.',
            },
            {
                question: 'Does a facelift leave visible scars?',
                answer: 'Incisions are hidden in the hairline, behind the ears, or in natural folds. For Fox-eyes, thread techniques leave no visible scars. Once healed, they are practically imperceptible.',
            },
            {
                question: 'Can I combine different types of lifts?',
                answer: 'Yes, it is very common. For example: Fox-eyes + Blepharoplasty, or Facelift + Neck Lift. It is also combined with rhinoplasty, fillers, or fat transfer for more complete results.',
            },
            {
                question: 'How much recovery time do I need?',
                answer: 'Fox-eyes requires 5-7 days. Forehead lift 7-10 days. A full facelift requires 2-3 weeks of social downtime. Visible swelling gradually disappears.',
            },
        ],
        cta: {
            title: 'Restore the youth of your face',
            description: 'Schedule your assessment consultation and discover how a facelift can rejuvenate you naturally.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function LiftingFacialPage() {
    return <ProcedurePage data={liftingFacialData} />
}

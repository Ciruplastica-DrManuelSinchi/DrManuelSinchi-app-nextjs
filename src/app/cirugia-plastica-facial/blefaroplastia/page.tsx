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
        description: 'Rejuvenece tu mirada eliminando el exceso de piel y bolsas en los párpados. Ofrecemos blefaroplastia superior, inferior y combinada con lifting para resultados naturales.',
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
            'Ofrecemos: <strong class="text-primary">Blefaroplastia Superior</strong> (párpados caídos), <strong class="text-primary">Blefaroplastia Inferior</strong> (bolsas y ojeras), y <strong class="text-primary">Blefaroplastia con Lifting</strong> (combinada con estiramiento facial). Las <strong class="text-primary">incisiones se ocultan en los pliegues naturales</strong>, dejando cicatrices prácticamente invisibles.',
        ],
        image: '/images/procedures/que-es/blefaroplastia-tecnica.jpg',
        highlights: {
            title: 'Tipos de Blefaroplastia',
            icon: Eye,
            items: [
                'Blefaroplastia superior',
                'Blefaroplastia inferior',
                'Blefaroplastia completa (superior + inferior)',
                'Blefaroplastia con lifting de cejas',
                'Blefaroplastia con lifting facial',
                'Cantopexia (ojos almendrados)',
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
            question: '¿Cuál es la diferencia entre blefaroplastia superior e inferior?',
            answer: 'La blefaroplastia superior corrige el exceso de piel en el párpado de arriba (párpado caído). La inferior trata las bolsas y el exceso de piel debajo del ojo. Muchos pacientes se benefician de ambas.',
        },
        {
            question: '¿Puedo combinar blefaroplastia con lifting de cejas?',
            answer: 'Sí, es una combinación muy frecuente y recomendada. Al tratar párpados y cejas juntos se logra un rejuvenecimiento más completo y armonioso de la mirada.',
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

    en: {
        categoryLabel: 'Facial Plastic Surgery',
        hero: {
            badge: 'Eye Rejuvenation',
            title: 'Blepharoplasty',
            description: 'Rejuvenate your gaze by eliminating excess skin and bags on the eyelids. We offer upper, lower, and combined blepharoplasty with lifting for natural results.',
            duration: '1-2 hours',
            recovery: '5-7 days recovery',
            anesthesia: 'Local anesthesia + sedation',
        },
        info: {
            title: 'What is Blepharoplasty?',
            content: [
                'Blepharoplasty is a surgery that corrects excess skin, muscle, and fat on the upper and lower eyelids. It is one of the most effective procedures to rejuvenate the gaze and eliminate the tired appearance.',
                'We offer: <strong class="text-primary">Upper Blepharoplasty</strong> (drooping eyelids), <strong class="text-primary">Lower Blepharoplasty</strong> (bags and dark circles), and <strong class="text-primary">Blepharoplasty with Lifting</strong> (combined with facelift). The <strong class="text-primary">incisions are hidden in the natural folds</strong>, leaving virtually invisible scars.',
            ],
            highlights: {
                title: 'Types of Blepharoplasty',
                items: [
                    'Upper blepharoplasty',
                    'Lower blepharoplasty',
                    'Full blepharoplasty (upper + lower)',
                    'Blepharoplasty with brow lift',
                    'Blepharoplasty with facelift',
                    'Canthoplasty (almond-shaped eyes)',
                ],
            },
        },
        benefits: [
            {
                title: 'Rejuvenated Gaze',
                description: 'Takes years off your face with a fresh and rested look.',
            },
            {
                title: 'Natural Appearance',
                description: 'Subtle results that enhance your beauty without looking operated on.',
            },
            {
                title: 'Safe Procedure',
                description: 'Minimally invasive technique with quick recovery.',
            },
            {
                title: 'High Satisfaction',
                description: 'One of the procedures with the highest satisfaction rate.',
            },
        ],
        process: [
            {
                title: 'Assessment Consultation',
                description: 'Eyelid evaluation, expectation analysis, and procedure planning.',
                duration: '30-45 min',
            },
            {
                title: 'Pre-surgical Preparation',
                description: 'Ophthalmological and medical exams prior to surgery.',
                duration: '1 week before',
            },
            {
                title: 'Surgical Procedure',
                description: 'Outpatient surgery with local anesthesia and sedation for your comfort.',
                duration: '1-2 hours',
            },
            {
                title: 'Initial Recovery',
                description: 'Cold application, rest, and swelling control.',
                duration: '5-7 days',
            },
            {
                title: 'Final Result',
                description: 'Residual swelling fades and the definitive result becomes apparent.',
                duration: '2-3 months',
            },
        ],
        faqs: [
            {
                question: 'At what age is blepharoplasty recommended?',
                answer: 'There is no specific age. The procedure is recommended when there is excess skin or bags that affect aesthetics or vision. This generally occurs from 35-40 years of age, although it may vary depending on genetics.',
            },
            {
                question: 'What is the difference between upper and lower blepharoplasty?',
                answer: 'Upper blepharoplasty corrects the excess skin on the upper eyelid (drooping eyelid). Lower blepharoplasty treats bags and excess skin under the eye. Many patients benefit from both.',
            },
            {
                question: 'Can I combine blepharoplasty with a brow lift?',
                answer: 'Yes, it is a very common and recommended combination. Treating eyelids and brows together achieves a more complete and harmonious rejuvenation of the gaze.',
            },
            {
                question: 'Does blepharoplasty leave visible scars?',
                answer: 'The incisions are made in the natural folds of the upper eyelid and just below the lower lashes. Once healed, they are practically imperceptible.',
            },
            {
                question: 'Can I have only the upper or lower eyelids operated on?',
                answer: 'Yes, the procedure can be performed on upper eyelids only, lower eyelids only, or both depending on your needs. During the consultation we will evaluate which option is most appropriate for you.',
            },
            {
                question: 'How long do the results last?',
                answer: 'The results are long-lasting, generally between 10-15 years or more. Natural aging continues, but you will always look better than if you had not had the surgery.',
            },
            {
                question: 'When can I return to work?',
                answer: 'Most patients resume their work activities between 7-10 days after surgery. Makeup can be used after 10-14 days.',
            },
            {
                question: 'Can blepharoplasty improve my vision?',
                answer: 'Yes, when the excess skin on the upper eyelids is significant, it can obstruct the visual field. Blepharoplasty corrects this, improving both aesthetics and function.',
            },
        ],
        cta: {
            title: 'Restore the youthfulness of your gaze',
            description: 'Schedule your assessment consultation and discover how blepharoplasty can rejuvenate your face.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function BlefaroplastiaPage() {
    return <ProcedurePage data={blefaroplastiaData} />
}

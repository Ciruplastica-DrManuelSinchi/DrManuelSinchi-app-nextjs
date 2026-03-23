"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Timer,
    Star,
    Target,
    Zap
} from 'lucide-react'

// ============================================
// LIPOESCULTURA DATA
// ============================================

const lipoesculturaData: ProcedureData = {
    // Routing & Category
    slug: 'lipo-escultura',
    category: 'corporal',
    categoryLabel: 'Cirugía Corporal',
    categoryPath: '/cirugia-plastica-corporal',

    // Hero Section
    hero: {
        badge: 'Moldea tu Silueta',
        title: 'Lipoescultura',
        description: 'Esculpe tu cuerpo eliminando grasa localizada y definiendo tu silueta. Técnica avanzada que moldea tus contornos de forma armónica y natural.',
        duration: '2-4 horas',
        recovery: '7-14 días recuperación',
        anesthesia: 'Anestesia general o sedación',
        whatsappMessage: 'Hola, me interesa información sobre lipoescultura',
    },

    // Info Section
    info: {
        title: '¿Qué es la Lipoescultura?',
        content: [
            'La lipoescultura es una técnica avanzada de liposucción que no solo elimina grasa localizada, sino que también esculpe y define los contornos corporales. A diferencia de la liposucción tradicional, busca crear una silueta armónica y estética.',
            'Se puede realizar en múltiples zonas como abdomen, cintura, espalda, brazos, muslos y papada. La grasa extraída puede <strong class="text-primary">reinyectarse en otras áreas</strong> como glúteos o senos (lipotransferencia) para un resultado más completo.',
        ],
        image: '/images/procedures/que-es/lipoescultura-tecnica.jpg',
        highlights: {
            title: 'Zonas que se pueden tratar',
            icon: Target,
            items: [
                'Abdomen y cintura',
                'Espalda y "rollitos"',
                'Brazos y axilas',
                'Muslos internos y externos',
                'Papada y cuello',
                'Flancos y caderas',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Target,
            title: 'Esculpido Preciso',
            description: 'Definición de contornos y eliminación selectiva de grasa.',
        },
        {
            icon: Zap,
            title: 'Grasa No Regresa',
            description: 'Las células de grasa eliminadas no se regeneran.',
        },
        {
            icon: Shield,
            title: 'Múltiples Zonas',
            description: 'Trata varias áreas en una sola cirugía.',
        },
        {
            icon: Heart,
            title: 'Resultados Naturales',
            description: 'Silueta armónica respetando tus proporciones.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/lipoescultura-before.jpg',
            after: '/images/before-after/lipoescultura-after.jpg',
            label: 'Caso 1 - Lipoescultura 360',
        },
        {
            before: '/images/before-after/lipoescultura-before.jpg',
            after: '/images/before-after/lipoescultura-after.jpg',
            label: 'Caso 2 - Abdomen y cintura',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Evaluación corporal, análisis de zonas a tratar y planificación personalizada.',
            duration: '45-60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación Pre-quirúrgica',
            description: 'Exámenes de laboratorio y preparación física para la cirugía.',
            duration: '1-2 semanas antes',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Procedimiento Quirúrgico',
            description: 'Lipoescultura con técnica tumescente y cánulas finas para mayor precisión.',
            duration: '2-4 horas',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Recuperación Inmediata',
            description: 'Alta el mismo día o al día siguiente según extensión del procedimiento.',
            duration: '1-2 días',
            icon: Timer,
        },
        {
            step: 5,
            title: 'Uso de Faja y Seguimiento',
            description: 'Faja compresiva, drenajes linfáticos y seguimiento hasta resultado final.',
            duration: '4-6 semanas',
            icon: Star,
        },
    ],

    // Videos
    videos: [
        {
            title: 'Lo que debes saber sobre la lipoescultura - Radio Miraflores',
            youtubeId: 'fUUGe4-wLnc',
        },
        {
            title: 'Lipoescultura vs. Lipoabdominoplastia 🧐',
            youtubeId: 'ZBiNoZkeF2E',
        },
        {
            title: 'Resultado real de lipoescultura',
            youtubeId: '8GrpYNpd9Js',
        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿La lipoescultura es para bajar de peso?',
            answer: 'No, la lipoescultura no es un tratamiento para la obesidad. Está diseñada para eliminar depósitos de grasa localizada que no responden a dieta y ejercicio. Los candidatos ideales están cerca de su peso ideal.',
        },
        {
            question: '¿La grasa vuelve a aparecer?',
            answer: 'Las células de grasa eliminadas no se regeneran. Sin embargo, si ganas peso, las células restantes pueden aumentar de tamaño. Mantener un peso estable asegura resultados duraderos.',
        },
        {
            question: '¿Cuántas zonas se pueden tratar?',
            answer: 'Dependiendo de tu estado de salud y la cantidad de grasa a extraer, se pueden tratar múltiples zonas en una sola cirugía: abdomen, cintura, espalda, brazos, muslos, etc.',
        },
        {
            question: '¿Qué es la lipoescultura 360?',
            answer: 'Es una lipoescultura que trata todo el torso de forma circunferencial: abdomen, cintura, espalda y flancos. Permite definir la cintura y crear una silueta más estilizada desde todos los ángulos.',
        },
        {
            question: '¿Cuánto tiempo debo usar la faja?',
            answer: 'Se recomienda usar faja compresiva las 24 horas durante las primeras 3-4 semanas, luego de forma progresiva hasta completar 6-8 semanas.',
        },
        {
            question: '¿Cuándo veré los resultados finales?',
            answer: 'Los resultados iniciales son visibles inmediatamente, pero la inflamación tarda en desaparecer. El resultado final se aprecia entre 3-6 meses después de la cirugía.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '2500+', label: 'Lipoesculturas realizadas' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Esculpe el cuerpo que siempre deseaste',
        description: 'Agenda tu consulta de valoración y descubre cómo la lipoescultura puede transformar tu silueta.',
    },

    en: {
        categoryLabel: 'Body Plastic Surgery',
        hero: {
            badge: 'Shape Your Silhouette',
            title: 'Liposculpture',
            description: 'Sculpt your body by eliminating localized fat and defining your silhouette. Advanced technique that shapes your contours in a harmonious and natural way.',
            duration: '2-4 hours',
            recovery: '7-14 days recovery',
            anesthesia: 'General anesthesia or sedation',
        },
        info: {
            title: 'What is Liposculpture?',
            content: [
                'Liposculpture is an advanced liposuction technique that not only removes localized fat, but also sculpts and defines body contours. Unlike traditional liposuction, it aims to create a harmonious and aesthetic silhouette.',
                'It can be performed on multiple areas such as abdomen, waist, back, arms, thighs, and double chin. The extracted fat can be <strong class="text-primary">reinjected into other areas</strong> such as the buttocks or breasts (fat transfer) for a more complete result.',
            ],
            highlights: {
                title: 'Treatable Areas',
                items: [
                    'Abdomen and waist',
                    'Back and "love handles"',
                    'Arms and armpits',
                    'Inner and outer thighs',
                    'Double chin and neck',
                    'Flanks and hips',
                ],
            },
        },
        benefits: [
            {
                title: 'Precise Sculpting',
                description: 'Contour definition and selective fat elimination.',
            },
            {
                title: 'Fat Does Not Return',
                description: 'Eliminated fat cells do not regenerate.',
            },
            {
                title: 'Multiple Areas',
                description: 'Treats several areas in a single surgery.',
            },
            {
                title: 'Natural Results',
                description: 'Harmonious silhouette respecting your proportions.',
            },
        ],
        process: [
            {
                title: 'Assessment Consultation',
                description: 'Body evaluation, analysis of areas to treat, and personalized planning.',
                duration: '45-60 min',
            },
            {
                title: 'Pre-surgical Preparation',
                description: 'Lab tests and physical preparation for surgery.',
                duration: '1-2 weeks prior',
            },
            {
                title: 'Surgical Procedure',
                description: 'Liposculpture with tumescent technique and fine cannulas for greater precision.',
                duration: '2-4 hours',
            },
            {
                title: 'Immediate Recovery',
                description: 'Discharge same day or the following day depending on the extent of the procedure.',
                duration: '1-2 days',
            },
            {
                title: 'Compression Garment and Follow-up',
                description: 'Compression garment, lymphatic drainage massages, and follow-up until final result.',
                duration: '4-6 weeks',
            },
        ],
        faqs: [
            {
                question: 'Is liposculpture for losing weight?',
                answer: 'No, liposculpture is not a treatment for obesity. It is designed to eliminate localized fat deposits that do not respond to diet and exercise. Ideal candidates are close to their ideal weight.',
            },
            {
                question: 'Does the fat come back?',
                answer: 'The eliminated fat cells do not regenerate. However, if you gain weight, the remaining cells can increase in size. Maintaining a stable weight ensures long-lasting results.',
            },
            {
                question: 'How many areas can be treated?',
                answer: 'Depending on your health status and the amount of fat to be removed, multiple areas can be treated in a single surgery: abdomen, waist, back, arms, thighs, etc.',
            },
            {
                question: 'What is 360 liposculpture?',
                answer: 'It is a liposculpture that treats the entire torso circumferentially: abdomen, waist, back, and flanks. It allows defining the waist and creating a more streamlined silhouette from all angles.',
            },
            {
                question: 'How long do I need to wear the compression garment?',
                answer: 'It is recommended to wear a compression garment 24 hours a day during the first 3-4 weeks, then progressively until completing 6-8 weeks.',
            },
            {
                question: 'When will I see the final results?',
                answer: 'Initial results are visible immediately, but inflammation takes time to subside. The final result is appreciated between 3-6 months after surgery.',
            },
        ],
        cta: {
            title: 'Sculpt the body you have always desired',
            description: 'Schedule your assessment consultation and discover how liposculpture can transform your silhouette.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function LipoesculturaPage() {
    return <ProcedurePage data={lipoesculturaData} />
}

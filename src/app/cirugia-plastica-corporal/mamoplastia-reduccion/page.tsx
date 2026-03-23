"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Timer,
    Star,
    ArrowDown,
    Activity
} from 'lucide-react'

// ============================================
// MAMOPLASTIA DE REDUCCIÓN DATA
// ============================================

const mamoplastiaReduccionData: ProcedureData = {
    // Routing & Category
    slug: 'mamoplastia-reduccion',
    category: 'corporal',
    categoryLabel: 'Cirugía Corporal',
    categoryPath: '/cirugia-plastica-corporal',

    // Hero Section
    hero: {
        badge: 'Reducción de Senos',
        title: 'Mamoplastia de Reducción',
        description: 'Reduce el tamaño de tus senos aliviando molestias físicas y mejorando tu proporción corporal. Recupera comodidad y bienestar en tu día a día.',
        duration: '2-3 horas',
        recovery: '14-21 días recuperación',
        anesthesia: 'Anestesia general',
        whatsappMessage: 'Hola, me interesa información sobre mamoplastia de reducción',
    },

    // Info Section
    info: {
        title: '¿Qué es la Mamoplastia de Reducción?',
        content: [
            'La mamoplastia de reducción es una cirugía que disminuye el tamaño de los senos removiendo tejido mamario, grasa y piel. Además de mejorar la estética, alivia síntomas físicos asociados a senos muy grandes.',
            'Es un procedimiento que combina la reducción del volumen con el <strong class="text-primary">levantamiento y remodelación</strong> de los senos, logrando una forma más armónica y proporcionada con el resto del cuerpo.',
        ],
        image: '/images/procedures/que-es/mamoplastia-reduccion-tecnica.jpg',
        highlights: {
            title: 'Beneficios de la Reducción',
            icon: ArrowDown,
            items: [
                'Alivio de dolor de espalda y cuello',
                'Elimina marcas de los tirantes',
                'Mayor comodidad al hacer ejercicio',
                'Mejora la postura',
                'Facilita encontrar ropa adecuada',
                'Senos más firmes y proporcionados',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Activity,
            title: 'Alivio Físico',
            description: 'Elimina dolor de espalda, cuello y hombros.',
        },
        {
            icon: ArrowDown,
            title: 'Proporción Ideal',
            description: 'Senos acordes a tu estructura corporal.',
        },
        {
            icon: Shield,
            title: 'Resultados Duraderos',
            description: 'Cambio permanente en tamaño y forma.',
        },
        {
            icon: Heart,
            title: 'Mayor Comodidad',
            description: 'Libertad para hacer ejercicio y vestirte.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/mamoplastia-reduccion-before.jpg',
            after: '/images/before-after/mamoplastia-reduccion-after.jpg',
            label: 'Caso 1 - Reducción moderada',
        },
        {
            before: '/images/before-after/mamoplastia-reduccion-before.jpg',
            after: '/images/before-after/mamoplastia-reduccion-after.jpg',
            label: 'Caso 2 - Reducción significativa',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Evaluación mamaria, discusión del tamaño deseado y planificación.',
            duration: '45-60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación Pre-quirúrgica',
            description: 'Exámenes, mamografía y preparación física para la cirugía.',
            duration: '2 semanas antes',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Procedimiento Quirúrgico',
            description: 'Reducción y remodelación bajo anestesia general.',
            duration: '2-3 horas',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Recuperación Hospitalaria',
            description: 'Monitoreo post-operatorio y cuidados iniciales.',
            duration: '1 noche',
            icon: Timer,
        },
        {
            step: 5,
            title: 'Recuperación en Casa',
            description: 'Uso de sujetador especial, cuidados de herida y seguimiento.',
            duration: '3-6 semanas',
            icon: Star,
        },
    ],

    // Videos
    videos: [
        {
            title: '🎥 ¿Cómo elegir el IMPLANTE MAMARIO ideal?',
            youtubeId: '7PJPZJw9AL8'
        },
        {
            title: 'Implantes mamarios: Cirugía de aumento de mamas',
            youtubeId: 'kgu9YpK7uzs'
        },
        {
            title: 'Caso real de mamoplastia',
            youtubeId: '6pN61A1gLHI'
        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿Cuánto se puede reducir el tamaño?',
            answer: 'La cantidad de reducción depende de tu anatomía y objetivos. En la consulta discutiremos el tamaño ideal considerando tus proporciones corporales y expectativas.',
        },
        {
            question: '¿Las cicatrices son muy notorias?',
            answer: 'Las cicatrices son inevitables pero se ubican estratégicamente: alrededor de la areola, verticalmente hacia el surco y a veces en el surco. Con el tiempo y cuidados adecuados se vuelven menos visibles.',
        },
        {
            question: '¿Podré amamantar después?',
            answer: 'En muchos casos sí es posible amamantar, aunque puede haber una reducción en la producción de leche. Utilizamos técnicas que preservan los conductos cuando es posible.',
        },
        {
            question: '¿El seguro cubre esta cirugía?',
            answer: 'En algunos casos, cuando hay síntomas físicos documentados (dolor de espalda, lesiones en hombros, etc.), el seguro puede cubrir parte del procedimiento. Te ayudamos con la documentación necesaria.',
        },
        {
            question: '¿Cuánto peso se remueve?',
            answer: 'Varía según cada caso. En reducciones moderadas se remueven 300-500g por seno. En casos de hipertrofia severa puede ser 1kg o más por lado.',
        },
        {
            question: '¿Los senos pueden volver a crecer?',
            answer: 'El tejido removido no crece nuevamente. Sin embargo, cambios de peso significativos o embarazos pueden afectar el tamaño. Por eso recomendamos peso estable antes de la cirugía.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '800+', label: 'Reducciones realizadas' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Recupera tu comodidad y bienestar',
        description: 'Agenda tu consulta de valoración y descubre cómo la reducción mamaria puede mejorar tu calidad de vida.',
    },

    en: {
        categoryLabel: 'Body Plastic Surgery',
        hero: {
            badge: 'Breast Reduction',
            title: 'Breast Reduction',
            description: 'Reduce the size of your breasts, relieving physical discomfort and improving your body proportion. Regain comfort and wellbeing in your daily life.',
            duration: '2-3 hours',
            recovery: '14-21 days recovery',
            anesthesia: 'General anesthesia',
        },
        info: {
            title: 'What is Breast Reduction?',
            content: [
                'Breast reduction is a surgery that decreases the size of the breasts by removing breast tissue, fat, and skin. In addition to improving aesthetics, it relieves physical symptoms associated with very large breasts.',
                'It is a procedure that combines volume reduction with <strong class="text-primary">lifting and reshaping</strong> of the breasts, achieving a more harmonious shape proportionate to the rest of the body.',
            ],
            highlights: {
                title: 'Benefits of Reduction',
                items: [
                    'Relief from back and neck pain',
                    'Eliminates bra strap marks',
                    'Greater comfort when exercising',
                    'Improves posture',
                    'Makes finding suitable clothing easier',
                    'Firmer and more proportionate breasts',
                ],
            },
        },
        benefits: [
            {
                title: 'Physical Relief',
                description: 'Eliminates back, neck, and shoulder pain.',
            },
            {
                title: 'Ideal Proportion',
                description: 'Breasts in accordance with your body structure.',
            },
            {
                title: 'Long-Lasting Results',
                description: 'Permanent change in size and shape.',
            },
            {
                title: 'Greater Comfort',
                description: 'Freedom to exercise and get dressed.',
            },
        ],
        process: [
            {
                title: 'Assessment Consultation',
                description: 'Breast evaluation, discussion of desired size, and planning.',
                duration: '45-60 min',
            },
            {
                title: 'Pre-surgical Preparation',
                description: 'Lab tests, mammogram, and physical preparation for surgery.',
                duration: '2 weeks prior',
            },
            {
                title: 'Surgical Procedure',
                description: 'Reduction and reshaping under general anesthesia.',
                duration: '2-3 hours',
            },
            {
                title: 'Hospital Recovery',
                description: 'Post-operative monitoring and initial care.',
                duration: '1 night',
            },
            {
                title: 'Home Recovery',
                description: 'Use of special bra, wound care, and follow-up.',
                duration: '3-6 weeks',
            },
        ],
        faqs: [
            {
                question: 'How much can the size be reduced?',
                answer: 'The amount of reduction depends on your anatomy and goals. During the consultation we will discuss the ideal size considering your body proportions and expectations.',
            },
            {
                question: 'Are the scars very noticeable?',
                answer: 'Scars are unavoidable but are strategically placed: around the areola, vertically toward the fold, and sometimes in the fold itself. With time and proper care they become less visible.',
            },
            {
                question: 'Will I be able to breastfeed afterward?',
                answer: 'In many cases breastfeeding is possible, although there may be a reduction in milk production. We use techniques that preserve the ducts when possible.',
            },
            {
                question: 'Does insurance cover this surgery?',
                answer: 'In some cases, when physical symptoms are documented (back pain, shoulder injuries, etc.), insurance may cover part of the procedure. We help with the necessary documentation.',
            },
            {
                question: 'How much weight is removed?',
                answer: 'It varies by case. In moderate reductions, 300-500g per breast are removed. In cases of severe hypertrophy, it can be 1kg or more per side.',
            },
            {
                question: 'Can the breasts grow back?',
                answer: 'The removed tissue does not grow back. However, significant weight changes or pregnancies may affect size. That is why we recommend stable weight before surgery.',
            },
        ],
        cta: {
            title: 'Regain your comfort and wellbeing',
            description: 'Schedule your assessment consultation and discover how breast reduction can improve your quality of life.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function MamoplastiaReduccionPage() {
    return <ProcedurePage data={mamoplastiaReduccionData} />
}

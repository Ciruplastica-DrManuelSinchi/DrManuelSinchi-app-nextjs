"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Shield,
    Heart,
    Calendar,
    Star,
    Search,
    Scissors,
    HeartPulse
} from 'lucide-react'

// ============================================
// TUMORES Y CARCINOMAS DATA
// ============================================

const tumoresCarcinomasData: ProcedureData = {
    slug: 'tumores-carcinomas',
    category: 'reconstructiva',
    categoryLabel: 'Cirugía Reconstructiva',
    categoryPath: '/cirugia-reconstructiva',

    hero: {
        badge: 'Cirugía Oncológica',
        title: 'Reconstrucción y Extracción de Tumores',
        description: 'Extracción de tumores benignos y carcinomas no-melanoma de piel con técnicas reconstructivas que minimizan las secuelas estéticas. Atención integral con enfoque oncológico y estético.',
        duration: '30 min - 3 horas',
        recovery: '1-4 semanas',
        anesthesia: 'Local / General',
        whatsappMessage: 'Hola, me interesa información sobre extracción de tumores de piel',
    },

    info: {
        title: '¿Qué tumores de piel tratamos?',
        content: [
            'Tratamos tumores cutáneos benignos (quistes, lipomas, nevos) y carcinomas no-melanoma como el carcinoma basocelular y espinocelular. La cirugía busca la extracción completa del tumor con márgenes oncológicos adecuados.',
            'Como cirujanos plásticos, aportamos valor en la <strong class="text-primary">reconstrucción del defecto</strong> resultante, utilizando técnicas como colgajos locales, injertos de piel y otras para lograr el mejor resultado estético posible.',
        ],
        image: '/images/procedures/que-es/tumores-y-carcinomas-tecnica.jpg',
        highlights: {
            title: 'Lesiones que Tratamos',
            icon: Search,
            items: [
                'Carcinoma basocelular',
                'Carcinoma espinocelular',
                'Tumores benignos (lipomas, quistes)',
                'Nevos atípicos',
                'Queratoacantomas',
                'Reconstrucción post-Mohs',
            ],
        },
    },

    benefits: [
        {
            icon: Shield,
            title: 'Márgenes Oncológicos',
            description: 'Extracción completa con márgenes de seguridad adecuados.',
        },
        {
            icon: Scissors,
            title: 'Reconstrucción Estética',
            description: 'Técnicas que minimizan las cicatrices visibles.',
        },
        {
            icon: HeartPulse,
            title: 'Estudio Patológico',
            description: 'Todas las muestras se envían a análisis histopatológico.',
        },
        {
            icon: Heart,
            title: 'Seguimiento Integral',
            description: 'Control oncológico y estético a largo plazo.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/tumor-before.jpg',
            after: '/images/before-after/tumor-after.jpg',
            label: 'Caso 1 - Carcinoma basocelular nasal',
        },
        {
            before: '/images/before-after/tumor-before-2.jpg',
            after: '/images/before-after/tumor-after-2.jpg',
            label: 'Caso 2 - Reconstrucción facial',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Evaluación',
            description: 'Examen de la lesión, dermatoscopía y planificación quirúrgica.',
            duration: '30-45 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Cirugía',
            description: 'Extracción con márgenes y reconstrucción inmediata.',
            duration: '30 min - 3 hrs',
            icon: Scissors,
        },
        {
            step: 3,
            title: 'Patología',
            description: 'Análisis del tejido para confirmar extracción completa.',
            duration: '7-10 días',
            icon: Search,
        },
        {
            step: 4,
            title: 'Seguimiento',
            description: 'Controles para vigilar recurrencia y resultado estético.',
            duration: 'Continuo',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Cómo sé si una lesión es maligna?',
            answer: 'Las señales de alarma incluyen: crecimiento reciente, sangrado, cambios de color, bordes irregulares, ulceración. Ante cualquier duda, es mejor evaluarla.',
        },
        {
            question: '¿La cirugía es ambulatoria?',
            answer: 'La mayoría de casos son ambulatorios con anestesia local. Tumores grandes o en ubicaciones complejas pueden requerir quirófano y sedación.',
        },
        {
            question: '¿Quedará cicatriz?',
            answer: 'Siempre hay alguna cicatriz, pero utilizamos técnicas de cirugía plástica para hacerla lo menos visible posible.',
        },
        {
            question: '¿Qué es la cirugía de Mohs?',
            answer: 'Es una técnica de extracción por capas con análisis inmediato de márgenes. Cuando se realiza por un dermatólogo, nosotros hacemos la reconstrucción.',
        },
        {
            question: '¿El carcinoma puede reaparecer?',
            answer: 'Si se extirpa completamente, la recurrencia local es rara. Pero pueden aparecer nuevos tumores en otras áreas, por lo que el seguimiento es importante.',
        },
        {
            question: '¿Trabajan con oncólogos?',
            answer: 'Sí, coordinamos con dermatólogos y oncólogos cuando es necesario para un manejo integral del paciente.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '500+', label: 'Tumores extirpados' },
            { value: '99%', label: 'Márgenes libres' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'No ignores esa lesión sospechosa',
        description: 'Agenda tu evaluación para determinar el mejor tratamiento.',
    },

    en: {
        categoryLabel: 'Reconstructive Surgery',
        hero: {
            badge: 'Oncological Surgery',
            title: 'Tumor & Carcinoma Removal',
            description: 'Removal of benign tumors and non-melanoma skin carcinomas using reconstructive techniques that minimize aesthetic sequelae. Comprehensive care with an oncological and aesthetic focus.',
            duration: '30 min - 3 hours',
            recovery: '1-4 weeks',
            anesthesia: 'Local / General anesthesia',
        },
        info: {
            title: 'What Skin Tumors Do We Treat?',
            content: [
                'We treat benign cutaneous tumors (cysts, lipomas, nevi) and non-melanoma carcinomas such as basal cell carcinoma and squamous cell carcinoma. Surgery aims for complete tumor removal with adequate oncological margins.',
                'As plastic surgeons, we add value in the <strong class="text-primary">reconstruction of the resulting defect</strong>, using techniques such as local flaps, skin grafts, and others to achieve the best possible aesthetic outcome.',
            ],
            highlights: {
                title: 'Lesions We Treat',
                items: [
                    'Basal cell carcinoma',
                    'Squamous cell carcinoma',
                    'Benign tumors (lipomas, cysts)',
                    'Atypical nevi',
                    'Keratoacanthomas',
                    'Post-Mohs reconstruction',
                ],
            },
        },
        benefits: [
            {
                title: 'Oncological Margins',
                description: 'Complete excision with adequate safety margins.',
            },
            {
                title: 'Aesthetic Reconstruction',
                description: 'Techniques that minimize visible scarring.',
            },
            {
                title: 'Pathological Analysis',
                description: 'All specimens are sent for histopathological examination.',
            },
            {
                title: 'Comprehensive Follow-Up',
                description: 'Long-term oncological and aesthetic monitoring.',
            },
        ],
        process: [
            {
                title: 'Evaluation',
                description: 'Lesion examination, dermoscopy, and surgical planning.',
                duration: '30-45 min',
            },
            {
                title: 'Surgery',
                description: 'Excision with margins and immediate reconstruction.',
                duration: '30 min - 3 hrs',
            },
            {
                title: 'Pathology',
                description: 'Tissue analysis to confirm complete excision.',
                duration: '7-10 days',
            },
            {
                title: 'Follow-Up',
                description: 'Check-ups to monitor for recurrence and aesthetic outcome.',
                duration: 'Ongoing',
            },
        ],
        faqs: [
            {
                question: 'How do I know if a lesion is malignant?',
                answer: 'Warning signs include: recent growth, bleeding, color changes, irregular borders, and ulceration. When in doubt, it is always best to have it evaluated.',
            },
            {
                question: 'Is the surgery outpatient?',
                answer: 'Most cases are outpatient procedures performed under local anesthesia. Large tumors or those in complex locations may require an operating room and sedation.',
            },
            {
                question: 'Will there be a scar?',
                answer: 'There will always be some scarring, but we use plastic surgery techniques to make it as inconspicuous as possible.',
            },
            {
                question: 'What is Mohs surgery?',
                answer: 'It is a layer-by-layer excision technique with immediate margin analysis. When performed by a dermatologist, we handle the reconstruction.',
            },
            {
                question: 'Can carcinoma come back?',
                answer: 'If completely excised, local recurrence is rare. However, new tumors may appear in other areas, which is why ongoing follow-up is important.',
            },
            {
                question: 'Do you work with oncologists?',
                answer: 'Yes, we coordinate with dermatologists and oncologists when necessary for comprehensive patient management.',
            },
        ],
        cta: {
            title: 'Don\'t ignore that suspicious lesion',
            description: 'Schedule your evaluation to determine the best course of treatment.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function TumoresCarcinomasPage() {
    return <ProcedurePage data={tumoresCarcinomasData} />
}

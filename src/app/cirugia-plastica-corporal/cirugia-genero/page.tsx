"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    Users,
    HeartHandshake
} from 'lucide-react'

// ============================================
// CIRUGÍA DE REAFIRMACIÓN DE GÉNERO DATA
// ============================================

const cirugiaGeneroData: ProcedureData = {
    slug: 'cirugia-genero',
    category: 'corporal',
    categoryLabel: 'Cirugía Plástica Corporal',
    categoryPath: '/cirugia-plastica-corporal',

    hero: {
        badge: 'Cirugía de Reafirmación',
        title: 'Cirugía de Reafirmación de Género',
        description: 'Procedimientos de cirugía torácica para personas transgénero y no binarias. Ofrecemos mastectomía/masculinización de tórax (Top Surgery) y mamoplastia de aumento con un enfoque respetuoso y profesional.',
        duration: '2-4 horas',
        recovery: '2-6 semanas',
        anesthesia: 'General',
        whatsappMessage: 'Hola, me interesa información sobre cirugía de reafirmación de género',
    },

    info: {
        title: '¿Qué es la Cirugía de Reafirmación de Género?',
        content: [
            'La cirugía de reafirmación de género incluye procedimientos diseñados para alinear las características físicas con la identidad de género de la persona. Ofrecemos un ambiente seguro, respetuoso y libre de juicios.',
            'Realizamos: <strong class="text-primary">Mastectomía / Masculinización de tórax (Top Surgery)</strong> para hombres trans y personas no binarias, y <strong class="text-primary">Mamoplastia de aumento</strong> para mujeres trans que desean desarrollar un busto femenino.',
        ],
        image: '/images/procedures/que-es/cirugia-genero-tecnica.jpg',
        highlights: {
            title: 'Procedimientos Disponibles',
            icon: Users,
            items: [
                'Mastectomía (Top Surgery)',
                'Masculinización de tórax',
                'Mamoplastia de aumento',
                'Liposucción pectoral',
                'Corrección de ginecomastia',
                'Reconstrucción de pezón',
            ],
        },
    },

    benefits: [
        {
            icon: HeartHandshake,
            title: 'Ambiente Respetuoso',
            description: 'Atención libre de prejuicios con profesionales sensibilizados.',
        },
        {
            icon: Users,
            title: 'Experiencia Trans',
            description: 'Conocimiento específico de las necesidades de pacientes trans.',
        },
        {
            icon: Heart,
            title: 'Bienestar Integral',
            description: 'Contribuye a la salud mental y bienestar general.',
        },
        {
            icon: Sparkles,
            title: 'Resultados Naturales',
            description: 'Técnicas que logran un aspecto natural acorde a tu género.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/topsurgery-before.jpg',
            after: '/images/before-after/topsurgery-after.jpg',
            label: 'Caso 1 - Top Surgery',
        },
        {
            before: '/images/before-after/mamoplastia-trans-before.jpg',
            after: '/images/before-after/mamoplastia-trans-after.jpg',
            label: 'Caso 2 - Mamoplastia de aumento',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Consulta Inicial',
            description: 'Conversación sobre tus objetivos, historia y expectativas.',
            duration: '60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Evaluación Médica',
            description: 'Exámenes preoperatorios y coordinación si hay terapia hormonal.',
            duration: 'Variable',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Cirugía',
            description: 'Procedimiento con técnicas especializadas según el caso.',
            duration: '2-4 horas',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Recuperación',
            description: 'Seguimiento cercano con atención a tus necesidades específicas.',
            duration: '2-6 semanas',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Necesito una carta de un profesional de salud mental?',
            answer: 'Según los estándares de WPATH, para algunas cirugías se recomienda evaluación previa. Lo conversamos en la consulta según tu situación particular.',
        },
        {
            question: '¿Debo estar en terapia hormonal para la cirugía?',
            answer: 'No es estrictamente necesario para Top Surgery. Para mamoplastia de aumento en mujeres trans, la terapia hormonal previa puede mejorar los resultados.',
        },
        {
            question: '¿Cómo es el Top Surgery (mastectomía)?',
            answer: 'Consiste en remover el tejido mamario y reposicionar los pezones para crear un tórax masculino. La técnica exacta depende del tamaño inicial del pecho.',
        },
        {
            question: '¿Quedan cicatrices visibles en Top Surgery?',
            answer: 'La ubicación y tamaño de las cicatrices depende de la técnica usada. Usamos las técnicas que minimicen las cicatrices según tu anatomía.',
        },
        {
            question: '¿Los implantes para mujeres trans son diferentes?',
            answer: 'Usamos los mismos implantes de alta calidad. La diferencia está en la técnica quirúrgica que considera las características específicas del tórax.',
        },
        {
            question: '¿Ofrecen otros procedimientos de reafirmación?',
            answer: 'Actualmente ofrecemos cirugías torácicas. Para otros procedimientos podemos referirte a colegas especializados.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '100+', label: 'Cirugías de reafirmación' },
            { value: '99%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'Da el siguiente paso en tu transición',
        description: 'Agenda una consulta confidencial para hablar sobre tus objetivos.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function CirugiaGeneroPage() {
    return <ProcedurePage data={cirugiaGeneroData} />
}

"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    Gem,
    CircleDot
} from 'lucide-react'

// ============================================
// AUMENTO DE PÓMULOS DATA
// ============================================

const aumentoPomulosData: ProcedureData = {
    slug: 'aumento-pomulos',
    category: 'facial',
    categoryLabel: 'Cirugía Plástica Facial',
    categoryPath: '/cirugia-plastica-facial',

    hero: {
        badge: 'Contorno Facial',
        title: 'Aumento de Pómulos',
        description: 'Realza tus pómulos para lograr un rostro más definido y armonioso. Ofrecemos técnicas con grasa autóloga o implantes de silicona para resultados naturales y duraderos.',
        duration: '45-90 min',
        recovery: '7-14 días',
        anesthesia: 'Local con sedación',
        whatsappMessage: 'Hola, me interesa información sobre aumento de pómulos',
    },

    info: {
        title: '¿Qué es el Aumento de Pómulos?',
        content: [
            'El aumento de pómulos es un procedimiento que añade volumen a la región malar para crear un rostro más definido, juvenil y armonioso. Unos pómulos bien proyectados son un signo de juventud y belleza en todas las culturas.',
            'Ofrecemos dos técnicas principales: <strong class="text-primary">Lipotransferencia (grasa autóloga)</strong> que utiliza tu propia grasa para un resultado natural, e <strong class="text-primary">Implantes de silicona</strong> para una proyección más definida y permanente.',
        ],
        image: '/images/procedures/que-es/aumento-de-pomulos-tecnica.jpg',
        highlights: {
            title: 'Técnicas Disponibles',
            icon: Gem,
            items: [
                'Aumento con grasa autóloga',
                'Implantes de silicona malar',
                'Combinación de técnicas',
                'Corrección de asimetrías',
                'Rejuvenecimiento del tercio medio',
                'Definición del contorno facial',
            ],
        },
    },

    benefits: [
        {
            icon: Gem,
            title: 'Rostro Definido',
            description: 'Pómulos prominentes que realzan tu estructura facial.',
        },
        {
            icon: Heart,
            title: 'Aspecto Juvenil',
            description: 'Restaura el volumen perdido por el envejecimiento.',
        },
        {
            icon: CircleDot,
            title: 'Resultados Permanentes',
            description: 'Tanto la grasa estabilizada como los implantes son duraderos.',
        },
        {
            icon: Sparkles,
            title: 'Armonía Facial',
            description: 'Mejora el balance y las proporciones del rostro.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/pomulos-before.jpg',
            after: '/images/before-after/pomulos-after.jpg',
            label: 'Caso 1 - Aumento con grasa',
        },
        {
            before: '/images/before-after/pomulos-before-2.jpg',
            after: '/images/before-after/pomulos-after-2.jpg',
            label: 'Caso 2 - Implantes malares',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Evaluación Facial',
            description: 'Análisis de tu estructura ósea y definición del volumen necesario.',
            duration: '30-45 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Planificación',
            description: 'Selección de técnica (grasa o implantes) y diseño del resultado.',
            duration: 'En consulta',
            icon: Sparkles,
        },
        {
            step: 3,
            title: 'Procedimiento',
            description: 'Cirugía ambulatoria con anestesia local y sedación.',
            duration: '45-90 min',
            icon: Shield,
        },
        {
            step: 4,
            title: 'Recuperación',
            description: 'Inflamación que se resuelve en 1-2 semanas. Resultados definitivos en 2-3 meses.',
            duration: '7-14 días',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Qué es mejor: grasa o implantes?',
            answer: 'Depende de cada caso. La grasa da resultados más suaves y naturales, mientras que los implantes ofrecen mayor proyección y definición. Lo evaluamos en consulta.',
        },
        {
            question: '¿Los implantes de pómulos se notan?',
            answer: 'No, cuando están bien colocados se sienten y ven completamente naturales. Se colocan sobre el hueso, debajo de los tejidos blandos.',
        },
        {
            question: '¿Cuánto dura la grasa en los pómulos?',
            answer: 'Aproximadamente 60-70% de la grasa injertada se mantiene permanentemente. Por eso a veces se inyecta un poco más de lo necesario.',
        },
        {
            question: '¿Quedan cicatrices visibles?',
            answer: 'No, las incisiones se realizan dentro de la boca (para implantes) o son punciones mínimas (para grasa), sin cicatrices visibles.',
        },
        {
            question: '¿Puedo combinar con otros procedimientos?',
            answer: 'Sí, frecuentemente se combina con rinoplastia, mentoplastia, lifting o blefaroplastia para un rejuvenecimiento integral.',
        },
        {
            question: '¿Cuándo podré ver el resultado final?',
            answer: 'El resultado inicial se ve al bajar la inflamación (2-3 semanas). El resultado definitivo se aprecia a los 2-3 meses con grasa, o 1-2 meses con implantes.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '800+', label: 'Procedimientos malares' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'Define tu rostro con pómulos armoniosos',
        description: 'Agenda tu consulta para evaluar la mejor técnica de aumento de pómulos para ti.',
    },

    en: {
        categoryLabel: 'Facial Plastic Surgery',
        hero: {
            badge: 'Facial Contouring',
            title: 'Cheek Augmentation',
            description: 'Enhance your cheekbones to achieve a more defined and harmonious face. We offer techniques with autologous fat or silicone implants for natural and long-lasting results.',
            duration: '45-90 min',
            recovery: '7-14 days',
            anesthesia: 'Local with sedation',
        },
        info: {
            title: 'What is Cheek Augmentation?',
            content: [
                'Cheek augmentation is a procedure that adds volume to the malar region to create a more defined, youthful, and harmonious face. Well-projected cheekbones are a sign of youth and beauty in all cultures.',
                'We offer two main techniques: <strong class="text-primary">Fat transfer (autologous fat)</strong> which uses your own fat for a natural result, and <strong class="text-primary">Silicone implants</strong> for a more defined and permanent projection.',
            ],
            highlights: {
                title: 'Available Techniques',
                items: [
                    'Augmentation with autologous fat',
                    'Malar silicone implants',
                    'Combination of techniques',
                    'Asymmetry correction',
                    'Mid-face rejuvenation',
                    'Facial contour definition',
                ],
            },
        },
        benefits: [
            {
                title: 'Defined Face',
                description: 'Prominent cheekbones that enhance your facial structure.',
            },
            {
                title: 'Youthful Appearance',
                description: 'Restores volume lost through aging.',
            },
            {
                title: 'Permanent Results',
                description: 'Both stabilized fat and implants are long-lasting.',
            },
            {
                title: 'Facial Harmony',
                description: 'Improves the balance and proportions of the face.',
            },
        ],
        process: [
            {
                title: 'Facial Evaluation',
                description: 'Analysis of your bone structure and definition of the volume needed.',
                duration: '30-45 min',
            },
            {
                title: 'Planning',
                description: 'Selection of technique (fat or implants) and design of the result.',
                duration: 'At consultation',
            },
            {
                title: 'Procedure',
                description: 'Outpatient surgery with local anesthesia and sedation.',
                duration: '45-90 min',
            },
            {
                title: 'Recovery',
                description: 'Swelling that resolves in 1-2 weeks. Definitive results in 2-3 months.',
                duration: '7-14 days',
            },
        ],
        faqs: [
            {
                question: 'What is better: fat or implants?',
                answer: 'It depends on each case. Fat gives softer, more natural results, while implants offer greater projection and definition. We evaluate this during the consultation.',
            },
            {
                question: 'Are cheek implants noticeable?',
                answer: 'No, when properly placed they look and feel completely natural. They are placed on the bone, beneath the soft tissues.',
            },
            {
                question: 'How long does fat last in the cheeks?',
                answer: 'Approximately 60-70% of the grafted fat is maintained permanently. That is why sometimes a little more than needed is injected.',
            },
            {
                question: 'Are there visible scars?',
                answer: 'No, incisions are made inside the mouth (for implants) or are minimal punctures (for fat), with no visible scars.',
            },
            {
                question: 'Can I combine this with other procedures?',
                answer: 'Yes, it is frequently combined with rhinoplasty, mentoplasty, facelift, or blepharoplasty for comprehensive rejuvenation.',
            },
            {
                question: 'When will I see the final result?',
                answer: 'The initial result is visible once swelling subsides (2-3 weeks). The definitive result is seen at 2-3 months with fat, or 1-2 months with implants.',
            },
        ],
        cta: {
            title: 'Define your face with harmonious cheekbones',
            description: 'Schedule your consultation to evaluate the best cheek augmentation technique for you.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function AumentoPomulosPage() {
    return <ProcedurePage data={aumentoPomulosData} />
}

"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Timer,
    Star,
    CircleDot,
    Award
} from 'lucide-react'

// ============================================
// MAMOPLASTIA DE AUMENTO DATA
// ============================================

const mamoplastiaAumentoData: ProcedureData = {
    // Routing & Category
    slug: 'mamoplastia-aumento',
    category: 'corporal',
    categoryLabel: 'Cirugía Corporal',
    categoryPath: '/cirugia-plastica-corporal',

    // Hero Section
    hero: {
        badge: 'Aumento de Senos',
        title: 'Mamoplastia de Aumento',
        description: 'Aumenta el volumen y mejora la forma de tus senos con implantes de alta calidad. Resultados naturales que realzan tu feminidad y confianza.',
        duration: '1-2 horas',
        recovery: '7-14 días recuperación',
        anesthesia: 'Anestesia general',
        whatsappMessage: 'Hola, me interesa información sobre mamoplastia de aumento',
    },

    // Info Section
    info: {
        title: '¿Qué es la Mamoplastia de Aumento?',
        content: [
            'La mamoplastia de aumento es una cirugía que incrementa el tamaño y mejora la forma de los senos mediante implantes mamarios. Es uno de los procedimientos estéticos más realizados en el mundo.',
            'Utilizamos implantes de <strong class="text-primary">última generación</strong> con gel cohesivo de silicona, disponibles en diferentes formas (redondos o anatómicos), tamaños y perfiles para lograr un resultado personalizado y natural.',
        ],
        image: '/images/procedures/que-es/mamoplastia-aumento-tecnica.jpg',
        highlights: {
            title: 'Opciones de Implantes',
            icon: CircleDot,
            items: [
                'Implantes redondos o anatómicos',
                'Gel cohesivo de silicona',
                'Diferentes tamaños y perfiles',
                'Superficie lisa o texturizada',
                'Marcas premium certificadas',
                'Garantía de por vida',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: CircleDot,
            title: 'Implantes Premium',
            description: 'Marcas certificadas con garantía de por vida.',
        },
        {
            icon: Award,
            title: 'Resultados Naturales',
            description: 'Selección personalizada para armonía con tu cuerpo.',
        },
        {
            icon: Shield,
            title: 'Máxima Seguridad',
            description: 'Técnicas avanzadas y protocolos certificados.',
        },
        {
            icon: Heart,
            title: 'Autoestima Elevada',
            description: 'Mejora tu confianza y bienestar personal.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/mamoplastia-aumento-before.jpg',
            after: '/images/before-after/mamoplastia-aumento-after.jpg',
            label: 'Caso 1 - Implantes redondos',
        },
        {
            before: '/images/before-after/mamoplastia-aumento-before.jpg',
            after: '/images/before-after/mamoplastia-aumento-after.jpg',
            label: 'Caso 2 - Implantes anatómicos',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Evaluación mamaria, prueba de implantes y selección del tamaño ideal.',
            duration: '45-60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación Pre-quirúrgica',
            description: 'Exámenes de laboratorio, mamografía si corresponde y preparación.',
            duration: '1-2 semanas antes',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Procedimiento Quirúrgico',
            description: 'Colocación de implantes bajo anestesia general en clínica certificada.',
            duration: '1-2 horas',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Recuperación Inicial',
            description: 'Alta el mismo día o al día siguiente. Uso de sujetador especial.',
            duration: '1-2 días',
            icon: Timer,
        },
        {
            step: 5,
            title: 'Seguimiento y Resultado',
            description: 'Controles periódicos hasta ver el resultado final con implantes asentados.',
            duration: '3-6 meses',
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
            question: '¿Cómo elijo el tamaño correcto de implantes?',
            answer: 'Durante la consulta realizamos pruebas con diferentes tamaños de implantes usando un sujetador especial. Consideramos tu anatomía, proporciones corporales, estilo de vida y expectativas para recomendar el tamaño ideal.',
        },
        {
            question: '¿Los implantes son seguros?',
            answer: 'Sí, los implantes de gel cohesivo de silicona actuales son muy seguros y han sido extensamente estudiados. Utilizamos marcas premium con certificación FDA y garantía de por vida.',
        },
        {
            question: '¿Dónde se coloca el implante?',
            answer: 'El implante puede colocarse detrás de la glándula mamaria (subglandular) o detrás del músculo pectoral (submuscular). La elección depende de tu anatomía y será discutida en la consulta.',
        },
        {
            question: '¿Por dónde se hace la incisión?',
            answer: 'Las opciones incluyen: surco submamario (debajo del seno), periareolar (alrededor de la areola) o axilar. La más común es el surco submamario por su versatilidad y cicatriz oculta.',
        },
        {
            question: '¿Cuánto duran los implantes?',
            answer: 'Los implantes modernos no tienen fecha de vencimiento. Sin embargo, se recomienda evaluación periódica y posible recambio después de 10-15 años o si hay cambios en los senos.',
        },
        {
            question: '¿Puedo amamantar después de la cirugía?',
            answer: 'En la mayoría de casos sí. Las técnicas actuales preservan los conductos mamarios. Sin embargo, hay factores individuales que pueden afectar la lactancia.',
        },
        {
            question: '¿Cuándo puedo volver a hacer ejercicio?',
            answer: 'Caminatas desde la primera semana. Ejercicio cardiovascular ligero a las 3-4 semanas. Ejercicios de pecho y alta intensidad después de 6-8 semanas.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '2000+', label: 'Mamoplastias realizadas' },
            { value: '99%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Realza tu figura con confianza',
        description: 'Agenda tu consulta de valoración y descubre cómo lograr los senos que siempre deseaste.',
    },

    en: {
        categoryLabel: 'Body Plastic Surgery',
        hero: {
            badge: 'Breast Augmentation',
            title: 'Breast Augmentation',
            description: 'Increase the volume and improve the shape of your breasts with high-quality implants. Natural results that enhance your femininity and confidence.',
            duration: '1-2 hours',
            recovery: '7-14 days recovery',
            anesthesia: 'General anesthesia',
        },
        info: {
            title: 'What is Breast Augmentation?',
            content: [
                'Breast augmentation is a surgery that increases the size and improves the shape of the breasts using breast implants. It is one of the most performed cosmetic procedures in the world.',
                'We use <strong class="text-primary">state-of-the-art</strong> cohesive silicone gel implants, available in different shapes (round or anatomical), sizes, and profiles to achieve a personalized and natural result.',
            ],
            highlights: {
                title: 'Implant Options',
                items: [
                    'Round or anatomical implants',
                    'Cohesive silicone gel',
                    'Different sizes and profiles',
                    'Smooth or textured surface',
                    'Certified premium brands',
                    'Lifetime warranty',
                ],
            },
        },
        benefits: [
            {
                title: 'Premium Implants',
                description: 'Certified brands with lifetime warranty.',
            },
            {
                title: 'Natural Results',
                description: 'Personalized selection for harmony with your body.',
            },
            {
                title: 'Maximum Safety',
                description: 'Advanced techniques and certified protocols.',
            },
            {
                title: 'Elevated Self-Esteem',
                description: 'Improve your confidence and personal wellbeing.',
            },
        ],
        process: [
            {
                title: 'Assessment Consultation',
                description: 'Breast evaluation, implant trial, and ideal size selection.',
                duration: '45-60 min',
            },
            {
                title: 'Pre-surgical Preparation',
                description: 'Lab tests, mammogram if applicable, and preparation.',
                duration: '1-2 weeks prior',
            },
            {
                title: 'Surgical Procedure',
                description: 'Implant placement under general anesthesia at a certified clinic.',
                duration: '1-2 hours',
            },
            {
                title: 'Initial Recovery',
                description: 'Same-day or next-day discharge. Use of special bra.',
                duration: '1-2 days',
            },
            {
                title: 'Follow-up and Result',
                description: 'Periodic check-ups until the final result with settled implants.',
                duration: '3-6 months',
            },
        ],
        faqs: [
            {
                question: 'How do I choose the correct implant size?',
                answer: 'During the consultation we perform trials with different implant sizes using a special bra. We consider your anatomy, body proportions, lifestyle, and expectations to recommend the ideal size.',
            },
            {
                question: 'Are implants safe?',
                answer: 'Yes, current cohesive silicone gel implants are very safe and have been extensively studied. We use premium brands with FDA certification and lifetime warranty.',
            },
            {
                question: 'Where is the implant placed?',
                answer: 'The implant can be placed behind the mammary gland (subglandular) or behind the pectoral muscle (submuscular). The choice depends on your anatomy and will be discussed during the consultation.',
            },
            {
                question: 'Where is the incision made?',
                answer: 'Options include: inframammary fold (under the breast), periareolar (around the areola), or axillary. The most common is the inframammary fold due to its versatility and hidden scar.',
            },
            {
                question: 'How long do implants last?',
                answer: 'Modern implants have no expiration date. However, periodic evaluation and possible replacement after 10-15 years or if there are changes in the breasts is recommended.',
            },
            {
                question: 'Can I breastfeed after surgery?',
                answer: 'In most cases yes. Current techniques preserve the mammary ducts. However, individual factors may affect breastfeeding.',
            },
            {
                question: 'When can I return to exercise?',
                answer: 'Walks from the first week. Light cardiovascular exercise at 3-4 weeks. Chest exercises and high intensity after 6-8 weeks.',
            },
        ],
        cta: {
            title: 'Enhance your figure with confidence',
            description: 'Schedule your assessment consultation and discover how to achieve the breasts you have always desired.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function MamoplastiaAumentoPage() {
    return <ProcedurePage data={mamoplastiaAumentoData} />
}

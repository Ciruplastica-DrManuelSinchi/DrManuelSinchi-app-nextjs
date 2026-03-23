"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    Droplet,
    RefreshCw
} from 'lucide-react'

// ============================================
// PLASMA RICO EN PLAQUETAS DATA
// ============================================

const prpData: ProcedureData = {
    // Routing & Category
    slug: 'plasma-rico-plaquetas',
    category: 'estetica',
    categoryLabel: 'Medicina Estética',
    categoryPath: '/medicina-estetica',

    // Hero Section
    hero: {
        badge: 'Terapia Regenerativa',
        title: 'Plasma Rico en Plaquetas',
        description: 'Rejuvenece tu piel de forma natural usando los factores de crecimiento de tu propia sangre. Estimula la producción de colágeno y regeneración celular.',
        duration: '45-60 min',
        recovery: '24-48 horas',
        anesthesia: 'Anestesia tópica',
        whatsappMessage: 'Hola, me interesa información sobre Plasma Rico en Plaquetas',
    },

    // Info Section
    info: {
        title: '¿Qué es el Plasma Rico en Plaquetas?',
        content: [
            'El Plasma Rico en Plaquetas (PRP) es un tratamiento regenerativo que utiliza tu propia sangre. Se extrae una pequeña muestra, se procesa para concentrar las plaquetas y sus factores de crecimiento, y se aplica en la zona a tratar.',
            'Los factores de crecimiento estimulan la <strong class="text-primary">producción natural de colágeno, elastina y ácido hialurónico</strong>, mejorando la textura, firmeza y luminosidad de la piel de forma progresiva y natural.',
        ],
        image: '/images/procedures/que-es/prp-tecnica.jpg',
        highlights: {
            title: 'Beneficios del PRP',
            icon: Droplet,
            items: [
                'Estimula producción de colágeno',
                'Mejora textura y luminosidad',
                'Reduce arrugas finas',
                'Tratamiento de ojeras',
                'Rejuvenecimiento de manos',
                'Tratamiento capilar',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Droplet,
            title: '100% Natural',
            description: 'Usa tu propia sangre, sin sustancias externas.',
        },
        {
            icon: RefreshCw,
            title: 'Regeneración Real',
            description: 'Estimula la producción natural de colágeno.',
        },
        {
            icon: Shield,
            title: 'Sin Alergias',
            description: 'Al ser autólogo, no hay riesgo de rechazo.',
        },
        {
            icon: Heart,
            title: 'Resultados Progresivos',
            description: 'Mejora continua durante semanas.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/prp-before.jpg',
            after: '/images/before-after/prp-after.jpg',
            label: 'Caso 1 - Rejuvenecimiento facial',
        },
        {
            before: '/images/before-after/prp-before.jpg',
            after: '/images/before-after/prp-after.jpg',
            label: 'Caso 2 - Textura de piel',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Extracción de Sangre',
            description: 'Se extrae una pequeña muestra de sangre de tu brazo.',
            duration: '5 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Centrifugación',
            description: 'La sangre se procesa para separar y concentrar el plasma rico en plaquetas.',
            duration: '15 min',
            icon: RefreshCw,
        },
        {
            step: 3,
            title: 'Aplicación del PRP',
            description: 'El plasma concentrado se aplica mediante microinyecciones o microneedling.',
            duration: '30-45 min',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Recuperación',
            description: 'Enrojecimiento leve por 24-48 horas. Resultados progresivos en semanas.',
            duration: '1-2 días',
            icon: Star,
        },
    ],

    // Videos
    videos: [

    ],

    // FAQs
    faqs: [
        {
            question: '¿Cuántas sesiones necesito?',
            answer: 'Se recomienda un protocolo de 3-4 sesiones espaciadas cada 3-4 semanas, seguido de mantenimiento cada 6-12 meses. Los resultados son acumulativos.',
        },
        {
            question: '¿Es doloroso el tratamiento?',
            answer: 'Se aplica anestesia tópica antes del procedimiento. Puedes sentir un leve pinchazo durante las inyecciones, pero es muy tolerable.',
        },
        {
            question: '¿Cuándo veré resultados?',
            answer: 'Los primeros efectos (luminosidad) se ven en 2-3 semanas. Los resultados óptimos de producción de colágeno se aprecian entre 2-3 meses después del tratamiento.',
        },
        {
            question: '¿Puedo hacer vida normal después?',
            answer: 'Sí, aunque puedes tener enrojecimiento y leve inflamación por 24-48 horas. Se recomienda evitar maquillaje por 12 horas y sol directo por algunos días.',
        },
        {
            question: '¿El PRP sirve para la caída del cabello?',
            answer: 'Sí, el PRP capilar es muy efectivo para estimular el crecimiento del cabello y frenar la caída. Se inyecta directamente en el cuero cabelludo.',
        },
        {
            question: '¿Quién no puede hacerse PRP?',
            answer: 'No es recomendable en personas con trastornos de coagulación, infecciones activas, cáncer, o quienes toman anticoagulantes. Se evalúa cada caso individualmente.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '2000+', label: 'Tratamientos de PRP' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Rejuvenece de forma natural con PRP',
        description: 'Agenda tu consulta y descubre cómo el plasma rico en plaquetas puede mejorar tu piel.',
    },

    en: {
        categoryLabel: 'Aesthetic Medicine',
        hero: {
            badge: 'Regenerative Therapy',
            title: 'Platelet-Rich Plasma',
            description: 'Rejuvenate your skin naturally using growth factors from your own blood. Stimulates collagen production and cellular regeneration.',
            duration: '45-60 min',
            recovery: '24-48 hours',
            anesthesia: 'Topical anesthesia',
        },
        info: {
            title: 'What is Platelet-Rich Plasma?',
            content: [
                'Platelet-Rich Plasma (PRP) is a regenerative treatment that uses your own blood. A small sample is drawn, processed to concentrate the platelets and their growth factors, and applied to the area to be treated.',
                'The growth factors stimulate the <strong class="text-primary">natural production of collagen, elastin and hyaluronic acid</strong>, progressively and naturally improving the texture, firmness and radiance of the skin.',
            ],
            highlights: {
                title: 'Benefits of PRP',
                items: [
                    'Stimulates collagen production',
                    'Improves texture and radiance',
                    'Reduces fine lines',
                    'Under-eye treatment',
                    'Hand rejuvenation',
                    'Hair loss treatment',
                ],
            },
        },
        benefits: [
            {
                title: '100% Natural',
                description: 'Uses your own blood, no external substances.',
            },
            {
                title: 'Real Regeneration',
                description: 'Stimulates natural collagen production.',
            },
            {
                title: 'No Allergies',
                description: 'Being autologous, there is no risk of rejection.',
            },
            {
                title: 'Progressive Results',
                description: 'Continuous improvement over weeks.',
            },
        ],
        process: [
            {
                title: 'Blood Draw',
                description: 'A small blood sample is drawn from your arm.',
                duration: '5 min',
            },
            {
                title: 'Centrifugation',
                description: 'The blood is processed to separate and concentrate the platelet-rich plasma.',
                duration: '15 min',
            },
            {
                title: 'PRP Application',
                description: 'The concentrated plasma is applied via microinjections or microneedling.',
                duration: '30-45 min',
            },
            {
                title: 'Recovery',
                description: 'Mild redness for 24-48 hours. Progressive results over weeks.',
                duration: '1-2 days',
            },
        ],
        faqs: [
            {
                question: 'How many sessions do I need?',
                answer: 'A protocol of 3-4 sessions spaced every 3-4 weeks is recommended, followed by maintenance every 6-12 months. Results are cumulative.',
            },
            {
                question: 'Is the treatment painful?',
                answer: 'Topical anesthesia is applied before the procedure. You may feel a slight pinprick during the injections, but it is very tolerable.',
            },
            {
                question: 'When will I see results?',
                answer: 'The first effects (radiance) are visible in 2-3 weeks. Optimal collagen production results are seen 2-3 months after treatment.',
            },
            {
                question: 'Can I go about my normal life afterward?',
                answer: 'Yes, although you may have redness and mild inflammation for 24-48 hours. It is recommended to avoid makeup for 12 hours and direct sun for a few days.',
            },
            {
                question: 'Is PRP effective for hair loss?',
                answer: 'Yes, scalp PRP is very effective for stimulating hair growth and stopping hair loss. It is injected directly into the scalp.',
            },
            {
                question: 'Who cannot have PRP?',
                answer: 'It is not recommended for people with clotting disorders, active infections, cancer, or those taking anticoagulants. Each case is evaluated individually.',
            },
        ],
        cta: {
            title: 'Rejuvenate naturally with PRP',
            description: 'Schedule your consultation and discover how platelet-rich plasma can improve your skin.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function PlasmaRicoPlaquetasPage() {
    return <ProcedurePage data={prpData} />
}

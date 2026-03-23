"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    CircleDot,
    Scissors
} from 'lucide-react'

// ============================================
// EXTRACCIÓN DE LUNARES DATA
// ============================================

const extraccionLunaresData: ProcedureData = {
    // Routing & Category
    slug: 'extraccion-lunares',
    category: 'facial',
    categoryLabel: 'Cirugía Plástica Facial',
    categoryPath: '/cirugia-plastica-facial',

    // Hero Section
    hero: {
        badge: 'Cirugía Dermatológica',
        title: 'Extracción de Lunares',
        description: 'Remoción segura de lunares, verrugas y lesiones cutáneas con técnicas quirúrgicas que minimizan cicatrices. Incluye análisis patológico cuando es necesario.',
        duration: '15-30 min',
        recovery: '5-7 días',
        anesthesia: 'Anestesia local',
        whatsappMessage: 'Hola, me interesa información sobre extracción de lunares',
    },

    // Info Section
    info: {
        title: '¿En qué consiste la Extracción de Lunares?',
        content: [
            'La extracción de lunares es un procedimiento ambulatorio que permite remover lesiones cutáneas de forma segura. Puede realizarse por razones estéticas o médicas, especialmente cuando hay sospecha de cambios anormales.',
            'Utilizamos técnicas como <strong class="text-primary">excisión quirúrgica, shaving o electrocoagulación</strong>, seleccionando la más adecuada según el tipo, tamaño y ubicación de la lesión para obtener el mejor resultado estético.',
        ],
        image: '/images/procedures/que-es/extraccion-lunares-tecnica.jpg',
        highlights: {
            title: 'Lesiones que tratamos',
            icon: CircleDot,
            items: [
                'Lunares (nevos)',
                'Verrugas',
                'Queratosis seborreicas',
                'Fibromas',
                'Quistes epidérmicos',
                'Lesiones sospechosas',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Shield,
            title: 'Análisis Patológico',
            description: 'Enviamos las muestras a estudio cuando es necesario.',
        },
        {
            icon: Scissors,
            title: 'Mínima Cicatriz',
            description: 'Técnicas que minimizan las marcas residuales.',
        },
        {
            icon: CircleDot,
            title: 'Remoción Completa',
            description: 'Extracción total de la lesión en una sesión.',
        },
        {
            icon: Heart,
            title: 'Tranquilidad',
            description: 'Descarta malignidad con el estudio histopatológico.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/lunares-before.jpg',
            after: '/images/before-after/lunares-after.jpg',
            label: 'Caso 1 - Lunar facial',
        },
        {
            before: '/images/before-after/lunares-before.jpg',
            after: '/images/before-after/lunares-after.jpg',
            label: 'Caso 2 - Múltiples lesiones',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Evaluación de la Lesión',
            description: 'Examen visual y dermatoscópico para determinar el tipo de lesión.',
            duration: '15-20 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Anestesia Local',
            description: 'Aplicación de anestesia para un procedimiento indoloro.',
            duration: '5 min',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Extracción',
            description: 'Remoción de la lesión con la técnica más apropiada.',
            duration: '15-30 min',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Cicatrización',
            description: 'Cuidados de la herida y espera del resultado patológico si aplica.',
            duration: '5-14 días',
            icon: Star,
        },
    ],

    // Videos
    videos: [],

    // FAQs
    faqs: [
        {
            question: '¿Cuándo debo preocuparme por un lunar?',
            answer: 'Usa la regla ABCDE: Asimetría, Bordes irregulares, Color variado, Diámetro mayor a 6mm, Evolución (cambios). Si notas alguno de estos signos, consulta inmediatamente.',
        },
        {
            question: '¿La extracción es dolorosa?',
            answer: 'No, se aplica anestesia local que adormece completamente la zona. Solo sentirás el pequeño pinchazo inicial de la anestesia.',
        },
        {
            question: '¿Quedará cicatriz?',
            answer: 'Toda extracción deja alguna marca, pero utilizamos técnicas que minimizan la cicatriz. El resultado final depende del tamaño, ubicación y cuidados posteriores.',
        },
        {
            question: '¿El lunar puede volver a salir?',
            answer: 'Si se extrae completamente, no debería recurrir. Sin embargo, pueden aparecer nuevos lunares con el tiempo, especialmente con exposición solar.',
        },
        {
            question: '¿Siempre se envía a patología?',
            answer: 'No siempre. Se envía cuando hay características sospechosas, cambios recientes, o por solicitud del paciente. Las lesiones claramente benignas pueden no requerirlo.',
        },
        {
            question: '¿Cuántos lunares se pueden quitar en una sesión?',
            answer: 'Depende del tamaño y ubicación. Generalmente se pueden remover varios lunares pequeños en una sola sesión. Lo evaluamos en la consulta.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '4000+', label: 'Lesiones removidas' },
            { value: '99%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Remueve esas lesiones que te incomodan',
        description: 'Agenda tu consulta para evaluar tus lunares y lesiones de forma segura.',
    },

    en: {
        categoryLabel: 'Facial Plastic Surgery',
        hero: {
            badge: 'Dermatological Surgery',
            title: 'Mole Removal',
            description: 'Safe removal of moles, warts, and skin lesions with surgical techniques that minimize scarring. Includes pathological analysis when necessary.',
            duration: '15-30 min',
            recovery: '5-7 days',
            anesthesia: 'Local anesthesia',
        },
        info: {
            title: 'What does Mole Removal consist of?',
            content: [
                'Mole removal is an outpatient procedure that allows skin lesions to be safely removed. It can be performed for aesthetic or medical reasons, especially when there is suspicion of abnormal changes.',
                'We use techniques such as <strong class="text-primary">surgical excision, shaving, or electrocoagulation</strong>, selecting the most appropriate one based on the type, size, and location of the lesion to obtain the best aesthetic result.',
            ],
            highlights: {
                title: 'Lesions we treat',
                items: [
                    'Moles (nevi)',
                    'Warts',
                    'Seborrheic keratoses',
                    'Fibromas',
                    'Epidermal cysts',
                    'Suspicious lesions',
                ],
            },
        },
        benefits: [
            {
                title: 'Pathological Analysis',
                description: 'We send samples for study when necessary.',
            },
            {
                title: 'Minimal Scarring',
                description: 'Techniques that minimize residual marks.',
            },
            {
                title: 'Complete Removal',
                description: 'Total extraction of the lesion in a single session.',
            },
            {
                title: 'Peace of Mind',
                description: 'Rule out malignancy with histopathological study.',
            },
        ],
        process: [
            {
                title: 'Lesion Evaluation',
                description: 'Visual and dermatoscopic examination to determine the type of lesion.',
                duration: '15-20 min',
            },
            {
                title: 'Local Anesthesia',
                description: 'Application of anesthesia for a painless procedure.',
                duration: '5 min',
            },
            {
                title: 'Extraction',
                description: 'Removal of the lesion with the most appropriate technique.',
                duration: '15-30 min',
            },
            {
                title: 'Healing',
                description: 'Wound care and waiting for the pathological result if applicable.',
                duration: '5-14 days',
            },
        ],
        faqs: [
            {
                question: 'When should I be concerned about a mole?',
                answer: 'Use the ABCDE rule: Asymmetry, irregular Borders, varied Color, Diameter greater than 6mm, Evolution (changes). If you notice any of these signs, consult immediately.',
            },
            {
                question: 'Is the extraction painful?',
                answer: 'No, local anesthesia is applied to completely numb the area. You will only feel the small initial prick of the anesthesia.',
            },
            {
                question: 'Will there be a scar?',
                answer: 'Every extraction leaves some mark, but we use techniques that minimize scarring. The final result depends on size, location, and post-operative care.',
            },
            {
                question: 'Can the mole grow back?',
                answer: 'If it is completely removed, it should not recur. However, new moles can appear over time, especially with sun exposure.',
            },
            {
                question: 'Is it always sent to pathology?',
                answer: 'Not always. It is sent when there are suspicious characteristics, recent changes, or at the patient\'s request. Clearly benign lesions may not require it.',
            },
            {
                question: 'How many moles can be removed in one session?',
                answer: 'It depends on the size and location. Generally, several small moles can be removed in a single session. We evaluate this during the consultation.',
            },
        ],
        cta: {
            title: 'Remove those lesions that bother you',
            description: 'Schedule your consultation to safely evaluate your moles and skin lesions.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function ExtraccionLunaresPage() {
    return <ProcedurePage data={extraccionLunaresData} />
}

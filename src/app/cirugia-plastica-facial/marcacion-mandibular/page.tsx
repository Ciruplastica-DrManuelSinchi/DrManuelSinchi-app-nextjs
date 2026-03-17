"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    Square,
    Maximize2
} from 'lucide-react'

// ============================================
// MARCACIÓN MANDIBULAR DATA
// ============================================

const marcacionMandibularData: ProcedureData = {
    slug: 'marcacion-mandibular',
    category: 'facial',
    categoryLabel: 'Cirugía Plástica Facial',
    categoryPath: '/cirugia-plastica-facial',

    hero: {
        badge: 'Definición Facial',
        title: 'Marcación Mandibular',
        description: 'Define tu línea mandibular para un rostro más angular y masculino o femenino según tu objetivo. Utilizamos técnicas con grasa autóloga o implantes para resultados precisos.',
        duration: '60-120 min',
        recovery: '10-14 días',
        anesthesia: 'Local con sedación',
        whatsappMessage: 'Hola, me interesa información sobre marcación mandibular',
    },

    info: {
        title: '¿Qué es la Marcación Mandibular?',
        content: [
            'La marcación mandibular es un procedimiento que define y realza el ángulo y borde de la mandíbula para crear un rostro más estructurado y atractivo. Es uno de los procedimientos más solicitados tanto por hombres como mujeres.',
            'Ofrecemos dos técnicas: <strong class="text-primary">Lipotransferencia (grasa autóloga)</strong> para un aumento sutil y natural, e <strong class="text-primary">Implantes mandibulares de silicona</strong> para una definición más marcada y angular.',
        ],
        image: '/images/procedures/que-es/marcacion-mandibular.jpg',
        highlights: {
            title: 'Técnicas Disponibles',
            icon: Square,
            items: [
                'Marcación con grasa autóloga',
                'Implantes de ángulo mandibular',
                'Implantes de borde mandibular',
                'Combinación grasa + implantes',
                'Corrección de asimetrías',
                'Definición masculina o femenina',
            ],
        },
    },

    benefits: [
        {
            icon: Square,
            title: 'Mandíbula Definida',
            description: 'Línea mandibular angular y estructurada.',
        },
        {
            icon: Maximize2,
            title: 'Rostro Balanceado',
            description: 'Mejora las proporciones faciales generales.',
        },
        {
            icon: Heart,
            title: 'Resultados Permanentes',
            description: 'Tanto grasa estabilizada como implantes son duraderos.',
        },
        {
            icon: Sparkles,
            title: 'Personalizado',
            description: 'Diseño adaptado a tu género y objetivos estéticos.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/mandibula-before.jpg',
            after: '/images/before-after/mandibula-after.jpg',
            label: 'Caso 1 - Implantes mandibulares',
        },
        {
            before: '/images/before-after/mandibula-before-2.jpg',
            after: '/images/before-after/mandibula-after-2.jpg',
            label: 'Caso 2 - Lipotransferencia mandibular',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Evaluación Facial',
            description: 'Análisis de tu estructura mandibular y definición de objetivos.',
            duration: '30-45 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Diseño Personalizado',
            description: 'Planificación del tipo y grado de marcación deseada.',
            duration: 'En consulta',
            icon: Sparkles,
        },
        {
            step: 3,
            title: 'Procedimiento',
            description: 'Cirugía con técnica seleccionada bajo sedación.',
            duration: '60-120 min',
            icon: Shield,
        },
        {
            step: 4,
            title: 'Recuperación',
            description: 'Inflamación que cede en 2-3 semanas. Resultados definitivos en 2-3 meses.',
            duration: '10-14 días',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Cómo se colocan los implantes mandibulares?',
            answer: 'A través de incisiones dentro de la boca, sin cicatrices visibles. Se fijan sobre el hueso mandibular para definir el ángulo y/o borde.',
        },
        {
            question: '¿La grasa puede lograr el mismo resultado que los implantes?',
            answer: 'La grasa da resultados más sutiles. Para una marcación muy definida y angular, los implantes son más efectivos.',
        },
        {
            question: '¿Este procedimiento es solo para hombres?',
            answer: 'No, muchas mujeres buscan una mandíbula más definida. El diseño se adapta a los estándares de belleza masculinos o femeninos según el caso.',
        },
        {
            question: '¿Los implantes se pueden sentir o mover?',
            answer: 'No, quedan firmemente adheridos al hueso y cubiertos por tejido. No se sienten al tacto ni se mueven.',
        },
        {
            question: '¿Puedo combinar con otros procedimientos?',
            answer: 'Sí, frecuentemente se combina con mentoplastia, liposucción de papada y bichectomía para un afinamiento facial completo.',
        },
        {
            question: '¿Cuáles son los riesgos?',
            answer: 'Los principales son infección, asimetría y daño a nervios (raro). Con técnica apropiada, las complicaciones son poco frecuentes.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '500+', label: 'Procedimientos mandibulares' },
            { value: '97%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'Define tu mandíbula y transforma tu rostro',
        description: 'Agenda tu consulta para evaluar la mejor técnica de marcación mandibular para ti.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function MarcacionMandibularPage() {
    return <ProcedurePage data={marcacionMandibularData} />
}

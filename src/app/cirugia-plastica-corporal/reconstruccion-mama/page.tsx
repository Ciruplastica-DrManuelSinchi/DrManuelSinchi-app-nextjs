"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    CircleDot,
    Layers,
    HeartPulse
} from 'lucide-react'

// ============================================
// RECONSTRUCCIÓN DE MAMA DATA
// ============================================

const reconstruccionMamaData: ProcedureData = {
    slug: 'reconstruccion-mama',
    category: 'corporal',
    categoryLabel: 'Cirugía Plástica Corporal',
    categoryPath: '/cirugia-plastica-corporal',

    hero: {
        badge: 'Cirugía Reconstructiva',
        title: 'Reconstrucción de Mama',
        description: 'Restauramos la forma y apariencia del seno después de mastectomía u otras cirugías oncológicas. Utilizamos tejidos propios o implantes para resultados naturales que devuelven la confianza.',
        duration: '2-6 horas',
        recovery: '4-8 semanas',
        anesthesia: 'General',
        whatsappMessage: 'Hola, me interesa información sobre reconstrucción de mama',
    },

    info: {
        title: '¿Qué es la Reconstrucción de Mama?',
        content: [
            'La reconstrucción mamaria es un procedimiento que restaura la forma del seno después de una mastectomía (extirpación del seno por cáncer) o cirugía conservadora. Puede realizarse inmediatamente después de la mastectomía o de forma diferida.',
            'Ofrecemos múltiples técnicas: <strong class="text-primary">Con tejidos propios</strong> (transferencia de grasa, colgajos TRAM/DIEP, músculo dorsal ancho) y <strong class="text-primary">Con implantes</strong> (expansores tisulares y prótesis de gel de silicona).',
        ],
        image: '/images/procedures/que-es/reconstruccion-mama.jpg',
        highlights: {
            title: 'Técnicas Disponibles',
            icon: HeartPulse,
            items: [
                'Transferencia de grasa autóloga',
                'Colgajo TRAM (músculo recto abdominal)',
                'Colgajo DIEP (perforante epigástrica)',
                'Colgajo de dorsal ancho',
                'Expansores tisulares',
                'Implantes de gel de silicona',
            ],
        },
    },

    benefits: [
        {
            icon: Heart,
            title: 'Restauración Emocional',
            description: 'Recupera la imagen corporal después del tratamiento oncológico.',
        },
        {
            icon: Layers,
            title: 'Múltiples Opciones',
            description: 'Elegimos la técnica ideal según tu caso y preferencias.',
        },
        {
            icon: CircleDot,
            title: 'Resultados Naturales',
            description: 'Aspecto y tacto similares al seno natural.',
        },
        {
            icon: Shield,
            title: 'Coordinación Oncológica',
            description: 'Trabajamos con tu equipo de oncología para el mejor resultado.',
        },
    ],

    beforeAfter: [
        {
            before: '/images/before-after/reconstruccion-before.jpg',
            after: '/images/before-after/reconstruccion-after.jpg',
            label: 'Caso 1 - Reconstrucción con implante',
        },
        {
            before: '/images/before-after/reconstruccion-before-2.jpg',
            after: '/images/before-after/reconstruccion-after-2.jpg',
            label: 'Caso 2 - Reconstrucción con tejido propio',
        },
    ],

    process: [
        {
            step: 1,
            title: 'Evaluación y Planificación',
            description: 'Análisis de tu caso, coordinación con oncología y elección de técnica.',
            duration: '60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Primera Etapa',
            description: 'Reconstrucción inicial (puede ser inmediata post-mastectomía o diferida).',
            duration: '2-6 horas',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Etapas Adicionales',
            description: 'Ajustes, simetrización y reconstrucción del pezón si aplica.',
            duration: 'Variable',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Resultado Final',
            description: 'Mama reconstruida con forma y proyección natural.',
            duration: '6-12 meses',
            icon: Star,
        },
    ],

    videos: [],

    faqs: [
        {
            question: '¿Cuándo puedo hacerme la reconstrucción?',
            answer: 'Puede ser inmediata (junto con la mastectomía) o diferida (meses o años después). Ambas opciones tienen buenos resultados. Lo decidimos según tu tratamiento oncológico.',
        },
        {
            question: '¿Qué técnica es mejor: tejido propio o implantes?',
            answer: 'Depende de varios factores: si recibirás radioterapia, cantidad de tejido disponible, tus preferencias. El tejido propio suele ser más natural; los implantes son más simples.',
        },
        {
            question: '¿Se reconstruye el pezón también?',
            answer: 'Sí, la reconstrucción del pezón y areola es la etapa final. Se realiza cuando la mama reconstruida ha sanado completamente.',
        },
        {
            question: '¿La reconstrucción interfiere con el seguimiento oncológico?',
            answer: 'No, se pueden seguir realizando los controles necesarios. Coordinamos con tu oncólogo para asegurar un seguimiento adecuado.',
        },
        {
            question: '¿El seguro cubre la reconstrucción?',
            answer: 'La reconstrucción mamaria post-mastectomía generalmente está cubierta por la ley. Verificamos tu cobertura específica.',
        },
        {
            question: '¿Cuántas cirugías se necesitan?',
            answer: 'Típicamente 2-3 etapas: reconstrucción inicial, ajustes/simetrización, y reconstrucción del pezón. Algunas técnicas pueden requerir menos.',
        },
    ],

    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '300+', label: 'Reconstrucciones mamarias' },
            { value: '99%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    cta: {
        title: 'Recupera tu imagen y confianza',
        description: 'Agenda tu consulta para conocer las opciones de reconstrucción mamaria.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function ReconstruccionMamaPage() {
    return <ProcedurePage data={reconstruccionMamaData} />
}

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
        image: '/images/procedures/que-es/reconstruccion-mama-tecnica.jpg',
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

    en: {
        categoryLabel: 'Body Plastic Surgery',
        hero: {
            badge: 'Reconstructive Surgery',
            title: 'Breast Reconstruction',
            description: 'We restore the shape and appearance of the breast after mastectomy or other oncological surgeries. We use own tissues or implants for natural results that restore confidence.',
            duration: '2-6 hours',
            recovery: '4-8 weeks recovery',
            anesthesia: 'General anesthesia',
        },
        info: {
            title: 'What is Breast Reconstruction?',
            content: [
                'Breast reconstruction is a procedure that restores the shape of the breast after a mastectomy (breast removal for cancer) or breast-conserving surgery. It can be performed immediately after mastectomy or in a delayed manner.',
                'We offer multiple techniques: <strong class="text-primary">With own tissues</strong> (fat transfer, TRAM/DIEP flaps, latissimus dorsi muscle) and <strong class="text-primary">With implants</strong> (tissue expanders and silicone gel prostheses).',
            ],
            highlights: {
                title: 'Available Techniques',
                items: [
                    'Autologous fat transfer',
                    'TRAM flap (rectus abdominis muscle)',
                    'DIEP flap (deep inferior epigastric perforator)',
                    'Latissimus dorsi flap',
                    'Tissue expanders',
                    'Silicone gel implants',
                ],
            },
        },
        benefits: [
            {
                title: 'Emotional Restoration',
                description: 'Regain body image after oncological treatment.',
            },
            {
                title: 'Multiple Options',
                description: 'We choose the ideal technique based on your case and preferences.',
            },
            {
                title: 'Natural Results',
                description: 'Appearance and feel similar to the natural breast.',
            },
            {
                title: 'Oncological Coordination',
                description: 'We work with your oncology team for the best outcome.',
            },
        ],
        process: [
            {
                title: 'Evaluation and Planning',
                description: 'Analysis of your case, coordination with oncology, and technique selection.',
                duration: '60 min',
            },
            {
                title: 'First Stage',
                description: 'Initial reconstruction (can be immediate post-mastectomy or delayed).',
                duration: '2-6 hours',
            },
            {
                title: 'Additional Stages',
                description: 'Adjustments, symmetrization, and nipple reconstruction if applicable.',
                duration: 'Variable',
            },
            {
                title: 'Final Result',
                description: 'Reconstructed breast with natural shape and projection.',
                duration: '6-12 months',
            },
        ],
        faqs: [
            {
                question: 'When can I have reconstruction?',
                answer: 'It can be immediate (together with mastectomy) or delayed (months or years later). Both options have good results. We decide based on your oncological treatment.',
            },
            {
                question: 'Which technique is better: own tissue or implants?',
                answer: 'It depends on several factors: whether you will receive radiation therapy, amount of available tissue, your preferences. Own tissue is usually more natural; implants are simpler.',
            },
            {
                question: 'Is the nipple also reconstructed?',
                answer: 'Yes, nipple and areola reconstruction is the final stage. It is performed when the reconstructed breast has fully healed.',
            },
            {
                question: 'Does reconstruction interfere with oncological follow-up?',
                answer: 'No, the necessary check-ups can continue to be performed. We coordinate with your oncologist to ensure adequate follow-up.',
            },
            {
                question: 'Does insurance cover reconstruction?',
                answer: 'Post-mastectomy breast reconstruction is generally covered by law. We verify your specific coverage.',
            },
            {
                question: 'How many surgeries are needed?',
                answer: 'Typically 2-3 stages: initial reconstruction, adjustments/symmetrization, and nipple reconstruction. Some techniques may require fewer.',
            },
        ],
        cta: {
            title: 'Restore your image and confidence',
            description: 'Schedule your consultation to learn about breast reconstruction options.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function ReconstruccionMamaPage() {
    return <ProcedurePage data={reconstruccionMamaData} />
}

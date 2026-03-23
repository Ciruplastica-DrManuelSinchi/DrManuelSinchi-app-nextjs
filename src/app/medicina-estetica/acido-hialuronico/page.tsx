"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Star,
    Droplets,
    RefreshCw
} from 'lucide-react'

// ============================================
// ÁCIDO HIALURÓNICO DATA
// ============================================

const acidoHialuronicoData: ProcedureData = {
    // Routing & Category
    slug: 'acido-hialuronico',
    category: 'estetica',
    categoryLabel: 'Medicina Estética',
    categoryPath: '/medicina-estetica',

    // Hero Section
    hero: {
        badge: 'Relleno y Volumen',
        title: 'Ácido Hialurónico',
        description: 'Restaura el volumen perdido, rellena arrugas y mejora la hidratación profunda de tu piel. Resultados naturales e inmediatos.',
        duration: '30-45 min',
        recovery: 'Inmediata',
        anesthesia: 'Anestesia tópica',
        whatsappMessage: 'Hola, me interesa información sobre ácido hialurónico',
    },

    // Info Section
    info: {
        title: '¿Qué es el Ácido Hialurónico?',
        content: [
            'El ácido hialurónico es una sustancia que se encuentra naturalmente en nuestro cuerpo, especialmente en la piel, donde retiene agua y mantiene la hidratación y volumen. Con la edad, su producción disminuye.',
            'Los rellenos de ácido hialurónico restauran el volumen perdido, rellenan arrugas y surcos, y mejoran los contornos faciales. Es <strong class="text-primary">completamente biocompatible y reversible</strong>, lo que lo convierte en uno de los tratamientos más seguros.',
        ],
        image: '/images/procedures/que-es/acido-hialuronico-tecnica.jpg',
        highlights: {
            title: 'Aplicaciones del Ácido Hialurónico',
            icon: Droplets,
            items: [
                'Surcos nasogenianos',
                'Líneas de marioneta',
                'Aumento de labios',
                'Volumen en pómulos',
                'Ojeras y valle de lágrimas',
                'Perfilado mandibular',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Droplets,
            title: 'Hidratación Profunda',
            description: 'Atrae y retiene agua mejorando la calidad de la piel.',
        },
        {
            icon: RefreshCw,
            title: 'Reversible',
            description: 'Puede disolverse si no estás satisfecho con el resultado.',
        },
        {
            icon: Shield,
            title: 'Biocompatible',
            description: 'Sustancia natural del cuerpo, muy bajo riesgo de reacción.',
        },
        {
            icon: Heart,
            title: 'Resultados Inmediatos',
            description: 'Ves el cambio desde la primera sesión.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/acido-hialuronico-before.jpg',
            after: '/images/before-after/acido-hialuronico-after.jpg',
            label: 'Caso 1 - Surcos nasogenianos',
        },
        {
            before: '/images/before-after/acido-hialuronico-before.jpg',
            after: '/images/before-after/acido-hialuronico-after.jpg',
            label: 'Caso 2 - Volumen pómulos',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Análisis facial, identificación de áreas a tratar y planificación.',
            duration: '20-30 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación',
            description: 'Limpieza facial y aplicación de anestesia tópica si es necesario.',
            duration: '15 min',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Aplicación del Relleno',
            description: 'Inyección precisa del ácido hialurónico en las zonas planificadas.',
            duration: '30-45 min',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Resultado',
            description: 'Resultados visibles inmediatamente, óptimos en 1-2 semanas.',
            duration: 'Inmediato',
            icon: Star,
        },
    ],

    // Videos
    videos: [
    ],

    // FAQs
    faqs: [
        {
            question: '¿Cuánto duran los resultados?',
            answer: 'Dependiendo de la zona y el tipo de producto, los resultados duran entre 6-18 meses. Los labios duran menos (6-9 meses) mientras que los pómulos pueden durar más de un año.',
        },
        {
            question: '¿El procedimiento es doloroso?',
            answer: 'Las molestias son mínimas. Utilizamos anestesia tópica y muchos productos contienen lidocaína incorporada. La mayoría de pacientes lo describen como muy tolerable.',
        },
        {
            question: '¿Qué es el "efecto Tyndall"?',
            answer: 'Es un efecto azulado que puede ocurrir si el producto se coloca muy superficialmente, especialmente en zonas de piel fina. Con técnica adecuada es evitable, y si ocurre, es tratable.',
        },
        {
            question: '¿Puedo disolver el ácido hialurónico si no me gusta?',
            answer: 'Sí, existe una enzima llamada hialuronidasa que disuelve el ácido hialurónico en caso de resultados insatisfactorios o complicaciones. Esta es una gran ventaja sobre otros rellenos.',
        },
        {
            question: '¿Hay efectos secundarios?',
            answer: 'Puede haber leve hinchazón, enrojecimiento o moretones que desaparecen en 3-7 días. Las complicaciones serias son muy raras con un profesional experimentado.',
        },
        {
            question: '¿Puedo combinar ácido hialurónico con Botox?',
            answer: 'Sí, de hecho es muy común. El Botox trata las arrugas dinámicas (de expresión) mientras que el ácido hialurónico restaura volumen. Juntos logran un rejuvenecimiento completo.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '5000+', label: 'Tratamientos realizados' },
            { value: '99%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Recupera el volumen y la juventud de tu rostro',
        description: 'Agenda tu consulta y descubre cómo el ácido hialurónico puede rejuvenecer tu apariencia.',
    },

    en: {
        categoryLabel: 'Aesthetic Medicine',
        hero: {
            badge: 'Filler & Volume',
            title: 'Hyaluronic Acid',
            description: 'Restore lost volume, fill wrinkles and improve deep skin hydration. Natural and immediate results.',
            duration: '30-45 min',
            recovery: 'Immediate',
            anesthesia: 'Topical anesthesia',
        },
        info: {
            title: 'What is Hyaluronic Acid?',
            content: [
                'Hyaluronic acid is a substance naturally found in our body, especially in the skin, where it retains water and maintains hydration and volume. With age, its production decreases.',
                'Hyaluronic acid fillers restore lost volume, fill wrinkles and grooves, and improve facial contours. It is <strong class="text-primary">completely biocompatible and reversible</strong>, making it one of the safest treatments available.',
            ],
            highlights: {
                title: 'Hyaluronic Acid Applications',
                items: [
                    'Nasolabial folds',
                    'Marionette lines',
                    'Lip augmentation',
                    'Cheekbone volume',
                    'Under-eye hollows and tear troughs',
                    'Jawline contouring',
                ],
            },
        },
        benefits: [
            {
                title: 'Deep Hydration',
                description: 'Attracts and retains water, improving skin quality.',
            },
            {
                title: 'Reversible',
                description: 'Can be dissolved if you are not satisfied with the result.',
            },
            {
                title: 'Biocompatible',
                description: 'A natural substance in the body, with very low risk of reaction.',
            },
            {
                title: 'Immediate Results',
                description: 'You see the change from the very first session.',
            },
        ],
        process: [
            {
                title: 'Assessment Consultation',
                description: 'Facial analysis, identification of areas to treat and planning.',
                duration: '20-30 min',
            },
            {
                title: 'Preparation',
                description: 'Facial cleansing and application of topical anesthesia if needed.',
                duration: '15 min',
            },
            {
                title: 'Filler Application',
                description: 'Precise injection of hyaluronic acid into the planned areas.',
                duration: '30-45 min',
            },
            {
                title: 'Result',
                description: 'Results visible immediately, optimal in 1-2 weeks.',
                duration: 'Immediate',
            },
        ],
        faqs: [
            {
                question: 'How long do the results last?',
                answer: 'Depending on the area and product type, results last between 6-18 months. Lips last less (6-9 months) while cheekbones can last over a year.',
            },
            {
                question: 'Is the procedure painful?',
                answer: 'Discomfort is minimal. We use topical anesthesia and many products contain built-in lidocaine. Most patients describe it as very tolerable.',
            },
            {
                question: 'What is the "Tyndall effect"?',
                answer: 'It is a bluish effect that can occur if the product is placed too superficially, especially in thin-skin areas. With proper technique it is avoidable, and if it occurs, it is treatable.',
            },
            {
                question: 'Can I dissolve the hyaluronic acid if I do not like the result?',
                answer: 'Yes, there is an enzyme called hyaluronidase that dissolves hyaluronic acid in case of unsatisfactory results or complications. This is a major advantage over other fillers.',
            },
            {
                question: 'Are there side effects?',
                answer: 'There may be mild swelling, redness or bruising that disappears within 3-7 days. Serious complications are very rare with an experienced professional.',
            },
            {
                question: 'Can I combine hyaluronic acid with Botox?',
                answer: 'Yes, in fact it is very common. Botox treats dynamic (expression) wrinkles while hyaluronic acid restores volume. Together they achieve complete rejuvenation.',
            },
        ],
        cta: {
            title: 'Restore volume and youthfulness to your face',
            description: 'Schedule your consultation and discover how hyaluronic acid can rejuvenate your appearance.',
        },
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function AcidoHialuronicoPage() {
    return <ProcedurePage data={acidoHialuronicoData} />
}

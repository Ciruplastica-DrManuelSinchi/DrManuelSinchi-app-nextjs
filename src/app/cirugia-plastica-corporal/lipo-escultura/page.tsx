"use client"

import { ProcedurePage, ProcedureData } from '@/app/components/templates/procedure-page'
import {
    Sparkles,
    Shield,
    Heart,
    Calendar,
    Timer,
    Star,
    Target,
    Zap
} from 'lucide-react'

// ============================================
// LIPOESCULTURA DATA
// ============================================

const lipoesculturaData: ProcedureData = {
    // Routing & Category
    slug: 'lipo-escultura',
    category: 'corporal',
    categoryLabel: 'Cirugía Corporal',
    categoryPath: '/cirugia-plastica-corporal',

    // Hero Section
    hero: {
        badge: 'Moldea tu Silueta',
        title: 'Lipoescultura',
        description: 'Esculpe tu cuerpo eliminando grasa localizada y definiendo tu silueta. Técnica avanzada que moldea tus contornos de forma armónica y natural.',
        duration: '2-4 horas',
        recovery: '7-14 días recuperación',
        anesthesia: 'Anestesia general o sedación',
        heroImage: '/images/procedures/lipoescultura-hero.jpg',
        whatsappMessage: 'Hola, me interesa información sobre lipoescultura',
    },

    // Info Section
    info: {
        title: '¿Qué es la Lipoescultura?',
        content: [
            'La lipoescultura es una técnica avanzada de liposucción que no solo elimina grasa localizada, sino que también esculpe y define los contornos corporales. A diferencia de la liposucción tradicional, busca crear una silueta armónica y estética.',
            'Se puede realizar en múltiples zonas como abdomen, cintura, espalda, brazos, muslos y papada. La grasa extraída puede <strong class="text-primary">reinyectarse en otras áreas</strong> como glúteos o senos (lipotransferencia) para un resultado más completo.',
        ],
        image: '/images/procedures/lipoescultura-tecnica.jpg',
        highlights: {
            title: 'Zonas que se pueden tratar',
            icon: Target,
            items: [
                'Abdomen y cintura',
                'Espalda y "rollitos"',
                'Brazos y axilas',
                'Muslos internos y externos',
                'Papada y cuello',
                'Flancos y caderas',
            ],
        },
    },

    // Benefits
    benefits: [
        {
            icon: Target,
            title: 'Esculpido Preciso',
            description: 'Definición de contornos y eliminación selectiva de grasa.',
        },
        {
            icon: Zap,
            title: 'Grasa No Regresa',
            description: 'Las células de grasa eliminadas no se regeneran.',
        },
        {
            icon: Shield,
            title: 'Múltiples Zonas',
            description: 'Trata varias áreas en una sola cirugía.',
        },
        {
            icon: Heart,
            title: 'Resultados Naturales',
            description: 'Silueta armónica respetando tus proporciones.',
        },
    ],

    // Before & After Cases
    beforeAfter: [
        {
            before: '/images/before-after/lipoescultura-before.jpg',
            after: '/images/before-after/lipoescultura-after.jpg',
            label: 'Caso 1 - Lipoescultura 360',
        },
        {
            before: '/images/before-after/lipoescultura-before.jpg',
            after: '/images/before-after/lipoescultura-after.jpg',
            label: 'Caso 2 - Abdomen y cintura',
        },
    ],

    // Process Steps
    process: [
        {
            step: 1,
            title: 'Consulta de Valoración',
            description: 'Evaluación corporal, análisis de zonas a tratar y planificación personalizada.',
            duration: '45-60 min',
            icon: Calendar,
        },
        {
            step: 2,
            title: 'Preparación Pre-quirúrgica',
            description: 'Exámenes de laboratorio y preparación física para la cirugía.',
            duration: '1-2 semanas antes',
            icon: Shield,
        },
        {
            step: 3,
            title: 'Procedimiento Quirúrgico',
            description: 'Lipoescultura con técnica tumescente y cánulas finas para mayor precisión.',
            duration: '2-4 horas',
            icon: Sparkles,
        },
        {
            step: 4,
            title: 'Recuperación Inmediata',
            description: 'Alta el mismo día o al día siguiente según extensión del procedimiento.',
            duration: '1-2 días',
            icon: Timer,
        },
        {
            step: 5,
            title: 'Uso de Faja y Seguimiento',
            description: 'Faja compresiva, drenajes linfáticos y seguimiento hasta resultado final.',
            duration: '4-6 semanas',
            icon: Star,
        },
    ],

    // Videos
    videos: [
        {
            title: '¿Qué es la lipoescultura?',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '4:30',
            youtubeId: 'fUUGe4-wLnc',
        },
        {
            title: 'Lipoescultura 360: resultados completos',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '5:15',
        },
        {
            title: 'Recuperación de la lipoescultura',
            thumbnail: '/images/video-thumbnail.jpg',
            duration: '3:45',
        },
    ],

    // FAQs
    faqs: [
        {
            question: '¿La lipoescultura es para bajar de peso?',
            answer: 'No, la lipoescultura no es un tratamiento para la obesidad. Está diseñada para eliminar depósitos de grasa localizada que no responden a dieta y ejercicio. Los candidatos ideales están cerca de su peso ideal.',
        },
        {
            question: '¿La grasa vuelve a aparecer?',
            answer: 'Las células de grasa eliminadas no se regeneran. Sin embargo, si ganas peso, las células restantes pueden aumentar de tamaño. Mantener un peso estable asegura resultados duraderos.',
        },
        {
            question: '¿Cuántas zonas se pueden tratar?',
            answer: 'Dependiendo de tu estado de salud y la cantidad de grasa a extraer, se pueden tratar múltiples zonas en una sola cirugía: abdomen, cintura, espalda, brazos, muslos, etc.',
        },
        {
            question: '¿Qué es la lipoescultura 360?',
            answer: 'Es una lipoescultura que trata todo el torso de forma circunferencial: abdomen, cintura, espalda y flancos. Permite definir la cintura y crear una silueta más estilizada desde todos los ángulos.',
        },
        {
            question: '¿Cuánto tiempo debo usar la faja?',
            answer: 'Se recomienda usar faja compresiva las 24 horas durante las primeras 3-4 semanas, luego de forma progresiva hasta completar 6-8 semanas.',
        },
        {
            question: '¿Cuándo veré los resultados finales?',
            answer: 'Los resultados iniciales son visibles inmediatamente, pero la inflamación tarda en desaparecer. El resultado final se aprecia entre 3-6 meses después de la cirugía.',
        },
    ],

    // Doctor Section
    doctor: {
        credentials: [
            { value: '15+', label: 'Años de experiencia' },
            { value: '2500+', label: 'Lipoesculturas realizadas' },
            { value: '98%', label: 'Satisfacción de pacientes' },
            { value: '5', label: 'Calificación Google' },
        ],
    },

    // CTA Section
    cta: {
        title: 'Esculpe el cuerpo que siempre deseaste',
        description: 'Agenda tu consulta de valoración y descubre cómo la lipoescultura puede transformar tu silueta.',
    },
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function LipoesculturaPage() {
    return <ProcedurePage data={lipoesculturaData} />
}

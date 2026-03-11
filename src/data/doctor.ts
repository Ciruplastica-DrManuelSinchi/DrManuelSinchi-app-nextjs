export const doctorData = {
    name: 'Dr. Manuel Sinchi',
    title: 'Cirujano Plástico y Reconstructivo',
    credentials: {
        cmp: '58101',
        rne: '32231',
        rna: '3049',
    },
    quote: 'Combinando arte, ciencia y tecnología para lograr resultados naturales que realcen tu belleza única.',
    shortBio: 'Especialista con más de 15 años de experiencia en cirugía plástica, reconstructiva y medicina estética. Comprometido con resultados naturales y la seguridad del paciente.',
    fullBio: 'El Dr. Manuel Sinchi es un destacado cirujano plástico con formación en las mejores instituciones médicas de Perú y el extranjero. Su enfoque combina técnicas quirúrgicas avanzadas con un profundo respeto por la anatomía natural de cada paciente, buscando siempre resultados armoniosos que realcen la belleza individual.',

    stats: [
        { value: '+15', label: 'Años de experiencia', icon: 'calendar' },
        { value: '+5,000', label: 'Procedimientos realizados', icon: 'users' },
        { value: '100%', label: 'Compromiso con tu seguridad', icon: 'shield' },
    ],

    specialties: [
        {
            name: 'Cirugía Plástica',
            description: 'Procedimientos estéticos faciales y corporales con técnicas de vanguardia.',
            icon: 'sparkles',
        },
        {
            name: 'Medicina Estética',
            description: 'Tratamientos no invasivos para rejuvenecimiento y embellecimiento.',
            icon: 'heart',
        },
        {
            name: 'Cirugía Reconstructiva',
            description: 'Reconstrucción de tejidos afectados por accidentes, quemaduras o enfermedades.',
            icon: 'hand-helping',
        },
    ],

    education: [
        {
            year: '2010',
            title: 'Médico Cirujano',
            institution: 'Universidad de San Martín de Porres',
            type: 'degree',
        },
        {
            year: '2013-2014',
            title: 'Maestría en Salud Ocupacional',
            institution: 'Universidad Científica del Sur',
            type: 'masters',
        },
        {
            year: '2014-2017',
            title: 'Residencia en Cirugía Plástica',
            institution: 'Hospital Edgardo Rebagliati Martins',
            type: 'residency',
        },
        {
            year: '2017',
            title: 'Especialidad en Cirugía Plástica y Reconstructiva',
            institution: 'Universidad Peruana Cayetano Heredia',
            type: 'specialty',
        },
    ],

    experience: [
        {
            year: '2018 - Presente',
            position: 'Cirujano Plástico',
            institution: 'Hospital Nacional Hipólito Unanue',
        },
        {
            year: '2017',
            position: 'Cirujano Plástico',
            institution: 'Hospital de Alta Complejidad de La Libertad "Virgen de la Puerta"',
        },
        {
            year: '2014-2017',
            position: 'Médico Residente de Cirugía Plástica',
            institution: 'Hospital Edgardo Rebagliati Martins',
        },
    ],

    internationalTraining: [
        { country: 'Suecia', flag: '🇸🇪', institution: 'Hospital Universitario de Uppsala', highlight: true },
        { country: 'Estados Unidos', flag: '🇺🇸', institution: 'Entrenamiento especializado' },
        { country: 'Argentina', flag: '🇦🇷', institution: 'Formación complementaria' },
        { country: 'Uruguay', flag: '🇺🇾', institution: 'Capacitación avanzada' },
        { country: 'México', flag: '🇲🇽', institution: 'Actualización técnica' },
        { country: 'Bolivia', flag: '🇧🇴', institution: 'Intercambio profesional' },
    ],

    memberships: [
        { name: 'Colegio Médico del Perú', acronym: 'CMP' },
        { name: 'Sociedad Peruana de Cirugía Plástica', acronym: 'SPCP' },
        { name: 'Sociedad Peruana de Cirugía Plástica, Reconstructiva y Estética', acronym: 'SPCPRE' },
        { name: 'International Commission on Occupational Health', acronym: 'ICOH' },
    ],

    values: [
        {
            title: 'Seguridad ante todo',
            description: 'Protocolos rigurosos y técnicas probadas para garantizar tu bienestar.',
        },
        {
            title: 'Resultados naturales',
            description: 'Realzar tu belleza única respetando tu anatomía y proporciones.',
        },
        {
            title: 'Atención personalizada',
            description: 'Cada paciente es único. Escuchamos tus necesidades y diseñamos un plan a tu medida.',
        },
        {
            title: 'Actualización constante',
            description: 'Formación continua en las técnicas más avanzadas a nivel mundial.',
        },
    ],

    images: {
        portrait: '/images/dr-sinchi-portrait.jpg',
        full: '/images/dr-sinchi-full.jpg',
        surgery: '/images/dr-sinchi-surgery.jpg',
    },

    contact: {
        whatsapp: '+51999999999',
        email: 'contacto@ciruplastica.pe',
    },
}

export type DoctorData = typeof doctorData

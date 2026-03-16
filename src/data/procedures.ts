export interface ProcedureItem {
  id: string
  name: string
  category: 'facial' | 'corporal' | 'estetica' | 'reconstructiva'
  categoryLabel: string
  path: string
}

export const procedures: ProcedureItem[] = [
  // Cirugía Plástica Facial
  {
    id: 'rinoplastia',
    name: 'Rinoplastia',
    category: 'facial',
    categoryLabel: 'Cirugía Plástica Facial',
    path: '/cirugia-plastica-facial/rinoplastia',
  },
  {
    id: 'blefaroplastia',
    name: 'Blefaroplastia',
    category: 'facial',
    categoryLabel: 'Cirugía Plástica Facial',
    path: '/cirugia-plastica-facial/blefaroplastia',
  },
  {
    id: 'lifting-facial',
    name: 'Lifting Facial',
    category: 'facial',
    categoryLabel: 'Cirugía Plástica Facial',
    path: '/cirugia-plastica-facial/lifting-facial',
  },
  {
    id: 'bichectomia',
    name: 'Bichectomía',
    category: 'facial',
    categoryLabel: 'Cirugía Plástica Facial',
    path: '/cirugia-plastica-facial/bichectomia',
  },
  {
    id: 'mentoplastia',
    name: 'Mentoplastia',
    category: 'facial',
    categoryLabel: 'Cirugía Plástica Facial',
    path: '/cirugia-plastica-facial/mentoplastia',
  },
  {
    id: 'otoplastia',
    name: 'Otoplastia',
    category: 'facial',
    categoryLabel: 'Cirugía Plástica Facial',
    path: '/cirugia-plastica-facial/otoplastia',
  },
  {
    id: 'lipo-papada',
    name: 'Liposucción de Papada',
    category: 'facial',
    categoryLabel: 'Cirugía Plástica Facial',
    path: '/cirugia-plastica-facial/lipo-papada',
  },

  // Cirugía Plástica Corporal
  {
    id: 'lipo-escultura',
    name: 'Lipoescultura',
    category: 'corporal',
    categoryLabel: 'Cirugía Plástica Corporal',
    path: '/cirugia-plastica-corporal/lipo-escultura',
  },
  {
    id: 'abdominoplastia',
    name: 'Abdominoplastia',
    category: 'corporal',
    categoryLabel: 'Cirugía Plástica Corporal',
    path: '/cirugia-plastica-corporal/abdominoplastia',
  },
  {
    id: 'mamoplastia-aumento',
    name: 'Mamoplastia de Aumento',
    category: 'corporal',
    categoryLabel: 'Cirugía Plástica Corporal',
    path: '/cirugia-plastica-corporal/mamoplastia-aumento',
  },
  {
    id: 'mamoplastia-reduccion',
    name: 'Mamoplastia de Reducción',
    category: 'corporal',
    categoryLabel: 'Cirugía Plástica Corporal',
    path: '/cirugia-plastica-corporal/mamoplastia-reduccion',
  },
  {
    id: 'mastopexia',
    name: 'Mastopexia',
    category: 'corporal',
    categoryLabel: 'Cirugía Plástica Corporal',
    path: '/cirugia-plastica-corporal/mastopexia',
  },
  {
    id: 'gluteoplastia',
    name: 'Gluteoplastia',
    category: 'corporal',
    categoryLabel: 'Cirugía Plástica Corporal',
    path: '/cirugia-plastica-corporal/gluteoplastia',
  },
  {
    id: 'ginecomastia',
    name: 'Ginecomastia',
    category: 'corporal',
    categoryLabel: 'Cirugía Plástica Corporal',
    path: '/cirugia-plastica-corporal/ginecomastia',
  },

  // Medicina Estética
  {
    id: 'botox',
    name: 'Botox',
    category: 'estetica',
    categoryLabel: 'Medicina Estética',
    path: '/medicina-estetica/botox',
  },
  {
    id: 'acido-hialuronico',
    name: 'Ácido Hialurónico',
    category: 'estetica',
    categoryLabel: 'Medicina Estética',
    path: '/medicina-estetica/acido-hialuronico',
  },
  {
    id: 'rellenos-labios',
    name: 'Relleno de Labios',
    category: 'estetica',
    categoryLabel: 'Medicina Estética',
    path: '/medicina-estetica/rellenos-labios',
  },
  {
    id: 'plasma-rico-plaquetas',
    name: 'Plasma Rico en Plaquetas',
    category: 'estetica',
    categoryLabel: 'Medicina Estética',
    path: '/medicina-estetica/plasma-rico-plaquetas',
  },
  {
    id: 'extraccion-lunares',
    name: 'Extracción de Lunares',
    category: 'estetica',
    categoryLabel: 'Medicina Estética',
    path: '/medicina-estetica/extraccion-lunares',
  },

  // Cirugía Reconstructiva
  {
    id: 'cicatrices',
    name: 'Tratamiento de Cicatrices',
    category: 'reconstructiva',
    categoryLabel: 'Cirugía Reconstructiva',
    path: '/cirugia-reconstructiva/cicatrices',
  },
  {
    id: 'quemaduras',
    name: 'Reconstrucción de Quemaduras',
    category: 'reconstructiva',
    categoryLabel: 'Cirugía Reconstructiva',
    path: '/cirugia-reconstructiva/quemaduras',
  },
  {
    id: 'heridas-ulceras',
    name: 'Heridas y Úlceras',
    category: 'reconstructiva',
    categoryLabel: 'Cirugía Reconstructiva',
    path: '/cirugia-reconstructiva/heridas-ulceras',
  },
]

export const getProcedureById = (id: string) => {
  return procedures.find(p => p.id === id)
}

export const getProceduresByCategory = (category: string) => {
  return procedures.filter(p => p.category === category)
}

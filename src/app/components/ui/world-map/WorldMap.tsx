'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface TrainingLocation {
    country: string
    flag: string
    institution: string
    coordinates: { x: number; y: number }
    highlight?: boolean
}

const trainingLocations: TrainingLocation[] = [
    {
        country: 'Perú',
        flag: '🇵🇪',
        institution: 'Formación Base - Lima',
        coordinates: { x: 23, y: 62 },
        highlight: true
    },
    {
        country: 'Suecia',
        flag: '🇸🇪',
        institution: 'Hospital Universitario de Uppsala',
        coordinates: { x: 51, y: 22 },
        highlight: true
    },
    {
        country: 'Estados Unidos',
        flag: '🇺🇸',
        institution: 'Entrenamiento especializado',
        coordinates: { x: 18, y: 35 }
    },
    {
        country: 'México',
        flag: '🇲🇽',
        institution: 'Actualización técnica',
        coordinates: { x: 14, y: 42 }
    },
    {
        country: 'Argentina',
        flag: '🇦🇷',
        institution: 'Formación complementaria',
        coordinates: { x: 27, y: 75 }
    },
    {
        country: 'Uruguay',
        flag: '🇺🇾',
        institution: 'Capacitación avanzada',
        coordinates: { x: 30, y: 72 }
    },
    {
        country: 'Bolivia',
        flag: '🇧🇴',
        institution: 'Intercambio profesional',
        coordinates: { x: 26, y: 64 }
    },
]

export default function WorldMap() {
    const [activeLocation, setActiveLocation] = useState<TrainingLocation | null>(null)

    return (
        <div className="relative w-full">
            {/* Map Container */}
            <div className="relative aspect-[2/1] bg-gradient-to-b from-primary-50 to-primary-100 rounded-2xl overflow-hidden">
                {/* World Map SVG - Simplified */}
                <svg
                    viewBox="0 0 100 50"
                    className="w-full h-full"
                    preserveAspectRatio="xMidYMid slice"
                >
                    {/* Background Grid */}
                    <defs>
                        <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(57, 17, 66, 0.05)" strokeWidth="0.1"/>
                        </pattern>
                    </defs>
                    <rect width="100" height="50" fill="url(#grid)" />

                    {/* Simplified Continents */}
                    {/* North America */}
                    <path
                        d="M5,15 Q10,10 20,12 L25,15 L22,25 Q20,30 18,35 L15,40 Q12,42 10,40 L8,35 Q5,30 5,25 Z"
                        fill="rgba(57, 17, 66, 0.15)"
                        stroke="rgba(57, 17, 66, 0.3)"
                        strokeWidth="0.3"
                    />
                    {/* South America */}
                    <path
                        d="M20,45 Q22,42 25,45 L30,50 Q32,60 30,70 L28,78 Q25,82 22,78 L20,70 Q18,60 20,50 Z"
                        fill="rgba(57, 17, 66, 0.15)"
                        stroke="rgba(57, 17, 66, 0.3)"
                        strokeWidth="0.3"
                    />
                    {/* Europe */}
                    <path
                        d="M42,12 Q48,10 55,12 L58,18 Q56,22 52,24 L48,22 Q44,20 42,16 Z"
                        fill="rgba(57, 17, 66, 0.15)"
                        stroke="rgba(57, 17, 66, 0.3)"
                        strokeWidth="0.3"
                    />
                    {/* Africa */}
                    <path
                        d="M45,28 Q52,26 58,30 L60,40 Q58,50 52,52 L48,50 Q44,45 45,35 Z"
                        fill="rgba(57, 17, 66, 0.15)"
                        stroke="rgba(57, 17, 66, 0.3)"
                        strokeWidth="0.3"
                    />
                    {/* Asia */}
                    <path
                        d="M58,10 Q70,8 85,15 L90,25 Q88,35 80,38 L70,35 Q62,30 60,22 Z"
                        fill="rgba(57, 17, 66, 0.15)"
                        stroke="rgba(57, 17, 66, 0.3)"
                        strokeWidth="0.3"
                    />
                    {/* Australia */}
                    <path
                        d="M78,45 Q85,42 90,48 L88,55 Q82,58 78,52 Z"
                        fill="rgba(57, 17, 66, 0.15)"
                        stroke="rgba(57, 17, 66, 0.3)"
                        strokeWidth="0.3"
                    />

                    {/* Connection lines from Peru to other locations */}
                    {trainingLocations.filter(loc => loc.country !== 'Perú').map((location, index) => (
                        <motion.path
                            key={location.country}
                            d={`M23,62 Q${(23 + location.coordinates.x) / 2},${Math.min(location.coordinates.y, 62) - 15} ${location.coordinates.x},${location.coordinates.y}`}
                            fill="none"
                            stroke="rgba(212, 168, 83, 0.4)"
                            strokeWidth="0.3"
                            strokeDasharray="1,1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        />
                    ))}
                </svg>

                {/* Location Markers */}
                {trainingLocations.map((location, index) => (
                    <motion.div
                        key={location.country}
                        className="absolute cursor-pointer group"
                        style={{
                            left: `${location.coordinates.x}%`,
                            top: `${location.coordinates.y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 20,
                            delay: 0.5 + index * 0.1
                        }}
                        viewport={{ once: true }}
                        onMouseEnter={() => setActiveLocation(location)}
                        onMouseLeave={() => setActiveLocation(null)}
                    >
                        {/* Pulse effect for highlighted locations */}
                        {location.highlight && (
                            <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-30" />
                        )}

                        {/* Marker */}
                        <div className={`
                            relative w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-lg md:text-xl
                            shadow-lg transition-all duration-300 group-hover:scale-125 group-hover:z-10
                            ${location.highlight
                                ? 'bg-accent ring-2 ring-accent ring-offset-2'
                                : 'bg-white ring-1 ring-primary/20'
                            }
                        `}>
                            {location.flag}
                        </div>

                        {/* Tooltip */}
                        <div className={`
                            absolute left-1/2 -translate-x-1/2 bottom-full mb-2
                            bg-dark text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200
                            pointer-events-none z-20 shadow-lg
                        `}>
                            <div className="font-semibold">{location.country}</div>
                            <div className="text-white/70 text-[10px]">{location.institution}</div>
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-dark" />
                        </div>
                    </motion.div>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                    <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-accent ring-1 ring-accent ring-offset-1" />
                            <span className="text-gray-600">Formación destacada</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-white ring-1 ring-primary/30" />
                            <span className="text-gray-600">Capacitación</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Location Detail (Mobile) */}
            {activeLocation && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-white rounded-xl shadow-card md:hidden"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">{activeLocation.flag}</span>
                        <div>
                            <h4 className="font-semibold text-dark">{activeLocation.country}</h4>
                            <p className="text-sm text-gray-500">{activeLocation.institution}</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

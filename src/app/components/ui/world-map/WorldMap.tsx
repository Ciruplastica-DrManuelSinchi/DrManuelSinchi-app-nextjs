'use client'

import { motion } from 'framer-motion'

// Proyección Mercator lineal dentro de viewBox 0 0 100 50
// x = (lon + 180) / 360 * 100
// y = (90 − lat) / 180 * 50
const PERU = { x: 28.6, y: 28.3 }

const destinations = [
    {
        key: 'sweden',
        label: 'Suecia',
        x: 54.9,
        y: 8.4,
        highlight: true,
        anchor: 'start' as const,
        lx: 1.8,
        ly: 0.5,
    },
    {
        key: 'usa',
        label: 'EE.UU.',
        x: 23.6,
        y: 13.9,
        highlight: false,
        anchor: 'end' as const,
        lx: -1.8,
        ly: 0.5,
    },
    {
        key: 'mexico',
        label: 'México',
        x: 22.5,
        y: 20.6,
        highlight: false,
        anchor: 'end' as const,
        lx: -1.8,
        ly: 0.5,
    },
    {
        key: 'bolivia',
        label: 'Bolivia',
        x: 31.1,
        y: 31.2,
        highlight: false,
        anchor: 'start' as const,
        lx: 1.8,
        ly: -1.0,
    },
    {
        key: 'argentina',
        label: 'Argentina',
        x: 33.8,
        y: 34.6,
        highlight: false,
        anchor: 'start' as const,
        lx: 1.8,
        ly: 0.5,
    },
    {
        key: 'uruguay',
        label: 'Uruguay',
        x: 35.8,
        y: 36.5,
        highlight: false,
        anchor: 'start' as const,
        lx: 1.8,
        ly: 0.5,
    },
]

// Genera un arco cuadrático de Bézier desde Perú hasta el destino.
// La altura del arco escala con la distancia para que las conexiones
// lejanas (Suecia) tengan una curva más pronunciada.
function arcPath(dx: number, dy: number): string {
    const ddx = dx - PERU.x
    const ddy = dy - PERU.y
    const dist = Math.sqrt(ddx * ddx + ddy * ddy)
    const mx = (PERU.x + dx) / 2
    const cy = Math.min(PERU.y, dy) - Math.max(5, dist * 0.35)
    return `M${PERU.x},${PERU.y} Q${mx},${cy} ${dx},${dy}`
}

// Siluetas simplificadas de continentes en Mercator lineal.
// Los polígonos son aproximados pero reconocibles.
const continents = [
    {
        key: 'northAmerica',
        // Alaska → Ártico Canada → Labrador → Costa Este → Florida →
        // América Central → Pacífico México → Baja → California → BC
        d: 'M 5,6 L 12,4 L 22,5 L 34,7 L 36,11 L 34,13 L 30,15 L 28,18 L 27,21 L 23,22 L 20,20 L 19,18 L 15,14 L 14,9 Z',
    },
    {
        key: 'southAmerica',
        // Colombia/Ecuador → Venezuela NE → Brasil NE → Brasil SE →
        // Uruguay/Argentina E → Patagonia → Tierra del Fuego → Chile → Perú
        d: 'M 27,22 L 33,21 L 40,26 L 38,31 L 38,36 L 32,38 L 30,40 L 30,37 L 28,33 L 27,28 Z',
    },
    {
        key: 'europe',
        // Iberia → Francia/UK → Noruega N → Escandinavia → Finlandia →
        // Urales → Cáucaso → Turquía → Grecia → Italia → vuelta Iberia
        d: 'M 47,15 L 47,12 L 49,10 L 51,8 L 56,7 L 59,8 L 67,7 L 64,13 L 59,14 L 56,15 L 54,14 L 50,13 L 47,15 Z',
    },
    {
        key: 'africa',
        // Marruecos → Túnez → Egipto → Somalia → Cabo de Buena Esperanza →
        // Congo/Angola W → Senegal
        d: 'M 47,15 L 55,14 L 62,15 L 64,18 L 64,23 L 61,27 L 55,35 L 50,33 L 46,28 L 45,22 Z',
    },
    {
        key: 'asia',
        // Urales → Extremo Oriente → Japón/Corea → Indochina →
        // Bangladesh → punta India → Mumbai → Pakistán → Golfo → Cáucaso
        d: 'M 58,8 L 67,7 L 95,8 L 95,14 L 89,15 L 83,14 L 78,18 L 74,19 L 72,23 L 70,20 L 68,18 L 63,14 L 58,8 Z',
    },
    {
        key: 'australia',
        d: 'M 82,28 L 91,28 L 92,35 L 90,36 L 86,35 L 82,34 Z',
    },
]

const meridians = Array.from({ length: 19 }, (_, i) => +((i * 20) / 360 * 100).toFixed(2))
const parallels = Array.from({ length: 17 }, (_, i) => +((i * 10 + 10) / 180 * 50).toFixed(2))

export default function WorldMap() {
    return (
        <div
            className="relative rounded-2xl overflow-hidden shadow-card"
            style={{ background: '#0d1929' }}
        >
            <svg
                viewBox="0 0 100 50"
                className="w-full block"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Grid — meridianos */}
                {meridians.map((x, i) => (
                    <line key={`m${i}`} x1={x} y1={0} x2={x} y2={50}
                        stroke="rgba(255,255,255,0.025)" strokeWidth="0.15" />
                ))}
                {/* Grid — paralelos */}
                {parallels.map((y, i) => (
                    <line key={`p${i}`} x1={0} y1={y} x2={100} y2={y}
                        stroke="rgba(255,255,255,0.025)" strokeWidth="0.15" />
                ))}
                {/* Ecuador */}
                <line x1={0} y1={25} x2={100} y2={25}
                    stroke="rgba(255,255,255,0.07)" strokeWidth="0.2" strokeDasharray="1,0.8" />

                {/* Continentes */}
                {continents.map(({ key, d }) => (
                    <motion.path
                        key={key}
                        d={d}
                        fill="rgba(255,255,255,0.07)"
                        stroke="rgba(255,255,255,0.16)"
                        strokeWidth="0.3"
                        strokeLinejoin="round"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.0 }}
                    />
                ))}

                {/* Arcos de conexión */}
                {destinations.map((d, i) => (
                    <motion.path
                        key={`arc-${d.key}`}
                        d={arcPath(d.x, d.y)}
                        fill="none"
                        stroke={d.highlight ? '#d4a853' : 'rgba(255,255,255,0.40)'}
                        strokeWidth={d.highlight ? 0.40 : 0.22}
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.6, delay: 0.6 + i * 0.2, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    />
                ))}

                {/* Marcadores de destino */}
                {destinations.map((d, i) => (
                    <g key={d.key}>
                        {d.highlight && (
                            <motion.circle cx={d.x} cy={d.y} r={3}
                                fill="none" stroke="#d4a853" strokeWidth="0.25"
                                animate={{ r: [3, 5.5, 3], opacity: [0.7, 0, 0.7] }}
                                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5 }}
                            />
                        )}
                        <motion.circle
                            cx={d.x} cy={d.y}
                            r={d.highlight ? 1.5 : 1.1}
                            fill={d.highlight ? '#d4a853' : 'rgba(255,255,255,0.90)'}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.8 + i * 0.15, ease: 'backOut' }}
                            viewport={{ once: true }}
                        />
                        <motion.text
                            x={d.x + d.lx} y={d.y + d.ly}
                            fontSize="2.1" fontFamily="system-ui,sans-serif"
                            fontWeight={d.highlight ? '700' : '500'}
                            fill={d.highlight ? '#d4a853' : 'rgba(255,255,255,0.80)'}
                            textAnchor={d.anchor}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 1.2 + i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {d.label}
                        </motion.text>
                    </g>
                ))}

                {/* Perú — hub principal */}
                <motion.circle cx={PERU.x} cy={PERU.y} r={5}
                    fill="none" stroke="#d4a853" strokeWidth="0.22"
                    animate={{ r: [5, 8, 5], opacity: [0.35, 0, 0.35] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.circle cx={PERU.x} cy={PERU.y} r={2}
                    fill="#d4a853"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: 'backOut' }}
                    viewport={{ once: true }}
                />
                <motion.text x={PERU.x + 2.8} y={PERU.y - 1.2}
                    fontSize="2.1" fontFamily="system-ui,sans-serif" fontWeight="700"
                    fill="#d4a853"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    Lima, Perú
                </motion.text>
                <motion.text x={PERU.x + 2.8} y={PERU.y + 1.5}
                    fontSize="1.6" fontFamily="system-ui,sans-serif"
                    fill="rgba(212,168,83,0.6)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    Base principal
                </motion.text>
            </svg>

            {/* Leyenda */}
            <div className="absolute bottom-3 left-3 flex items-center gap-4 bg-white/8 backdrop-blur-sm rounded-lg px-3 py-2">
                <span className="flex items-center gap-1.5 text-[10px] text-white/55">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block" />
                    Formación destacada
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-white/55">
                    <span className="w-2 h-2 rounded-full bg-white/70 inline-block" />
                    Capacitación
                </span>
            </div>
        </div>
    )
}

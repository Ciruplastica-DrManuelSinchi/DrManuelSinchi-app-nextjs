'use client'

import { motion } from 'framer-motion'

// Proyección Mercator: x = (lon+180)/360*100, y = (90-lat)/180*50
const PERU = { x: 28.6, y: 28.3 }

const destinations = [
    { key: 'sweden', label: 'Suecia', x: 54.9, y: 8.4, highlight: true, anchor: 'start' as const, lx: 2, ly: 0.3 },
    { key: 'usa', label: 'EE.UU.', x: 23.6, y: 13.9, highlight: false, anchor: 'end' as const, lx: -2, ly: 0.3 },
    { key: 'mexico', label: 'México', x: 22.5, y: 20.6, highlight: false, anchor: 'end' as const, lx: -2, ly: 0.3 },
    { key: 'bolivia', label: 'Bolivia', x: 31.1, y: 31.2, highlight: false, anchor: 'start' as const, lx: 2, ly: -0.8 },
    { key: 'argentina', label: 'Argentina', x: 33.8, y: 34.6, highlight: false, anchor: 'start' as const, lx: 2, ly: 0.3 },
    { key: 'uruguay', label: 'Uruguay', x: 35.8, y: 36.5, highlight: false, anchor: 'start' as const, lx: 2, ly: 0.3 },
]

function arcPath(dx: number, dy: number): string {
    const ddx = dx - PERU.x
    const ddy = dy - PERU.y
    const dist = Math.sqrt(ddx * ddx + ddy * ddy)
    const mx = (PERU.x + dx) / 2
    const cy = Math.min(PERU.y, dy) - Math.max(5, dist * 0.35)
    return `M${PERU.x},${PERU.y} Q${mx},${cy} ${dx},${dy}`
}

// Contornos de continentes más detallados
const continents = [
    {
        key: 'northAmerica',
        d: 'M5,5 L8,3.5 L12,3 L16,4 L20,4.5 L24,5.5 L28,6 L32,6.5 L35,8 L36,10 L35,12 L33,13.5 L31,14.5 L29,16 L28,18 L27,20 L25,21.5 L23,22 L21,21 L20,19.5 L19,18 L17,16 L15,14 L13,11 L11,9 L8,7 L5,6 Z',
    },
    {
        key: 'centralAmerica',
        d: 'M23,22 L24,23 L25,23.5 L26,23 L27,22.5 L27,23.5 L26,24 L25,24.5 L24,24 L23,23 Z',
    },
    {
        key: 'southAmerica',
        d: 'M27,22 L29,21 L32,20.5 L35,21 L38,22 L40,24 L41,26 L40,28 L39,30 L38,32 L37,34 L36,36 L34,38 L32,39 L30,40 L29,38 L28,36 L27,33 L26,30 L26,27 L26.5,25 L27,23 Z',
    },
    {
        key: 'europe',
        d: 'M46,15 L47,13 L48,11 L49,9.5 L51,8.5 L53,7.5 L55,7 L57,7.5 L59,8 L61,7.5 L63,7 L65,7.5 L67,8 L66,10 L65,12 L63,13 L61,14 L59,14.5 L57,15 L55,14.5 L53,14 L51,13.5 L49,14 L47,15 Z',
    },
    {
        key: 'africa',
        d: 'M47,15.5 L49,15 L52,14.5 L55,14.5 L58,15 L61,15 L63,16 L64,18 L65,20 L64,23 L63,26 L61,28 L59,31 L56,34 L53,35 L50,34 L48,31 L46,28 L45,25 L44,22 L45,19 L46,17 Z',
    },
    {
        key: 'asia',
        d: 'M59,8 L63,7 L67,6.5 L72,6 L77,6.5 L82,7 L87,7.5 L91,8 L94,9 L96,11 L95,13 L93,14 L90,15 L87,14.5 L84,14 L81,15 L78,17 L76,18 L74,19.5 L72,21 L70,22 L68,20 L66,18 L64,16 L63,14 L61,12 L59,10 Z',
    },
    {
        key: 'india',
        d: 'M72,21 L74,19.5 L76,20 L77,22 L76,25 L74,27 L72,26 L71,24 L71,22 Z',
    },
    {
        key: 'seAsia',
        d: 'M81,20 L84,19 L86,20 L87,22 L86,24 L84,23 L82,22 L81,21 Z',
    },
    {
        key: 'australia',
        d: 'M83,28 L86,27 L89,27.5 L92,28 L93,30 L93,33 L91,35 L88,36 L85,35 L83,33 L82,31 L82,29 Z',
    },
    {
        key: 'nz',
        d: 'M95,34 L96,33 L96.5,35 L96,36.5 L95,36 Z',
    },
]

export default function WorldMap() {
    return (
        <div className="relative rounded-3xl overflow-hidden shadow-strong" style={{ background: 'linear-gradient(135deg, #080e1a 0%, #0d1929 40%, #101d30 100%)' }}>
            {/* Ambient glow effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute w-[500px] h-[300px] rounded-full blur-[120px] opacity-[0.07]" style={{ background: '#d4a853', top: '20%', left: '15%' }} />
                <div className="absolute w-[400px] h-[250px] rounded-full blur-[100px] opacity-[0.05]" style={{ background: '#7b2fa0', top: '40%', right: '10%' }} />
            </div>

            <svg viewBox="0 0 100 50" className="w-full block relative z-10" preserveAspectRatio="xMidYMid meet">
                <defs>
                    {/* Gradiente dorado para arcos destacados */}
                    <linearGradient id="arcGold" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#d4a853" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#d4a853" stopOpacity="1" />
                        <stop offset="100%" stopColor="#d4a853" stopOpacity="0.2" />
                    </linearGradient>
                    {/* Gradiente blanco para arcos normales */}
                    <linearGradient id="arcWhite" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fff" stopOpacity="0.05" />
                        <stop offset="50%" stopColor="#fff" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#fff" stopOpacity="0.05" />
                    </linearGradient>
                    {/* Glow para Perú */}
                    <radialGradient id="peruGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#d4a853" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#d4a853" stopOpacity="0" />
                    </radialGradient>
                    {/* Glow para destinos */}
                    <radialGradient id="destGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="highlightGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#d4a853" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#d4a853" stopOpacity="0" />
                    </radialGradient>
                    {/* Filtro de glow */}
                    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="0.4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Grid sutil con puntos */}
                {Array.from({ length: 50 }, (_, i) =>
                    Array.from({ length: 25 }, (_, j) => {
                        const x = i * 2 + 1
                        const y = j * 2 + 1
                        return (
                            <circle
                                key={`dot-${i}-${j}`}
                                cx={x}
                                cy={y}
                                r={0.08}
                                fill="rgba(255,255,255,0.06)"
                            />
                        )
                    })
                )}

                {/* Continentes con estilo premium */}
                {continents.map(({ key, d }) => (
                    <motion.path
                        key={key}
                        d={d}
                        fill="rgba(255,255,255,0.04)"
                        stroke="rgba(255,255,255,0.12)"
                        strokeWidth="0.25"
                        strokeLinejoin="round"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                        viewport={{ once: true }}
                    />
                ))}

                {/* Arco de fondo (glow sutil) para las conexiones destacadas */}
                {destinations.filter(d => d.highlight).map((d) => (
                    <motion.path
                        key={`glow-${d.key}`}
                        d={arcPath(d.x, d.y)}
                        fill="none"
                        stroke="#d4a853"
                        strokeWidth={1.5}
                        strokeOpacity={0.08}
                        filter="url(#softGlow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, delay: 0.4, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    />
                ))}

                {/* Arcos de conexión */}
                {destinations.map((d, i) => (
                    <motion.path
                        key={`arc-${d.key}`}
                        d={arcPath(d.x, d.y)}
                        fill="none"
                        stroke={d.highlight ? 'url(#arcGold)' : 'url(#arcWhite)'}
                        strokeWidth={d.highlight ? 0.45 : 0.2}
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.8, delay: 0.6 + i * 0.15, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    />
                ))}

                {/* Partículas viajeras en arcos destacados */}
                {destinations.filter(d => d.highlight).map((d) => {
                    const path = arcPath(d.x, d.y)
                    return (
                        <g key={`particle-${d.key}`}>
                            <path id={`path-${d.key}`} d={path} fill="none" stroke="none" />
                            <motion.circle
                                r={0.6}
                                fill="#d4a853"
                                filter="url(#softGlow)"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: [0, 1, 1, 0] }}
                                transition={{ duration: 3, delay: 2, repeat: Infinity, repeatDelay: 1 }}
                                viewport={{ once: true }}
                            >
                                <animateMotion dur="3s" repeatCount="indefinite" begin="2s">
                                    <mpath href={`#path-${d.key}`} />
                                </animateMotion>
                            </motion.circle>
                        </g>
                    )
                })}

                {/* Marcadores de destino */}
                {destinations.map((d, i) => (
                    <g key={d.key}>
                        {/* Glow suave bajo cada marcador */}
                        <circle
                            cx={d.x} cy={d.y}
                            r={d.highlight ? 3 : 2}
                            fill={d.highlight ? 'url(#highlightGlow)' : 'url(#destGlow)'}
                        />

                        {/* Anillo pulsante */}
                        <motion.circle
                            cx={d.x} cy={d.y} r={2.5}
                            fill="none"
                            stroke={d.highlight ? '#d4a853' : 'rgba(255,255,255,0.5)'}
                            strokeWidth="0.15"
                            animate={{ r: [2.5, 4.5, 2.5], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                        />

                        {/* Punto central */}
                        <motion.circle
                            cx={d.x} cy={d.y}
                            r={d.highlight ? 1.2 : 0.8}
                            fill={d.highlight ? '#d4a853' : 'rgba(255,255,255,0.9)'}
                            stroke={d.highlight ? '#d4a853' : 'rgba(255,255,255,0.4)'}
                            strokeWidth={0.3}
                            filter={d.highlight ? 'url(#softGlow)' : undefined}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 + i * 0.12, ease: 'backOut' }}
                            viewport={{ once: true }}
                        />

                        {/* Etiqueta con fondo pill */}
                        <motion.g
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 1.2 + i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Fondo de la etiqueta */}
                            <rect
                                x={d.anchor === 'start' ? d.x + d.lx - 0.5 : d.x + d.lx - (d.label.length * 1.15 + 0.5)}
                                y={d.y + d.ly - 1.6}
                                width={d.label.length * 1.15 + 1}
                                height={2.6}
                                rx={1.3}
                                fill={d.highlight ? 'rgba(212,168,83,0.15)' : 'rgba(255,255,255,0.06)'}
                                stroke={d.highlight ? 'rgba(212,168,83,0.25)' : 'rgba(255,255,255,0.1)'}
                                strokeWidth={0.15}
                            />
                            <text
                                x={d.x + d.lx + (d.anchor === 'start' ? 0 : 0)}
                                y={d.y + d.ly + 0.2}
                                fontSize="1.7"
                                fontFamily="system-ui, -apple-system, sans-serif"
                                fontWeight={d.highlight ? '700' : '500'}
                                fill={d.highlight ? '#d4a853' : 'rgba(255,255,255,0.75)'}
                                textAnchor={d.anchor}
                                letterSpacing="0.03"
                            >
                                {d.label}
                            </text>
                        </motion.g>
                    </g>
                ))}

                {/* Perú — hub principal */}
                {/* Glow grande */}
                <circle cx={PERU.x} cy={PERU.y} r={6} fill="url(#peruGlow)" />

                {/* Anillos pulsantes */}
                <motion.circle cx={PERU.x} cy={PERU.y} r={4}
                    fill="none" stroke="#d4a853" strokeWidth="0.15"
                    animate={{ r: [4, 7, 4], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.circle cx={PERU.x} cy={PERU.y} r={3}
                    fill="none" stroke="#d4a853" strokeWidth="0.1"
                    animate={{ r: [3, 5.5, 3], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />

                {/* Punto central Perú */}
                <motion.circle cx={PERU.x} cy={PERU.y} r={2}
                    fill="#d4a853"
                    filter="url(#softGlow)"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: 'backOut' }}
                    viewport={{ once: true }}
                />
                {/* Punto interior blanco */}
                <circle cx={PERU.x} cy={PERU.y} r={0.7} fill="rgba(255,255,255,0.9)" />

                {/* Label Perú con pill de fondo */}
                <motion.g
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <rect
                        x={PERU.x + 3} y={PERU.y - 3.2}
                        width={14} height={5}
                        rx={2.5}
                        fill="rgba(212,168,83,0.12)"
                        stroke="rgba(212,168,83,0.2)"
                        strokeWidth={0.15}
                    />
                    <text x={PERU.x + 10} y={PERU.y - 1.2}
                        fontSize="2" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700"
                        fill="#d4a853" textAnchor="middle" letterSpacing="0.05"
                    >
                        Lima, Perú
                    </text>
                    <text x={PERU.x + 10} y={PERU.y + 0.8}
                        fontSize="1.3" fontFamily="system-ui, -apple-system, sans-serif"
                        fill="rgba(212,168,83,0.5)" textAnchor="middle" letterSpacing="0.08"
                    >
                        Base principal
                    </text>
                </motion.g>
            </svg>

            {/* Leyenda premium */}
            <div className="absolute bottom-4 left-4 flex items-center gap-5 bg-white/[0.04] backdrop-blur-md border border-white/[0.06] rounded-xl px-4 py-2.5">
                <span className="flex items-center gap-2 text-[11px] text-white/50 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_6px_rgba(212,168,83,0.4)]" />
                    Formación destacada
                </span>
                <span className="w-px h-3 bg-white/10" />
                <span className="flex items-center gap-2 text-[11px] text-white/50 font-medium">
                    <span className="w-2 h-2 rounded-full bg-white/70" />
                    Capacitación
                </span>
            </div>
        </div>
    )
}

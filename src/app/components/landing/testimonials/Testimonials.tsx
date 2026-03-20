'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import styles from './Testimonials.module.css'

type TestimonialSource = 'google' | 'whatsapp' | 'facebook' | 'instagram'

interface Testimonial {
    id: number
    name: string
    text: string
    rating: number
    source: TestimonialSource
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Pilar del Castillo',
        text: 'Excelente atención y resultados. El Dr. Sinchi me explicó todo el proceso con mucha claridad y profesionalismo. Los resultados superaron mis expectativas.',
        rating: 5,
        source: 'google',
    },
    {
        id: 2,
        name: 'Eduardo Carhuas',
        text: 'Muy buen servicio y profesionalismo por parte del doctor. Me sentí en confianza desde la primera consulta. Lo recomiendo ampliamente.',
        rating: 5,
        source: 'whatsapp',
    },
    {
        id: 3,
        name: 'Daniel Castañeda',
        text: 'Quiero expresar mi agradecimiento al Dr. Sinchi por el excelente trabajo realizado en mi cirugía. El trato fue 10/10, siempre amable y profesional.',
        rating: 5,
        source: 'google',
    },
    {
        id: 4,
        name: 'Vilma Rodriguez Quiroz',
        text: 'Excelente profesional, resultado 100% garantizado.',
        rating: 5,
        source: 'facebook',
    },
    {
        id: 5,
        name: 'Ana García',
        text: 'Después de mucho buscar, encontré al Dr. Sinchi y fue la mejor decisión. Profesionalismo y resultados excepcionales.',
        rating: 5,
        source: 'instagram',
    },
    {
        id: 6,
        name: 'Roberto Mendoza',
        text: 'Excelente doctor, muy profesional y atento. Los resultados fueron exactamente lo que esperaba. Totalmente recomendado.',
        rating: 5,
        source: 'whatsapp',
    },
]

const sourceConfig = {
    google: {
        name: 'Google Reviews',
        color: '#4285F4',
        icon: (
            <svg viewBox="0 0 24 24" className={styles.sourceIcon}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
        ),
    },
    whatsapp: {
        name: 'WhatsApp',
        color: '#25D366',
        icon: (
            <svg viewBox="0 0 24 24" className={styles.sourceIcon}>
                <path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
        ),
    },
    facebook: {
        name: 'Facebook',
        color: '#1877F2',
        icon: (
            <svg viewBox="0 0 24 24" className={styles.sourceIcon}>
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
        ),
    },
    instagram: {
        name: 'Instagram',
        color: '#E4405F',
        icon: (
            <svg viewBox="0 0 24 24" className={styles.sourceIcon}>
                <defs>
                    <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFDC80"/>
                        <stop offset="50%" stopColor="#F77737"/>
                        <stop offset="100%" stopColor="#E4405F"/>
                    </linearGradient>
                </defs>
                <path fill="url(#instagram-gradient)" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
            </svg>
        ),
    },
}

const StarRating = ({ rating }: { rating: number }) => (
    <div className={styles.stars}>
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`w-5 h-5 ${i < rating ? styles.starFilled : styles.starEmpty}`}
                fill={i < rating ? '#FBBC05' : 'none'}
                stroke={i < rating ? '#FBBC05' : '#ddd'}
            />
        ))}
    </div>
)

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
    const source = sourceConfig[testimonial.source]

    return (
        <div className={styles.card}>
            <StarRating rating={testimonial.rating} />
            <p className={styles.text}>
                &ldquo;{testimonial.text}&rdquo;
            </p>
            <div className={styles.author}>
                <span className={styles.name}>{testimonial.name}</span>
                <div className={styles.sourceWrapper}>
                    {source.icon}
                    <span className={styles.source}>{source.name}</span>
                </div>
            </div>
        </div>
    )
}

export default function Testimonials() {
    const duplicatedTestimonials = [...testimonials, ...testimonials]

    return (
        <section className={styles.section}>
            {/* Header */}
            <div className="container-custom">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className={styles.title}>
                        Lo que dicen nuestros pacientes
                    </h2>
                    <p className={styles.subtitle}>
                        Historias reales de transformación y confianza
                    </p>
                </motion.div>
            </div>

            {/* Mobile: Carrusel deslizable */}
            <div className={styles.mobileCarousel}>
                {testimonials.map((testimonial) => (
                    <TestimonialCard
                        key={`mobile-${testimonial.id}`}
                        testimonial={testimonial}
                    />
                ))}
                {/* Spacer para mostrar parte del siguiente */}
                <div className={styles.mobileCarouselSpacer} aria-hidden="true" />
            </div>

            {/* Desktop: Marquee Container */}
            <div className={styles.marqueeWrapper}>
                <div className={styles.marquee}>
                    <div className={styles.marqueeContent}>
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={`${testimonial.id}-${index}`}
                                testimonial={testimonial}
                            />
                        ))}
                    </div>
                    <div className={styles.marqueeContent} aria-hidden="true">
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={`${testimonial.id}-duplicate-${index}`}
                                testimonial={testimonial}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Trusted Sources */}
            <div className="container-custom">
                <motion.div
                    className={styles.trustedSources}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <span className={styles.trustedText}>Reseñas verificadas en</span>
                    <div className={styles.sourcesLogos}>
                        <div className={styles.sourceLogo}>
                            {sourceConfig.google.icon}
                            <span>Google</span>
                        </div>
                        <div className={styles.sourceLogo}>
                            {sourceConfig.facebook.icon}
                            <span>Facebook</span>
                        </div>
                        <div className={styles.sourceLogo}>
                            {sourceConfig.whatsapp.icon}
                            <span>WhatsApp</span>
                        </div>
                        <div className={styles.sourceLogo}>
                            {sourceConfig.instagram.icon}
                            <span>Instagram</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

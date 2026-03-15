'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

interface Testimonial {
    id: number
    name: string
    procedure: string
    text: string
    rating: number
    image?: string
}

interface TestimonialsCarouselProps {
    testimonials: Testimonial[]
    autoplayDelay?: number
}

export default function TestimonialsCarousel({
    testimonials,
    autoplayDelay = 5000,
}: TestimonialsCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'center',
            skipSnaps: false,
        },
        [
            Autoplay({
                delay: autoplayDelay,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
            }),
        ]
    )

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext()
    }, [emblaApi])

    const scrollTo = useCallback(
        (index: number) => {
            emblaApi?.scrollTo(index)
        },
        [emblaApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        setScrollSnaps(emblaApi.scrollSnapList())
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)

        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', onSelect)
        }
    }, [emblaApi, onSelect])

    return (
        <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3 md:px-4"
                        >
                            <motion.div
                                className="h-full"
                                animate={{
                                    scale: index === selectedIndex ? 1 : 0.95,
                                    opacity: index === selectedIndex ? 1 : 0.7,
                                }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                                <div className="glass-card rounded-2xl p-6 md:p-8 h-full flex flex-col relative overflow-hidden group">
                                    {/* Quote Icon Background */}
                                    <div className="absolute -top-4 -right-4 w-24 h-24 text-white/5">
                                        <Quote className="w-full h-full" />
                                    </div>

                                    {/* Stars */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < testimonial.rating
                                                        ? 'text-accent fill-accent'
                                                        : 'text-white/20'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <p className="text-white/90 leading-relaxed mb-6 flex-1 italic text-sm md:text-base">
                                        &ldquo;{testimonial.text}&rdquo;
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                        {/* Avatar */}
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-semibold text-lg">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-sm text-accent">
                                                {testimonial.procedure}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover glow effect */}
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={scrollPrev}
                className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 z-10"
                aria-label="Anterior testimonio"
            >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
                onClick={scrollNext}
                className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 z-10"
                aria-label="Siguiente testimonio"
            >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === selectedIndex
                                ? 'w-8 bg-accent'
                                : 'w-2 bg-white/30 hover:bg-white/50'
                            }`}
                        aria-label={`Ir a testimonio ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)

    const phoneNumber = '51961360074'
    const defaultMessage = 'Hola Dr. Sinchi, me gustaría agendar una consulta de valoración.'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`

    // Mostrar el botón después de un pequeño delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 1500)

        // Mostrar tooltip después de 5 segundos
        const tooltipTimer = setTimeout(() => {
            setShowTooltip(true)
        }, 5000)

        return () => {
            clearTimeout(timer)
            clearTimeout(tooltipTimer)
        }
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                    {/* Tooltip */}
                    <AnimatePresence>
                        {showTooltip && (
                            <motion.div
                                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                                className="relative bg-white rounded-xl shadow-lg p-4 max-w-[250px] mr-2"
                            >
                                <button
                                    onClick={() => setShowTooltip(false)}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                                >
                                    <X className="w-3 h-3 text-gray-500" />
                                </button>
                                <p className="text-sm text-gray-700">
                                    <span className="font-semibold text-primary">¿Tienes dudas?</span>
                                    <br />
                                    Escríbenos por WhatsApp y te responderemos a la brevedad.
                                </p>
                                {/* Flecha del tooltip */}
                                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45 shadow-lg" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Botón de WhatsApp */}
                    <motion.a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative group"
                    >
                        {/* Pulse animation rings */}
                        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
                        <span className="absolute inset-0 rounded-full bg-green-500 animate-pulse opacity-40" />

                        {/* Button */}
                        <div className="relative w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                            {/* WhatsApp Icon */}
                            <svg
                                viewBox="0 0 32 32"
                                className="w-8 h-8 text-white fill-current"
                            >
                                <path d="M16.004 0C7.164 0 0 7.163 0 16c0 2.825.736 5.545 2.137 7.96L.075 32l8.267-2.063A15.91 15.91 0 0016.004 32c8.84 0 16-7.164 16-16S24.844 0 16.004 0zm0 29.333c-2.56 0-5.067-.693-7.253-2l-.52-.307-5.387 1.347 1.36-5.28-.337-.533A13.17 13.17 0 012.667 16c0-7.36 5.973-13.333 13.337-13.333S29.337 8.64 29.337 16s-5.973 13.333-13.333 13.333zm7.333-10c-.4-.2-2.373-1.173-2.74-1.307-.367-.133-.633-.2-.9.2-.267.4-1.033 1.307-1.267 1.573-.233.267-.467.3-.867.1-.4-.2-1.687-.62-3.213-1.98-1.187-1.06-1.987-2.367-2.22-2.767-.233-.4-.027-.617.173-.817.18-.18.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.327-.78-.66-.673-.9-.687-.233-.013-.5-.013-.767-.013s-.7.1-1.067.5c-.367.4-1.4 1.367-1.4 3.333s1.433 3.867 1.633 4.133c.2.267 2.82 4.307 6.833 6.033.953.413 1.7.66 2.28.847.96.307 1.833.263 2.523.16.77-.113 2.373-.967 2.707-1.9.333-.933.333-1.733.233-1.9-.1-.167-.367-.267-.767-.467z"/>
                            </svg>

                            {/* Hover glow effect */}
                            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        </div>

                        {/* Label on hover (desktop) */}
                        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none hidden md:block">
                            Escríbenos por WhatsApp
                            <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-gray-900" />
                        </div>
                    </motion.a>
                </div>
            )}
        </AnimatePresence>
    )
}

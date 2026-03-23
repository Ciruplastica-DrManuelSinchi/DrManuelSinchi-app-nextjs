'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import BeforeAfterSlider from '@/app/components/ui/before-after-slider/BeforeAfterSlider'

interface Case {
    id: string | number
    procedure: string
    category: string
    categoryLabel?: string
    categoryPath: string
    patientInfo: string
    description: string
    beforeImage: string
    afterImage: string
    procedureSlug: string
}

interface CaseModalProps {
    isOpen: boolean
    onClose: () => void
    currentCase: Case | null
    cases: Case[]
    onNavigate: (direction: 'prev' | 'next') => void
    currentIndex: number
}

export default function CaseModal({
    isOpen,
    onClose,
    currentCase,
    cases,
    onNavigate,
    currentIndex,
}: CaseModalProps) {
    // Cerrar con ESC
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose()
        } else if (e.key === 'ArrowLeft') {
            onNavigate('prev')
        } else if (e.key === 'ArrowRight') {
            onNavigate('next')
        }
    }, [onClose, onNavigate])

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, handleKeyDown])

    const t = useTranslations('caseModal')

    if (!currentCase) return null

    // Mapeo de categorías como fallback
    const categoryLabels: Record<string, string> = {
        facial: t('categoryLabels.facial'),
        corporal: t('categoryLabels.corporal'),
        estetica: t('categoryLabels.estetica'),
        reconstructiva: t('categoryLabels.reconstructiva'),
    }

    const categoryLabel = currentCase.categoryLabel || categoryLabels[currentCase.category] || currentCase.category

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-700" />
                        </button>

                        {/* Image Section */}
                        <div className="relative w-full md:w-3/5 bg-gray-100">
                            <BeforeAfterSlider
                                beforeImage={currentCase.beforeImage}
                                afterImage={currentCase.afterImage}
                                className="!rounded-none md:!rounded-l-3xl !aspect-[4/5] md:!aspect-auto md:h-full"
                            />

                            {/* Navigation Arrows */}
                            {cases.length > 1 && (
                                <>
                                    <button
                                        onClick={() => onNavigate('prev')}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
                                        disabled={currentIndex === 0}
                                    >
                                        <ChevronLeft className={`w-6 h-6 ${currentIndex === 0 ? 'text-gray-300' : 'text-gray-700'}`} />
                                    </button>
                                    <button
                                        onClick={() => onNavigate('next')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
                                        disabled={currentIndex === cases.length - 1}
                                    >
                                        <ChevronRight className={`w-6 h-6 ${currentIndex === cases.length - 1 ? 'text-gray-300' : 'text-gray-700'}`} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Info Section */}
                        <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between">
                            <div>
                                {/* Category Badge */}
                                <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                                    {categoryLabel}
                                </span>

                                {/* Procedure Name */}
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-dark mb-3">
                                    {currentCase.procedure}
                                </h2>

                                {/* Patient Info */}
                                <p className="text-sm text-gray-500 mb-4">
                                    {currentCase.patientInfo}
                                </p>

                                {/* Description */}
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {currentCase.description}
                                </p>

                                {/* Case Counter */}
                                <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                                    <span>{t('caseCounter', { current: currentIndex + 1, total: cases.length })}</span>
                                    <div className="flex gap-1">
                                        {cases.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`w-2 h-2 rounded-full transition-colors ${
                                                    idx === currentIndex ? 'bg-primary' : 'bg-gray-200'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <Link
                                    href={`/${currentCase.categoryPath}/${currentCase.procedureSlug}`}
                                    className="btn-primary w-full justify-center"
                                    onClick={onClose}
                                >
                                    {t('viewProcedure')}
                                    <ExternalLink className="w-4 h-4" />
                                </Link>
                                <a
                                    href={`https://wa.me/51961360074?text=${encodeURIComponent(t('whatsappMessage', { procedure: currentCase.procedure }))}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary w-full justify-center"
                                >
                                    {t('whatsappConsult')}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

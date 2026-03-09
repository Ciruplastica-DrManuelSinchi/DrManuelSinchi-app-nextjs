'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Minus, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
    {
        id: 1,
        question: '¿Cuánto tiempo dura la recuperación?',
        answer: 'El tiempo de recuperación varía según el procedimiento. En general, los procedimientos faciales requieren entre 1-2 semanas, mientras que las cirugías corporales pueden necesitar 2-4 semanas antes de retomar actividades normales.',
    },
    {
        id: 2,
        question: '¿Los resultados son permanentes?',
        answer: 'La mayoría de los procedimientos quirúrgicos ofrecen resultados duraderos. Sin embargo, factores como el envejecimiento natural, cambios de peso y estilo de vida pueden afectar los resultados a largo plazo.',
    },
    {
        id: 3,
        question: '¿Qué tipo de anestesia se utiliza?',
        answer: 'Dependiendo del procedimiento, utilizamos anestesia local, sedación o anestesia general. El Dr. Sinchi evaluará su caso particular y le recomendará la opción más segura y cómoda.',
    },
    {
        id: 4,
        question: '¿Ofrecen financiamiento?',
        answer: 'Sí, contamos con opciones de financiamiento flexible para que pueda realizar su procedimiento. Consulte con nuestro equipo para conocer los planes disponibles.',
    },
    {
        id: 5,
        question: '¿Cuándo puedo ver los resultados finales?',
        answer: 'Los resultados iniciales son visibles desde las primeras semanas, pero el resultado final se aprecia entre 3-6 meses después del procedimiento, una vez que la inflamación ha disminuido completamente.',
    },
]

export default function FAQ() {
    const [openId, setOpenId] = useState<number | null>(1)

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? null : id)
    }

    return (
        <section className="section bg-white">
            <div className="container-custom">
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

                    {/* Intro */}
                    <div className="lg:col-span-2">
                        <h2 className="font-display text-3xl md:text-4xl text-dark mb-6">
                            Preguntas Frecuentes
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Resolvemos las dudas más comunes de nuestros pacientes antes de su consulta.
                        </p>
                        <Link href="/preguntas-frecuentes" className="btn-primary inline-flex">
                            Ver todas las preguntas
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Lista de FAQs */}
                    <div className="lg:col-span-3 space-y-4">
                        {faqs.map((faq) => (
                            <div
                                key={faq.id}
                                className={`rounded-xl overflow-hidden transition-colors duration-300 ${openId === faq.id ? 'bg-primary-50' : 'bg-light'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-primary-50 transition-colors"
                                >
                                    <span className="font-semibold text-dark pr-4">
                                        {faq.question}
                                    </span>
                                    <span className="text-primary flex-shrink-0">
                                        {openId === faq.id ? (
                                            <Minus className="w-5 h-5" />
                                        ) : (
                                            <Plus className="w-5 h-5" />
                                        )}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {openId === faq.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-5 text-gray-600">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

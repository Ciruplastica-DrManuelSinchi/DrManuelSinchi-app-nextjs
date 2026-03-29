'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Calendar,
  MessageCircle,
  Sparkles,
  ClipboardCheck,
  ArrowRight,
  RotateCcw,
  Star,
  Shield,
  UserCheck,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export interface AssessmentQuestion {
  id: string
  question: string
  options: {
    label: string
    value: 'positive' | 'neutral' | 'concern'
  }[]
}

export interface SelfAssessmentProps {
  procedureName: string
  procedureSlug: string
  questions: AssessmentQuestion[]
  whatsappNumber?: string
  whatsappMessage?: string
}

type ResultType = 'ideal' | 'good' | 'evaluate'

export default function SelfAssessment({
  procedureName,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  procedureSlug,
  questions,
  whatsappNumber = '51961360074',
  whatsappMessage,
}: SelfAssessmentProps) {
  const t = useTranslations('selfAssessment')
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    // Avanzar automáticamente después de un breve delay
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setShowResult(true)
      }
    }, 300)
  }

  const calculateResult = (): ResultType => {
    const values = Object.values(answers)
    const positiveCount = values.filter((v) => v === 'positive').length
    const concernCount = values.filter((v) => v === 'concern').length

    if (positiveCount >= questions.length * 0.7 && concernCount === 0) {
      return 'ideal'
    } else if (concernCount <= 1) {
      return 'good'
    } else {
      return 'evaluate'
    }
  }

  const resetAssessment = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResult(false)
  }

  const result = showResult ? calculateResult() : null

  const resultConfig = {
    ideal: {
      icon: Star,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      iconBg: 'bg-green-100',
    },
    good: {
      icon: UserCheck,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      iconBg: 'bg-blue-100',
    },
    evaluate: {
      icon: Shield,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-700',
      iconBg: 'bg-amber-100',
    },
  };

  const defaultWhatsappMessage = whatsappMessage || t('whatsappMessage', { procedure: procedureName });

  return (
    <section className="section bg-gradient-to-b from-primary-50 to-white">
      <div className="container-custom">
        <div className="section-header">
          <span className="badge-accent mb-4">
            <ClipboardCheck className="w-4 h-4 mr-2" />
            {t('badge')}
          </span>
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle">{t('subtitle', { procedure: procedureName })}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="questions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-3xl shadow-card p-6 md:p-8"
              >
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      {t('question')} {currentStep + 1} {t('of')} {questions.length}
                    </span>
                    <span className="text-sm text-primary font-semibold">
                      {Math.round(((currentStep + 1) / questions.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Current Question */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-xl md:text-2xl font-semibold text-dark mb-6 text-center">
                      {questions[currentStep].question}
                    </h3>

                    <div className="space-y-3">
                      {questions[currentStep].options.map((option, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between group
                            ${
                              answers[questions[currentStep].id] === option.value
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                            }
                          `}
                        >
                          <span className="font-medium text-gray-700 group-hover:text-primary">
                            {option.label}
                          </span>
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                            ${
                              answers[questions[currentStep].id] === option.value
                                ? 'border-primary bg-primary'
                                : 'border-gray-300 group-hover:border-primary'
                            }
                          `}
                          >
                            {answers[questions[currentStep].id] === option.value && (
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation dots */}
                <div className="flex justify-center gap-2 mt-8">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentStep
                          ? 'w-6 bg-primary'
                          : index < currentStep
                          ? 'bg-accent'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`rounded-3xl shadow-card overflow-hidden border ${
                  result ? resultConfig[result].borderColor : ''
                }`}
              >
                {/* Result Header */}
                <div
                  className={`bg-gradient-to-r ${
                    result ? resultConfig[result].color : ''
                  } p-6 md:p-8 text-center text-white`}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    {result && (() => {
                      const IconComponent = resultConfig[result].icon;
                      return <IconComponent className="w-10 h-10 text-white" />;
                    })()}
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {result && t(`results.${result}.title`)}
                  </h3>
                  <p className="text-white/90">{result && t(`results.${result}.subtitle`)}</p>
                </div>

                {/* Result Content */}
                <div className={`p-6 md:p-8 ${result ? resultConfig[result].bgColor : ''}`}>
                  <p className="text-gray-700 text-center mb-6">
                    {result && t(`results.${result}.description`, { procedure: procedureName })}
                  </p>

                  {/* Benefits List */}
                  <div className="bg-white rounded-2xl p-4 mb-6">
                    <h4 className="font-semibold text-dark mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-accent" />
                      {t('nextSteps')}
                    </h4>
                    <ul className="space-y-2">
                      {[0, 1, 2].map((i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {t(`steps.${i}`)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Link
                      href="/reservar"
                      className="btn-primary w-full justify-center text-base"
                    >
                      <Calendar className="w-5 h-5" />
                      {t('scheduleConsultation')}
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        defaultWhatsappMessage
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full justify-center"
                    >
                      <MessageCircle className="w-5 h-5" />
                      {t('consultWhatsApp')}
                    </a>

                    <button
                      onClick={resetAssessment}
                      className="w-full py-3 text-gray-500 hover:text-primary transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <RotateCcw className="w-4 h-4" />
                      {t('retakeAssessment')}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust Indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-gray-500 mt-6"
          >
            <Shield className="w-4 h-4 inline mr-1" />
            {t('trustNote')}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

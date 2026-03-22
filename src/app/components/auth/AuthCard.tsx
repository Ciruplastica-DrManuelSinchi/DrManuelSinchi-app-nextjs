'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface AuthCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >


      {/* Card */}
      <div className="glass-light rounded-3xl shadow-elevation-3 p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl md:text-3xl text-dark mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-500 text-sm">{subtitle}</p>
          )}
        </div>

        {/* Content */}
        {children}

        {/* Footer */}
        {footer && (
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            {footer}
          </div>
        )}
      </div>
    </motion.div>
  )
}

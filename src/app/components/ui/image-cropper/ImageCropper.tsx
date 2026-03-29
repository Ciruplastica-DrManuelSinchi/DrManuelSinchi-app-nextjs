'use client'

import { useState, useCallback, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import { motion, AnimatePresence } from 'framer-motion'
import { X, RotateCw, ZoomIn, ZoomOut, Check, Loader2, Maximize2, Lock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { getCroppedImg, blobToFile, Area } from '@/lib/cropImage'

interface ImageCropperProps {
  isOpen: boolean
  imageSrc: string
  onClose: () => void
  onCropComplete: (croppedFile: File) => void
  aspectRatio?: number
  title?: string
  /** Bloquea la proporción para que no pueda ser cambiada (útil para antes/después) */
  lockAspectRatio?: boolean
  /** Etiqueta de la proporción bloqueada (ej: "Vertical 3:4") */
  aspectRatioLabel?: string
}

export default function ImageCropper({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
  aspectRatio: initialAspectRatio = 3 / 4,
  title,
  lockAspectRatio = false,
  aspectRatioLabel,
}: ImageCropperProps) {
  const t = useTranslations('imageCropper')
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [aspectRatio, setAspectRatio] = useState(initialAspectRatio)

  const ASPECT_RATIOS = [
    { label: t('vertical'), value: 3 / 4, icon: '3:4' },
    { label: t('square'), value: 1, icon: '1:1' },
    { label: t('horizontal'), value: 4 / 3, icon: '4:3' },
    { label: t('free'), value: 0, icon: t('free') },
  ]

  // Sincronizar aspectRatio cuando cambia desde props (ej: cambio de orientación)
  useEffect(() => {
    setAspectRatio(initialAspectRatio)
  }, [initialAspectRatio])

  const onCropChange = useCallback((location: { x: number; y: number }) => {
    setCrop(location)
  }, [])

  const onZoomChange = useCallback((newZoom: number) => {
    setZoom(newZoom)
  }, [])

  const onCropAreaComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    []
  )

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 1))
  }

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return

    setIsProcessing(true)
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels, rotation)
      if (croppedBlob) {
        const fileName = `cropped-${Date.now()}.jpg`
        const croppedFile = blobToFile(croppedBlob, fileName)
        onCropComplete(croppedFile)
        handleClose()
      }
    } catch (error) {
      console.error('Error cropping image:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClose = () => {
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setRotation(0)
    setCroppedAreaPixels(null)
    onClose()
  }

  const displayTitle = title || t('title')

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-dark">{displayTitle}</h3>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Cropper Area */}
            <div className="relative h-[400px] bg-gray-900">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={aspectRatio || undefined}
                onCropChange={onCropChange}
                onZoomChange={onZoomChange}
                onCropComplete={onCropAreaComplete}
                cropShape="rect"
                showGrid={true}
              />
            </div>

            {/* Controls */}
            <div className="px-6 py-4 space-y-4 bg-gray-50">
              {/* Aspect Ratio Selector or Locked Message */}
              {lockAspectRatio ? (
                <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg">
                  <Lock className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">
                    {t('fixedRatio')}: {aspectRatioLabel || (aspectRatio === 3/4 ? `${t('vertical')} 3:4` : aspectRatio === 4/3 ? `${t('horizontal')} 4:3` : `${aspectRatio}`)}
                  </span>
                  <span className="text-xs text-primary/70 ml-auto">
                    {t('forConsistency')}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 font-medium mr-2">{t('aspectRatio')}:</span>
                  <div className="flex gap-1">
                    {ASPECT_RATIOS.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => setAspectRatio(option.value)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          aspectRatio === option.value
                            ? 'bg-primary text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {option.icon}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Zoom & Rotation Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ZoomOut className="w-4 h-4 text-gray-600" />
                  </button>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <button
                    onClick={handleZoomIn}
                    className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ZoomIn className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="text-xs text-gray-500 ml-1 w-12">
                    {Math.round(zoom * 100)}%
                  </span>
                </div>

                <button
                  onClick={handleRotate}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RotateCw className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">{t('rotate')}</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 px-4 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleConfirm}
                disabled={isProcessing || !croppedAreaPixels}
                className="flex-1 py-2.5 px-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('processing')}
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    {t('applyCrop')}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  Settings,
  Bell,
  Mail,
  Shield,
  Globe,
  Save,
  CheckCircle,
  Info,
} from 'lucide-react'

interface SettingSection {
  id: string
  title: string
  description: string
  icon: React.ElementType
  settings: Setting[]
}

interface Setting {
  id: string
  label: string
  description: string
  type: 'toggle' | 'select' | 'number' | 'text'
  value: string | number | boolean
  options?: { value: string; label: string }[]
  disabled?: boolean
}

const initialSections: SettingSection[] = [
  {
    id: 'notifications',
    title: 'Notificaciones',
    description: 'Configura las notificaciones del sistema',
    icon: Bell,
    settings: [
      {
        id: 'email_new_user',
        label: 'Notificar nuevos registros',
        description: 'Recibir email cuando un nuevo usuario se registra',
        type: 'toggle',
        value: true,
      },
      {
        id: 'email_verification',
        label: 'Recordar verificación',
        description: 'Enviar recordatorios a usuarios no verificados',
        type: 'toggle',
        value: true,
      },
      {
        id: 'email_admin_digest',
        label: 'Resumen semanal',
        description: 'Recibir resumen de actividad semanal',
        type: 'toggle',
        value: false,
      },
    ],
  },
  {
    id: 'security',
    title: 'Seguridad',
    description: 'Ajustes de seguridad y acceso',
    icon: Shield,
    settings: [
      {
        id: 'max_login_attempts',
        label: 'Intentos de login máximos',
        description: 'Bloquear cuenta después de estos intentos fallidos',
        type: 'number',
        value: 5,
      },
      {
        id: 'lockout_duration',
        label: 'Duración del bloqueo (minutos)',
        description: 'Tiempo de bloqueo tras intentos fallidos',
        type: 'number',
        value: 15,
      },
      {
        id: 'require_email_verification',
        label: 'Requerir verificación de email',
        description: 'Los usuarios deben verificar su email para acceder',
        type: 'toggle',
        value: true,
      },
      {
        id: 'password_min_length',
        label: 'Longitud mínima de contraseña',
        description: 'Caracteres mínimos para contraseñas',
        type: 'number',
        value: 8,
      },
    ],
  },
  {
    id: 'email',
    title: 'Configuración de Email',
    description: 'Ajustes del servidor de correo',
    icon: Mail,
    settings: [
      {
        id: 'smtp_host',
        label: 'Servidor SMTP',
        description: 'Dirección del servidor de correo',
        type: 'text',
        value: 'smtp.gmail.com',
        disabled: true,
      },
      {
        id: 'email_from_name',
        label: 'Nombre del remitente',
        description: 'Nombre que aparece en los correos',
        type: 'text',
        value: 'Ciruplástica',
      },
      {
        id: 'email_from_address',
        label: 'Email del remitente',
        description: 'Dirección de correo saliente',
        type: 'text',
        value: 'noreply@ciruplastica.com',
        disabled: true,
      },
    ],
  },
  {
    id: 'general',
    title: 'General',
    description: 'Configuración general del sitio',
    icon: Globe,
    settings: [
      {
        id: 'site_name',
        label: 'Nombre del sitio',
        description: 'Nombre que aparece en el título',
        type: 'text',
        value: 'Ciruplástica - Dr. Manuel Sinchi',
      },
      {
        id: 'timezone',
        label: 'Zona horaria',
        description: 'Zona horaria predeterminada',
        type: 'select',
        value: 'America/Lima',
        options: [
          { value: 'America/Lima', label: 'Lima (GMT-5)' },
          { value: 'America/Bogota', label: 'Bogotá (GMT-5)' },
          { value: 'America/Mexico_City', label: 'Ciudad de México (GMT-6)' },
        ],
      },
      {
        id: 'date_format',
        label: 'Formato de fecha',
        description: 'Cómo se muestran las fechas',
        type: 'select',
        value: 'dd/MM/yyyy',
        options: [
          { value: 'dd/MM/yyyy', label: 'DD/MM/YYYY' },
          { value: 'MM/dd/yyyy', label: 'MM/DD/YYYY' },
          { value: 'yyyy-MM-dd', label: 'YYYY-MM-DD' },
        ],
      },
    ],
  },
]

export default function SettingsPage() {
  const [sections, setSections] = useState(initialSections)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activeSection, setActiveSection] = useState('notifications')

  const handleSettingChange = (
    sectionId: string,
    settingId: string,
    newValue: string | number | boolean
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              settings: section.settings.map((setting) =>
                setting.id === settingId
                  ? { ...setting, value: newValue }
                  : setting
              ),
            }
          : section
      )
    )
  }

  const handleSave = async () => {
    setSaving(true)
    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const currentSection = sections.find((s) => s.id === activeSection)

  return (
    <div className="container-custom">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Panel
        </Link>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-800">
                Configuración
              </h1>
              <p className="text-gray-500 text-sm">
                Ajustes del sistema
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Success Alert */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5 text-green-500" />
          <p className="text-green-700">Configuración guardada correctamente</p>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <nav className="p-2">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.title}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Info Box */}
          <div className="mt-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm text-blue-700">
                  Algunas configuraciones requieren variables de entorno y no
                  pueden modificarse desde aquí.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          {currentSection && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <currentSection.icon className="w-6 h-6 text-primary" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {currentSection.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {currentSection.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {currentSection.settings.map((setting) => (
                  <div
                    key={setting.id}
                    className={`flex items-start justify-between gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0 ${
                      setting.disabled ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex-1">
                      <label className="block font-medium text-gray-800 mb-1">
                        {setting.label}
                        {setting.disabled && (
                          <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                            Variable de entorno
                          </span>
                        )}
                      </label>
                      <p className="text-sm text-gray-500">
                        {setting.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {setting.type === 'toggle' && (
                        <button
                          onClick={() =>
                            !setting.disabled &&
                            handleSettingChange(
                              currentSection.id,
                              setting.id,
                              !setting.value
                            )
                          }
                          disabled={setting.disabled}
                          className={`relative w-14 h-7 rounded-full transition-colors ${
                            setting.value ? 'bg-primary' : 'bg-gray-200'
                          } ${setting.disabled ? 'cursor-not-allowed' : ''}`}
                        >
                          <span
                            className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                              setting.value ? 'left-8' : 'left-1'
                            }`}
                          />
                        </button>
                      )}
                      {setting.type === 'number' && (
                        <input
                          type="number"
                          value={setting.value as number}
                          onChange={(e) =>
                            handleSettingChange(
                              currentSection.id,
                              setting.id,
                              parseInt(e.target.value) || 0
                            )
                          }
                          disabled={setting.disabled}
                          className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-center disabled:bg-gray-50 disabled:cursor-not-allowed"
                        />
                      )}
                      {setting.type === 'text' && (
                        <input
                          type="text"
                          value={setting.value as string}
                          onChange={(e) =>
                            handleSettingChange(
                              currentSection.id,
                              setting.id,
                              e.target.value
                            )
                          }
                          disabled={setting.disabled}
                          className="w-64 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                        />
                      )}
                      {setting.type === 'select' && setting.options && (
                        <select
                          value={setting.value as string}
                          onChange={(e) =>
                            handleSettingChange(
                              currentSection.id,
                              setting.id,
                              e.target.value
                            )
                          }
                          disabled={setting.disabled}
                          className="w-48 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                        >
                          {setting.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Los cambios se guardarán automáticamente
                  </p>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Guardar cambios
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

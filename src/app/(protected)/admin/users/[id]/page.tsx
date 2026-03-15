'use client'

import { useState, useEffect, use } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  Clock,
  Save,
  AlertCircle,
  CheckCircle,
  UserCheck,
  UserX,
  Loader2,
} from 'lucide-react'

interface UserData {
  id: string
  email: string
  name: string | null
  phone: string | null
  image: string | null
  role: 'PATIENT' | 'ADMIN'
  status: 'ACTIVE' | 'PENDING_VERIFICATION' | 'SUSPENDED'
  emailVerified: string | null
  failedLoginAttempts: number
  lockedUntil: string | null
  lastLoginAt: string | null
  createdAt: string
  updatedAt: string
}

const statusOptions = [
  { value: 'ACTIVE', label: 'Activo', description: 'El usuario puede acceder normalmente' },
  { value: 'PENDING_VERIFICATION', label: 'Pendiente', description: 'Esperando verificación de email' },
  { value: 'SUSPENDED', label: 'Suspendido', description: 'Acceso denegado temporalmente' },
]

const roleOptions = [
  { value: 'PATIENT', label: 'Paciente', description: 'Acceso básico de usuario' },
  { value: 'ADMIN', label: 'Administrador', description: 'Acceso completo al sistema' },
]

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: session } = useSession()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    role: 'PATIENT',
    status: 'PENDING_VERIFICATION',
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/admin/users/${id}`)
        const data = await res.json()

        if (res.ok) {
          setUser(data.user)
          setFormData({
            name: data.user.name || '',
            phone: data.user.phone || '',
            role: data.user.role,
            status: data.user.status,
          })
        } else {
          setError(data.error || 'Error al cargar usuario')
        }
      } catch {
        setError('Error de conexión')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess('Usuario actualizado correctamente')
        setUser(data.user)
        setTimeout(() => setSuccess(null), 3000)
      } else {
        setError(data.error || 'Error al actualizar')
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nunca'
    return new Date(dateString).toLocaleString('es-PE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const isOwnAccount = session?.user?.id === id

  if (loading) {
    return (
      <div className="container-custom flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container-custom">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Usuario no encontrado
          </h2>
          <p className="text-gray-600 mb-4">
            {error || 'El usuario solicitado no existe'}
          </p>
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a la lista
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a usuarios
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || ''}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-800">
              {user.name || 'Sin nombre'}
            </h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
      </motion.div>

      {/* Alerts */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            &times;
          </button>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5 text-green-500" />
          <p className="text-green-700">{success}</p>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Información de la Cuenta
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-gray-500">Email verificado</p>
                <p className="font-medium">
                  {user.emailVerified ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <UserCheck className="w-4 h-4" />
                      {formatDate(user.emailVerified)}
                    </span>
                  ) : (
                    <span className="text-yellow-600 flex items-center gap-1">
                      <UserX className="w-4 h-4" />
                      No verificado
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-gray-500">Fecha de registro</p>
                <p className="font-medium text-gray-800">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-gray-500">Último acceso</p>
                <p className="font-medium text-gray-800">
                  {formatDate(user.lastLoginAt)}
                </p>
              </div>
            </div>
            {user.failedLoginAttempts > 0 && (
              <div className="flex items-center gap-3 text-sm">
                <AlertCircle className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-gray-500">Intentos fallidos</p>
                  <p className="font-medium text-orange-600">
                    {user.failedLoginAttempts} intentos
                  </p>
                </div>
              </div>
            )}
            {user.lockedUntil && new Date(user.lockedUntil) > new Date() && (
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-600">
                  <strong>Cuenta bloqueada</strong> hasta{' '}
                  {formatDate(user.lockedUntil)}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Edit Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Editar Usuario
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Nombre del usuario"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="+51 999 999 999"
                  />
                </div>
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Shield className="inline w-4 h-4 mr-1" />
                Rol del usuario
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {roleOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.role === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${
                      isOwnAccount && option.value !== 'ADMIN'
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      checked={formData.role === option.value}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      disabled={isOwnAccount && option.value !== 'ADMIN'}
                      className="sr-only"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{option.label}</p>
                      <p className="text-sm text-gray-500">{option.description}</p>
                    </div>
                    {formData.role === option.value && (
                      <CheckCircle className="absolute top-3 right-3 w-5 h-5 text-primary" />
                    )}
                  </label>
                ))}
              </div>
              {isOwnAccount && (
                <p className="mt-2 text-sm text-gray-500">
                  No puedes cambiar tu propio rol de administrador
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado de la cuenta
              </label>
              <div className="grid sm:grid-cols-3 gap-3">
                {statusOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.status === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${
                      isOwnAccount && option.value === 'SUSPENDED'
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={option.value}
                      checked={formData.status === option.value}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      disabled={isOwnAccount && option.value === 'SUSPENDED'}
                      className="sr-only"
                    />
                    <p className="font-medium text-gray-800">{option.label}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {option.description}
                    </p>
                    {formData.status === option.value && (
                      <CheckCircle className="absolute top-3 right-3 w-4 h-4 text-primary" />
                    )}
                  </label>
                ))}
              </div>
              {isOwnAccount && (
                <p className="mt-2 text-sm text-gray-500">
                  No puedes suspender tu propia cuenta
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Link
                href="/admin/users"
                className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
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
          </form>
        </motion.div>
      </div>
    </div>
  )
}

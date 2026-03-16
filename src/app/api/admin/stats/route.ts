import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/admin/stats - Obtener estadísticas del sistema
export async function GET() {
  try {
    const session = await auth()

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Fechas para cálculos
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))

    // Estadísticas de usuarios
    const [
      totalUsers,
      usersThisMonth,
      usersLastMonth,
      verifiedUsers,
      activeUsers,
      suspendedUsers,
      adminUsers,
      usersThisWeek,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: { createdAt: { gte: startOfMonth } },
      }),
      prisma.user.count({
        where: {
          createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
        },
      }),
      prisma.user.count({
        where: { emailVerified: { not: null } },
      }),
      prisma.user.count({
        where: { status: 'ACTIVE' },
      }),
      prisma.user.count({
        where: { status: 'SUSPENDED' },
      }),
      prisma.user.count({
        where: { role: 'ADMIN' },
      }),
      prisma.user.count({
        where: { createdAt: { gte: startOfWeek } },
      }),
    ])

    // Calcular cambios porcentuales
    const userGrowth = usersLastMonth > 0
      ? Math.round(((usersThisMonth - usersLastMonth) / usersLastMonth) * 100)
      : usersThisMonth > 0 ? 100 : 0

    const verificationRate = totalUsers > 0
      ? Math.round((verifiedUsers / totalUsers) * 100)
      : 0

    // Obtener usuarios recientes
    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        status: true,
        role: true,
      },
    })

    // Distribución por rol
    const roleDistribution = {
      patients: totalUsers - adminUsers,
      admins: adminUsers,
    }

    // Distribución por estado
    const statusDistribution = {
      active: activeUsers,
      pending: totalUsers - activeUsers - suspendedUsers,
      suspended: suspendedUsers,
    }

    return NextResponse.json({
      overview: {
        totalUsers,
        usersThisMonth,
        usersThisWeek,
        userGrowth,
        verifiedUsers,
        verificationRate,
        activeUsers,
        suspendedUsers,
      },
      distributions: {
        role: roleDistribution,
        status: statusDistribution,
      },
      recentUsers,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    )
  }
}

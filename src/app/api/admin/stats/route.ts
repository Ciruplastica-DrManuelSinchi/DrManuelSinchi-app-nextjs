import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Forzar renderizado dinámico para esta ruta
export const dynamic = 'force-dynamic'

// GET /api/admin/stats - Obtener estadísticas del sistema
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Obtener parámetros de fecha
    const { searchParams } = new URL(request.url)
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    // Filtro de fechas base
    const dateFilter: Record<string, unknown> = {}
    if (dateFrom || dateTo) {
      dateFilter.createdAt = {}
      if (dateFrom) {
        (dateFilter.createdAt as Record<string, Date>).gte = new Date(dateFrom)
      }
      if (dateTo) {
        const endDate = new Date(dateTo)
        endDate.setHours(23, 59, 59, 999)
        ;(dateFilter.createdAt as Record<string, Date>).lte = endDate
      }
    }

    // Fechas para cálculos (cuando no hay filtro)
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))

    // Estadísticas de usuarios (con filtro de fechas si aplica)
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
      prisma.user.count({ where: dateFilter }),
      prisma.user.count({
        where: { ...dateFilter, createdAt: { gte: startOfMonth } },
      }),
      prisma.user.count({
        where: {
          ...dateFilter,
          createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
        },
      }),
      prisma.user.count({
        where: { ...dateFilter, emailVerified: { not: null } },
      }),
      prisma.user.count({
        where: { ...dateFilter, status: 'ACTIVE' },
      }),
      prisma.user.count({
        where: { ...dateFilter, status: 'SUSPENDED' },
      }),
      prisma.user.count({
        where: { ...dateFilter, role: 'ADMIN' },
      }),
      prisma.user.count({
        where: { ...dateFilter, createdAt: { gte: startOfWeek } },
      }),
    ])

    // Calcular cambios porcentuales
    const userGrowth = usersLastMonth > 0
      ? Math.round(((usersThisMonth - usersLastMonth) / usersLastMonth) * 100)
      : usersThisMonth > 0 ? 100 : 0

    const verificationRate = totalUsers > 0
      ? Math.round((verifiedUsers / totalUsers) * 100)
      : 0

    // Obtener usuarios recientes (con filtro si aplica)
    const recentUsers = await prisma.user.findMany({
      where: dateFilter,
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

    // ============================================
    // MÉTRICAS PARA CIRUJANO
    // ============================================

    // Filtro de fechas para bookings
    const bookingDateFilter: Record<string, unknown> = {}
    if (dateFrom || dateTo) {
      bookingDateFilter.date = {}
      if (dateFrom) {
        (bookingDateFilter.date as Record<string, Date>).gte = new Date(dateFrom)
      }
      if (dateTo) {
        const endDate = new Date(dateTo)
        endDate.setHours(23, 59, 59, 999)
        ;(bookingDateFilter.date as Record<string, Date>).lte = endDate
      }
    }

    // Estadísticas de citas
    const [
      totalBookings,
      bookingsThisMonth,
      bookingsLastMonth,
      awaitingPaymentBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      pendingBookings,
      expiredBookings,
    ] = await Promise.all([
      prisma.booking.count({ where: bookingDateFilter }),
      prisma.booking.count({
        where: { ...bookingDateFilter, createdAt: { gte: startOfMonth } },
      }),
      prisma.booking.count({
        where: {
          createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
        },
      }),
      prisma.booking.count({
        where: { ...bookingDateFilter, status: 'AWAITING_PAYMENT' },
      }),
      prisma.booking.count({
        where: { ...bookingDateFilter, status: 'CONFIRMED' },
      }),
      prisma.booking.count({
        where: { ...bookingDateFilter, status: 'COMPLETED' },
      }),
      prisma.booking.count({
        where: { ...bookingDateFilter, status: 'CANCELLED' },
      }),
      prisma.booking.count({
        where: { ...bookingDateFilter, status: 'PENDING' },
      }),
      prisma.booking.count({
        where: { ...bookingDateFilter, status: 'EXPIRED' },
      }),
    ])

    // Tasa de confirmación (confirmadas + completadas vs total sin canceladas/expiradas)
    const totalValidBookings = totalBookings - cancelledBookings - expiredBookings
    const confirmationRate = totalValidBookings > 0
      ? Math.round(((confirmedBookings + completedBookings) / totalValidBookings) * 100)
      : 0

    // Crecimiento de citas
    const bookingGrowth = bookingsLastMonth > 0
      ? Math.round(((bookingsThisMonth - bookingsLastMonth) / bookingsLastMonth) * 100)
      : bookingsThisMonth > 0 ? 100 : 0

    // Procedimientos más solicitados
    const topProcedures = await prisma.booking.groupBy({
      by: ['procedureName', 'procedureCategory'],
      where: bookingDateFilter,
      _count: { procedureName: true },
      orderBy: { _count: { procedureName: 'desc' } },
      take: 5,
    })

    // Ingresos (pagos completados)
    const paymentsData = await prisma.payment.aggregate({
      where: {
        status: 'COMPLETED',
        ...(dateFrom || dateTo ? {
          createdAt: {
            ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
            ...(dateTo ? { lte: new Date(dateTo) } : {}),
          }
        } : {}),
      },
      _sum: { amount: true },
      _count: { id: true },
    })

    const paymentsThisMonth = await prisma.payment.aggregate({
      where: {
        status: 'COMPLETED',
        createdAt: { gte: startOfMonth },
      },
      _sum: { amount: true },
    })

    const paymentsLastMonth = await prisma.payment.aggregate({
      where: {
        status: 'COMPLETED',
        createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
      },
      _sum: { amount: true },
    })

    const totalRevenue = Number(paymentsData._sum.amount || 0)
    const revenueThisMonth = Number(paymentsThisMonth._sum.amount || 0)
    const revenueLastMonth = Number(paymentsLastMonth._sum.amount || 0)

    const revenueGrowth = revenueLastMonth > 0
      ? Math.round(((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100)
      : revenueThisMonth > 0 ? 100 : 0

    // Próximas citas (siguientes 7 días)
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    const upcomingBookings = await prisma.booking.count({
      where: {
        date: { gte: new Date(), lte: nextWeek },
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    })

    // Citas recientes
    const recentBookings = await prisma.booking.findMany({
      where: bookingDateFilter,
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        procedureName: true,
        date: true,
        timeSlot: true,
        status: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

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
      // Nuevas métricas para cirujano
      surgeon: {
        bookings: {
          total: totalBookings,
          thisMonth: bookingsThisMonth,
          growth: bookingGrowth,
          awaitingPayment: awaitingPaymentBookings,
          confirmed: confirmedBookings,
          completed: completedBookings,
          cancelled: cancelledBookings,
          pending: pendingBookings,
          expired: expiredBookings,
          confirmationRate,
          upcoming: upcomingBookings,
        },
        revenue: {
          total: totalRevenue,
          thisMonth: revenueThisMonth,
          growth: revenueGrowth,
          transactions: paymentsData._count.id,
        },
        topProcedures: topProcedures.map(p => ({
          name: p.procedureName,
          category: p.procedureCategory,
          count: p._count.procedureName,
        })),
        recentBookings,
      },
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    )
  }
}

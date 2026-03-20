import ExcelJS from 'exceljs'

interface ExcelConfig {
    title: string
    sheets: {
        name: string
        columns: { header: string; key: string; width?: number }[]
        data: Record<string, string | number | null | undefined>[]
    }[]
    filename: string
}

// Estilos para headers (fondo negro, texto blanco)
const headerStyle: Partial<ExcelJS.Style> = {
    fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF000000' },
    },
    font: {
        color: { argb: 'FFFFFFFF' },
        bold: true,
    },
    alignment: {
        horizontal: 'center',
        vertical: 'middle',
    },
    border: {
        top: { style: 'thin', color: { argb: 'FF000000' } },
        left: { style: 'thin', color: { argb: 'FF000000' } },
        bottom: { style: 'thin', color: { argb: 'FF000000' } },
        right: { style: 'thin', color: { argb: 'FF000000' } },
    },
}

// Estilos para celdas de datos
const dataStyle: Partial<ExcelJS.Style> = {
    border: {
        top: { style: 'thin', color: { argb: 'FFE0E0E0' } },
        left: { style: 'thin', color: { argb: 'FFE0E0E0' } },
        bottom: { style: 'thin', color: { argb: 'FFE0E0E0' } },
        right: { style: 'thin', color: { argb: 'FFE0E0E0' } },
    },
    alignment: {
        vertical: 'middle',
    },
}

// Genera un archivo Excel con múltiples hojas
export const generateExcel = async (config: ExcelConfig): Promise<void> => {
    const { sheets, filename } = config

    // Crear workbook
    const workbook = new ExcelJS.Workbook()
    workbook.creator = 'Ciruplástica'
    workbook.created = new Date()

    sheets.forEach((sheetConfig) => {
        // Crear worksheet
        const worksheet = workbook.addWorksheet(sheetConfig.name)

        // Configurar columnas
        worksheet.columns = sheetConfig.columns.map((col) => ({
            header: col.header,
            key: col.key,
            width: col.width || 15,
        }))

        // Aplicar estilos a headers (primera fila)
        const headerRow = worksheet.getRow(1)
        headerRow.height = 25
        headerRow.eachCell((cell) => {
            cell.style = headerStyle
        })

        // Agregar datos
        sheetConfig.data.forEach((row) => {
            const rowData: Record<string, string | number> = {}
            sheetConfig.columns.forEach((col) => {
                const value = row[col.key]
                rowData[col.key] = value !== null && value !== undefined ? value : '—'
            })
            const addedRow = worksheet.addRow(rowData)

            // Aplicar estilos a celdas de datos
            addedRow.eachCell((cell) => {
                cell.style = dataStyle
            })
        })

        // Fijar la primera fila (headers)
        worksheet.views = [{ state: 'frozen', ySplit: 1 }]
    })

    // Generar buffer y descargar
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.xlsx`
    link.click()
    URL.revokeObjectURL(url)
}

// Generador específico para usuarios
export const generateUsersExcel = async (
    users: Array<{
        name: string | null
        email: string
        phone: string | null
        role: string
        status: string
        emailVerified: string | null
        lastLoginAt: string | null
        createdAt: string
    }>,
    dateRange?: { from: Date; to: Date }
) => {
    const roleLabels: Record<string, string> = {
        PATIENT: 'Paciente',
        ADMIN: 'Administrador',
    }

    const statusLabels: Record<string, string> = {
        ACTIVE: 'Activo',
        PENDING_VERIFICATION: 'Pendiente',
        SUSPENDED: 'Suspendido',
    }

    const formatDate = (dateString: string | null): string => {
        if (!dateString) return '—'
        return new Date(dateString).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'America/Lima',
        })
    }

    const formattedData = users.map((user) => ({
        name: user.name || 'Sin nombre',
        email: user.email,
        phone: user.phone || '—',
        role: roleLabels[user.role] || user.role,
        status: statusLabels[user.status] || user.status,
        emailVerified: user.emailVerified ? 'Sí' : 'No',
        lastLogin: formatDate(user.lastLoginAt),
        createdAt: formatDate(user.createdAt),
    }))

    // Crear nombre de archivo con rango de fechas si existe
    let filename = `usuarios_${new Date().toISOString().split('T')[0]}`
    if (dateRange) {
        const fromStr = dateRange.from.toISOString().split('T')[0]
        const toStr = dateRange.to.toISOString().split('T')[0]
        filename = `usuarios_${fromStr}_${toStr}`
    }

    await generateExcel({
        title: 'Reporte de Usuarios',
        sheets: [
            {
                name: 'Usuarios',
                columns: [
                    { header: 'Nombre', key: 'name', width: 25 },
                    { header: 'Email', key: 'email', width: 30 },
                    { header: 'Teléfono', key: 'phone', width: 15 },
                    { header: 'Rol', key: 'role', width: 15 },
                    { header: 'Estado', key: 'status', width: 15 },
                    { header: 'Email Verificado', key: 'emailVerified', width: 15 },
                    { header: 'Último Login', key: 'lastLogin', width: 15 },
                    { header: 'Fecha Registro', key: 'createdAt', width: 15 },
                ],
                data: formattedData,
            },
        ],
        filename,
    })
}

// Generador específico para estadísticas
export const generateStatsExcel = async (
    stats: {
        overview: {
            totalUsers: number
            usersThisMonth: number
            usersThisWeek: number
            userGrowth: number
            verifiedUsers: number
            verificationRate: number
            activeUsers: number
            suspendedUsers: number
        }
        distributions: {
            role: { patients: number; admins: number }
            status: { active: number; pending: number; suspended: number }
        }
        recentUsers: Array<{
            id: string
            name: string | null
            email: string
            createdAt: string
            status: string
            role: string
        }>
        surgeon?: {
            bookings: {
                total: number
                thisMonth: number
                growth: number
                confirmed: number
                completed: number
                cancelled: number
                pending: number
                awaitingPayment?: number
                expired?: number
                confirmationRate: number
                upcoming: number
            }
            revenue: {
                total: number
                thisMonth: number
                growth: number
                transactions: number
            }
            topProcedures: Array<{
                name: string
                category: string
                count: number
            }>
            recentBookings?: Array<{
                id: string
                procedureName: string
                date: string
                timeSlot: string
                status: string
                user: {
                    name: string | null
                    email: string
                }
            }>
        }
    },
    dateRange?: { from: Date; to: Date }
) => {
    const sheets: ExcelConfig['sheets'] = []

    // Hoja 1: Resumen General
    const summaryData = []

    if (stats.surgeon) {
        summaryData.push(
            { metric: 'MÉTRICAS DE CITAS', value: '' },
            { metric: 'Total de Citas', value: stats.surgeon.bookings.total },
            { metric: 'Citas del Mes', value: stats.surgeon.bookings.thisMonth },
            { metric: 'Crecimiento (%)', value: `${stats.surgeon.bookings.growth}%` },
            { metric: 'Tasa de Confirmación', value: `${stats.surgeon.bookings.confirmationRate}%` },
            { metric: 'Próximos 7 días', value: stats.surgeon.bookings.upcoming },
            { metric: '', value: '' },
            { metric: 'ESTADO DE CITAS', value: '' },
            { metric: 'Pendientes de Pago', value: stats.surgeon.bookings.awaitingPayment || 0 },
            { metric: 'Pendientes', value: stats.surgeon.bookings.pending },
            { metric: 'Confirmadas', value: stats.surgeon.bookings.confirmed },
            { metric: 'Completadas', value: stats.surgeon.bookings.completed },
            { metric: 'Canceladas', value: stats.surgeon.bookings.cancelled },
            { metric: 'Expiradas', value: stats.surgeon.bookings.expired || 0 },
            { metric: '', value: '' },
            { metric: 'INGRESOS', value: '' },
            { metric: 'Ingresos del Mes', value: `S/ ${stats.surgeon.revenue.thisMonth.toLocaleString()}` },
            { metric: 'Ingresos Totales', value: `S/ ${stats.surgeon.revenue.total.toLocaleString()}` },
            { metric: 'Transacciones', value: stats.surgeon.revenue.transactions },
            { metric: 'Crecimiento (%)', value: `${stats.surgeon.revenue.growth}%` }
        )
    }

    summaryData.push(
        { metric: '', value: '' },
        { metric: 'MÉTRICAS DE USUARIOS', value: '' },
        { metric: 'Total Usuarios', value: stats.overview.totalUsers },
        { metric: 'Usuarios del Mes', value: stats.overview.usersThisMonth },
        { metric: 'Usuarios de la Semana', value: stats.overview.usersThisWeek },
        { metric: 'Usuarios Activos', value: stats.overview.activeUsers },
        { metric: 'Usuarios Verificados', value: stats.overview.verifiedUsers },
        { metric: 'Tasa de Verificación', value: `${stats.overview.verificationRate}%` }
    )

    sheets.push({
        name: 'Resumen',
        columns: [
            { header: 'Métrica', key: 'metric', width: 30 },
            { header: 'Valor', key: 'value', width: 20 },
        ],
        data: summaryData,
    })

    // Hoja 2: Procedimientos más solicitados
    if (stats.surgeon?.topProcedures && stats.surgeon.topProcedures.length > 0) {
        sheets.push({
            name: 'Procedimientos',
            columns: [
                { header: '#', key: 'rank', width: 5 },
                { header: 'Procedimiento', key: 'name', width: 35 },
                { header: 'Categoría', key: 'category', width: 25 },
                { header: 'Cantidad de Citas', key: 'count', width: 18 },
            ],
            data: stats.surgeon.topProcedures.map((proc, index) => ({
                rank: index + 1,
                name: proc.name,
                category: proc.category,
                count: proc.count,
            })),
        })
    }

    // Hoja 3: Citas recientes
    if (stats.surgeon?.recentBookings && stats.surgeon.recentBookings.length > 0) {
        const statusLabels: Record<string, string> = {
            AWAITING_PAYMENT: 'Pendiente de pago',
            PENDING: 'Pendiente',
            CONFIRMED: 'Confirmada',
            COMPLETED: 'Completada',
            CANCELLED: 'Cancelada',
            EXPIRED: 'Expirada',
        }

        sheets.push({
            name: 'Citas Recientes',
            columns: [
                { header: 'Procedimiento', key: 'procedure', width: 30 },
                { header: 'Paciente', key: 'patient', width: 25 },
                { header: 'Email', key: 'email', width: 30 },
                { header: 'Fecha', key: 'date', width: 15 },
                { header: 'Hora', key: 'time', width: 12 },
                { header: 'Estado', key: 'status', width: 18 },
            ],
            data: stats.surgeon.recentBookings.map((booking) => ({
                procedure: booking.procedureName,
                patient: booking.user.name || 'Sin nombre',
                email: booking.user.email,
                date: new Date(booking.date).toLocaleDateString('es-PE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    timeZone: 'America/Lima',
                }),
                time: booking.timeSlot,
                status: statusLabels[booking.status] || booking.status,
            })),
        })
    }

    // Hoja 4: Usuarios recientes
    if (stats.recentUsers && stats.recentUsers.length > 0) {
        const roleLabels: Record<string, string> = {
            PATIENT: 'Paciente',
            ADMIN: 'Administrador',
        }

        const statusLabels: Record<string, string> = {
            ACTIVE: 'Activo',
            PENDING_VERIFICATION: 'Pendiente',
            SUSPENDED: 'Suspendido',
        }

        sheets.push({
            name: 'Usuarios Recientes',
            columns: [
                { header: 'Nombre', key: 'name', width: 25 },
                { header: 'Email', key: 'email', width: 30 },
                { header: 'Rol', key: 'role', width: 15 },
                { header: 'Estado', key: 'status', width: 15 },
                { header: 'Fecha Registro', key: 'createdAt', width: 15 },
            ],
            data: stats.recentUsers.map((user) => ({
                name: user.name || 'Sin nombre',
                email: user.email,
                role: roleLabels[user.role] || user.role,
                status: statusLabels[user.status] || user.status,
                createdAt: new Date(user.createdAt).toLocaleDateString('es-PE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    timeZone: 'America/Lima',
                }),
            })),
        })
    }

    // Crear nombre de archivo con rango de fechas si existe
    let filename = `estadisticas_${new Date().toISOString().split('T')[0]}`
    if (dateRange) {
        const fromStr = dateRange.from.toISOString().split('T')[0]
        const toStr = dateRange.to.toISOString().split('T')[0]
        filename = `estadisticas_${fromStr}_${toStr}`
    }

    await generateExcel({
        title: 'Reporte de Estadísticas',
        sheets,
        filename,
    })
}

// Generador específico para reservas/citas
export const generateBookingsExcel = async (
    bookings: Array<{
        id: string
        procedureName: string
        procedureCategory: string
        date: string
        timeSlot: string
        message?: string
        status: string
        createdAt: string
        user: {
            name: string | null
            email: string
            phone: string | null
        }
    }>,
    dateRange?: { from: Date; to: Date }
) => {
    const statusLabels: Record<string, string> = {
        AWAITING_PAYMENT: 'Pendiente de pago',
        PENDING: 'Pendiente',
        CONFIRMED: 'Confirmada',
        COMPLETED: 'Completada',
        CANCELLED: 'Cancelada',
        EXPIRED: 'Expirada',
    }

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'America/Lima',
        })
    }

    const formatDateTime = (dateString: string): string => {
        return new Date(dateString).toLocaleString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Lima',
        })
    }

    const formattedData = bookings.map((booking) => ({
        patientName: booking.user.name || 'Sin nombre',
        patientEmail: booking.user.email,
        patientPhone: booking.user.phone || '—',
        procedure: booking.procedureName,
        category: booking.procedureCategory,
        date: formatDate(booking.date),
        time: booking.timeSlot,
        status: statusLabels[booking.status] || booking.status,
        message: booking.message || '—',
        createdAt: formatDateTime(booking.createdAt),
    }))

    // Crear nombre de archivo con rango de fechas si existe
    let filename = `reservas_${new Date().toISOString().split('T')[0]}`
    if (dateRange) {
        const fromStr = dateRange.from.toISOString().split('T')[0]
        const toStr = dateRange.to.toISOString().split('T')[0]
        filename = `reservas_${fromStr}_${toStr}`
    }

    await generateExcel({
        title: 'Reporte de Reservas',
        sheets: [
            {
                name: 'Reservas',
                columns: [
                    { header: 'Paciente', key: 'patientName', width: 25 },
                    { header: 'Email', key: 'patientEmail', width: 30 },
                    { header: 'Teléfono', key: 'patientPhone', width: 15 },
                    { header: 'Procedimiento', key: 'procedure', width: 25 },
                    { header: 'Categoría', key: 'category', width: 20 },
                    { header: 'Fecha', key: 'date', width: 12 },
                    { header: 'Hora', key: 'time', width: 10 },
                    { header: 'Estado', key: 'status', width: 18 },
                    { header: 'Mensaje', key: 'message', width: 30 },
                    { header: 'Creado', key: 'createdAt', width: 18 },
                ],
                data: formattedData,
            },
        ],
        filename,
    })
}

import jsPDF from 'jspdf'
import autoTable, { RowInput } from 'jspdf-autotable'

// Colores corporativos de Ciruplástica
const COLORS = {
    primary: '#391142', // Púrpura
    accent: '#d4a853', // Dorado
    text: '#333333',
    textLight: '#666666',
    border: '#e5e5e5',
}

interface PDFConfig {
    title: string
    subtitle?: string
    dateRange?: {
        from: Date
        to: Date
    }
    columns: { header: string; dataKey: string }[]
    data: Record<string, string | number | null | undefined>[]
    filename: string
}

// Convierte color hex a RGB
const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
        ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
        ]
        : [0, 0, 0]
}

// Formatea fecha a string legible
const formatDate = (date: Date): string => {
    return date.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })
}

// Logo en base64 (versión simplificada - texto)
const addHeader = (doc: jsPDF, title: string, subtitle?: string, dateRange?: { from: Date; to: Date }) => {
    const pageWidth = doc.internal.pageSize.getWidth()

    // Línea superior decorativa
    doc.setFillColor(...hexToRgb(COLORS.primary))
    doc.rect(0, 0, pageWidth, 4, 'F')

    // Línea dorada
    doc.setFillColor(...hexToRgb(COLORS.accent))
    doc.rect(0, 4, pageWidth, 2, 'F')

    // Logo / Nombre de la clínica
    doc.setFontSize(24)
    doc.setTextColor(...hexToRgb(COLORS.primary))
    doc.setFont('helvetica', 'bold')
    doc.text('CIRUPLÁSTICA', 14, 25)

    doc.setFontSize(10)
    doc.setTextColor(...hexToRgb(COLORS.textLight))
    doc.setFont('helvetica', 'normal')
    doc.text('Dr. Manuel Sinchi - Cirugía Plástica y Reconstructiva', 14, 32)

    // Fecha de generación (lado derecho)
    doc.setFontSize(9)
    doc.text(`Generado: ${formatDate(new Date())}`, pageWidth - 14, 25, { align: 'right' })

    // Título del reporte
    doc.setFontSize(18)
    doc.setTextColor(...hexToRgb(COLORS.text))
    doc.setFont('helvetica', 'bold')
    doc.text(title, 14, 48)

    // Subtítulo si existe
    let yPosition = 55
    if (subtitle) {
        doc.setFontSize(11)
        doc.setTextColor(...hexToRgb(COLORS.textLight))
        doc.setFont('helvetica', 'normal')
        doc.text(subtitle, 14, yPosition)
        yPosition += 7
    }

    // Rango de fechas si existe
    if (dateRange) {
        doc.setFontSize(10)
        doc.setTextColor(...hexToRgb(COLORS.textLight))
        doc.setFont('helvetica', 'italic')
        doc.text(
            `Período: ${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`,
            14,
            yPosition
        )
        yPosition += 7
    }

    return yPosition + 5
}

const addFooter = (doc: jsPDF, pageNumber: number, totalPages: number) => {
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    // Línea separadora
    doc.setDrawColor(...hexToRgb(COLORS.border))
    doc.line(14, pageHeight - 20, pageWidth - 14, pageHeight - 20)

    // Información de contacto
    doc.setFontSize(8)
    doc.setTextColor(...hexToRgb(COLORS.textLight))
    doc.setFont('helvetica', 'normal')
    doc.text('Ciruplástica - Lima, Perú | www.ciruplastica.pe', 14, pageHeight - 12)

    // Número de página
    doc.text(
        `Página ${pageNumber} de ${totalPages}`,
        pageWidth - 14,
        pageHeight - 12,
        { align: 'right' }
    )

    // Línea inferior decorativa
    doc.setFillColor(...hexToRgb(COLORS.accent))
    doc.rect(0, pageHeight - 4, pageWidth, 4, 'F')
}

export const generatePDF = (config: PDFConfig): void => {
    const { title, subtitle, dateRange, columns, data, filename } = config

    // Crear documento
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    })

    // Agregar header
    const startY = addHeader(doc, title, subtitle, dateRange)

    // Preparar datos para la tabla
    const tableColumns = columns.map((col) => ({
        header: col.header,
        dataKey: col.dataKey,
    }))

    const tableData: RowInput[] = data.map((row) => {
        const rowData: Record<string, string> = {}
        columns.forEach((col) => {
            const value = row[col.dataKey]
            rowData[col.dataKey] = value !== null && value !== undefined ? String(value) : '—'
        })
        return rowData
    })

    // Generar tabla
    autoTable(doc, {
        startY,
        columns: tableColumns,
        body: tableData,
        theme: 'grid',
        headStyles: {
            fillColor: hexToRgb(COLORS.primary),
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            fontSize: 10,
            cellPadding: 4,
        },
        bodyStyles: {
            textColor: hexToRgb(COLORS.text),
            fontSize: 9,
            cellPadding: 3,
        },
        alternateRowStyles: {
            fillColor: [249, 249, 249],
        },
        styles: {
            lineColor: hexToRgb(COLORS.border),
            lineWidth: 0.1,
        },
        margin: { left: 14, right: 14 },
        didDrawPage: (data) => {
            // Agregar footer en cada página
            const pageCount = doc.getNumberOfPages()
            addFooter(doc, data.pageNumber, pageCount)
        },
    })

    // Agregar footer a la última página si no se agregó
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        addFooter(doc, i, pageCount)
    }

    // Descargar PDF
    doc.save(`${filename}.pdf`)
}

// Generador específico para usuarios
export const generateUsersPDF = (
    users: Array<{
        name: string | null
        email: string
        phone: string | null
        role: string
        status: string
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

    const formattedData = users.map((user) => ({
        name: user.name || 'Sin nombre',
        email: user.email,
        phone: user.phone || '—',
        role: roleLabels[user.role] || user.role,
        status: statusLabels[user.status] || user.status,
        createdAt: new Date(user.createdAt).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }),
    }))

    generatePDF({
        title: 'Reporte de Usuarios',
        subtitle: `Total: ${users.length} usuarios registrados`,
        dateRange,
        columns: [
            { header: 'Nombre', dataKey: 'name' },
            { header: 'Email', dataKey: 'email' },
            { header: 'Teléfono', dataKey: 'phone' },
            { header: 'Rol', dataKey: 'role' },
            { header: 'Estado', dataKey: 'status' },
            { header: 'Registro', dataKey: 'createdAt' },
        ],
        data: formattedData,
        filename: `usuarios_${new Date().toISOString().split('T')[0]}`,
    })
}

// Generador específico para estadísticas
export const generateStatsPDF = (
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
        }
    },
    dateRange?: { from: Date; to: Date }
) => {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    })

    const pageWidth = doc.internal.pageSize.getWidth()

    // Header
    const startY = addHeader(doc, 'Reporte de Estadísticas', 'Resumen analítico del sistema', dateRange)

    let yPos = startY + 5

    // ============================================
    // MÉTRICAS DE CONSULTA (CIRUJANO)
    // ============================================
    if (stats.surgeon) {
        doc.setFontSize(14)
        doc.setTextColor(...hexToRgb(COLORS.primary))
        doc.setFont('helvetica', 'bold')
        doc.text('Métricas de Consulta', 14, yPos)
        yPos += 8

        const surgeonMetrics = [
            { label: 'Citas del mes', value: stats.surgeon.bookings.thisMonth.toString() },
            { label: 'Total de citas', value: stats.surgeon.bookings.total.toString() },
            { label: 'Tasa confirmación', value: `${stats.surgeon.bookings.confirmationRate}%` },
            { label: 'Próximos 7 días', value: stats.surgeon.bookings.upcoming.toString() },
            { label: 'Ingresos del mes', value: `S/ ${stats.surgeon.revenue.thisMonth.toLocaleString()}` },
            { label: 'Transacciones', value: stats.surgeon.revenue.transactions.toString() },
        ]

        const cardWidth = (pageWidth - 28 - 10) / 3
        const cardHeight = 20

        surgeonMetrics.forEach((metric, index) => {
            const row = Math.floor(index / 3)
            const col = index % 3
            const x = 14 + col * (cardWidth + 5)
            const y = yPos + row * (cardHeight + 5)

            // Fondo de tarjeta con color primario
            doc.setFillColor(...hexToRgb(COLORS.primary))
            doc.roundedRect(x, y, cardWidth, cardHeight, 2, 2, 'F')

            // Valor
            doc.setFontSize(14)
            doc.setTextColor(255, 255, 255)
            doc.setFont('helvetica', 'bold')
            doc.text(metric.value, x + cardWidth / 2, y + 9, { align: 'center' })

            // Label
            doc.setFontSize(7)
            doc.setTextColor(255, 255, 255)
            doc.setFont('helvetica', 'normal')
            doc.text(metric.label, x + cardWidth / 2, y + 16, { align: 'center' })
        })

        yPos += Math.ceil(surgeonMetrics.length / 3) * (cardHeight + 5) + 10

        // Procedimientos más solicitados
        if (stats.surgeon.topProcedures && stats.surgeon.topProcedures.length > 0) {
            doc.setFontSize(12)
            doc.setTextColor(...hexToRgb(COLORS.primary))
            doc.setFont('helvetica', 'bold')
            doc.text('Procedimientos más solicitados', 14, yPos)
            yPos += 6

            autoTable(doc, {
                startY: yPos,
                head: [['#', 'Procedimiento', 'Categoría', 'Citas']],
                body: stats.surgeon.topProcedures.map((proc, i) => [
                    (i + 1).toString(),
                    proc.name,
                    proc.category,
                    proc.count.toString(),
                ]),
                theme: 'grid',
                headStyles: {
                    fillColor: hexToRgb(COLORS.accent),
                    textColor: [51, 51, 51],
                    fontStyle: 'bold',
                    fontSize: 9,
                },
                bodyStyles: {
                    textColor: hexToRgb(COLORS.text),
                    fontSize: 8,
                },
                columnStyles: {
                    0: { cellWidth: 10 },
                    3: { cellWidth: 15, halign: 'center' },
                },
                margin: { left: 14, right: 14 },
            })

            // Obtener la posición Y después de la tabla
            yPos = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15
        } else {
            yPos += 5
        }

        // Distribución de citas
        doc.setFontSize(12)
        doc.setTextColor(...hexToRgb(COLORS.primary))
        doc.setFont('helvetica', 'bold')
        doc.text('Estado de Citas', 14, yPos)
        yPos += 6

        autoTable(doc, {
            startY: yPos,
            head: [['Estado', 'Cantidad']],
            body: [
                ['Confirmadas', stats.surgeon.bookings.confirmed.toString()],
                ['Completadas', stats.surgeon.bookings.completed.toString()],
                ['Pendientes', stats.surgeon.bookings.pending.toString()],
                ['Canceladas', stats.surgeon.bookings.cancelled.toString()],
            ],
            theme: 'grid',
            headStyles: {
                fillColor: hexToRgb(COLORS.primary),
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                fontSize: 9,
            },
            bodyStyles: {
                textColor: hexToRgb(COLORS.text),
                fontSize: 8,
            },
            margin: { left: 14, right: pageWidth / 2 + 7 },
            tableWidth: pageWidth / 2 - 21,
        })

        yPos = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15
    }

    // Footer
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        addFooter(doc, i, pageCount)
    }

    // Descargar
    doc.save(`estadisticas_${new Date().toISOString().split('T')[0]}.pdf`)
}

// Generador específico para reservas/citas
export const generateBookingsPDF = (
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
        AWAITING_PAYMENT: 'Pend. Pago',
        PENDING: 'Pendiente',
        CONFIRMED: 'Confirmada',
        COMPLETED: 'Completada',
        CANCELLED: 'Cancelada',
        EXPIRED: 'Expirada',
    }

    const formattedData = bookings.map((booking) => ({
        patient: booking.user.name || 'Sin nombre',
        email: booking.user.email,
        phone: booking.user.phone || '—',
        procedure: booking.procedureName,
        date: new Date(booking.date).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            timeZone: 'America/Lima',
        }),
        time: booking.timeSlot,
        status: statusLabels[booking.status] || booking.status,
    }))

    generatePDF({
        title: 'Reporte de Reservas',
        subtitle: `Total: ${bookings.length} reservas`,
        dateRange,
        columns: [
            { header: 'Paciente', dataKey: 'patient' },
            { header: 'Email', dataKey: 'email' },
            { header: 'Teléfono', dataKey: 'phone' },
            { header: 'Procedimiento', dataKey: 'procedure' },
            { header: 'Fecha', dataKey: 'date' },
            { header: 'Hora', dataKey: 'time' },
            { header: 'Estado', dataKey: 'status' },
        ],
        data: formattedData,
        filename: `reservas_${new Date().toISOString().split('T')[0]}`,
    })
}

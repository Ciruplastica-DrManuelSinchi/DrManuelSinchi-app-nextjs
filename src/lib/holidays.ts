// Feriados nacionales de Perú
// Nota: Los feriados que caen en fechas fijas se definen por mes/día
// Los feriados móviles (como Semana Santa) se calculan dinámicamente

interface Holiday {
  name: string
  month: number // 0-indexed (0 = Enero, 11 = Diciembre)
  day: number
}

// Feriados fijos de Perú
const FIXED_HOLIDAYS: Holiday[] = [
  { name: 'Año Nuevo', month: 0, day: 1 },
  { name: 'Día del Trabajo', month: 4, day: 1 },
  { name: 'San Pedro y San Pablo', month: 5, day: 29 },
  { name: 'Fiestas Patrias', month: 6, day: 28 },
  { name: 'Fiestas Patrias', month: 6, day: 29 },
  { name: 'Batalla de Junín', month: 7, day: 6 },
  { name: 'Santa Rosa de Lima', month: 7, day: 30 },
  { name: 'Combate de Angamos', month: 9, day: 8 },
  { name: 'Día de Todos los Santos', month: 10, day: 1 },
  { name: 'Inmaculada Concepción', month: 11, day: 8 },
  { name: 'Batalla de Ayacucho', month: 11, day: 9 },
  { name: 'Navidad', month: 11, day: 25 },
]

// Calcular fecha de Pascua usando el algoritmo de Computus
function getEasterSunday(year: number): Date {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1
  const day = ((h + l - 7 * m + 114) % 31) + 1

  return new Date(year, month, day)
}

// Obtener feriados móviles (Semana Santa) para un año
function getMovableHolidays(year: number): { date: Date; name: string }[] {
  const easterSunday = getEasterSunday(year)
  const holidays: { date: Date; name: string }[] = []

  // Jueves Santo (3 días antes de Pascua)
  const maundyThursday = new Date(easterSunday)
  maundyThursday.setDate(easterSunday.getDate() - 3)
  holidays.push({ date: maundyThursday, name: 'Jueves Santo' })

  // Viernes Santo (2 días antes de Pascua)
  const goodFriday = new Date(easterSunday)
  goodFriday.setDate(easterSunday.getDate() - 2)
  holidays.push({ date: goodFriday, name: 'Viernes Santo' })

  // Sábado de Gloria (1 día antes de Pascua)
  const holySaturday = new Date(easterSunday)
  holySaturday.setDate(easterSunday.getDate() - 1)
  holidays.push({ date: holySaturday, name: 'Sábado de Gloria' })

  // Domingo de Resurrección
  holidays.push({ date: easterSunday, name: 'Domingo de Resurrección' })

  return holidays
}

// Verificar si una fecha es feriado
export function isHoliday(date: Date): { isHoliday: boolean; name?: string } {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  // Verificar feriados fijos
  const fixedHoliday = FIXED_HOLIDAYS.find(
    h => h.month === month && h.day === day
  )
  if (fixedHoliday) {
    return { isHoliday: true, name: fixedHoliday.name }
  }

  // Verificar feriados móviles
  const movableHolidays = getMovableHolidays(year)
  const movableHoliday = movableHolidays.find(h => {
    return (
      h.date.getFullYear() === year &&
      h.date.getMonth() === month &&
      h.date.getDate() === day
    )
  })
  if (movableHoliday) {
    return { isHoliday: true, name: movableHoliday.name }
  }

  return { isHoliday: false }
}

// Verificar si una fecha es domingo
export function isSunday(date: Date): boolean {
  return date.getDay() === 0
}

// Verificar si una fecha está bloqueada (domingo o feriado)
export function isBlockedDate(date: Date): { blocked: boolean; reason?: string } {
  if (isSunday(date)) {
    return { blocked: true, reason: 'Domingos no hay atención' }
  }

  const holidayCheck = isHoliday(date)
  if (holidayCheck.isHoliday) {
    return { blocked: true, reason: `Feriado: ${holidayCheck.name}` }
  }

  return { blocked: false }
}

// Obtener todos los feriados de un mes específico
export function getHolidaysInMonth(year: number, month: number): { day: number; name: string }[] {
  const holidays: { day: number; name: string }[] = []

  // Feriados fijos en este mes
  FIXED_HOLIDAYS.filter(h => h.month === month).forEach(h => {
    holidays.push({ day: h.day, name: h.name })
  })

  // Feriados móviles en este mes
  getMovableHolidays(year)
    .filter(h => h.date.getMonth() === month)
    .forEach(h => {
      holidays.push({ day: h.date.getDate(), name: h.name })
    })

  return holidays
}

// Obtener el nombre del mes en español
export function getMonthName(month: number): string {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  return months[month]
}

// Obtener el nombre del día en español
export function getDayName(day: number): string {
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  return days[day]
}

// Obtener nombre completo del día
export function getFullDayName(day: number): string {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  return days[day]
}

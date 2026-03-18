import { google, calendar_v3 } from 'googleapis';

// Configuración de la cuenta de servicio
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

// Información de la clínica para los eventos
const CLINIC_INFO = {
  name: 'Ciruplástica - Dr. Manuel Sinchi',
  address: 'Av. Javier Prado Este 499, San Isidro, Lima, Perú',
  phone: '+51 961 360 074',
  website: 'https://ciruplastica.pe',
};

interface CreateCalendarEventParams {
  patientName: string;
  patientEmail: string;
  procedureName: string;
  procedureCategory: string;
  date: Date;
  timeSlot: string;
  message?: string;
  bookingId: string;
}

interface CalendarEventResult {
  success: boolean;
  eventId?: string;
  eventLink?: string;
  error?: string;
}

/**
 * Obtiene el cliente autenticado de Google Calendar
 */
function getCalendarClient(): calendar_v3.Calendar | null {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!serviceAccountEmail || !privateKey || !calendarId) {
    console.warn('Google Calendar no configurado. Faltan variables de entorno.');
    return null;
  }

  try {
    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey.replace(/\\n/g, '\n'), // Convertir \n string a saltos de línea reales
      scopes: SCOPES,
    });

    return google.calendar({ version: 'v3', auth });
  } catch (error) {
    console.error('Error al inicializar Google Calendar:', error);
    return null;
  }
}

/**
 * Convierte timeSlot (ej: "10:00") a objeto Date con hora específica
 */
function parseTimeSlot(date: Date, timeSlot: string): { start: Date; end: Date } {
  const [hours, minutes] = timeSlot.split(':').map(Number);

  const start = new Date(date);
  start.setHours(hours, minutes, 0, 0);

  // La consulta dura 1 hora por defecto
  const end = new Date(start);
  end.setHours(end.getHours() + 1);

  return { start, end };
}

/**
 * Crea un evento en el calendario del Dr. Sinchi y envía invitación al paciente
 */
export async function createCalendarEvent(
  params: CreateCalendarEventParams
): Promise<CalendarEventResult> {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!calendar || !calendarId) {
    return {
      success: false,
      error: 'Google Calendar no está configurado',
    };
  }

  const { patientName, patientEmail, procedureName, procedureCategory, date, timeSlot, message, bookingId } = params;
  const { start, end } = parseTimeSlot(date, timeSlot);

  // Descripción detallada del evento
  const description = `
CONSULTA MÉDICA - ${procedureCategory}

Paciente: ${patientName}
Email: ${patientEmail}
Procedimiento: ${procedureName}
${message ? `\nNotas del paciente:\n${message}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${CLINIC_INFO.name}
${CLINIC_INFO.address}
Tel: ${CLINIC_INFO.phone}
Web: ${CLINIC_INFO.website}

ID de Reserva: ${bookingId}
`.trim();

  const event: calendar_v3.Schema$Event = {
    summary: `Consulta: ${procedureName} - ${patientName}`,
    description,
    location: CLINIC_INFO.address,
    start: {
      dateTime: start.toISOString(),
      timeZone: 'America/Lima',
    },
    end: {
      dateTime: end.toISOString(),
      timeZone: 'America/Lima',
    },
    // Nota: No usamos attendees porque las cuentas de servicio no pueden
    // enviar invitaciones con cuentas personales de Gmail.
    // El paciente recibirá un archivo .ics para agregar a su calendario.
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 }, // 1 día antes
        { method: 'popup', minutes: 60 },       // 1 hora antes
        { method: 'popup', minutes: 30 },       // 30 minutos antes
      ],
    },
    // Color del evento (púrpura - color de la marca)
    colorId: '3', // Púrpura en Google Calendar
  };

  try {
    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      sendUpdates: 'all', // Envía invitaciones a todos los asistentes
    });

    console.log(`Evento creado: ${response.data.id} para reserva ${bookingId}`);

    return {
      success: true,
      eventId: response.data.id || undefined,
      eventLink: response.data.htmlLink || undefined,
    };
  } catch (error) {
    console.error('Error al crear evento en Google Calendar:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

/**
 * Actualiza un evento existente (cuando se cambia fecha/hora)
 */
export async function updateCalendarEvent(
  eventId: string,
  params: Partial<CreateCalendarEventParams>
): Promise<CalendarEventResult> {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!calendar || !calendarId) {
    return {
      success: false,
      error: 'Google Calendar no está configurado',
    };
  }

  try {
    // Obtener evento actual
    const currentEvent = await calendar.events.get({
      calendarId,
      eventId,
    });

    const updateData: calendar_v3.Schema$Event = { ...currentEvent.data };

    // Actualizar fecha/hora si se proporciona
    if (params.date && params.timeSlot) {
      const { start, end } = parseTimeSlot(params.date, params.timeSlot);
      updateData.start = {
        dateTime: start.toISOString(),
        timeZone: 'America/Lima',
      };
      updateData.end = {
        dateTime: end.toISOString(),
        timeZone: 'America/Lima',
      };
    }

    // Actualizar título si se proporciona nuevo procedimiento
    if (params.procedureName && params.patientName) {
      updateData.summary = `Consulta: ${params.procedureName} - ${params.patientName}`;
    }

    const response = await calendar.events.update({
      calendarId,
      eventId,
      requestBody: updateData,
      sendUpdates: 'all', // Notificar a los asistentes del cambio
    });

    return {
      success: true,
      eventId: response.data.id || undefined,
      eventLink: response.data.htmlLink || undefined,
    };
  } catch (error) {
    console.error('Error al actualizar evento:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

/**
 * Cancela un evento (cuando se cancela la reserva)
 */
export async function cancelCalendarEvent(eventId: string): Promise<CalendarEventResult> {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!calendar || !calendarId) {
    return {
      success: false,
      error: 'Google Calendar no está configurado',
    };
  }

  try {
    await calendar.events.delete({
      calendarId,
      eventId,
      sendUpdates: 'all', // Notificar a los asistentes de la cancelación
    });

    return { success: true };
  } catch (error) {
    console.error('Error al cancelar evento:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

/**
 * Genera un archivo .ics para descarga manual
 */
export function generateICSFile(params: CreateCalendarEventParams): string {
  const { patientName, procedureName, procedureCategory, date, timeSlot, message, bookingId } = params;
  const { start, end } = parseTimeSlot(date, timeSlot);

  // Formatear fechas para ICS (formato: YYYYMMDDTHHMMSS)
  const formatICSDate = (d: Date): string => {
    return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  };

  const description = `Consulta de ${procedureCategory}\\nPaciente: ${patientName}\\nProcedimiento: ${procedureName}\\n${message ? `Notas: ${message}\\n` : ''}\\n${CLINIC_INFO.name}\\nTel: ${CLINIC_INFO.phone}`;

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Ciruplástica//Reservas//ES
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${bookingId}@ciruplastica.pe
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:Consulta: ${procedureName} - Dr. Manuel Sinchi
DESCRIPTION:${description}
LOCATION:${CLINIC_INFO.address}
ORGANIZER;CN=${CLINIC_INFO.name}:mailto:citas@ciruplastica.pe
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Recordatorio: Consulta mañana
END:VALARM
BEGIN:VALARM
TRIGGER:-PT1H
ACTION:DISPLAY
DESCRIPTION:Recordatorio: Consulta en 1 hora
END:VALARM
END:VEVENT
END:VCALENDAR`;

  return icsContent;
}

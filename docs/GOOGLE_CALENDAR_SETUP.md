# Configuración de Google Calendar API

## Paso 1: Habilitar Google Calendar API

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Selecciona tu proyecto existente (el mismo del login de Google)
3. Ve a **APIs y servicios** > **Biblioteca**
4. Busca **"Google Calendar API"**
5. Haz clic en **Habilitar**

## Paso 2: Crear Cuenta de Servicio

La cuenta de servicio permitirá crear eventos automáticamente en el calendario del Dr. Sinchi.

1. Ve a **APIs y servicios** > **Credenciales**
2. Haz clic en **Crear credenciales** > **Cuenta de servicio**
3. Configura:
   - **Nombre**: `ciruplastica-calendar`
   - **ID de cuenta**: `ciruplastica-calendar`
   - Haz clic en **Crear y continuar**
4. En "Otorgar acceso a la cuenta de servicio", haz clic en **Continuar** (sin seleccionar rol)
5. Haz clic en **Listo**

## Paso 3: Crear Clave JSON

1. En la lista de cuentas de servicio, haz clic en `ciruplastica-calendar`
2. Ve a la pestaña **Claves**
3. Haz clic en **Agregar clave** > **Crear clave nueva**
4. Selecciona **JSON** y haz clic en **Crear**
5. Se descargará un archivo JSON (guárdalo de forma segura)

## Paso 4: Compartir Calendario del Dr. con la Cuenta de Servicio

1. Abre [Google Calendar](https://calendar.google.com) con la cuenta del Dr. Sinchi
2. En el panel izquierdo, encuentra el calendario principal
3. Haz clic en los 3 puntos > **Configuración y uso compartido**
4. En **Compartir con personas específicas**, haz clic en **Añadir personas**
5. Agrega el email de la cuenta de servicio (lo encontrarás en el JSON descargado, campo `client_email`)
   - Ejemplo: `ciruplastica-calendar@tu-proyecto.iam.gserviceaccount.com`
6. Selecciona permiso: **Realizar cambios en eventos**
7. Haz clic en **Enviar**

## Paso 5: Configurar Variables de Entorno

Agrega estas variables a tu archivo `.env`:

```env
# ============================================
# GOOGLE CALENDAR API
# ============================================
# Copia estos valores del archivo JSON descargado
GOOGLE_SERVICE_ACCOUNT_EMAIL="ciruplastica-calendar@tu-proyecto.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# ID del calendario del Dr. Sinchi (generalmente es su email)
GOOGLE_CALENDAR_ID="email-del-dr@gmail.com"
```

### Cómo obtener los valores:

1. Abre el archivo JSON descargado
2. Copia el valor de `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
3. Copia el valor de `private_key` → `GOOGLE_PRIVATE_KEY` (incluyendo `\n`)
4. El `GOOGLE_CALENDAR_ID` es el email del Dr. Sinchi (o el ID del calendario si usa uno específico)

## Paso 6: Verificar Configuración

Después de configurar todo, reinicia el servidor de desarrollo:

```bash
npm run dev
```

Al crear una nueva reserva:
- Se creará un evento en el calendario del Dr.
- El paciente recibirá una invitación al evento por email

## Notas Importantes

- **Seguridad**: Nunca compartas el archivo JSON de la cuenta de servicio
- **Permisos**: La cuenta de servicio solo puede acceder a calendarios compartidos con ella
- **Zona horaria**: Los eventos se crean en la zona horaria de Lima (America/Lima)

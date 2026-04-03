import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Usar dominio de prueba de Resend si no hay dominio verificado
// Para producción, verificar dominio en https://resend.com/domains
const FROM_EMAIL = process.env.EMAIL_FROM 
const APP_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000'

export async function sendVerificationEmail(
  email: string,
  token: string,
  name?: string
): Promise<{ success: boolean; error?: string }> {
  const verifyUrl = `${APP_URL}/api/auth/verify-email?token=${token}`

  console.log('📧 Enviando email de verificación a:', email)
  console.log('📧 Desde:', FROM_EMAIL)
  console.log('📧 URL de verificación:', verifyUrl)

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Verifica tu cuenta - Ciruplástica',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: linear-gradient(135deg, #391142 0%, #5a2d6a 100%); padding: 30px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="color: #d4a853; margin: 0; font-size: 28px; letter-spacing: 2px;">CIRUPLÁSTICA</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Dr. Manuel Sinchi</p>
            </div>

            <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              <h2 style="color: #391142; margin: 0 0 20px 0; font-size: 24px;">¡Bienvenido${name ? `, ${name}` : ''}!</h2>

              <p style="color: #555; line-height: 1.6; margin: 0 0 20px 0;">
                Gracias por registrarte en Ciruplástica. Para completar tu registro y acceder a tu cuenta, por favor verifica tu correo electrónico haciendo clic en el siguiente botón:
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${verifyUrl}" style="display: inline-block; background: linear-gradient(135deg, #d4a853 0%, #c49743 100%); color: #391142; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-weight: bold; font-size: 16px; letter-spacing: 1px;">
                  Verificar mi cuenta
                </a>
              </div>

              <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
                Si no puedes hacer clic en el botón, copia y pega este enlace en tu navegador:
                <br>
                <a href="${verifyUrl}" style="color: #391142; word-break: break-all;">${verifyUrl}</a>
              </p>

              <p style="color: #888; font-size: 14px; margin: 20px 0 0 0;">
                Este enlace expirará en 24 horas.
              </p>

              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

              <p style="color: #888; font-size: 12px; text-align: center; margin: 0;">
                Si no solicitaste esta cuenta, puedes ignorar este correo.
              </p>
            </div>

            <p style="color: #888; font-size: 12px; text-align: center; margin: 20px 0 0 0;">
              © ${new Date().getFullYear()} Ciruplástica. Todos los derechos reservados.
            </p>
          </div>
        </body>
        </html>
      `,
    })

    console.log('✅ Email enviado:', result)
    return { success: true }
  } catch (error: unknown) {
    console.error('❌ Error sending verification email:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    return { success: false, error: errorMessage }
  }
}

export async function sendPasswordResetEmail(
  email: string,
  token: string,
  name?: string
): Promise<{ success: boolean; error?: string }> {
  const resetUrl = `${APP_URL}/reset-password?token=${token}`

  console.log('🔑 API Key configurada:', process.env.RESEND_API_KEY ? 'Sí' : 'No')
  console.log('📧 Enviando email de recuperación a:', email)
  console.log('📧 Desde:', FROM_EMAIL)
  console.log('📧 URL de reset:', resetUrl)

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Restablecer contraseña - Ciruplástica',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: linear-gradient(135deg, #391142 0%, #5a2d6a 100%); padding: 30px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="color: #d4a853; margin: 0; font-size: 28px; letter-spacing: 2px;">CIRUPLÁSTICA</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Dr. Manuel Sinchi</p>
            </div>

            <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              <h2 style="color: #391142; margin: 0 0 20px 0; font-size: 24px;">Restablecer contraseña</h2>

              <p style="color: #555; line-height: 1.6; margin: 0 0 20px 0;">
                Hola${name ? ` ${name}` : ''},
                <br><br>
                Recibimos una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el siguiente botón para crear una nueva contraseña:
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #d4a853 0%, #c49743 100%); color: #391142; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-weight: bold; font-size: 16px; letter-spacing: 1px;">
                  Restablecer contraseña
                </a>
              </div>

              <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
                Si no puedes hacer clic en el botón, copia y pega este enlace en tu navegador:
                <br>
                <a href="${resetUrl}" style="color: #391142; word-break: break-all;">${resetUrl}</a>
              </p>

              <p style="color: #888; font-size: 14px; margin: 20px 0 0 0;">
                Este enlace expirará en 1 hora por seguridad.
              </p>

              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

              <p style="color: #888; font-size: 12px; text-align: center; margin: 0;">
                Si no solicitaste restablecer tu contraseña, puedes ignorar este correo. Tu cuenta permanecerá segura.
              </p>
            </div>

            <p style="color: #888; font-size: 12px; text-align: center; margin: 20px 0 0 0;">
              © ${new Date().getFullYear()} Ciruplástica. Todos los derechos reservados.
            </p>
          </div>
        </body>
        </html>
      `,
    })

    console.log('✅ Email de recuperación enviado:', result)
    return { success: true }
  } catch (error) {
    console.error('❌ Error sending password reset email:', error)
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error)
    return { success: false, error: errorMessage }
  }
}

'use server'

import { google } from 'googleapis'

export async function sendEmailViaGmail(formData: {
  name: string
  email: string
  company: string
  message: string
}) {
  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT no configurada')
    }

    if (!process.env.GMAIL_TO_EMAIL) {
      throw new Error('GMAIL_TO_EMAIL no configurada')
    }

    let credentials
    try {
      credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT)
    } catch (parseError) {
      console.error('Error parseando GOOGLE_SERVICE_ACCOUNT:', parseError)
      throw new Error('Credenciales de Google inválidas')
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/gmail.send'],
    })

    const gmail = google.gmail({ version: 'v1', auth })

    const messageBody = `
Nombre: ${formData.name}
Email: ${formData.email}
Empresa: ${formData.company}

Mensaje:
${formData.message}
    `

    const rawMessage = Buffer.from(
      `To: ${process.env.GMAIL_TO_EMAIL}\nSubject: Nuevo mensaje del formulario de Innovas\nFrom: ${formData.email}\n\n${messageBody}`
    ).toString('base64')

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: rawMessage,
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: 'Error al enviar el mensaje' }
  }
}

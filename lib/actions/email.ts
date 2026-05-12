'use server'

import { google } from 'googleapis'

export async function sendEmailViaGmail(formData: {
  name: string
  email: string
  company: string
  message: string
}) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT!),
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

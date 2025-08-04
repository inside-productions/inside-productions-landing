import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, projectType, message } = await request.json()

    // Validar datos requeridos
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Configurar Nodemailer - usando tu cuenta corporativa para enviar
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.COMPANY_EMAIL, // contacto@insideproductions.com
        pass: process.env.COMPANY_EMAIL_PASSWORD, // contraseña de aplicación de tu empresa
      },
    })

    // Mapear tipos de proyecto a nombres legibles
    const projectTypeNames: { [key: string]: string } = {
      'ar': 'Realidad Aumentada',
      'vr': 'Realidad Virtual',
      'mr': 'Realidad Mixta',
      'interactive': 'Experiencia Interactiva',
      'other': 'Otro'
    }

    const projectTypeName = projectTypeNames[projectType] || projectType

    // Configurar el correo
    const mailOptions = {
      from: process.env.COMPANY_EMAIL, // Desde tu cuenta corporativa
      to: process.env.RECEIVE_EMAILS_AT, // Donde quieres recibir los mensajes
      replyTo: email, // El email del cliente para que puedas responder directamente
      subject: `Nuevo contacto desde Inside Productions - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #FCDD2F; background-color: black; padding: 15px; border-radius: 8px; margin: 0;">
                INSIDE PRODUCTIONS
              </h1>
              <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">Nuevo mensaje de contacto</p>
            </div>
            
            <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #FCDD2F; padding-bottom: 10px;">
                Información del Cliente
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555; width: 30%;">Nombre:</td>
                  <td style="padding: 8px 0; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 8px 0; color: #333;">
                    <a href="mailto:${email}" style="color: #FCDD2F; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Tipo de Proyecto:</td>
                  <td style="padding: 8px 0; color: #333;">
                    <span style="background-color: #FCDD2F; color: black; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">
                      ${projectTypeName}
                    </span>
                  </td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px;">
              <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #FCDD2F; padding-bottom: 10px;">
                Mensaje
              </h3>
              <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #FCDD2F; line-height: 1.6; color: #333;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                Este mensaje fue enviado desde el formulario de contacto de<br>
                <strong>Inside Productions</strong> - Inner Visions Outer Realities
              </p>
              <p style="color: #999; font-size: 10px; margin: 10px 0 0 0;">
                Fecha: ${new Date().toLocaleString('es-ES', { 
                  timeZone: 'America/Mexico_City',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
      `,
      // También incluir versión en texto plano
      text: `
INSIDE PRODUCTIONS - Nuevo Contacto

Nombre: ${name}
Email: ${email}
Tipo de Proyecto: ${projectTypeName}

Mensaje:
${message}

---
Enviado el: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Mexico_City' })}
      `,
    }

    // Enviar el correo
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Correo enviado exitosamente' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error enviando correo:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
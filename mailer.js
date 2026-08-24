const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Envía al usuario su código de identificación recién generado.
 * Si el SMTP no está configurado (entorno de desarrollo), no rompe
 * el flujo de registro: solo lo registra en consola.
 */
async function enviarCodigoPorCorreo(email, codigoUsuario) {
  const asunto = 'Tu código de acceso a la plataforma';
  const cuerpoTexto = `¡Bienvenido/a!\n\nTu código de identificación es: ${codigoUsuario}\n\nGuárdalo bien: lo necesitarás junto a tu contraseña para iniciar sesión.\n\nCompleta tu perfil para activar todas las funciones de tu cuenta de alumno.`;
  const cuerpoHtml = `
    <p>¡Bienvenido/a!</p>
    <p>Tu código de identificación es:</p>
    <p style="font-size:22px;font-weight:bold;letter-spacing:1px;">${codigoUsuario}</p>
    <p>Guárdalo bien: lo necesitarás junto a tu contraseña para iniciar sesión.</p>
    <p>Completa tu perfil para activar todas las funciones de tu cuenta de alumno.</p>
  `;

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.warn(`[mailer] SMTP no configurado. Código para ${email}: ${codigoUsuario}`);
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: asunto,
      text: cuerpoTexto,
      html: cuerpoHtml,
    });
  } catch (error) {
    // No bloqueamos el registro si falla el correo; el código ya se
    // muestra en pantalla, que es el requisito principal.
    console.error('Error enviando el correo con el código:', error.message);
  }
}

module.exports = { enviarCodigoPorCorreo };

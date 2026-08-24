const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { generarCodigoUnico } = require('../utils/codeGenerator');
const { enviarCodigoPorCorreo } = require('../utils/mailer');

const SALT_ROUNDS = 10;

function firmarToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id,
      codigoUsuario: usuario.codigo_usuario,
      rol: usuario.rol_nombre || 'invitado',
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

// -----------------------------------------------------------------
// 1. Registro
// -----------------------------------------------------------------
async function registrar(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres.' });
    }

    const existente = await userModel.buscarPorEmail(email.toLowerCase().trim());
    if (existente) {
      return res.status(409).json({ error: 'Ya existe una cuenta con ese correo.' });
    }

    const codigoUsuario = await generarCodigoUnico();
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const usuario = await userModel.crearUsuario({
      email: email.toLowerCase().trim(),
      passwordHash,
      codigoUsuario,
    });

    // El envío de correo no bloquea la respuesta al usuario.
    enviarCodigoPorCorreo(usuario.email, usuario.codigo_usuario);

    const token = firmarToken({ ...usuario, rol_nombre: 'invitado' });

    return res.status(201).json({
      mensaje: 'Registro exitoso. Guarda tu código: lo necesitarás para iniciar sesión.',
      codigoUsuario: usuario.codigo_usuario,
      rol: 'invitado',
      token,
    });
  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json({ error: 'Error interno al registrar el usuario.' });
  }
}

// -----------------------------------------------------------------
// 2. Login por código de usuario
// -----------------------------------------------------------------
async function login(req, res) {
  try {
    const { codigoUsuario, password } = req.body;

    if (!codigoUsuario || !password) {
      return res.status(400).json({ error: 'Código de usuario y contraseña son obligatorios.' });
    }

    const usuario = await userModel.buscarPorCodigo(codigoUsuario.toUpperCase().trim());
    if (!usuario) {
      return res.status(401).json({ error: 'Código de usuario o contraseña incorrectos.' });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordValido) {
      return res.status(401).json({ error: 'Código de usuario o contraseña incorrectos.' });
    }

    await userModel.actualizarUltimoAcceso(usuario.id);

    const token = firmarToken(usuario);

    return res.json({
      mensaje: 'Inicio de sesión correcto.',
      token,
      usuario: {
        codigoUsuario: usuario.codigo_usuario,
        email: usuario.email,
        rol: usuario.rol_nombre,
        perfilCompleto: usuario.perfil_completo,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ error: 'Error interno al iniciar sesión.' });
  }
}

// -----------------------------------------------------------------
// Devuelve el usuario autenticado (para pintar el panel/dashboard)
// -----------------------------------------------------------------
async function perfilActual(req, res) {
  const usuario = await userModel.buscarPorCodigo(req.usuario.codigoUsuario);
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado.' });
  }
  return res.json({
    codigoUsuario: usuario.codigo_usuario,
    email: usuario.email,
    rol: usuario.rol_nombre,
    perfilCompleto: usuario.perfil_completo,
  });
}

module.exports = { registrar, login, perfilActual };

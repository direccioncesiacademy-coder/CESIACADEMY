const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autenticado. Falta el token.' });
  }

  const token = header.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload; // { id, codigoUsuario, rol }
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado.' });
  }
}

/**
 * Middleware para bloquear acciones reservadas a roles superiores a
 * "invitado" (ej. inscribirse a un curso). Se usa como capa de
 * seguridad en el backend, en espejo a la restricción visual del
 * frontend (que deshabilita los botones).
 */
function requerirRolDistintoDeInvitado(req, res, next) {
  if (req.usuario.rol === 'invitado') {
    return res.status(403).json({
      codigo: 'CUENTA_NO_ACTIVADA',
      error: 'Para inscribirte a las clases debes activar tu cuenta completando tu perfil',
    });
  }
  next();
}

module.exports = { verificarToken, requerirRolDistintoDeInvitado };

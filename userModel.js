const pool = require('../config/db');

async function crearUsuario({ email, passwordHash, codigoUsuario }) {
  const { rows } = await pool.query(
    `INSERT INTO usuarios (codigo_usuario, email, password_hash, rol_id, perfil_completo)
     VALUES ($1, $2, $3, (SELECT id FROM roles WHERE nombre = 'invitado'), FALSE)
     RETURNING id, codigo_usuario, email, rol_id, perfil_completo, fecha_creacion`,
    [codigoUsuario, email, passwordHash]
  );
  return rows[0];
}

async function buscarPorEmail(email) {
  const { rows } = await pool.query(
    'SELECT * FROM usuarios WHERE email = $1',
    [email]
  );
  return rows[0] || null;
}

async function buscarPorCodigo(codigoUsuario) {
  const { rows } = await pool.query(
    `SELECT u.*, r.nombre AS rol_nombre
     FROM usuarios u
     JOIN roles r ON r.id = u.rol_id
     WHERE u.codigo_usuario = $1`,
    [codigoUsuario]
  );
  return rows[0] || null;
}

async function actualizarUltimoAcceso(id) {
  await pool.query('UPDATE usuarios SET ultimo_acceso = NOW() WHERE id = $1', [id]);
}

/**
 * Punto de extensión para el Bloque 2: al completar el perfil real
 * (nombre, teléfono, etc.), se sube de rol "invitado" -> "alumno".
 */
async function completarPerfilYAscenderAAlumno(id, { nombreCompleto, telefono }) {
  const { rows } = await pool.query(
    `UPDATE usuarios
     SET nombre_completo = $2,
         telefono = $3,
         perfil_completo = TRUE,
         rol_id = (SELECT id FROM roles WHERE nombre = 'alumno')
     WHERE id = $1
     RETURNING id, codigo_usuario, email, rol_id, perfil_completo`,
    [id, nombreCompleto, telefono]
  );
  return rows[0];
}

module.exports = {
  crearUsuario,
  buscarPorEmail,
  buscarPorCodigo,
  actualizarUltimoAcceso,
  completarPerfilYAscenderAAlumno,
};

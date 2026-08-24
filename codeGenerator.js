const pool = require('../config/db');

const PREFIJO = 'ALU';
const LONGITUD_NUMERO = 5;

/**
 * Genera un bloque numérico aleatorio de LONGITUD_NUMERO dígitos.
 * Ej: 83920
 */
function generarBloqueNumerico() {
  const min = 10 ** (LONGITUD_NUMERO - 1);
  const max = 10 ** LONGITUD_NUMERO - 1;
  const numero = Math.floor(min + Math.random() * (max - min + 1));
  return String(numero);
}

/**
 * Genera un código único de tipo ALU-XXXXX, verificando contra la base
 * de datos que no exista ya (colisión extremadamente improbable, pero
 * se comprueba igualmente para garantizar unicidad real).
 */
async function generarCodigoUnico() {
  const MAX_INTENTOS = 10;

  for (let intento = 0; intento < MAX_INTENTOS; intento++) {
    const codigo = `${PREFIJO}-${generarBloqueNumerico()}`;

    const { rows } = await pool.query(
      'SELECT id FROM usuarios WHERE codigo_usuario = $1',
      [codigo]
    );

    if (rows.length === 0) {
      return codigo;
    }
  }

  throw new Error('No se pudo generar un código único tras varios intentos. Intenta de nuevo.');
}

module.exports = { generarCodigoUnico };

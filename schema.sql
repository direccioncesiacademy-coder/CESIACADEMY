-- ============================================================
-- Bloque 1: Registro / Login por código / Rol Invitado
-- ============================================================

CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(30) UNIQUE NOT NULL
);

INSERT INTO roles (nombre) VALUES
  ('invitado'),
  ('alumno'),
  ('profesor'),
  ('admin')
ON CONFLICT (nombre) DO NOTHING;

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  codigo_usuario VARCHAR(20) UNIQUE NOT NULL,   -- ej. ALU-83920
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  rol_id INTEGER NOT NULL REFERENCES roles(id) DEFAULT 1, -- 1 = invitado
  perfil_completo BOOLEAN NOT NULL DEFAULT FALSE,
  nombre_completo VARCHAR(150),
  telefono VARCHAR(30),
  fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW(),
  ultimo_acceso TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_usuarios_codigo ON usuarios (codigo_usuario);
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios (email);

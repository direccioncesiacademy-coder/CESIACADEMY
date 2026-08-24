// Catálogo de ejemplo en memoria. En un caso real vendría de la BD.
const CURSOS_DEMO = [
  { id: 1, titulo: 'Introducción a la Programación', gratuito: true },
  { id: 2, titulo: 'Fundamentos de Diseño Web', gratuito: true },
  { id: 3, titulo: 'Marketing Digital Avanzado', gratuito: false },
];

// Cualquier usuario (incluido Invitado) puede VER el catálogo.
function listarCatalogo(req, res) {
  return res.json({ cursos: CURSOS_DEMO });
}

// Solo llega aquí si pasó el middleware requerirRolDistintoDeInvitado.
function inscribirse(req, res) {
  const { cursoId } = req.params;
  const curso = CURSOS_DEMO.find((c) => c.id === Number(cursoId));

  if (!curso) {
    return res.status(404).json({ error: 'Curso no encontrado.' });
  }

  // Aquí iría la lógica real de inscripción (Bloque 2/3).
  return res.json({ mensaje: `Inscripción registrada en "${curso.titulo}".` });
}

module.exports = { listarCatalogo, inscribirse };

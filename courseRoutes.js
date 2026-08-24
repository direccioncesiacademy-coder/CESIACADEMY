const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { verificarToken, requerirRolDistintoDeInvitado } = require('../middleware/authMiddleware');

// Ver catálogo: accesible para todos los roles autenticados (incluido Invitado)
router.get('/', verificarToken, courseController.listarCatalogo);

// Inscribirse: bloqueado para el rol Invitado (ver middleware)
router.post(
  '/:cursoId/inscribirse',
  verificarToken,
  requerirRolDistintoDeInvitado,
  courseController.inscribirse
);

module.exports = router;

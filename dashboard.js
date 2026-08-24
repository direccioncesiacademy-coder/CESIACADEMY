const API_BASE = 'http://localhost:4000/api';

const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'login.html';
}

const chipRol = document.getElementById('chipRol');
const bannerActivacion = document.getElementById('bannerActivacion');
const rejillaCursos = document.getElementById('rejillaCursos');
const fondoModal = document.getElementById('fondoModal');

let rolActual = 'invitado';

function cabeceras() {
  return { Authorization: `Bearer ${token}` };
}

async function cargarPerfil() {
  const respuesta = await fetch(`${API_BASE}/auth/perfil`, { headers: cabeceras() });
  if (!respuesta.ok) {
    window.location.href = 'login.html';
    return;
  }
  const perfil = await respuesta.json();
  rolActual = perfil.rol;

  chipRol.textContent = rolActual.charAt(0).toUpperCase() + rolActual.slice(1);

  // El banner de activación solo aplica al rol Invitado.
  bannerActivacion.style.display = rolActual === 'invitado' ? 'flex' : 'none';
}

async function cargarCursos() {
  const respuesta = await fetch(`${API_BASE}/cursos`, { headers: cabeceras() });
  const { cursos } = await respuesta.json();

  rejillaCursos.innerHTML = '';

  cursos.forEach((curso) => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-curso';

    const titulo = document.createElement('h3');
    titulo.textContent = curso.titulo;

    const boton = document.createElement('button');
    const esInvitado = rolActual === 'invitado';

    boton.textContent = esInvitado ? 'Acceder al curso (bloqueado)' : 'Inscribirse';
    // Restricción clave: el botón queda deshabilitado visualmente para Invitado.
    boton.disabled = esInvitado;
    boton.addEventListener('click', () => intentarInscribirse(curso.id));

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(boton);
    rejillaCursos.appendChild(tarjeta);
  });
}

async function intentarInscribirse(cursoId) {
  // Aviso inmediato en el cliente para Invitados (el botón ya está
  // deshabilitado, pero esto cubre casos como doble verificación).
  if (rolActual === 'invitado') {
    abrirModal();
    return;
  }

  const respuesta = await fetch(`${API_BASE}/cursos/${cursoId}/inscribirse`, {
    method: 'POST',
    headers: cabeceras(),
  });
  const datos = await respuesta.json();

  if (respuesta.status === 403 && datos.codigo === 'CUENTA_NO_ACTIVADA') {
    abrirModal();
    return;
  }

  alert(datos.mensaje || datos.error);
}

function abrirModal() {
  fondoModal.classList.add('visible');
}

function cerrarModal() {
  fondoModal.classList.remove('visible');
}

document.getElementById('btnCerrarModal').addEventListener('click', cerrarModal);
document.getElementById('btnCompletarDesdeModal').addEventListener('click', () => {
  window.location.href = 'completar-perfil.html'; // Bloque 2
});
document.getElementById('btnCompletarPerfil').addEventListener('click', () => {
  window.location.href = 'completar-perfil.html'; // Bloque 2
});

cargarPerfil().then(cargarCursos);

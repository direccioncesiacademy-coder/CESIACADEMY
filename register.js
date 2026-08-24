const API_BASE = 'http://localhost:4000/api';

const formRegistro = document.getElementById('formRegistro');
const mensajeError = document.getElementById('mensajeError');
const tarjetaCodigo = document.getElementById('tarjetaCodigo');
const codigoGenerado = document.getElementById('codigoGenerado');
const btnRegistrar = document.getElementById('btnRegistrar');
const btnIrLogin = document.getElementById('btnIrLogin');

function mostrarError(texto) {
  mensajeError.textContent = texto;
  mensajeError.classList.add('visible');
}

function ocultarError() {
  mensajeError.classList.remove('visible');
}

formRegistro.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  ocultarError();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  btnRegistrar.disabled = true;
  btnRegistrar.textContent = 'Creando cuenta...';

  try {
    const respuesta = await fetch(`${API_BASE}/auth/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      mostrarError(datos.error || 'No se pudo completar el registro.');
      return;
    }

    // Guardamos el token para que el usuario ya quede logueado como Invitado
    localStorage.setItem('token', datos.token);
    localStorage.setItem('codigoUsuario', datos.codigoUsuario);

    codigoGenerado.textContent = datos.codigoUsuario;
    tarjetaCodigo.classList.add('visible');
    formRegistro.style.display = 'none';
  } catch (error) {
    mostrarError('No se pudo conectar con el servidor. Inténtalo de nuevo.');
  } finally {
    btnRegistrar.disabled = false;
    btnRegistrar.textContent = 'Registrarme';
  }
});

btnIrLogin.addEventListener('click', () => {
  window.location.href = 'dashboard.html';
});

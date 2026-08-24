const API_BASE = 'http://localhost:4000/api';

const formLogin = document.getElementById('formLogin');
const mensajeError = document.getElementById('mensajeError');
const btnLogin = document.getElementById('btnLogin');

function mostrarError(texto) {
  mensajeError.textContent = texto;
  mensajeError.classList.add('visible');
}

formLogin.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  mensajeError.classList.remove('visible');

  const codigoUsuario = document.getElementById('codigoUsuario').value.trim().toUpperCase();
  const password = document.getElementById('password').value;

  btnLogin.disabled = true;
  btnLogin.textContent = 'Entrando...';

  try {
    const respuesta = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigoUsuario, password }),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      mostrarError(datos.error || 'No se pudo iniciar sesión.');
      return;
    }

    localStorage.setItem('token', datos.token);
    localStorage.setItem('codigoUsuario', datos.usuario.codigoUsuario);

    window.location.href = 'dashboard.html';
  } catch (error) {
    mostrarError('No se pudo conectar con el servidor. Inténtalo de nuevo.');
  } finally {
    btnLogin.disabled = false;
    btnLogin.textContent = 'Entrar';
  }
});

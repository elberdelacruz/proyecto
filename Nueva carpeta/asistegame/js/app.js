// ===== AsisteGame - Aplicación Principal =====

let GAME_DATA = null;
let CURRENT_USER = null;
let USERS_DB = JSON.parse(localStorage.getItem('asistegame_users')) || [];
let CURRENT_SECTION = 'dashboard';

const MENSAJES_MOTIVADORES = [
  "¡Sigue así, vas excelente! 🌟", "Cada día cuenta, ¡tú puedes! 💪",
  "La constancia es la clave del éxito 📚", "¡Orgullosa de ti! Sigue brillando ✨",
  "Un día a la vez, hacia la meta 🎯", "¡Eres una estrella! ⭐",
  "Nunca te rindas, lo estás logrando 🌈", "La disciplina es tu superpoder 🦸",
  "¡Disfruta el camino al éxito! 🏆", "Tu esfuerzo vale la pena 💎",
  "¡Clase tras clase, más fuerte! 💪", "La escuela es tu segundo hogar 🏫",
  "Cada asistencia es un paso al futuro 🚀", "¡Tú marcas la diferencia! 🌟"
];

// ===== Inicialización =====
document.addEventListener('DOMContentLoaded', () => {
  GAME_DATA = GAME_DATA_EMBEDDED;
  inicializarApp();
});

const GAME_DATA_EMBEDDED = {
  niveles: [
    { id: 1, nombre: 'Novata', xpMinimo: 0, xpMaximo: 100, icono: '🌱', color: '#4CAF50' },
    { id: 2, nombre: 'Organizada', xpMinimo: 100, xpMaximo: 300, icono: '📋', color: '#2196F3' },
    { id: 3, nombre: 'Responsable', xpMinimo: 300, xpMaximo: 600, icono: '⭐', color: '#9C27B0' },
    { id: 4, nombre: 'Ejemplar', xpMinimo: 600, xpMaximo: 1000, icono: '🏆', color: '#FF9800' },
    { id: 5, nombre: 'Líder Escolar', xpMinimo: 1000, xpMaximo: Infinity, icono: '👑', color: '#F44336' }
  ],
  logros: [
    { id: 'primera-asistencia', nombre: 'Primer Paso', descripcion: 'Registra tu primera asistencia', icono: '🚶', recompensa: { xp: 10, puntos: 5 } },
    { id: 'semana-perfecta', nombre: 'Semana Dorada', descripcion: 'Asistencia perfecta durante una semana', icono: '🌟', recompensa: { xp: 50, puntos: 25 } },
    { id: 'mes-perfecto', nombre: 'Mes de Excelencia', descripcion: 'Mes completo sin faltas', icono: '📅', recompensa: { xp: 100, puntos: 50 } },
    { id: 'racha-7', nombre: 'Constante', descripcion: 'Mantén una racha de 7 días de asistencia', icono: '🔥', recompensa: { xp: 75, puntos: 35 } },
    { id: 'racha-30', nombre: 'Inquebrantable', descripcion: 'Mantén una racha de 30 días de asistencia', icono: '💎', recompensa: { xp: 200, puntos: 100 } },
    { id: 'puntual-7', nombre: 'Relojito', descripcion: '7 días consecutivos llegando puntual', icono: '⏰', recompensa: { xp: 60, puntos: 30 } },
    { id: 'puntual-30', nombre: 'Maestra del Tiempo', descripcion: '30 días consecutivos llegando puntual', icono: '⌛', recompensa: { xp: 150, puntos: 75 } },
    { id: 'nivel-3', nombre: 'Ascendiendo', descripcion: 'Alcanza el nivel Responsable', icono: '📈', recompensa: { xp: 100, puntos: 50 } },
    { id: 'nivel-5', nombre: 'Cima del Éxito', descripcion: 'Alcanza el nivel Líder Escolar', icono: '🗻', recompensa: { xp: 300, puntos: 150 } },
    { id: 'mascota-evolucion-1', nombre: 'Primera Evolución', descripcion: 'Evoluciona tu mascota por primera vez', icono: '🐣', recompensa: { xp: 50, puntos: 25 } },
    { id: 'mascota-evolucion-3', nombre: 'Compañera Fiel', descripcion: 'Evoluciona tu mascota 3 veces', icono: '🦋', recompensa: { xp: 150, puntos: 75 } },
    { id: 'misiones-5', nombre: 'Aventurera', descripcion: 'Completa 5 misiones', icono: '🗺️', recompensa: { xp: 80, puntos: 40 } },
    { id: 'misiones-15', nombre: 'Exploradora Incansable', descripcion: 'Completa 15 misiones', icono: '🌍', recompensa: { xp: 200, puntos: 100 } },
    { id: 'minijuego-1', nombre: 'Jugona', descripcion: 'Juega tu primer minijuego', icono: '🎮', recompensa: { xp: 20, puntos: 10 } },
    { id: 'minijuego-10', nombre: 'Gamer Elite', descripcion: 'Juega 10 minijuegos', icono: '🕹️', recompensa: { xp: 100, puntos: 50 } },
    { id: 'top-3-ranking', nombre: 'Podio de Honor', descripcion: 'Estar en el top 3 del ranking general', icono: '🥇', recompensa: { xp: 120, puntos: 60 } }
  ],
  misiones: [
    { id: 'm1', titulo: 'Preparar la mochila', descripcion: 'Organiza tu mochila la noche anterior', puntos: 15, xp: 20, tipo: 'recomendacion' },
    { id: 'm2', titulo: 'Alarma matutina', descripcion: 'Programa una alarma para llegar temprano', puntos: 15, xp: 20, tipo: 'recomendacion' },
    { id: 'm3', titulo: 'Horario de estudio', descripcion: 'Organiza tu horario de estudio semanal', puntos: 20, xp: 25, tipo: 'recomendacion' },
    { id: 'm4', titulo: 'Dormir temprano', descripcion: 'Duérmete antes de las 10pm por 3 días seguidos', puntos: 25, xp: 30, tipo: 'recomendacion' },
    { id: 'm5', titulo: 'Revisar horario', descripcion: 'Revisa tu horario escolar cada mañana', puntos: 10, xp: 15, tipo: 'recomendacion' },
    { id: 'd1', titulo: 'Semana perfecta', descripcion: 'No faltes ni llegues tarde toda la semana', puntos: 50, xp: 60, tipo: 'desafio' },
    { id: 'd2', titulo: 'Racha de 5 días', descripcion: 'Acumula 5 días consecutivos de asistencia', puntos: 30, xp: 40, tipo: 'desafio' },
    { id: 'd3', titulo: 'Puntualidad extrema', descripcion: 'Llega puntual 10 días seguidos', puntos: 40, xp: 50, tipo: 'desafio' },
    { id: 'd4', titulo: 'Ayuda a una compañera', descripcion: 'Ayuda a otra estudiante a mejorar su asistencia', puntos: 35, xp: 45, tipo: 'desafio' }
  ],
  recomendaciones: [
    { id: 'r1', titulo: 'Prepara tu mochila', descripcion: 'Organizar tus útiles la noche anterior te ayudará a salir a tiempo.', accion: 'Organizar mochila', misionId: 'm1' },
    { id: 'r2', titulo: 'Programa alarmas', descripcion: 'Poner varias alarmas con margen de tiempo evita contratiempos.', accion: 'Configurar alarmas', misionId: 'm2' },
    { id: 'r3', titulo: 'Duerme mejor', descripcion: 'Dormir al menos 8 horas mejora tu concentración y puntualidad.', accion: 'Mejorar sueño', misionId: 'm4' },
    { id: 'r4', titulo: 'Revisa tu horario', descripcion: 'Saber qué clases tienes cada día te ayuda a prepararte mejor.', accion: 'Revisar horario', misionId: 'm5' },
    { id: 'r5', titulo: 'Desayuna tranquila', descripcion: 'Levantarte 15 min antes te permite desayunar sin prisas.', accion: 'Despertar más temprano', misionId: 'm2' }
  ],
  aparienciasMascota: [
    { nivel: 1, nombre: 'Huevito', emoji: '🥚', color: '#FFF9C4', tamano: 40, accesorios: [] },
    { nivel: 2, nombre: 'Pollito', emoji: '🐤', color: '#FFF176', tamano: 50, accesorios: ['lentes'] },
    { nivel: 3, nombre: 'Gatita', emoji: '🐱', color: '#FFCC80', tamano: 60, accesorios: ['lentes', 'moño'] },
    { nivel: 4, nombre: 'Zorra Estelar', emoji: '🦊', color: '#FF8A65', tamano: 70, accesorios: ['lentes', 'moño', 'capa'] },
    { nivel: 5, nombre: 'Dragón Guardián', emoji: '🐉', color: '#CE93D8', tamano: 85, accesorios: ['lentes', 'corona', 'capa', 'varita'] }
  ],
  emocionesMascota: [
    { nombre: 'feliz', emoji: '😊', requisito: 'asistencia >= 80%' },
    { nombre: 'emocionada', emoji: '🤩', requisito: 'racha >= 5' },
    { nombre: 'orgullosa', emoji: '😌', requisito: 'logro nuevo' },
    { nombre: 'triste', emoji: '😢', requisito: 'falta injustificada' },
    { nombre: 'animadora', emoji: '💪', requisito: 'mision completada' }
  ],
  minijuegos: [
    { id: 'memoria', nombre: 'Memoria Escolar', descripcion: 'Encuentra los pares de útiles escolares', icono: '🧠', desbloqueo: 'logro:primera-asistencia', tipo: 'memoria' },
    { id: 'organizacion', nombre: 'Organiza tu tiempo', descripcion: 'Ordena las actividades en el horario correcto', icono: '📅', desbloqueo: 'nivel:2', tipo: 'arrastrar' },
    { id: 'concentracion', nombre: 'Encuentra la diferencia', descripcion: 'Encuentra las diferencias en los horarios', icono: '🔍', desbloqueo: 'logro:racha-7', tipo: 'diferencias' },
    { id: 'logica', nombre: 'Ruta escolar', descripcion: 'Encuentra la ruta más eficiente a la escuela', icono: '🧩', desbloqueo: 'nivel:3', tipo: 'laberinto' }
  ]
};

function inicializarApp() {
  configurarNavegacion();
  configurarAuth();
  const sesion = localStorage.getItem('asistegame_session');
  if (sesion) {
    const user = USERS_DB.find(u => u.email === sesion);
    if (user) { CURRENT_USER = user; mostrarApp(); }
    else { localStorage.removeItem('asistegame_session'); mostrarAuth(); }
  } else { mostrarAuth(); }
}

// ===== Navegación =====
function configurarNavegacion() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => navegarA(item.dataset.section));
  });
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const parent = tab.parentElement;
      parent.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabName = tab.dataset.tab;
      if (tabName) {
        const container = parent.closest('.chart-container, .card');
        if (container) {
          container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
          const content = container.querySelector(`.tab-content[data-tab="${tabName}"]`);
          if (content) content.classList.add('active');
        }
      }
    });
  });
}

function navegarA(section) {
  CURRENT_SECTION = section;
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.section === section));
  document.querySelectorAll('.page-section').forEach(page => page.classList.toggle('active', page.id === `page-${section}`));
  switch (section) {
    case 'dashboard': cargarDashboard(); break;
    case 'perfil': cargarPerfil(); break;
    case 'mascota': cargarMascota(); break;
    case 'logros': cargarLogros(); break;
    case 'misiones': cargarMisiones(); break;
    case 'rankings': cargarRankings(); break;
    case 'minijuegos': cargarMinijuegos(); break;
  }
}

// ===== Autenticación =====
function configurarAuth() {
  document.getElementById('btn-register').addEventListener('click', registrarAlumna);
  document.getElementById('btn-login').addEventListener('click', iniciarSesion);
  document.getElementById('btn-logout').addEventListener('click', cerrarSesion);
  document.getElementById('show-login').addEventListener('click', (e) => { e.preventDefault(); document.getElementById('register-screen').style.display = 'none'; document.getElementById('login-screen').style.display = 'block'; });
  document.getElementById('show-register').addEventListener('click', (e) => { e.preventDefault(); document.getElementById('register-screen').style.display = 'block'; document.getElementById('login-screen').style.display = 'none'; });
}

function mostrarAuth() {
  document.getElementById('auth-container').style.display = 'flex';
  document.getElementById('app-container').style.display = 'none';
  document.getElementById('register-screen').style.display = 'block';
  document.getElementById('login-screen').style.display = 'none';
}

function mostrarApp() {
  document.getElementById('auth-container').style.display = 'none';
  document.getElementById('app-container').style.display = 'block';
  actualizarSidebarUsuario();
  navegarA('dashboard');
}

function registrarAlumna() {
  const error = document.getElementById('register-error');
  error.style.display = 'none';
  const nombres = document.getElementById('reg-nombres').value.trim();
  const apellidos = document.getElementById('reg-apellidos').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const grado = document.getElementById('reg-grado').value;
  const seccion = document.getElementById('reg-seccion').value.toUpperCase();
  if (!nombres || !apellidos || !email || !password || !grado || !seccion) {
    error.textContent = 'Todos los campos son obligatorios'; error.style.display = 'block'; return;
  }
  if (USERS_DB.find(u => u.email === email)) {
    error.textContent = 'Este correo ya está registrado'; error.style.display = 'block'; return;
  }
  if (password.length < 6) {
    error.textContent = 'La contraseña debe tener al menos 6 caracteres'; error.style.display = 'block'; return;
  }
  const newUser = {
    id: Date.now().toString(), nombres, apellidos, email, password, grado, seccion,
    xp: 0, puntos: 0, nivel: 1, racha: 0, maxRacha: 0,
    asistenciaTotal: 0, tardanzas: 0, faltasJustificadas: 0, faltasInjustificadas: 0,
    registroDiario: [], logrosObtenidos: [], misionesCompletadas: [],
    mascotaNivel: 1, mascotaAccesorios: [], mascotaAlimentada: false, mascotaFelicidad: 50,
    minijuegosGanados: [], ultimaActividad: null, fechaRegistro: new Date().toISOString()
  };
  generarHistorialEjemplo(newUser);
  USERS_DB.push(newUser);
  localStorage.setItem('asistegame_users', JSON.stringify(USERS_DB));
  CURRENT_USER = newUser;
  localStorage.setItem('asistegame_session', email);
  mostrarToast('¡Registro exitoso! Bienvenida a AsisteGame 🎉', '🎉');
  mostrarApp();
}

function iniciarSesion() {
  const error = document.getElementById('login-error');
  error.style.display = 'none';
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const user = USERS_DB.find(u => u.email === email && u.password === password);
  if (!user) { error.textContent = 'Credenciales incorrectas'; error.style.display = 'block'; return; }
  CURRENT_USER = user;
  localStorage.setItem('asistegame_session', email);
  mostrarToast('¡Bienvenida de vuelta! 🌟', '👋');
  mostrarApp();
}

function cerrarSesion() {
  CURRENT_USER = null;
  localStorage.removeItem('asistegame_session');
  mostrarAuth();
  mostrarToast('Sesión cerrada', '👋');
}

// ===== Sidebar =====
function actualizarSidebarUsuario() {
  if (!CURRENT_USER) return;
  const iniciales = (CURRENT_USER.nombres.charAt(0) + CURRENT_USER.apellidos.charAt(0)).toUpperCase();
  document.getElementById('sidebar-avatar').textContent = iniciales;
  document.getElementById('sidebar-name').textContent = `${CURRENT_USER.nombres} ${CURRENT_USER.apellidos}`;
  document.getElementById('sidebar-level').textContent = `${obtenerNivel().icono} ${obtenerNivel().nombre}`;
  document.getElementById('sidebar-xp').textContent = `${CURRENT_USER.xp} XP`;
}

// ===== Utilidades =====
function obtenerNivel() {
  if (!GAME_DATA) return { id: 1, nombre: 'Novata', xpMinimo: 0, xpMaximo: 100, icono: '🌱', color: '#00f0ff' };
  let nivelActual = GAME_DATA.niveles[0];
  for (const nivel of GAME_DATA.niveles) {
    if (CURRENT_USER.xp >= nivel.xpMinimo && CURRENT_USER.xp < nivel.xpMaximo) nivelActual = nivel;
  }
  return nivelActual;
}

function obtenerSiguienteNivel() {
  if (!GAME_DATA) return null;
  const nivelActual = obtenerNivel();
  const idx = GAME_DATA.niveles.findIndex(n => n.id === nivelActual.id);
  return idx < GAME_DATA.niveles.length - 1 ? GAME_DATA.niveles[idx + 1] : null;
}

function progresoNivel() {
  const nivel = obtenerNivel();
  const siguiente = obtenerSiguienteNivel();
  if (!siguiente) return 100;
  return Math.min(100, Math.round(((CURRENT_USER.xp - nivel.xpMinimo) / (siguiente.xpMinimo - nivel.xpMinimo)) * 100));
}

function porcentajeAsistencia() {
  const total = CURRENT_USER.asistenciaTotal + CURRENT_USER.tardanzas + CURRENT_USER.faltasJustificadas + CURRENT_USER.faltasInjustificadas;
  return total === 0 ? 0 : Math.round((CURRENT_USER.asistenciaTotal / total) * 100);
}

function generarHistorialEjemplo(user) {
  const registros = [];
  const hoy = new Date();
  for (let i = 60; i >= 0; i--) {
    const fecha = new Date(hoy);
    fecha.setDate(fecha.getDate() - i);
    if (fecha.getDay() === 0 || fecha.getDay() === 6) continue;
    const rand = Math.random();
    let estado;
    if (rand < 0.65) { estado = 'asistio'; user.asistenciaTotal++; }
    else if (rand < 0.80) { estado = 'tardanza'; user.tardanzas++; }
    else if (rand < 0.90) { estado = 'falta-justificada'; user.faltasJustificadas++; }
    else { estado = 'falta-injustificada'; user.faltasInjustificadas++; }
    registros.push({ fecha: fecha.toISOString().split('T')[0], estado, recomendacion: null });
    if (estado === 'asistio') { user.racha++; if (user.racha > user.maxRacha) user.maxRacha = user.racha; }
    else { user.racha = 0; }
  }
  user.registroDiario = registros;
  user.xp = Math.floor(Math.random() * 200) + 50;
  user.ultimaActividad = registros[registros.length - 1]?.fecha;
}

// ===== Toast =====
function mostrarToast(mensaje, icono = '📢') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icono}</span><span class="toast-message">${mensaje}</span><button class="toast-close">&times;</button>`;
  document.body.appendChild(toast);
  toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());
  setTimeout(() => {
    if (toast.parentElement) { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; setTimeout(() => toast.remove(), 300); }
  }, 4000);
}

// ===== Level Up Modal =====
function mostrarLevelUp(nuevoNivel) {
  const overlay = document.getElementById('levelup-overlay');
  document.getElementById('levelup-icon').textContent = nuevoNivel.icono;
  document.getElementById('levelup-title').textContent = `¡Subiste a nivel ${nuevoNivel.nombre}!`;
  document.getElementById('levelup-desc').textContent = `Has alcanzado el nivel ${nuevoNivel.nombre}. ¡Sigue así!`;
  // Evolución de mascota al subir de nivel
  if (CURRENT_USER.mascotaNivel < 5 && nuevoNivel.id > CURRENT_USER.mascotaNivel) {
    CURRENT_USER.mascotaNivel = Math.min(CURRENT_USER.mascotaNivel + 1, 5);
    const accs = ['lentes', 'moño', 'capa', 'corona', 'varita'];
    const nuevoAcc = accs[CURRENT_USER.mascotaNivel - 1];
    if (nuevoAcc && !CURRENT_USER.mascotaAccesorios.includes(nuevoAcc)) {
      CURRENT_USER.mascotaAccesorios.push(nuevoAcc);
    }
    guardarUsuario();
  }
  overlay.classList.add('show');
  document.getElementById('btn-levelup-close').onclick = () => overlay.classList.remove('show');
}

// ===== Simular Día =====
function simularDia() {
  if (!CURRENT_USER) return;
  const rand = Math.random();
  let estado;
  if (rand < 0.60) {
    estado = 'asistio';
    CURRENT_USER.asistenciaTotal++;
    CURRENT_USER.racha++;
    if (CURRENT_USER.racha > CURRENT_USER.maxRacha) CURRENT_USER.maxRacha = CURRENT_USER.racha;
    CURRENT_USER.xp += 15; CURRENT_USER.puntos += 10;
    CURRENT_USER.mascotaFelicidad = Math.min(100, CURRENT_USER.mascotaFelicidad + 5);
  } else if (rand < 0.78) {
    estado = 'tardanza';
    CURRENT_USER.tardanzas++;
    CURRENT_USER.racha = 0;
    CURRENT_USER.xp += 5; CURRENT_USER.puntos += 2;
    CURRENT_USER.mascotaFelicidad = Math.max(0, CURRENT_USER.mascotaFelicidad - 3);
  } else if (rand < 0.90) {
    estado = 'falta-justificada';
    CURRENT_USER.faltasJustificadas++;
    CURRENT_USER.racha = 0;
    CURRENT_USER.mascotaFelicidad = Math.max(0, CURRENT_USER.mascotaFelicidad - 5);
  } else {
    estado = 'falta-injustificada';
    CURRENT_USER.faltasInjustificadas++;
    CURRENT_USER.racha = 0;
    CURRENT_USER.mascotaFelicidad = Math.max(0, CURRENT_USER.mascotaFelicidad - 10);
  }
  const hoy = new Date().toISOString().split('T')[0];
  CURRENT_USER.registroDiario.push({ fecha: hoy, estado, recomendacion: null });
  CURRENT_USER.ultimaActividad = hoy;
  const nivelAntes = obtenerNivel();
  guardarUsuario();
  const nivelDespues = obtenerNivel();
  if (nivelDespues.id > nivelAntes.id) mostrarLevelUp(nivelDespues);
  verificarLogros();
  cargarDashboard();
  mostrarToast(`Día registrado: ${estadoToTexto(estado)}`, estadoToIcono(estado));
}

function estadoToTexto(estado) {
  const map = { 'asistio': 'Asistió ✅', 'tardanza': 'Tardanza ⏰', 'falta-justificada': 'Falta Justificada 📝', 'falta-injustificada': 'Falta Injustificada ❌' };
  return map[estado] || estado;
}
function estadoToIcono(estado) {
  const map = { 'asistio': '✅', 'tardanza': '⏰', 'falta-justificada': '📝', 'falta-injustificada': '❌' };
  return map[estado] || '📌';
}

// ===== Guardar =====
function guardarUsuario() {
  const idx = USERS_DB.findIndex(u => u.id === CURRENT_USER.id);
  if (idx >= 0) { USERS_DB[idx] = CURRENT_USER; localStorage.setItem('asistegame_users', JSON.stringify(USERS_DB)); }
  actualizarSidebarUsuario();
}

// ===== Verificar Logros =====
function verificarLogros() {
  if (!GAME_DATA) return;
  for (const logro of GAME_DATA.logros) {
    if (CURRENT_USER.logrosObtenidos.includes(logro.id)) continue;
    let obtenido = false;
    switch (logro.id) {
      case 'primera-asistencia': obtenido = CURRENT_USER.asistenciaTotal >= 1; break;
      case 'semana-perfecta': obtenido = CURRENT_USER.racha >= 5; break;
      case 'mes-perfecto': obtenido = CURRENT_USER.racha >= 20; break;
      case 'racha-7': obtenido = CURRENT_USER.maxRacha >= 7; break;
      case 'racha-30': obtenido = CURRENT_USER.maxRacha >= 30; break;
      case 'puntual-7': obtenido = CURRENT_USER.tardanzas === 0 && CURRENT_USER.racha >= 7; break;
      case 'puntual-30': obtenido = CURRENT_USER.tardanzas === 0 && CURRENT_USER.racha >= 30; break;
      case 'nivel-3': obtenido = CURRENT_USER.nivel >= 3; break;
      case 'nivel-5': obtenido = CURRENT_USER.nivel >= 5; break;
      case 'mascota-evolucion-1': obtenido = CURRENT_USER.mascotaNivel >= 2; break;
      case 'mascota-evolucion-3': obtenido = CURRENT_USER.mascotaNivel >= 4; break;
      case 'misiones-5': obtenido = CURRENT_USER.misionesCompletadas.length >= 5; break;
      case 'misiones-15': obtenido = CURRENT_USER.misionesCompletadas.length >= 15; break;
      case 'minijuego-1': obtenido = CURRENT_USER.minijuegosGanados.length >= 1; break;
      case 'minijuego-10': obtenido = CURRENT_USER.minijuegosGanados.length >= 10; break;
      case 'top-3-ranking':
        const sorted = [...USERS_DB].sort((a, b) => b.xp - a.xp);
        const pos = sorted.findIndex(u => u.id === CURRENT_USER.id) + 1;
        obtenido = pos <= 3 && pos > 0; break;
    }
    if (obtenido) {
      CURRENT_USER.logrosObtenidos.push(logro.id);
      CURRENT_USER.xp += logro.recompensa.xp;
      CURRENT_USER.puntos += logro.recompensa.puntos;
      CURRENT_USER.mascotaFelicidad = Math.min(100, CURRENT_USER.mascotaFelicidad + 10);
      guardarUsuario();
      mostrarToast(`🏅 ¡Logro desbloqueado! ${logro.nombre} ${logro.icono}`, '🏅');
    }
  }
}

// ===== DASHBOARD =====
function cargarDashboard() {
  if (!CURRENT_USER) return;
  const pa = porcentajeAsistencia();
  document.getElementById('stat-asistencias').textContent = CURRENT_USER.asistenciaTotal;
  document.getElementById('stat-tardanzas').textContent = CURRENT_USER.tardanzas;
  document.getElementById('stat-faltas').textContent = CURRENT_USER.faltasJustificadas + CURRENT_USER.faltasInjustificadas;
  document.getElementById('stat-porcentaje').textContent = `${pa}%`;
  document.getElementById('stat-puntos').textContent = CURRENT_USER.puntos;
  document.getElementById('stat-xp').textContent = CURRENT_USER.xp;

  const nivel = obtenerNivel();
  const prog = progresoNivel();
  document.getElementById('nivel-actual').textContent = `${nivel.icono} ${nivel.nombre}`;
  document.getElementById('nivel-progreso').textContent = `${prog}% para el siguiente nivel`;
  document.getElementById('nivel-bar').style.width = `${prog}%`;

  document.getElementById('streak-number').textContent = CURRENT_USER.racha;
  document.getElementById('streak-max').textContent = CURRENT_USER.maxRacha;
  renderizarGraficos();
  renderizarHistorial();
  renderizarRecomendacionesDashboard();
}

function renderizarGraficos() {
  const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const semanaData = [0, 0, 0, 0, 0, 0, 0];
  const hoy = new Date();
  const inicioSemana = new Date(hoy);
  inicioSemana.setDate(hoy.getDate() - hoy.getDay() + 1);
  CURRENT_USER.registroDiario.forEach(r => {
    const fecha = new Date(r.fecha);
    if (fecha >= inicioSemana && fecha <= hoy) {
      const diaIdx = fecha.getDay() - 1;
      if (diaIdx >= 0 && diaIdx < 7) semanaData[diaIdx] = r.estado === 'asistio' ? 1 : r.estado === 'tardanza' ? 0.5 : 0;
    }
  });
  document.getElementById('chart-semana-bars').innerHTML = semanaData.map((val, i) => `
    <div class="chart-bar-group">
      <div class="chart-bar" style="height: ${Math.max(4, val * 160)}px; background: ${val >= 1 ? 'var(--neon-green)' : val >= 0.5 ? 'var(--neon-yellow)' : 'var(--neon-red)'}; box-shadow: 0 0 10px ${val >= 1 ? 'rgba(0,255,136,0.3)' : val >= 0.5 ? 'rgba(255,230,0,0.3)' : 'rgba(255,51,85,0.3)'}"></div>
      <span class="chart-bar-label">${diasSemana[i]}</span>
    </div>
  `).join('');

  const labelsMensual = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
  const mensualData = [0, 0, 0, 0];
  const mesActual = hoy.getMonth();
  const anioActual = hoy.getFullYear();
  CURRENT_USER.registroDiario.forEach(r => {
    const fecha = new Date(r.fecha);
    if (fecha.getMonth() === mesActual && fecha.getFullYear() === anioActual) {
      const semana = Math.min(3, Math.floor((fecha.getDate() - 1) / 7));
      mensualData[semana] += r.estado === 'asistio' ? 1 : r.estado === 'tardanza' ? 0.5 : 0;
    }
  });
  const maxMensual = Math.max(...mensualData, 1);
  document.getElementById('chart-mensual-bars').innerHTML = mensualData.map((val, i) => `
    <div class="chart-bar-group">
      <div class="chart-bar" style="height: ${(val / maxMensual) * 160}px; background: var(--neon-cyan); box-shadow: 0 0 10px rgba(0,240,255,0.3)"></div>
      <span class="chart-bar-label">${labelsMensual[i]}</span>
    </div>
  `).join('');

  const distData = [
    { label: 'Asistencias', val: CURRENT_USER.asistenciaTotal, color: 'var(--neon-green)' },
    { label: 'Tardanzas', val: CURRENT_USER.tardanzas, color: 'var(--neon-yellow)' },
    { label: 'F. Justificadas', val: CURRENT_USER.faltasJustificadas, color: 'var(--neon-cyan)' },
    { label: 'F. Injustificadas', val: CURRENT_USER.faltasInjustificadas, color: 'var(--neon-red)' }
  ];
  const totalDist = distData.reduce((a, b) => a + b.val, 0) || 1;
  document.getElementById('chart-dist-bars').innerHTML = distData.map(d => {
    const pct = Math.round((d.val / totalDist) * 100);
    return `<div style="margin-bottom:8px;"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span>${d.label}</span><span>${d.val} (${pct}%)</span></div><div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${d.color};box-shadow:0 0 8px currentColor"></div></div></div>`;
  }).join('');
}

function renderizarHistorial() {
  const tbody = document.getElementById('history-body');
  const registros = CURRENT_USER.registroDiario.slice(-15).reverse();
  tbody.innerHTML = registros.map(r => {
    const fecha = new Date(r.fecha + 'T12:00:00');
    const fechaStr = fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    let badge, badgeClass;
    switch (r.estado) {
      case 'asistio': badge = 'Asistió'; badgeClass = 'badge-success'; break;
      case 'tardanza': badge = 'Tardanza'; badgeClass = 'badge-warning'; break;
      case 'falta-justificada': badge = 'Justificada'; badgeClass = 'badge-info'; break;
      case 'falta-injustificada': badge = 'Injustificada'; badgeClass = 'badge-danger'; break;
    }
    return `<tr><td>${fechaStr}</td><td><span class="badge ${badgeClass}">${badge}</span></td></tr>`;
  }).join('');
}

function renderizarRecomendacionesDashboard() {
  const container = document.getElementById('dashboard-recomendaciones');
  if (!GAME_DATA || !GAME_DATA.recomendaciones.length) {
    container.innerHTML = '<p style="color:var(--text-secondary);font-size:13px;">No hay recomendaciones en este momento.</p>'; return;
  }
  container.innerHTML = GAME_DATA.recomendaciones.slice(0, 3).map((r, idx) => `
    <div class="recomendacion-item" style="margin-bottom:8px;padding:12px 16px;">
      <div class="recomendacion-icon">💡</div>
      <div class="recomendacion-info"><h4>${r.titulo}</h4><p>${r.descripcion}</p></div>
      <button class="btn btn-sm btn-neon" data-mision="${r.misionId}">Iniciar</button>
    </div>
  `).join('');
  container.querySelectorAll('[data-mision]').forEach(btn => {
    btn.addEventListener('click', () => iniciarMision(btn.dataset.mision));
  });
}

// ===== PERFIL =====
function cargarPerfil() {
  if (!CURRENT_USER) return;
  const nivel = obtenerNivel();
  const iniciales = (CURRENT_USER.nombres.charAt(0) + CURRENT_USER.apellidos.charAt(0)).toUpperCase();
  document.getElementById('profile-avatar').textContent = iniciales;
  document.getElementById('profile-nombre').textContent = `${CURRENT_USER.nombres} ${CURRENT_USER.apellidos}`;
  document.getElementById('profile-nivel-text').textContent = `${nivel.icono} ${nivel.nombre}`;
  document.getElementById('profile-email').textContent = CURRENT_USER.email;
  document.getElementById('profile-grado').textContent = `${CURRENT_USER.grado}° - "${CURRENT_USER.seccion}"`;
  document.getElementById('profile-xp').textContent = CURRENT_USER.xp;
  document.getElementById('profile-puntos').textContent = CURRENT_USER.puntos;
  document.getElementById('profile-asistencias').textContent = CURRENT_USER.asistenciaTotal;
  document.getElementById('profile-tardanzas').textContent = CURRENT_USER.tardanzas;
  document.getElementById('profile-faltas').textContent = CURRENT_USER.faltasJustificadas + CURRENT_USER.faltasInjustificadas;
  document.getElementById('profile-porcentaje').textContent = `${porcentajeAsistencia()}%`;
  document.getElementById('profile-racha').textContent = `${CURRENT_USER.racha} días`;
  document.getElementById('profile-max-racha').textContent = `${CURRENT_USER.maxRacha} días`;
  document.getElementById('profile-logros').textContent = CURRENT_USER.logrosObtenidos.length;
  document.getElementById('profile-misiones').textContent = CURRENT_USER.misionesCompletadas.length;
  document.getElementById('profile-minijuegos').textContent = CURRENT_USER.minijuegosGanados.length;
  document.getElementById('profile-felicidad').textContent = `${CURRENT_USER.mascotaFelicidad}%`;
  const fecha = new Date(CURRENT_USER.fechaRegistro);
  document.getElementById('profile-fecha-registro').textContent = fecha.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ===== MASCOTA =====
function cargarMascota() {
  if (!CURRENT_USER || !GAME_DATA) return;
  const nivelMascota = Math.min(CURRENT_USER.mascotaNivel, GAME_DATA.aparienciasMascota.length);
  const apariencia = GAME_DATA.aparienciasMascota[nivelMascota - 1] || GAME_DATA.aparienciasMascota[0];
  const display = document.getElementById('mascota-display');
  display.textContent = apariencia.emoji;
  display.style.background = `radial-gradient(circle at 30% 30%, ${apariencia.color}, ${apariencia.color}88)`;
  display.style.width = `${apariencia.tamano + 20}px`;
  display.style.height = `${apariencia.tamano + 20}px`;
  display.style.fontSize = `${apariencia.tamano}px`;

  document.getElementById('mascota-nombre').textContent = apariencia.nombre;
  const emocion = determinarEmocion();
  document.getElementById('mascota-emocion').textContent = emocion.emoji;

  const nivel = obtenerNivel();
  const msgIdx = Math.floor(Math.random() * MENSAJES_MOTIVADORES.length);
  document.getElementById('mascota-mensaje').textContent = `${emocion.emoji} ${MENSAJES_MOTIVADORES[msgIdx]}`;

  // Accesorios
  const accContainer = document.getElementById('mascota-accesorios');
  if (CURRENT_USER.mascotaAccesorios.length > 0) {
    accContainer.innerHTML = CURRENT_USER.mascotaAccesorios.map(a => `<span class="pet-accessory">✨ ${a}</span>`).join('');
  } else {
    accContainer.innerHTML = '<span style="font-size:12px;color:var(--text-muted);">Sin accesorios aún. ¡Sube de nivel!</span>';
  }

  // Stats
  document.getElementById('mascota-nivel-numero').textContent = `${nivelMascota}/5`;
  document.getElementById('mascota-xp-total').textContent = `${CURRENT_USER.xp} XP`;
  document.getElementById('mascota-bar').style.width = `${progresoNivel()}%`;
  document.getElementById('mascota-felicidad').textContent = `${CURRENT_USER.mascotaFelicidad}%`;
  document.getElementById('mascota-felicidad-bar').style.width = `${CURRENT_USER.mascotaFelicidad}%`;

  // Logros vinculados a mascota
  const logrosMascota = ['mascota-evolucion-1', 'mascota-evolucion-3'];
  const logrosContainer = document.getElementById('mascota-logros');
  if (GAME_DATA.logros) {
    logrosContainer.innerHTML = GAME_DATA.logros.filter(l => logrosMascota.includes(l.id)).map(l => {
      const obtenido = CURRENT_USER.logrosObtenidos.includes(l.id);
      return `<div class="logro-card ${obtenido ? 'unlocked' : 'locked'}" style="padding:12px;min-width:120px;flex:1;"><div class="logro-icon" style="font-size:28px;">${l.icono}</div><h4 style="font-size:11px;">${l.nombre}</h4>${obtenido ? '<span style="font-size:10px;color:var(--neon-green);">✓</span>' : '<span style="font-size:10px;color:var(--text-muted);">🔒</span>'}</div>`;
    }).join('');
  }
}

function determinarEmocion() {
  if (!GAME_DATA) return { nombre: 'feliz', emoji: '😊' };
  const pa = porcentajeAsistencia();
  if (CURRENT_USER.mascotaFelicidad >= 90) return GAME_DATA.emocionesMascota.find(e => e.nombre === 'orgullosa') || { nombre: 'orgullosa', emoji: '😌' };
  if (CURRENT_USER.racha >= 5) return GAME_DATA.emocionesMascota.find(e => e.nombre === 'emocionada') || { nombre: 'emocionada', emoji: '🤩' };
  if (pa >= 70) return GAME_DATA.emocionesMascota.find(e => e.nombre === 'feliz') || { nombre: 'feliz', emoji: '😊' };
  if (CURRENT_USER.faltasInjustificadas > 3 || CURRENT_USER.mascotaFelicidad < 30) return GAME_DATA.emocionesMascota.find(e => e.nombre === 'triste') || { nombre: 'triste', emoji: '😢' };
  return GAME_DATA.emocionesMascota.find(e => e.nombre === 'animadora') || { nombre: 'animadora', emoji: '💪' };
}

function alimentarMascota() {
  if (CURRENT_USER.puntos < 10) { mostrarToast('Necesitas 10 puntos para alimentar a tu mascota 😅', '😅'); return; }
  CURRENT_USER.puntos -= 10;
  CURRENT_USER.mascotaFelicidad = Math.min(100, CURRENT_USER.mascotaFelicidad + 15);
  CURRENT_USER.xp += 5;
  if (CURRENT_USER.mascotaNivel < 5 && Math.random() < 0.15) {
    CURRENT_USER.mascotaNivel++;
    const accs = ['lentes', 'moño', 'capa', 'corona', 'varita'];
    const nuevoAcc = accs[CURRENT_USER.mascotaNivel - 1];
    if (nuevoAcc && !CURRENT_USER.mascotaAccesorios.includes(nuevoAcc)) {
      CURRENT_USER.mascotaAccesorios.push(nuevoAcc);
      mostrarToast(`🎀 ¡Nuevo accesorio: ${nuevoAcc}!`, '🎀');
    }
    guardarUsuario();
    cargarMascota();
    mostrarToast(`🌟 ¡Tu mascota evolucionó a ${GAME_DATA.aparienciasMascota[CURRENT_USER.mascotaNivel - 1].nombre}!`, '🌟');
    verificarLogros();
    return;
  }
  guardarUsuario();
  cargarMascota();
  mostrarToast('🍎 ¡Mascota alimentada! +15 felicidad +5 XP', '🍎');
}

function jugarMascota() {
  if (CURRENT_USER.puntos < 5) { mostrarToast('Necesitas 5 puntos para jugar con tu mascota 😅', '😅'); return; }
  CURRENT_USER.puntos -= 5;
  CURRENT_USER.mascotaFelicidad = Math.min(100, CURRENT_USER.mascotaFelicidad + 8);
  CURRENT_USER.xp += 3;
  guardarUsuario();
  cargarMascota();
  mostrarToast('🎾 ¡Jugaste con tu mascota! +8 felicidad +3 XP', '🎾');
}

function acariciarMascota() {
  CURRENT_USER.mascotaFelicidad = Math.min(100, CURRENT_USER.mascotaFelicidad + 2);
  guardarUsuario();
  cargarMascota();
  mostrarToast('🥰 Tu mascota te quiere mucho', '🥰');
}

// ===== LOGROS =====
function cargarLogros() {
  if (!GAME_DATA) return;
  const container = document.getElementById('logros-grid');
  const obtenidos = CURRENT_USER.logrosObtenidos.length;
  document.getElementById('logros-count').textContent = `${obtenidos}/${GAME_DATA.logros.length} obtenidos`;
  container.innerHTML = GAME_DATA.logros.map(logro => {
    const obtenido = CURRENT_USER.logrosObtenidos.includes(logro.id);
    return `<div class="logro-card ${obtenido ? 'unlocked' : 'locked'} ${obtenido && CURRENT_USER.logrosObtenidos[CURRENT_USER.logrosObtenidos.length - 1] === logro.id ? 'recent' : ''}"><div class="logro-icon">${logro.icono}</div><h4>${logro.nombre}</h4><p>${logro.descripcion}</p>${obtenido ? '<span style="font-size:11px;color:var(--neon-green);font-weight:600;">✓ Obtenido</span>' : '<span style="font-size:11px;color:var(--text-muted);">🔒 Por descubrir</span>'}</div>`;
  }).join('');
}

// ===== MISIONES =====
function cargarMisiones() {
  if (!GAME_DATA) return;
  document.getElementById('misiones-container').innerHTML = `
    <div class="tabs"><button class="tab active" data-tab="recomendaciones">💡 Recomendaciones</button><button class="tab" data-tab="misiones">🎯 Misiones</button><button class="tab" data-tab="desafios">🔥 Desafíos</button></div>
    <div class="tab-content active" data-tab="recomendaciones" id="recomendaciones-list"></div>
    <div class="tab-content" data-tab="misiones" id="misiones-list"></div>
    <div class="tab-content" data-tab="desafios" id="desafios-list"></div>`;
  document.querySelectorAll('#misiones-container .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#misiones-container .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('#misiones-container .tab-content').forEach(c => c.classList.remove('active'));
      document.getElementById(`${tab.dataset.tab}-list`).classList.add('active');
    });
  });
  const recContainer = document.getElementById('recomendaciones-list');
  recContainer.innerHTML = GAME_DATA.recomendaciones.length === 0
    ? '<p style="color:var(--text-secondary);text-align:center;padding:40px;">No hay recomendaciones.</p>'
    : GAME_DATA.recomendaciones.map(r => {
        const completada = CURRENT_USER.misionesCompletadas.includes(r.misionId);
        return `<div class="recomendacion-item" style="${completada ? 'opacity:0.5;' : ''}"><div class="recomendacion-icon">💡</div><div class="recomendacion-info"><h4>${r.titulo}</h4><p>${r.descripcion}</p></div>${completada ? '<span style="color:var(--neon-green);font-weight:600;">✓ Completada</span>' : `<button class="btn btn-sm btn-neon" data-action="iniciar" data-mision="${r.misionId}">Aceptar</button>`}</div>`;
      }).join('');
  recContainer.querySelectorAll('[data-action="iniciar"]').forEach(btn => {
    btn.addEventListener('click', () => iniciarMision(btn.dataset.mision));
  });
  const misContainer = document.getElementById('misiones-list');
  const misiones = GAME_DATA.misiones.filter(m => m.tipo === 'recomendacion');
  misContainer.innerHTML = misiones.length === 0
    ? '<p style="color:var(--text-secondary);text-align:center;padding:40px;">No hay misiones.</p>'
    : misiones.map(m => {
        const completada = CURRENT_USER.misionesCompletadas.includes(m.id);
        return `<div class="mision-item ${completada ? 'completed' : ''}"><div class="mision-icon">🎯</div><div class="mision-info"><h4>${m.titulo}</h4><p>${m.descripcion}</p></div><div class="mision-reward"><span>+${m.xp} XP</span><span>+${m.puntos} pts</span></div>${completada ? '<span style="color:var(--neon-green);font-weight:600;">✓</span>' : `<button class="btn btn-sm btn-success" data-action="completar" data-mision="${m.id}">Completar</button>`}</div>`;
      }).join('');
  misContainer.querySelectorAll('[data-action="completar"]').forEach(btn => {
    btn.addEventListener('click', () => completarMision(btn.dataset.mision));
  });
  const desafContainer = document.getElementById('desafios-list');
  const desafios = GAME_DATA.misiones.filter(m => m.tipo === 'desafio');
  desafContainer.innerHTML = desafios.length === 0
    ? '<p style="color:var(--text-secondary);text-align:center;padding:40px;">No hay desafíos.</p>'
    : desafios.map(m => {
        const completada = CURRENT_USER.misionesCompletadas.includes(m.id);
        return `<div class="mision-item ${completada ? 'completed' : ''}" style="border-left:3px solid var(--neon-yellow);"><div class="mision-icon">🔥</div><div class="mision-info"><h4>${m.titulo}</h4><p>${m.descripcion}</p></div><div class="mision-reward"><span>+${m.xp} XP</span><span>+${m.puntos} pts</span></div>${completada ? '<span style="color:var(--neon-green);font-weight:600;">✓</span>' : `<button class="btn btn-sm btn-warning" data-action="completar" data-mision="${m.id}">Completar</button>`}</div>`;
      }).join('');
  desafContainer.querySelectorAll('[data-action="completar"]').forEach(btn => {
    btn.addEventListener('click', () => completarMision(btn.dataset.mision));
  });
}

function iniciarMision(misionId) {
  if (!CURRENT_USER.misionesCompletadas.includes(misionId)) {
    CURRENT_USER.misionesCompletadas.push(misionId);
    const mision = GAME_DATA.misiones.find(m => m.id === misionId);
    if (mision) { CURRENT_USER.xp += mision.xp; CURRENT_USER.puntos += mision.puntos; mostrarToast(`🎉 Misión "${mision.titulo}" completada! +${mision.xp} XP`, '🎉'); }
    guardarUsuario(); cargarMisiones(); verificarLogros();
  }
}
function completarMision(misionId) {
  if (!CURRENT_USER.misionesCompletadas.includes(misionId)) {
    CURRENT_USER.misionesCompletadas.push(misionId);
    const mision = GAME_DATA.misiones.find(m => m.id === misionId);
    if (mision) { CURRENT_USER.xp += mision.xp; CURRENT_USER.puntos += mision.puntos; CURRENT_USER.mascotaFelicidad = Math.min(100, CURRENT_USER.mascotaFelicidad + 5); mostrarToast(`🎉 Misión "${mision.titulo}" completada! +${mision.xp} XP`, '🎉'); }
    guardarUsuario(); cargarMisiones(); verificarLogros();
  }
}

// ===== RANKINGS =====
function cargarRankings() {
  document.querySelectorAll('.ranking-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ranking-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderizarRanking(btn.dataset.filter);
    });
  });
  renderizarRanking('asistencia');
}

function renderizarRanking(tipo) {
  let sorted = [];
  switch (tipo) {
    case 'asistencia': sorted = [...USERS_DB].sort((a, b) => porcentajeAsistenciaUsuario(b) - porcentajeAsistenciaUsuario(a)); break;
    case 'xp': sorted = [...USERS_DB].sort((a, b) => b.xp - a.xp); break;
    case 'racha': sorted = [...USERS_DB].sort((a, b) => b.maxRacha - a.maxRacha); break;
    case 'logros': sorted = [...USERS_DB].sort((a, b) => b.logrosObtenidos.length - a.logrosObtenidos.length); break;
    default: sorted = [...USERS_DB].sort((a, b) => b.xp - a.xp);
  }
  const topUsers = sorted.slice(0, 10);
  const container = document.getElementById('ranking-list');
  if (topUsers.length === 0) { container.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:40px;">No hay estudiantes aún.</p>'; return; }
  container.innerHTML = topUsers.map((user, i) => {
    const pos = i + 1;
    const iniciales = (user.nombres.charAt(0) + user.apellidos.charAt(0)).toUpperCase();
    const isCurrent = user.id === CURRENT_USER.id;
    const nivel = GAME_DATA ? GAME_DATA.niveles.find(n => user.xp >= n.xpMinimo && user.xp < n.xpMaximo) || GAME_DATA.niveles[0] : { icono: '🌱', nombre: 'Novata' };
    let score;
    switch (tipo) {
      case 'asistencia': score = `${porcentajeAsistenciaUsuario(user)}%`; break;
      case 'xp': score = `${user.xp} XP`; break;
      case 'racha': score = `${user.maxRacha} días`; break;
      case 'logros': score = `${user.logrosObtenidos.length} 🏅`; break;
      default: score = `${user.xp} XP`;
    }
    const posClass = pos <= 3 ? `top${pos}` : '';
    return `<div class="ranking-item ${posClass}" style="${isCurrent ? 'border:1px solid var(--neon-cyan);box-shadow:0 0 15px rgba(0,240,255,0.1);' : ''}"><div class="ranking-position">${pos}</div><div class="ranking-avatar">${iniciales}</div><div class="ranking-info"><h4>${user.nombres} ${user.apellidos} ${isCurrent ? '(Tú)' : ''}</h4><span>${nivel.icono} ${nivel.nombre} · ${user.grado}° "${user.seccion}"</span></div><div class="ranking-score">${score}</div></div>`;
  }).join('');
}

function porcentajeAsistenciaUsuario(user) {
  const total = user.asistenciaTotal + user.tardanzas + user.faltasJustificadas + user.faltasInjustificadas;
  return total === 0 ? 0 : Math.round((user.asistenciaTotal / total) * 100);
}

// ===== MINIJUEGOS =====
function cargarMinijuegos() {
  if (!GAME_DATA) return;
  const container = document.getElementById('minijuegos-grid');
  container.innerHTML = GAME_DATA.minijuegos.map(j =>
    `<div class="minijuego-card" data-game="${j.id}"><div class="minijuego-icon">${j.icono}</div><h4>${j.nombre}</h4><p>${j.descripcion}</p><button class="btn btn-sm btn-neon">🎮 ¡Jugar!</button></div>`
  ).join('');
  container.querySelectorAll('.minijuego-card').forEach(card => {
    card.addEventListener('click', () => abrirMinijuego(card.dataset.game));
  });
}

function abrirMinijuego(id) {
  switch (id) {
    case 'memoria': abrirJuegoMemoria(); break;
    case 'organizacion': abrirJuegoOrganizacion(); break;
    case 'concentracion': abrirJuegoDiferencias(); break;
    case 'logica': abrirJuegoLaberinto(); break;
    default: mostrarToast('🚧 Próximamente...', '🚧');
  }
}

// ===== JUEGO MEMORIA =====
let juegoMemoriaActivo = false;
function abrirJuegoMemoria() {
  if (juegoMemoriaActivo) return;
  juegoMemoriaActivo = true;
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay show';
  overlay.id = 'memoria-overlay';
  overlay.innerHTML = `<div class="modal" style="max-width:500px;"><h2>🧠 Memoria Escolar</h2><p>Encuentra los pares de útiles escolares</p><div id="memoria-game" class="memory-game"></div><div style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;"><span id="memoria-intentos" style="color:var(--text-secondary);">Intentos: 0</span><span id="memoria-pares" style="color:var(--neon-cyan);">Pares: 0/8</span></div><button class="btn btn-secondary close-btn" style="margin-top:16px;width:100%;">Cerrar</button></div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('.close-btn').addEventListener('click', () => cerrarJuegoMemoria());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) cerrarJuegoMemoria(); });
  const emojis = ['📚', '✏️', '📓', '🎒', '📏', '✂️', '🖍️', '🧮'];
  const cartas = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
  const gameEl = document.getElementById('memoria-game');
  const intentosEl = document.getElementById('memoria-intentos');
  const paresEl = document.getElementById('memoria-pares');
  let flippedCards = [], matchedPairs = 0, attempts = 0, isLocked = false;
  gameEl.innerHTML = cartas.map((emoji, i) => `<div class="memory-card" data-index="${i}" data-emoji="${emoji}">?</div>`).join('');
  gameEl.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('click', () => {
      if (isLocked || card.classList.contains('flipped') || card.classList.contains('matched')) return;
      card.textContent = card.dataset.emoji;
      card.classList.add('flipped');
      flippedCards.push(card);
      if (flippedCards.length === 2) {
        isLocked = true; attempts++;
        intentosEl.textContent = `Intentos: ${attempts}`;
        if (flippedCards[0].dataset.emoji === flippedCards[1].dataset.emoji) {
          flippedCards.forEach(c => c.classList.add('matched'));
          matchedPairs++; paresEl.textContent = `Pares: ${matchedPairs}/8`;
          flippedCards = []; isLocked = false;
          if (matchedPairs === 8) {
            setTimeout(() => {
              CURRENT_USER.xp += 25; CURRENT_USER.puntos += 15;
              CURRENT_USER.mascotaFelicidad = Math.min(100, CURRENT_USER.mascotaFelicidad + 5);
              if (!CURRENT_USER.minijuegosGanados.includes('memoria')) CURRENT_USER.minijuegosGanados.push('memoria');
              guardarUsuario();
              mostrarToast('🏆 ¡Ganaste! +25 XP +15 puntos', '🏆');
              cerrarJuegoMemoria();
              verificarLogros();
            }, 500);
          }
        } else {
          setTimeout(() => { flippedCards.forEach(c => { c.textContent = '?'; c.classList.remove('flipped'); }); flippedCards = []; isLocked = false; }, 800);
        }
      }
    });
  });
}
function cerrarJuegoMemoria() {
  const overlay = document.getElementById('memoria-overlay');
  if (overlay) overlay.remove();
  juegoMemoriaActivo = false;
}

// ===== JUEGO ORGANIZACIÓN =====
function abrirJuegoOrganizacion() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay show';
  overlay.id = 'org-overlay';
  const actividades = [
    { id: 1, texto: '📚 Estudiar Matemáticas', orden: 1 },
    { id: 2, texto: '🍳 Desayunar', orden: 2 },
    { id: 3, texto: '🚌 Ir a la escuela', orden: 3 },
    { id: 4, texto: '📝 Tomar apuntes en clase', orden: 4 },
    { id: 5, texto: '🍎 Almorzar', orden: 5 },
    { id: 6, texto: '🏃 Hacer deporte', orden: 6 },
    { id: 7, texto: '📖 Hacer tareas', orden: 7 },
    { id: 8, texto: '🛁 Bañarse', orden: 8 }
  ];
  const shuffled = [...actividades].sort(() => Math.random() - 0.5);
  overlay.innerHTML = `<div class="modal" style="max-width:520px;"><h2>📅 Organiza tu tiempo</h2><p>Presiona los botones ↑↓ para ordenar las actividades correctamente</p><div id="org-game" class="org-game"></div><div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center;"><span id="org-progress" style="color:var(--text-secondary);">Ordenadas: 0/8</span><span id="org-status" style="color:var(--neon-cyan);font-weight:600;"></span></div><button class="btn btn-secondary close-btn" style="margin-top:12px;width:100%;">Cerrar</button></div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('.close-btn').addEventListener('click', () => cerrarJuegoOrganizacion());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) cerrarJuegoOrganizacion(); });
  const gameEl = document.getElementById('org-game');
  let items = shuffled.map((a, i) => ({ ...a, currentPos: i }));
  let correctCount = 0;
  const statusEl = document.getElementById('org-status');
  const progressEl = document.getElementById('org-progress');
  function renderizarOrg() {
    gameEl.innerHTML = items.map((item, i) => {
      const isCorrect = item.orden === item.currentPos + 1;
      const isPlaced = correctCount > 0;
      return `<div class="org-item ${isCorrect ? 'placed' : ''}" data-index="${i}"><div class="org-index">${i + 1}</div><div style="flex:1;">${item.texto}</div><div style="display:flex;gap:4px;">${i > 0 ? `<button class="btn btn-sm btn-neon" onclick="moverOrg(${i}, -1)" style="padding:4px 8px;">↑</button>` : ''}${i < items.length - 1 ? `<button class="btn btn-sm btn-neon" onclick="moverOrg(${i}, 1)" style="padding:4px 8px;">↓</button>` : ''}</div></div>`;
    }).join('');
    correctCount = items.filter((item, i) => item.orden === i + 1).length;
    progressEl.textContent = `Ordenadas: ${correctCount}/${items.length}`;
    if (correctCount === items.length) {
      statusEl.textContent = '✅ ¡Perfecto!';
      setTimeout(() => {
        CURRENT_USER.xp += 30; CURRENT_USER.puntos += 20;
        CURRENT_USER.mascotaFelicidad = Math.min(100, CURRENT_USER.mascotaFelicidad + 5);
        if (!CURRENT_USER.minijuegosGanados.includes('organizacion')) CURRENT_USER.minijuegosGanados.push('organizacion');
        guardarUsuario();
        mostrarToast('🏆 ¡Organización perfecta! +30 XP', '🏆');
        cerrarJuegoOrganizacion();
        verificarLogros();
      }, 600);
    } else {
      statusEl.textContent = `${correctCount}/${items.length} correctas`;
    }
  }
  window.moverOrg = (index, dir) => {
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= items.length) return;
    [items[index], items[newIndex]] = [items[newIndex], items[index]];
    items = items.map((item, i) => ({ ...item, currentPos: i }));
    renderizarOrg();
  };
  renderizarOrg();
}
function cerrarJuegoOrganizacion() {
  const overlay = document.getElementById('org-overlay');
  if (overlay) overlay.remove();
  delete window.moverOrg;
}

// ===== JUEGO DIFERENCIAS =====
function abrirJuegoDiferencias() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay show';
  overlay.id = 'diff-overlay';
  const emojisPool = ['📚', '✏️', '🎒', '📓', '📏', '✂️', '🖍️', '🧮', '🔬', '🌍', '🎨', '📖'];
  const getGrid = () => Array.from({ length: 9 }, () => emojisPool[Math.floor(Math.random() * emojisPool.length)]);
  let grid1 = getGrid();
  const diffIndices = new Set();
  while (diffIndices.size < 4) diffIndices.add(Math.floor(Math.random() * 9));
  let grid2 = [...grid1];
  diffIndices.forEach(i => {
    let newEmoji;
    do { newEmoji = emojisPool[Math.floor(Math.random() * emojisPool.length)]; } while (newEmoji === grid1[i]);
    grid2[i] = newEmoji;
  });
  let found = new Set();
  overlay.innerHTML = `<div class="modal" style="max-width:620px;"><h2>🔍 Encuentra las diferencias</h2><p>Hay 4 diferencias entre los dos horarios. Haz clic en las del Horario B</p><div class="diff-game"><div class="diff-side"><p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;">Horario A</p><div class="diff-grid" id="diff-grid1"></div></div><div class="diff-side"><p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;">Horario B</p><div class="diff-grid" id="diff-grid2"></div></div></div><div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center;"><span id="diff-found" style="color:var(--text-secondary);">Encontradas: 0/4</span><span id="diff-status" style="color:var(--neon-cyan);font-weight:600;"></span></div><button class="btn btn-secondary close-btn" style="margin-top:12px;width:100%;">Cerrar</button></div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('.close-btn').addEventListener('click', () => cerrarJuegoDiferencias());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) cerrarJuegoDiferencias(); });
  const renderDiff = (id, grid, isLeft) => {
    const el = document.getElementById(id);
    el.innerHTML = grid.map((emoji, i) => {
      const isDiff = diffIndices.has(i);
      const isFound = found.has(i);
      return `<div class="diff-cell ${isFound ? 'found' : ''}" data-index="${i}" data-side="${isLeft ? 'left' : 'right'}">${isFound || !isDiff ? emoji : (isLeft ? emoji : '❓')}</div>`;
    }).join('');
    el.querySelectorAll('.diff-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        const idx = parseInt(cell.dataset.index);
        if (found.has(idx) || cell.dataset.side !== 'right') return;
        if (diffIndices.has(idx)) {
          found.add(idx);
          document.querySelectorAll(`.diff-cell[data-index="${idx}"]`).forEach(c => { c.textContent = grid1[idx]; c.classList.add('found'); });
          document.getElementById('diff-found').textContent = `Encontradas: ${found.size}/4`;
          if (found.size === 4) {
            document.getElementById('diff-status').textContent = '✅ ¡Excelente!';
            setTimeout(() => {
              CURRENT_USER.xp += 35; CURRENT_USER.puntos += 25;
              CURRENT_USER.mascotaFelicidad = Math.min(100, CURRENT_USER.mascotaFelicidad + 5);
              if (!CURRENT_USER.minijuegosGanados.includes('concentracion')) CURRENT_USER.minijuegosGanados.push('concentracion');
              guardarUsuario();
              mostrarToast('🏆 ¡Encontraste todas! +35 XP', '🏆');
              cerrarJuegoDiferencias();
              verificarLogros();
            }, 600);
          }
        } else {
          mostrarToast('❌ No es una diferencia', '❌');
        }
      });
    });
  };
  renderDiff('diff-grid1', grid1, true);
  renderDiff('diff-grid2', grid2, false);
}
function cerrarJuegoDiferencias() {
  const overlay = document.getElementById('diff-overlay');
  if (overlay) overlay.remove();
}

// ===== JUEGO LABERINTO =====
function abrirJuegoLaberinto() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay show';
  overlay.id = 'maze-overlay';

  const maze = [
    [1,1,1,1,1,1,1],
    [1,0,0,0,1,0,1],
    [1,0,1,0,1,0,1],
    [1,0,1,0,0,0,1],
    [1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1]
  ];
  let playerPos = { row: 1, col: 1 };
  const goalPos = { row: 5, col: 5 };
  let mazeSteps = 0;

  overlay.innerHTML = `<div class="modal" style="max-width:480px;"><h2>🧩 Ruta Escolar</h2><p>Lleva a la estudiante hasta la escuela 🏫 (usa las flechas del teclado)</p><div id="maze-game" class="maze-game"></div><div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center;"><span id="maze-steps" style="color:var(--text-secondary);">Pasos: 0</span><span id="maze-status" style="color:var(--neon-cyan);font-weight:600;"></span></div><button class="btn btn-secondary close-btn" style="margin-top:12px;width:100%;">Cerrar</button></div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('.close-btn').addEventListener('click', () => cerrarJuegoLaberinto());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) cerrarJuegoLaberinto(); });

  const gameEl = document.getElementById('maze-game');
  const stepsEl = document.getElementById('maze-steps');
  const statusEl = document.getElementById('maze-status');

  function renderMaze() {
    gameEl.style.gridTemplateColumns = `repeat(${maze[0].length}, 40px)`;
    gameEl.innerHTML = maze.map((row, r) => row.map((cell, c) => {
      if (r === playerPos.row && c === playerPos.col) return '<div class="maze-cell player">🧑‍🎓</div>';
      if (r === goalPos.row && c === goalPos.col) return '<div class="maze-cell goal">🏫</div>';
      return `<div class="maze-cell ${cell === 1 ? 'wall' : 'path'}"></div>`;
    }).join('')).join('');
  }

  function movePlayer(dr, dc) {
    const nr = playerPos.row + dr;
    const nc = playerPos.col + dc;
    if (maze[nr] && maze[nr][nc] === 0) {
      playerPos = { row: nr, col: nc };
      mazeSteps++;
      stepsEl.textContent = `Pasos: ${mazeSteps}`;
      renderMaze();
      if (playerPos.row === goalPos.row && playerPos.col === goalPos.col) {
        statusEl.textContent = '✅ ¡Llegaste a la escuela!';
        setTimeout(() => {
          CURRENT_USER.xp += 40; CURRENT_USER.puntos += 30;
          CURRENT_USER.mascotaFelicidad = Math.min(100, CURRENT_USER.mascotaFelicidad + 5);
          if (!CURRENT_USER.minijuegosGanados.includes('logica')) CURRENT_USER.minijuegosGanados.push('logica');
          guardarUsuario();
          mostrarToast('🏆 ¡Ruta completada! +40 XP', '🏆');
          cerrarJuegoLaberinto();
          verificarLogros();
        }, 500);
      }
    }
  }

  const keyHandler = (e) => {
    switch (e.key) {
      case 'ArrowUp': movePlayer(-1, 0); e.preventDefault(); break;
      case 'ArrowDown': movePlayer(1, 0); e.preventDefault(); break;
      case 'ArrowLeft': movePlayer(0, -1); e.preventDefault(); break;
      case 'ArrowRight': movePlayer(0, 1); e.preventDefault(); break;
    }
  };
  document.addEventListener('keydown', keyHandler);
  overlay._keyHandler = keyHandler;
  renderMaze();
}
function cerrarJuegoLaberinto() {
  const overlay = document.getElementById('maze-overlay');
  if (overlay) {
    if (overlay._keyHandler) document.removeEventListener('keydown', overlay._keyHandler);
    overlay.remove();
  }
}

// ===== Global exports =====
window.navegarA = navegarA;
window.simularDia = simularDia;
window.alimentarMascota = alimentarMascota;
window.jugarMascota = jugarMascota;
window.acariciarMascota = acariciarMascota;
window.iniciarMision = iniciarMision;
window.completarMision = completarMision;
window.abrirMinijuego = abrirMinijuego;
window.cerrarJuegoMemoria = cerrarJuegoMemoria;
window.cerrarJuegoOrganizacion = cerrarJuegoOrganizacion;
window.cerrarJuegoDiferencias = cerrarJuegoDiferencias;
window.cerrarJuegoLaberinto = cerrarJuegoLaberinto;

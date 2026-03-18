/**
 * app.js
 * ─────────────────────────────────────────────────────────────
 * PUNTO DE ENTRADA PRINCIPAL
 * Inicializa la aplicación y coordina todos los módulos.
 *
 * Responsabilidades:
 *  · Gestionar el estado global (categoría activa, búsqueda, modo estudio).
 *  · Conectar los eventos de UI (buscador, tabs, botón modo estudio).
 *  · Coordinar render.js para actualizar el contenido.
 *  · Registrar el Service Worker para funcionamiento offline (PWA).
 *
 * Depende de: data.js, audio.js, render.js
 * ─────────────────────────────────────────────────────────────
 */


// ── Estado global de la aplicación ─────────────────────────────
const Estado = {
  categoriaActiva: -1,  // -1 = mostrar todas las categorías
  textoBusqueda:   '',  // texto actual del buscador
  modoEstudio:     false,
};


// ─────────────────────────────────────────────────────────────
// INICIALIZACIÓN
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  inicializarTabs();           // render.js: genera los tabs de categorías
  renderizarContenido(-1, ''); // render.js: renderiza todo el vocabulario
  conectarEventos();           // app.js: conecta todos los listeners
  registrarServiceWorker();    // app.js: habilita offline (PWA)
});


// ─────────────────────────────────────────────────────────────
// CONECTAR EVENTOS DE LA UI
// ─────────────────────────────────────────────────────────────
function conectarEventos() {

  // ── Buscador ───────────────────────────────────────────────
  const buscador = document.getElementById('buscador');
  if (buscador) {
    buscador.addEventListener('input', manejarBusqueda);

    // Limpiar con tecla Escape
    buscador.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        buscador.value = '';
        Estado.textoBusqueda = '';
        renderizarContenido(Estado.categoriaActiva, '');
      }
    });
  }

  // ── Botón Modo Estudio ─────────────────────────────────────
  const btnEstudio = document.getElementById('btnEstudio');
  if (btnEstudio) {
    btnEstudio.addEventListener('click', toggleModoEstudio);
  }

  // ── Tabs de categorías (delegación de eventos) ─────────────
  const contenedorTabs = document.getElementById('tabsCategorias');
  if (contenedorTabs) {
    contenedorTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.tab');
      if (tab) {
        const catId = parseInt(tab.dataset.cat, 10);
        filtrarCategoria(catId);
      }
    });

    // Soporte de teclado en los tabs
    contenedorTabs.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const tab = e.target.closest('.tab');
        if (tab) {
          e.preventDefault();
          tab.click();
        }
      }
    });
  }
}


// ─────────────────────────────────────────────────────────────
// BÚSQUEDA EN TIEMPO REAL
// ─────────────────────────────────────────────────────────────
function manejarBusqueda(evento) {
  Estado.textoBusqueda = evento.target.value;

  // Al buscar, mostrar todas las categorías
  if (Estado.textoBusqueda.trim()) {
    establecerCategoriaActiva(-1, /* omitirScroll */ true);
  }

  renderizarContenido(Estado.categoriaActiva, Estado.textoBusqueda);
}


// ─────────────────────────────────────────────────────────────
// FILTROS DE CATEGORÍA
// ─────────────────────────────────────────────────────────────

/**
 * filtrarCategoria(catId)
 * Activa una categoría y re-renderiza el contenido.
 * Hace scroll suave al contenido principal.
 *
 * @param {number} catId - ID de la categoría (-1 para todas)
 */
function filtrarCategoria(catId) {
  // Limpiar búsqueda al cambiar categoría manualmente
  Estado.textoBusqueda = '';
  const buscador = document.getElementById('buscador');
  if (buscador) buscador.value = '';

  establecerCategoriaActiva(catId);
  renderizarContenido(Estado.categoriaActiva, '');

  // Scroll al contenido
  document.getElementById('contenidoPrincipal')
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * establecerCategoriaActiva(catId, omitirScroll)
 * Actualiza el estado y el aspecto visual de los tabs.
 *
 * @param {number}  catId        - ID de la categoría a activar
 * @param {boolean} omitirScroll - Si true, no modifica el scroll
 */
function establecerCategoriaActiva(catId, omitirScroll = false) {
  Estado.categoriaActiva = catId;

  // Actualizar aspecto visual de cada tab
  document.querySelectorAll('.tab').forEach(tab => {
    const esActivo = parseInt(tab.dataset.cat, 10) === catId;
    tab.classList.toggle('activo', esActivo);
    tab.setAttribute('aria-selected', esActivo ? 'true' : 'false');
  });
}


// ─────────────────────────────────────────────────────────────
// MODO ESTUDIO
// ─────────────────────────────────────────────────────────────

/**
 * toggleModoEstudio()
 * Activa/desactiva el modo estudio:
 *  · ACTIVO: la palabra en kwe'sx we'wnxi se oculta en el frente de
 *    las tarjetas (solo se ve el ícono). Las traducciones de frases
 *    también se ocultan. El alumno debe intentar recordar antes de voltear.
 *  · INACTIVO: todo visible con normalidad.
 */
function toggleModoEstudio() {
  Estado.modoEstudio = !Estado.modoEstudio;
  document.body.classList.toggle('modo-estudio', Estado.modoEstudio);

  const btn = document.getElementById('btnEstudio');
  const indicador = document.getElementById('indicadorEstudio');

  if (btn) {
    btn.classList.toggle('activo', Estado.modoEstudio);
    btn.setAttribute('aria-pressed', Estado.modoEstudio ? 'true' : 'false');
    btn.innerHTML = Estado.modoEstudio
      ? '👁️ Ver Traducciones'
      : '🎯 Modo Estudio';
  }

  if (indicador) {
    indicador.classList.toggle('visible', Estado.modoEstudio);
  }

  // En modo estudio, desvoltar todas las tarjetas abiertas
  if (Estado.modoEstudio) {
    document.querySelectorAll('.flip-card.volteada').forEach(c => {
      c.classList.remove('volteada');
    });
    // Detener cualquier audio en reproducción
    AudioManager.detenerActual();
  }
}


// ─────────────────────────────────────────────────────────────
// SERVICE WORKER — PWA / Funcionamiento Offline
// ─────────────────────────────────────────────────────────────

/**
 * registrarServiceWorker()
 * Registra el service worker (sw.js) para habilitar el funcionamiento
 * sin conexión a internet. Esencial para uso en territorios rurales.
 *
 * El sw.js debe estar en la raíz del proyecto (junto a index.html).
 */
function registrarServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registro => {
        console.info('[PWA] Service Worker registrado:', registro.scope);
      })
      .catch(err => {
        // No es un error crítico — la página funciona igual con conexión
        console.warn('[PWA] Service Worker no pudo registrarse:', err.message);
      });
  }
}

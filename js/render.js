/**
 * render.js
 * ─────────────────────────────────────────────────────────────
 * Funciones de renderizado del DOM.
 * Responsabilidades:
 *  · Crear tarjetas flip (flip cards) para palabras individuales.
 *  · Crear tarjetas de frase para oraciones completas (categoría 5).
 *  · Crear secciones de categoría con encabezado y grilla.
 *  · Renderizar todo el contenido filtrado en el main.
 *  · Actualizar el contador de resultados.
 *
 * Depende de: data.js (CATEGORIAS), audio.js (AudioManager)
 * ─────────────────────────────────────────────────────────────
 */


/**
 * crearFlipCard(palabra, cat, indice)
 * Crea una tarjeta volteadora interactiva para una palabra de vocabulario.
 *
 * Frente: icono + palabra en kwe'sx we'wnxi + pista de interacción.
 * Dorso:  icono + traducción al español + palabra nasa pequeña + botón audio.
 *
 * @param {Object} palabra - Objeto de la palabra (de data.js)
 * @param {Object} cat     - Objeto de la categoría (de data.js)
 * @param {number} indice  - Posición en la grilla (para delay de animación)
 * @returns {HTMLElement}
 */
function crearFlipCard(palabra, cat, indice) {
  const tarjeta = document.createElement('div');
  tarjeta.className = `flip-card ${cat.colorCss}`;
  tarjeta.style.animationDelay = `${indice * 0.035}s`;
  tarjeta.setAttribute('role', 'button');
  tarjeta.setAttribute('tabindex', '0');
  tarjeta.setAttribute('aria-label',
    `${palabra.nasa}: ${palabra.esp}. Toca para voltear.`
  );

  // Atributo de tipo solo para tarjetas de sanción (colorea el borde)
  const atribTipo = palabra.tipo ? `data-tipo="${palabra.tipo}"` : '';

  tarjeta.innerHTML = `
    <div class="flip-inner">
      <!-- FRENTE: palabra en kwe'sx we'wnxi -->
      <div class="flip-frente" ${atribTipo}>
        <span class="icono-carta" aria-hidden="true">${palabra.icon}</span>
        <span class="palabra-nasa" lang="nsh">${palabra.nasa}</span>
        <span class="pista-toca" aria-hidden="true">toca para ver →</span>
      </div>
      <!-- DORSO: traducción al español + audio -->
      <div class="flip-dorso">
        <span class="icono-carta" aria-hidden="true">${palabra.icon}</span>
        <span class="traduccion">${palabra.esp}</span>
        <span class="palabra-nasa-small" lang="nsh">${palabra.nasa}</span>
        <!-- El botón de audio se inserta dinámicamente abajo -->
      </div>
    </div>
  `;

  // Insertar botón de audio en el dorso
  const dorso = tarjeta.querySelector('.flip-dorso');
  const botonAudio = AudioManager.crearBoton(palabra.audio);
  dorso.appendChild(botonAudio);

  // ── Interacción de volteo ──────────────────────────────────
  tarjeta.addEventListener('click', () => {
    const estaVolteada = tarjeta.classList.toggle('volteada');
    tarjeta.setAttribute('aria-label',
      estaVolteada
        ? `${palabra.esp} (${palabra.nasa}). Toca para volver.`
        : `${palabra.nasa}: ${palabra.esp}. Toca para voltear.`
    );
    // Si se voltea de vuelta, detener audio
    if (!estaVolteada) AudioManager.detenerActual();
  });

  // Soporte de teclado (Enter y Espacio)
  tarjeta.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      tarjeta.click();
    }
  });

  return tarjeta;
}


/**
 * crearTarjetaFrase(palabra, cat, indice)
 * Crea una tarjeta de frase (sin volteo) para oraciones completas.
 * Muestra la frase en nasa y la traducción, con botón de audio.
 *
 * @param {Object} palabra - Objeto de la palabra (de data.js)
 * @param {Object} cat     - Objeto de la categoría (de data.js)
 * @param {number} indice  - Para delay de animación
 * @returns {HTMLElement}
 */
function crearTarjetaFrase(palabra, cat, indice) {
  const tarjeta = document.createElement('article');
  tarjeta.className = 'frase-card';
  tarjeta.style.animationDelay = `${indice * 0.05}s`;
  tarjeta.setAttribute('lang', 'es');
  tarjeta.setAttribute('aria-label', `${palabra.nasa}: ${palabra.esp}`);

  tarjeta.innerHTML = `
    <div class="frase-nasa" lang="nsh">
      <span class="frase-icono" aria-hidden="true">${palabra.icon}</span>
      <span>${palabra.nasa}</span>
    </div>
    <div class="frase-traduccion">→ ${palabra.esp}</div>
  `;

  // Insertar botón de audio
  const botonAudio = AudioManager.crearBoton(palabra.audio);
  tarjeta.appendChild(botonAudio);

  return tarjeta;
}


/**
 * crearSeccionCategoria(cat, palabrasFiltradas)
 * Construye la sección completa de una categoría:
 * encabezado (ícono + nombre + conteo) + grilla de tarjetas.
 *
 * @param {Object}   cat              - Objeto de la categoría
 * @param {Array}    palabrasFiltradas - Palabras que pasaron el filtro de búsqueda
 * @returns {HTMLElement}
 */
function crearSeccionCategoria(cat, palabrasFiltradas) {
  const seccion = document.createElement('section');
  seccion.className = 'seccion-categoria';
  seccion.setAttribute('aria-label', `Categoría: ${cat.nombre}`);
  seccion.dataset.categoriaId = cat.id;

  // ── Encabezado ──────────────────────────────────────────────
  const encabezado = document.createElement('div');
  encabezado.className = `encabezado-categoria cat-color-${cat.id}`;
  encabezado.innerHTML = `
    <span class="icono-categoria" aria-hidden="true">${cat.icono}</span>
    <h2 class="nombre-categoria">${cat.nombre}</h2>
    <span class="badge-conteo" aria-label="${palabrasFiltradas.length} términos en esta categoría">
      ${palabrasFiltradas.length} términos
    </span>
  `;
  seccion.appendChild(encabezado);

  // ── Grilla de tarjetas ──────────────────────────────────────
  const grilla = document.createElement('div');
  grilla.className = cat.esFrases ? 'grilla grilla-frases' : 'grilla';
  grilla.setAttribute('role', 'list');
  grilla.setAttribute('aria-label', `Tarjetas de ${cat.nombre}`);

  palabrasFiltradas.forEach((palabra, indice) => {
    const tarjeta = cat.esFrases
      ? crearTarjetaFrase(palabra, cat, indice)
      : crearFlipCard(palabra, cat, indice);

    tarjeta.setAttribute('role', 'listitem');
    grilla.appendChild(tarjeta);
  });

  seccion.appendChild(grilla);
  return seccion;
}


/**
 * renderizarContenido(categoriaActiva, textoBusqueda)
 * Función principal de renderizado.
 * Limpia el contenido actual, aplica filtros y regenera todas las secciones.
 *
 * @param {number} categoriaActiva  - ID de la categoría (-1 = todas)
 * @param {string} textoBusqueda   - Texto del buscador (puede estar vacío)
 */
function renderizarContenido(categoriaActiva, textoBusqueda) {
  const contenedor = document.getElementById('contenidoPrincipal');
  const sinResultados = document.getElementById('sinResultados');

  // Eliminar secciones anteriores (sin tocar el div de sin-resultados)
  contenedor.querySelectorAll('.seccion-categoria').forEach(el => el.remove());

  // Normalizar texto de búsqueda
  const query = textoBusqueda.trim().toLowerCase();
  let totalVisible = 0;

  CATEGORIAS.forEach(cat => {
    // Filtro 1: categoría activa
    if (categoriaActiva !== -1 && cat.id !== categoriaActiva) return;

    // Filtro 2: búsqueda de texto en ambos idiomas
    const palabrasFiltradas = cat.palabras.filter(p => {
      if (!query) return true;
      return (
        p.nasa.toLowerCase().includes(query) ||
        p.esp.toLowerCase().includes(query)
      );
    });

    if (palabrasFiltradas.length === 0) return;
    totalVisible += palabrasFiltradas.length;

    const seccion = crearSeccionCategoria(cat, palabrasFiltradas);
    contenedor.insertBefore(seccion, sinResultados);
  });

  // Mostrar / ocultar mensaje de sin resultados
  if (totalVisible === 0) {
    sinResultados.removeAttribute('hidden');
    const termEl = document.getElementById('terminoBuscado');
    if (termEl) termEl.textContent = query;
  } else {
    sinResultados.setAttribute('hidden', '');
  }

  // Actualizar contador
  actualizarConteo(totalVisible, query);
}


/**
 * actualizarConteo(total, query)
 * Actualiza el texto del contador de resultados.
 *
 * @param {number} total - Número de palabras visibles
 * @param {string} query - Texto buscado (para personalizar el mensaje)
 */
function actualizarConteo(total, query) {
  const el = document.getElementById('conteoResultados');
  if (!el) return;

  if (query) {
    el.textContent = `${total} resultado${total !== 1 ? 's' : ''} para "${query}"`;
  } else {
    const totalGeneral = CATEGORIAS.reduce((acc, c) => acc + c.palabras.length, 0);
    el.textContent = `${totalGeneral} términos en total · ${CATEGORIAS.length} categorías`;
  }
}


/**
 * inicializarTabs()
 * Genera dinámicamente los botones de tab de categoría
 * a partir del array CATEGORIAS en data.js.
 * El tab "Todas" se asume ya en el HTML; aquí se generan los demás.
 */
function inicializarTabs() {
  const contenedor = document.getElementById('tabsCategorias');
  if (!contenedor) return;

  // Tab "Todas" (ya está en el HTML, solo hay que activarlo)
  const tabTodas = document.createElement('button');
  tabTodas.className = 'tab activo';
  tabTodas.dataset.cat = '-1';
  tabTodas.setAttribute('role', 'tab');
  tabTodas.setAttribute('aria-selected', 'true');
  tabTodas.textContent = '🌐 Todas';
  contenedor.appendChild(tabTodas);

  // Tabs por categoría
  CATEGORIAS.forEach(cat => {
    const tab = document.createElement('button');
    tab.className = 'tab';
    tab.dataset.cat = cat.id;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', 'false');
    tab.textContent = `${cat.icono} ${cat.nombre}`;
    contenedor.appendChild(tab);
  });
}

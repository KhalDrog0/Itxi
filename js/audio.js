/**
 * audio.js
 * ─────────────────────────────────────────────────────────────
 * MOTOR DE AUDIO — AudioManager
 *
 * Responsabilidades:
 *  · Verificar si existe un archivo de audio para cada palabra.
 *  · Reproducir el audio al tocar el botón.
 *  · Gestionar estados: disponible / cargando / reproduciendo / próximamente.
 *  · Actualizar el texto e ícono del botón según el estado.
 *
 * RUTA DE AUDIOS:
 *  Los archivos de audio se ubican en: audio/
 *  Formatos soportados, en orden de prioridad: .mp3 → .ogg → .wav
 *  El nombre del archivo corresponde al campo `audio` en data.js.
 *  Ejemplo: para audio: "kajxad" → busca audio/kajxad.mp3
 *
 * PARA ACTIVAR UN AUDIO:
 *  1. Graba la pronunciación nativa en formato .mp3 (recomendado).
 *  2. Nombra el archivo igual al campo `audio` en data.js (sin tildes).
 *  3. Coloca el archivo en la carpeta /audio/.
 *  4. El botón se activará automáticamente al recargar la página.
 * ─────────────────────────────────────────────────────────────
 */

const AudioManager = (() => {

  // ── Configuración ──────────────────────────────────────────
  const CARPETA_AUDIO = 'audio/';
  const FORMATOS = ['mp3', 'ogg', 'wav']; // Orden de preferencia

  // ── Estado interno ─────────────────────────────────────────
  // Mapa de nombreArchivo → { existe: bool, formato: str | null }
  const cacheDisponibilidad = new Map();

  // Audio que se está reproduciendo actualmente (solo uno a la vez)
  let audioActual = null;
  let botonActual = null;

  // ── Textos e íconos de los estados del botón ───────────────
  const ESTADOS = {
    verificando:  { icono: '⏳', texto: 'Cargando…',       clase: '' },
    disponible:   { icono: '🔊', texto: 'Escuchar',        clase: 'disponible' },
    reproduciendo:{ icono: '🔉', texto: 'Reproduciendo…', clase: 'reproduciendo' },
    proximo:      { icono: '🔈', texto: 'Próximamente',    clase: 'proximo' },
    error:        { icono: '❌', texto: 'Error de audio',  clase: 'proximo' },
  };


  /**
   * verificarDisponibilidad(nombreArchivo)
   * Comprueba si existe algún formato del archivo de audio.
   * Usa fetch HEAD para no descargar el archivo completo.
   * Almacena el resultado en caché para no repetir peticiones.
   *
   * @param {string} nombreArchivo - Sin extensión (ej: "kajxad")
   * @returns {Promise<{ existe: boolean, formato: string|null }>}
   */
  async function verificarDisponibilidad(nombreArchivo) {
    if (!nombreArchivo) {
      return { existe: false, formato: null };
    }

    // Devolver desde caché si ya se verificó
    if (cacheDisponibilidad.has(nombreArchivo)) {
      return cacheDisponibilidad.get(nombreArchivo);
    }

    // Intentar cada formato en orden
    for (const formato of FORMATOS) {
      const ruta = `${CARPETA_AUDIO}${nombreArchivo}.${formato}`;
      try {
        const respuesta = await fetch(ruta, { method: 'HEAD' });
        if (respuesta.ok) {
          const resultado = { existe: true, formato };
          cacheDisponibilidad.set(nombreArchivo, resultado);
          return resultado;
        }
      } catch (_) {
        // Ignorar errores de red individuales y seguir al siguiente formato
      }
    }

    // No se encontró ningún formato
    const resultado = { existe: false, formato: null };
    cacheDisponibilidad.set(nombreArchivo, resultado);
    return resultado;
  }


  /**
   * aplicarEstado(boton, estado)
   * Actualiza el ícono, texto y clase CSS del botón de audio.
   *
   * @param {HTMLElement} boton - El elemento <button class="btn-audio">
   * @param {string} estado - Clave del objeto ESTADOS
   */
  function aplicarEstado(boton, estado) {
    if (!boton) return;
    const config = ESTADOS[estado] || ESTADOS.proximo;

    // Limpiar todas las clases de estado
    Object.values(ESTADOS).forEach(e => {
      if (e.clase) boton.classList.remove(e.clase);
    });

    // Aplicar nueva clase
    if (config.clase) boton.classList.add(config.clase);

    // Actualizar ícono y texto
    const iconoEl = boton.querySelector('.audio-icono');
    const textoEl = boton.querySelector('.audio-texto');
    if (iconoEl) iconoEl.textContent = config.icono;
    if (textoEl) textoEl.textContent = config.texto;

    // Habilitar/deshabilitar interacción
    boton.disabled = (estado === 'verificando' || estado === 'proximo' || estado === 'error');
    boton.style.cursor = boton.disabled ? 'not-allowed' : 'pointer';
  }


  /**
   * detenerActual()
   * Detiene el audio que se está reproduciendo y restablece su botón.
   */
  function detenerActual() {
    if (audioActual) {
      audioActual.pause();
      audioActual.currentTime = 0;
      audioActual = null;
    }
    if (botonActual) {
      aplicarEstado(botonActual, 'disponible');
      botonActual = null;
    }
  }


  /**
   * reproducir(nombreArchivo, boton)
   * Reproduce el audio de una palabra.
   * Si ya hay un audio reproduciéndose, lo detiene primero.
   * Si se toca el mismo botón mientras reproduce, funciona como pausa.
   *
   * @param {string} nombreArchivo - Sin extensión (ej: "kajxad")
   * @param {HTMLElement} boton - El botón que disparó la acción
   */
  async function reproducir(nombreArchivo, boton) {
    // Si es el mismo audio: pausar
    if (audioActual && botonActual === boton) {
      detenerActual();
      return;
    }

    // Detener audio anterior
    detenerActual();

    const disponibilidad = cacheDisponibilidad.get(nombreArchivo);
    if (!disponibilidad?.existe) return;

    const ruta = `${CARPETA_AUDIO}${nombreArchivo}.${disponibilidad.formato}`;
    const audio = new Audio(ruta);

    audioActual = audio;
    botonActual = boton;

    aplicarEstado(boton, 'reproduciendo');

    // Al terminar: restablecer estado
    audio.addEventListener('ended', () => {
      if (audioActual === audio) {
        aplicarEstado(boton, 'disponible');
        audioActual = null;
        botonActual = null;
      }
    });

    // Si hay error al reproducir
    audio.addEventListener('error', () => {
      if (audioActual === audio) {
        aplicarEstado(boton, 'error');
        audioActual = null;
        botonActual = null;
      }
    });

    try {
      await audio.play();
    } catch (err) {
      // El navegador puede bloquear autoplay en algunos contextos
      aplicarEstado(boton, 'error');
      audioActual = null;
      botonActual = null;
    }
  }


  /**
   * inicializarBoton(boton, nombreArchivo)
   * Configura un botón de audio: verifica disponibilidad y asigna el listener.
   * Se llama desde render.js al crear cada tarjeta.
   *
   * @param {HTMLElement} boton - <button class="btn-audio">
   * @param {string|undefined} nombreArchivo - Campo `audio` del objeto de palabra
   */
  async function inicializarBoton(boton, nombreArchivo) {
    if (!boton) return;

    // Estado inicial mientras verifica
    aplicarEstado(boton, 'verificando');

    // Si no hay campo audio definido, marcar como próximamente sin verificar
    if (!nombreArchivo) {
      aplicarEstado(boton, 'proximo');
      return;
    }

    const disponibilidad = await verificarDisponibilidad(nombreArchivo);

    if (disponibilidad.existe) {
      aplicarEstado(boton, 'disponible');

      // Asignar acción de reproducción
      boton.addEventListener('click', (evento) => {
        evento.stopPropagation(); // No voltear la tarjeta al tocar el botón
        reproducir(nombreArchivo, boton);
      });

      // Soporte para teclado
      boton.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter' || evento.key === ' ') {
          evento.preventDefault();
          evento.stopPropagation();
          reproducir(nombreArchivo, boton);
        }
      });

    } else {
      aplicarEstado(boton, 'proximo');
    }
  }


  /**
   * crearBoton(nombreArchivo)
   * Crea y retorna un elemento <button> de audio ya configurado.
   * Útil para que render.js lo inserte en las tarjetas.
   *
   * @param {string|undefined} nombreArchivo
   * @returns {HTMLButtonElement}
   */
  function crearBoton(nombreArchivo) {
    const boton = document.createElement('button');
    boton.className = 'btn-audio';
    boton.setAttribute('type', 'button');
    boton.setAttribute('aria-label', 'Reproducir pronunciación en kwe\'sx we\'wnxi');

    boton.innerHTML = `
      <span class="audio-icono" aria-hidden="true">⏳</span>
      <span class="audio-texto">Cargando…</span>
    `;

    // Inicializar de forma asíncrona (no bloquea el renderizado)
    inicializarBoton(boton, nombreArchivo);

    return boton;
  }


  // ── API Pública ─────────────────────────────────────────────
  return {
    crearBoton,
    detenerActual,
  };

})(); // fin AudioManager

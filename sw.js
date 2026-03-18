/**
 * sw.js — Service Worker
 * ─────────────────────────────────────────────────────────────
 * Permite que la página funcione sin conexión a internet.
 * Guarda en caché todos los archivos del proyecto en la primera
 * visita, y los sirve desde la caché en visitas posteriores.
 *
 * PARA ACTUALIZAR EL CACHÉ:
 * Cambia el número de versión en CACHE_NOMBRE (ej: 'pwesa-v2').
 * El navegador eliminará el caché antiguo automáticamente.
 * ─────────────────────────────────────────────────────────────
 */

const CACHE_NOMBRE = 'pwesa-v1';

// Archivos a pre-cachear en la instalación
const ARCHIVOS_PRECACHE = [
  '/',
  '/index.html',
  '/css/variables.css',
  '/css/layout.css',
  '/css/controls.css',
  '/css/cards.css',
  '/css/print.css',
  '/js/data.js',
  '/js/audio.js',
  '/js/render.js',
  '/js/app.js',
];


// ── Instalar: pre-cachear todos los archivos estáticos ────────
self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE_NOMBRE).then((cache) => {
      return cache.addAll(ARCHIVOS_PRECACHE);
    })
  );
  // Activar inmediatamente sin esperar a que el SW anterior expire
  self.skipWaiting();
});


// ── Activar: limpiar cachés de versiones antiguas ─────────────
self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys().then((nombres) => {
      return Promise.all(
        nombres
          .filter(nombre => nombre !== CACHE_NOMBRE)
          .map(nombre => caches.delete(nombre))
      );
    })
  );
  // Tomar control de todas las pestañas abiertas
  self.clients.claim();
});


// ── Fetch: estrategia Cache First (offline-first) ─────────────
// Para archivos de audio: Network First (siempre buscar el más reciente)
// Para todo lo demás: caché primero, red como respaldo
self.addEventListener('fetch', (evento) => {
  const url = new URL(evento.request.url);

  // Archivos de audio: intentar red primero, luego caché
  if (url.pathname.startsWith('/audio/')) {
    evento.respondWith(
      fetch(evento.request)
        .then((respuesta) => {
          // Guardar en caché si la respuesta es válida
          if (respuesta && respuesta.status === 200) {
            const copia = respuesta.clone();
            caches.open(CACHE_NOMBRE).then(cache => cache.put(evento.request, copia));
          }
          return respuesta;
        })
        .catch(() => {
          // Sin red: intentar desde caché
          return caches.match(evento.request);
        })
    );
    return;
  }

  // Resto de archivos: caché primero
  evento.respondWith(
    caches.match(evento.request).then((respuestaCache) => {
      if (respuestaCache) return respuestaCache;

      // No está en caché: buscar en red y guardar
      return fetch(evento.request).then((respuesta) => {
        if (respuesta && respuesta.status === 200 && respuesta.type === 'basic') {
          const copia = respuesta.clone();
          caches.open(CACHE_NOMBRE).then(cache => cache.put(evento.request, copia));
        }
        return respuesta;
      });
    })
  );
});

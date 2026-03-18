/**
 * data.js
 * ─────────────────────────────────────────────────────────────
 * BASE DE DATOS DE VOCABULARIO — Kwe'sx We'wnxi / Fútbol
 * Territorio Sa'th Tama Taba, Caldono, Cauca — Pueblo Nasa
 *
 * CÓMO AGREGAR NUEVAS PALABRAS:
 * 1. Localiza la categoría correspondiente en el array CATEGORIAS.
 * 2. Agrega un nuevo objeto al array `palabras` con esta estructura:
 *
 *    {
 *      nasa:  "Palabra en kwe'sx we'wnxi",  // obligatorio
 *      esp:   "Traducción en español",       // obligatorio
 *      icon:  "🎯",                          // emoji representativo
 *      audio: "nombre-del-archivo",          // sin extensión (ver audio/LEEME.md)
 *                                            // si no hay audio, omite este campo
 *      tipo:  "amarilla"                     // solo para tarjetas de sanción
 *    }
 *
 * 3. Para agregar una CATEGORÍA nueva, agrega un objeto al array
 *    CATEGORIAS con id único (siguiente número), nombre, icono, colorCss.
 *    Los colorCss disponibles son: cat-0, cat-1, cat-2, cat-3, cat-4, cat-5
 *
 * IMPORTANTE: Respetar la ortografía exacta del kwe'sx we'wnxi,
 * incluyendo caracteres especiales: ç, ũ, ẽ, ҫ, ê, ô, tx, kx, etc.
 * ─────────────────────────────────────────────────────────────
 */

const CATEGORIAS = [

  /* ══════════════════════════════════════════════════════════
     CATEGORÍA 0 — ELEMENTOS DEL JUEGO
     Términos para los elementos, situaciones y reglas del partido.
  ══════════════════════════════════════════════════════════ */
  {
    id: 0,
    nombre: "Elementos del Juego",
    icono: "⚽",
    colorCss: "cat-0",
    palabras: [
      { nasa: "Kajxad",                         esp: "Balón / Pelota",                   icon: "⚽",  audio: "kajxad" },
      { nasa: "Vxitx",                          esp: "Portería",                         icon: "🥅",  audio: "vxitx" },
      { nasa: "Dxi'j swẽth",                   esp: "Penal",                            icon: "🎯",  audio: "dxij-swenth" },
      { nasa: "Pxahju kutxi'jnxisa",            esp: "Centro de la cancha",              icon: "⭕",  audio: "pxahju-kutxijnxisa" },
      { nasa: "Puzaju ki'pnxi",                 esp: "Tiro de esquina / Córner",         icon: "🚩",  audio: "puzaju-kipnxi" },
      { nasa: "Puçhuh kutxi'jnxi",              esp: "Saque de banda",                   icon: "🤲",  audio: "puchhuh-kutxijnxi" },
      { nasa: "Ku'le ki'pnxi",                  esp: "Tiro libre",                       icon: "🦶",  audio: "kule-kipnxi" },
      { nasa: "Yeckhe ũsnxi",                   esp: "Fuera de lugar / Fuera de juego",  icon: "🚫",  audio: "yeckhe-usnxi" },
      { nasa: "Peetxi yaakhnxi",                esp: "Autogol",                          icon: "😅",  audio: "peetxi-yaakhnxi" },
      { nasa: "Yupuyak pwesa'j",                esp: "Barrera",                          icon: "🧱",  audio: "yupuyak-pwesaj" },
      { nasa: "Je'zus dxi'pnxi",                esp: "Tiempo extra / Dos jugadas",       icon: "⏱️",  audio: "jezus-dxipnxi" },
      { nasa: "Kha'da'tx",                      esp: "Empate",                           icon: "⚖️",  audio: "khadatx" },
      { nasa: "Aknxi",                          esp: "Hacer gol",                        icon: "🎉",  audio: "aknxi" },
      { nasa: "Kajxad kasehnxi / kasehk",       esp: "Salió el balón",                   icon: "↗️",  audio: "kajxad-kasehnxi" },
    ]
  },

  /* ══════════════════════════════════════════════════════════
     CATEGORÍA 1 — PERSONAS Y ROLES
     Nombres para cada persona que participa en un partido.
  ══════════════════════════════════════════════════════════ */
  {
    id: 1,
    nombre: "Personas y Roles",
    icono: "👥",
    colorCss: "cat-1",
    palabras: [
      { nasa: "Ufx putsa / Ufxsa",              esp: "Árbitro",                          icon: "🧑‍⚖️", audio: "ufx-putsa" },
      { nasa: "Ufxsa's pu'ҫxsa",                esp: "Juez de línea / Asistente",        icon: "🏃",   audio: "ufxsas-pucxsa" },
      { nasa: "Dxi'ja'sa",                      esp: "Técnico / Entrenador",             icon: "📋",   audio: "dxijasa" },
      { nasa: "Dxi'pu'ҫxsa",                    esp: "Capitán",                          icon: "🎖️",  audio: "dxipucxsa" },
      { nasa: "Aphsaa",                         esp: "Arquero / Portero",                icon: "🧤",   audio: "aphsaa" },
      { nasa: "E'skhe pwesa'jsa",               esp: "Defensa",                          icon: "🛡️",  audio: "eskhe-pwesajsa" },
      { nasa: "Yeckhe pwesasa",                 esp: "Delantero",                        icon: "🚀",   audio: "yeckhe-pwesasa" },
      { nasa: "Pxahte pwe'sa'jsa",              esp: "Mediocampista",                    icon: "🔄",   audio: "pxahte-pwesajsa" },
      { nasa: "Puҫhsu pwesa'jsa",               esp: "Volante",                          icon: "💨",   audio: "puchsu-pwesajsa" },
      { nasa: "Pu'yaksa",                       esp: "Suplente / Jugador en banca",      icon: "🪑",   audio: "puyaksa" },
      { nasa: "Thle",                           esp: "Narrador",                         icon: "🎙️",  audio: "thle" },
      { nasa: "Thle's pu'ҫxsa",                 esp: "Comentarista",                     icon: "💬",   audio: "thles-pucxsa" },
      { nasa: "Papêysa",                        esp: "Entrevistador",                    icon: "📹",   audio: "papeysa" },
      { nasa: "Eçte sũtxsaa / ãsxsa",           esp: "Planillera",                       icon: "📝",   audio: "ecte-sutxsaa" },
      { nasa: "Pwesa'eç",                       esp: "Planilla",                         icon: "📄",   audio: "pwesaec" },
    ]
  },

  /* ══════════════════════════════════════════════════════════
     CATEGORÍA 2 — IMPLEMENTOS Y UNIFORME
     Ropa y elementos que se usan en el partido.
  ══════════════════════════════════════════════════════════ */
  {
    id: 2,
    nombre: "Implementos y Uniforme",
    icono: "👕",
    colorCss: "cat-2",
    palabras: [
      { nasa: "Kmisa",                          esp: "Camiseta",                         icon: "👕",   audio: "kmisa" },
      { nasa: "Pwesa'j jat muçx",               esp: "Pantaloneta / Short deportivo",    icon: "🩳",   audio: "pwesaj-jat-mucx" },
      { nasa: "Çxida phuph",                    esp: "Medias",                           icon: "🧦",   audio: "cxida-phuph" },
      { nasa: "Pil phuph",                      esp: "Canilleras / Espinilleras",        icon: "🦵",   audio: "pil-phuph" },
      { nasa: "Pelkatxi",                       esp: "Guayos / Zapatos de fútbol",       icon: "👟",   audio: "pelkatxi" },
      { nasa: "Jxũknxisa",                      esp: "Cordones",                         icon: "🎀",   audio: "jxuknxisa" },
      { nasa: "Wejxa'jxa",                      esp: "Banderines de córner",             icon: "🚩",   audio: "wejxajxa" },
      { nasa: "Pwesa'jsa jathnxi",              esp: "Uniformes",                        icon: "👔",   audio: "pwesajsa-jathnxi" },
      { nasa: "Pwesa'j eç",                     esp: "Carnet / Identificación",          icon: "🪪",   audio: "pwesaj-ec" },
      { nasa: "Eçxwa dxi'j",                    esp: "Reglamento",                       icon: "📖",   audio: "ecxwa-dxij" },
      { nasa: "Kajxad pwesa'jthe jxpe'hnxi",    esp: "Implementos deportivos",           icon: "🎒",   audio: "kajxad-pwesajthe-jxpehnxi" },
    ]
  },

  /* ══════════════════════════════════════════════════════════
     CATEGORÍA 3 — ACCIONES Y FALTAS
     Lo que se hace y lo que no se debe hacer en la cancha.
  ══════════════════════════════════════════════════════════ */
  {
    id: 3,
    nombre: "Acciones y Faltas",
    icono: "⚡",
    colorCss: "cat-3",
    palabras: [
      { nasa: "Juuna'pwesa'jnxi",               esp: "Falta",                            icon: "🚫",   audio: "juunapwesajnxi" },
      { nasa: "Kuseju dxi'pnxi",                esp: "Mano (falta con la mano)",         icon: "✋",   audio: "kuseju-dxipnxi" },
      { nasa: "Pelkatxi muç",                   esp: "Tacle / Tackle",                   icon: "🦵",   audio: "pelkatxi-muc" },
      { nasa: "Ku'ta pwe'sx",                   esp: "Hombro con hombro",                icon: "💪",   audio: "kuta-pwesx" },
      { nasa: "Çxida spahden",                  esp: "Zancadilla",                       icon: "🦶",   audio: "cxida-spahden" },
      { nasa: "Yu'pthehn",                      esp: "Cambio / Sustitución",             icon: "🔄",   audio: "yupthehn" },
      { nasa: "Pdxi'putx",                      esp: "Enfrentar / Jugar contra",         icon: "⚔️",  audio: "pdxiputx" },
      { nasa: "Ufxsa (acción)",                 esp: "Pitar (acción del árbitro)",       icon: "📢",   audio: "ufxsa-accion" },
      { nasa: "Pases (Mtxuhde)",                esp: "Pases",                            icon: "➡️",  audio: "pases-mtxuhde" },
      { nasa: "Kaku'ju'k",                      esp: "Meleos / Disputa del balón",       icon: "💥",   audio: "kakujuk" },
      { nasa: "Mki'p",                          esp: "¡Pégale! / Disparar al arco",     icon: "🦶",   audio: "mkip" },
      { nasa: "Çxkamitxçxa mkahta",             esp: "Haga una chilena / Bicicleta",    icon: "🤸",   audio: "cxkamitxcxa-mkahta" },
      { nasa: "Wejxkwe çxhãçxha kahta",         esp: "Pégale con más fuerza",           icon: "💪",   audio: "wejxkwe-cxhancxha-kahta" },
      { nasa: "Kajxada's ew kuutxi'j",          esp: "Saque bien el balón",              icon: "🎯",   audio: "kajxadas-ew-kuutxij" },
      { nasa: "Kajxada's kiwete ki'pçxa kahta", esp: "Coloque el balón en el piso",      icon: "⬇️",  audio: "kajxadas-kiwete-kipcxa-kahta" },
      { nasa: "Pxyahte ki'pçxa kuutxi'j",       esp: "Saque del centro",                 icon: "⭕",   audio: "pxyahte-kipcxa-kuutxij" },
      { nasa: "Yaçkhe peyçxa mkah / mki'p",     esp: "Haga pases adelante con precisión",icon: "🎯",  audio: "yackhe-peycxa-mkah" },
      { nasa: "Kajxada's jxkwetuh mpa'ka",      esp: "Reciba el balón con la cabeza",   icon: "🤯",   audio: "kajxadas-jxkwetuh-mpaka" },
      { nasa: "Puzaju katanxi's jxkwetuh mpa'ka",esp:"Reciba con la cabeza el córner",  icon: "🚩",   audio: "puzaju-katanxis-jxkwetuh-mpaka" },
      { nasa: "Dud kajxada's pakweya mkaajwe",  esp: "Manden rápido a buscar el balón", icon: "🏃",   audio: "dud-kajxadas-pakweya-mkaajwe" },
    ]
  },

  /* ══════════════════════════════════════════════════════════
     CATEGORÍA 4 — TARJETAS Y SANCIONES
     Las tarjetas que muestra el árbitro.
     El campo `tipo` controla el color del borde en la tarjeta.
  ══════════════════════════════════════════════════════════ */
  {
    id: 4,
    nombre: "Tarjetas y Sanciones",
    icono: "🟨",
    colorCss: "cat-4",
    palabras: [
      { nasa: "Txwesnxisa",        esp: "Tarjeta",          icon: "🃏",  tipo: "",         audio: "txwesnxisa" },
      { nasa: "Txwesnxisa sxkikx", esp: "Tarjeta Amarilla", icon: "🟨",  tipo: "amarilla", audio: "txwesnxisa-sxkikx" },
      { nasa: "Txwesnxisa beh",    esp: "Tarjeta Roja",     icon: "🟥",  tipo: "roja",     audio: "txwesnxisa-beh" },
      { nasa: "Txwesnxisa çêy",    esp: "Tarjeta Verde",    icon: "🟩",  tipo: "verde",    audio: "txwesnxisa-cey" },
      { nasa: "Txwesnxisa êeçêy",  esp: "Tarjeta Azul",     icon: "🟦",  tipo: "azul",     audio: "txwesnxisa-eecey" },
    ]
  },

  /* ══════════════════════════════════════════════════════════
     CATEGORÍA 5 — FRASES Y RECOMENDACIONES
     Oraciones completas para usar en la cancha y el partido.
     Esta categoría usa tarjetas de frase (sin volteo).
  ══════════════════════════════════════════════════════════ */
  {
    id: 5,
    nombre: "Frases y Recomendaciones",
    icono: "💬",
    colorCss: "cat-5",
    esFrases: true,
    palabras: [
      { nasa: "Weçxan kuse mkaatu'jwe",          esp: "Saluden y den la mano al equipo contrario",  icon: "🤝",  audio: "wecxan-kuse-mkaatujwe" },
      { nasa: "Ufxsa's kazx we'wnuwe",           esp: "No hablen mal al árbitro",                   icon: "🤐",  audio: "ufxsas-kazx-wewnuwe" },
      { nasa: "Tud Yu'pthe'jwe pwesajxa",        esp: "Cambien rápido para jugar",                  icon: "⚡",  audio: "tud-yupthejwe-pwesajxa" },
      { nasa: "Txakte kase'jwe takjxatha'w",     esp: "Salgan a la cancha, vamos a empezar",        icon: "🏃",  audio: "txakte-kasejwe-takjxathaw" },
      { nasa: "Ufxsa'ew newe'wna beh pwesasatx", esp: "Árbitro, recomiende a los jugadores",        icon: "📢",  audio: "ufxsaew-newewna-beh-pwesasatx" },
      { nasa: "Newe'wnxi",                       esp: "Recomendaciones / Consejos",                 icon: "💡",  audio: "newewnxi" },
      { nasa: "Ju'j pwesa'jthe juegũ",           esp: "Juego violento",                             icon: "⚠️", audio: "juj-pwesajthe-juegu" },
      { nasa: "Kaajxada's neejxũ",               esp: "Vaya, traiga el balón",                      icon: "🏃",  audio: "kaajxadas-neejxu" },
    ]
  }

]; // fin CATEGORIAS

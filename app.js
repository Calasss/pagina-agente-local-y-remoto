/**
 * CosmoGuide - Motor Interactivo del Sistema Solar y Asistente Cósmico
 * Incluye:
 * 1. Base de datos planetaria enriquecida
 * 2. Búsqueda y filtrado reactivo
 * 3. Modal de exploración detallada con síntesis de sonido (Web Audio API)
 * 4. Simulador Orbital 2D interactivo (Canvas)
 * 5. Calculadora Cósmica de Peso y Edad
 * 6. Comparador Cara a Cara de Planetas
 * 7. Quiz de Trivia Astronómica con puntuación y ranking
 * 8. CosmoBot: Asistente IA con soporte Dual (Ollama local + Motor Experto Integrado)
 * 9. Fondo interactivo de estrellas titilantes y meteoros
 */

// ============================================================================
// 1. BASE DE DATOS DETALLADA DE PLANETAS
// ============================================================================
const PLANETS_DATA = [
  {
    id: 'mercurio',
    name: 'Mercurio',
    category: 'rocoso',
    categoryLabel: 'Interior • Rocoso',
    description: 'El planeta más pequeño del sistema solar y el más cercano al Sol. No posee atmósfera que retenga el calor, lo que crea un contraste térmico infernal entre el día y la noche.',
    colorGradient: 'linear-gradient(135deg, #a8a29e, #57534e)',
    accentColor: '#a8a29e',
    audioFreq: 194.18, // Frecuencia astronómica teórica (Octava de Cousto)
    specs: {
      distance: 57.9, // Millones de km
      distanceFormatted: '57.9M km (0.39 UA)',
      orbitalPeriodDays: 88,
      orbitalPeriodFormatted: '88 días terrestres',
      orbitalPeriodYears: 0.241,
      rotationPeriod: '58.6 días',
      dayDurationHours: 1407.6,
      radiusKm: 2439.7,
      diameterKm: 4879,
      relativeSize: 0.38, // comparado con la Tierra
      gravity: 3.7, // m/s2
      gravityRelative: 0.38,
      moons: 0,
      temperatureRange: '-180 °C a 430 °C',
      atmosphere: 'Exosfera tenue: Oxígeno (42%), Sodio (29%), Hidrógeno (22%), Helio (6%)'
    },
    funFact: 'A pesar de estar pegado al Sol, Mercurio no es el planeta más caliente (lo es Venus). Además, se ha ido encogiendo varios kilómetros a lo largo de millones de años a medida que su núcleo de hierro se enfría.',
    missions: ['Mariner 10 (1974)', 'MESSENGER (2011-2015)', 'BepiColombo (en camino)']
  },
  {
    id: 'venus',
    name: 'Venus',
    category: 'rocoso',
    categoryLabel: 'Interior • Rocoso',
    description: 'Conocido como el "lucero del alba", es un infierno volcánico cubierto por densas nubes de ácido sulfúrico que atrapan el calor en un efecto invernadero descontrolado.',
    colorGradient: 'linear-gradient(135deg, #fde047, #d97706)',
    accentColor: '#f59e0b',
    audioFreq: 221.23,
    specs: {
      distance: 108.2,
      distanceFormatted: '108.2M km (0.72 UA)',
      orbitalPeriodDays: 224.7,
      orbitalPeriodFormatted: '225 días terrestres',
      orbitalPeriodYears: 0.615,
      rotationPeriod: '243 días (retrógrado)',
      dayDurationHours: 5832,
      radiusKm: 6051.8,
      diameterKm: 12104,
      relativeSize: 0.95,
      gravity: 8.87,
      gravityRelative: 0.90,
      moons: 0,
      temperatureRange: '465 °C constante',
      atmosphere: 'Dióxido de carbono (96.5%), Nitrógeno (3.5%), nubes de Ácido Sulfúrico'
    },
    funFact: '¡En Venus el Sol sale por el oeste y se pone por el este! Gira en sentido contrario a casi todos los demás planetas y su día (243 días terrestres) dura más que su año (225 días terrestres).',
    missions: ['Venera 7 (primer aterrizaje, 1970)', 'Magallanes (1990)', 'Venus Express (2006)', 'Akatsuki (activo)']
  },
  {
    id: 'tierra',
    name: 'Tierra',
    category: 'rocoso',
    categoryLabel: 'Interior • Habitable',
    description: 'Nuestro fascinante oasis cósmico. El único cuerpo celeste conocido hasta hoy que alberga vida, océanos de agua líquida superficial y una atmósfera protectora rica en oxígeno.',
    colorGradient: 'radial-gradient(circle at 30% 30%, #38bdf8, #0284c7, #15803d 70%, #0369a1 90%)',
    accentColor: '#38bdf8',
    audioFreq: 136.10, // Sonido del año terrestre (OM / 136.1 Hz)
    specs: {
      distance: 149.6,
      distanceFormatted: '149.6M km (1.00 UA)',
      orbitalPeriodDays: 365.25,
      orbitalPeriodFormatted: '365.25 días',
      orbitalPeriodYears: 1.0,
      rotationPeriod: '23h 56m 4s',
      dayDurationHours: 24,
      radiusKm: 6371,
      diameterKm: 12742,
      relativeSize: 1.0,
      gravity: 9.81,
      gravityRelative: 1.00,
      moons: 1,
      temperatureRange: '-89 °C a 58 °C (media 15 °C)',
      atmosphere: 'Nitrógeno (78%), Oxígeno (21%), Argón (0.9%), Dióxido de carbono (0.04%)'
    },
    funFact: 'La atmósfera terrestre nos protege de millones de meteoroides cada día, evaporándolos como estrellas fugaces antes de que toquen el suelo. Además, tiene la mayor densidad de todos los planetas.',
    missions: ['Estación Espacial Internacional', 'Telescopios Hubble y James Webb', 'Flotas de satélites climáticos']
  },
  {
    id: 'marte',
    name: 'Marte',
    category: 'rocoso',
    categoryLabel: 'Interior • Rocoso',
    description: 'El célebre "Planeta Rojo". Un desierto glacial con vestigios de antiguos ríos, valles secos y la montaña volcánica más alta del sistema solar entero.',
    colorGradient: 'linear-gradient(135deg, #f87171, #991b1b)',
    accentColor: '#ef4444',
    audioFreq: 144.72,
    specs: {
      distance: 227.9,
      distanceFormatted: '227.9M km (1.52 UA)',
      orbitalPeriodDays: 687,
      orbitalPeriodFormatted: '687 días terrestres',
      orbitalPeriodYears: 1.88,
      rotationPeriod: '24h 37m',
      dayDurationHours: 24.6,
      radiusKm: 3389.5,
      diameterKm: 6779,
      relativeSize: 0.53,
      gravity: 3.71,
      gravityRelative: 0.38,
      moons: 2,
      temperatureRange: '-140 °C a 20 °C (media -63 °C)',
      atmosphere: 'Dióxido de carbono (95.3%), Nitrógeno (2.6%), Argón (1.9%)'
    },
    funFact: 'El Monte Olimpo en Marte mide 22 kilómetros de altura: ¡casi el triple de la altitud del Monte Everest! Sus lunas, Fobos y Deimos, son probablemente asteroides capturados.',
    missions: ['Viking 1 & 2', 'Curiosity (2012-hoy)', 'Perseverance e Ingenuity (2021-hoy)', 'ExoMars']
  },
  {
    id: 'jupiter',
    name: 'Júpiter',
    category: 'gaseoso',
    categoryLabel: 'Exterior • Gigante Gaseoso',
    description: 'El rey de los planetas. Un coloso con más del doble de la masa de todos los demás planetas combinados, envuelto en bandas de nubes tempestuosas y una tormenta centenaria.',
    colorGradient: 'repeating-linear-gradient(-20deg, #d97706 0px, #d97706 12px, #fef3c7 12px, #fef3c7 20px, #b45309 20px, #b45309 30px)',
    accentColor: '#f59e0b',
    audioFreq: 183.58,
    specs: {
      distance: 778.5,
      distanceFormatted: '778.5M km (5.20 UA)',
      orbitalPeriodDays: 4333,
      orbitalPeriodFormatted: '11.86 años terrestres',
      orbitalPeriodYears: 11.86,
      rotationPeriod: '9h 55m',
      dayDurationHours: 9.9,
      radiusKm: 69911,
      diameterKm: 139820,
      relativeSize: 10.97,
      gravity: 24.79,
      gravityRelative: 2.53,
      moons: 95,
      temperatureRange: '-110 °C (capa superior)',
      atmosphere: 'Hidrógeno (90%), Helio (10%), trazas de Metano, Vapor de agua y Amoniaco'
    },
    funFact: 'La famosa "Gran Mancha Roja" de Júpiter es un gigantesco anticiclón en el que cabría la Tierra entera. Ha estado activo de forma documentada durante más de 300 años.',
    missions: ['Pioneer 10 & 11', 'Voyager 1 & 2', 'Galileo (1995-2003)', 'Juno (2016-presente)', 'JUICE (en viaje)']
  },
  {
    id: 'saturno',
    name: 'Saturno',
    category: 'gaseoso',
    categoryLabel: 'Exterior • Gigante Gaseoso',
    description: 'La joya del cosmos, distinguido por su espectacular y complejo sistema de anillos formados por billones de fragmentos de hielo, roca y polvo cósmico.',
    colorGradient: 'linear-gradient(135deg, #fef08a, #ca8a04)',
    accentColor: '#eab308',
    audioFreq: 147.85,
    hasRing: true,
    specs: {
      distance: 1434,
      distanceFormatted: '1.434M km (9.58 UA)',
      orbitalPeriodDays: 10759,
      orbitalPeriodFormatted: '29.45 años terrestres',
      orbitalPeriodYears: 29.45,
      rotationPeriod: '10h 33m',
      dayDurationHours: 10.55,
      radiusKm: 58232,
      diameterKm: 116460,
      relativeSize: 9.14,
      gravity: 10.44,
      gravityRelative: 1.06,
      moons: 146,
      temperatureRange: '-140 °C (capa superior)',
      atmosphere: 'Hidrógeno (96%), Helio (3%), Metano (0.4%), Amoniaco'
    },
    funFact: 'Saturno es el único planeta del sistema solar que flotaría en agua: su densidad media (0.687 g/cm³) es menor que la del agua. Sus anillos son anchísimos (280.000 km), pero tienen apenas unos 10 a 30 metros de espesor.',
    missions: ['Pioneer 11', 'Voyager 1 & 2', 'Cassini-Huygens (2004-2017)']
  },
  {
    id: 'urano',
    name: 'Urano',
    category: 'helado',
    categoryLabel: 'Exterior • Gigante Helado',
    description: 'Un misterioso gigante azul verdoso que rueda sobre su plano orbital debido a su descomunal inclinación de 98°, creando las estaciones más extremas conocidas.',
    colorGradient: 'linear-gradient(135deg, #a5f3fc, #0891b2)',
    accentColor: '#06b6d4',
    audioFreq: 207.36,
    specs: {
      distance: 2871,
      distanceFormatted: '2.871M km (19.2 UA)',
      orbitalPeriodDays: 30687,
      orbitalPeriodFormatted: '84.01 años terrestres',
      orbitalPeriodYears: 84.01,
      rotationPeriod: '17h 14m (retrógrado)',
      dayDurationHours: 17.2,
      radiusKm: 25362,
      diameterKm: 50724,
      relativeSize: 3.98,
      gravity: 8.69,
      gravityRelative: 0.89,
      moons: 28,
      temperatureRange: '-195 °C a -224 °C (el más frío registrado)',
      atmosphere: 'Hidrógeno (83%), Helio (15%), Metano (2% que le otorga su color cian)'
    },
    funFact: 'Debido a su inclinación lateral de 98°, cada uno de sus polos experimenta 42 años de luz solar continua durante su verano, seguidos de 42 años de profunda oscuridad invernal.',
    missions: ['Voyager 2 (enero de 1986, único sobrevuelo histórico)']
  },
  {
    id: 'neptuno',
    name: 'Neptuno',
    category: 'helado',
    categoryLabel: 'Exterior • Gigante Helado',
    description: 'El mundo más distante y azotado por tempestades supersónicas que superan los 2.000 km/h. Un reino de azul intenso en los confines del sistema solar.',
    colorGradient: 'linear-gradient(135deg, #38bdf8, #1e3a8a)',
    accentColor: '#3b82f6',
    audioFreq: 211.44,
    specs: {
      distance: 4495,
      distanceFormatted: '4.495M km (30.1 UA)',
      orbitalPeriodDays: 60190,
      orbitalPeriodFormatted: '164.8 años terrestres',
      orbitalPeriodYears: 164.8,
      rotationPeriod: '16h 6m',
      dayDurationHours: 16.1,
      radiusKm: 24622,
      diameterKm: 49244,
      relativeSize: 3.86,
      gravity: 11.15,
      gravityRelative: 1.14,
      moons: 16,
      temperatureRange: '-201 °C constante',
      atmosphere: 'Hidrógeno (80%), Helio (19%), Metano (1.5%)'
    },
    funFact: 'Neptuno fue descubierto mediante cálculos matemáticos antes de ser visto por un telescopio. Los científicos teorizan que en sus profundidades las presiones son tan extremas que llueven diamantes reales hacia su núcleo.',
    missions: ['Voyager 2 (agosto de 1989)']
  }
];

// ============================================================================
// 2. BANCO DE PREGUNTAS DEL QUIZ ASTRONÓMICO
// ============================================================================
const TRIVIA_QUESTIONS = [
  {
    question: '¿Cuál es el planeta más caliente del Sistema Solar?',
    options: ['Mercurio', 'Venus', 'Marte', 'Júpiter'],
    correct: 1,
    explanation: 'Aunque Mercurio está más cerca del Sol, Venus es el más caliente (~465 °C) debido a su atmósfera ultra densa de CO2 que causa un efecto invernadero colosal.'
  },
  {
    question: '¿Qué planeta tiene una densidad menor a la del agua y flotaría si existiera un océano colosal?',
    options: ['Urano', 'Neptuno', 'Saturno', 'Júpiter'],
    correct: 2,
    explanation: 'Saturno tiene una densidad media de aproximadamente 0.69 g/cm³, menor que la del agua líquida (1.0 g/cm³).'
  },
  {
    question: '¿En qué planeta se ubica el volcán más alto del sistema solar (Monte Olimpo)?',
    options: ['Venus', 'Tierra', 'Mercurio', 'Marte'],
    correct: 3,
    explanation: 'El Monte Olimpo en Marte se eleva 22 kilómetros de altura sobre la superficie marciana, ¡tres veces el Everest!'
  },
  {
    question: '¿Qué planeta "rueda de lado" con una inclinación axial de casi 98 grados?',
    options: ['Urano', 'Neptuno', 'Venus', 'Mercurio'],
    correct: 0,
    explanation: 'Urano tiene una inclinación axial de 97.8°, lo que significa que orbita casi de costado en comparación con los demás planetas.'
  },
  {
    question: '¿Aproximadamente qué porcentaje de la masa total del Sistema Solar posee el Sol?',
    options: ['50%', '75.5%', '88.3%', 'Más del 99.8%'],
    correct: 3,
    explanation: 'El Sol agrupa aproximadamente el 99.86% de toda la masa del sistema solar entero; todos los planetas juntos son apenas una fracción mínima.'
  },
  {
    question: '¿Cuál es el planeta con el día más corto (rotación más veloz sobre su eje)?',
    options: ['Tierra', 'Júpiter', 'Saturno', 'Mercurio'],
    correct: 1,
    explanation: 'A pesar de su descomunal tamaño, Júpiter completa una rotación en apenas 9 horas y 55 minutos.'
  },
  {
    question: '¿Cuántas lunas confirmadas posee el planeta Venus?',
    options: ['0', '1', '2', '4'],
    correct: 0,
    explanation: 'Venus y Mercurio son los únicos planetas del sistema solar que carecen por completo de lunas naturales.'
  },
  {
    question: '¿Qué sonda espacial ha sido la única en visitar tanto a Urano como a Neptuno?',
    options: ['Cassini', 'Voyager 1', 'Voyager 2', 'New Horizons'],
    correct: 2,
    explanation: 'Voyager 2 de la NASA completó el "Grand Tour", sobrevolando Urano en 1986 y Neptuno en 1989.'
  }
];

// ============================================================================
// 3. BASE DE CONOCIMIENTO PARA COSMOBOT (OLLAMA FALLBACK & ASISTENCIA)
// ============================================================================
const COSMOBOT_KNOWLEDGE = {
  greetings: [
    '¡Hola, comandante estelar! 🚀 ¿Qué misterio del cosmos deseas explorar hoy?',
    '¡Saludos terrícola! 🪐 Estoy listo para guiarte por los mundos del sistema solar. ¿Qué te gustaría saber?',
    '¡Bienvenido al puente de mando! Pregúntame sobre cualquier planeta, órbita, misiones espaciales o física cósmica.'
  ],
  keywords: [
    {
      tokens: ['caliente', 'calor', 'temperatura mas alta'],
      response: '🔥 **Venus** es el planeta más caliente del Sistema Solar con una temperatura media de **465 °C**. Aunque Mercurio está más cerca del Sol, Venus posee una densa manta de dióxido de carbono que genera un efecto invernadero colosal capaz de fundir plomo.'
    },
    {
      tokens: ['pluton', 'plutón', 'enano', 'por que no es planeta'],
      response: '✨ **Plutón** fue reclasificado como *planeta enano* en 2006 por la Unión Astronómica Internacional (UAI). Para ser un planeta pleno debe cumplir 3 condiciones: 1) orbitar al Sol, 2) tener suficiente masa para ser esférico, y 3) haber limpiado la vecindad de su órbita. Plutón comparte su órbita con miles de objetos del Cinturón de Kuiper.'
    },
    {
      tokens: ['diamante', 'diamantes', 'lluvia'],
      response: '💎 ¡En **Neptuno** y **Urano** se cree que literalmente llueven diamantes! La brutal presión y temperatura en su manto descomponen el metano gaseoso (CH₄), obligando a los átomos de carbono a cristalizar en diamantes sólidos que se precipitan hacia el núcleo.'
    },
    {
      tokens: ['marte', 'viaje', 'cuanto tarda', 'ir a marte', 'tiempo'],
      response: '🔴 Un viaje tripulado a **Marte** toma entre **6 y 9 meses** de ida con la tecnología de propulsión química actual. Las naves espaciales deben aprovechar la "ventana de lanzamiento" de mínima energía (Transferencia de Hohmann), que se abre únicamente cada 26 meses cuando la Tierra y Marte están alineados.'
    },
    {
      tokens: ['anillo', 'anillos', 'saturno'],
      response: '🪐 Los anillos de **Saturno** están compuestos por miles de millones de fragmentos de hielo de agua, rocas y polvo cósmico (desde granos de arena hasta bloques del tamaño de edificios). Se extienden hasta 282.000 km desde el planeta, ¡pero su espesor promedio es de apenas 10 a 30 metros!'
    },
    {
      tokens: ['luna', 'lunas', 'mas lunas'],
      response: '🌕 El récord del planeta con más lunas confirmadas lo ostenta **Saturno** con **146 lunas**, seguido por **Júpiter** con **95 lunas**. En cambio, Mercurio y Venus tienen 0 lunas, la Tierra tiene 1 y Marte tiene 2 (Fobos y Deimos).'
    },
    {
      tokens: ['sol', 'estrella', 'peso del sol', 'masa'],
      response: '☀️ El **Sol** es una estrella de tipo espectral G2V (enana amarilla). Contiene el **99.86%** de toda la masa del sistema solar entero y dentro de él cabrían aproximadamente 1.3 millones de planetas Tierra.'
    },
    {
      tokens: ['vida', 'extraterrestre', 'habitable', 'agua'],
      response: '🌊 Además de la Tierra, los lugares con mayor potencial astrobiológico no son planetas, sino lunas con océanos subterráneos cálidos bajo cortezas de hielo: **Europa** (en Júpiter) y **Encélado** (en Saturno), que expulsan géiseres con compuestos orgánicos.'
    }
  ]
};

// ============================================================================
// 4. GESTOR DE AUDIO SINTETIZADO (Web Audio API)
// ============================================================================
class CosmicAudio {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.ambientOsc = null;
    this.ambientGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.init();
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.startAmbient();
      this.playBeep(440, 'triangle', 0.15, 0.1);
    } else {
      this.stopAmbient();
    }
    return !this.isMuted;
  }

  playBeep(freq = 440, type = 'sine', duration = 0.2, volume = 0.1) {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  playCosmicTone(freq = 136.1) {
    this.init();
    if (!this.ctx) return;
    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 1.5, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + 2.6);
      osc2.stop(this.ctx.currentTime + 2.6);
    } catch (e) {
      console.warn('Cosmic tone error:', e);
    }
  }

  startAmbient() {
    if (!this.ctx || this.ambientOsc) return;
    try {
      this.ambientOsc = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();
      this.ambientOsc.type = 'sine';
      this.ambientOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // La grave cósmico
      this.ambientGain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      this.ambientOsc.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);
      this.ambientOsc.start();
    } catch (e) {
      console.warn('Ambient audio error:', e);
    }
  }

  stopAmbient() {
    if (this.ambientOsc) {
      try {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          if (this.ambientOsc) {
            this.ambientOsc.stop();
            this.ambientOsc.disconnect();
            this.ambientOsc = null;
          }
        }, 600);
      } catch (e) {
        this.ambientOsc = null;
      }
    }
  }
}

const cosmicAudio = new CosmicAudio();

// ============================================================================
// 5. FONDO DE ESTRELLAS TITILANTES Y METEOROS (CANVAS)
// ============================================================================
function initStarfield() {
  const canvas = document.getElementById('starfield-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const stars = [];
  const numStars = Math.min(180, Math.floor((width * height) / 8000));
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1
    });
  }

  const meteors = [];
  function createMeteor() {
    if (Math.random() < 0.015 && meteors.length < 2) {
      meteors.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * (height * 0.4),
        length: Math.random() * 80 + 40,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
        opacity: 1
      });
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Dibujar estrellas
    for (const s of stars) {
      s.alpha += s.speed * s.direction;
      if (s.alpha > 0.95 || s.alpha < 0.15) {
        s.direction *= -1;
      }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, s.alpha))})`;
      ctx.fill();
    }

    // Dibujar meteoros (estrellas fugaces)
    createMeteor();
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      const endX = m.x + Math.cos(m.angle) * m.length;
      const endY = m.y + Math.sin(m.angle) * m.length;

      const grad = ctx.createLinearGradient(m.x, m.y, endX, endY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`);
      grad.addColorStop(1, 'rgba(99, 102, 241, 0)');

      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      m.x += Math.cos(m.angle) * m.speed;
      m.y += Math.sin(m.angle) * m.speed;
      m.opacity -= 0.025;

      if (m.opacity <= 0 || m.x > width || m.y > height) {
        meteors.splice(i, 1);
      }
    }

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

// ============================================================================
// 6. GESTIÓN DEL GRID DE PLANETAS (BÚSQUEDA, FILTRO Y ORDEN)
// ============================================================================
function initPlanetsGrid() {
  const gridContainer = document.querySelector('.planets-grid');
  const searchInput = document.getElementById('planet-search');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const sortSelect = document.getElementById('planet-sort');
  const countIndicator = document.getElementById('planets-count');

  if (!gridContainer) return;

  let currentCategory = 'all';
  let currentSearch = '';
  let currentSort = 'distance-asc';

  function renderCards() {
    let filtered = PLANETS_DATA.filter((p) => {
      const matchesCategory =
        currentCategory === 'all' || p.category === currentCategory;
      const searchLower = currentSearch.toLowerCase().trim();
      const matchesSearch =
        !searchLower ||
        p.name.toLowerCase().includes(searchLower) ||
        p.categoryLabel.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });

    // Ordenamiento
    filtered.sort((a, b) => {
      switch (currentSort) {
        case 'distance-asc':
          return a.specs.distance - b.specs.distance;
        case 'distance-desc':
          return b.specs.distance - a.specs.distance;
        case 'size-desc':
          return b.specs.radiusKm - a.specs.radiusKm;
        case 'size-asc':
          return a.specs.radiusKm - b.specs.radiusKm;
        case 'moons-desc':
          return b.specs.moons - a.specs.moons;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    if (countIndicator) {
      countIndicator.textContent = `Mostrando ${filtered.length} de ${PLANETS_DATA.length} planetas`;
    }

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="no-results">
          <span style="font-size: 3rem;">🔭</span>
          <h3>No se encontraron mundos</h3>
          <p>Intenta con otro término de búsqueda o selecciona la categoría "Todos".</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = filtered
      .map(
        (p) => `
      <article class="planet-card" data-planet-id="${p.id}" tabindex="0" role="button" aria-label="Ver detalles de ${p.name}">
        <div class="card-visual">
          <div class="planet-sphere ${p.id}">
            ${p.hasRing ? '<div class="ring"></div>' : ''}
          </div>
          <button class="quick-view-btn" aria-label="Abrir ficha de ${p.name}">
            <span>🔍 Explorar</span>
          </button>
        </div>
        <div class="card-body">
          <div class="card-header-line">
            <span class="planet-tag">${p.categoryLabel}</span>
            <span class="planet-badge-moons">🌙 ${p.specs.moons} ${p.specs.moons === 1 ? 'luna' : 'lunas'}</span>
          </div>
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <ul class="planet-specs">
            <li><span>Distancia al Sol:</span> <strong>${p.specs.distanceFormatted}</strong></li>
            <li><span>Período orbital:</span> <strong>${p.specs.orbitalPeriodFormatted}</strong></li>
            <li><span>Gravedad:</span> <strong>${p.specs.gravity} m/s²</strong></li>
          </ul>
        </div>
      </article>
    `
      )
      .join('');

    // Event listeners para abrir modal
    gridContainer.querySelectorAll('.planet-card').forEach((card) => {
      const openModalHandler = () => {
        const id = card.getAttribute('data-planet-id');
        openPlanetModal(id);
      };
      card.addEventListener('click', openModalHandler);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModalHandler();
        }
      });
    });
  }

  // Escuchar inputs
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderCards();
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      cosmicAudio.playBeep(520, 'sine', 0.1, 0.05);
      renderCards();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderCards();
    });
  }

  renderCards();
}

// ============================================================================
// 7. MODAL DE DETALLES DE PLANETA (<dialog>)
// ============================================================================
function initPlanetModal() {
  const dialog = document.getElementById('planet-detail-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!dialog || !closeBtn) return;

  closeBtn.addEventListener('click', () => {
    dialog.close();
  });

  // Cerrar al hacer clic en el backdrop
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      dialog.close();
    }
  });
}

function openPlanetModal(planetId) {
  const dialog = document.getElementById('planet-detail-modal');
  const planet = PLANETS_DATA.find((p) => p.id === planetId);
  if (!dialog || !planet) return;

  cosmicAudio.playBeep(640, 'triangle', 0.15, 0.08);

  const sphereContainer = dialog.querySelector('.modal-planet-visual');
  const titleElem = dialog.querySelector('#modal-planet-title');
  const tagElem = dialog.querySelector('#modal-planet-tag');
  const descElem = dialog.querySelector('#modal-planet-desc');
  const specsContainer = dialog.querySelector('#modal-planet-specs-grid');
  const factElem = dialog.querySelector('#modal-planet-fact');
  const missionsList = dialog.querySelector('#modal-planet-missions');
  const soundBtn = dialog.querySelector('#modal-sound-btn');

  if (sphereContainer) {
    sphereContainer.innerHTML = `
      <div class="planet-sphere ${planet.id} sphere-large">
        ${planet.hasRing ? '<div class="ring ring-large"></div>' : ''}
      </div>
    `;
  }

  if (titleElem) titleElem.textContent = planet.name;
  if (tagElem) tagElem.textContent = planet.categoryLabel;
  if (descElem) descElem.textContent = planet.description;

  if (specsContainer) {
    specsContainer.innerHTML = `
      <div class="modal-spec-card">
        <span class="label">Distancia al Sol</span>
        <span class="val">${planet.specs.distanceFormatted}</span>
      </div>
      <div class="modal-spec-card">
        <span class="label">Diámetro</span>
        <span class="val">${planet.specs.diameterKm.toLocaleString()} km</span>
      </div>
      <div class="modal-spec-card">
        <span class="label">Gravedad</span>
        <span class="val">${planet.specs.gravity} m/s² (${planet.specs.gravityRelative}g)</span>
      </div>
      <div class="modal-spec-card">
        <span class="label">Duración del Día</span>
        <span class="val">${planet.specs.rotationPeriod}</span>
      </div>
      <div class="modal-spec-card">
        <span class="label">Período Orbital (Año)</span>
        <span class="val">${planet.specs.orbitalPeriodFormatted}</span>
      </div>
      <div class="modal-spec-card">
        <span class="label">Lunas</span>
        <span class="val">${planet.specs.moons} confirmadas</span>
      </div>
      <div class="modal-spec-card full-width">
        <span class="label">Temperatura Superficial</span>
        <span class="val">${planet.specs.temperatureRange}</span>
      </div>
      <div class="modal-spec-card full-width">
        <span class="label">Composición Atmosférica</span>
        <span class="val">${planet.specs.atmosphere}</span>
      </div>
    `;
  }

  if (factElem) factElem.textContent = planet.funFact;

  if (missionsList) {
    missionsList.innerHTML = planet.missions
      .map((m) => `<li><span class="bullet">🚀</span> ${m}</li>`)
      .join('');
  }

  if (soundBtn) {
    soundBtn.onclick = () => {
      cosmicAudio.playCosmicTone(planet.audioFreq);
      soundBtn.classList.add('pulse-anim');
      setTimeout(() => soundBtn.classList.remove('pulse-anim'), 1000);
    };
  }

  dialog.showModal();
}

// ============================================================================
// 8. SIMULADOR ORBITAL 2D EN TIEMPO REAL (CANVAS INTERACTIVO)
// ============================================================================
function initOrbitalSimulator() {
  const canvas = document.getElementById('orbital-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = canvas.parentElement.clientWidth || 900);
  let height = (canvas.height = 560);

  window.addEventListener('resize', () => {
    if (canvas.parentElement) {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = Math.max(480, Math.min(620, width * 0.6));
    }
  });

  let isPlaying = true;
  let speedMultiplier = 1;
  let zoom = 1;
  let focusedPlanetId = 'all';

  // Configuración de los cuerpos celestes en el simulador
  // Radios de órbita y velocidades ajustados para visualización clara y armónica
  const simulatorPlanets = [
    { id: 'mercurio', name: 'Mercurio', color: '#a8a29e', orbitRadius: 45, radius: 4, speed: 0.04, angle: 0 },
    { id: 'venus', name: 'Venus', color: '#fde047', orbitRadius: 70, radius: 6, speed: 0.025, angle: 1.2 },
    { id: 'tierra', name: 'Tierra', color: '#38bdf8', orbitRadius: 105, radius: 6.5, speed: 0.018, angle: 2.5, hasMoon: true },
    { id: 'marte', name: 'Marte', color: '#ef4444', orbitRadius: 140, radius: 5, speed: 0.012, angle: 4.1 },
    { id: 'jupiter', name: 'Júpiter', color: '#f59e0b', orbitRadius: 190, radius: 12, speed: 0.007, angle: 0.8 },
    { id: 'saturno', name: 'Saturno', color: '#eab308', orbitRadius: 245, radius: 10, speed: 0.005, angle: 3.3, hasRing: true },
    { id: 'urano', name: 'Urano', color: '#06b6d4', orbitRadius: 300, radius: 8, speed: 0.003, angle: 5.2 },
    { id: 'neptuno', name: 'Neptuno', color: '#3b82f6', orbitRadius: 350, radius: 7.5, speed: 0.002, angle: 1.9 }
  ];

  // Controles
  const playPauseBtn = document.getElementById('sim-play-pause');
  const speedSlider = document.getElementById('sim-speed');
  const speedLabel = document.getElementById('sim-speed-val');
  const focusSelect = document.getElementById('sim-focus');
  const resetBtn = document.getElementById('sim-reset');

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      playPauseBtn.innerHTML = isPlaying ? '⏸ Pausar' : '▶ Reanudar';
      cosmicAudio.playBeep(480, 'sine', 0.1, 0.05);
    });
  }

  if (speedSlider) {
    speedSlider.addEventListener('input', (e) => {
      speedMultiplier = parseFloat(e.target.value);
      if (speedLabel) speedLabel.textContent = `${speedMultiplier}x`;
    });
  }

  if (focusSelect) {
    focusSelect.addEventListener('change', (e) => {
      focusedPlanetId = e.target.value;
      cosmicAudio.playBeep(560, 'sine', 0.1, 0.05);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      simulatorPlanets.forEach((p, idx) => {
        p.angle = idx * 0.8;
      });
      speedMultiplier = 1;
      if (speedSlider) speedSlider.value = 1;
      if (speedLabel) speedLabel.textContent = '1x';
      focusedPlanetId = 'all';
      if (focusSelect) focusSelect.value = 'all';
      cosmicAudio.playBeep(440, 'triangle', 0.1, 0.05);
    });
  }

  function renderSim() {
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    // Escala dinámica si el canvas es pequeño
    const scaleFactor = Math.min(width, height) / 780;

    ctx.save();
    ctx.translate(centerX, centerY);

    // Dibujar Sol central resplandeciente
    const sunGlow = ctx.createRadialGradient(0, 0, 8, 0, 0, 36 * scaleFactor);
    sunGlow.addColorStop(0, '#fffbeb');
    sunGlow.addColorStop(0.3, '#f59e0b');
    sunGlow.addColorStop(0.7, 'rgba(234, 88, 12, 0.4)');
    sunGlow.addColorStop(1, 'rgba(234, 88, 12, 0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(0, 0, 36 * scaleFactor, 0, Math.PI * 2);
    ctx.fill();

    // Núcleo del Sol
    ctx.beginPath();
    ctx.arc(0, 0, 15 * scaleFactor, 0, Math.PI * 2);
    ctx.fillStyle = '#fef08a';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Dibujar órbitas y planetas
    simulatorPlanets.forEach((p) => {
      const scaledOrbit = p.orbitRadius * scaleFactor;
      const isFocused = focusedPlanetId === p.id;
      const isDimmed = focusedPlanetId !== 'all' && !isFocused;

      // Trayectoria orbital
      ctx.beginPath();
      ctx.arc(0, 0, scaledOrbit, 0, Math.PI * 2);
      ctx.strokeStyle = isFocused
        ? 'rgba(99, 102, 241, 0.8)'
        : isDimmed
        ? 'rgba(255, 255, 255, 0.03)'
        : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = isFocused ? 2 : 1;
      ctx.stroke();

      // Calcular posición del planeta
      if (isPlaying) {
        p.angle += p.speed * speedMultiplier * 0.5;
      }
      const px = Math.cos(p.angle) * scaledOrbit;
      const py = Math.sin(p.angle) * scaledOrbit;

      const pRadius = Math.max(3, p.radius * scaleFactor);

      // Si tiene anillo (Saturno)
      if (p.hasRing) {
        ctx.beginPath();
        ctx.ellipse(px, py, pRadius * 2.2, pRadius * 0.7, -0.4, 0, Math.PI * 2);
        ctx.strokeStyle = isDimmed ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.7)';
        ctx.lineWidth = 2.5 * scaleFactor;
        ctx.stroke();
      }

      // Dibujar planeta
      ctx.beginPath();
      ctx.arc(px, py, pRadius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      if (isFocused) {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 15;
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      // Luna de la Tierra en el simulador
      if (p.hasMoon && !isDimmed) {
        const moonDist = 12 * scaleFactor;
        const moonAngle = p.angle * 6;
        const mx = px + Math.cos(moonAngle) * moonDist;
        const my = py + Math.sin(moonAngle) * moonDist;
        ctx.beginPath();
        ctx.arc(mx, my, 1.8 * scaleFactor, 0, Math.PI * 2);
        ctx.fillStyle = '#e2e8f0';
        ctx.fill();
      }

      // Etiqueta de texto
      if (!isDimmed || isFocused) {
        ctx.font = `${Math.max(10, Math.floor(11 * scaleFactor))}px 'Plus Jakarta Sans', sans-serif`;
        ctx.fillStyle = isFocused ? '#818cf8' : 'rgba(203, 213, 225, 0.75)';
        ctx.fillText(p.name, px + pRadius + 4, py + 3);
      }
    });

    ctx.restore();
    requestAnimationFrame(renderSim);
  }

  requestAnimationFrame(renderSim);
}

// ============================================================================
// 9. CALCULADORA CÓSMICA DE PESO Y EDAD
// ============================================================================
function initSpaceCalculator() {
  const form = document.getElementById('calc-form');
  const weightInput = document.getElementById('calc-weight');
  const ageInput = document.getElementById('calc-age');
  const resultsContainer = document.getElementById('calc-results');

  if (!weightInput || !ageInput || !resultsContainer) return;

  function calculateAndDisplay() {
    const userWeight = parseFloat(weightInput.value) || 70;
    const userAge = parseFloat(ageInput.value) || 25;

    resultsContainer.innerHTML = PLANETS_DATA.map((planet) => {
      const planetWeight = (userWeight * planet.specs.gravityRelative).toFixed(1);
      const planetAge = (userAge / planet.specs.orbitalPeriodYears).toFixed(1);
      const diffPercent = Math.round((planet.specs.gravityRelative - 1) * 100);
      const diffSign = diffPercent > 0 ? `+${diffPercent}%` : `${diffPercent}%`;

      return `
        <div class="calc-card">
          <div class="calc-card-header">
            <div class="planet-sphere ${planet.id} sphere-mini"></div>
            <h4>${planet.name}</h4>
          </div>
          <div class="calc-data-row">
            <div>
              <span class="calc-label">Tu Peso:</span>
              <strong class="calc-val">${planetWeight} kg</strong>
            </div>
            <span class="calc-badge ${diffPercent > 0 ? 'badge-heavy' : 'badge-light'}">
              ${diffPercent === 0 ? 'Referencia' : diffSign}
            </span>
          </div>
          <div class="calc-data-row">
            <div>
              <span class="calc-label">Tu Edad:</span>
              <strong class="calc-val">${planetAge} años</strong>
            </div>
            <span class="calc-sublabel">1 año = ${planet.specs.orbitalPeriodFormatted}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  weightInput.addEventListener('input', calculateAndDisplay);
  ageInput.addEventListener('input', calculateAndDisplay);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      calculateAndDisplay();
      cosmicAudio.playBeep(600, 'sine', 0.1, 0.06);
    });
  }

  calculateAndDisplay();
}

// ============================================================================
// 10. COMPARADOR CARA A CARA DE PLANETAS
// ============================================================================
function initPlanetComparator() {
  const selectA = document.getElementById('compare-planet-a');
  const selectB = document.getElementById('compare-planet-b');
  const viewA = document.getElementById('compare-view-a');
  const viewB = document.getElementById('compare-view-b');
  const specsTableBody = document.getElementById('compare-table-body');

  if (!selectA || !selectB || !viewA || !viewB || !specsTableBody) return;

  // Poblar opciones
  PLANETS_DATA.forEach((p) => {
    selectA.innerHTML += `<option value="${p.id}" ${p.id === 'tierra' ? 'selected' : ''}>${p.name}</option>`;
    selectB.innerHTML += `<option value="${p.id}" ${p.id === 'marte' ? 'selected' : ''}>${p.name}</option>`;
  });

  function updateComparison() {
    const planetA = PLANETS_DATA.find((p) => p.id === selectA.value) || PLANETS_DATA[2];
    const planetB = PLANETS_DATA.find((p) => p.id === selectB.value) || PLANETS_DATA[3];

    // Vistas visuales a escala relativa aproximada
    const maxRadius = Math.max(planetA.specs.radiusKm, planetB.specs.radiusKm);
    const sizeScaleA = Math.max(35, Math.min(130, (planetA.specs.radiusKm / maxRadius) * 120));
    const sizeScaleB = Math.max(35, Math.min(130, (planetB.specs.radiusKm / maxRadius) * 120));

    viewA.innerHTML = `
      <div class="planet-sphere ${planetA.id}" style="width: ${sizeScaleA}px; height: ${sizeScaleA}px;">
        ${planetA.hasRing ? '<div class="ring"></div>' : ''}
      </div>
      <h3>${planetA.name}</h3>
      <span class="planet-tag">${planetA.categoryLabel}</span>
    `;

    viewB.innerHTML = `
      <div class="planet-sphere ${planetB.id}" style="width: ${sizeScaleB}px; height: ${sizeScaleB}px;">
        ${planetB.hasRing ? '<div class="ring"></div>' : ''}
      </div>
      <h3>${planetB.name}</h3>
      <span class="planet-tag">${planetB.categoryLabel}</span>
    `;

    // Métricas para comparar
    const metrics = [
      {
        label: 'Diámetro Ecuatorial',
        valA: `${planetA.specs.diameterKm.toLocaleString()} km`,
        valB: `${planetB.specs.diameterKm.toLocaleString()} km`,
        winner: planetA.specs.diameterKm > planetB.specs.diameterKm ? 'A' : 'B'
      },
      {
        label: 'Distancia al Sol',
        valA: planetA.specs.distanceFormatted,
        valB: planetB.specs.distanceFormatted,
        winner: planetA.specs.distance < planetB.specs.distance ? 'A' : 'B' // Más cercano
      },
      {
        label: 'Gravedad Superficial',
        valA: `${planetA.specs.gravity} m/s²`,
        valB: `${planetB.specs.gravity} m/s²`,
        winner: planetA.specs.gravity > planetB.specs.gravity ? 'A' : 'B'
      },
      {
        label: 'Duración del Año',
        valA: planetA.specs.orbitalPeriodFormatted,
        valB: planetB.specs.orbitalPeriodFormatted,
        winner: null
      },
      {
        label: 'Duración del Día',
        valA: planetA.specs.rotationPeriod,
        valB: planetB.specs.rotationPeriod,
        winner: null
      },
      {
        label: 'Número de Lunas',
        valA: `${planetA.specs.moons}`,
        valB: `${planetB.specs.moons}`,
        winner: planetA.specs.moons > planetB.specs.moons ? 'A' : planetA.specs.moons < planetB.specs.moons ? 'B' : null
      },
      {
        label: 'Temperatura Superficial',
        valA: planetA.specs.temperatureRange,
        valB: planetB.specs.temperatureRange,
        winner: null
      }
    ];

    specsTableBody.innerHTML = metrics
      .map(
        (m) => `
      <tr>
        <td class="${m.winner === 'A' ? 'highlight-win' : ''}">${m.valA}</td>
        <td class="metric-label">${m.label}</td>
        <td class="${m.winner === 'B' ? 'highlight-win' : ''}">${m.valB}</td>
      </tr>
    `
      )
      .join('');
  }

  selectA.addEventListener('change', () => {
    cosmicAudio.playBeep(490, 'sine', 0.1, 0.05);
    updateComparison();
  });

  selectB.addEventListener('change', () => {
    cosmicAudio.playBeep(540, 'sine', 0.1, 0.05);
    updateComparison();
  });

  updateComparison();
}

// ============================================================================
// 11. QUIZ / TRIVIA ASTRONÓMICA
// ============================================================================
function initTriviaQuiz() {
  const quizBox = document.getElementById('quiz-box');
  const questionText = document.getElementById('quiz-question');
  const optionsContainer = document.getElementById('quiz-options');
  const feedbackBox = document.getElementById('quiz-feedback');
  const nextBtn = document.getElementById('quiz-next-btn');
  const scoreElem = document.getElementById('quiz-score');
  const restartBtn = document.getElementById('quiz-restart-btn');
  const progressElem = document.getElementById('quiz-progress');

  if (!quizBox || !questionText || !optionsContainer) return;

  let currentIdx = 0;
  let score = 0;
  let hasAnswered = false;

  function loadQuestion() {
    hasAnswered = false;
    if (feedbackBox) {
      feedbackBox.classList.add('hidden');
      feedbackBox.innerHTML = '';
    }
    if (nextBtn) nextBtn.classList.add('hidden');

    if (currentIdx >= TRIVIA_QUESTIONS.length) {
      showSummary();
      return;
    }

    const q = TRIVIA_QUESTIONS[currentIdx];
    questionText.textContent = `${currentIdx + 1}. ${q.question}`;
    if (progressElem) {
      progressElem.textContent = `Pregunta ${currentIdx + 1} de ${TRIVIA_QUESTIONS.length}`;
    }

    optionsContainer.innerHTML = q.options
      .map(
        (opt, idx) => `
      <button class="quiz-option-btn" data-opt-idx="${idx}">
        <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
        <span class="opt-text">${opt}</span>
      </button>
    `
      )
      .join('');

    optionsContainer.querySelectorAll('.quiz-option-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (hasAnswered) return;
        const selectedIdx = parseInt(btn.getAttribute('data-opt-idx'), 10);
        handleAnswer(selectedIdx);
      });
    });
  }

  function handleAnswer(selectedIdx) {
    hasAnswered = true;
    const q = TRIVIA_QUESTIONS[currentIdx];
    const isCorrect = selectedIdx === q.correct;

    const buttons = optionsContainer.querySelectorAll('.quiz-option-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx) {
        btn.classList.add('wrong');
      }
    });

    if (isCorrect) {
      score += 10;
      if (scoreElem) scoreElem.textContent = score;
      cosmicAudio.playBeep(784, 'triangle', 0.25, 0.1); // Sol agudo
    } else {
      cosmicAudio.playBeep(220, 'sawtooth', 0.25, 0.08); // Tono grave
    }

    if (feedbackBox) {
      feedbackBox.classList.remove('hidden');
      feedbackBox.innerHTML = `
        <div class="feedback-badge ${isCorrect ? 'fb-correct' : 'fb-wrong'}">
          ${isCorrect ? '¡Correcto! 🌟' : '¡Incorrecto! ☄️'}
        </div>
        <p>${q.explanation}</p>
      `;
    }

    if (nextBtn) {
      nextBtn.classList.remove('hidden');
      nextBtn.textContent =
        currentIdx === TRIVIA_QUESTIONS.length - 1
          ? 'Ver Resultados Finales'
          : 'Siguiente Pregunta →';
    }
  }

  function showSummary() {
    questionText.textContent = '¡Misión Cumplida! 🚀';
    if (progressElem) progressElem.textContent = 'Completado';

    let rank = 'Astrónomo Aficionado 🔭';
    if (score >= 70) rank = 'Comandante Supremo del Cosmos 🛸';
    else if (score >= 40) rank = 'Explorador Interplanetario 🪐';

    // Guardar mejor puntuación en localStorage
    const savedRecord = localStorage.getItem('cosmo_quiz_record') || 0;
    if (score > savedRecord) {
      localStorage.setItem('cosmo_quiz_record', score);
    }

    optionsContainer.innerHTML = `
      <div class="quiz-summary-card">
        <h3>Puntuación Final: <span class="highlight-score">${score} pts</span></h3>
        <p class="quiz-rank">Rango obtenido: <strong>${rank}</strong></p>
        <p class="quiz-stats">Acertaste ${score / 10} de ${TRIVIA_QUESTIONS.length} preguntas.</p>
        <p class="quiz-record">Récord histórico personal: <strong>${Math.max(score, savedRecord)} pts</strong></p>
      </div>
    `;

    if (feedbackBox) feedbackBox.classList.add('hidden');
    if (nextBtn) nextBtn.classList.add('hidden');
    if (restartBtn) restartBtn.classList.remove('hidden');
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIdx++;
      loadQuestion();
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      currentIdx = 0;
      score = 0;
      if (scoreElem) scoreElem.textContent = '0';
      restartBtn.classList.add('hidden');
      loadQuestion();
    });
  }

  loadQuestion();
}

// ============================================================================
// 12. COSMOBOT: ASISTENTE IA CON SOPORTE DUAL (OLLAMA LOCAL + MOTOR INTEGRADO)
// ============================================================================
class CosmoBot {
  constructor() {
    this.ollamaUrl = localStorage.getItem('ollama_url') || 'http://localhost:11434';
    this.ollamaModel = localStorage.getItem('ollama_model') || 'llama3';
    this.isOllamaOnline = false;
    this.history = [];
    this.isOpen = false;
    this.initElements();
  }

  initElements() {
    this.toggleBtn = document.getElementById('cosmobot-toggle-btn');
    this.chatWidget = document.getElementById('cosmobot-window');
    this.closeBtn = document.getElementById('cosmobot-close-btn');
    this.messagesContainer = document.getElementById('cosmobot-messages');
    this.form = document.getElementById('cosmobot-form');
    this.input = document.getElementById('cosmobot-input');
    this.statusBadge = document.getElementById('cosmobot-status-badge');
    this.settingsBtn = document.getElementById('cosmobot-settings-btn');
    this.settingsDialog = document.getElementById('cosmobot-settings-dialog');
    this.saveSettingsBtn = document.getElementById('cosmobot-save-settings');
    this.ollamaUrlInput = document.getElementById('setting-ollama-url');
    this.ollamaModelInput = document.getElementById('setting-ollama-model');

    if (this.ollamaUrlInput) this.ollamaUrlInput.value = this.ollamaUrl;
    if (this.ollamaModelInput) this.ollamaModelInput.value = this.ollamaModel;

    this.bindEvents();
    this.checkOllamaStatus();
  }

  bindEvents() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggleWindow());
    }
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.toggleWindow(false));
    }
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleUserSubmit();
      });
    }

    if (this.settingsBtn && this.settingsDialog) {
      this.settingsBtn.addEventListener('click', () => {
        this.settingsDialog.showModal();
      });
    }

    if (this.saveSettingsBtn && this.settingsDialog) {
      this.saveSettingsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.ollamaUrlInput) {
          this.ollamaUrl = this.ollamaUrlInput.value.trim() || 'http://localhost:11434';
          localStorage.setItem('ollama_url', this.ollamaUrl);
        }
        if (this.ollamaModelInput) {
          this.ollamaModel = this.ollamaModelInput.value.trim() || 'llama3';
          localStorage.setItem('ollama_model', this.ollamaModel);
        }
        this.settingsDialog.close();
        this.checkOllamaStatus();
      });
    }

    // Chips de preguntas sugeridas
    document.querySelectorAll('.cosmobot-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const question = chip.getAttribute('data-question') || chip.textContent;
        if (this.input) {
          this.input.value = question;
          this.handleUserSubmit();
        }
      });
    });
  }

  toggleWindow(forceState) {
    this.isOpen = typeof forceState === 'boolean' ? forceState : !this.isOpen;
    if (this.chatWidget) {
      this.chatWidget.classList.toggle('active', this.isOpen);
    }
    if (this.toggleBtn) {
      this.toggleBtn.classList.toggle('open', this.isOpen);
    }
    if (this.isOpen) {
      cosmicAudio.playBeep(520, 'sine', 0.1, 0.05);
      if (this.input) this.input.focus();
    }
  }

  async checkOllamaStatus() {
    if (!this.statusBadge) return;
    this.statusBadge.innerHTML = '<span class="status-dot checking"></span> Verificando Ollama...';
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${this.ollamaUrl}/api/tags`, {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        this.isOllamaOnline = true;
        this.statusBadge.innerHTML = `<span class="status-dot online"></span> Ollama Conectado (${this.ollamaModel})`;
        this.statusBadge.title = `Conectado exitosamente a ${this.ollamaUrl} con modelo ${this.ollamaModel}`;
        return;
      }
    } catch (err) {
      // No reachable
    }

    this.isOllamaOnline = false;
    this.statusBadge.innerHTML = '<span class="status-dot offline"></span> Modo Experto Local (Offline)';
    this.statusBadge.title = `Ollama no detectado en ${this.ollamaUrl}. Usando base astronómica local integrada.`;
  }

  appendMessage(text, sender = 'bot', isStreaming = false) {
    if (!this.messagesContainer) return null;
    const msgDiv = document.createElement('div');
    msgDiv.className = `cosmobot-msg msg-${sender}`;
    msgDiv.innerHTML = `
      <div class="msg-avatar">${sender === 'bot' ? '🤖' : '👨‍🚀'}</div>
      <div class="msg-bubble">${this.formatMarkdown(text)}</div>
    `;
    this.messagesContainer.appendChild(msgDiv);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    return msgDiv.querySelector('.msg-bubble');
  }

  formatMarkdown(text) {
    // Formato básico para markdown (negrita, código, saltos de línea)
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }

  async handleUserSubmit() {
    const text = this.input.value.trim();
    if (!text) return;
    this.input.value = '';

    this.appendMessage(text, 'user');
    cosmicAudio.playBeep(480, 'sine', 0.1, 0.04);

    // Mensaje "pensando..."
    const typingBubble = this.appendMessage('Consultando las estrellas...', 'bot');

    if (this.isOllamaOnline) {
      try {
        await this.queryOllama(text, typingBubble);
        return;
      } catch (e) {
        console.warn('Ollama query falló, recurriendo al motor local integrado:', e);
      }
    }

    // Fallback: Motor de Conocimiento Inteligente Integrado
    setTimeout(() => {
      const reply = this.queryLocalKnowledge(text);
      if (typingBubble) {
        typingBubble.innerHTML = this.formatMarkdown(reply);
      }
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
      cosmicAudio.playBeep(640, 'triangle', 0.15, 0.05);
    }, 400);
  }

  async queryOllama(prompt, targetBubble) {
    const systemPrompt =
      'Eres CosmoBot, un experto guía y divulgador astronómico del Sistema Solar. Responde en español de forma entusiasta, didáctica y precisa.';
    const res = await fetch(`${this.ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.ollamaModel,
        prompt: `${systemPrompt}\n\nPregunta del usuario: ${prompt}`,
        stream: false
      })
    });

    if (!res.ok) {
      throw new Error(`Ollama HTTP ${res.status}`);
    }

    const data = await res.json();
    if (targetBubble) {
      targetBubble.innerHTML = this.formatMarkdown(data.response || 'Sin respuesta.');
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  }

  queryLocalKnowledge(text) {
    const clean = text.toLowerCase();

    // Buscar coincidencia en planetas
    for (const p of PLANETS_DATA) {
      if (clean.includes(p.id) || clean.includes(p.name.toLowerCase())) {
        return `🪐 **${p.name}**:\n${p.description}\n\n📊 **Datos clave**:\n- **Distancia al Sol:** ${p.specs.distanceFormatted}\n- **Período orbital:** ${p.specs.orbitalPeriodFormatted}\n- **Gravedad:** ${p.specs.gravity} m/s²\n- **Lunas:** ${p.specs.moons}\n\n💡 **Dato curioso:** ${p.funFact}`;
      }
    }

    // Buscar en tópicos especializados
    for (const item of COSMOBOT_KNOWLEDGE.keywords) {
      for (const token of item.tokens) {
        if (clean.includes(token)) {
          return item.response;
        }
      }
    }

    // Saludo
    if (clean.includes('hola') || clean.includes('buenos dias') || clean.includes('buenas')) {
      return COSMOBOT_KNOWLEDGE.greetings[
        Math.floor(Math.random() * COSMOBOT_KNOWLEDGE.greetings.length)
      ];
    }

    // Ayuda genérica
    return `🔭 ¡Gran pregunta sobre el cosmos! Puedo darte información detallada sobre cualquiera de los 8 planetas (**Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano, Neptuno**), o curiosidades sobre la lluvia de diamantes, por qué Plutón no es planeta, o cómo viajar a Marte. Prueba preguntarme: *"¿Por qué llueven diamantes en Neptuno?"* o *"¿Cuál es el planeta con más lunas?"*.`;
  }
}

// ============================================================================
// 13. BOTONES AUXILIARES (AUDIO, SCROLL TO TOP, NAVEGACIÓN SUAVE)
// ============================================================================
function initUtilityControls() {
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      const active = cosmicAudio.toggleSound();
      soundToggleBtn.classList.toggle('active', active);
      soundToggleBtn.innerHTML = active
        ? '<span>🔊</span> <span class="btn-text">Sonido Activado</span>'
        : '<span>🔇</span> <span class="btn-text">Sonido Silenciado</span>';
    });
  }

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ============================================================================
// INICIALIZACIÓN GLOBAL
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initPlanetsGrid();
  initPlanetModal();
  initOrbitalSimulator();
  initSpaceCalculator();
  initPlanetComparator();
  initTriviaQuiz();
  new CosmoBot();
  initUtilityControls();
});

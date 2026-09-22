import type { Project } from '@shared/models/project';

const CONTEXT = $localize`:@@projects.section.context:Contexto`;
const DECISIONS = $localize`:@@projects.section.decisions:Decisiones`;
const ARCHITECTURE = $localize`:@@projects.section.architecture:Arquitectura`;
const HINDSIGHT = $localize`:@@projects.section.hindsight:Qué haría distinto`;

export const PROJECTS: readonly Project[] = [
  {
    slug: 'pokemon-web',
    name: 'Pokemon Team Builder',
    demo: 'https://pokemon-team-builder.com',
    repo: 'https://github.com/ManusolJ/pokemon-frontend',
    summary: $localize`:@@projects.pokemon-web.summary:Aplicación Angular para construir equipos competitivos de Pokémon, con cálculo de estadísticas en vivo, análisis de cobertura de tipos y una Pokédex completa.`,
    tags: ['Angular 21', 'TypeScript', 'Signals', 'Tailwind CSS 4', 'PrimeNG'],
    sections: [
      {
        title: CONTEXT,
        paragraphs: [
          $localize`:@@projects.pokemon-web.context.p1:Montar un equipo competitivo de Pokémon implica cruzar muchos datos: estadísticas base, naturalezas, objetos, movimientos y la cobertura de tipos del conjunto. Quería una herramienta que hiciera ese cálculo al instante, sin salir de la pagina, y que permitiera guardar los equipos en una cuenta.`,
        ],
      },
      {
        title: ARCHITECTURE,
        paragraphs: [
          $localize`:@@projects.pokemon-web.architecture.p1:SPA en Angular 21 con componentes standalone y Signals para el estado del constructor de equipos: cada cambio de naturaleza, EV u objeto recalcula las estadísticas de forma derivada, sin suscripciones manuales.`,
          $localize`:@@projects.pokemon-web.architecture.p2:La interfaz combina Tailwind CSS 4 para la maquetación con PrimeNG para los componentes complejos como tablas y selectores. Consume la API propia con sesión JWT y rutas protegidas.`,
        ],
      },
      {
        title: DECISIONS,
        paragraphs: [
          $localize`:@@projects.pokemon-web.decisions.p1:El análisis de cobertura de tipos se calcula en el cliente a partir del catálogo cacheado, en lugar de pedirlo al servidor: la respuesta es inmediata y la API se mantiene simple.`,
        ],
      },
      {
        title: HINDSIGHT,
        paragraphs: [
          $localize`:@@projects.pokemon-web.hindsight.p1:Recortaría el alcance. Quise cubrir toda la superficie de la API en solitario y con plazo: Pokédex completa, constructor de equipos, equipos públicos y privados, panel de administración y perfil. Salió, pero a costa de construir el módulo de equipos dos veces y abandonando features para una implementación más tardía.`,
          $localize`:@@projects.pokemon-web.hindsight.p2:Generaría el cliente HTTP a partir de la especificación OpenAPI de la API en lugar de mantener a mano los endpoints y los tipos: cada cambio en el backend suponía volver a escribirlos en el frontend.`,
        ],
      },
    ],
  },
  {
    slug: 'pokemon-api',
    name: 'Pokemon Team Builder · API',
    repo: 'https://github.com/ManusolJ/pokemon-backend',
    summary: $localize`:@@projects.pokemon-api.summary:API REST en Java 21 y Spring Boot 4 con autenticación JWT, refresh tokens persistidos, límite de peticiones por IP y sincronización con la PokéAPI.`,
    tags: ['Java 21', 'Spring Boot 4', 'Spring Security', 'JWT', 'PostgreSQL 17', 'Docker'],
    sections: [
      {
        title: CONTEXT,
        paragraphs: [
          $localize`:@@projects.pokemon-api.context.p1:El constructor de equipos necesitaba cuentas de usuario, persistencia de equipos y un catálogo de Pokémon fiable. Eso convertía el backend en el núcleo del proyecto: autenticación, modelo de datos y una fuente de datos que no dependiera de terceros en cada petición.`,
        ],
      },
      {
        title: ARCHITECTURE,
        paragraphs: [
          $localize`:@@projects.pokemon-api.architecture.p1:API REST con Spring Boot 4 sobre PostgreSQL 17. Spring Security con JWT para la sesión y refresh tokens guardados en base de datos, de forma que se pueden revocar. Correos transaccionales por SMTP para verificación y recuperación de cuenta.`,
          $localize`:@@projects.pokemon-api.architecture.p2:El catálogo de Pokémon se sincroniza desde la PokéAPI a tablas propias, así que las consultas de la aplicación nunca salen del servidor. Un panel de administración permite gestionar usuarios y relanzar la sincronización.`,
        ],
      },
      {
        title: DECISIONS,
        paragraphs: [
          $localize`:@@projects.pokemon-api.decisions.p1:Persistir los refresh tokens en vez de usarlos sin estado cuesta una consulta más por renovación, pero permite cerrar sesiones de forma remota. El límite de peticiones por IP en los endpoints de autenticación frena la fuerza bruta sin castigar al resto de la API.`,
        ],
      },
      {
        title: HINDSIGHT,
        paragraphs: [
          $localize`:@@projects.pokemon-api.hindsight.p1:Estudiaría la forma de los datos de la PokéAPI más detenidamente antes de diseñar el esquema. El esquema que tenía en mente era demasiado diferente de cómo los datos eran servidos.`,
          $localize`:@@projects.pokemon-api.hindsight.p2:Y escribiría los tests antes de desplegar. Llegaron cuando la API ya llevaba tiempo en producción y me di cuenta de que necesitaba los tests.`,
        ],
      },
    ],
  },
  {
    slug: 'necobot',
    name: 'Necobot',
    repo: 'https://github.com/ManusolJ/Necobot',
    summary: $localize`:@@projects.necobot.summary:Bot de Discord en TypeScript con economía de puntos, minijuegos y respuestas con personaje propio generadas por un modelo de lenguaje alojado en local.`,
    tags: [
      'SQLite',
      'Ollama',
      'Docker',
      'Drizzle',
      'Sapphire',
      'TypeScript',
      'Discord API',
      'GitHub Actions',
    ],
    sections: [
      {
        title: CONTEXT,
        paragraphs: [
          $localize`:@@projects.necobot.context.p1:Un bot para un servidor de Discord con amigos: sistema de puntos, minijuegos y un personaje que responde a las menciones. La parte interesante era conseguir que las respuestas tuvieran personalidad sin pagar por una API externa.`,
        ],
      },
      {
        title: ARCHITECTURE,
        paragraphs: [
          $localize`:@@projects.necobot.architecture.p1:TypeScript sobre el framework Sapphire, que organiza comandos, listeners y precondiciones. Persistencia en SQLite con Drizzle y migraciones versionadas. Las respuestas del personaje las genera un modelo local a través de Ollama, con tareas programadas para los eventos periódicos.`,
          $localize`:@@projects.necobot.architecture.p2:Integración continua con GitHub Actions y despliegue en un contenedor Docker en mi propio servidor.`,
        ],
      },
      {
        title: DECISIONS,
        paragraphs: [
          $localize`:@@projects.necobot.decisions.p1:SQLite en vez de PostgreSQL: un bot con un puñado de usuarios no justifica un servidor de base de datos, y un archivo único simplifica las copias de seguridad. El modelo local añade latencia frente a una API en la nube, pero elimina el coste por mensaje y mantiene las conversaciones en casa.`,
        ],
      },
      {
        title: HINDSIGHT,
        paragraphs: [
          $localize`:@@projects.necobot.hindsight.p1:Investigaría los modelos antes de construir alrededor de uno. Cambié de modelo seis veces en dos meses: de Qwen 2.5 a Qwen 3, a Salamandra 2B y 7B, de vuelta a 2B porque el 7B se comía el servidor, y otra vez a Qwen tras probar en serio las opciones. Cada cambio movía el tono, la longitud y el coste de las respuestas. Medir primero calidad y consumo en mi hardware habría fijado la elección en una tarde.`,
        ],
      },
    ],
  },
  {
    slug: 'homelab',
    name: 'Homelab',
    summary: $localize`:@@projects.homelab.summary:Servidor Linux en casa que aloja mis proyectos con Docker Compose, expuesto a internet mediante Cloudflare Tunnel sin abrir puertos.`,
    tags: ['Linux', 'Docker Compose', 'Cloudflare Tunnel', 'PostgreSQL', 'Ollama'],
    sections: [
      {
        title: CONTEXT,
        paragraphs: [
          $localize`:@@projects.homelab.context.p1:Quería desplegar mis proyectos de verdad, no solo en local, y aprender lo que hay entre el código y el usuario: sistema operativo, contenedores, red, certificados y copias de seguridad.`,
        ],
      },
      {
        title: ARCHITECTURE,
        paragraphs: [
          $localize`:@@projects.homelab.architecture.p1:Un servidor Linux con Docker Compose, un archivo por servicio. PostgreSQL compartido entre proyectos con una base de datos por aplicación, y Ollama para los modelos de lenguaje. Cloudflare Tunnel publica los servicios bajo mis dominios sin abrir puertos en el router.`,
        ],
      },
      {
        title: DECISIONS,
        paragraphs: [
          $localize`:@@projects.homelab.decisions.p1:Cloudflare Tunnel frente a un proxy inverso expuesto: pierdo algo de control, pero gano TLS gestionado y ninguna superficie de ataque directa sobre mi red doméstica. Un único PostgreSQL en lugar de uno por proyecto reduce el consumo de memoria en una máquina pequeña.`,
        ],
      },
      {
        title: HINDSIGHT,
        paragraphs: [
          $localize`:@@projects.homelab.hindsight.p1:Automatizaría las copias de seguridad y la monitorización desde el primer servicio.`,
        ],
      },
    ],
  },
  {
    slug: 'portfolio',
    name: $localize`:@@projects.portfolio.name:Este Portfolio`,
    repo: 'https://github.com/ManusolJ/portfolio-web',
    summary: $localize`:@@projects.portfolio.summary:El sitio que estás viendo: Angular 21 sin zone.js, prerenderizado en el build, con tema claro y oscuro e internacionalización, servido como estático desde Cloudflare.`,
    tags: ['Angular 21', 'Tailwind CSS 4', 'Prerender', 'i18n', 'Cloudflare'],
    sections: [
      {
        title: CONTEXT,
        paragraphs: [
          $localize`:@@projects.portfolio.context.p1:Un portfolio debería cargar al instante, leerse sin JavaScript y sobrevivir a que mi servidor de casa esté apagado. Esas tres condiciones descartaban una SPA normal y marcaron el resto de decisiones.`,
        ],
      },
      {
        title: ARCHITECTURE,
        paragraphs: [
          $localize`:@@projects.portfolio.architecture.p1:Angular 21 en modo zoneless con Signals, y todas las rutas prerenderizadas en el build a HTML estático que Cloudflare sirve desde su red. Tailwind CSS 4 con tokens de diseño para los dos temas, e i18n nativo de Angular con el español como idioma base.`,
        ],
      },
      {
        title: DECISIONS,
        paragraphs: [
          $localize`:@@projects.portfolio.decisions.p1:El contenido vive en constantes tipadas con TypeScript en vez de en Markdown: se extrae para traducir con las mismas herramientas que el resto de la interfaz y el compilador detecta cualquier campo que falte. El tema se aplica con un script previo al arranque para evitar el parpadeo al cargar.`,
        ],
      },
      {
        title: HINDSIGHT,
        paragraphs: [
          $localize`:@@projects.portfolio.hindsight.p1:Habría fijado antes la escala tipográfica y las reglas de jerarquía. Varias secciones se rediseñaron después de recibir feedback que una guía de estilo temprana habría evitado.`,
        ],
      },
    ],
  },
];

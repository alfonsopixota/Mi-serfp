import { FpCycle, FpLevel, Testimonial, Article, CommunityQuestion, ChecklistItem } from "./types";

export const PRELOADED_CYCLES: FpCycle[] = [
  {
    id: "daw",
    code: "DAW",
    name: "Desarrollo de Aplicaciones Web",
    familyId: "informatica",
    familyName: "Informática y Comunicaciones",
    level: FpLevel.GRADO_SUPERIOR,
    durationHours: 2000,
    employabilityRate: 91,
    avgStartingSalary: 18500,
    satisfactionRate: 8.4,
    difficultyScore: 7,
    keySubjects: ["Desarrollo Web en Entorno Cliente", "Desarrollo Web en Entorno Servidor", "Despliegue de Aplicaciones Web", "Bases de Datos"],
    description: "Forma a profesionales que crean y mantienen aplicaciones para internet y redes corporativas, asegurando el acceso seguro de los usuarios.",
    myths: [
      {
        myth: "Saldrás de clase cobrando 35.000€ y programando como un experto senior en Facebook.",
        reality: "El sueldo inicial en España rara vez supera los 16.000€-19.000€ brutos anuales en tu primera consultora. Tendrás que picar mucho código básico, aprender sobre la marcha y frustrarte a diario antes de pegar el primer salto salarial."
      },
      {
        myth: "En clase te enseñarán los frameworks de moda como NextJS, Svelte y Tailwind v4.",
        reality: "Los planes de estudio oficiales españoles suelen ser antiguos (Java, PHP vanilla, Javascript básico). La mayoría de herramientas actuales de mercado tendrás que estudiarlas por tu cuenta o durante la FCT (prácticas)."
      }
    ],
    unspokenTruths: [
      "El examen de Entorno Servidor (PHP/Java) suele filtrar a más de la mitad de la clase en primero.",
      "Varios profesores son teóricos que llevan 15 años sin trabajar en desarrollo real en empresas.",
      "Las prácticas en empresa (FCT) pueden ser espectaculares o limitarse a picar tablas en Excel si caes en un mal sitio."
    ],
    careerOutlets: ["Programador Frontend", "Desarrollador Backend", "Maquetador Web", "Fullstack Developer Junior"],
    suitabilityQuizPoints: [
      "Te pasas horas resolviendo problemas lógicos en ordenador",
      "No te asusta buscar en Google soluciones en inglés durante horas",
      "Prefieres la práctica directa frente a memorizar folios de teoría"
    ],
    isPopular: true
  },
  {
    id: "dam",
    code: "DAM",
    name: "Desarrollo de Aplicaciones Multiplataforma",
    familyId: "informatica",
    familyName: "Informática y Comunicaciones",
    level: FpLevel.GRADO_SUPERIOR,
    durationHours: 2000,
    employabilityRate: 89,
    avgStartingSalary: 19000,
    satisfactionRate: 8.2,
    difficultyScore: 8,
    keySubjects: ["Programación Multimedia y Dispositivos Móviles", "Programación de Servicios y Procesos", "Sistemas de Gestión", "Acceso a Datos"],
    description: "Especializado en el diseño, desarrollo e implantación de aplicaciones para dispositivos móviles, escritorio o videojuegos.",
    myths: [
      {
        myth: "Aprenderás a crear videojuegos en 3D súper realistas.",
        reality: "A lo sumo harás un clon básico de Asteroids o Flappy Bird en Java o Unity 2D como proyecto fin de ciclo. El enfoque real es crear herramientas corporativas, interfaces gráficas de gestión e integraciones web."
      }
    ],
    unspokenTruths: [
      "La asignatura de Programación en primero (generalmente en Java o C#) tiene un nivel de suspenso altísimo en el primer trimestre.",
      "Hay solapamiento con el temario de DAW en el primer año (es común convalidar el primer año completo)."
    ],
    careerOutlets: ["Desarrollador de Apps Android/iOS", "Desarrollador de Software de Gestión", "Gestor de Bases de Datos"],
    suitabilityQuizPoints: [
      "Te atrae ver cómo funcionan los sistemas de tu móvil",
      "Disfrutas estructurando código, objetos y arquitectura",
      "Quieres tener la puerta abierta tanto al móvil como al backend"
    ],
    isPopular: true
  },
  {
    id: "asir",
    code: "ASIR",
    name: "Administración de Sistemas Informáticos en Red",
    familyId: "informatica",
    familyName: "Informática y Comunicaciones",
    level: FpLevel.GRADO_SUPERIOR,
    durationHours: 2000,
    employabilityRate: 85,
    avgStartingSalary: 17500,
    satisfactionRate: 7.9,
    difficultyScore: 7,
    keySubjects: ["Administración de Sistemas Operativos", "Servicios de Red e Internet", "Implantación de Aplicaciones Web", "Fundamentos de Hardware"],
    description: "Configura, administra y mantiene sistemas informáticos en red para garantizar el buen funcionamiento físico y virtual de las empresas.",
    myths: [
      {
        myth: "Aprenderás a hackear sistemas y ser un ciberexperto de película al salir.",
        reality: "ASIR es administración pura: cableado, cortafuegos tier list, configurar servidores Linux/Windows, bash scripting, copias de seguridad de bases de datos e infraestructura cloud elemental."
      }
    ],
    unspokenTruths: [
      "Es el ciclo de informática que la gente suele elegir si odia picar código... para descubrir después que hoy en día, configurar infraestructuras requiere automatización y programar scripts de Bash, Python o PowerShell constantemente.",
      "Te tocará lidiar con hardware muy obsoleto en laboratorios de prácticas de algunos centros públicos."
    ],
    careerOutlets: ["Administrador de Redes", "Técnico de Soporte de Sistemas", "Administrador de Servidores Cloud", "Técnico en Ciberseguridad Junior"],
    suitabilityQuizPoints: [
      "Te gusta el hardware, las redes físicas y montar PCs",
      "Te fascina la terminal de comandos Linux frente a las interfaces visuales virtuales",
      "Tienes madera de bombero: resolver problemas caóticos del sistema bajo presión"
    ],
    isPopular: false
  },
  {
    id: "cae",
    code: "CAE",
    name: "Cuidados Auxiliares de Enfermería",
    familyId: "sanidad",
    familyName: "Sanidad",
    level: FpLevel.GRADO_MEDIO,
    durationHours: 1400,
    employabilityRate: 94,
    avgStartingSalary: 14500,
    satisfactionRate: 8.6,
    difficultyScore: 5,
    keySubjects: ["Técnicas Básicas de Enfermería", "Higiene del Medio Hospitalario", "Apoyo Psicológico al Paciente", "Promoción de la Salud"],
    description: "Proporciona cuidados de higiene, alimentación de pacientes, preparación de materiales clínicos y asistencia bajo control facultativo.",
    myths: [
      {
        myth: "Solo te dedicarás a limpiar camas y cambiar pañales.",
        reality: "Aunque las tareas de higiene son parte sustancial, el Auxiliar (TCAE) realiza tomas de constantes, asiste en curas, prepara instrumental estéril y es el contacto humano más cercano y reconfortante del enfermo."
      }
    ],
    unspokenTruths: [
      "Es un trabajo físicamente demoledor. Levantar pacientes y estar de pie 8 horas seguidas machaca la espalda si no empleas ergonomía.",
      "Los sueldos públicos del SAS, SERMAS, ICS, etc., son bajos al inicio y dependen de sumar antigüedad, trienios y turnicidad (nocturnidades)."
    ],
    careerOutlets: ["Auxiliar de Hospitalización", "Auxiliar de Geriátrico", "Asistente de Clínicas Dentales", "Auxiliar de Salud Mental"],
    suitabilityQuizPoints: [
      "Tienes una fortísima vocación de cuidado y empatía humana",
      "No te asusta ver fluidos corporales o situaciones médicas complejas",
      "Buscas un ciclo corto (tan solo 1 año de clases académicas y 1 trimestre clínico) para empezar a trabajar de inmediato"
    ],
    isPopular: true
  },
  {
    id: "hbuco",
    code: "HBUCO",
    name: "Higiene Bucodental",
    familyId: "sanidad",
    familyName: "Sanidad",
    level: FpLevel.GRADO_SUPERIOR,
    durationHours: 2000,
    employabilityRate: 88,
    avgStartingSalary: 16500,
    satisfactionRate: 8.1,
    difficultyScore: 6,
    keySubjects: ["Exploración de la Cavidad Oral", "Intervención Bucodental", "Epidemiología Oral", "Fisiopatología General"],
    description: "Profesionales dedicados a promover la salud oral mediante limpiezas de boca, radiografías dentales, aplicación de selladores y educación higiénica preventiva.",
    myths: [
      {
        myth: "Es una alternativa barata para ser casi dentista e ingresar muchísimo dinero.",
        reality: "Trabajas por cuenta ajena en clínicas dentales privadas donde la competencia es feroz y los convenios colectivos a menudo no se respetan, exigiéndote a veces tareas de recepcionista o comercial dental simultáneamente."
      }
    ],
    unspokenTruths: [
      "En algunas clínicas te contratarán a media jornada pero harás jornada completa encubierta.",
      "El examen de anatomía del cráneo y farmacología en primero requiere memorizar densos apuntes en latín y microbiología."
    ],
    careerOutlets: ["Higienista Bucodental en clínica privada", "Educador Sanitario", "Asistente de Investigación Dental"],
    suitabilityQuizPoints: [
      "Tienes buena motricidad fina y pulso cirujano",
      "Te gusta el contacto visual directo y trabajar en ambientes clínicos estériles",
      "Prefieres horarios comerciales fijos en vez de turnos rotatorios de 24 horas"
    ],
    isPopular: true
  },
  {
    id: "adfi",
    code: "ADFI",
    name: "Administración y Finanzas",
    familyId: "administracion",
    familyName: "Administración y Gestión",
    level: FpLevel.GRADO_SUPERIOR,
    durationHours: 2000,
    employabilityRate: 86,
    avgStartingSalary: 16000,
    satisfactionRate: 7.7,
    difficultyScore: 5.5,
    keySubjects: ["Gestión Financiera", "Contabilidad y Fiscalidad", "Recursos Humanos y Responsabilidad Social", "Gestión de la Documentación Jurídica"],
    description: "Organiza y ejecuta las operaciones de gestión contable, fiscal, de personal, de facturación y servicios de atención al cliente de cualquier tipo de negocio.",
    myths: [
      {
        myth: "Te convertirás instantáneamente en jefe de administración de una multinacional.",
        reality: "La inmensa mayoría empieza archivando facturas de proveedores, llamando a clientes morosos y ordenando asientos contables en un programa como Contasol por el salario mínimo interprofesional."
      }
    ],
    unspokenTruths: [
      "Es el FP con más número absoluto de graduados en España. La competencia es masiva, por lo que dominar el Excel (nivel macros y tablas dinámicas) e inglés fluido marcará el 100% de la diferencia de tu salario.",
      "Gran parte del temario (burocracia analógica gubernamental) se percibe muy desactualizado frente a las herramientas digitales ERP actuales."
    ],
    careerOutlets: ["Administrativo Contable", "Gestor de Nóminas", "Técnico de Recursos Humanos Junior", "Asistente Comercial de Seguros"],
    suitabilityQuizPoints: [
      "Eres una persona sumamente metódica, ordenada con los papeles y organizada",
      "No te asustan las matemáticas de oficina (porcentajes de IVA, retenciones, amortizaciones)",
      "Te encanta el trabajo confortable de despacho con horario administrativo de lunes a viernes"
    ],
    isPopular: true
  },
  {
    id: "renov",
    code: "RENOV",
    name: "Gestión de Energías Renovables",
    familyId: "energia",
    familyName: "Energía y Agua",
    level: FpLevel.GRADO_SUPERIOR,
    durationHours: 2000,
    employabilityRate: 87,
    avgStartingSalary: 17800,
    satisfactionRate: 8.3,
    difficultyScore: 6.5,
    keySubjects: ["Sistemas Solares Fotovoltaicos", "Sistemas Eólicos", "Gestión del Montaje de Parques", "Configuración de Instalaciones Aisladas"],
    description: "Coordinación y gestión de parques fotovoltaicos y aerogeneradores, desde el replanteo físico hasta su mantenimiento, control de eficiencia y seguridad.",
    myths: [
      {
        myth: "Estarás tranquilamente en una oficina verde controlando paneles con tu portátil.",
        reality: "Mantenimiento significa subir a aerogeneradores a más de 80 metros de altura en mitad del frío invernal en Castilla, o pasar horas bajo el sol abrasador revisando cables de cobre en macrohuertos solares en Extremadura."
      }
    ],
    unspokenTruths: [
      "Es estrictamente vital no tener vértigo, claustrofobia ni problemas con el trabajo físico al aire libre.",
      "Varias ofertas de empleo te obligarán a viajar constantemente por España o vivir de manera temporal en zonas rurales remotas."
    ],
    careerOutlets: ["Técnico de Mantenimiento de Parques Fotovoltaicos", "Jefe de Montaje Eólico", "Proyectista de Energía Solar de autoconsumo"],
    suitabilityQuizPoints: [
      "Te apasiona la sostenibilidad y la física aplicada",
      "Disfrutas montando circuitos eléctricos y reparando piezas mecánicas",
      "El trabajo de oficina sedentario te asfixia; prefieres la acción exterior"
    ],
    isPopular: false
  }
];

export const PRELOADED_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    studentName: "Marcos G.",
    age: 23,
    gender: "Masculino",
    cycleCode: "DAW",
    cycleName: "Desarrollo de Aplicaciones Web",
    familyId: "informatica",
    centerName: "IES Severo Ochoa",
    city: "Elche (Alicante)",
    fpLevel: FpLevel.GRADO_SUPERIOR,
    isDual: true,
    rating: 4,
    content: "Venía de un año frustrado en ingeniería informática universitaria donde solo vi matemáticas abstractas. Aquí en el FP en dos meses ya estábamos montando una web interactiva con base de datos real. El cambio fue brutal, me sentía útil aprendiendo algo de verdad.",
    theTruth: "No es oro todo lo que reluce. En mi IES de origen público las máquinas del taller daban ganas de llorar. Al final, para el proyecto de segundo, o compendias tú horas en tu casa haciendo cursos de React/Vue por tu cuenta de forma autónoma o saldrás sabiendo maquetar con un HTML arcaico y un PHP obsoleto que ya no busca casi nadie.",
    foundJobMonths: 1,
    startingSalary: 17000,
    likes: 42,
    isCustom: false,
    approved: true,
    createdAt: "2026-02-15"
  },
  {
    id: "test-2",
    studentName: "Sara Molina",
    age: 21,
    gender: "Femenino",
    cycleCode: "CAE",
    cycleName: "Cuidados Auxiliares de Enfermería",
    familyId: "sanidad",
    centerName: "IES Ramón y Cajal",
    city: "Murcia",
    fpLevel: FpLevel.GRADO_MEDIO,
    isDual: false,
    rating: 5,
    content: "He logrado contrato estacional indefinido en mi clínica de prácticas nada más acabar. La calidez del trato con los ancianos es preciosa y el sector de cuidados básicos tiene desabastecimiento de personal constante.",
    theTruth: "Es agotador. El SAS/Hospital te exige una espalda de acero. He tenido que mover a personas con sobrepeso yo sola y acabas el turno con calambres. Además la paga inicial son escasos 1.150€ netos al mes si no tienes pluses de nocturnidad. Quien diga que es un trabajo cómodo miente.",
    foundJobMonths: 2,
    startingSalary: 14200,
    likes: 31,
    isCustom: false,
    approved: true,
    createdAt: "2026-03-22"
  },
  {
    id: "test-3",
    studentName: "Alberto Ruiz",
    age: 32,
    gender: "Masculino",
    cycleCode: "ADFI",
    cycleName: "Administración y Finanzas",
    familyId: "administracion",
    centerName: "Centro Privado Homologado S.A.",
    city: "Madrid",
    fpLevel: FpLevel.GRADO_SUPERIOR,
    isDual: false,
    rating: 3,
    content: "Reorienté mi vida laboral tras años en hostelería. Financieramente el curso en el centro privado me costó 4.000€ que me dolió pagar, pero al menos el horario intensivo me permitió seguir trabajando de camarero los findes.",
    theTruth: "¡Cuidado con las academias que prometen convenios de oro! Mi centro privado prometía prácticas en IBM y acabé archivando albaranes polvorientos en una gestoría de barrio de tres personas donde ni el tutor sabía quién era yo. Si puedes, vete directo a la red pública o pregunta muy bien qué convenios de prácticas tienen cerrados por escrito.",
    foundJobMonths: 6,
    startingSalary: 15500,
    likes: 58,
    isCustom: false,
    approved: true,
    createdAt: "2026-04-10"
  },
  {
    id: "test-4",
    studentName: "Laura Benítez",
    age: 26,
    gender: "Femenino",
    cycleCode: "HBUCO",
    cycleName: "Higiene Bucodental",
    familyId: "sanidad",
    centerName: "IES Politecnico de Sevilla",
    city: "Sevilla",
    fpLevel: FpLevel.GRADO_SUPERIOR,
    isDual: true,
    rating: 4,
    content: "Me encanta el trato al público y la precisión técnica que requiere. En mi FP Dual, la clínica dental privada de prácticas me pagaba una beca mensual de 450€ mientras estudiaba y la transición fue muy fluida.",
    theTruth: "El principal problema de higienista bucodental es la mercantilización en las grandes clínicas franquiciadas. Te intentarán obligar a hacer de comercial vendiendo tratamientos innecesarios, ortodoncias o blanqueamientos a comisión bajo riesgo de despido indirecto. Es estresante, busca clínicas familiares si puedes.",
    foundJobMonths: 3,
    startingSalary: 16000,
    likes: 24,
    isCustom: false,
    approved: true,
    createdAt: "2026-05-01"
  }
];

export const PRELOADED_ARTICLES: Article[] = [
  {
    id: "art-1",
    title: "La burbuja de las FP Privadas online de bajo coste: Lo que nadie te cuenta",
    category: "Mitos vs Realidad",
    author: "Alba Ortiz (SerFP)",
    summary: "¿Anuncios constantes en televisión de institutos privados que te habilitan el FP oficial en 12 meses pagando poco a poco online? Te explicamos cómo se lucran, la escasa calidad docente telemática y los problemas con los exámenes presenciales masivos.",
    content: `En los últimos 3 años, España ha vivido un boom de centros de FP privados, especialmente en modalidades semipresenciales y online. Atrapados por promesas de 'aprende a tu ritmo sin esfuerzo' y de 'facilidades de pago por 120€ al mes', miles de alumnos se matriculan sin saber en qué consiste su negocio real.

El modus operandi de varios de estos centros online consiste en vender cursos que teóricos tutores corrigen de forma robotizada, sirviéndose de plataformas PDF arcaicas. El mayor escollo surge en segundo año: la Ley exige prácticas obligatorias en empresas (FCT). Al tener miles de alumnos de toda España y muy poco personal gestor, acaban obligando al alumno a buscarse la vida para encontrar una empresa, o les ofrecen empresas con convenios dudosos y totalmente ajenas al perfil formativo.

Además, cuando llega el periodo de exámenes oficiales obligatorios presenciales, alquilan pabellones de ferias de muestras masificados donde los estudiantes hacen exámenes test absurdamente rebuscados de asignaturas completas en un solo día. 

Nuestra recomendación en SerFP es clara e independiente:\n1. Siempre que puedas, prioriza la red pública. El coste de matrícula es simbólico (en algunas autonomías es del todo gratuito) y la garantía de prácticas de calidad está supervisada por un departamento docente con experiencia real.\n2. Si eliges un centro privado por comodidad de horario, exige que te den por escrito la lista de empresas colaboradoras en tu provincia antes de abonar la matrícula.`,
    publishedAt: "2026-05-10",
    readTime: "5 min",
    commentsCount: 19
  },
  {
    id: "art-2",
    title: "Sueldos reales de FP en España: Desmontando falsas expectativas de oro",
    category: "Empleabilidad",
    author: "Alberto Ruiz (Orientador SerFP)",
    summary: "Basta ya del 'humo' comercial. Los folletos promocionales aseguran que un programador de DAW o un administrador de ASIR gana 40.000€ nada más terminar el FP. Ponemos los datos oficiales sobre la mesa de forma realista y honesta.",
    content: `Es de vital importancia hablar con transparencia sobre el mercado laboral. Si revisas folletos publicitarios de academias privadas de FP, te convencerán de que con un ciclo de Grado Superior de Informática, Administración o Sanidad, saldrás firmando un sueldo medio de 2.500€ netos al mes.

Esto es mentira y frustra enormemente a los alumnos cuando encaran su primera oferta de empleo real.

Repasemos los salarios promedios de convenio en España para puestos junior recién titulados sin experiencia previa (los valores son referenciales de este año para contratos a jornada completa):\n
- **Familias Tecnológicas (DAW, DAM, ASIR):** En consultoras de nivel de entrada o consultoría básica (como KPGM, Deloitte, Everis/NTT Data), el salario inicial para un graduado junior ronda los €16.000 a €20.000 brutos anuales (aproximadamente entre €1.100 y €1.350 netos en 14 pagas). Desconfía si te prometen €36.000 de inicio sin saber programar de forma profesional.\n
- **Familia Sanidad (CAE, Higiene Bucodental, Laboratorio):** En centros de dependencia pública de salud, el salario de convenio parte de unos €14.000 - €18.000 brutos base, incrementados con las guardias, nocturnidades y festivos, alcanzando los €1.200-€1.500 netos. En clínicas privadas dentales o clínicas estéticas, los salarios desgraciadamente rondan el Salario Mínimo Interprofesional (SMI) en sus inicios.\n
- **Familia Administración (Finanzas, Asistencia a la Dirección):** El administrativo junior promedio en España inicia su andadura cobrando entre €14.500 y €16.500 brutos anuales, con responsabilidades iniciales discretas de cuadre y facturación.

¿Significa esto que la FP no vale la pena? ¡Al contrario! La FP en España ofrece tasas de inserción laboral muy superiores a gran parte de los grados universitarios humanísticos. La ventaja real reside en que la escala de incremento salarial es rápida: en 3–5 años de experiencia activa, demostrando valía, profesionalidad y especialización, el sueldo medio sube con creces por encima de la media nacional.`,
    publishedAt: "2026-05-18",
    readTime: "7 min",
    commentsCount: 34
  },
  {
    id: "art-3",
    title: "Guía honesta para elegir centro de FP: ¿Público, concertado o privado?",
    category: "Consejos",
    author: "Comunidad SerFP",
    summary: "Pros, contras, tarifas reales de secretaría y el peso del prestigio local de cada tipología de centro formativo a la hora de buscar trabajo.",
    content: `La elección del centro es casi más decisiva que el propio ciclo. Te traemos las diferencias esenciales de cada modelo:\n
1. **Centros Públicos (IES - Instituto de Educación Secundaria):**
- **Pros:** Coste prácticamente nulo (tasa mínima de unos 20-30€ según autonomía); profesores que han aprobado oposición (estables); convenios consolidados desde hace décadas con las mejores empresas de la comarca.
- **Contras:** La burocracia para cambiar un temario o admitir nuevo software es lenta, por lo que a veces los talleres tienen ordenadores lentos y software un poco desactualizado. Además, hay escasez de plazas por lo que necesitas buena nota media de acceso.

2. **Centros Concertados:**
- **Pros:** Son gestionados de forma privada pero financiados parcialmente de forma pública. El coste de matrícula es moderado (a menudo se piden 'aportaciones voluntarias' de unos 50-100€ al mes para tazas de secretaría o talleres).
- **Contras:** En el fondo operan con restricciones parecidas a la pública pero con ideología de centro propia y a veces cobros forzados de extras escolares.

3. **Centros Privados:**
- **Pros:** Facilidad total de admisión (pagas y estás dentro, sin requisar nota media de corte); equipamientos modernos y flexibilidad horaria brutal (turno de tarde, online, fines de semana). Ideal si trabajas y no te quedan plazas en la pública.
- **Contras:** Precio desmesurado (€2.500 a €6.000 anuales); rotación salvaje de personal docente con condiciones a menudo precarias; y un interés de negocio para que apruebes sí o sí, bajando a veces la exigencia formativa del aula.`,
    publishedAt: "2026-05-25",
    readTime: "4 min",
    commentsCount: 11
  }
];

export const PRELOADED_QUESTIONS: CommunityQuestion[] = [
  {
    id: "q-1",
    author: "Rubén Soler",
    cycleOfInterest: "DAM",
    title: "¿Se puede aprobar DAM viniendo de Bachillerato de Letras?",
    content: "He cursado Bachillerato de Humanidades y me ha entrado la crisis de empleabilidad. Me han hablado muy bien de DAM en mi ciudad, pero me da terror el módulo de Programación y Bases de Datos porque no tengo base de mates científicas. ¿Es viable o iré directo al fracaso en primero?",
    category: "Dudas de Acceso",
    likes: 15,
    createdAt: "2026-05-20",
    answers: [
      {
        id: "ans-1",
        author: "Marta Gómez",
        role: "alumno",
        content: "¡Por supuesto que se puede Rubén! Yo venía de Bachillerato de Artes y ahora mismo estoy de desarrolladora junior. En programación no se usan matemáticas complejas de derivadas, sino pura lógica de bloques, orden, inglés básico y resolución de bucles. Al principio asusta, pero si le echas horas de práctica semanales en tu casa lo sacas de calle. ¡Ánimo!",
        likes: 12,
        createdAt: "2026-05-21"
      },
      {
        id: "ans-2",
        author: "Profesor_FP_Informatica",
        role: "orientador",
        content: "Confirmo la opinión de Marta. El 90% de la gente tropieza no por falta de nivel científico, sino por falta de constancia diaria. Programar no se puede memorizar el día antes del examen; es como aprender un idioma musical o hacer deporte: requiere teclear y resolver errores todos los días.",
        likes: 9,
        createdAt: "2026-05-21"
      }
    ]
  },
  {
    id: "q-2",
    author: "Elena_VLC",
    cycleOfInterest: "CAE",
    title: "¿Cómo funciona la remuneración de las prácticas en la FP Dual real?",
    content: "Me planteo apuntarme a la modalidad Dual de TCAE de sanidad en Valencia. ¿Nos pagan algo al estar en la empresa o depende de la caridad del hospital/clínica privado de turno? ¿Ves mejor hacer dual o la normal?",
    category: "FP Dual",
    likes: 22,
    createdAt: "2026-05-24",
    answers: [
      {
        id: "ans-3",
        author: "Carlos Torres",
        role: "orientador",
        content: "Hola Elena. Legalmente en España, con la nueva legislación de FP, la modalidad Dual o de alternancia intensa obliga a que el alumno esté becado o contratado por la empresa si se superan ciertos límites, pero cada comunidad autónoma ha llevado un proceso de transición complejo con los hospitales públicos.\nEn sanidad pública española, a fecha de hoy, la inmensa mayoría de puestos rotatorios de prácticas (FCT) siguen sin estar remunerados porque los hospitales lo listan como formación básica en alternancia normal de 400 horas libres de salario directo.\nSi optas por clínica privada, a veces logras becas de 300 o 500 euros, pero lo valioso real de la Dual clínica es que dejas de ser un mero observador y te asignan tareas del día a día, conociendo el personal interno y teniendo altísimas posibilidades de firmar tu primer contrato formal de relevo al año siguiente.",
        likes: 18,
        createdAt: "2026-05-25"
      }
    ]
  }
];

export const PRELOADED_CHECKLISTS: ChecklistItem[] = [
  {
    id: "ch-1",
    task: "Verificar Nota de Acceso y Requisitos oficiales",
    category: "Requisitos",
    description: "Comprueba si necesitas el título de la ESO para Grado Medio, Bachillerato o Grado Medio previo para Grado Superior. Revisa tu nota media histórica ya que define tu prioridad.",
    completed: true
  },
  {
    id: "ch-2",
    task: "Consultar las plazas disponibles del ciclo en centros públicos",
    category: "Requisitos",
    description: "Cada consejería de educación de tu comunidad autónoma publica en su web un listado de cuántos IES imparten el ciclo deseado y cuántas vacantes reservan.",
    completed: false
  },
  {
    id: "ch-3",
    task: "Comprobar el calendario exacto de preinscripción autonómica",
    category: "Matriculación",
    description: "¡Crucial! Cada comunidad autónoma tiene sus propios plazos y fechas límites improrrogables (suelen ser entre mayo y julio). Si se te pasa la fecha vas a la lista de espera de septiembre.",
    completed: false
  },
  {
    id: "ch-4",
    task: "Hablar con exalumnos del centro (IES) objetivo",
    category: "Primeros Días",
    description: "Acércate a la puerta del instituto o búscalo en nuestro portal SerFP/Facebook/Reddit. Pregunta si la maquinaria del taller funciona o si los profesores se implican.",
    completed: false
  },
  {
    id: "ch-5",
    task: "Preparar un ordenador portátil decente (mínimo i5, 8GB RAM)",
    category: "Primeros Días",
    description: "Si vas a cursar Informática, Administración o Edificación de Obras, vas a necesitar tu propia máquina para hacer los trabajos de programación y bases de datos con fluidez.",
    completed: false
  },
  {
    id: "ch-6",
    task: "Exigir la lista de empresas de prácticas firmada",
    category: "Dual",
    description: "Antes de matricularte en modalidad Dual, solicita al centro educativo la lista real de convenios vigentes para tu ciclo específico para ver si se ajustan a lo que quieres.",
    completed: false
  }
];

export const FAMILIES_WITH_MEDIAN_DATA = [
  { name: "Informática y Comunicaciones", sueldoMedio: 18800, empleabilidad: 90, satisfaccion: 8.2, color: "#3B82F6" },
  { name: "Sanidad", sueldoMedio: 15400, empleabilidad: 91, satisfaccion: 8.4, color: "#10B981" },
  { name: "Administración y Gestión", sueldoMedio: 15800, empleabilidad: 86, satisfaccion: 7.6, color: "#F59E0B" },
  { name: "Instalación y Mantenimiento", sueldoMedio: 17200, empleabilidad: 87, satisfaccion: 7.9, color: "#EF4444" },
  { name: "Comercio y Marketing", sueldoMedio: 16100, empleabilidad: 84, satisfaccion: 7.5, color: "#8B5CF6" },
  { name: "Energía y Agua", sueldoMedio: 17800, empleabilidad: 87, satisfaccion: 8.3, color: "#06B6D4" },
  { name: "Hostelería y Turismo", sueldoMedio: 14500, empleabilidad: 82, satisfaccion: 7.2, color: "#EC4899" }
];

window.FRED_CONTENT = {
  contact:{
    linkedin:'https://linkedin.com/in/alfredo-aguirre-fonseca-49946932',
    email:'',
    cv:''
  },
  projects:[
    {
      id:'genai-knowledge', number:'01',
      category:{es:'IA GENERATIVA · BANCA',en:'GENAI · BANKING'}, organization:'INTERBANK', year:'2023',
      title:{es:'Asistente Inteligente para Asesores',en:'Intelligent Assistant for Advisors'},
      metric:'97%', metricLabel:{es:'menos tiempo de consulta',en:'less consultation time'},
      question:{
        es:'¿Y SI ENCONTRAR LA RESPUESTA CORRECTA TOMARA SEGUNDOS EN VEZ DE MINUTOS?',
        en:'WHAT IF FINDING THE RIGHT ANSWER TOOK SECONDS INSTEAD OF MINUTES?'
      },
      summary:{
        es:'Convertí conocimiento documental disperso en una experiencia conversacional que devuelve la respuesta correcta durante la llamada, sin sacar al asesor de su flujo.',
        en:'I turned distributed documentary knowledge into a conversational experience that returns the right answer during the call without taking the advisor out of their flow.'
      },
      tags:['Azure OpenAI','AI Search','SharePoint'],
      noise:{es:'El conocimiento existía, pero estaba distribuido y encontrar la respuesta correcta consumía tiempo durante la atención.',en:'The knowledge existed, but it was distributed and finding the right answer consumed time during service.'},
      insight:{es:'El problema no era falta de información. Era acceso al conocimiento en el momento exacto en que hacía falta.',en:'The problem was not missing information. It was access to knowledge at the exact moment it was needed.'},
      bet:{es:'Reducir la distancia entre una pregunta y la respuesta útil mediante una experiencia conversacional apoyada por IA generativa.',en:'Reduce the distance between a question and a useful answer through a conversational experience powered by generative AI.'},
      build:['Azure OpenAI','AI Search','SharePoint','Knowledge Architecture','Prompt Design','Testing'],
      impact:{es:'97% menos tiempo de consulta.',en:'97% less consultation time.'},
      learning:{es:'La IA crea valor cuando desaparece detrás de una mejor experiencia.',en:'AI creates value when it disappears behind a better experience.'}
    },
    {
      id:'process-redesign', number:'02',
      category:{es:'DISEÑO DE SERVICIO · SEGUROS',en:'SERVICE DESIGN · INSURANCE'}, organization:'RIMAC SEGUROS', year:'2020',
      title:{es:'Flujo Digital de Pólizas End-to-End',en:'End-to-End Digital Policy Flow'},
      metric:'99%+', metricLabel:{es:'menos tiempo operativo',en:'less operational time'},
      question:{es:'¿Y SI UN PROCESO DE DÍAS PUDIERA RESOLVERSE EN MINUTOS?',en:'WHAT IF A PROCESS THAT TOOK DAYS COULD BE COMPLETED IN MINUTES?'},
      summary:{es:'Rediseñé de raíz el proceso de emisión de pólizas, eliminando handoffs manuales y reduciendo el ciclo de días a minutos.',en:'I redesigned the policy issuance process end-to-end, removing manual handoffs and reducing the cycle from days to minutes.'},
      tags:['Service Design','Process Mining','APIs'],
      noise:{es:'Esperas, pasos manuales y múltiples puntos de fricción extendían el tiempo total del proceso.',en:'Waiting, manual steps and multiple friction points extended the end-to-end process time.'},
      insight:{es:'Digitalizar sin simplificar mantiene la complejidad dentro de una pantalla.',en:'Digitizing without simplifying keeps the complexity inside a screen.'},
      bet:{es:'Rediseñar el flujo AS-IS / TO-BE, eliminar pasos y handoffs innecesarios y recién entonces digitalizar la experiencia.',en:'Redesign the AS-IS / TO-BE flow, remove unnecessary steps and handoffs, and only then digitize the experience.'},
      build:['Service Design','Process Mining','AS-IS / TO-BE','APIs','Process Redesign','Digital Experience'],
      impact:{es:'99%+ menos tiempo operativo; el ciclo pasó de días a minutos.',en:'99%+ less operational time; the cycle moved from days to minutes.'},
      learning:{es:'A veces innovar no es sumar tecnología. Es retirar complejidad innecesaria.',en:"Sometimes innovation isn't adding more technology. It's removing unnecessary complexity."}
    },
    {
      id:'product-adoption', number:'03',
      category:{es:'PRODUCTO DIGITAL · SEGUROS',en:'DIGITAL PRODUCT · INSURANCE'}, organization:'RIMAC SEGUROS', year:'2019–2020',
      title:{es:'Portal de Autogestión para Corredores',en:'Broker Self-Service Portal'},
      metric:'60→85%', metricLabel:{es:'tasa de uso de la herramienta',en:'tool adoption rate'},
      question:{es:'¿Y SI EL PRODUCTO NO FUERA EL PROBLEMA?',en:"WHAT IF THE PRODUCT WASN'T THE PROBLEM?"},
      summary:{es:'Diseñé un portal web para corredores que permitió activar pólizas EPS en línea, eliminando buzones físicos y acelerando la atención al cliente.',en:'I designed a web portal for insurance brokers that enabled online EPS policy activation, removing physical inboxes and speeding up customer service.'},
      tags:['Product Ownership','UX Research','Capacitación'],
      noise:{es:'La adopción estaba por debajo de su potencial y el flujo todavía dependía de fricciones operativas y hábitos previos.',en:'Adoption was below its potential and the flow still depended on operational friction and previous habits.'},
      insight:{es:'La pregunta correcta no era “¿qué funcionalidad falta?”, sino “¿qué está ocurriendo en la experiencia?”.',en:'The right question was not “what is missing?”, but “what is happening in the experience?”.'},
      bet:{es:'Rediseñar la experiencia, acompañar el cambio y aprender con iteraciones enfocadas en uso real.',en:'Redesign the experience, support the change and learn through iterations focused on real usage.'},
      build:['Product Ownership','UX Research','Journey Redesign','Digital Experience','Capacitación','Iteration'],
      impact:{es:'La tasa de uso de la herramienta pasó de 60% a 85%.',en:'Tool adoption increased from 60% to 85%.'},
      learning:{es:'Un producto no es exitoso cuando se lanza. Es exitoso cuando las personas lo usan.',en:"A product isn't successful when it's launched. It's successful when people use it."}
    },
    {
      id:'vision-360', number:'04',
      category:{es:'AGENTE IA · BANCA',en:'AI AGENT · BANKING'}, organization:'INTERBANK', year:'2024 – PRESENTE',
      title:{es:'Agente Conversacional de Onboarding',en:'Conversational Onboarding Agent'},
      metric:'24/7', metricLabel:{es:'conocimiento siempre disponible',en:'knowledge always available'},
      question:{es:'¿Y SI EL CONOCIMIENTO DEL EQUIPO ESTUVIERA SIEMPRE DISPONIBLE?',en:'WHAT IF TEAM KNOWLEDGE WAS ALWAYS AVAILABLE?'},
      summary:{es:'Estoy construyendo un agente con IA que democratiza el conocimiento del equipo y convierte conocimiento clave en una capacidad escalable.',en:'I am building an AI agent that democratizes team knowledge and turns key expertise into a scalable capability.'},
      tags:['Conversational AI','GenAI','Agent Design'],
      noise:{es:'El conocimiento de onboarding dependía de personas clave y no siempre estaba disponible cuando alguien lo necesitaba.',en:'Onboarding knowledge depended on key people and was not always available when someone needed it.'},
      insight:{es:'El conocimiento se vuelve escalable cuando deja de depender únicamente de quién está disponible.',en:'Knowledge becomes scalable when it no longer depends only on who is available.'},
      bet:{es:'Diseñar una experiencia conversacional que convierta conocimiento del equipo en orientación accesible bajo demanda.',en:'Design a conversational experience that turns team knowledge into guidance accessible on demand.'},
      build:['Conversational AI','Generative AI','Agent Design','Knowledge Architecture','Prompt Design'],
      impact:{es:'Conocimiento disponible 24/7 como capacidad del equipo.',en:'Team knowledge available 24/7 as a shared capability.'},
      learning:{es:'[CONTENIDO POR VALIDAR]',en:'[CONTENT TO VALIDATE]'}
    }
  ],
  testimonials:[
    {initials:'MM',name:'Mauricio Miranda',role:'Product Owner · Interbank',quote:{es:'Alfredo tiene una capacidad poco común: entiende la tecnología tan bien como el negocio, y siempre encuentra la forma de conectar ambos mundos. Su enfoque en el usuario marca la diferencia en cada proyecto.',en:'Alfredo has a rare ability: he understands technology as well as the business and consistently finds a way to connect both worlds. His user focus makes a difference in every project.'}},
    {initials:'SM',name:'Sebastián Mirvois',role:'Product Owner · Rimac Seguros',quote:{es:'Trabajar con Alfredo es trabajar con alguien que primero escucha y luego propone. Su rediseño de procesos transformó por completo nuestros tiempos operativos. Un profesional estratégico y muy humano.',en:'Working with Alfredo means working with someone who listens first and proposes second. His process redesign transformed our operational times. A strategic and deeply human professional.'}}
  ],
  roles:{
    es:['ANALISTA DE NEGOCIO','PRODUCT OWNER','DESIGN THINKER','ESTRATEGA DE PRODUCTO','BUILDER DE IA','STORYTELLER','SOLUCIONADOR.'],
    en:['BUSINESS ANALYST','PRODUCT OWNER','DESIGN THINKER','PRODUCT STRATEGIST','AI BUILDER','STORYTELLER','PROBLEM SOLVER.']
  },
  i18n:{
    es:{
      'loader.caption':'ENCUENTRA EL RITMO.','film.play':'REPRODUCIR','film.pause':'PAUSA',
      'nav.why':'POR QUÉ','nav.method':'MÉTODO','nav.work':'CASOS','nav.about':'SOBRE MÍ','nav.contact':'CONTACTO',
      'hero.filmLabel':'01 / POR QUÉ','hero.kicker':'DISEÑO DE NEGOCIO + ESTRATEGIA DE PRODUCTO',
      'hero.title':'CONVIERTO<br>COMPLEJIDAD<br>EN <span class="red">MOVIMIENTO.</span>',
      'hero.sub':'Convierto problemas complejos en productos, experiencias y estrategias que hacen avanzar el negocio, conectando personas, diseño y tecnología.',
      'hero.tagline':'EL RITMO CREA CLARIDAD.','hero.tag.business':'DISEÑO DE NEGOCIO','hero.tag.product':'PRODUCTO','hero.tag.ai':'IA','hero.tag.story':'STORYTELLING',
      'hero.cta1':'VER MIS CASOS ↓','hero.signature':'DONDE OTROS VEN RUIDO · YO ENCUENTRO EL RITMO.','hero.scroll':'DESLIZA PARA SEGUIR EL RITMO',
      'why.eyebrow':'POR QUÉ','why.title':'ME GUSTA<br>RESOLVER<br><span class="red">PROBLEMAS.</span>',
      'why.body1':'Me interesa entender qué está frenando algo antes de decidir cómo resolverlo. Los roles, industrias y herramientas cambian; el patrón no: entender el problema, conectar las piezas, hacerlo tangible y generar movimiento.',
      'why.body2':'Empiezo por la pregunta correcta. Después elijo la herramienta que mejor ayuda a avanzar.',
      'why.p1':'ENTENDER EL PROBLEMA','why.p2':'CONECTAR LAS PIEZAS','why.p3':'HACERLO TANGIBLE','why.p4':'GENERAR MOVIMIENTO','why.pull':'CONVERTIR COMPLEJIDAD EN POSIBILIDAD.',
      'method.filmLabel':'02 / MÉTODO','method.filmCopy':'DE LA COMPLEJIDAD<br>A LA <span class="red">CLARIDAD.</span>',
      'method.stage':'ENTENDER → CONECTAR → CREAR → MOVER → APRENDER','method.eyebrow':'CÓMO TRABAJO','method.title':'ENCUENTRA EL<br><span class="red">RITMO.</span>',
      'method.lead':'No parto de un framework. Parto del problema y sigo un ritmo simple que permite aprender antes de escalar.','method.loop':'ENTENDER → CONECTAR → CREAR → MOVER → APRENDER ↻',
      'method.s1.num':'01 / ENTENDER','method.s1.title':'ENCUENTRA EL PROBLEMA REAL.','method.understand':'Entender el problema real: personas, contexto, procesos, datos y restricciones.','method.s1.actions':'ESCUCHAR · OBSERVAR · PREGUNTAR · INVESTIGAR','method.s1.q':'¿QUÉ PROBLEMA ESTAMOS RESOLVIENDO REALMENTE?',
      'method.s2.num':'02 / CONECTAR','method.s2.title':'ENCUENTRA EL PATRÓN.','method.connect':'Conectar información que vive separada hasta encontrar el patrón que explica lo que ocurre.','method.s2.actions':'PERSONAS · NEGOCIO · DATOS · TECNOLOGÍA','method.s2.q':'EL RITMO CREA CLARIDAD.',
      'method.s3.num':'03 / CREAR','method.s3.title':'HAZLO TANGIBLE.','method.create':'Convertir una idea en algo visible y testeable: hipótesis, prototipo y producto.','method.s3.actions':'IDEA · HIPÓTESIS · PROTOTIPO · PRODUCTO','method.s3.q':'NO SOLO LO PIENSES. HAZLO.',
      'method.s4.num':'04 / MOVER','method.s4.title':'CONVIERTE IDEAS EN CAMBIO.','method.move':'Llevar la solución a adopción, decisiones, aprendizaje y resultados.','method.s4.actions':'PROBAR · APRENDER · COMUNICAR · ITERAR · ESCALAR','method.s4.q':'MOVER → APRENDER → VOLVER A MOVER.',
      'method.capEyebrow':'CAPACIDADES','cap.business':'NEGOCIO','cap.product':'PRODUCTO','cap.experience':'EXPERIENCIA','cap.technology':'TECNOLOGÍA','cap.story':'NARRATIVA','method.capTitle':'EL PROBLEMA ELIGE LA HERRAMIENTA<span class="red">.</span>','method.cap':'La herramienta viene después del problema. Elijo lo necesario para convertir claridad en movimiento.','method.close':'NO VENDO HERRAMIENTAS. LAS USO PARA RESOLVER PROBLEMAS.',
      'work.filmLabel':'03 / CASOS','work.filmCopy':'PRIMERO LA HISTORIA.<br><span class="red">EL TRABAJO ES LA PRUEBA.</span>','work.filmClose':'PROBLEMAS REALES · DECISIONES REALES · RESULTADOS MEDIBLES',
      'work.eyebrow':'CASOS SELECCIONADOS','work.title':'PREGUNTAS<br>QUE VALE LA PENA<br><span class="red">RESOLVER.</span>','work.lead':'Cuatro casos reales en banca y seguros. Cuatro formas distintas de convertir complejidad en una solución que mueve resultados.','work.kicker':'4 CASOS CLAVE · INTERBANK + RIMAC SEGUROS','work.view':'VER CASO →','work.insight':'INSIGHT',
      'impact.filmLabel':'04 / SOBRE MÍ','impact.filmCopy':'LA CLARIDAD SE CONVIERTE<br>EN <span class="red">IMPACTO.</span>','impact.filmClose':'PROBLEMA → ENTENDIMIENTO → DISEÑO → TECNOLOGÍA → IMPACTO',
      'impact.eyebrow':'IMPACTO','impact.title':'LA CLARIDAD<br>DEBE MOVER<br><span class="red">ALGO.</span>','impact.lead':'Una solución importa cuando cambia algo medible: tiempo, adopción, claridad operativa o capacidad de decidir.','impact.m1':'MENOS TIEMPO DE CONSULTA','impact.m2':'MENOS TIEMPO OPERATIVO','impact.m3':'ADOPCIÓN DE LA HERRAMIENTA','impact.m4':'CONOCIMIENTO SIEMPRE DISPONIBLE',
      'about.eyebrow':'SOBRE MÍ','about.title':'HOLA<span class="red">.</span><br>SOY ALFREDO.<br><span class="dim">RESUELVO PROBLEMAS.</span>','about.body':'He trabajado entre negocio, producto, experiencia y tecnología. Los títulos cambiaron; mi forma de trabajar no: entender algo complejo, conectar las piezas y encontrar una manera de hacerlo avanzar.','about.focusLabel':'MI FOCO','about.focus':'ENTENDER · CONECTAR · HACER TANGIBLE · MOVER','about.noteLabel':'NOTA PERSONAL','about.note':'Tocar batería también me recuerda algo simple: antes de entrar, hay que escuchar el tempo. Esa idea de escuchar, encontrar el momento y sumar al conjunto también aparece en cómo trabajo con equipos.',
      'people.filmLabel':'05 / CONTACTO','people.filmCopy':'EL BUEN TRABAJO<br><span class="red">MUEVE PERSONAS.</span>','people.filmClose':'ESCUCHAR · CREAR · AVANZAR JUNTOS',
      'test.eyebrow':'TESTIMONIOS','test.title':'PERSONAS CON LAS QUE HE <span class="red">CREADO.</span>','test.lead':'Personas con las que he trabajado de cerca en banca, seguros y producto.','test.principles':'CURIOSIDAD · CLARIDAD · PERSONAS · IMPACTO',
      'contact.title':'¿TIENES UN PROBLEMA<br>QUE TODAVÍA NO<br>TERMINA DE ENCAJAR?<span class="good">BIEN.</span>','contact.sub':'AHÍ ES DONDE ME GUSTA EMPEZAR.','contact.body':'Producto, procesos, experiencia, inteligencia artificial o simplemente un problema que todavía no está bien definido. Empecemos por entenderlo.','contact.linkedin':'VER LINKEDIN','contact.pending':'[CONTENIDO POR VALIDAR]',
      'footer.role':'Business Design & Product Strategist · Lima / Perú','footer.back':'VOLVER ARRIBA ↑','footer.principle':'EMPIEZA POR EL PROBLEMA.',
      'case.breadcrumb.home':'INICIO','case.breadcrumb.work':'CASOS','case.back':'← VOLVER A LOS CASOS','case.next':'SIGUIENTE CASO →','case.question':'LA PREGUNTA','case.noise':'EL RUIDO','case.insight':'EL INSIGHT','case.bet':'LA APUESTA','case.build':'LO CONSTRUIDO','case.impact':'EL IMPACTO','case.learning':'EL APRENDIZAJE','case.study':'CASO DE ESTUDIO'
    },
    en:{
      'loader.caption':'FIND THE RHYTHM.','film.play':'PLAY','film.pause':'PAUSE',
      'nav.why':'WHY','nav.method':'METHOD','nav.work':'WORK','nav.about':'ABOUT','nav.contact':'CONTACT',
      'hero.filmLabel':'01 / WHY','hero.kicker':'BUSINESS DESIGN + PRODUCT STRATEGY','hero.title':'I TURN<br>COMPLEXITY<br>INTO <span class="red">MOVEMENT.</span>','hero.sub':'I turn complex problems into products, experiences and strategies that move the business forward by connecting people, design and technology.','hero.tagline':'RHYTHM CREATES CLARITY.','hero.tag.business':'BUSINESS DESIGN','hero.tag.product':'PRODUCT','hero.tag.ai':'AI','hero.tag.story':'STORYTELLING','hero.cta1':'EXPLORE MY WORK ↓','hero.signature':'WHERE OTHERS SEE NOISE · I FIND THE RHYTHM.','hero.scroll':'SCROLL TO FIND THE RHYTHM',
      'why.eyebrow':'WHY','why.title':'I LIKE<br>SOLVING<br><span class="red">THINGS.</span>','why.body1':'I want to understand what is holding something back before deciding how to solve it. Roles, industries and tools change; the pattern does not: understand the problem, connect the pieces, make it tangible and create movement.','why.body2':'I start with the right question. Then I choose the tool that best helps the problem move forward.','why.p1':'UNDERSTAND THE PROBLEM','why.p2':'CONNECT THE PIECES','why.p3':'MAKE IT TANGIBLE','why.p4':'CREATE MOVEMENT','why.pull':'TURN COMPLEXITY INTO POSSIBILITY.',
      'method.filmLabel':'02 / METHOD','method.filmCopy':'FROM COMPLEXITY<br>TO <span class="red">CLARITY.</span>','method.stage':'UNDERSTAND → CONNECT → CREATE → MOVE → LEARN','method.eyebrow':'HOW I WORK','method.title':'FIND THE<br><span class="red">RHYTHM.</span>','method.lead':'I do not start with a framework. I start with the problem and follow a simple rhythm that creates learning before scale.','method.loop':'UNDERSTAND → CONNECT → CREATE → MOVE → LEARN ↻',
      'method.s1.num':'01 / UNDERSTAND','method.s1.title':'FIND THE REAL PROBLEM.','method.understand':'Understand the real problem: people, context, processes, data and constraints.','method.s1.actions':'LISTEN · OBSERVE · QUESTION · RESEARCH','method.s1.q':'WHAT PROBLEM ARE WE ACTUALLY SOLVING?',
      'method.s2.num':'02 / CONNECT','method.s2.title':'FIND THE PATTERN.','method.connect':'Connect information that normally lives apart until the pattern becomes visible.','method.s2.actions':'PEOPLE · BUSINESS · DATA · TECHNOLOGY','method.s2.q':'RHYTHM CREATES CLARITY.',
      'method.s3.num':'03 / CREATE','method.s3.title':'MAKE IT TANGIBLE.','method.create':'Turn an idea into something visible and testable: hypothesis, prototype and product.','method.s3.actions':'IDEA · HYPOTHESIS · PROTOTYPE · PRODUCT','method.s3.q':"DON'T JUST THINK IT. MAKE IT.",
      'method.s4.num':'04 / MOVE','method.s4.title':'TURN IDEAS INTO CHANGE.','method.move':'Move the solution into adoption, decisions, learning and results.','method.s4.actions':'TEST · LEARN · COMMUNICATE · ITERATE · SCALE','method.s4.q':'MOVE → LEARN → MOVE AGAIN.',
      'method.capEyebrow':'CAPABILITIES','cap.business':'BUSINESS','cap.product':'PRODUCT','cap.experience':'EXPERIENCE','cap.technology':'TECHNOLOGY','cap.story':'STORY','method.capTitle':'THE PROBLEM CHOOSES THE TOOL<span class="red">.</span>','method.cap':'The tool comes after the problem. I choose what is needed to turn clarity into movement.','method.close':"I DON'T SELL TOOLS. I USE THEM TO SOLVE PROBLEMS.",
      'work.filmLabel':'03 / WORK','work.filmCopy':'STORY FIRST.<br><span class="red">WORK AS PROOF.</span>','work.filmClose':'REAL PROBLEMS · REAL DECISIONS · MEASURABLE RESULTS','work.eyebrow':'SELECTED WORK','work.title':'QUESTIONS<br>WORTH<br><span class="red">SOLVING.</span>','work.lead':'Four real cases across banking and insurance. Four different ways of turning complexity into solutions that move results.','work.kicker':'4 FLAGSHIP CASES · INTERBANK + RIMAC SEGUROS','work.view':'VIEW CASE →','work.insight':'INSIGHT',
      'impact.filmLabel':'04 / ABOUT','impact.filmCopy':'CLARITY BECOMES<br><span class="red">IMPACT.</span>','impact.filmClose':'PROBLEM → UNDERSTANDING → DESIGN → TECHNOLOGY → IMPACT','impact.eyebrow':'IMPACT','impact.title':'CLARITY<br>SHOULD MOVE<br><span class="red">SOMETHING.</span>','impact.lead':'A solution matters when it changes something measurable: time, adoption, operational clarity or the ability to decide.','impact.m1':'LESS CONSULTATION TIME','impact.m2':'LESS OPERATIONAL TIME','impact.m3':'TOOL ADOPTION','impact.m4':'KNOWLEDGE ALWAYS AVAILABLE',
      'about.eyebrow':'ABOUT','about.title':'HI<span class="red">.</span><br>I\'M ALFREDO.<br><span class="dim">I SOLVE PROBLEMS.</span>','about.body':'I have worked across business, product, experience and technology. The titles changed; my way of working did not: understand something complex, connect the pieces and find a way to move it forward.','about.focusLabel':'MY FOCUS','about.focus':'UNDERSTAND · CONNECT · MAKE TANGIBLE · MOVE','about.noteLabel':'PERSONAL NOTE','about.note':'Playing drums also reminds me of something simple: before you come in, you listen to the tempo. That habit of listening, finding the right moment and adding to the whole also shapes how I work with teams.',
      'people.filmLabel':'05 / CONTACT','people.filmCopy':'GOOD WORK<br><span class="red">MOVES PEOPLE.</span>','people.filmClose':'LISTEN · CREATE · MOVE TOGETHER','test.eyebrow':'TESTIMONIALS','test.title':'PEOPLE I\'VE CREATED <span class="red">WITH.</span>','test.lead':'People I have worked closely with across banking, insurance and product.','test.principles':'CURIOSITY · CLARITY · PEOPLE · IMPACT',
      'contact.title':'HAVE A PROBLEM<br>YOU CAN\'T<br>QUITE CRACK?<span class="good">GOOD.</span>','contact.sub':"THAT'S WHERE I LIKE TO START.",'contact.body':'Product, processes, experience, artificial intelligence — or simply a problem that is not well defined yet. Let us start by understanding it.','contact.linkedin':'VIEW LINKEDIN','contact.pending':'[CONTENT TO VALIDATE]',
      'footer.role':'Business Design & Product Strategist · Lima / Peru','footer.back':'BACK TO TOP ↑','footer.principle':'START WITH THE PROBLEM.',
      'case.breadcrumb.home':'HOME','case.breadcrumb.work':'WORK','case.back':'← BACK TO WORK','case.next':'NEXT CASE →','case.question':'THE QUESTION','case.noise':'THE NOISE','case.insight':'THE INSIGHT','case.bet':'THE BET','case.build':'THE BUILD','case.impact':'THE IMPACT','case.learning':'THE LEARNING','case.study':'CASE STUDY'
    }
  }
};

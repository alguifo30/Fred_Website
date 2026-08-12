window.FRED_CONTENT = {
  /* Logo per organisation. Keys must match `organization` exactly. */
  clientMarks:{
    'INTERBANK':'assets/brand/clients/interbank.png',
    'RIMAC SEGUROS':'assets/brand/clients/rimac.png',
    'MIBOLSILLO':'assets/brand/clients/mibolsillo.png',
    'YELLOW BRAIN':'assets/brand/clients/yellow-brain.png'
  },
  contact:{
    linkedin:'https://linkedin.com/in/alfredo-aguirre-fonseca-49946932',
    email:'',cv:''
  },
  projects:[
    {
      id:'genai-knowledge', number:'01', flagship:true,
      category:{es:'IA GENERATIVA · BANCA',en:'GENAI · BANKING'}, organization:'INTERBANK', year:'2023',
      title:{es:'Asistente Inteligente para Asesores',en:'Intelligent Assistant for Advisors'},
      metric:'97%', metricLabel:{es:'menos tiempo de consulta',en:'less consultation time'},
      question:{es:'¿Y si encontrar la respuesta correcta tomara segundos en vez de minutos?',en:'What if finding the right answer took seconds instead of minutes?'},
      summary:{es:'Convertí conocimiento disperso en una experiencia conversacional que entrega respuestas útiles durante la atención.',en:'I turned distributed knowledge into a conversational experience that delivers useful answers during service.'},
      noise:{es:'El conocimiento existía, pero estaba distribuido y encontrar la respuesta correcta consumía tiempo durante la atención.',en:'The knowledge existed, but it was distributed and finding the right answer consumed time during service.'},
      insight:{es:'El problema no era falta de información. Era acceso al conocimiento en el momento exacto en que hacía falta.',en:'The problem was not missing information. It was access to knowledge at the exact moment it was needed.'},
      bet:{es:'Reducir la distancia entre una pregunta y la respuesta útil mediante una experiencia conversacional apoyada por IA generativa.',en:'Reduce the distance between a question and a useful answer through a conversational experience powered by generative AI.'},
      build:['Knowledge Architecture','Conversational UX','Generative AI','AI Search','Prompt Design','Testing'],
      impact:{es:'97% menos tiempo de consulta.',en:'97% less consultation time.'},
      learning:{es:'La IA crea valor cuando desaparece detrás de una mejor experiencia.',en:'AI creates value when it disappears behind a better experience.'}
    },
    {
      id:'process-redesign', number:'02', flagship:true,
      category:{es:'SERVICE DESIGN · SEGUROS',en:'SERVICE DESIGN · INSURANCE'}, organization:'RIMAC SEGUROS', year:'2020',
      title:{es:'Flujo Digital de Pólizas End-to-End',en:'End-to-End Digital Policy Flow'},
      metric:'3 DÍAS → 10 MIN', metricLabel:{es:'ciclo operativo',en:'operational cycle'},
      question:{es:'¿Y si un proceso de tres días pudiera resolverse en minutos?',en:'What if a three-day process could be completed in minutes?'},
      summary:{es:'Rediseñé de raíz un proceso fragmentado, eliminando esperas y handoffs antes de digitalizar la experiencia.',en:'I redesigned a fragmented process end-to-end, removing waits and handoffs before digitizing the experience.'},
      noise:{es:'Esperas, pasos manuales y múltiples puntos de fricción extendían el tiempo total del proceso.',en:'Waiting, manual steps and multiple friction points extended the end-to-end process time.'},
      insight:{es:'Digitalizar sin simplificar mantiene la complejidad dentro de una pantalla.',en:'Digitizing without simplifying keeps the complexity inside a screen.'},
      bet:{es:'Rediseñar el flujo AS-IS / TO-BE, eliminar pasos y handoffs innecesarios y recién entonces digitalizar la experiencia.',en:'Redesign the AS-IS / TO-BE flow, remove unnecessary steps and handoffs, and only then digitize the experience.'},
      build:['Service Design','AS-IS / TO-BE','Pain Points','Process Redesign','APIs','Digital Experience'],
      impact:{es:'El ciclo pasó de 3 días a 10 minutos.',en:'The cycle moved from 3 days to 10 minutes.'},
      learning:{es:'A veces innovar no es sumar tecnología. Es retirar complejidad innecesaria.',en:"Sometimes innovation isn't adding more technology. It's removing unnecessary complexity."}
    },
    {
      id:'product-adoption', number:'03', flagship:true,
      category:{es:'PRODUCTO DIGITAL · SEGUROS',en:'DIGITAL PRODUCT · INSURANCE'}, organization:'RIMAC SEGUROS', year:'2019–2020',
      title:{es:'Portal de Autogestión para Corredores',en:'Broker Self-Service Portal'},
      metric:'+25 PP', metricLabel:{es:'adopción de producto · 60% → 85%',en:'product adoption · 60% → 85%'},
      question:{es:'¿Y si el problema no fuera el producto, sino la experiencia?',en:"What if the product wasn't the problem, but the experience?"},
      summary:{es:'Investigación y rediseño para convertir una solución existente en una experiencia que las personas realmente utilizaran.',en:'Research and redesign to turn an existing solution into an experience people would actually use.'},
      noise:{es:'La adopción estaba por debajo de su potencial y el flujo todavía dependía de fricciones operativas y hábitos previos.',en:'Adoption was below its potential and the flow still depended on operational friction and previous habits.'},
      insight:{es:'La pregunta correcta no era “¿qué funcionalidad falta?”, sino “¿qué está ocurriendo en la experiencia?”.',en:'The right question was not “what is missing?”, but “what is happening in the experience?”.'},
      bet:{es:'Rediseñar la experiencia, acompañar el cambio y aprender con iteraciones enfocadas en uso real.',en:'Redesign the experience, support the change and learn through iterations focused on real usage.'},
      build:['UX Research','Journey Redesign','Product Adjustments','Communication','Training','Iteration'],
      impact:{es:'La adopción pasó de 60% a 85%: +25 puntos porcentuales.',en:'Adoption increased from 60% to 85%: +25 percentage points.'},
      learning:{es:'Un producto no es exitoso cuando se lanza. Es exitoso cuando las personas lo usan.',en:"A product isn't successful when it's launched. It's successful when people use it."}
    },
    {
      id:'vision-360', number:'04', flagship:true,
      category:{es:'AGENTE IA · BANCA',en:'AI AGENT · BANKING'}, organization:'INTERBANK', year:'2024 – PRESENTE',
      title:{es:'Agente Conversacional de Onboarding',en:'Conversational Onboarding Agent'},
      metric:'24/7', metricLabel:{es:'conocimiento disponible',en:'knowledge available'},
      question:{es:'¿Y si el conocimiento del equipo estuviera disponible cuando alguien lo necesita?',en:'What if team knowledge were available exactly when someone needed it?'},
      summary:{es:'Un agente conversacional para convertir conocimiento clave del equipo en una capacidad accesible y escalable.',en:'A conversational agent that turns key team knowledge into an accessible and scalable capability.'},
      noise:{es:'El conocimiento de onboarding dependía de personas clave y no siempre estaba disponible cuando alguien lo necesitaba.',en:'Onboarding knowledge depended on key people and was not always available when someone needed it.'},
      insight:{es:'El conocimiento se vuelve escalable cuando deja de depender únicamente de quién está disponible.',en:'Knowledge becomes scalable when it no longer depends only on who is available.'},
      bet:{es:'Diseñar una experiencia conversacional que convierta conocimiento del equipo en orientación accesible bajo demanda.',en:'Design a conversational experience that turns team knowledge into guidance accessible on demand.'},
      build:['Conversational AI','Generative AI','Agent Design','Knowledge Architecture','Prompt Design'],
      impact:{es:'Conocimiento disponible 24/7 como capacidad compartida del equipo.',en:'Team knowledge available 24/7 as a shared capability.'},
      learning:{es:'El mejor conocimiento es el que aparece cuando hace falta, sin agregar fricción.',en:'The best knowledge appears when it is needed without adding friction.'}
    },
    {
      id:'mibolsillo', number:'05', flagship:false,
      category:{es:'STARTUP · FINTECH · UX RESEARCH',en:'STARTUP · FINTECH · UX RESEARCH'}, organization:'MIBOLSILLO', year:'2022',
      title:{es:'UX Research para una experiencia financiera más simple',en:'UX Research for a simpler financial experience'},
      metric:'4', metricLabel:{es:'perfiles de comportamiento',en:'behavioral profiles'},
      question:{es:'¿Y si organizar tus finanzas fuera más fácil que registrarlas?',en:'What if managing your money felt easier than tracking it?'},
      summary:{es:'Investigamos hábitos, fricciones y necesidades para convertir comportamientos dispersos en perfiles y oportunidades concretas de producto.',en:'We researched habits, friction and needs to turn scattered behaviors into profiles and concrete product opportunities.'},
      noise:{es:'La experiencia tenía fricciones en registro, edición, claridad y motivación; al mismo tiempo, las personas querían entender su progreso y recibir orientación.',en:'The experience had friction around tracking, editing, clarity and motivation; at the same time, people wanted to understand their progress and receive guidance.'},
      insight:{es:'Las personas no querían registrar más información. Querían entender qué hacer con ella.',en:'People did not want to track more information. They wanted to understand what to do with it.'},
      bet:{es:'Mover la experiencia de “registrar movimientos” a “entender dónde estoy y qué puedo hacer ahora”.',en:'Move the experience from “tracking transactions” to “understanding where I am and what I can do next”.'},
      build:['UX Research','Benchmark','Behavioral Patterns','User Personas','Experience Review','Product Recommendations','Wireframe Feedback'],
      impact:{es:'4 perfiles de comportamiento con necesidades diferenciadas como base para priorizar la evolución de la experiencia.',en:'4 behavioral profiles with different needs became a foundation for prioritizing the experience evolution.'},
      learning:{es:'Un producto financiero crea valor cuando los datos ayudan a decidir.',en:'A financial product creates value when data helps people decide.'}
    },
    {
      id:'yellow-brain-research', number:'06', flagship:false,
      category:{es:'CONSULTING · UX RESEARCH · SERVICE DESIGN',en:'CONSULTING · UX RESEARCH · SERVICE DESIGN'}, organization:'YELLOW BRAIN', year:'2021–2022',
      title:{es:'UX Research + Service Design para conectar un ecosistema',en:'UX Research + Service Design for a connected ecosystem'},
      metric:'59', metricLabel:{es:'acciones de investigación',en:'research activities'},
      question:{es:'¿Y si entender todo el ecosistema cambiara la solución?',en:'What if understanding the whole ecosystem changed the solution?'},
      summary:{es:'Desde Yellow Brain investigamos una experiencia con múltiples actores y convertimos hallazgos de campo en principios, conceptos de servicio y un roadmap.',en:'At Yellow Brain, we researched a multi-actor experience and turned field insights into principles, service concepts and a roadmap.'},
      noise:{es:'Múltiples actores necesitaban tomar decisiones y coordinar actividades dentro de una experiencia fragmentada. La fricción de uno impactaba directamente en los demás.',en:'Multiple actors needed to make decisions and coordinate activities across a fragmented experience. One actor’s friction directly affected the others.'},
      insight:{es:'No era solo un problema de proceso. Era un problema de confianza y coordinación.',en:'It was not just a process problem. It was a problem of trust and coordination.'},
      bet:{es:'En lugar de diseñar una solución aislada, entender y conectar las necesidades de todo el ecosistema.',en:'Instead of designing an isolated solution, understand and connect the needs of the whole ecosystem.'},
      build:['UX Research','31 In-depth Interviews','5 Shadowing Sessions','23 Field Visits','Journey Mapping','Service Design','Concept Testing','Roadmap'],
      impact:{es:'59 acciones de investigación; los hallazgos se tradujeron en 3 conceptos de servicio, validados posteriormente con 14 participantes, y un roadmap de evolución.',en:'59 research activities; insights became 3 service concepts, later validated with 14 participants, and an evolution roadmap.'},
      learning:{es:'Service Design no es conectar pantallas. Es conectar personas, necesidades y confianza.',en:'Service Design is not about connecting screens. It is about connecting people, needs and trust.'}
    }
  ],
  testimonials:[
    {initials:'MM',name:'Mauricio Miranda',role:'Product Owner · Interbank',quote:{es:'Alfredo tiene una capacidad poco común: entiende la tecnología tan bien como el negocio, y siempre encuentra la forma de conectar ambos mundos. Su enfoque en el usuario marca la diferencia en cada proyecto.',en:'Alfredo has a rare ability: he understands technology as well as the business and consistently finds a way to connect both worlds. His user focus makes a difference in every project.'}},
    {initials:'SM',name:'Sebastián Mirvois',role:'Product Owner · Rimac Seguros',quote:{es:'Trabajar con Alfredo es trabajar con alguien que primero escucha y luego propone. Su rediseño de procesos transformó por completo nuestros tiempos operativos. Un profesional estratégico y muy humano.',en:'Working with Alfredo means working with someone who listens first and proposes second. His process redesign transformed our operational times. A strategic and deeply human professional.'}}
  ],
  i18n:{
    es:{
      'loader.caption':'ENCUENTRA EL RITMO.','nav.home':'INICIO','nav.work':'CASOS','nav.method':'MÉTODO','nav.about':'SOBRE MÍ','nav.contact':'CONTACTO',
      'proof.eyebrow':'CASOS DE ÉXITO','proof.title':'Resultados en proyectos reales','proof.c1':'Asistente inteligente para asesores · Interbank','proof.c2':'Flujo digital de pólizas · Rimac Seguros','proof.c3':'Portal de autogestión · Rimac Seguros','proof.c4':'Banca · Seguros · Startups · Consultoría','hero.eyebrow':'DISEÑO DE NEGOCIO · ESTRATEGIA DE PRODUCTO · UX · IA','hero.title':'Convierto complejidad en <span class="red">resultados.</span>','hero.lead':'Conecto negocio, producto, experiencia y tecnología para resolver lo que frena el avance.','hero.ctaWork':'VER CASOS ↓','hero.ctaTalk':'HABLEMOS ↗','hero.principle':'Empiezo por el problema.','hero.principle2':'El problema elige la herramienta.','hero.videoLine':'RHYTHM CREATES CLARITY.','hero.m1':'menos tiempo de consulta','hero.m2':'proceso rediseñado de principio a fin','hero.m3':'más adopción de producto','hero.m4':'años resolviendo problemas',
      'work.eyebrow':'CASOS','work.title':'Trabajo que mueve algo.','work.lead':'El resultado primero. La historia completa, dentro de cada caso.','work.note':'Banca · Seguros · Fintech · Consultoría','work.view':'VER CASO →','work.otherEyebrow':'OTROS CASOS','work.otherTitle':'Más problemas que valía la pena entender.','work.otherLead':'Research y Service Design: de comportamientos reales a decisiones de producto.',
      'method.eyebrow':'CÓMO TRABAJO','method.title':'Empiezo por el problema, no por la solución.','method.lead':'Entender antes de construir. Aprender antes de escalar.','method.s1':'ENTENDER','method.s1body':'Escuchar y encontrar el problema real.','method.s2':'CONECTAR','method.s2body':'Unir personas, negocio, datos y tecnología.','method.s3':'CREAR','method.s3body':'Convertir claridad en algo visible y testeable.','method.s4':'MOVER','method.s4body':'Llevarlo a adopción y resultado.','method.toolNum':'LA CAJA DE HERRAMIENTAS','method.toolClose':'No vendo herramientas. Las uso para resolver problemas.','method.g1':'Negocio','method.g2':'Experiencia','method.g3':'Tecnología','method.g4':'Narrativa','method.toolEyebrow':'El problema elige la herramienta.','method.toolLead':'Uso la disciplina que el problema pide, no la que está de moda.',
      'about.eyebrow':'SOBRE MÍ','about.title':'Estrategia, diseño y tecnología. En el orden que el problema pida.','about.name':'Soy Alfredo Aguirre.','about.body1':'Trabajo entre negocio, producto y tecnología: entender algo complejo, conectar las piezas y encontrar cómo hacerlo avanzar.','about.body2':'Banca, seguros, startups y consultoría — bajando ideas a procesos, productos y experiencias reales.','about.quote':'La claridad no es el resultado final. Es lo que permite que algo se mueva.','about.note':'De tocar batería me quedó una regla: antes de entrar, escucha el tempo.',
      'test.eyebrow':'REFERENCIAS','test.filmLine':'El trabajo bueno se hace acompañado.','test.title':'Con quiénes he trabajado.',
      'contact.eyebrow':'CONTACTO','contact.title':'¿Tienes un problema que todavía no termina de <span class="red">encajar?</span>','contact.good':'BIEN.','contact.body':'Ahí empiezan los proyectos que más me interesan. Conversemos.','contact.cta':'HABLEMOS EN LINKEDIN ↗',
      'footer.tagline':'RHYTHM CREATES CLARITY.','footer.role':'Business Design & Product Strategist · Lima / Perú','footer.principle':'START WITH THE PROBLEM.','footer.back':'VOLVER ARRIBA ↑',
      'case.breadcrumb.home':'INICIO','case.breadcrumb.work':'CASOS','case.back':'← VOLVER A LOS CASOS','case.next':'SIGUIENTE CASO →','case.noise':'EL RUIDO','case.insight':'EL INSIGHT','case.bet':'LA APUESTA','case.build':'LO CONSTRUIDO','case.impact':'EL IMPACTO','case.learning':'EL APRENDIZAJE','case.study':'CASO DE ESTUDIO'
    },
    en:{
      'loader.caption':'FIND THE RHYTHM.','nav.home':'HOME','nav.work':'WORK','nav.method':'METHOD','nav.about':'ABOUT','nav.contact':'CONTACT',
      'proof.eyebrow':'PROVEN RESULTS','proof.title':'Outcomes from real projects','proof.c1':'Intelligent assistant for advisors · Interbank','proof.c2':'Digital policy flow · Rimac Seguros','proof.c3':'Broker self-service portal · Rimac Seguros','proof.c4':'Banking · Insurance · Startups · Consulting','hero.eyebrow':'BUSINESS DESIGN · PRODUCT STRATEGY · UX · AI','hero.title':'I turn complexity into <span class="red">outcomes.</span>','hero.lead':'I connect business, product, experience and technology to unblock what is holding progress back.','hero.ctaWork':'VIEW WORK ↓','hero.ctaTalk':'LET’S TALK ↗','hero.principle':'I start with the problem.','hero.principle2':'The problem chooses the tool.','hero.videoLine':'RHYTHM CREATES CLARITY.','hero.m1':'less consultation time','hero.m2':'process redesigned end to end','hero.m3':'more product adoption','hero.m4':'years solving problems',
      'work.eyebrow':'WORK','work.title':'Work that moves something.','work.lead':'The outcome first. The full story lives inside each case.','work.note':'Banking · Insurance · Fintech · Consulting','work.view':'VIEW CASE →','work.otherEyebrow':'OTHER WORK','work.otherTitle':'More problems worth understanding.','work.otherLead':'Research and Service Design: from real behaviors to product decisions.',
      'method.eyebrow':'HOW I WORK','method.title':'I start with the problem, not the solution.','method.lead':'Understand before building. Learn before scaling.','method.s1':'UNDERSTAND','method.s1body':'Listen and find the real problem.','method.s2':'CONNECT','method.s2body':'Connect people, business, data and technology.','method.s3':'CREATE','method.s3body':'Turn clarity into something visible and testable.','method.s4':'MOVE','method.s4body':'Move it into adoption and results.','method.toolNum':'THE TOOLBOX','method.toolClose':"I don't sell tools. I use them to solve problems.",'method.g1':'Business','method.g2':'Experience','method.g3':'Technology','method.g4':'Story','method.toolEyebrow':'The problem chooses the tool.','method.toolLead':'I use the discipline the problem asks for, not the fashionable one.',
      'about.eyebrow':'ABOUT','about.title':'Strategy, design and technology. In whatever order the problem asks for.','about.name':'I’m Alfredo Aguirre.','about.body1':'I work between business, product and technology: understand something complex, connect the pieces, find how to move it forward.','about.body2':'Banking, insurance, startups and consulting — turning ideas into real processes, products and experiences.','about.quote':'Clarity is not the final result. It is what allows something to move.','about.note':'Playing drums left me one rule: before you come in, listen to the tempo.',
      'test.eyebrow':'REFERENCES','test.filmLine':'Good work is never done alone.','test.title':'Who I have worked with.',
      'contact.eyebrow':'CONTACT','contact.title':'Have a problem that still doesn’t quite <span class="red">fit?</span>','contact.good':'GOOD.','contact.body':'That is where the projects I enjoy most begin. Let’s talk.','contact.cta':'LET’S TALK ON LINKEDIN ↗',
      'footer.tagline':'RHYTHM CREATES CLARITY.','footer.role':'Business Design & Product Strategist · Lima / Peru','footer.principle':'START WITH THE PROBLEM.','footer.back':'BACK TO TOP ↑',
      'case.breadcrumb.home':'HOME','case.breadcrumb.work':'WORK','case.back':'← BACK TO WORK','case.next':'NEXT CASE →','case.noise':'THE NOISE','case.insight':'THE INSIGHT','case.bet':'THE BET','case.build':'THE BUILD','case.impact':'THE IMPACT','case.learning':'THE LEARNING','case.study':'CASE STUDY'
    }
  }
};

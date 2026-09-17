/**
 * Lightweight EN / PT-BR toggle for the site.
 * - Every translatable element carries data-i18n="key".
 * - The nav link .lang-toggle switches language; its .lang-label shows the
 *   language you would switch TO (PT-BR while in English, EN-US while in PT).
 * - Choice is remembered in localStorage.
 * Paper titles and author names are intentionally not translated.
 */
(function () {
  "use strict";

  var STORE = "parizi-lang";
  var DEFAULT = "en";

  var DICT = {
    "_title": {
      en: "Rafael Parizi, Ph.D. — Software Engineering Researcher",
      pt: "Rafael Parizi, Ph.D. — Pesquisador em Engenharia de Software"
    },

    /* Nav */
    "nav.home": { en: "Home", pt: "Início" },
    "nav.about": { en: "About", pt: "Sobre" },
    "nav.research": { en: "Research", pt: "Pesquisa" },
    "nav.projects": { en: "Projects", pt: "Projetos" },
    "nav.publications": { en: "Publications", pt: "Publicações" },
    "nav.service": { en: "Service", pt: "Atuação" },
    "nav.teaching": { en: "Teaching", pt: "Ensino" },
    "nav.contact": { en: "Contact", pt: "Contato" },

    /* Hero */
    "hero.pronouns": { en: "(he/him)", pt: "(ele/dele)" },
    "typed": {
      en: "Software Engineering Researcher, Software Engineering Professor, Computer Science Education Researcher",
      pt: "Pesquisador em Engenharia de Software, Professor de Engenharia de Software, Pesquisador em Educação em Computação"
    },
    "hero.tagline": {
      en: "Investigating the human and creative side of software development — Design Thinking, product discovery, user experience, and Artificial Intelligence in Computer Science education.",
      pt: "Investigando o lado humano e criativo do desenvolvimento de software — Design Thinking, product discovery, experiência do usuário e Inteligência Artificial na educação em Computação."
    },

    /* About */
    "about.title": { en: "About", pt: "Sobre" },
    "about.lead": {
      en: "I am a professor and researcher with more than a decade of experience in Computer Science. My work investigates the human, collaborative, and creative dimensions of software development — with an emphasis on Design Thinking, product discovery, user experience, and Artificial Intelligence applied to Computer Science education.",
      pt: "Sou professor e pesquisador com mais de uma década de experiência em Ciência da Computação. Meu trabalho investiga as dimensões humana, colaborativa e criativa do desenvolvimento de software — com ênfase em Design Thinking, product discovery, experiência do usuário e Inteligência Artificial aplicada à educação em Computação."
    },
    "about.h2": { en: "Researcher & Professor", pt: "Pesquisador e Professor" },
    "about.intro": {
      en: "Passionate about fostering innovation and collaboration, I bridge software engineering research and practice: bringing Design Thinking, discovery, and human-centered methods into how teams build software, and studying how these approaches change the way people learn and work.",
      pt: "Apaixonado por promover inovação e colaboração, aproximo pesquisa e prática em Engenharia de Software: levo Design Thinking, discovery e métodos centrados no ser humano para o modo como os times constroem software, e estudo como essas abordagens mudam a forma como as pessoas aprendem e trabalham."
    },
    "about.degree.label": { en: "Degree:", pt: "Formação:" },
    "about.degree.value": { en: "Ph.D. in Computer Science", pt: "Doutorado em Ciência da Computação" },
    "about.phduni.label": { en: "Ph.D. University:", pt: "Instituição do Doutorado:" },
    "about.phduni.value": {
      en: "Pontifical Catholic University of Rio Grande do Sul (PUCRS)",
      pt: "Pontifícia Universidade Católica do Rio Grande do Sul (PUCRS)"
    },
    "about.other.label": { en: "Other Degrees:", pt: "Outras formações:" },
    "about.other.value": {
      en: "M.Sc. and B.Sc. in Computer Science",
      pt: "Mestrado e Bacharelado em Ciência da Computação"
    },
    "about.focus.label": { en: "Research focus:", pt: "Foco de pesquisa:" },
    "about.focus.value": {
      en: "Design Thinking in Software Development",
      pt: "Design Thinking no Desenvolvimento de Software"
    },
    "about.role.label": { en: "Role:", pt: "Cargo:" },
    "about.role.value": { en: "Professor at IFFar, Brazil", pt: "Professor no IFFar, Brasil" },
    "about.since.label": { en: "Since:", pt: "Desde:" },
    "about.email.label": { en: "Email:", pt: "E-mail:" },
    "about.currently.label": { en: "Currently:", pt: "Atualmente:" },
    "about.currently.value": {
      en: "Coordinator of the Special Committee on Collaborative Systems (CESC) of the Brazilian Computer Society (SBC), 2026–2028",
      pt: "Coordenador da Comissão Especial de Sistemas Colaborativos (CESC) da Sociedade Brasileira de Computação (SBC), 2026–2028"
    },
    "about.recent.label": { en: "Recent roles:", pt: "Cargos recentes:" },
    "about.recent.value": {
      en: "Coordinator of the Bachelor's Degree in Information Systems · Member of the Superior Council at IFFar",
      pt: "Coordenador do Curso de Bacharelado em Sistemas de Informação · Membro do Conselho Superior do IFFar"
    },
    "about.p1": {
      en: "I hold a Ph.D. with international research experience, including a research period in Germany. I have presented my work at conferences in Brazil, Argentina, Germany, Canada, and Finland.",
      pt: "Tenho doutorado com experiência internacional de pesquisa, incluindo um período de pesquisa na Alemanha. Apresentei meus trabalhos em conferências no Brasil, Argentina, Alemanha, Canadá e Finlândia."
    },
    "about.p2": {
      en: "Over the past decade I have coordinated more than seven research projects and trained professionals for both industry and academia. I also actively contribute to the organization of national and international conferences.",
      pt: "Na última década, coordenei mais de sete projetos de pesquisa e formei profissionais tanto para a indústria quanto para a academia. Também contribuo ativamente com a organização de conferências nacionais e internacionais."
    },

    /* Stats */
    "stats.students": { en: "Students mentored in Information Technology", pt: "Estudantes orientados em Tecnologia da Informação" },
    "stats.projects": { en: "Research projects led as principal investigator", pt: "Projetos de pesquisa liderados como coordenador" },
    "stats.hours": { en: "Hours of Computer Science teaching", pt: "Horas de ensino em Computação" },
    "stats.confs": { en: "Conferences served as organizing member", pt: "Conferências com atuação na organização" },
    "stats.workshops": { en: "Hours facilitating Design Thinking workshops", pt: "Horas facilitando workshops de Design Thinking" },
    "stats.awards": { en: "Best-paper and reviewer recognitions", pt: "Reconhecimentos de melhor artigo e de revisor" },

    /* Research */
    "research.title": { en: "Research", pt: "Pesquisa" },
    "research.lead": {
      en: "My research investigates how human-centered and creative practices shape the way software is designed, built, and taught. These are the lines of inquiry I am currently active in.",
      pt: "Minha pesquisa investiga como práticas criativas e centradas no ser humano moldam a forma como o software é projetado, construído e ensinado. Estas são as linhas de investigação em que atuo atualmente."
    },
    "research.dt.h": { en: "Design Thinking in Software Development", pt: "Design Thinking no Desenvolvimento de Software" },
    "research.dt.p": {
      en: "How Design Thinking practices can be integrated into software processes to foster innovation, collaboration, and shared understanding within development teams.",
      pt: "Como práticas de Design Thinking podem ser integradas aos processos de software para promover inovação, colaboração e entendimento compartilhado nos times de desenvolvimento."
    },
    "research.discovery.h": { en: "Product Discovery & Requirements", pt: "Product Discovery e Requisitos" },
    "research.discovery.p": {
      en: "Techniques that help teams decide what to build — discovery practices, hypothesis validation, and the bridge between business intent and software requirements.",
      pt: "Técnicas que ajudam os times a decidir o que construir — práticas de discovery, validação de hipóteses e a ponte entre a intenção de negócio e os requisitos de software."
    },
    "research.ux.h": { en: "User Experience in Development Teams", pt: "Experiência do Usuário em Times de Desenvolvimento" },
    "research.ux.p": {
      en: "How UX thinking is adopted (or resisted) by software teams, and the human aspects — motivation, communication, empathy — that influence software quality.",
      pt: "Como o pensamento de UX é adotado (ou resistido) pelos times de software, e os aspectos humanos — motivação, comunicação, empatia — que influenciam a qualidade do software."
    },
    "research.ai.h": { en: "AI in Computer Science Education", pt: "IA na Educação em Computação" },
    "research.ai.p": {
      en: "Using Artificial Intelligence to support and personalize learning in Computer Science, and studying its effects on how students learn to build software.",
      pt: "Uso de Inteligência Artificial para apoiar e personalizar a aprendizagem em Computação, e o estudo dos seus efeitos sobre como os estudantes aprendem a construir software."
    },
    "research.cv.h": { en: "Computer Vision for Agile Projects", pt: "Visão Computacional em Projetos Ágeis" },
    "research.cv.p": {
      en: "Applying Computer Vision to physical agile artifacts (boards, notes, ceremonies) to generate feedback and increase transparency and efficiency in Agile teams.",
      pt: "Aplicação de Visão Computacional a artefatos ágeis físicos (quadros, notas, cerimônias) para gerar feedback e aumentar a transparência e a eficiência dos times ágeis."
    },
    "research.cscw.h": { en: "Collaborative Systems (CSCW)", pt: "Sistemas Colaborativos (CSCW)" },
    "research.cscw.p": {
      en: "Collaborative and social computing applied to software development, connected to my role in the SBC Special Committee on Collaborative Systems (CESC).",
      pt: "Computação colaborativa e social aplicada ao desenvolvimento de software, conectada à minha atuação na Comissão Especial de Sistemas Colaborativos (CESC) da SBC."
    },

    /* Projects */
    "projects.title": { en: "Projects & Labs", pt: "Projetos e Laboratórios" },
    "projects.lead": {
      en: "Research projects and laboratories I currently coordinate, focused on innovative solutions in software engineering, education, and technology.",
      pt: "Projetos de pesquisa e laboratórios que coordeno atualmente, focados em soluções inovadoras em Engenharia de Software, educação e tecnologia."
    },
    "projects.lab.h": { en: "Lab Ideas — a Design Thinking Laboratory", pt: "Lab Ideias — um Laboratório de Design Thinking" },
    "projects.lab.when": { en: "2020 – Current", pt: "2020 – Atual" },
    "projects.lab.p": {
      en: "A laboratory dedicated to fostering creativity for software development, connecting students, researchers, and practitioners around discovery and Design Thinking.",
      pt: "Um laboratório dedicado a promover a criatividade para o desenvolvimento de software, conectando estudantes, pesquisadores e profissionais em torno de discovery e Design Thinking."
    },
    "projects.dt.h": { en: "Design Thinking in Software Development", pt: "Design Thinking no Desenvolvimento de Software" },
    "projects.dt.when": { en: "2019 – Current", pt: "2019 – Atual" },
    "projects.dt.p": {
      en: "Investigating how Design Thinking can drive innovation and collaboration in software development, and how teams adopt these practices in real settings.",
      pt: "Investiga como o Design Thinking pode impulsionar inovação e colaboração no desenvolvimento de software, e como os times adotam essas práticas em contextos reais."
    },
    "projects.ai.h": { en: "Artificial Intelligence in Computer Science Education", pt: "Inteligência Artificial na Educação em Computação" },
    "projects.ai.when": { en: "2022 – Current", pt: "2022 – Atual" },
    "projects.ai.p": {
      en: "Exploring Artificial Intelligence to innovate and enhance learning in Computer Science education.",
      pt: "Explora a Inteligência Artificial para inovar e aprimorar a aprendizagem na educação em Computação."
    },
    "projects.cv.h": { en: "Computer Vision Applied to Agile Projects", pt: "Visão Computacional Aplicada a Projetos Ágeis" },
    "projects.cv.when": { en: "2023 – Current", pt: "2023 – Atual" },
    "projects.cv.p": {
      en: "Applying Computer Vision to enhance feedback and efficiency in Agile projects.",
      pt: "Aplica Visão Computacional para aprimorar o feedback e a eficiência em projetos ágeis."
    },

    /* Publications */
    "pub.title": { en: "Publications", pt: "Publicações" },
    "pub.lead": {
      en: "Recent publications on collaborative systems, Design Thinking, human aspects of software engineering, and Computer Science education. For the complete and up-to-date list, please see my Lattes CV and Google Scholar profile.",
      pt: "Publicações recentes sobre sistemas colaborativos, Design Thinking, aspectos humanos da Engenharia de Software e educação em Computação. Para a lista completa e atualizada, consulte meu Currículo Lattes e o perfil no Google Scholar."
    },
    "pub.col1title2026": { en: "Conference & Workshop Papers — 2026", pt: "Artigos em Conferências e Workshops — 2026" },
    "pub.col1title": { en: "Journal Articles & Book Chapters", pt: "Artigos em Periódicos e Capítulos de Livro" },
    "pub.col1title2024": { en: "Conference & Workshop Papers — 2024", pt: "Artigos em Conferências e Workshops — 2024" },
    "pub.col2title2025": { en: "Conference & Workshop Papers — 2025", pt: "Artigos em Conferências e Workshops — 2025" },
    "pub.i1.meta": { en: "2025 · Journal article", pt: "2025 · Artigo em periódico" },
    "pub.i1.venue": { en: "Accepted for publication in the SOL journal.", pt: "Aceito para publicação na revista SOL." },
    "pub.i2.meta": { en: "2024 · Book chapter", pt: "2024 · Capítulo de livro" },
    "pub.i3.venue": {
      en: "Simpósio Brasileiro de Educação em Computação (EduComp), Brazil.",
      pt: "Simpósio Brasileiro de Educação em Computação (EduComp), Brasil."
    },
    "pub.i4.venue": {
      en: "Anais Estendidos do Simpósio Brasileiro de Sistemas Colaborativos (SBSC), Brazil.",
      pt: "Anais Estendidos do Simpósio Brasileiro de Sistemas Colaborativos (SBSC), Brasil."
    },
    "pub.i5.venue": {
      en: "Anais Estendidos do Simpósio Brasileiro de Sistemas Colaborativos (SBSC), Brazil.",
      pt: "Anais Estendidos do Simpósio Brasileiro de Sistemas Colaborativos (SBSC), Brasil."
    },
    "pub.i6.venue": {
      en: "Simpósio Brasileiro de Sistemas Colaborativos (SBSC), Brazil.",
      pt: "Simpósio Brasileiro de Sistemas Colaborativos (SBSC), Brasil."
    },
    "pub.i7.venue": {
      en: "Simpósio Brasileiro de Sistemas Colaborativos (SBSC), Brazil.",
      pt: "Simpósio Brasileiro de Sistemas Colaborativos (SBSC), Brasil."
    },
    "pub.i8.venue": {
      en: "Simpósio Brasileiro de Sistemas Colaborativos (SBSC), Brazil.",
      pt: "Simpósio Brasileiro de Sistemas Colaborativos (SBSC), Brasil."
    },
    "pub.i9.venue": {
      en: "Simpósio Brasileiro de Engenharia de Software (SBES), Recife, Brazil.",
      pt: "Simpósio Brasileiro de Engenharia de Software (SBES), Recife, Brasil."
    },
    "pub.i10.venue": {
      en: "Brazilian Software Quality Symposium (SBQS), São José dos Campos, Brazil.",
      pt: "Simpósio Brasileiro de Qualidade de Software (SBQS), São José dos Campos, Brasil."
    },
    "pub.i11.venue": {
      en: "Simpósio Brasileiro de Sistemas Colaborativos (SBSC), Porto Alegre, Brazil.",
      pt: "Simpósio Brasileiro de Sistemas Colaborativos (SBSC), Porto Alegre, Brasil."
    },
    "pub.i12.venue": {
      en: "Simpósio Brasileiro de Sistemas Colaborativos (SBSC), Porto Alegre, Brazil.",
      pt: "Simpósio Brasileiro de Sistemas Colaborativos (SBSC), Porto Alegre, Brasil."
    },
    "pub.i13.venue": {
      en: "Simpósio Brasileiro de Sistemas Colaborativos (SBSC), Brazil.",
      pt: "Simpósio Brasileiro de Sistemas Colaborativos (SBSC), Brasil."
    },

    /* Academic Service */
    "service.title": { en: "Academic Service & Recognition", pt: "Atuação Acadêmica e Reconhecimento" },
    "service.lead": {
      en: "Roles and contributions to the research community, program committees, and my institution.",
      pt: "Cargos e contribuições para a comunidade de pesquisa, comitês de programa e minha instituição."
    },
    "service.col1": { en: "Community & Committees", pt: "Comunidade e Comissões" },
    "service.cesc.h": {
      en: "Coordinator — Special Committee on Collaborative Systems (CESC)",
      pt: "Coordenador — Comissão Especial de Sistemas Colaborativos (CESC)"
    },
    "service.cesc.em": { en: "Brazilian Computer Society (SBC)", pt: "Sociedade Brasileira de Computação (SBC)" },
    "service.cesc.p": {
      en: "Leading the national research community on collaborative systems and CSCW applied to software development. Previously Co-Coordinator.",
      pt: "Lidero a comunidade nacional de pesquisa em sistemas colaborativos e CSCW aplicados ao desenvolvimento de software. Anteriormente Vice-coordenador."
    },
    "service.confs.h": { en: "Conference organization & program committees", pt: "Organização de conferências e comitês de programa" },
    "service.confs.em": { en: "National and international venues", pt: "Eventos nacionais e internacionais" },
    "service.confs.p": {
      en: "Organizing-committee member for 8+ conferences and reviewer for software engineering and computing education venues, with best-paper and outstanding-reviewer recognitions.",
      pt: "Membro de comitê organizador de mais de 8 conferências e revisor em eventos de Engenharia de Software e de educação em Computação, com reconhecimentos de melhor artigo e de revisor destaque."
    },
    "service.intl.h": { en: "International research experience", pt: "Experiência internacional de pesquisa" },
    "service.intl.em": { en: "Germany (research period)", pt: "Alemanha (período de pesquisa)" },
    "service.intl.p": {
      en: "Work presented at conferences in Brazil, Argentina, Germany, Canada, and Finland.",
      pt: "Trabalhos apresentados em conferências no Brasil, Argentina, Alemanha, Canadá e Finlândia."
    },
    "service.col2": { en: "Institutional Roles — IF Farroupilha (recent)", pt: "Cargos Institucionais — IF Farroupilha (recentes)" },
    "service.is.h": {
      en: "Coordinator — Bachelor's Degree in Information Systems",
      pt: "Coordenador — Bacharelado em Sistemas de Informação"
    },
    "service.iffar.em": { en: "Federal Institute Farroupilha (IFFar)", pt: "Instituto Federal Farroupilha (IFFar)" },
    "service.iffar.em2": { en: "Federal Institute Farroupilha (IFFar)", pt: "Instituto Federal Farroupilha (IFFar)" },
    "service.is.p": {
      en: "Led the undergraduate program: curriculum, faculty coordination, and student support.",
      pt: "Coordenei o curso de graduação: currículo, coordenação do corpo docente e apoio aos estudantes."
    },
    "service.council.h": { en: "Member — Superior Council (Conselho Superior)", pt: "Membro — Conselho Superior" },
    "service.council.p": {
      en: "Served on the highest deliberative body of the institution.",
      pt: "Atuei no mais alto órgão deliberativo da instituição."
    },
    "service.sup.h": { en: "Research supervision", pt: "Orientação de pesquisa" },
    "service.sup.em": { en: "Undergraduate and technical levels", pt: "Níveis de graduação e técnico" },
    "service.sup.p": {
      en: "40+ students mentored in Information Technology; 7+ research projects coordinated as principal investigator over the past decade.",
      pt: "Mais de 40 estudantes orientados em Tecnologia da Informação; mais de 7 projetos de pesquisa coordenados como coordenador na última década."
    },

    /* Teaching */
    "teaching.title": { en: "Teaching", pt: "Ensino" },
    "teaching.lead": {
      en: "Teaching Computer Science since 2012, with more than 10,000 hours in the classroom and a focus on software engineering, discovery, and human-centered design.",
      pt: "Leciono Computação desde 2012, com mais de 10.000 horas em sala de aula e foco em Engenharia de Software, discovery e design centrado no ser humano."
    },
    "teaching.col1": { en: "Courses & Topics", pt: "Disciplinas e Temas" },
    "teaching.se.h": { en: "Software Engineering", pt: "Engenharia de Software" },
    "teaching.se.em": { en: "Undergraduate — Information Systems, IFFar", pt: "Graduação — Sistemas de Informação, IFFar" },
    "teaching.se.p": {
      en: "Software processes, requirements, agile methods, and quality.",
      pt: "Processos de software, requisitos, métodos ágeis e qualidade."
    },
    "teaching.dt.h": { en: "Design Thinking & Product Discovery", pt: "Design Thinking e Product Discovery" },
    "teaching.dt.em": { en: "Undergraduate and extension courses", pt: "Disciplinas de graduação e extensão" },
    "teaching.dt.p": {
      en: "200+ hours facilitating Design Thinking workshops for students and practitioners.",
      pt: "Mais de 200 horas facilitando workshops de Design Thinking para estudantes e profissionais."
    },
    "teaching.ux.h": { en: "User Experience & Human-Computer Interaction", pt: "Experiência do Usuário e Interação Humano-Computador" },
    "teaching.ux.em": { en: "Undergraduate — Information Systems, IFFar", pt: "Graduação — Sistemas de Informação, IFFar" },
    "teaching.ux.p": {
      en: "Usability, interaction design, and evaluation methods.",
      pt: "Usabilidade, design de interação e métodos de avaliação."
    },
    "teaching.col2": { en: "Mentoring & Outreach", pt: "Orientação e Extensão" },
    "teaching.ic.h": { en: "Undergraduate research (scientific initiation)", pt: "Iniciação científica" },
    "teaching.ic.em": { en: "2012 – Present", pt: "2012 – Presente" },
    "teaching.ic.p": {
      en: "Supervising students on Design Thinking, AI in education, and Computer Vision for agile projects.",
      pt: "Orientação de estudantes em Design Thinking, IA na educação e Visão Computacional para projetos ágeis."
    },
    "teaching.capstone.h": { en: "Capstone and final projects", pt: "Trabalhos de conclusão de curso" },
    "teaching.capstone.em": { en: "Information Systems, IFFar", pt: "Sistemas de Informação, IFFar" },
    "teaching.capstone.p": {
      en: "Advising software projects that connect research questions with real problems.",
      pt: "Orientação de projetos de software que conectam questões de pesquisa a problemas reais."
    },
    "teaching.outreach.h": { en: "Community & K-12 outreach", pt: "Extensão comunitária e educação básica" },
    "teaching.outreach.em": { en: "Ongoing", pt: "Contínuo" },
    "teaching.outreach.p": {
      en: "Bringing computing and design activities to the wider community around São Borja.",
      pt: "Levar atividades de computação e design para a comunidade da região de São Borja."
    },

    /* Contact */
    "contact.title": { en: "Contact", pt: "Contato" },
    "contact.lead": {
      en: "Open to research collaborations, student supervision, and invited talks. Feel free to reach out.",
      pt: "Aberto a colaborações de pesquisa, orientação de estudantes e palestras convidadas. Sinta-se à vontade para entrar em contato."
    },
    "contact.addr.h": { en: "Work Address", pt: "Endereço Profissional" },
    "contact.addr.h5": {
      en: "Federal Institute Farroupilha — São Borja Campus",
      pt: "Instituto Federal Farroupilha — Campus São Borja"
    },
    "contact.addr.p": {
      en: "Otaviano Castilhos Mendes Street, 355, São Borja - RS, Brazil",
      pt: "Rua Otaviano Castilhos Mendes, 355, São Borja - RS, Brasil"
    },
    "contact.email.h": { en: "Email", pt: "E-mail" },

    /* Footer */
    "footer.tagline": {
      en: "Software Engineering researcher & professor — IFFar, Brazil",
      pt: "Pesquisador e professor de Engenharia de Software — IFFar, Brasil"
    },
    "footer.rights": { en: "All Rights Reserved", pt: "Todos os direitos reservados" }
  };

  function readLang() {
    try {
      var s = localStorage.getItem(STORE);
      if (s === "en" || s === "pt") return s;
    } catch (e) { /* private mode, etc. */ }
    return DEFAULT;
  }

  function writeLang(lang) {
    try { localStorage.setItem(STORE, lang); } catch (e) { /* ignore */ }
  }

  function apply(lang) {
    document.documentElement.lang = (lang === "pt") ? "pt-BR" : "en";

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var entry = DICT[el.getAttribute("data-i18n")];
      if (!entry) continue;
      var val = (entry[lang] != null) ? entry[lang] : entry.en;
      if (el.tagName === "TITLE") { document.title = val; }
      else { el.textContent = val; }
    }

    // Hero typing animation: swap the source strings and re-run.
    var typed = document.querySelector(".typed");
    if (typed && DICT["typed"]) {
      typed.setAttribute("data-typed-items", DICT["typed"][lang] || DICT["typed"].en);
      if (typeof window.parizyReinitTyped === "function") window.parizyReinitTyped();
    }

    // Toggle label shows the language you would switch TO.
    var labels = document.querySelectorAll(".lang-label");
    for (var j = 0; j < labels.length; j++) {
      labels[j].textContent = (lang === "en") ? "PT-BR" : "EN-US";
    }
  }

  function toggle(e) {
    if (e) e.preventDefault();
    var next = (readLang() === "en") ? "pt" : "en";
    writeLang(next);
    apply(next);
  }

  function init() {
    var toggles = document.querySelectorAll(".lang-toggle");
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener("click", toggle);
    }
    apply(readLang());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  // Re-assert once everything (incl. typed.js) has initialized on load.
  window.addEventListener("load", function () { apply(readLang()); });
})();

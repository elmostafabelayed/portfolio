export type Language = 'en' | 'fr';

export type ProjectId = 'jobsy' | 'guardian' | 'notes';

export interface PortfolioProject {
  id: ProjectId;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  features: string[];
  overview: string;
  contribution: string;
  focus: string;
  context: string;
}

export interface PortfolioContent {
  nav: { id: string; label: string }[];
  hero: {
    badge: string;
    intro: string;
    title: string;
    phrases: string[];
    description: string;
    explore: string;
    download: string;
    cvUnavailable: string;
    contact: string;
    based: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    facts: { label: string; value: string }[];
    valuesTitle: string;
    values: { title: string; description: string }[];
  };
  skills: {
    eyebrow: string;
    title: string;
    description: string;
    categories: { icon: string; title: string; items: string[] }[];
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    viewCase: string;
    back: string;
    overview: string;
    contribution: string;
    focus: string;
    features: string;
    stack: string;
    illustrative: string;
    items: PortfolioProject[];
  };
  experience: {
    eyebrow: string;
    title: string;
    company: string;
    role: string;
    location: string;
    date: string;
    duration: string;
    description: string;
    responsibilities: string[];
  };
  education: {
    eyebrow: string;
    title: string;
    items: {
      institution: string;
      date: string;
      qualification: string;
      specialization: string;
      description: string;
    }[];
    training: { title: string; description: string; items: string[] };
  };
  work: {
    eyebrow: string;
    title: string;
    qualities: { title: string; description: string }[];
    languages: { name: string; level: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    githubLabel: string;
    linkedinLabel: string;
    copy: string;
    copied: string;
    copyFailed: string;
    formTitle: string;
    labels: { name: string; email: string; subject: string; message: string };
    placeholders: { name: string; email: string; subject: string; message: string };
    submit: string;
    notice: string;
    prepared: string;
    errors: { name: string; email: string; subject: string; message: string };
  };
  footer: { role: string; rights: string; credit: string };
  ui: {
    connect: string;
    themeDark: string;
    themeLight: string;
    menu: string;
    close: string;
    backTop: string;
    skip: string;
    closeCase: string;
    allProjects: string;
    scroll: string;
  };
  intro: {
    name: string;
    role: string;
    skip: string;
    tagline: string;
  };
}

// Connect the original PDF and public domain when available. Never substitute
// a fabricated résumé, deployment URL, or project repository.
export const siteConfig = {
  name: 'El Mostafa Belayd',
  title: 'Junior Full-Stack Web Developer',
  location: 'Fès, Morocco',
  email: 'elmostafabelayd@gmail.com',
  phone: '+212 688835120',
  github: 'https://github.com/elmostafabelayed',
  linkedin: 'https://www.linkedin.com/in/el-mostafa-belayd-48861931',
  cvUrl: './resume/el-mostafa-belayd-cv.pdf',
  siteUrl: null as string | null,
  // Editable profile preference, not a live employment-status check.
  availability: true,
};

export const content: Record<Language, PortfolioContent> = {
  en: {
    nav: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Skills' },
      { id: 'experience', label: 'Experience' },
      { id: 'projects', label: 'Projects' },
      { id: 'education', label: 'Education' },
      { id: 'contact', label: 'Contact' },
    ],
    hero: {
      badge: 'Open to Junior Developer Opportunities',
      intro: "Hi, I'm El Mostafa.",
      title: 'Full-Stack Web Developer.',
      phrases: [
        'I build modern web experiences.',
        'I develop scalable web applications.',
        'I turn ideas into functional solutions.',
        'I connect frontend and backend.',
      ],
      description:
        "I'm a Junior Full-Stack Developer based in Morocco, specializing in React.js, Laravel, and RESTful APIs. I enjoy building responsive web applications, solving technical challenges, and transforming ideas into functional digital experiences.",
      explore: 'Explore My Projects',
      download: 'Download My CV',
      cvUnavailable: 'The CV PDF is not yet available here. Request a copy by email.',
      contact: 'Contact Me',
      based: 'Based in Fès, Morocco',
    },
    about: {
      eyebrow: '01 / ABOUT ME',
      title: 'The developer behind the code.',
      paragraphs: [
        "I'm El Mostafa Belayd, a Junior Full-Stack Web Developer from Fès, Morocco, and an OFPPT graduate with a Specialized Technician Diploma in Digital Development, Web Full-Stack option.",
        'My technical background combines frontend development using React.js and JavaScript with backend development using PHP, Laravel, MySQL, and RESTful APIs.',
        'Beyond web development, I have hands-on experience with C programming, Linux environments, and IoT systems using ESP32.',
        'My practical experience includes developing web application features during my internship at UNiCREATIVE, building personal and academic projects, and strengthening my problem-solving skills through the peer-to-peer learning approach of the 1337 coding Piscine.',
        'I enjoy learning new technologies, debugging complex problems, and creating complete solutions from frontend interfaces to backend systems.',
      ],
      facts: [
        { label: 'Location', value: 'Fès, Morocco' },
        { label: 'Specialization', value: 'Full-Stack Web Development' },
        { label: 'Education', value: 'Specialized Technician Diploma — OFPPT' },
        { label: 'Technical interests', value: 'Web Development, Systems Programming, IoT' },
      ],
      valuesTitle: 'What drives me',
      values: [
        { title: 'Problem solving', description: 'Understanding technical challenges and finding practical solutions.' },
        { title: 'Continuous learning', description: 'Improving my skills through projects, experimentation, and technical training.' },
        { title: 'Building complete solutions', description: 'Connecting frontend interfaces, backend services, and application logic.' },
      ],
    },
    skills: {
      eyebrow: '02 / TECH STACK',
      title: 'Technologies I work with.',
      description: 'From interactive interfaces to backend systems, I use modern technologies to build complete digital solutions.',
      categories: [
        { icon: 'Code2', title: 'Frontend development', items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Redux Toolkit', 'Bootstrap'] },
        { icon: 'Server', title: 'Backend development', items: ['PHP', 'Laravel', 'RESTful APIs'] },
        { icon: 'Database', title: 'Databases & data', items: ['MySQL', 'SQL', 'JSON Server', 'CRUD Operations', 'Database Relationships'] },
        { icon: 'Terminal', title: 'Systems & programming', items: ['C Programming', 'Linux', 'Bash', 'Shell Scripting', 'GCC'] },
        { icon: 'Cpu', title: 'IoT & embedded systems', items: ['ESP32', 'Arduino', 'Arduino/C++', 'Sensors', 'Relays', 'Wi-Fi Communication', 'HTTP'] },
        { icon: 'Wrench', title: 'Development tools', items: ['Git', 'GitHub', 'Visual Studio Code', 'Arduino IDE', 'Debugging Tools'] },
      ],
    },
    projects: {
      eyebrow: '03 / FEATURED WORK',
      title: 'Selected projects.',
      description: 'A selection of projects that demonstrate my approach to web development, application architecture, and problem-solving.',
      viewCase: 'View Case Study',
      back: 'Back to Projects',
      overview: 'The overview',
      contribution: 'My contribution',
      focus: 'Technical focus',
      features: 'Core features',
      stack: 'Built with',
      illustrative: 'Illustrative interface · Sample data',
      items: [
        {
          id: 'jobsy',
          number: '01',
          category: 'Full-Stack Web Application',
          title: 'Jobsy',
          subtitle: 'Freelancing, connected.',
          description: 'A full-stack freelancing platform for managing users, projects, and offers through a responsive interface and a RESTful backend.',
          stack: ['React.js', 'Laravel', 'MySQL', 'Axios', 'Tailwind CSS / Bootstrap', 'Git', 'GitHub', 'RESTful APIs'],
          features: ['User management', 'Project management', 'Offer management', 'Responsive frontend interface', 'Frontend/backend integration', 'RESTful API communication', 'Relational database integration'],
          overview: 'Jobsy brings freelancing workflows into one web platform, with features for managing users, projects, and offers. A React interface connects to a Laravel backend and a MySQL relational database.',
          contribution: 'During my one-month individual internship at UNiCREATIVE, I participated in frontend and backend feature development, implementation, and integration, including RESTful API communication and responsive interfaces.',
          focus: 'Connecting React and Laravel through RESTful APIs, handling frontend requests with Axios, and organizing application data in MySQL.',
          context: 'Individual internship at UNiCREATIVE · April 2026 · One month',
        },
        {
          id: 'guardian',
          number: '02',
          category: 'IoT & Full-Stack System',
          title: 'Water Leak Guardian',
          subtitle: 'Small sensors. Smarter water.',
          description: 'An ESP32-based water monitoring system that measures water flow, detects anomalies, and controls a solenoid valve, connected to a Laravel REST API.',
          stack: ['ESP32', 'Arduino/C++', 'Laravel', 'MySQL', 'Wi-Fi', 'REST APIs', 'Sensors', 'Relays'],
          features: ['Water flow measurement', 'Leak and anomaly detection', 'Automatic solenoid valve control', 'ESP32 communication through Wi-Fi', 'Data transmission to a Laravel API', 'Backend data management'],
          overview: 'Water Leak Guardian combines embedded hardware and a web backend to monitor water flow, detect anomalies, and control a solenoid valve automatically. Sensor data travels from the ESP32 over Wi-Fi to a Laravel REST API and MySQL.',
          contribution: 'The project connects ESP32-based flow monitoring and automatic valve control with REST API communication and backend data management.',
          focus: 'Sensors → ESP32 → Wi-Fi → Laravel REST API → MySQL. Valve control belongs to the embedded hardware system, alongside the sensing and relay components.',
          context: 'IoT project · Embedded hardware & web backend',
        },
        {
          id: 'notes',
          number: '03',
          category: 'React Single-Page Application',
          title: 'Notes App',
          subtitle: 'A clearer space for ideas.',
          description: 'A responsive notes application with CRUD operations, centralized state management, and dynamic search and filtering.',
          stack: ['React.js', 'Redux Toolkit', 'Axios', 'JSON Server', 'Bootstrap'],
          features: ['Create notes', 'View notes', 'Update notes', 'Delete notes', 'Search notes', 'Filter notes', 'Global state management', 'Responsive user interface'],
          overview: 'Notes App is a responsive single-page application for creating, viewing, editing, and deleting notes. Dynamic search and filtering make it easier to find the right note.',
          contribution: 'The application brings together a React interface, centralized state with Redux Toolkit, and CRUD requests using Axios and JSON Server.',
          focus: 'Coordinating note data through shared application state, handling CRUD operations, and updating search and filter results within a responsive interface.',
          context: 'React project · Single-page application',
        },
      ],
    },
    experience: {
      eyebrow: '04 / EXPERIENCE',
      title: 'My development journey.',
      company: 'UNiCREATIVE',
      role: 'Full-Stack Web Developer Intern',
      location: 'Fès, Morocco',
      date: 'April 2026',
      duration: 'One month',
      description: 'Participated in the development of Jobsy, a full-stack freelancing web platform, during a one-month individual internship.',
      responsibilities: [
        'Worked on a web application using React, Laravel, and MySQL.',
        'Participated in frontend and backend development.',
        'Integrated application features and worked with RESTful API communication.',
        'Contributed to functional, responsive interfaces.',
      ],
    },
    education: {
      eyebrow: '05 / EDUCATION',
      title: 'Education & technical training.',
      items: [
        {
          institution: 'OFPPT — Complexe de Formation Professionnelle Al Adarissa',
          date: 'September 2024 — July 2026',
          qualification: 'Specialized Technician Diploma in Digital Development',
          specialization: 'Web Full-Stack',
          description: 'Fès, Morocco. Professional training in web application development, frontend technologies, backend development, databases, and software engineering fundamentals.',
        },
        {
          institution: 'Lycée Sbaa Rwadi',
          date: '2024',
          qualification: 'Baccalauréat',
          specialization: 'Physical and Chemical Sciences',
          description: '',
        },
      ],
      training: {
        title: '1337 Coding Piscine',
        description: 'Complementary practical training using the 42 Network methodology, focused on peer-to-peer learning and technical problem-solving.',
        items: ['C Programming', 'Shell & Bash', 'Norminette', 'Git', 'Compilation', 'Debugging', 'Algorithmic Thinking', 'Technical Problem-Solving', 'Peer-to-Peer Learning'],
      },
    },
    work: {
      eyebrow: '06 / HOW I WORK',
      title: 'Beyond the code.',
      qualities: [
        { title: 'Teamwork', description: 'Collaborating with others to solve problems and build solutions.' },
        { title: 'Problem solving', description: 'Approaching challenges analytically and developing practical solutions.' },
        { title: 'Autonomy', description: 'Organizing tasks and learning independently.' },
        { title: 'Adaptability', description: 'Working with different technologies and technical environments.' },
        { title: 'Organization', description: 'Maintaining structured workflows and clear priorities.' },
        { title: 'Analytical thinking', description: 'Understanding technical systems and breaking complex problems into manageable parts.' },
        { title: 'Continuous learning', description: 'Exploring new technologies and improving technical skills.' },
      ],
      languages: [
        { name: 'Arabic', level: 'Native' },
        { name: 'French', level: 'Professional' },
        { name: 'English', level: 'Professional' },
      ],
    },
    contact: {
      eyebrow: '07 / CONTACT',
      title: "Let's build something great.",
      description: "Have a project, opportunity, or technical challenge in mind? I'd be happy to connect and discuss how I can contribute.",
      emailLabel: 'Send an email',
      phoneLabel: 'Call me',
      locationLabel: 'Based in',
      githubLabel: 'GitHub profile',
      linkedinLabel: 'LinkedIn profile',
      copy: 'Copy email address',
      copied: 'Email address copied',
      copyFailed: 'Could not copy automatically. Select and copy the email address above.',
      formTitle: "Let's turn ideas into reality.",
      labels: { name: 'Full name', email: 'Email address', subject: 'Subject', message: 'Your message' },
      placeholders: { name: 'Your name', email: 'you@company.com', subject: 'An opportunity, a project, an idea…', message: 'Tell me a little about what you have in mind…' },
      submit: 'Prepare Email',
      notice: 'This form opens a draft in your email app. Review it and press send there to deliver your message.',
      prepared: 'Your email draft is ready to open. If your email app did not launch, send your message directly to elmostafabelayd@gmail.com.',
      errors: { name: 'Please enter your full name.', email: 'Please enter a valid email address.', subject: 'Please enter a subject.', message: 'Please enter your message.' },
    },
    footer: {
      role: 'Junior Full-Stack Web Developer',
      rights: 'All rights reserved.',
      credit: 'Built with passion and code.',
    },
    ui: {
      connect: "Let's Connect",
      themeDark: 'Switch to dark theme',
      themeLight: 'Switch to light theme',
      menu: 'Open navigation menu',
      close: 'Close navigation menu',
      backTop: 'Back to top',
      skip: 'Skip to main content',
      closeCase: 'Close case study',
      allProjects: 'All projects',
      scroll: 'Scroll to explore',
    },
    intro: {
      name: 'EL MOSTAFA BELAYD',
      role: 'FULL-STACK WEB DEVELOPER',
      skip: 'SKIP INTRO',
      tagline: 'PORTFOLIO / 2026',
    },
  },
  fr: {
    nav: [
      { id: 'home', label: 'Accueil' },
      { id: 'about', label: 'À propos' },
      { id: 'skills', label: 'Compétences' },
      { id: 'experience', label: 'Expérience' },
      { id: 'projects', label: 'Projets' },
      { id: 'education', label: 'Formation' },
      { id: 'contact', label: 'Contact' },
    ],
    hero: {
      badge: 'Ouvert aux opportunités de développeur junior',
      intro: 'Bonjour, moi, c’est El Mostafa.',
      title: 'Développeur Web Full-Stack.',
      phrases: [
        'Je crée des expériences web modernes.',
        'Je développe des applications web évolutives.',
        'Je transforme les idées en solutions concrètes.',
        'Je relie le frontend et le backend.',
      ],
      description: 'Développeur Full-Stack junior basé au Maroc, je me spécialise en React.js, Laravel et API REST. J’aime créer des applications web responsives, relever des défis techniques et transformer les idées en expériences numériques fonctionnelles.',
      explore: 'Découvrir mes projets',
      download: 'Télécharger mon CV',
      cvUnavailable: 'Le CV au format PDF n’est pas encore disponible ici. Vous pouvez en demander une copie par e-mail.',
      contact: 'Me contacter',
      based: 'Basé à Fès, Maroc',
    },
    about: {
      eyebrow: '01 / À PROPOS',
      title: 'Le développeur derrière le code.',
      paragraphs: [
        'Je suis El Mostafa Belayd, développeur web Full-Stack junior originaire de Fès, au Maroc, et diplômé de l’OFPPT en tant que Technicien Spécialisé en Développement Digital, option Web Full-Stack.',
        'Mon parcours technique associe le développement frontend avec React.js et JavaScript au développement backend avec PHP, Laravel, MySQL et les API REST.',
        'Au-delà du web, j’ai également une expérience pratique de la programmation en C, des environnements Linux et des systèmes IoT utilisant l’ESP32.',
        'J’ai développé des fonctionnalités web lors de mon stage chez UNiCREATIVE, réalisé des projets personnels et académiques, et renforcé ma capacité à résoudre des problèmes grâce à l’apprentissage entre pairs de la Piscine 1337.',
        'J’aime découvrir de nouvelles technologies, analyser les problèmes complexes et créer des solutions complètes, des interfaces utilisateur aux systèmes backend.',
      ],
      facts: [
        { label: 'Localisation', value: 'Fès, Maroc' },
        { label: 'Spécialisation', value: 'Développement Web Full-Stack' },
        { label: 'Formation', value: 'Diplôme de Technicien Spécialisé — OFPPT' },
        { label: 'Intérêts techniques', value: 'Développement web, programmation système, IoT' },
      ],
      valuesTitle: 'Ce qui me motive',
      values: [
        { title: 'Résoudre des problèmes', description: 'Comprendre les défis techniques et trouver des solutions concrètes.' },
        { title: 'Apprendre en continu', description: 'Progresser grâce aux projets, à l’expérimentation et aux formations techniques.' },
        { title: 'Créer des solutions complètes', description: 'Relier les interfaces frontend, les services backend et la logique applicative.' },
      ],
    },
    skills: {
      eyebrow: '02 / COMPÉTENCES TECHNIQUES',
      title: 'Les technologies que j’utilise.',
      description: 'Des interfaces interactives aux systèmes backend, j’utilise des technologies modernes pour créer des solutions numériques complètes.',
      categories: [
        { icon: 'Code2', title: 'Développement frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Redux Toolkit', 'Bootstrap'] },
        { icon: 'Server', title: 'Développement backend', items: ['PHP', 'Laravel', 'API REST'] },
        { icon: 'Database', title: 'Bases de données', items: ['MySQL', 'SQL', 'JSON Server', 'Opérations CRUD', 'Relations entre tables'] },
        { icon: 'Terminal', title: 'Systèmes & programmation', items: ['Programmation en C', 'Linux', 'Bash', 'Scripts Shell', 'GCC'] },
        { icon: 'Cpu', title: 'IoT & systèmes embarqués', items: ['ESP32', 'Arduino', 'Arduino/C++', 'Capteurs', 'Relais', 'Communication Wi-Fi', 'HTTP'] },
        { icon: 'Wrench', title: 'Outils de développement', items: ['Git', 'GitHub', 'Visual Studio Code', 'Arduino IDE', 'Outils de débogage'] },
      ],
    },
    projects: {
      eyebrow: '03 / PROJETS SÉLECTIONNÉS',
      title: 'Une sélection de projets.',
      description: 'Des projets qui illustrent mon approche du développement web, de l’architecture applicative et de la résolution de problèmes.',
      viewCase: 'Voir le projet en détail',
      back: 'Retour aux projets',
      overview: 'Vue d’ensemble',
      contribution: 'Ma contribution',
      focus: 'Approche technique',
      features: 'Fonctionnalités principales',
      stack: 'Technologies utilisées',
      illustrative: 'Interface illustrative · Données d’exemple',
      items: [
        {
          id: 'jobsy',
          number: '01',
          category: 'Application Web Full-Stack',
          title: 'Jobsy',
          subtitle: 'Le freelancing, connecté.',
          description: 'Une plateforme de freelancing Full-Stack pour gérer les utilisateurs, les projets et les offres, avec une interface responsive et un backend REST.',
          stack: ['React.js', 'Laravel', 'MySQL', 'Axios', 'Tailwind CSS / Bootstrap', 'Git', 'GitHub', 'API REST'],
          features: ['Gestion des utilisateurs', 'Gestion des projets', 'Gestion des offres', 'Interface frontend responsive', 'Intégration frontend/backend', 'Communication via API REST', 'Intégration d’une base de données relationnelle'],
          overview: 'Jobsy réunit les fonctionnalités d’une plateforme de freelancing : gestion des utilisateurs, des projets et des offres. L’interface React communique avec un backend Laravel et une base de données relationnelle MySQL.',
          contribution: 'Lors de mon stage individuel d’un mois chez UNiCREATIVE, j’ai participé au développement, à l’implémentation et à l’intégration de fonctionnalités frontend et backend, notamment la communication via API REST et les interfaces responsives.',
          focus: 'Relier React et Laravel grâce aux API REST, gérer les requêtes frontend avec Axios et organiser les données applicatives dans MySQL.',
          context: 'Stage individuel chez UNiCREATIVE · Avril 2026 · Un mois',
        },
        {
          id: 'guardian',
          number: '02',
          category: 'Système IoT & Full-Stack',
          title: 'Water Leak Guardian',
          subtitle: 'Petits capteurs. Gestion de l’eau intelligente.',
          description: 'Un système de surveillance de l’eau utilisant l’ESP32 pour mesurer le débit, détecter les anomalies et piloter une électrovanne, relié à une API REST Laravel.',
          stack: ['ESP32', 'Arduino/C++', 'Laravel', 'MySQL', 'Wi-Fi', 'API REST', 'Capteurs', 'Relais'],
          features: ['Mesure du débit d’eau', 'Détection des fuites et anomalies', 'Commande automatique d’une électrovanne', 'Communication ESP32 par Wi-Fi', 'Transmission des données à une API Laravel', 'Gestion des données côté backend'],
          overview: 'Water Leak Guardian associe du matériel embarqué et un backend web pour surveiller le débit d’eau, détecter les anomalies et commander automatiquement une électrovanne. Les données des capteurs sont transmises par l’ESP32 en Wi-Fi à une API REST Laravel, puis stockées dans MySQL.',
          contribution: 'Le projet relie la mesure du débit et la commande automatique de l’électrovanne sur ESP32 à la communication par API REST et à la gestion des données côté backend.',
          focus: 'Capteurs → ESP32 → Wi-Fi → API REST Laravel → MySQL. La commande de l’électrovanne fait partie du système embarqué, aux côtés des capteurs et des relais.',
          context: 'Projet IoT · Matériel embarqué & backend web',
        },
        {
          id: 'notes',
          number: '03',
          category: 'Application Monopage React',
          title: 'Notes App',
          subtitle: 'Un espace clair pour vos idées.',
          description: 'Une application de notes responsive avec opérations CRUD, gestion centralisée de l’état, recherche dynamique et filtrage.',
          stack: ['React.js', 'Redux Toolkit', 'Axios', 'JSON Server', 'Bootstrap'],
          features: ['Création de notes', 'Consultation des notes', 'Modification des notes', 'Suppression des notes', 'Recherche de notes', 'Filtrage des notes', 'Gestion globale de l’état', 'Interface utilisateur responsive'],
          overview: 'Notes App est une application monopage responsive permettant de créer, consulter, modifier et supprimer des notes. La recherche dynamique et le filtrage facilitent l’accès aux informations souhaitées.',
          contribution: 'L’application réunit une interface React, une gestion centralisée de l’état avec Redux Toolkit et des requêtes CRUD utilisant Axios et JSON Server.',
          focus: 'Coordonner les données des notes dans un état partagé, gérer les opérations CRUD et actualiser les résultats de recherche et de filtrage au sein d’une interface responsive.',
          context: 'Projet React · Application monopage',
        },
      ],
    },
    experience: {
      eyebrow: '04 / EXPÉRIENCE',
      title: 'Mon parcours de développeur.',
      company: 'UNiCREATIVE',
      role: 'Stagiaire Développeur Web Full-Stack',
      location: 'Fès, Maroc',
      date: 'Avril 2026',
      duration: 'Un mois',
      description: 'Participation au développement de Jobsy, une plateforme web de freelancing Full-Stack, dans le cadre d’un stage individuel d’un mois.',
      responsibilities: [
        'Travail sur une application web utilisant React, Laravel et MySQL.',
        'Participation au développement frontend et backend.',
        'Intégration de fonctionnalités et communication via API REST.',
        'Contribution à des interfaces fonctionnelles et responsives.',
      ],
    },
    education: {
      eyebrow: '05 / FORMATION',
      title: 'Formation & apprentissage technique.',
      items: [
        {
          institution: 'OFPPT — Complexe de Formation Professionnelle Al Adarissa',
          date: 'Septembre 2024 — Juillet 2026',
          qualification: 'Diplôme de Technicien Spécialisé en Développement Digital',
          specialization: 'Web Full-Stack',
          description: 'Fès, Maroc. Formation professionnelle axée sur les applications web, les technologies frontend, le développement backend, les bases de données et les fondamentaux du génie logiciel.',
        },
        {
          institution: 'Lycée Sbaa Rwadi',
          date: '2024',
          qualification: 'Baccalauréat',
          specialization: 'Sciences Physiques et Chimiques',
          description: '',
        },
      ],
      training: {
        title: 'Piscine 1337',
        description: 'Formation pratique complémentaire fondée sur la méthodologie du réseau 42, l’apprentissage entre pairs et la résolution de problèmes techniques.',
        items: ['Programmation en C', 'Shell & Bash', 'Norminette', 'Git', 'Compilation', 'Débogage', 'Raisonnement algorithmique', 'Résolution de problèmes techniques', 'Apprentissage entre pairs'],
      },
    },
    work: {
      eyebrow: '06 / MA FAÇON DE TRAVAILLER',
      title: 'Au-delà du code.',
      qualities: [
        { title: 'Esprit d’équipe', description: 'Collaborer pour résoudre les problèmes et construire des solutions.' },
        { title: 'Résolution de problèmes', description: 'Analyser les défis et développer des solutions concrètes.' },
        { title: 'Autonomie', description: 'Organiser mes tâches et apprendre de manière indépendante.' },
        { title: 'Adaptabilité', description: 'Travailler avec différentes technologies et dans des environnements techniques variés.' },
        { title: 'Organisation', description: 'Maintenir un travail structuré et des priorités claires.' },
        { title: 'Esprit d’analyse', description: 'Comprendre les systèmes techniques et décomposer les problèmes complexes en étapes abordables.' },
        { title: 'Apprentissage continu', description: 'Explorer de nouvelles technologies et renforcer mes compétences techniques.' },
      ],
      languages: [
        { name: 'Arabe', level: 'Langue maternelle' },
        { name: 'Français', level: 'Professionnel' },
        { name: 'Anglais', level: 'Professionnel' },
      ],
    },
    contact: {
      eyebrow: '07 / CONTACT',
      title: 'Créons quelque chose ensemble.',
      description: 'Un projet, une opportunité ou un défi technique en tête ? Je serai ravi d’échanger avec vous et de voir comment y contribuer.',
      emailLabel: 'Envoyer un e-mail',
      phoneLabel: 'M’appeler',
      locationLabel: 'Basé à',
      githubLabel: 'Profil GitHub',
      linkedinLabel: 'Profil LinkedIn',
      copy: 'Copier l’adresse e-mail',
      copied: 'Adresse e-mail copiée',
      copyFailed: 'La copie automatique a échoué. Sélectionnez et copiez l’adresse e-mail ci-dessus.',
      formTitle: 'Donnons vie à vos idées.',
      labels: { name: 'Nom complet', email: 'Adresse e-mail', subject: 'Objet', message: 'Votre message' },
      placeholders: { name: 'Votre nom', email: 'vous@entreprise.com', subject: 'Une opportunité, un projet, une idée…', message: 'Parlez-moi de ce que vous avez en tête…' },
      submit: 'Préparer l’e-mail',
      notice: 'Ce formulaire ouvre un brouillon dans votre messagerie. Vérifiez-le et envoyez-le depuis celle-ci pour transmettre votre message.',
      prepared: 'Votre brouillon est prêt à être ouvert. Si votre messagerie ne s’est pas lancée, écrivez directement à elmostafabelayd@gmail.com.',
      errors: { name: 'Veuillez saisir votre nom complet.', email: 'Veuillez saisir une adresse e-mail valide.', subject: 'Veuillez saisir un objet.', message: 'Veuillez saisir votre message.' },
    },
    footer: {
      role: 'Développeur Web Full-Stack Junior',
      rights: 'Tous droits réservés.',
      credit: 'Créé avec passion et du code.',
    },
    ui: {
      connect: 'Échangeons',
      themeDark: 'Activer le thème sombre',
      themeLight: 'Activer le thème clair',
      menu: 'Ouvrir le menu de navigation',
      close: 'Fermer le menu de navigation',
      backTop: 'Retour en haut',
      skip: 'Aller au contenu principal',
      closeCase: 'Fermer le détail du projet',
      allProjects: 'Tous les projets',
      scroll: 'Défiler pour découvrir',
    },
    intro: {
      name: 'EL MOSTAFA BELAYD',
      role: 'DÉVELOPPEUR WEB FULL STACK',
      skip: "PASSER L'INTRO",
      tagline: 'PORTFOLIO / 2026',
    },
  },
};

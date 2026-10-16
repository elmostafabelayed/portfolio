import { useId } from 'react';
import {
  ArrowUpRight, Bell, BriefcaseBusiness, Check, ChevronDown, CircleHelp,
  Code2, Droplets, FileText, Folder, LayoutDashboard, ListFilter,
  MessageSquare, MoreHorizontal, Plus, Search, Settings, Wifi,
} from 'lucide-react';
import '../styles/project-visuals.css';

type ProjectVisualProps = {
  kind: 'jobsy' | 'guardian' | 'notes';
  language?: 'en' | 'fr';
};

const labels = {
  en: {
    overview: 'Overview', projects: 'Projects', offers: 'My offers', messages: 'Messages',
    settings: 'Settings', workspace: 'Your workspace', welcome: 'Good morning, Alex',
    dashboard: 'A little progress, every day.', newProject: 'New project', active: 'Active projects',
    submitted: 'Offers submitted', inProgress: 'In progress', explore: 'Find your next project',
    viewAll: 'View all', redesign: 'Website redesign', redesignDetail: 'Design & development',
    integration: 'REST API integration', integrationDetail: 'Backend development',
    open: 'Open', offerActivity: 'Your latest offer', proposal: 'Proposal submitted',
    review: 'In review', collaboration: 'Collaboration', sample: 'Sample workspace',
    water: 'Water overview', simulated: 'SIMULATED DATA', flow: 'Flow rate', valve: 'Valve state',
    valveOpen: 'Open', system: 'Anomaly status', normal: 'Normal', history: 'Water flow',
    lastHour: 'Last hour', architecture: 'DEVICE → BACKEND', sensor: 'Flow sensor',
    connected: 'Wi-Fi / HTTP', noAnomaly: 'No anomaly in this sample',
    allNotes: 'All notes', favorites: 'Favorites', personal: 'Personal', work: 'Work',
    ideas: 'Ideas', notesHeading: 'A little room for your ideas.', notesSubheading: 'Collect. Organize. Create.',
    search: 'Search your notes…', addNote: 'New note', all: 'All', today: 'Today',
    plan: 'A plan for the week', planOne: 'Build something useful', planTwo: 'Make time to learn',
    planThree: 'Keep things simple', ideaTitle: 'Small idea, big potential',
    ideaCopy: 'What if the best next step is the simplest one?', devTitle: 'Development notes',
    devCopy: 'Components. State. A thoughtful interface.', readingTitle: 'On my reading list',
    readingCopy: 'A few things I want to explore next.',
  },
  fr: {
    overview: 'Vue d’ensemble', projects: 'Projets', offers: 'Mes offres', messages: 'Messages',
    settings: 'Paramètres', workspace: 'Votre espace', welcome: 'Bonjour, Alex',
    dashboard: 'Un petit progrès, chaque jour.', newProject: 'Nouveau projet', active: 'Projets actifs',
    submitted: 'Offres envoyées', inProgress: 'En cours', explore: 'Votre prochain projet',
    viewAll: 'Voir tout', redesign: 'Refonte de site web', redesignDetail: 'Design et développement',
    integration: 'Intégration API REST', integrationDetail: 'Développement backend',
    open: 'Ouvert', offerActivity: 'Votre dernière offre', proposal: 'Offre envoyée',
    review: 'En révision', collaboration: 'Collaboration', sample: 'Espace illustratif',
    water: 'Suivi de l’eau', simulated: 'DONNÉES SIMULÉES', flow: 'Débit d’eau', valve: 'État de la vanne',
    valveOpen: 'Ouverte', system: 'État des anomalies', normal: 'Normal', history: 'Débit d’eau',
    lastHour: 'Dernière heure', architecture: 'CAPTEUR → BACKEND', sensor: 'Débitmètre',
    connected: 'Wi-Fi / HTTP', noAnomaly: 'Aucune anomalie dans cet exemple',
    allNotes: 'Toutes les notes', favorites: 'Favoris', personal: 'Personnel', work: 'Travail',
    ideas: 'Idées', notesHeading: 'Un peu de place pour vos idées.', notesSubheading: 'Collecter. Organiser. Créer.',
    search: 'Rechercher une note…', addNote: 'Nouvelle note', all: 'Tout', today: 'Aujourd’hui',
    plan: 'Le plan de la semaine', planOne: 'Créer quelque chose d’utile', planTwo: 'Prendre le temps d’apprendre',
    planThree: 'Garder les choses simples', ideaTitle: 'Une idée, du potentiel',
    ideaCopy: 'Et si le prochain pas était aussi le plus simple ?', devTitle: 'Notes de développement',
    devCopy: 'Composants. État. Une interface soignée.', readingTitle: 'Ma liste de lecture',
    readingCopy: 'Quelques sujets à explorer bientôt.',
  },
};

function BrowserBar({ title }: { title: string }) {
  return <div className="pv-browser"><span className="pv-window-dots"><i /><i /><i /></span><span>{title}</span><MoreHorizontal /></div>;
}

export function ProjectVisual({ kind, language = 'en' }: ProjectVisualProps) {
  const copy = labels[language];
  const gradientId = `pv-water-${useId().replace(/:/g, '')}`;

  if (kind === 'jobsy') {
    return (
      <div className="pv-root pv-jobsy" aria-hidden="true">
        <div className="pv-backdrop-orb" />
        <div className="pv-app pv-jobsy-app">
          <BrowserBar title="jobsy / workspace" />
          <div className="pv-jobsy-layout">
            <div className="pv-jobsy-sidebar">
              <div className="pv-jobsy-logo">jobsy<span>✳</span></div>
              <div className="pv-side-item pv-side-active"><LayoutDashboard />{copy.overview}</div>
              <div className="pv-side-item"><BriefcaseBusiness />{copy.projects}</div>
              <div className="pv-side-item"><FileText />{copy.offers}<span className="pv-side-count">4</span></div>
              <div className="pv-side-item"><MessageSquare />{copy.messages}</div>
              <div className="pv-jobsy-sidebar-bottom">
                <div className="pv-side-item"><Settings />{copy.settings}</div>
                <div className="pv-jobsy-user"><span>A</span><div>Alex Morgan<small>Freelancer</small></div><ChevronDown /></div>
              </div>
            </div>
            <div className="pv-jobsy-main">
              <div className="pv-jobsy-top"><span>{copy.workspace} <span className="pv-slash">/</span> <b>{copy.overview}</b></span><div><Search /><Bell /><span className="pv-mini-avatar">A</span></div></div>
              <div className="pv-jobsy-welcome"><div><h3>{copy.welcome} <span>☀</span></h3><p>{copy.dashboard}</p></div><span className="pv-purple-button"><Plus />{copy.newProject}</span></div>
              <div className="pv-jobsy-stats">
                <div><span>{copy.active}</span><strong>03 <BriefcaseBusiness /></strong></div>
                <div><span>{copy.submitted}</span><strong>08 <FileText /></strong></div>
                <div><span>{copy.inProgress}</span><strong>02 <Code2 /></strong></div>
              </div>
              <div className="pv-row-heading"><b>{copy.explore}</b><span>{copy.viewAll} <ArrowUpRight /></span></div>
              <div className="pv-project-row"><span className="pv-project-symbol pv-project-symbol-purple">✳</span><div><b>{copy.redesign}</b><small>{copy.redesignDetail}</small></div><span className="pv-project-tag">React</span><span className="pv-open-pill">{copy.open}</span></div>
              <div className="pv-project-row"><span className="pv-project-symbol pv-project-symbol-peach"><Code2 /></span><div><b>{copy.integration}</b><small>{copy.integrationDetail}</small></div><span className="pv-project-tag">Laravel</span><span className="pv-open-pill">{copy.open}</span></div>
              <div className="pv-offer"><div className="pv-row-heading"><b>{copy.offerActivity}</b><MoreHorizontal /></div><div className="pv-offer-track"><span className="pv-complete"><i><Check /></i>{copy.proposal}</span><span className="pv-current"><i />{copy.review}</span><span><i />{copy.collaboration}</span></div></div>
            </div>
          </div>
        </div>
        <span className="pv-scene-caption">{copy.sample}</span>
      </div>
    );
  }

  if (kind === 'guardian') {
    return (
      <div className="pv-root pv-guardian" aria-hidden="true">
        <div className="pv-guardian-grid" />
        <div className="pv-app pv-guardian-app">
          <div className="pv-guardian-header"><div className="pv-guardian-brand"><span><Droplets /></span><b>guardian<span>WATER MONITORING</span></b></div><span className="pv-simulated"><i />{copy.simulated}</span><Settings /></div>
          <div className="pv-guardian-main">
            <div className="pv-water-heading"><h3>{copy.water}</h3><span><Wifi />ESP32 — 01</span></div>
            <div className="pv-water-stats"><div><span>{copy.flow}</span><strong>4.8<small>L/min</small></strong><span className="pv-tiny-spark">▁▂▂▃▂▅▄▅▃▅</span></div><div><span>{copy.valve}</span><strong className="pv-green">{copy.valveOpen}</strong><span className="pv-valve"><i /><b /><i /></span></div><div><span>{copy.system}</span><strong>{copy.normal}</strong><span className="pv-water-check"><Check /></span></div></div>
            <div className="pv-water-chart"><div className="pv-row-heading"><b>{copy.history}<small> / L·min⁻¹</small></b><span>{copy.lastHour}<ChevronDown /></span></div><div className="pv-chart-inner"><div className="pv-chart-labels"><span>8</span><span>4</span><span>0</span></div><svg className="pv-chart-svg" viewBox="0 0 540 100" preserveAspectRatio="none"><defs><linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#C6B39A" stopOpacity=".25" /><stop offset="100%" stopColor="#C6B39A" stopOpacity="0" /></linearGradient></defs><path d="M0 20H540 M0 50H540 M0 80H540" className="pv-chart-guide" /><path d="M0 70 C12 70 14 50 30 55 S48 72 63 57 S78 50 92 60 S110 34 126 45 S145 63 160 47 S178 60 195 41 S218 59 235 38 S258 45 275 39 S288 50 306 31 S325 55 340 42 S360 49 375 35 S390 48 407 29 S430 47 446 30 S463 42 480 25 S503 39 516 29 S533 27 540 24 V100 H0 Z" fill={`url(#${gradientId})`} /><path d="M0 70 C12 70 14 50 30 55 S48 72 63 57 S78 50 92 60 S110 34 126 45 S145 63 160 47 S178 60 195 41 S218 59 235 38 S258 45 275 39 S288 50 306 31 S325 55 340 42 S360 49 375 35 S390 48 407 29 S430 47 446 30 S463 42 480 25 S503 39 516 29 S533 27 540 24" className="pv-chart-line" /></svg></div><div className="pv-chart-times"><span>09:00</span><span>09:15</span><span>09:30</span><span>09:45</span><span>10:00</span></div></div>
            <div className="pv-device-heading">{copy.architecture}<span>{copy.connected}</span></div>
            <div className="pv-device-flow"><div className="pv-flow-node"><Droplets /><span>{copy.sensor}</span></div><span className="pv-flow-line" /><div className="pv-chip"><span>ESP32</span><small>Wi-Fi</small></div><span className="pv-flow-line" /><div className="pv-flow-node pv-api-node"><Code2 /><span>Laravel API</span></div><span className="pv-flow-line" /><div className="pv-flow-node"><span className="pv-database">▱</span><span>MySQL</span></div></div>
          </div>
        </div>
        <span className="pv-scene-caption"><span className="pv-caption-dot" />{copy.noAnomaly}</span>
      </div>
    );
  }

  return (
    <div className="pv-root pv-notes" aria-hidden="true">
      <div className="pv-notes-orbit pv-notes-orbit-one" /><div className="pv-notes-orbit pv-notes-orbit-two" />
      <div className="pv-app pv-notes-app">
        <BrowserBar title="notes / my space" />
        <div className="pv-notes-layout">
          <div className="pv-notes-sidebar"><div className="pv-notes-logo"><span>n</span>notes.</div><div className="pv-notes-nav pv-notes-nav-active"><FileText />{copy.allNotes}<span>8</span></div><div className="pv-notes-nav"><Folder />{copy.favorites}</div><div className="pv-notes-nav-label">{copy.workspace}</div><div className="pv-notes-nav"><i className="pv-dot-violet" />{copy.personal}</div><div className="pv-notes-nav"><i className="pv-dot-yellow" />{copy.work}</div><div className="pv-notes-nav"><i className="pv-dot-blue" />{copy.ideas}</div><div className="pv-notes-help"><CircleHelp />{copy.sample}</div></div>
          <div className="pv-notes-main"><div className="pv-notes-toolbar"><span><Search />{copy.search}</span><span className="pv-notes-avatar">A</span></div><div className="pv-notes-heading"><h3>{copy.notesHeading}</h3><p>{copy.notesSubheading}</p></div><div className="pv-note-filters"><div><span className="pv-note-filter-active">{copy.all}</span><span>{copy.personal}</span><span>{copy.work}</span></div><ListFilter /><span className="pv-new-note"><Plus />{copy.addNote}</span></div><div className="pv-notes-board"><div className="pv-note pv-note-lilac"><div className="pv-note-meta">{copy.personal}<MoreHorizontal /></div><h4>{copy.plan}</h4><div className="pv-note-checklist"><span><i><Check /></i>{copy.planOne}</span><span><i />{copy.planTwo}</span><span><i />{copy.planThree}</span></div><small>{copy.today}<ArrowUpRight /></small></div><div className="pv-note pv-note-yellow"><div className="pv-note-meta">{copy.ideas}<MoreHorizontal /></div><h4>{copy.ideaTitle}</h4><p>{copy.ideaCopy}</p><div className="pv-note-doodle">✳</div><small>{copy.today}<ArrowUpRight /></small></div><div className="pv-note pv-note-blue"><div className="pv-note-meta">{copy.work}<MoreHorizontal /></div><h4>{copy.devTitle}</h4><p>{copy.devCopy}</p><small>React · Redux<ArrowUpRight /></small></div><div className="pv-note pv-note-green"><div className="pv-note-meta">{copy.personal}<MoreHorizontal /></div><h4>{copy.readingTitle}</h4><p>{copy.readingCopy}</p><small>{copy.today}<ArrowUpRight /></small></div></div></div>
        </div>
      </div>
    </div>
  );
}

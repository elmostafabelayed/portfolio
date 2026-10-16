import { ArrowDown, Check, Code2, Terminal } from 'lucide-react';
import { ReactMark, LaravelMark } from './TechIcon';
import type { Language } from '../data/content';
export function HeroVisual({language}:{language:Language}) {
 const fr=language==='fr';
 return <div className="hero-visual" aria-hidden="true">
  <div className="orbital-ring orbit-one"/><div className="orbital-ring orbit-two"/><div className="orbital-ring orbit-three"/>
  <div className="orbit-point point-one"/><div className="orbit-point point-two"/>
  <div className="visual-caption"><span className="crosshair">+</span> {fr?'DES IDÉES AU CODE':'FROM IDEAS TO IMPLEMENTATION'}</div>
  <div className="floating-tech react-float"><ReactMark size={32}/><div><b>React.js</b><span>Frontend</span></div></div>
  <div className="editor-window">
   <div className="editor-top"><span className="window-dots"><i/><i/><i/></span><span>developer.ts</span><Code2 size={14}/></div>
   <div className="editor-tabs"><span><span className="ts-symbol">TS</span> developer.ts <span>×</span></span><span>README.md</span></div>
   <div className="editor-code"><div className="line-numbers">1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11</div>
    <pre><span className="syntax-comment">// {fr?'Construire avec intention.':'Building with purpose.'}</span>{'\n'}<span className="syntax-purple">const</span> <span className="syntax-blue">developer</span> = {'{'}{'\n'}  name: <span className="syntax-green">"El Mostafa Belayd"</span>,{'\n'}  role: <span className="syntax-green">"Full-Stack Developer"</span>,{'\n'}  frontend: <span className="syntax-green">"React.js"</span>,{'\n'}  backend: <span className="syntax-green">"Laravel"</span>,{'\n'}  location: <span className="syntax-green">"Morocco 🇲🇦"</span>,{'\n'}  mindset: <span className="syntax-green">"{fr?'Toujours apprendre':'Always learning'}"</span>{'\n'}{'}'};{'\n\n'}<span className="syntax-blue">developer</span>.<span className="syntax-yellow">buildSomethingGreat</span>();<span className="code-cursor"/></pre>
   </div>
   <div className="editor-status"><span><GitBranchMini/> main*</span><span>UTF-8 <span>TypeScript</span><Check size={11}/></span></div>
  </div>
  <div className="floating-tech laravel-float"><LaravelMark size={30}/><div><b>Laravel</b><span>Backend</span></div></div>
  <div className="terminal-card"><div><Terminal size={14}/><span>terminal</span><span className="terminal-dot"/></div><p><span>❯</span> npm run build</p><p className="terminal-success"><Check size={13}/> {fr?'Prêt à créer la suite.':'Ready to build what’s next.'}</p></div>
  <div className="api-pill"><span>React</span><span className="api-line"/><span>REST API</span><span className="api-line"/><span>Laravel</span><ArrowDown size={12}/></div>
 </div>;
}
function GitBranchMini(){return <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor"><circle cx="4" cy="3" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="4" cy="13" r="2"/><path d="M4 5v6m8-5c0 3-8 1-8 5"/></svg>}

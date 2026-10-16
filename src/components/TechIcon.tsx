import { Braces, Code2, Database, GitBranch, Terminal, Wifi } from 'lucide-react';

export function ReactMark({size=28}:{size?:number}) {
  return <svg width={size} height={size} viewBox="-12 -11 24 22" fill="none" aria-hidden="true"><circle r="2" fill="currentColor"/>{[0,60,120].map(a=><ellipse key={a} rx="11" ry="4.3" stroke="currentColor" strokeWidth="1" transform={`rotate(${a})`}/>)}</svg>;
}
export function LaravelMark({size=28}:{size?:number}) {
  return <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true"><path d="m4 6 6-3 6 3v14l-6 3-6-3V6Zm0 0 6 3 6-3M10 9v14m6-11 6 3 6-3-6-3-6 3Zm0 0v7l6 3 6-3v-7m-6 3v7m-12 1v6l6 3 12-6v-4m-18 4 6 3 12-6m-12 6v6"/></svg>;
}
export function TechIcon({name,size=19}:{name:string;size?:number}) {
 if(name.includes('React'))return <ReactMark size={size}/>;
 if(name==='Laravel')return <LaravelMark size={size}/>;
 if(name==='JavaScript')return <span className="letter-icon js-icon">JS</span>;
 if(name==='PHP')return <span className="letter-icon php-icon">php</span>;
 if(name==='C Programming'||name==='C')return <span className="letter-icon">C</span>;
 if(name.includes('SQL')||name.includes('Database'))return <Database size={size}/>;
 if(name.includes('Git'))return <GitBranch size={size}/>;
 if(name.includes('Linux')||name.includes('Bash')||name.includes('Shell'))return <Terminal size={size}/>;
 if(name.includes('ESP32')||name.includes('Wi-Fi'))return <Wifi size={size}/>;
 if(name.includes('HTML')||name.includes('CSS'))return <Code2 size={size}/>;
 return <Braces size={size}/>;
}

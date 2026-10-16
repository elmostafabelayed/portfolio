import { useEffect, useState } from 'react';
import type { Language } from '../data/content';
export function useStoredState<T extends string>(key:string,initial:T,allowed:T[]) {
 const [value,setValue]=useState<T>(()=>{try{const stored=localStorage.getItem(key) as T;return allowed.includes(stored)?stored:initial;}catch{return initial;}});
 useEffect(()=>{try{localStorage.setItem(key,value)}catch{/* Preferences still work in memory. */}},[key,value]);
 return [value,setValue] as const;
}
export function useScrollState(){
 const [state,setState]=useState({progress:0,active:'home',showTop:false});
 useEffect(()=>{let frame=0;const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;const sections=[...document.querySelectorAll<HTMLElement>('main > section[id]')];let active='home';for(const s of sections){if(s.getBoundingClientRect().top<=180)active=s.id;}setState({progress:max>0?scrollY/max:0,active,showTop:scrollY>650});frame=0;};const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update);};update();addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);return()=>{removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll);cancelAnimationFrame(frame);};},[]);
 return state;
}
export function useMetadata(language:Language){
 useEffect(()=>{document.documentElement.lang=language;const title=language==='en'?'El Mostafa Belayd | Junior Full-Stack Developer — React & Laravel':'El Mostafa Belayd | Développeur Full-Stack Junior — React & Laravel';const description=language==='en'?'Explore the portfolio of El Mostafa Belayd, a Junior Full-Stack Developer in Morocco specializing in React.js, Laravel, REST APIs, and modern web applications.':'Découvrez le portfolio d’El Mostafa Belayd, développeur Full-Stack junior au Maroc, spécialisé en React.js, Laravel, API REST et applications web modernes.';document.title=title;document.querySelector('meta[name="description"]')?.setAttribute('content',description);document.querySelector('meta[property="og:title"]')?.setAttribute('content',title);document.querySelector('meta[property="og:description"]')?.setAttribute('content',description);document.querySelector('meta[property="og:locale"]')?.setAttribute('content',language==='fr'?'fr_FR':'en_US');},[language]);
}

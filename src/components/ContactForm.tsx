import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { content, siteConfig, type Language } from '../data/content';
type FormFields = 'name' | 'email' | 'subject' | 'message';
export function ContactSection({language}:{language:Language}) {
 const t=content[language].contact;
 const [errors,setErrors]=useState<Partial<Record<FormFields,string>>>({});
 const [prepared,setPrepared]=useState(false);
 const [copyState,setCopyState]=useState<'idle'|'copied'|'failed'>('idle');
 async function copyEmail(){try{await navigator.clipboard.writeText(siteConfig.email);setCopyState('copied')}catch{setCopyState('failed')}setTimeout(()=>setCopyState('idle'),3500);}
 function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();const form=event.currentTarget;const data=new FormData(form);const values=Object.fromEntries(data.entries()) as Record<FormFields,string>;const next:Partial<Record<FormFields,string>>={};for(const field of ['name','subject','message'] as FormFields[]){if(!values[field]?.trim())next[field]=t.errors[field];}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))next.email=t.errors.email;setErrors(next);setPrepared(false);if(Object.keys(next).length){form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();return;}const body=`${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`;window.location.href=`mailto:${siteConfig.email}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`;setPrepared(true);}
 return <section id="contact" className="section contact-section"><div className="container"><div className="contact-grid">
  <div className="contact-intro"><span className="eyebrow">{t.eyebrow}</span><h2>{t.title}</h2><p className="section-description">{t.description}</p>
   <div className="email-row"><a href={`mailto:${siteConfig.email}`}><Mail size={20}/><span>{siteConfig.email}</span></a><button className="icon-button" onClick={copyEmail} aria-label={copyState==='copied'?t.copied:t.copy} title={t.copy}>{copyState==='copied'?<Check size={17}/>:<Copy size={17}/>}</button></div><span className="copy-feedback" role="status">{copyState==='copied'?t.copied:copyState==='failed'?t.copyFailed:''}</span>
   <div className="contact-details"><a href="tel:+212688835120"><Phone size={17}/><span>+212 688835120</span></a><span><MapPin size={17}/>{language==='fr'?'Fès, Maroc':'Fès, Morocco'}</span></div>
   <div className="social-links"><a href={siteConfig.github} target="_blank" rel="noopener noreferrer"><Github size={18}/>GitHub<ArrowUpRight size={14}/></a><a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18}/>LinkedIn<ArrowUpRight size={14}/></a></div>
   <div className="contact-signature"><span className="status-dot"/>{language==='fr'?'Une idée. Une conversation. Un nouveau départ.':'An idea. A conversation. A new beginning.'}</div>
  </div>
  <form className="contact-form" onSubmit={submit} noValidate><h3>{t.formTitle}</h3><div className="form-row">{(['name','email'] as const).map(field=><div className="form-field" key={field}><label htmlFor={field}>{t.labels[field]}</label><input id={field} name={field} type={field==='email'?'email':'text'} autoComplete={field} placeholder={t.placeholders[field]} maxLength={150} required aria-invalid={!!errors[field]} aria-describedby={errors[field]?`${field}-error`:undefined}/>{errors[field]&&<span id={`${field}-error`} className="field-error">{t.errors[field]}</span>}</div>)}</div>
   <div className="form-field"><label htmlFor="subject">{t.labels.subject}</label><input id="subject" name="subject" placeholder={t.placeholders.subject} maxLength={200} required aria-invalid={!!errors.subject} aria-describedby={errors.subject?'subject-error':undefined}/>{errors.subject&&<span id="subject-error" className="field-error">{t.errors.subject}</span>}</div>
   <div className="form-field"><label htmlFor="message">{t.labels.message}</label><textarea id="message" name="message" rows={4} placeholder={t.placeholders.message} maxLength={4000} required aria-invalid={!!errors.message} aria-describedby={errors.message?'message-error':undefined}/>{errors.message&&<span id="message-error" className="field-error">{t.errors.message}</span>}</div>
   <button className="button primary contact-submit" type="submit">{t.submit}<ArrowUpRight size={18}/></button><p className="form-notice">{t.notice}</p>{prepared&&<p className="form-feedback" role="status"><Check size={17}/>{t.prepared}</p>}
  </form>
 </div></div></section>;
}

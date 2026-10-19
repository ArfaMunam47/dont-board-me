import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowUpRight, ArrowUp, PawPrint, Heart, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import runningDog from '@/assets/running-dog.png';
import sittingDog from '@/assets/sitting-dog.png';
import restingDog from '@/assets/resting-dog.png';

export function Doodle({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 60 60" fill="none" aria-hidden="true"><path d="m30 3 4 20 17-11-12 17 19 4-20 4 9 17-16-13-7 17-1-19-19 7 14-15-16-7 20-1-5-18 13 15Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>;
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;
    node.classList.add('reveal-waiting');
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { node.classList.remove('reveal-waiting'); observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(node);
    return () => { observer.disconnect(); node.classList.remove('reveal-waiting'); };
  }, []);
  return <div ref={ref} className={`scroll-reveal ${className}`}>{children}</div>;
}

const serviceSlides = [
  { number: '01', id: 'dog-walks', name: 'DOG WALKS', title: ['BIG WALKS.', 'HAPPY PAWS.'], copy: 'Give your dog time to explore, sniff, stretch their legs, and discover something new.', link: 'EXPLORE DOG WALKS', img: runningDog, width: 1536, height: 1024, alt: 'A joyful dog running with its red leash curling through the air', shape: 'blue', note: 'follow their nose!' },
  { number: '02', id: 'pet-visits', name: 'PET VISITS', title: ['LITTLE VISITS.', 'LOTS OF LOVE.'], copy: 'Friendly check-ins, attention, and care to help your dog feel comfortable while you’re away.', link: 'EXPLORE PET VISITS', img: restingDog, width: 1536, height: 1024, alt: 'A relaxed white dog stretching out its paws at home', shape: 'pink', note: 'their happy place.' },
  { number: '03', id: 'both', name: 'A BIT OF BOTH', title: ['THE BEST', 'OF BOTH.'], copy: 'Looking for walks and friendly visits? Let’s find a routine that works for your dog’s day.', link: 'EXPLORE BOTH', img: sittingDog, width: 1024, height: 1024, alt: 'A shaggy white dog with a curious head tilt and a red leash', shape: 'cream', note: 'a bit of everything.' },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const media = window.matchMedia('(min-width: 901px) and (min-height: 820px) and (prefers-reduced-motion: no-preference)');
    let raf = 0;
    const update = () => {
      raf = 0;
      setEnhanced(media.matches);
      if (!media.matches) return;
      const total = node.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -node.getBoundingClientRect().top / total));
      setActive((previous) => {
        const bias = 0.06;
        const raw = progress * serviceSlides.length;
        let next = Math.floor(raw + (raw > previous + 1 ? -bias : raw < previous ? bias : 0));
        next = Math.min(serviceSlides.length - 1, Math.max(0, next));
        return next === previous ? previous : next;
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const followFragment = () => {
      const index = serviceSlides.findIndex(slide => `#${slide.id}` === window.location.hash);
      if (index < 0 || !media.matches) return;
      node.classList.add('services-enhanced');
      setEnhanced(true);
      const distance = node.offsetHeight - window.innerHeight;
      const top = window.scrollY + node.getBoundingClientRect().top;
      window.scrollTo({ top: top + distance * (index + 0.5) / serviceSlides.length, behavior: 'instant' });
      setActive(index);
    };
    update();
    followFragment();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('hashchange', followFragment);
    window.addEventListener('service-navigation', followFragment);
    media.addEventListener('change', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); window.removeEventListener('hashchange', followFragment); window.removeEventListener('service-navigation', followFragment); media.removeEventListener('change', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  const jumpTo = (index: number) => {
    const node = sectionRef.current;
    if (!node) return;
    const total = node.offsetHeight - window.innerHeight;
    window.scrollTo({ top: window.scrollY + node.getBoundingClientRect().top + (total * (index + 0.5)) / serviceSlides.length, behavior: 'smooth' });
  };
  return <section className={`services-scroller${enhanced ? ' services-enhanced' : ''}`} id="our-world" ref={sectionRef} aria-labelledby="services-title">
    <div className="services-stage">
      <div className="services-head">
        <span className="eyebrow">OUR SERVICES</span>
        <h2 id="services-title" className="editorial-title">GOOD DAYS<br />START HERE.</h2>
        <span className="handwritten">little adventures.<br />lots of love.</span>
        <Doodle className="services-head-star" />
      </div>
      <div className="services-slides">
        {serviceSlides.map((slide, index) => (
          <article key={slide.number} id={slide.id} className={`service-slide ${index === active ? 'is-active' : index < active ? 'is-before' : 'is-after'}`} aria-hidden={enhanced && index !== active} inert={enhanced && index !== active}>
            <div className={`slide-shape shape-${slide.shape}`} aria-hidden="true" />
            <svg className="slide-path" viewBox="0 0 600 300" fill="none" aria-hidden="true"><path d="M10 240C50 150 110 310 180 230S280 130 380 190 560 130 585 40" stroke="currentColor" strokeWidth="2" strokeDasharray="5 9" /></svg>
            <img className="slide-dog" src={slide.img} width={slide.width} height={slide.height} loading="lazy" alt={slide.alt} />
            <span className="slide-number" aria-hidden="true">{slide.number}</span>
            <div className="slide-copy">
              <h3>{slide.title[0]}<br />{slide.title[1]}</h3>
              <p>{slide.copy}</p>
              <Button asChild variant="link" className="editorial-link"><a href="#contact">{slide.link} <ArrowUpRight /></a></Button>
            </div>
            <span className="handwritten slide-note">{slide.note}</span>
            <PawPrint className="slide-paw" aria-hidden="true" />
          </article>
        ))}
      </div>
      <div className="services-markers" aria-label="Service progress">
        {serviceSlides.map((slide, index) => (
          <Button key={slide.number} variant="ghost" type="button" className={index === active ? 'marker is-active' : 'marker'} aria-current={index === active ? 'true' : undefined} aria-controls={slide.id} onClick={() => jumpTo(index)}>{slide.number} / 03 — {slide.name}</Button>
        ))}
      </div>
    </div>
  </section>;
}

export function FinalCallToAction() {
  return <section className="final-cta" aria-labelledby="cta-title"><Reveal className="cta-composition"><div className="cta-shape" /><div className="cta-copy"><span className="eyebrow">GOOD DAYS ARE JUST A HELLO AWAY</span><h2 id="cta-title" className="editorial-title">READY FOR MORE<br />TAIL WAGS?</h2><p>Let’s make your dog’s next day a really good one.</p><Button asChild className="club-button final-button"><a href="#contact">LET’S TALK ABOUT YOUR DOG <ArrowUpRight /></a></Button></div><img src={runningDog} width={1536} height={1024} loading="lazy" alt="A happy dog leaping toward its next adventure" className="cta-dog" /><Doodle className="cta-star" /></Reveal></section>;
}

type ContactFields = { name: string; email: string; dog: string; care: string; message: string };
type FieldErrors = Partial<Record<keyof ContactFields, string>>;

export function ContactSection() {
  const [fields, setFields] = useState<ContactFields>({ name: '', email: '', dog: '', care: 'Dog walks', message: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [checked, setChecked] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const update = (key: keyof ContactFields, value: string) => { setFields((previous) => ({ ...previous, [key]: value })); setErrors((previous) => ({ ...previous, [key]: undefined })); setChecked(false); };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: FieldErrors = {};
    if (!fields.name.trim()) next.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = 'Please enter a valid email address.';
    if (!fields.dog.trim()) next.dog = 'Please tell us your dog’s name.';
    if (!fields.message.trim()) next.message = 'Tell us a little about the care your dog needs.';
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) { document.getElementById(`contact-${first}`)?.focus(); setChecked(false); return; }
    setChecked(true);
    requestAnimationFrame(() => statusRef.current?.focus());
  };
  const download = () => {
    const text = `Don't Board Me — Care enquiry\n\nName: ${fields.name}\nEmail: ${fields.email}\nDog: ${fields.dog}\nCare: ${fields.care}\n\n${fields.message}\n\nThis enquiry has not been sent.`;
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'dont-board-me-enquiry.txt'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <section id="contact" className="contact-section" aria-labelledby="contact-title"><div className="section-inner contact-layout">
    <Reveal className="contact-copy"><span className="eyebrow">05 / SAY HELLO</span><h2 id="contact-title" className="editorial-title">TELL US ABOUT<br />YOUR GOOD DOG.</h2><p>A favorite route? A familiar routine? A little extra company? It starts with getting to know your dog.</p><PawPrint className="contact-paw" aria-hidden="true" /><span className="handwritten">we’re all ears.</span></Reveal>
    <form className="contact-form" noValidate onSubmit={submit} aria-describedby="delivery-note">
      <div className="form-intro"><PawPrint className="form-intro-paw" aria-hidden="true" /><span className="form-intro-label">LET’S GET TO KNOW YOUR PUP</span><p className="form-intro-copy">A few little details to help us find the right fit.</p></div>
      <div className="form-row">{(['name', 'email'] as const).map((key) => <div className="form-field" key={key}><label htmlFor={`contact-${key}`}>{key === 'name' ? 'Your name' : 'Email address'} <span aria-hidden="true">*</span></label><Input id={`contact-${key}`} type={key === 'email' ? 'email' : 'text'} autoComplete={key} required maxLength={key === 'email' ? 254 : 100} placeholder={key === 'email' ? 'hello@example.com' : 'Your name'} value={fields[key]} onChange={(event) => update(key, event.target.value)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `error-${key}` : undefined} />{errors[key] && <p className="field-error" id={`error-${key}`}>{errors[key]}</p>}</div>)}</div>
      <div className="form-field"><label htmlFor="contact-dog">Your dog’s name <span aria-hidden="true">*</span></label><Input id="contact-dog" required maxLength={100} placeholder="Your dog’s name" value={fields.dog} onChange={(event) => update('dog', event.target.value)} aria-invalid={Boolean(errors.dog)} aria-describedby={errors.dog ? 'error-dog' : undefined} />{errors.dog && <p id="error-dog" className="field-error">{errors.dog}</p>}</div>
      <fieldset className="care-selector"><legend>What kind of care?</legend>{['Dog walks', 'Pet visits', 'A bit of both'].map((care) => <label key={care} className="care-chip"><input type="radio" name="care" value={care} checked={fields.care === care} onChange={() => update('care', care)} /><PawPrint className="care-chip-paw" aria-hidden="true" />{care}</label>)}</fieldset>
      <div className="form-field"><label htmlFor="contact-message">A little about your dog <span aria-hidden="true">*</span></label><Textarea id="contact-message" rows={4} required maxLength={4000} placeholder="Tell us about their personality, favourite walks, routine, or anything else we should know…" value={fields.message} onChange={(event) => update('message', event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'error-message' : undefined} />{errors.message && <p id="error-message" className="field-error">{errors.message}</p>}</div>
      <p id="delivery-note" className="delivery-note">Message delivery isn’t connected yet. You can check your enquiry and save a copy; nothing is sent.</p>
      <Button type="submit" className="club-button">CHECK MY ENQUIRY <ArrowUpRight /></Button>
      {checked && <div ref={statusRef} tabIndex={-1} role="status" className="contact-status"><Check aria-hidden="true" /><div><strong>Your enquiry is ready — but hasn’t been sent.</strong><p>Message delivery still needs to be connected. Save a copy to keep your details.</p><Button type="button" variant="link" className="editorial-link" onClick={download}><Download /> SAVE MY ENQUIRY</Button></div></div>}
    </form>
  </div></section>;
}

export function CompleteFooter() {
  const followService = (id: string) => {
    window.history.pushState(null, '', `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.dispatchEvent(new Event('service-navigation'));
  };
  return <footer className="complete-footer"><div className="section-inner"><div className="footer-top"><a href="#home" className="footer-brand">DON’T<br />BOARD ME.</a><div className="footer-note"><Doodle /><p>Good days for<br />very good dogs.</p></div><nav aria-label="Footer navigation"><a href="#about">About us</a><a href="#dog-walks" onClick={event => { event.preventDefault(); followService('dog-walks'); }}>Dog walks</a><a href="#pet-visits" onClick={event => { event.preventDefault(); followService('pet-visits'); }}>Pet visits</a><a href="#how-it-works">How it works</a><a href="#contact">Say hello <ArrowUpRight /></a></nav></div><div className="footer-bottom"><span>© 2026 Don’t Board Me.</span><span>A LITTLE MUDDY. A WHOLE LOT OF LOVE.</span><a href="#home">BACK TO TOP <ArrowUp /></a></div></div></footer>;
}
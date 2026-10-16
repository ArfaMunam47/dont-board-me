import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowUpRight, ArrowUp, PawPrint, Heart, House, Check, Download } from 'lucide-react';
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

export function Services() {
  return <section className="complete-services" id="our-world" aria-labelledby="services-title">
    <div className="section-eyebrow"><span>OUR SERVICES</span><span>02 / THE EVERYDAY ADVENTURES</span></div>
    <Reveal className="services-title-row"><h2 id="services-title" className="editorial-title">GOOD DAYS<br />START HERE.</h2><span className="handwritten">a little adventure,<br />a lot of happy.</span><Doodle className="service-heading-star" /></Reveal>
    <div className="service-jump"><a href="#dog-walks">01 / DOG WALKS <ArrowDownMark /></a><a href="#pet-visits">02 / PET VISITS <ArrowDownMark /></a></div>
    <article id="dog-walks" className="service-editorial walk-service">
      <Reveal className="service-illustration"><div className="service-shape blue-shape" /><svg className="walking-line" viewBox="0 0 600 300" fill="none" aria-hidden="true"><path d="M10 240C50 150 110 310 180 230S280 130 380 190 560 130 585 40" stroke="currentColor" strokeWidth="2" strokeDasharray="5 9" /></svg><img src={runningDog} width={1536} height={1024} loading="lazy" alt="A joyful dog running with its red leash curling through the air" /><PawPrint className="service-paw" aria-hidden="true" /><span className="handwritten service-annotation">follow their nose!</span></Reveal>
      <Reveal className="service-editorial-copy"><span className="eyebrow">01 / DOG WALKS</span><h3>BIG WALKS.<br />HAPPY PAWS.</h3><p>Give your dog time to explore, sniff, stretch their legs, and enjoy the world beyond the front door.</p><Button asChild variant="link" className="editorial-link"><a href="#contact">EXPLORE DOG WALKS <ArrowUpRight /></a></Button></Reveal>
    </article>
    <article id="pet-visits" className="service-editorial visit-service">
      <Reveal className="service-editorial-copy"><span className="eyebrow">02 / PET VISITS</span><h3>LITTLE VISITS.<br />LOTS OF LOVE.</h3><p>Friendly check-ins, attention, and care to help your dog feel comfortable while you’re away.</p><Button asChild variant="link" className="editorial-link"><a href="#contact">EXPLORE PET VISITS <ArrowUpRight /></a></Button></Reveal>
      <Reveal className="service-illustration"><div className="service-shape pink-shape" /><img src={restingDog} width={1536} height={1024} loading="lazy" alt="A relaxed white dog stretching out its paws at home" /><House className="home-doodle" aria-hidden="true" /><span className="handwritten service-annotation">their happy place.</span><Doodle className="visit-star" /></Reveal>
    </article>
  </section>;
}

function ArrowDownMark() { return <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2v14m-5-5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>; }

const steps = [
  { number: '01', title: 'SAY HELLO', copy: 'Tell us about your dog, their routine, and the kind of care they need.' },
  { number: '02', title: 'FIND YOUR FIT', copy: 'Let’s work out the right walking or visiting routine for your dog.' },
  { number: '03', title: 'LET THE GOOD DAYS BEGIN', copy: 'Your dog’s next little adventure is ready to begin.' },
];

export function HowItWorks() {
  return <section id="how-it-works" className="how-section" aria-labelledby="how-title"><div className="section-inner">
    <div className="section-eyebrow"><span>HOW IT WORKS</span><span>03 / THREE LITTLE STEPS</span></div>
    <Reveal className="how-heading"><h2 id="how-title" className="editorial-title">EASY FOR YOU.<br />LOVELY FOR THEM.</h2><span className="handwritten">one hello away<br />from a good day.</span></Reveal>
    <div className="process-wrap"><svg className="process-line" viewBox="0 0 1100 130" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M70 65C220-35 300 150 450 65S710-20 850 65 1010 120 1070 50" stroke="currentColor" strokeWidth="2" strokeDasharray="5 9" /></svg><ol className="process-list">{steps.map((step) => <li key={step.number}><Reveal><span className="process-number">{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></Reveal></li>)}</ol><PawPrint className="process-paw" aria-hidden="true" /></div>
    <a className="text-link" href="#contact">IT ALL STARTS WITH A HELLO <ArrowUpRight /></a>
  </div></section>;
}

export function PersonalCare() {
  return <section className="personal-care" id="care" aria-labelledby="care-title"><div className="section-inner">
    <div className="section-eyebrow"><span>EVERY PERSONALITY WELCOME</span><span>04 / THE LITTLE THINGS</span></div>
    <div className="care-composition"><Reveal className="care-copy"><h2 id="care-title" className="editorial-title">SMALL DETAILS.<br />VERY GOOD<br />CARE.</h2><p>The eager explorer. The gentle homebody. The dog who needs a little time to warm up. Every personality is different, and so is every routine.</p><p>Getting to know what makes your dog comfortable is where good care begins. Their favorite paths, familiar comforts, and little quirks all matter.</p><div className="care-signoff"><Heart aria-hidden="true" /><span className="handwritten">their world. their pace.</span></div></Reveal>
    <Reveal className="care-art"><div className="care-shape" /><img src={sittingDog} width={1024} height={1024} loading="lazy" alt="A gentle shaggy dog looking curiously at its favorite people" /><span className="handwritten care-note">a big personality<br />in a fluffy package.</span><Doodle className="care-star" /></Reveal></div>
  </div></section>;
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
      <div className="form-row">{(['name', 'email'] as const).map((key) => <div className="form-field" key={key}><label htmlFor={`contact-${key}`}>{key === 'name' ? 'Your name' : 'Email address'} <span aria-hidden="true">*</span></label><Input id={`contact-${key}`} type={key === 'email' ? 'email' : 'text'} autoComplete={key} required maxLength={key === 'email' ? 254 : 100} value={fields[key]} onChange={(event) => update(key, event.target.value)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `error-${key}` : undefined} />{errors[key] && <p className="field-error" id={`error-${key}`}>{errors[key]}</p>}</div>)}</div>
      <div className="form-field"><label htmlFor="contact-dog">Your dog’s name <span aria-hidden="true">*</span></label><Input id="contact-dog" required maxLength={100} value={fields.dog} onChange={(event) => update('dog', event.target.value)} aria-invalid={Boolean(errors.dog)} aria-describedby={errors.dog ? 'error-dog' : undefined} />{errors.dog && <p id="error-dog" className="field-error">{errors.dog}</p>}</div>
      <fieldset className="care-selector"><legend>What kind of care?</legend>{['Dog walks', 'Pet visits', 'A bit of both'].map((care) => <label key={care} className="care-chip"><input type="radio" name="care" value={care} checked={fields.care === care} onChange={() => update('care', care)} /><PawPrint className="care-chip-paw" aria-hidden="true" />{care}</label>)}</fieldset>
      <div className="form-field"><label htmlFor="contact-message">A little about your dog <span aria-hidden="true">*</span></label><Textarea id="contact-message" rows={4} required maxLength={4000} value={fields.message} onChange={(event) => update('message', event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'error-message' : undefined} />{errors.message && <p id="error-message" className="field-error">{errors.message}</p>}</div>
      <p id="delivery-note" className="delivery-note">Message delivery isn’t connected yet. You can check your enquiry and save a copy; nothing is sent.</p>
      <Button type="submit" className="club-button">CHECK MY ENQUIRY <ArrowUpRight /></Button>
      {checked && <div ref={statusRef} tabIndex={-1} role="status" className="contact-status"><Check aria-hidden="true" /><div><strong>Your enquiry is ready — but hasn’t been sent.</strong><p>Message delivery still needs to be connected. Save a copy to keep your details.</p><Button type="button" variant="link" className="editorial-link" onClick={download}><Download /> SAVE MY ENQUIRY</Button></div></div>}
    </form>
  </div></section>;
}

export function CompleteFooter() {
  return <footer className="complete-footer"><div className="section-inner"><div className="footer-top"><a href="#home" className="footer-brand">DON’T<br />BOARD ME.</a><div className="footer-note"><Doodle /><p>Good days for<br />very good dogs.</p></div><nav aria-label="Footer navigation"><a href="#about">About us</a><a href="#dog-walks">Dog walks</a><a href="#pet-visits">Pet visits</a><a href="#how-it-works">How it works</a><a href="#contact">Say hello <ArrowUpRight /></a></nav></div><div className="footer-bottom"><span>© 2026 Don’t Board Me.</span><span>A LITTLE MUDDY. A WHOLE LOT OF LOVE.</span><a href="#home">BACK TO TOP <ArrowUp /></a></div></div></footer>;
}
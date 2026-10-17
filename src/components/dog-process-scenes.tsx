import { useEffect, useRef } from 'react';
import { ArrowUpRight, Heart, PawPrint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import sittingDog from '@/assets/sitting-dog.png';
import runningDog from '@/assets/running-dog.png';
import restingDog from '@/assets/resting-dog.png';

const processCards = [
  { number: '01', label: 'SAY HELLO', title: <>FIRST, WE GET<br />TO KNOW YOU.</>, copy: 'Tell us about your dog, their personality, their routine, and the little things that make them special.', image: sittingDog, alt: 'A curious shaggy dog ready to say hello', tone: 'paper', note: 'hello, you.' },
  { number: '02', label: 'FIND YOUR FIT', title: <>LET’S FIND<br />THEIR THING.</>, copy: 'Choose the walking or visiting routine that makes the most sense for your dog’s day.', image: runningDog, alt: 'A happy dog exploring with a trailing red leash', tone: 'rose', note: 'their kind of day.' },
  { number: '03', label: 'THE LITTLE THINGS', title: <>THEIR WORLD.<br />THEIR PACE.</>, copy: 'Favorite paths, familiar comforts, and little quirks. Good care starts with understanding them.', image: restingDog, alt: 'A relaxed dog stretching its paws at home', tone: 'blue', note: 'just like home.' },
  { number: '04', label: 'GOOD DAYS BEGIN', title: <>ADVENTURES<br />AWAIT.</>, copy: 'Make room for more sniffing, exploring, companionship, and very happy tails.', image: runningDog, alt: 'A joyful dog running toward its next adventure', tone: 'pink', note: 'off we go!' },
];

function Star({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 60 60" fill="none" aria-hidden="true"><path d="m30 3 4 20 17-11-12 17 19 4-20 4 9 17-16-13-7 17-1-19-19 7 14-15-16-7 20-1-5-18 13 15Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>;
}

/** Motion only enhances the complete, readable SSR layout. */
export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const media = window.matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)');
    const cards = Array.from(section.querySelectorAll<HTMLElement>('.journey-card'));
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!media.matches) { section.classList.remove('journey-animated'); cards.forEach(card => card.removeAttribute('style')); return; }
      section.classList.add('journey-animated');
      const distance = section.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / Math.max(1, distance)));
      cards.forEach((card, index) => {
        const arrival = Math.min(1, Math.max(0, (progress - index * 0.17) / 0.27));
        const eased = 1 - Math.pow(1 - arrival, 3);
        card.style.setProperty('--card-lift', `${(1 - eased) * (window.innerHeight + 420)}px`);
        card.style.setProperty('--card-turn', `${(1 - eased) * (index % 2 ? 13 : -13)}deg`);
      });
      section.style.setProperty('--heading-fade', `${1 - Math.min(0.94, progress * 1.45)}`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    media.addEventListener('change', schedule);
    return () => {
      window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule);
      media.removeEventListener('change', schedule); if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <section id="how-it-works" className="journey-section" ref={sectionRef} aria-labelledby="journey-title">
    <div className="journey-stage">
      <div className="journey-orbit" aria-hidden="true" />
      <div className="journey-topline"><span>GOOD DAYS, STEP BY STEP</span><span>03 / HOW IT WORKS</span></div>
      <div className="journey-heading"><h2 id="journey-title">HOW IT WORKS?</h2><Star className="journey-star" /><span className="handwritten">a little hello.<br />a whole lot of love.</span></div>
      <ol className="journey-deck">{processCards.map(card => <li key={card.number} className={`journey-card journey-${card.tone}`}>
        <div className="journey-card-top"><span>{card.label}</span><PawPrint aria-hidden="true" /></div>
        <h3>{card.title}</h3><span className="journey-number">{card.number}.</span>
        <p>{card.copy}</p>
        <div className="journey-art"><div className="journey-art-shape" aria-hidden="true" /><img src={card.image} width={1536} height={1024} loading="lazy" alt={card.alt} /><span className="handwritten">{card.note}</span></div>
      </li>)}</ol>
      <div className="journey-bottom"><span>EVERY GOOD DAY STARTS WITH GETTING TO KNOW YOUR DOG.</span><Button asChild className="club-button"><a href="#contact">SAY HELLO <ArrowUpRight /></a></Button></div>
    </div>
  </section>;
}

export function PersonalCare() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { section.classList.add('care-scene-entered'); observer.disconnect(); }
    }, { threshold: 0.18 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  return <section id="care" className="care-scene" ref={sectionRef} aria-labelledby="care-scene-title">
    <div className="care-scene-topline"><span>EVERY PERSONALITY WELCOME</span><span>04 / CARE, THEIR WAY</span></div>
    <div className="care-cream care-cream-left" aria-hidden="true" /><div className="care-cream care-cream-right" aria-hidden="true" />
    <div className="care-scene-title"><span className="eyebrow">THE LITTLE THINGS. THE BIG LOVE.</span><h2 id="care-scene-title">THE CARE YOUR<br />PET DESERVES!</h2><Heart className="care-scene-heart" aria-hidden="true" /></div>
    <div className="care-clouds" aria-hidden="true"><i /><i /><i /><i /><i /></div>
    <div className="care-scene-details"><div className="care-scene-dog"><div className="care-scene-blue" aria-hidden="true" /><img src={sittingDog} width={1024} height={1024} loading="lazy" alt="A gentle shaggy dog with a curious head tilt" /><span className="handwritten">their world.<br />their pace.</span><Star className="care-scene-star" /></div>
      <div className="care-scene-copy"><span className="eyebrow">SMALL DETAILS. VERY GOOD CARE.</span><p>The eager explorer. The gentle homebody. The dog who needs a little time to warm up. Every personality is different, and so is every routine.</p><p>Getting to know what makes your dog comfortable is where good care begins. Their favorite paths, familiar comforts, and little quirks all matter.</p><a className="text-link" href="#contact">LET’S GET TO KNOW YOUR DOG <ArrowUpRight /></a></div>
    </div>
  </section>;
}
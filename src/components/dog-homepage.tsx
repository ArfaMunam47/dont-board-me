import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Menu, X, Heart, PawPrint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import sittingDog from '@/assets/sitting-dog.png';
import runningDog from '@/assets/running-dog.png';

function Spark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 60 60" fill="none" aria-hidden="true"><path d="M30 3 34 23 51 12 39 29 58 33 38 37 47 54 31 41 24 58 23 39 4 46 18 31 2 24 22 23 17 5 30 20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>;
}

function Wordmark() {
  return <><PawPrint aria-hidden="true" className="brand-paw" /><span className="wordmark">DON’T<br />BOARD ME<span className="brand-period">®</span></span></>;
}

function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <a href="#home" className="brand" aria-label="Don't Board Me home"><Wordmark /></a>
    <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
      <a href="#about" onClick={() => setOpen(false)}>ABOUT US</a>
      <a href="#our-world" onClick={() => setOpen(false)}>OUR WORLD</a>
      <a href="#dogs" onClick={() => setOpen(false)}>THE DOGS</a>
    </nav>
    <Button asChild className="club-button header-cta"><a href="#dogs">MEET THE PACK <ArrowUpRight /></a></Button>
    <Button className="mobile-menu" variant="ghost" size="icon" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
  </header>;
}

function HeroSection() {
  return <section className="hero" id="home" aria-labelledby="hero-title">
    <Navigation />
    <div className="hero-stage">
      <div className="hero-circle" aria-hidden="true" />
      <h1 id="hero-title" className="hero-headline"><span className="headline-left">A TIRED<br />DOG IS</span><span className="headline-right">A HAPPY<br />DOG!</span></h1>
      <div className="hero-dog"><img src={sittingDog} width={1024} height={1024} alt="A shaggy white dog with a curious head tilt and a red leash" fetchPriority="high" /></div>
      <Spark className="hero-spark" />
      <span className="little-note">BIG WALKS.<br />EVEN BIGGER LOVE.</span>
      <div className="hero-caption"><span className="tiny-rule" /><p>Your dog’s favorite people.<br />After you, of course.</p><Button asChild className="club-button"><a href="#our-world">EXPLORE OUR WORLD <ArrowUpRight /></a></Button></div>
      <div className="good-dog-seal" aria-label="100 percent good dog energy"><span>100% GOOD</span><Heart aria-hidden="true" /><span>DOG ENERGY</span></div>
      <a href="#about" className="scroll-cue" aria-label="Scroll to meet Don't Board Me"><ArrowDown /><span>A LITTLE MORE ABOUT US</span></a>
    </div>
    <svg className="hero-wave" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50C180 105 300 15 480 45S760 115 980 48 1260 0 1440 48V100H0Z" fill="currentColor" /></svg>
  </section>;
}

function BrandIntroduction() {
  return <section id="about" className="brand-intro" aria-labelledby="intro-title">
    <div className="section-eyebrow"><span>GOOD DOGS. GREAT COMPANY.</span><span>01 / THE GOOD LIFE</span></div>
    <div className="intro-layout">
      <div className="intro-art"><div className="intro-orbit" aria-hidden="true" /><img src={runningDog} width={1536} height={1024} loading="lazy" alt="A happy hand-drawn dog running with its red leash trailing behind" /><span className="handwritten intro-note">life’s better<br />with a dog.</span><Spark className="intro-spark" /></div>
      <div className="intro-copy"><h2 id="intro-title">MORE THAN<br />JUST A<br /><span>GOOD BOY.</span></h2><p>They’re your family. Your little shadow. Your very best friend. We’re here to make their days as happy as they make yours.</p><a href="#our-world" className="text-link">A LITTLE LOVE GOES A LONG WAY <ArrowUpRight /></a></div>
    </div>
    <div className="intro-bottom"><span>FOR THE TAIL-WAGGERS. THE SNIFFERS. THE SOFA-SNUGGLERS.</span><PawPrint aria-hidden="true" /><span>AND EVERY GOOD DOG IN BETWEEN.</span></div>
  </section>;
}

const worlds = [
  { name: 'DOG WALKS', note: 'A little adventure. A lot of happy.', description: 'New smells, familiar friends, and the kind of walk that ends with a wonderfully sleepy dog.', image: runningDog, alt: 'An adventurous dog running happily', number: '01' },
  { name: 'PET VISITS', note: 'Home is where their heart is.', description: 'A friendly face, a little playtime, and plenty of company in their own favorite place.', image: sittingDog, alt: 'A friendly shaggy dog sitting at home', number: '02' },
];

function DogWorld() {
  const [active, setActive] = useState(0);
  const world = worlds[active] ?? worlds[0];
  return <section className="dog-world" id="our-world" aria-labelledby="world-title">
    <div className="section-eyebrow"><span>A WORLD BUILT AROUND THEM</span><span>02 / OUR WORLD</span></div>
    <div className="world-heading"><h2 id="world-title">SMALL ADVENTURES.<br />BIG TAIL WAGS.</h2><Spark className="world-spark" /></div>
    <div className="world-tabs" role="tablist" aria-label="Explore our dog care" onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); const next = active === 0 ? 1 : 0; setActive(next); document.getElementById(`world-tab-${next}`)?.focus(); } }}>
      {worlds.map((item, index) => <Button key={item.name} variant="ghost" role="tab" id={`world-tab-${index}`} aria-controls="world-panel" aria-selected={active === index} tabIndex={active === index ? 0 : -1} className={active === index ? 'world-tab active' : 'world-tab'} onClick={() => setActive(index)}><span>{item.number}</span>{item.name}<ArrowUpRight /></Button>)}
    </div>
    <div className="world-panel" id="world-panel" role="tabpanel" aria-labelledby={`world-tab-${active}`}>
      <div className="world-art"><img key={world.name} src={world.image} width={1536} height={1024} loading="lazy" alt={world.alt} className={active === 1 ? 'visit-dog' : ''} /><span className="handwritten world-note">the best part<br />of their day!</span></div>
      <div className="world-copy"><span className="world-number">{world.number} /</span><h3>{world.note}</h3><p>{world.description}</p><a className="round-arrow" href="#dogs" aria-label="Meet the dogs"><ArrowUpRight /></a></div>
    </div>
    <div className="pack-preview" id="dogs"><PawPrint aria-hidden="true" /><div><span className="eyebrow">EVERY PERSONALITY WELCOME</span><h3>THE GOOD DOG CLUB.</h3></div><span className="handwritten">a little muddy.<br />a whole lot of love.</span></div>
  </section>;
}

export function DogHomepage() {
  return <main><HeroSection /><BrandIntroduction /><DogWorld /><footer className="site-footer"><a href="#home" className="brand"><Wordmark /></a><span>GOOD DAYS FOR VERY GOOD DOGS.</span><a href="#home" aria-label="Back to top"><ArrowUpRight /></a></footer></main>;
}
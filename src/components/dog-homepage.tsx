import { useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Menu, X, Heart, PawPrint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import sittingDog from '@/assets/sitting-dog.png';
import runningDog from '@/assets/running-dog.png';
import { Services, FinalCallToAction, ContactSection, CompleteFooter, Reveal } from '@/components/dog-sections';
import { HowItWorks, PersonalCare } from '@/components/dog-process-scenes';

function Spark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 60 60" fill="none" aria-hidden="true"><path d="M30 3 34 23 51 12 39 29 58 33 38 37 47 54 31 41 24 58 23 39 4 46 18 31 2 24 22 23 17 5 30 20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>;
}

function Wordmark() {
  return <><PawPrint aria-hidden="true" className="brand-paw" /><span className="wordmark">DON’T<br />BOARD ME<span className="brand-period">®</span></span></>;
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  return <header className="site-header" id="home" onKeyDown={event => { if (event.key === 'Escape' && open) { setOpen(false); toggleRef.current?.focus(); } }}>
    <a href="#home" className="brand" aria-label="Don't Board Me home"><Wordmark /></a>
    <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation" id="main-navigation">
      <a href="#about" onClick={() => setOpen(false)}>ABOUT US</a>
      <a href="#our-world" onClick={() => setOpen(false)}>OUR SERVICES</a>
      <a href="#contact" onClick={() => setOpen(false)}>SAY HELLO</a>
    </nav>
    <Button asChild className="club-button header-cta"><a href="#contact">SAY HELLO <ArrowUpRight /></a></Button>
    <Button ref={toggleRef} className="mobile-menu" variant="ghost" size="icon" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
  </header>;
}

function HeroSection() {
  return <section className="hero" aria-labelledby="hero-title">
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
    <Reveal className="intro-layout">
      <div className="intro-art"><div className="intro-orbit" aria-hidden="true" /><img src={runningDog} width={1536} height={1024} loading="lazy" alt="A happy hand-drawn dog running with its red leash trailing behind" /><span className="handwritten intro-note">life’s better<br />with a dog.</span><Spark className="intro-spark" /></div>
      <div className="intro-copy"><h2 id="intro-title">MORE THAN<br />JUST A<br /><span>GOOD BOY.</span></h2><p>Every dog deserves a day filled with movement, sniffing, exploring, and a little extra love. We make everyday adventures part of your dog’s happiest routine.</p><a href="#our-world" className="text-link">A LITTLE LOVE GOES A LONG WAY <ArrowUpRight /></a></div>
    </Reveal>
    <div className="intro-bottom"><span>FOR THE TAIL-WAGGERS. THE SNIFFERS. THE SOFA-SNUGGLERS.</span><PawPrint aria-hidden="true" /><span>AND EVERY GOOD DOG IN BETWEEN.</span></div>
  </section>;
}

export function DogHomepage() {
  return <><a href="#main-content" className="skip-link">Skip to content</a><Navigation /><main id="main-content" tabIndex={-1}><HeroSection /><BrandIntroduction /><Services /><HowItWorks /><PersonalCare /><FinalCallToAction /><ContactSection /></main><CompleteFooter /></>;
}
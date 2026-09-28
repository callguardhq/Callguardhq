import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronRight,
  Download,
  Fingerprint,
  LockKeyhole,
  MapPin,
  Menu,
  PhoneCall,
  Shield,
  ShieldCheck,
  Smartphone,
  X,
} from "lucide-react";

// Style reminder: Quiet Control — Swiss editorial hierarchy, near-black surfaces, exact rules, and restrained CallGuard red.
const heroImage = "https://d2xsxph8kpxj0f.cloudfront.net/310519663986606725/cuszzhDrxg8YzfaZZW7Hhk/callguard-hero-anchor-AY2x4jVnYbefPbYQtjJLXD.webp";
const evidenceImage = "https://d2xsxph8kpxj0f.cloudfront.net/310519663986606725/cuszzhDrxg8YzfaZZW7Hhk/callguard-evidence-detail-2B6QVot8zFJjEehzpjebhc.webp";
const shieldTexture = "https://d2xsxph8kpxj0f.cloudfront.net/310519663986606725/cuszzhDrxg8YzfaZZW7Hhk/callguard-shield-texture-QizqTFhNGoeWWLXjtT4v2m.webp";
const logoImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663986606725/ksydsCrXoWPmQOVu.webp";
const mockupImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663986606725/PapGFHvniMbnRGNS.webp";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function Home() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [installHelpOpen, setInstallHelpOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paymentNoticeOpen, setPaymentNoticeOpen] = useState(false);

  useEffect(() => {
    const capturePrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", capturePrompt);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => undefined);
    }
    return () => window.removeEventListener("beforeinstallprompt", capturePrompt);
  }, []);

  const handleInstall = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      await installPrompt.userChoice;
      setInstallPrompt(null);
      return;
    }
    setInstallHelpOpen(true);
  };

  const isIOS = typeof navigator !== "undefined" && /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);

  return (
    <div className="site-shell">
      <div className="topline"><span>CALLGUARD / GHANA</span><span className="topline-right"><span className="signal-dot" /> ACCRA · MOBILE SAFETY</span></div>
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="CallGuard home">
          <img src={logoImage} className="brand-mark" alt="CallGuard shield and phone symbol" />
          <span className="brand-name">CallGuard<span>Enterprise</span></span>
        </a>
        <Button variant="ghost" className="mobile-menu-toggle" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
        <nav className={mobileMenuOpen ? "main-nav nav-open" : "main-nav"} aria-label="Main navigation">
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it works</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#plans" onClick={() => setMobileMenuOpen(false)}>Plans</a>
        </nav>
        <Button variant="ghost" className="header-cta" onClick={handleInstall}><Download size={14} /> Install</Button>
      </header>

      <main id="top">
        <section className="hero-section page-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> MOBILE SAFETY · GHANA</div>
            <h1>Your phone’s<br /><em>bodyguard.</em></h1>
            <p className="hero-sub">Exit any situation in 5 sec. Catch who touches your phone. Built for Ghana.</p>
            <div className="hero-actions">
              <Button variant="ghost" className="button-primary" onClick={handleInstall}>Add to Home Screen <ArrowRight size={17} /></Button>
              <div className="works-offline"><span className="offline-check"><Check size={12} /></span><span>Works offline</span></div>
            </div>
            <div className="hero-proof">
              <span className="proof-rule" />
              <span className="proof-figure">1,200+</span>
              <span className="proof-caption">Trusted in Accra</span>
              <span className="proof-location"><MapPin size={13} /> ACCRA, GH</span>
            </div>
            <a className="scroll-cue" href="#how-it-works"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={15} /></a>
          </div>
          <div className="hero-visual">
            <div className="visual-index">01 / PERSONAL SECURITY</div>
            <div className="hero-image-frame">
              <img src={heroImage} alt="CallGuard security app on a phone at night in Accra" fetchPriority="high" />
              <div className="hero-image-caption"><span className="live-mark"><span /></span> MADE FOR EVERYDAY LIFE <span className="caption-divider">/</span> GHANA</div>
            </div>
            <div className="visual-coordinate">05°36′N&nbsp; 00°11′W</div>
          </div>
        </section>

        <section className="signal-strip" aria-label="CallGuard overview">
          <div><span className="strip-number">01</span><span>BUY TIME</span></div>
          <div><span className="strip-number">02</span><span>STAY AWARE</span></div>
          <div><span className="strip-number">03</span><span>KEEP A RECORD</span></div>
          <span className="strip-side">CALLGUARD V5 / GHANA</span>
        </section>

        <section className="intro-section page-wrap" id="how-it-works">
          <div className="section-marker"><span>02</span><span className="marker-line" /> HOW IT WORKS</div>
          <div className="intro-grid">
            <div className="intro-heading"><h2>A little room<br />to move.</h2><p>Built for real moments. Simple to set up. Ready when you need it.</p></div>
            <div className="steps-list">
              <article className="step-row"><span className="step-num">01</span><div className="step-icon"><PhoneCall size={18} /></div><div><h3>Pick your moment</h3><p>Choose a contact and set a short delay for a simulated incoming call.</p></div><ChevronRight className="step-arrow" size={16} /></article>
              <article className="step-row"><span className="step-num">02</span><div className="step-icon"><Fingerprint size={18} /></div><div><h3>Keep your phone yours</h3><p>Use local security controls and keep a clear record of demo events.</p></div><ChevronRight className="step-arrow" size={16} /></article>
              <article className="step-row"><span className="step-num">03</span><div className="step-icon"><LockKeyhole size={18} /></div><div><h3>Review when ready</h3><p>Find saved items together in your evidence vault.</p></div><ChevronRight className="step-arrow" size={16} /></article>
            </div>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="page-wrap features-wrap">
            <div className="section-marker"><span>03</span><span className="marker-line" /> BUILT WITH INTENTION</div>
            <div className="features-heading"><h2>Protection,<br /><span>without the noise.</span></h2><p>Useful tools, clear controls, and a dark-mode interface designed to stay out of your way.</p></div>
            <div className="feature-grid">
              <article className="feature-card feature-call"><span className="feature-label">01 / EXIT OPTION</span><div className="feature-glyph red-glyph"><PhoneCall size={21} /></div><h3>Fake Call Shield</h3><p>Choose a contact and a delay. Your simulated call appears in the app when the timer ends.</p><span className="feature-status"><span className="status-light" /> READY TO SET UP</span></article>
              <article className="feature-card feature-intruder"><span className="feature-label">02 / DEVICE ACTIVITY</span><div className="feature-glyph"><ShieldCheck size={21} /></div><h3>Intruder Detection</h3><p>Explore the security-event flow and keep sample activity in your local vault.</p><span className="feature-status"><span className="status-light" /> CONTROLLED DEMO</span></article>
              <article className="feature-card feature-vault"><span className="feature-label">03 / LOCAL RECORD</span><div className="feature-glyph"><LockKeyhole size={21} /></div><h3>Evidence Vault</h3><p>A single place to review saved items. Cloud backup is a separate setup step.</p><span className="feature-status"><span className="status-light" /> ON-DEVICE FIRST</span></article>
            </div>
            <p className="feature-disclosure"><Shield size={13} /> Camera, location, cloud sync, and payment services require explicit permissions and separate setup.</p>
          </div>
        </section>

        <section className="product-section page-wrap">
          <div className="product-copy">
            <div className="section-marker"><span>04</span><span className="marker-line" /> THE APP</div>
            <h2>Every tool.<br />One clear view.</h2>
            <p>Move from the home dashboard to a simulated call, security event, or saved evidence without losing your place.</p>
            <a className="text-link" href="#plans">See the plans <ArrowRight size={15} /></a>
            <div className="product-detail-frame"><img src={evidenceImage} alt="CallGuard evidence vault concept on a smartphone" loading="lazy" /></div>
          </div>
          <div className="mockup-panel">
            <div className="mockup-topline"><span>PRODUCT PREVIEW</span><span>V5.0 / DARK MODE</span></div>
            <img className="mockup-image" src={mockupImage} alt="CallGuard v5 Enterprise screen mockup, including secure login, home dashboard, fake call shield, incoming call, intrusion detection, and evidence vault" loading="lazy" />
            <div className="mockup-footer"><span>DESIGNED FOR IPHONE</span><span>FIG. 01</span></div>
          </div>
        </section>

        <section className="ghana-section" style={{ backgroundImage: `linear-gradient(90deg, rgba(10,10,10,.97) 0%, rgba(10,10,10,.76) 58%, rgba(10,10,10,.55) 100%), url(${shieldTexture})` }}>
          <div className="page-wrap ghana-inner">
            <div className="section-marker"><span>05</span><span className="marker-line" /> MADE FOR GHANA</div>
            <div className="ghana-content"><h2>Made for here.<br /><em>Ready wherever.</em></h2><p>Built for the way people move through Accra and beyond. CallGuard puts practical phone-safety tools one tap away—even when your connection drops.</p><Button variant="ghost" className="button-primary" onClick={handleInstall}>Add to Home Screen <ArrowRight size={17} /></Button><div className="ghana-proof"><MapPin size={15} /><span>Trusted by 1,200+ in Accra</span></div></div>
            <div className="ghana-stamp"><span>GH</span><span>05°36′N</span><span>CALLGUARD / 2026</span></div>
          </div>
        </section>

        <section className="pricing-section page-wrap" id="plans">
          <div className="section-marker"><span>06</span><span className="marker-line" /> PLANS & PRICING</div>
          <div className="pricing-header"><div><h2>Simple plans.<br /><span>Clear value.</span></h2></div><p>Choose your level of cover. Pay with MTN MoMo when checkout is available.</p></div>
          <div className="pricing-grid">
            <article className="price-card"><div className="price-top"><span className="plan-kicker">THE EVERYDAY PLAN</span><span className="plan-code">01</span></div><h3>Defender</h3><p className="price">GH₵45<span>/mo</span></p><div className="price-divider" /><ul><li><Check size={14} /> Unlimited fake calls</li><li><Check size={14} /> Intruder photo + GPS</li><li><Check size={14} /> Evidence Vault</li></ul><Button variant="outline" className="button-outline" onClick={() => setPaymentNoticeOpen(true)}>Pay with MTN MoMo <ArrowRight size={16} /></Button></article>
            <article className="price-card price-card-pro"><div className="popular-tag"><span className="signal-dot" /> MOST POPULAR</div><div className="price-top"><span className="plan-kicker">THE FULL COVER</span><span className="plan-code">02</span></div><h3>Pro</h3><p className="price">GH₵100<span>/mo</span></p><div className="price-divider" /><ul><li><Check size={14} /> Everything in Defender</li><li><Check size={14} /> Cloud backup</li><li><Check size={14} /> Email alerts</li><li><Check size={14} /> 90-day history & PDF export</li></ul><Button variant="ghost" className="button-primary price-button" onClick={() => setPaymentNoticeOpen(true)}>Pay with MTN MoMo <ArrowRight size={16} /></Button></article>
          </div>
          <p className="payment-note"><LockKeyhole size={13} /> Mobile Money checkout is not connected yet. Contact <a href="mailto:callguardhq@gmail.com">callguardhq@gmail.com</a> for setup and availability.</p>
        </section>

        <section className="closing-cta" id="install">
          <div className="page-wrap closing-inner"><div className="closing-mark"><img src={logoImage} alt="" /></div><div><span className="closing-kicker">CALLGUARD V5 ENTERPRISE · GHANA</span><h2>Your phone’s<br /><em>bodyguard.</em></h2><p>Install once. Keep the tools close, even offline.</p></div><Button variant="ghost" className="button-primary closing-button" onClick={handleInstall}>Add to Home Screen <ArrowRight size={17} /><span>Works offline</span></Button></div>
        </section>
      </main>

      <footer className="site-footer"><div className="page-wrap footer-inner"><a className="brand-lockup footer-brand" href="#top"><img src={logoImage} className="brand-mark" alt="" /><span className="brand-name">CallGuard<span>Enterprise</span></span></a><span className="footer-copy">© 2026 CallGuard Enterprise</span><a href="mailto:callguardhq@gmail.com" className="footer-email">callguardhq@gmail.com <ArrowRight size={14} /></a></div><div className="page-wrap footer-bottom"><span>BUILT FOR SECURITY TEAMS · DARK MODE ONLY</span><a href="#top">BACK TO TOP ↑</a></div></footer>

      <Dialog open={installHelpOpen} onOpenChange={setInstallHelpOpen}>
        <DialogContent className="install-modal" showCloseButton={false}>
          <DialogClose asChild><Button variant="ghost" className="modal-close" aria-label="Close install help"><X size={18} /></Button></DialogClose>
          <div className="modal-icon"><Smartphone size={23} /></div>
          <span className="section-kicker">INSTALL GUIDE</span>
          <DialogTitle id="install-title">Keep CallGuard close.</DialogTitle>
          <DialogDescription className="modal-intro">Add this page to your home screen for a full-screen, offline-ready experience.</DialogDescription>
          <div className="install-steps">{isIOS ? <><div><span>1</span><p>Open this page in <strong>Safari</strong>.</p></div><div><span>2</span><p>Tap the <strong>Share</strong> button in the browser toolbar.</p></div><div><span>3</span><p>Choose <strong>Add to Home Screen</strong>, then tap Add.</p></div></> : isAndroid ? <><div><span>1</span><p>Open the browser menu in <strong>Chrome</strong>.</p></div><div><span>2</span><p>Choose <strong>Install app</strong> or <strong>Add to Home screen</strong>.</p></div><div><span>3</span><p>Confirm. The page shell is cached for offline access.</p></div></> : <><div><span>1</span><p>Open this page in a supported mobile browser.</p></div><div><span>2</span><p>Use the browser menu to select <strong>Install app</strong> or <strong>Add to Home Screen</strong>.</p></div><div><span>3</span><p>Reopen CallGuard from your home screen to use its cached page shell offline.</p></div></>}</div>
          <DialogClose asChild><Button variant="ghost" className="button-primary modal-done">Got it <Check size={16} /></Button></DialogClose>
        </DialogContent>
      </Dialog>
      <Dialog open={paymentNoticeOpen} onOpenChange={setPaymentNoticeOpen}>
        <DialogContent className="install-modal payment-modal" showCloseButton={false}>
          <DialogClose asChild><Button variant="ghost" className="modal-close" aria-label="Close payment information"><X size={18} /></Button></DialogClose>
          <div className="modal-icon"><LockKeyhole size={22} /></div>
          <span className="section-kicker">MTN MOBILE MONEY</span>
          <DialogTitle id="payment-title">Checkout is not live yet.</DialogTitle>
          <DialogDescription className="modal-intro">The listed Defender and Pro prices are the plans provided by CallGuard. Mobile Money merchant checkout still needs to be connected before payments can be accepted.</DialogDescription>
          <a className="button-primary modal-done contact-button" href="mailto:callguardhq@gmail.com?subject=CallGuard%20Mobile%20Money%20checkout">Contact CallGuard <ArrowRight size={16} /></a>
        </DialogContent>
      </Dialog>
    </div>
  );
}

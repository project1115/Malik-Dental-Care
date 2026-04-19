import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, 
  Menu, X, CheckCircle2, ChevronRight, Star, 
  Quote, ShieldCheck, HeartPulse, Activity, Play, ChevronLeft, ZoomIn
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const clinicLogo = "/logo.png";

const TopBar = () => (
  <div className="bg-primary text-primary-foreground py-2 px-4 text-sm hidden md:block">
    <div className="container mx-auto flex justify-between items-center max-w-7xl">
      <div className="flex items-center space-x-6">
        <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-accent transition-colors">
          <Phone className="h-4 w-4" />
          <span>Emergency: +91 98765 43210</span>
        </a>
        <span className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>123 Dental Street, New Delhi, India</span>
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#" className="hover:text-accent transition-colors" aria-label="Facebook">
          <Facebook className="h-4 w-4" />
        </a>
        <a href="#" className="hover:text-accent transition-colors" aria-label="Twitter">
          <Twitter className="h-4 w-4" />
        </a>
        <a href="#" className="hover:text-accent transition-colors" aria-label="Instagram">
          <Instagram className="h-4 w-4" />
        </a>
      </div>
    </div>
  </div>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <img src={clinicLogo} alt="Dr. Karan Malik Dental Clinic Logo" className="h-14 w-14 object-contain" />
          <div>
            <h1 className="text-xl font-bold font-serif text-foreground leading-none">Dr. Karan Malik</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Dental Clinic</p>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
            <a href="#contact">Book Appointment</a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-border shadow-lg py-4 px-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-base font-medium text-foreground py-2 border-b border-border/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button asChild className="w-full mt-4 bg-primary text-white rounded-full">
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Book Appointment</a>
          </Button>
        </div>
      )}
    </header>
  );
};

const Hero = () => (
  <section id="home" className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="/images/hero.png" 
        alt="Modern Dental Clinic" 
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
    </div>
    
    <div className="container relative z-10 mx-auto px-4 max-w-7xl">
      <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide mb-6">
          Advanced Dental Care in New Delhi
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-foreground leading-tight mb-6">
          A Beautiful Smile Begins With Exceptional Care
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
          Experience world-class dentistry with Dr. Karan Malik. Over 20 years of crafting perfect smiles using state-of-the-art technology and a gentle, patient-centric approach.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full text-base h-14 px-8">
            <a href="#contact">Book Your Consultation</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full text-base h-14 px-8 border-primary/20 text-foreground hover:bg-primary/5">
            <a href="#services">Explore Services</a>
          </Button>
        </div>
        
        <div className="mt-12 flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            <span>Painless Procedures</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            <span>Modern Equipment</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 bg-white">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative overflow-hidden md:overflow-visible px-4 md:px-0">
          <div className="absolute inset-0 md:-inset-4 bg-secondary/50 rounded-[2.5rem] transform -rotate-3 z-0"></div>
          <img 
            src="/images/doctor.png" 
            alt="Dr. Karan Malik" 
            className="relative z-10 rounded-[2rem] shadow-xl w-full max-w-md mx-auto object-cover aspect-[3/4]"
          />
          <div className="absolute -bottom-6 -right-6 z-20 bg-white p-6 rounded-2xl shadow-lg border border-border/50 animate-in fade-in zoom-in duration-1000 delay-300 hidden md:block">
            <div className="text-4xl font-bold text-primary mb-1">20+</div>
            <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Years of<br/>Experience</div>
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-6">
            Meet Dr. Karan Malik
          </h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            With over two decades of clinical experience, Dr. Karan Malik is a leading figure in modern dentistry. His philosophy is simple: treat every patient like family, and use the best technology available to make every visit painless and perfect.
          </p>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            From routine checkups to complex full-mouth rehabilitations, Dr. Malik brings a meticulous eye for detail and a warm, calming presence to his practice, ensuring you leave with a smile you're proud of.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {[
              { title: "Expert Care", desc: "Highly trained specialist" },
              { title: "Advanced Tech", desc: "Latest dental innovations" },
              { title: "Gentle Approach", desc: "Anxiety-free treatments" },
              { title: "Patient First", desc: "Tailored treatment plans" }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="mt-1 bg-primary/10 p-2 rounded-full text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Signature_of_John_Hancock.svg" alt="Signature" className="h-12 opacity-50" />
        </div>
      </div>
    </div>
  </section>
);

const Services = () => {
  const services = [
    { title: "General Dentistry", desc: "Comprehensive checkups, cleanings, and preventative care to maintain optimal oral health.", icon: <Activity className="h-8 w-8" /> },
    { title: "Teeth Whitening", desc: "Professional bleaching treatments for a brighter, more confident smile in just one visit.", icon: <Star className="h-8 w-8" /> },
    { title: "Dental Implants", desc: "Permanent, natural-looking replacements for missing teeth that restore function and aesthetics.", icon: <ShieldCheck className="h-8 w-8" /> },
    { title: "Orthodontics", desc: "Traditional braces and clear aligners to straighten teeth and correct bite issues.", icon: <HeartPulse className="h-8 w-8" /> },
    { title: "Root Canal", desc: "Painless endodontic therapy to save infected teeth and relieve severe toothaches.", icon: <Activity className="h-8 w-8" /> },
    { title: "Cosmetic Dentistry", desc: "Veneers, bonding, and smile makeovers tailored to your unique facial features.", icon: <Star className="h-8 w-8" /> },
  ];

  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">Our Expertise</span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mt-4 mb-6">Comprehensive Dental Services</h2>
          <p className="text-muted-foreground text-lg">We offer a full spectrum of dental treatments under one roof, utilizing advanced techniques to deliver superior results.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.desc}</p>
              <a href="#contact" className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const useCountUp = (end: number, duration: number = 2000, shouldStart: boolean = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(step);
  }, [shouldStart, end, duration]);
  return count;
};

const StatCard = ({
  value, suffix, label, className = "", delay = 0, isVisible
}: {
  value: number; suffix: string; label: string; className?: string; delay?: number; isVisible: boolean;
}) => {
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 2000, started);

  useEffect(() => {
    if (isVisible && !started) {
      const timer = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isVisible, started, delay]);

  const displayValue = value >= 1000 ? `${Math.floor(count / 1000)}k` : count;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000, ease: "easeOut" }}
      className={`bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10 text-center ${className}`}
    >
      <div className="text-4xl font-bold text-accent mb-2">
        {displayValue}{suffix}
      </div>
      <div className="text-sm font-medium uppercase tracking-wider">{label}</div>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">Why Patients Trust Us</h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Choosing a dentist is an important decision. We've built our practice on trust, transparency, and clinical excellence.
            </p>
            <ul className="space-y-6">
              {[
                "Over 20 years of proven clinical success",
                "State-of-the-art diagnostic and treatment technology",
                "Strict sterilization and hygiene protocols",
                "Transparent, affordable pricing with no hidden fees",
                "Comfortable, anxiety-free clinic environment"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="bg-white/20 p-1 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            <StatCard value={5000} suffix="+" label="Happy Patients" isVisible={isVisible} delay={0} />
            <StatCard value={20} suffix="+" label="Years Experience" isVisible={isVisible} delay={200} className="md:translate-y-8" />
            <StatCard value={15} suffix="+" label="Awards Won" isVisible={isVisible} delay={400} className="md:-translate-y-8" />
            <StatCard value={100} suffix="%" label="Commitment" isVisible={isVisible} delay={600} />
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const photos = [
    { src: "/gallery/clinic-reception.png", caption: "Our Modern Reception" },
    { src: "/gallery/treatment-room.png", caption: "Advanced Treatment Room" },
    { src: "/gallery/dentist-patient.png", caption: "Gentle Patient Care" },
    { src: "/gallery/dental-tools.png", caption: "Sterilized Equipment" },
    { src: "/gallery/patient-smile.png", caption: "Beautiful Results" },
    { src: "/gallery/waiting-lounge.png", caption: "Comfortable Lounge" },
  ];

  const videos = [
    { thumbnail: "/gallery/treatment-room.png", title: "A Tour of Our Clinic", duration: "2:34" },
    { thumbnail: "/gallery/dentist-patient.png", title: "What to Expect During Your First Visit", duration: "3:12" },
    { thumbnail: "/gallery/patient-smile.png", title: "Patient Success Story — Teeth Whitening", duration: "1:58" },
  ];

  const goNext = () => setLightbox(prev => prev !== null ? (prev + 1) % photos.length : null);
  const goPrev = () => setLightbox(prev => prev !== null ? (prev - 1 + photos.length) % photos.length : null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  return (
    <section id="gallery" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">Our Clinic</span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mt-4 mb-4">Photo & Video Gallery</h2>
          <p className="text-muted-foreground text-lg">Take a virtual tour of our state-of-the-art facility and see the care we put into every detail.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-border/50">
            {(["photos", "videos"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Photos Grid */}
        <AnimatePresence mode="wait">
          {activeTab === "photos" && (
            <motion.div
              key="photos"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {photos.map((photo, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="relative overflow-hidden rounded-2xl cursor-pointer group aspect-[4/3] bg-secondary"
                  onClick={() => setLightbox(i)}
                >
                  <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-semibold">{photo.caption}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Videos Grid */}
          {activeTab === "videos" && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {videos.map((video, i) => (
                <div key={i} className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-sm border border-border/50 hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 group-hover:bg-primary group-hover:text-white transition-colors duration-300 rounded-full flex items-center justify-center shadow-lg">
                        <Play className="h-7 w-7 text-primary group-hover:text-white ml-1 transition-colors duration-300" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-md">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{video.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">Dr. Karan Malik Dental Clinic</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
              onClick={e => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
              onClick={e => { e.stopPropagation(); goNext(); }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl max-h-[85vh] flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={photos[lightbox].src}
                alt={photos[lightbox].caption}
                className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
              />
              <p className="text-white/80 text-sm mt-4 font-medium">{photos[lightbox].caption}</p>
              <p className="text-white/40 text-xs mt-1">{lightbox + 1} / {photos.length}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Rahul Sharma", text: "Dr. Malik is incredible! I was always afraid of dentists, but his gentle approach completely changed my mind. The clinic is spotless and the staff is wonderful.", rating: 5 },
    { name: "Priya Patel", text: "Got my Invisalign treatment here. The entire process was smooth, transparent, and the results are amazing. Highly recommend for any cosmetic work.", rating: 5 },
    { name: "Amit Kumar", text: "The best dental experience I've ever had. Modern equipment, no waiting time, and Dr. Karan explains everything clearly before starting the procedure.", rating: 5 },
    { name: "Sunita Verma", text: "Had my root canal done here and was genuinely surprised — completely painless! Dr. Malik's expertise and the friendly staff made the whole experience so comfortable.", rating: 5 },
    { name: "Deepak Singh", text: "Brought my whole family here for regular check-ups. The pediatric care for my kids was exceptional. They actually look forward to their dental visits now!", rating: 5 },
    { name: "Neha Gupta", text: "Got teeth whitening done and the results are stunning. Professional, caring team and very transparent about costs. Will definitely be coming back!", rating: 5 },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 3500);

    return () => {
      clearInterval(autoplay);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="reviews" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-6">Patient Stories</h2>
          <p className="text-muted-foreground text-lg">Don't just take our word for it. Read what our patients have to say about their experience with us.</p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-secondary/20 p-8 rounded-2xl relative border border-border/50"
              >
                <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10" />
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-8 text-lg italic leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{review.name}</h4>
                    <p className="text-sm text-muted-foreground">Verified Patient</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "w-8 bg-primary" : "w-2.5 bg-primary/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Appointment Request Sent",
      description: "Our team will contact you shortly to confirm your appointment.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mt-4 mb-6">Book Your Appointment</h2>
            <p className="text-muted-foreground text-lg mb-10">
              Ready to improve your smile? Fill out the form, and our reception team will get back to you within 24 hours to schedule your visit.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-white h-12 w-12 rounded-full flex items-center justify-center shadow-sm text-primary shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg mb-1">Clinic Address</h4>
                  <p className="text-muted-foreground">123 Dental Street, Health Park Avenue<br />New Delhi, India 110001</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-white h-12 w-12 rounded-full flex items-center justify-center shadow-sm text-primary shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg mb-1">Phone Number</h4>
                  <p className="text-muted-foreground">+91 98765 43210<br />011-2345-6789</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-white h-12 w-12 rounded-full flex items-center justify-center shadow-sm text-primary shrink-0">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg mb-1">Working Hours</h4>
                  <p className="text-muted-foreground">Monday - Saturday: 9:00 AM - 8:00 PM<br />Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <Input required placeholder="John" className="h-12 bg-secondary/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <Input required placeholder="Doe" className="h-12 bg-secondary/20" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <Input required type="tel" placeholder="+91" className="h-12 bg-secondary/20" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <Input required type="email" placeholder="john@example.com" className="h-12 bg-secondary/20" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Preferred Date</label>
                <Input required type="date" className="h-12 bg-secondary/20" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message (Optional)</label>
                <Textarea placeholder="How can we help you?" className="min-h-[100px] bg-secondary/20" />
              </div>

              <Button type="submit" className="w-full h-14 text-lg rounded-xl bg-primary hover:bg-primary/90 text-white">
                Request Appointment
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white pt-20 pb-10">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img src={clinicLogo} alt="Dr. Karan Malik Dental Clinic Logo" className="h-14 w-14 object-contain" />
            <span className="text-2xl font-bold font-serif">Dr. Karan Malik</span>
          </div>
          <p className="text-slate-400 mb-6 leading-relaxed">
            Providing exceptional dental care in a comfortable and friendly environment. Your smile is our top priority.
          </p>
          <div className="flex gap-4">
            <a href="#" className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#services" className="hover:text-primary transition-colors">Dental Services</a></li>
            <li><a href="#gallery" className="hover:text-primary transition-colors">Photo Gallery</a></li>
            <li><a href="#reviews" className="hover:text-primary transition-colors">Patient Reviews</a></li>
            <li><a href="#contact" className="hover:text-primary transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Our Services</h4>
          <ul className="space-y-4 text-slate-400">
            <li>General Dentistry</li>
            <li>Cosmetic Dentistry</li>
            <li>Orthodontics</li>
            <li>Dental Implants</li>
            <li>Teeth Whitening</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Contact Info</h4>
          <ul className="space-y-4 text-slate-400">
            <li className="flex gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <span>123 Dental Street, Health Park Avenue, New Delhi, India 110001</span>
            </li>
            <li className="flex gap-3">
              <Phone className="h-5 w-5 text-primary shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex gap-3">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <span>info@drkaranmalik.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Dr. Karan Malik Dental Clinic. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-background text-foreground">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
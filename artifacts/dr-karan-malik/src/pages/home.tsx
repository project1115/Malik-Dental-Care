import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, 
  Menu, X, CheckCircle2, ChevronRight, Star, 
  Quote, ShieldCheck, HeartPulse, Activity, Play, ChevronLeft, ZoomIn,
  Trophy, Microscope, Users, BadgeCheck, Sparkles, TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const clinicLogo = "/logo.png";

const TopBar = () => (
  <div className="text-white py-2 px-4 text-sm hidden md:block" style={{ background: "linear-gradient(90deg, #0d9488, #0f766e)" }}>
    <div className="container mx-auto flex justify-between items-center max-w-7xl">
      <div className="flex items-center space-x-6">
        <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-yellow-300 transition-colors font-medium">
          <Phone className="h-3.5 w-3.5" />
          <span>Emergency: +91 98765 43210</span>
        </a>
        <span className="text-white/50">|</span>
        <span className="flex items-center gap-2 text-white/80">
          <Clock className="h-3.5 w-3.5" />
          <span>Mon–Sat: 9AM – 8PM</span>
        </span>
      </div>
      <div className="flex items-center gap-5">
        <span className="text-white/70 text-xs">Follow us:</span>
        {[
          { Icon: Facebook, label: "Facebook" },
          { Icon: Twitter, label: "Twitter" },
          { Icon: Instagram, label: "Instagram" },
        ].map(({ Icon, label }) => (
          <a key={label} href="#" aria-label={label}
            className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/25 transition-colors">
            <Icon className="h-3 w-3" />
          </a>
        ))}
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
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_24px_rgba(0,0,0,0.08)] py-2"
          : "bg-white/90 backdrop-blur-sm py-3"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
            <img src={clinicLogo} alt="Dr. Karan Malik Dental Clinic Logo" className="h-12 w-12 object-contain relative z-10" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-serif text-foreground leading-none tracking-tight">Dr. Karan Malik</h1>
            <p className="text-[10px] text-primary uppercase tracking-[0.18em] font-bold mt-0.5">Dental Clinic</p>
          </div>
        </a>

        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+919876543210" className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            <Phone className="h-4 w-4" />
            +91 98765 43210
          </a>
          <a href="#contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-primary/30 hover:shadow-lg hover:-translate-y-0.5">
            Book Appointment
          </a>
        </div>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-white border-t border-border/30 shadow-xl"
          >
            <div className="px-4 py-6 flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-foreground/80 hover:text-primary py-3 px-3 rounded-xl hover:bg-primary/5 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}
                className="mt-3 w-full text-center bg-primary text-white rounded-full py-3 font-semibold text-base">
                Book Appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
      <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.88) 45%, rgba(255,255,255,0.3) 75%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>

    <div className="container relative z-10 mx-auto px-4 max-w-7xl">
      <motion.div
        className="max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white border border-primary/20 rounded-full px-4 py-2 mb-7 shadow-sm"
        >
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-semibold text-primary tracking-wide">Now Accepting New Patients · New Delhi</span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-foreground leading-[1.08] mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Your Perfect<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">Smile Awaits</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          Experience world-class dentistry with Dr. Karan Malik — 20+ years of crafting perfect smiles with a gentle, patient-first approach.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <a href="#contact"
            className="inline-flex items-center justify-center gap-2 text-white text-base font-semibold rounded-full h-14 px-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
            style={{ background: "linear-gradient(135deg, #0d9488, #14b8a6)" }}
          >
            Book Free Consultation
            <ChevronRight className="h-5 w-5" />
          </a>
          <a href="#services"
            className="inline-flex items-center justify-center gap-2 text-foreground text-base font-semibold rounded-full h-14 px-8 border-2 border-foreground/15 hover:border-primary hover:text-primary bg-white/60 backdrop-blur-sm transition-all duration-300"
          >
            Explore Services
          </a>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-border/40">
            <div className="flex -space-x-2">
              {["bg-blue-400", "bg-rose-400", "bg-amber-400"].map((c, i) => (
                <div key={i} className={`h-8 w-8 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>{["R","P","A"][i]}</div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-xs text-muted-foreground font-medium">5,000+ Happy Patients</p>
            </div>
          </div>
          {[
            { icon: <ShieldCheck className="h-4 w-4 text-primary" />, text: "Painless Procedures" },
            { icon: <CheckCircle2 className="h-4 w-4 text-primary" />, text: "ISO Certified Clinic" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm border border-border/40">
              {item.icon}
              <span className="text-sm font-semibold text-foreground/80">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-28 bg-white overflow-hidden">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          className="relative px-4 md:px-0"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-teal-100/50 rounded-[2.5rem] -rotate-2 z-0" />
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 to-transparent rounded-[2.5rem] rotate-1 z-0" />
          <img
            src="/images/doctor.png"
            alt="Dr. Karan Malik"
            className="relative z-10 rounded-[2rem] shadow-2xl w-full max-w-md mx-auto object-cover aspect-[3/4]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -bottom-4 -right-4 z-20 bg-white p-5 rounded-2xl shadow-xl border border-border/30 hidden md:block"
          >
            <div className="text-4xl font-black text-primary mb-0.5">20+</div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Years of<br />Excellence</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute top-8 -left-4 z-20 bg-white p-4 rounded-2xl shadow-xl border border-border/30 hidden md:flex items-center gap-3"
          >
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
              <BadgeCheck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-xs font-black text-foreground uppercase tracking-wider">MDS Certified</div>
              <div className="text-xs text-muted-foreground">Prosthodontist</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-primary font-bold tracking-[0.2em] uppercase text-xs bg-primary/10 rounded-full px-4 py-1.5 mb-5">About the Doctor</span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-6 leading-tight">
            Meet<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500">Dr. Karan Malik</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-5 leading-relaxed">
            With over two decades of clinical experience, Dr. Karan Malik is a leading prosthodontist in New Delhi. His philosophy is simple — treat every patient like family, and use the best technology available to make every visit painless and perfect.
          </p>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            From routine checkups to complex full-mouth rehabilitations, Dr. Malik brings meticulous precision and a warm, calming presence that turns nervous patients into lifelong ones.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              { icon: <Trophy className="h-5 w-5" />, title: "Award-Winning Care", desc: "15+ national dental awards", color: "text-amber-500 bg-amber-50" },
              { icon: <Microscope className="h-5 w-5" />, title: "Advanced Technology", desc: "Digital X-ray, 3D Imaging", color: "text-blue-500 bg-blue-50" },
              { icon: <HeartPulse className="h-5 w-5" />, title: "Gentle Approach", desc: "100% anxiety-free experience", color: "text-rose-500 bg-rose-50" },
              { icon: <Users className="h-5 w-5" />, title: "Patient First", desc: "Personalized treatment plans", color: "text-teal-600 bg-teal-50" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="flex gap-4 items-start p-4 rounded-2xl border border-border/40 hover:border-primary/30 hover:shadow-md transition-all duration-300 bg-white"
              >
                <div className={`mt-0.5 p-2.5 rounded-xl ${item.color} flex-shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a href="#contact"
              className="inline-flex items-center gap-2 text-white font-semibold rounded-full px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 text-sm"
              style={{ background: "linear-gradient(135deg, #0d9488, #14b8a6)" }}
            >
              Book Consultation <ChevronRight className="h-4 w-4" />
            </a>
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Free</span> first consultation
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Services = () => {
  const services = [
    { title: "General Dentistry", desc: "Comprehensive checkups, cleanings, and preventative care to maintain optimal oral health for the whole family.", icon: <Activity className="h-7 w-7" />, gradient: "from-teal-400 to-cyan-500", num: "01" },
    { title: "Teeth Whitening", desc: "Professional in-chair bleaching for a dramatically brighter, more confident smile — results in a single visit.", icon: <Sparkles className="h-7 w-7" />, gradient: "from-amber-400 to-yellow-500", num: "02" },
    { title: "Dental Implants", desc: "Permanent, natural-looking tooth replacements that restore full function and look completely natural.", icon: <ShieldCheck className="h-7 w-7" />, gradient: "from-blue-500 to-indigo-500", num: "03" },
    { title: "Orthodontics", desc: "Invisible aligners and modern braces to straighten teeth and perfect your bite with precision.", icon: <TrendingUp className="h-7 w-7" />, gradient: "from-purple-500 to-violet-500", num: "04" },
    { title: "Root Canal", desc: "Painless endodontic therapy using advanced techniques to save infected teeth and eliminate severe pain.", icon: <HeartPulse className="h-7 w-7" />, gradient: "from-rose-400 to-pink-500", num: "05" },
    { title: "Cosmetic Dentistry", desc: "Veneers, bonding, and complete smile makeovers precisely tailored to complement your facial features.", icon: <Star className="h-7 w-7" />, gradient: "from-emerald-400 to-green-500", num: "06" },
  ];

  return (
    <section id="services" className="py-28 bg-[#f8fafa] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-primary font-bold tracking-[0.2em] uppercase text-xs bg-primary/10 rounded-full px-4 py-1.5 mb-5">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-5 leading-tight">Comprehensive<br />Dental Services</h2>
          <p className="text-muted-foreground text-lg">A full spectrum of dental care under one roof — from routine checkups to complex smile transformations.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-border/40 hover:shadow-xl hover:border-transparent transition-all duration-400 group relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                  {service.icon}
                </div>
                <span className="text-4xl font-black text-foreground/5 group-hover:text-foreground/8 transition-colors select-none">{service.num}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.desc}</p>
              <a href="#contact" className="inline-flex items-center text-sm font-bold text-primary/70 group-hover:text-primary transition-colors gap-1">
                Book Now <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
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
  value, suffix, label, icon, gradient, className = "", delay = 0, isVisible
}: {
  value: number; suffix: string; label: string; icon: React.ReactNode; gradient: string; className?: string; delay?: number; isVisible: boolean;
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
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: delay / 1000, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.03 }}
      className={`relative overflow-hidden rounded-2xl p-6 text-center group cursor-default ${className}`}
      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${gradient}`} style={{ opacity: 0.08 }} />
      <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl mb-4 mx-auto ${gradient}`}>
        {icon}
      </div>
      <div className="text-4xl font-bold text-white mb-1">
        {displayValue}{suffix}
      </div>
      <div className="text-sm font-medium text-white/60 uppercase tracking-wider">{label}</div>
    </motion.div>
  );
};

const trustPoints = [
  {
    icon: <Trophy className="h-5 w-5" />,
    gradient: "from-yellow-400 to-orange-500",
    bg: "bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-yellow-400/30",
    iconColor: "text-yellow-400",
    title: "20+ Years of Proven Excellence",
    desc: "Two decades of trusted dental care with thousands of successful treatments.",
  },
  {
    icon: <Microscope className="h-5 w-5" />,
    gradient: "from-blue-400 to-cyan-500",
    bg: "bg-gradient-to-br from-blue-400/20 to-cyan-500/20 border-blue-400/30",
    iconColor: "text-blue-400",
    title: "State-of-the-Art Technology",
    desc: "Advanced digital imaging and modern equipment for precise, comfortable care.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    gradient: "from-green-400 to-emerald-500",
    bg: "bg-gradient-to-br from-green-400/20 to-emerald-500/20 border-green-400/30",
    iconColor: "text-green-400",
    title: "Strict Safety & Hygiene Protocols",
    desc: "Fully sterilized instruments and clinic-grade hygiene standards, every visit.",
  },
  {
    icon: <BadgeCheck className="h-5 w-5" />,
    gradient: "from-purple-400 to-violet-500",
    bg: "bg-gradient-to-br from-purple-400/20 to-violet-500/20 border-purple-400/30",
    iconColor: "text-purple-400",
    title: "Transparent, No Hidden Fees",
    desc: "Clear pricing upfront. We explain every cost before any treatment begins.",
  },
  {
    icon: <HeartPulse className="h-5 w-5" />,
    gradient: "from-rose-400 to-pink-500",
    bg: "bg-gradient-to-br from-rose-400/20 to-pink-500/20 border-rose-400/30",
    iconColor: "text-rose-400",
    title: "Anxiety-Free Environment",
    desc: "Gentle, patient-first approach so every visit is calm and stress-free.",
  },
];

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
      { threshold: 0.2 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1b2a 0%, #0a2e2a 40%, #0f1f3d 100%)" }}>
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #14b8a6, transparent)" }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }} />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-5">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium text-white/80">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-white mb-4">Why Patients <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">Trust Us</span></h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Choosing a dentist is a big decision. We've built our practice on trust, transparency, and clinical excellence.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            {trustPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ x: 6 }}
                className={`flex items-start gap-4 p-4 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${point.bg}`}
              >
                <div className={`flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${point.gradient} shadow-lg`}>
                  <span className="text-white">{point.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base mb-0.5">{point.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            <StatCard value={5000} suffix="+" label="Happy Patients" icon={<Users className="h-6 w-6 text-white" />} gradient="bg-gradient-to-br from-teal-400 to-cyan-500" isVisible={isVisible} delay={0} />
            <StatCard value={20} suffix="+" label="Years Experience" icon={<TrendingUp className="h-6 w-6 text-white" />} gradient="bg-gradient-to-br from-yellow-400 to-orange-500" isVisible={isVisible} delay={200} className="md:translate-y-6" />
            <StatCard value={15} suffix="+" label="Awards Won" icon={<Trophy className="h-6 w-6 text-white" />} gradient="bg-gradient-to-br from-purple-400 to-violet-500" isVisible={isVisible} delay={400} className="md:-translate-y-6" />
            <StatCard value={100} suffix="%" label="Commitment" icon={<HeartPulse className="h-6 w-6 text-white" />} gradient="bg-gradient-to-br from-rose-400 to-pink-500" isVisible={isVisible} delay={600} />
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

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5 flex-shrink-0">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const avatarColors = [
  { bg: "bg-blue-500", text: "text-white" },
  { bg: "bg-red-500", text: "text-white" },
  { bg: "bg-green-600", text: "text-white" },
  { bg: "bg-purple-600", text: "text-white" },
  { bg: "bg-orange-500", text: "text-white" },
  { bg: "bg-teal-600", text: "text-white" },
];

const Testimonials = () => {
  const reviews = [
    { name: "Rahul Sharma", text: "Dr. Malik is incredible! I was always afraid of dentists, but his gentle approach completely changed my mind. The clinic is spotless and the staff is wonderful.", rating: 5, time: "2 weeks ago", localGuide: true },
    { name: "Priya Patel", text: "Got my Invisalign treatment here. The entire process was smooth, transparent, and the results are amazing. Highly recommend for any cosmetic work.", rating: 5, time: "1 month ago", localGuide: false },
    { name: "Amit Kumar", text: "The best dental experience I've ever had. Modern equipment, no waiting time, and Dr. Karan explains everything clearly before starting the procedure.", rating: 5, time: "3 weeks ago", localGuide: true },
    { name: "Sunita Verma", text: "Had my root canal done here and was genuinely surprised — completely painless! Dr. Malik's expertise and the friendly staff made the whole experience so comfortable.", rating: 5, time: "2 months ago", localGuide: false },
    { name: "Deepak Singh", text: "Brought my whole family here for regular check-ups. The pediatric care for my kids was exceptional. They actually look forward to their dental visits now!", rating: 5, time: "1 month ago", localGuide: true },
    { name: "Neha Gupta", text: "Got teeth whitening done and the results are stunning. Professional, caring team and very transparent about costs. Will definitely be coming back!", rating: 5, time: "3 months ago", localGuide: false },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || isPaused) return;
    const autoplay = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(autoplay);
  }, [emblaApi, isPaused]);

  return (
    <section id="reviews" className="py-24 bg-[#f8f9fa] overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">

        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-6 shadow-sm">
            <GoogleIcon />
            <span className="text-sm font-medium text-gray-600">Google Reviews</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">What Our Patients Say</h2>
          <p className="text-muted-foreground text-lg mb-8">Trusted by hundreds of patients. See what they say about us on Google.</p>

          <div className="inline-flex flex-col items-center bg-white rounded-2xl px-10 py-5 shadow-md border border-gray-100">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-5xl font-bold text-gray-900">4.9</span>
              <div className="flex gap-0.5 ml-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#FBBC05] text-[#FBBC05]" />
                ))}
              </div>
            </div>
            <span className="text-sm text-gray-500 font-medium">Based on 200+ Google reviews</span>
          </div>
        </motion.div>

        <div
          className="overflow-hidden"
          ref={emblaRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex gap-5 pb-2">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="flex-none w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] bg-white rounded-2xl p-6 border border-gray-200 shadow-sm cursor-default relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                whileHover={{ y: -5, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
              >
                <div className="absolute top-5 right-5">
                  <GoogleIcon />
                </div>

                <div className="flex items-center gap-3 mb-4 pr-8">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 ${avatarColors[index % avatarColors.length].bg} ${avatarColors[index % avatarColors.length].text}`}>
                    {review.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm leading-tight truncate">{review.name}</h4>
                    <p className="text-xs text-gray-500 leading-tight mt-0.5">
                      {review.localGuide ? "Local Guide · " : ""}{review.time}
                    </p>
                  </div>
                </div>

                <div className="flex gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]" />
                  ))}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">{review.text}</p>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.083L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span className="text-xs text-gray-400">Helpful</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <div className="flex gap-2">
            {scrollSnaps.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? "w-7 bg-[#4285F4]" : "w-2 bg-gray-300"
                }`}
                whileHover={{ scale: 1.3 }}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <motion.button
              onClick={() => emblaApi?.scrollPrev()}
              className="h-9 w-9 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-600 hover:border-[#4285F4] hover:text-[#4285F4] transition-colors"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.button>
            <motion.button
              onClick={() => emblaApi?.scrollNext()}
              className="h-9 w-9 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-600 hover:border-[#4285F4] hover:text-[#4285F4] transition-colors"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="https://google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#4285F4] font-medium hover:underline"
          >
            <GoogleIcon />
            See all reviews on Google
            <ChevronRight className="h-4 w-4" />
          </a>
        </motion.div>
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
    <section id="contact" className="py-28 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-primary font-bold tracking-[0.2em] uppercase text-xs bg-primary/10 rounded-full px-4 py-1.5 mb-5">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4 leading-tight">Book Your<br />Appointment</h2>
          <p className="text-muted-foreground text-lg">Our team will confirm your visit within 24 hours.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <motion.div
            className="lg:col-span-2 rounded-3xl p-8 text-white relative overflow-hidden"
            style={{ background: "linear-gradient(145deg, #0d2d2a, #0d5c55, #0d3d4f)" }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 blur-2xl" style={{ background: "radial-gradient(circle, #14b8a6, transparent)" }} />
            <h3 className="text-2xl font-bold font-serif mb-2">Contact Information</h3>
            <p className="text-white/60 text-sm mb-10">We're here to help you smile brighter.</p>

            <div className="space-y-7">
              {[
                { Icon: MapPin, title: "Our Location", val: "123 Dental Street, Health Park Avenue, New Delhi 110001" },
                { Icon: Phone, title: "Call Us", val: "+91 98765 43210\n011-2345-6789" },
                { Icon: Mail, title: "Email Us", val: "info@drkaranmalik.com" },
                { Icon: Clock, title: "Working Hours", val: "Mon–Sat: 9:00 AM – 8:00 PM\nSunday: Closed" },
              ].map(({ Icon, title, val }, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="h-5 w-5 text-teal-300" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">{title}</p>
                    <p className="text-white/90 text-sm leading-relaxed whitespace-pre-line">{val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex gap-3">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3 bg-white rounded-3xl shadow-xl border border-border/30 p-8 md:p-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-foreground mb-7">Request an Appointment</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">First Name</label>
                  <Input required placeholder="John" className="h-12 rounded-xl bg-[#f8fafa] border-border/40 focus:border-primary" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Last Name</label>
                  <Input required placeholder="Doe" className="h-12 rounded-xl bg-[#f8fafa] border-border/40 focus:border-primary" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Phone</label>
                  <Input required type="tel" placeholder="+91 98765 43210" className="h-12 rounded-xl bg-[#f8fafa] border-border/40" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Email</label>
                  <Input required type="email" placeholder="john@example.com" className="h-12 rounded-xl bg-[#f8fafa] border-border/40" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Preferred Date</label>
                <Input required type="date" className="h-12 rounded-xl bg-[#f8fafa] border-border/40" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Message (Optional)</label>
                <Textarea placeholder="Tell us about your concern or preferred service..." className="min-h-[100px] rounded-xl bg-[#f8fafa] border-border/40 resize-none" />
              </div>
              <button
                type="submit"
                className="w-full h-14 text-base font-bold text-white rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
                style={{ background: "linear-gradient(135deg, #0d9488, #14b8a6)" }}
              >
                Request Appointment →
              </button>
              <p className="text-center text-xs text-muted-foreground">We'll contact you within 24 hours to confirm. No spam, ever.</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CTABanner = () => (
  <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d9488 0%, #0891b2 50%, #0d9488 100%)" }}>
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
    <div className="absolute left-0 top-0 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, white, transparent)" }} />
    <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
          <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
          <span className="text-white text-sm font-semibold">4.9 Rating · 200+ Google Reviews</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold font-serif text-white mb-5 leading-tight">
          Ready to Transform<br />Your Smile?
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
          Join 5,000+ patients who trust Dr. Karan Malik for exceptional dental care. Your first consultation is completely free.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold rounded-full px-9 py-4 text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Book Free Consultation <ChevronRight className="h-5 w-5" />
          </a>
          <a href="tel:+919876543210"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold rounded-full px-9 py-4 text-base hover:bg-white/10 transition-all duration-300"
          >
            <Phone className="h-4 w-4" /> Call +91 98765 43210
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-950 text-white pt-20 pb-10 relative">
    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #0d9488, #0891b2, #0d9488)" }} />
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
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2,
  Zap,
  Search,
  BarChart3,
  Target,
  ArrowRight,
  Sparkles,
  Rocket,
  Users,
  BookOpen,
  Send,
  Cpu,
  Database,
  GraduationCap,
  Stethoscope,
  Building2,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Menu,
  X,
  Code,
  TrendingUp,
  Globe,
  BarChart,
  Lightbulb,
  Dna,
  Heart,
  LayoutGrid,
  Palette,
  Compass,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Page = 'home' | 'products' | 'solutions' | 'about' | 'blog' | 'contact';

// --- Constants ---

const PRODUCTS_DATA = [
  {
    id: "medresearch",
    title: "MedResearch",
    tagline: "AI-Native Research Intelligence for Life Sciences",
    desc: "MedResearch is the AI-native research intelligence platform for life sciences teams — combining literature, clinical trials, and knowledge graphs into one powerful copilot, replacing legacy tools at a fraction of the cost.",
    icon: <Dna size={40} className="text-electric-blue" />,
    features: [
      { title: "AI Research Copilot", desc: "Ask anything — get precise, cited answers across papers, trials, and biomedical data." },
      { title: "Hybrid Smart Search", desc: "Combines semantic, keyword, and knowledge graph search for deeper discovery." },
      { title: "Clinical Trial Intelligence", desc: "Analyze trial landscapes, endpoints, competitors, and gaps in one place." },
      { title: "Biomedical Knowledge Graph", desc: "Understand drug–target–biomarker relationships visually and contextually." },
      { title: "Live Data Integrations", desc: "Access real-time data from PubMed, ClinicalTrials.gov, and more." },
      { title: "7 AI Output Formats", desc: "Convert insights into slides, mind maps, reports, and tables instantly." }
    ],
    extraFeatures: ["Collaborative Workspaces", "Smart Alerts", "Enterprise-Grade Security", "Multi-Model AI Engine"]
  },
  {
    id: "mindbloom",
    title: "MindBloom AI",
    tagline: "Holistic Mental Wellness Ecosystem",
    desc: "MindBloom AI is designed to bridge the gap between physical health and emotional resilience. It combines advanced Generative AI, gamified habit tracking, and anonymous community support.",
    icon: <Heart size={40} className="text-accent-premier" />,
    features: [
      { title: "AI Vibe Coach", desc: "24/7 Empathetic listening using CBT & DBT frameworks for stress management." },
      { title: "Gamified Bloom Tracker", desc: "Watch your digital garden grow as you maintain wellness habits and streaks." },
      { title: "Anonymous Peer Circles", desc: "Safe, moderated support groups for anxiety, burnout, and connectivity." },
      { title: "Biometric Integration", desc: "Syncs with Oura, Google Fit, and Apple Health for a unified health view." },
      { title: "Smart Journaling", desc: "Sentiment analysis detects emotional tones and provides AI-driven reflections." },
      { title: "Privacy First", desc: "AES-256 encryption and a strict no-sell policy for your emotional data." }
    ]
  },
  {
    id: "utilityhub",
    title: "UtilityHub",
    tagline: "Your Ultimate Productivity Toolkit",
    desc: "A versatile, all-in-one productivity suite designed to simplify daily digital tasks. From text manipulation to advanced AI-powered image generation and analysis.",
    icon: <LayoutGrid size={40} className="text-neon-purple" />,
    features: [
      { title: "AI-Powered Intelligence", desc: "Text assistants, image generators, and OCR tools powered by Gemini." },
      { title: "Developer & Data Tools", desc: "JSON formatters, JWT decoders, SQL tools, and UUID generators." },
      { title: "Content Processing", desc: "Grammar fixers, case converters, and real-time Markdown previews." },
      { title: "Design & Visuals", desc: "Palette generators, contrast checkers, and QR code builders." },
      { title: "Calculators & Converters", desc: "Unit, storage, and business day calculators for daily efficiency." },
      { title: "PDF Utilities", desc: "Extract text, inspect metadata, and convert PDFs to AI mind maps." }
    ]
  },
  {
    id: "artistry",
    title: "Artistry",
    tagline: "Where Imagination Becomes a Digital Masterpiece",
    desc: "An immersive, AI-powered creative academy for children. Artistry provides a safe playground where kids can write stories, direct videos, and experiment with digital art.",
    icon: <Palette size={40} className="text-electric-blue" />,
    features: [
      { title: "AI Story Studio", desc: "Collaborative writing with dynamic narration and expressive AI voices." },
      { title: "The Academy Labs", desc: "Digital sculpting and style exploration inspired by the masters." },
      { title: "Magic Motion", desc: "Transform static illustrations into high-quality cinematic short videos." },
      { title: "Curiosity Grounding", desc: "Integrated Google Search grounding provides real-world educational facts." },
      { title: "Professional Visuals", desc: "Choose between fast 'Flash' ideas and high-fidelity 'Pro' 1K renders." },
      { title: "Smart Moderation", desc: "Multi-layer AI safety filters ensure age-appropriate content at all times." }
    ]
  },
  {
    id: "lighten",
    title: "lighten.ai",
    tagline: "The Conversational AI Data Analyst",
    desc: "A production-grade analytics platform that allows users to interact with data using natural language, generate visualizations instantly, and build dashboards without SQL.",
    icon: <BarChart3 size={40} className="text-accent-premier" />,
    features: [
      { title: "Nova: AI Copilot", desc: "Gemini-integrated analysis that understands complex natural language queries." },
      { title: "Clarity Engine", desc: "Automatically determines the most effective chart type for your data." },
      { title: "Dashboard Builder", desc: "High-density widgets and customizable layouts for executive overviews." },
      { title: "Universal Connections", desc: "Connect directly to PostgreSQL or upload static CSV files with live syncing." },
      { title: "Insight Memories", desc: "Save critical findings and summaries for persistent contextual awareness." },
      { title: "Enterprise Foundation", desc: "Secure authentication and modern UI built for high-performance analytics." }
    ]
  },
  {
    id: "navix",
    title: "NaviX",
    tagline: "Navigate Your Future with AI",
    desc: "An AI career guidance platform helping students bridge the gap between campus and career with personalized roadmaps and interview prep.",
    icon: <Compass size={40} className="text-neon-purple" />,
    features: [
      { title: "Resume Analyzer", desc: "Get AI scores and suggestions for keywords, formatting, and impact." },
      { title: "AI Career Coach", desc: "Personalized career path suggestions and skill roadmaps based on your goals." },
      { title: "Interview Cracker", desc: "Role-based mock interviews with AI feedback and improvement tips." },
      { title: "Skill Gap Analyzer", desc: "Identify missing skills like System Design or APIs for your target role." },
      { title: "Smart Job Matching", desc: "Personalized job and internship recommendations based on your profile." },
      { title: "Campus Feed", desc: "Placement discussions, interview experiences, and community groups." }
    ]
  }
];

// --- Components ---

const SOLUTIONS_DATA = [
  { title: "Education & EdTech", icon: <GraduationCap size={20} />, color: "text-electric-blue" },
  { title: "Healthcare", icon: <Stethoscope size={20} />, color: "text-accent-premier" },
  { title: "IT & Software Services", icon: <Building2 size={20} />, color: "text-neon-purple" },
  { title: "Startups & Product Companies", icon: <Rocket size={20} />, color: "text-electric-blue" }
];

const Navbar = ({ currentPage, setCurrentPage, setActiveProductIndex }: { 
  currentPage: Page, 
  setCurrentPage: (p: Page) => void,
  setActiveProductIndex: (i: number) => void
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  const navLinks: { label: string, id: Page }[] = [
    { label: 'Home', id: 'home' },
    { label: 'Products', id: 'products' },
    { label: 'Solutions', id: 'solutions' },
    { label: 'About Us', id: 'about' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setCurrentPage('home')}>
              <span className="text-2xl font-display font-bold tracking-tighter text-white uppercase">
                Citrus<span className="text-accent-premier ml-1">AI Labs</span>
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 ml-auto h-full pr-10">
            {navLinks.map((link) => (
              <div 
                key={link.id} 
                className="relative group h-full flex items-center"
                onMouseEnter={() => {
                  if (link.id === 'products') setIsProductsOpen(true);
                  if (link.id === 'solutions') setIsSolutionsOpen(true);
                }}
                onMouseLeave={() => {
                  if (link.id === 'products') setIsProductsOpen(false);
                  if (link.id === 'solutions') setIsSolutionsOpen(false);
                }}
              >
                <button
                  onClick={() => {
                    setCurrentPage(link.id);
                    if (link.id === 'products') setIsProductsOpen(false);
                    if (link.id === 'solutions') setIsSolutionsOpen(false);
                  }}
                  className={`flex items-center gap-1 text-[15px] font-bold transition-colors hover:text-accent-premier ${
                    currentPage === link.id ? 'text-accent-premier underline decoration-2 underline-offset-8' : 'text-slate-700'
                  }`}
                >
                  {link.label}
                  {(link.id === 'products' || link.id === 'solutions') && (
                    <ChevronDown 
                      size={14} 
                      className={`transition-transform duration-300 ${(link.id === 'products' ? isProductsOpen : isSolutionsOpen) ? 'rotate-180' : ''}`} 
                    />
                  )}
                </button>

                {link.id === 'products' && (
                  <AnimatePresence>
                    {isProductsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-0 pt-4 w-80 overflow-hidden z-50 pointer-events-auto"
                      >
                        <div className="bg-dark-blue border border-white/10 rounded-3xl shadow-2xl p-4">
                          <div className="grid grid-cols-2 gap-2">
                            {PRODUCTS_DATA.map((product, index) => (
                              <button
                                key={product.id}
                                onClick={() => {
                                  setCurrentPage('products');
                                  setActiveProductIndex(index);
                                  setIsProductsOpen(false);
                                }}
                                className="flex flex-col gap-2 p-3 rounded-2xl hover:bg-white/5 transition-all text-left group"
                              >
                                <div className="w-10 h-10 bg-deep-dark rounded-xl flex items-center justify-center border border-white/5 group-hover:border-accent-premier/30 transition-all">
                                  {React.cloneElement(product.icon as React.ReactElement, { size: 20 })}
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-white group-hover:text-accent-premier transition-colors">{product.title}</div>
                                  <div className="text-[9px] text-slate-500 uppercase tracking-wider truncate w-24">{product.tagline}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-white/5">
                            <button 
                              onClick={() => {
                                setCurrentPage('products');
                                setIsProductsOpen(false);
                              }}
                              className="w-full py-2 text-xs font-bold text-center text-slate-400 hover:text-white transition-colors"
                            >
                              View All Products
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {link.id === 'solutions' && (
                  <AnimatePresence>
                    {isSolutionsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-0 pt-4 w-72 overflow-hidden z-50 pointer-events-auto"
                      >
                        <div className="bg-dark-blue border border-white/10 rounded-3xl shadow-2xl p-4">
                          <div className="space-y-1">
                            {SOLUTIONS_DATA.map((item, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  setCurrentPage('solutions');
                                  setIsSolutionsOpen(false);
                                }}
                                className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all text-left group"
                              >
                                <div className={`w-10 h-10 bg-deep-dark rounded-xl flex items-center justify-center border border-white/5 group-hover:border-accent-premier/30 transition-all ${item.color}`}>
                                  {item.icon}
                                </div>
                                <span className="text-sm font-bold text-white group-hover:text-accent-premier transition-colors">{item.title}</span>
                              </button>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-white/5">
                            <button 
                              onClick={() => {
                                setCurrentPage('solutions');
                                setIsSolutionsOpen(false);
                              }}
                              className="w-full py-2 text-xs font-bold text-center text-slate-400 hover:text-white transition-colors"
                            >
                              Explore All Solutions
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="hidden md:block">
              <button 
                onClick={() => setCurrentPage('contact')}
                className="bg-gradient-to-r from-accent-premier to-accent-premier-dark text-white px-8 py-3 rounded-xl text-base font-semibold hover:scale-105 transition-all shadow-lg shadow-accent-premier/20 glow-accent"
              >
                Get Started
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <button onClick={() => setIsOpen(!isOpen)} className="text-slate-400 p-2 hover:text-white transition-colors">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-deep-dark border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <div key={link.id}>
                  <button
                    onClick={() => {
                      if (link.id === 'products') {
                        setIsProductsOpen(!isProductsOpen);
                      } else if (link.id === 'solutions') {
                        setIsSolutionsOpen(!isSolutionsOpen);
                      } else {
                        setCurrentPage(link.id);
                        setIsOpen(false);
                      }
                    }}
                    className={`flex items-center justify-between w-full text-left px-3 py-4 text-base font-bold ${
                      currentPage === link.id ? 'text-accent-premier bg-accent-premier/10' : 'text-slate-700 hover:bg-slate-100 hover:text-accent-premier'
                    } rounded-lg transition-all`}
                  >
                    {link.label}
                    {(link.id === 'products' || link.id === 'solutions') && (
                      <ChevronDown 
                        size={18} 
                        className={`transition-transform duration-300 ${(link.id === 'products' ? isProductsOpen : isSolutionsOpen) ? 'rotate-180' : ''}`} 
                      />
                    )}
                  </button>
                  
                  {link.id === 'products' && isProductsOpen && (
                    <div className="pl-6 py-2 space-y-2">
                      {PRODUCTS_DATA.map((product, index) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            setCurrentPage('products');
                            setActiveProductIndex(index);
                            setIsOpen(false);
                            setIsProductsOpen(false);
                          }}
                          className="flex items-center gap-3 w-full text-left p-3 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-accent-premier transition-all"
                        >
                          {React.cloneElement(product.icon as React.ReactElement, { size: 16 })}
                          <span className="text-sm font-medium">{product.title}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {link.id === 'solutions' && isSolutionsOpen && (
                    <div className="pl-6 py-2 space-y-2">
                      {SOLUTIONS_DATA.map((solution, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentPage('solutions');
                            setIsOpen(false);
                            setIsSolutionsOpen(false);
                          }}
                          className="flex items-center gap-3 w-full text-left p-3 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-accent-premier transition-all"
                        >
                          <div className={solution.color}>
                            {React.cloneElement(solution.icon as React.ReactElement, { size: 16 })}
                          </div>
                          <span className="text-sm font-medium">{solution.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
  return (
    <footer className="bg-dark-blue border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl font-display font-bold text-white uppercase tracking-tighter">
                Citrus<span className="text-accent-premier ml-1">AI Labs</span>
              </span>
            </div>
            <p className="text-slate-700 max-w-sm mb-6">
              Empowering businesses with AI-driven software solutions. Build smarter, scale faster, and lead with AI.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Products', 'Solutions', 'About Us', 'Blog'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => setCurrentPage(item.toLowerCase().replace(' ', '') as Page)}
                    className="text-slate-400 hover:text-electric-blue transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-6">Contact</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-electric-blue" />
                <span>info@citrusailabs.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-electric-blue" />
                <span>+91 9949890977</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-electric-blue" />
                <span>T-Hub, Knowledge City, Serilingampally, Hyderabad, Telangana 500081</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2026 Citrus AI Labs. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-electric-blue">Privacy Policy</a>
            <a href="#" className="hover:text-electric-blue">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Page Content Components ---

const HomePage = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
  const [index, setIndex] = useState(0);
  const headlines = [
    {
      title: "From idea to intelligent product",
      subtitle: "We build AI-powered solutions that scale your business.",
      tag: "Innovation at Scale"
    },
    {
      title: "Turn ideas into scalable software",
      subtitle: "AI-driven solutions that deliver real results for your enterprise.",
      tag: "Intelligent Engineering"
    },
    {
      title: "Build smarter, launch faster",
      subtitle: "Scale your operations with cutting-edge AI-powered software.",
      tag: "Rapid Execution"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-deep-dark" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-blue text-electric-blue text-sm font-bold mb-8 border border-white/5 glow-primary">
                <Sparkles size={16} />
                {headlines[index].tag}
              </span>
              
              <div className="mb-12 p-8 bg-dark-blue/50 rounded-[2.5rem] border border-white/5 shadow-2xl backdrop-blur-sm relative group">
                <div className="text-electric-blue glow-primary">
                  <Sparkles size={80} />
                </div>
              </div>

              <h1 className="text-4xl md:text-4xl lg:text-4xl font-display font-bold text-white tracking-tight mb-6 leading-[1.2] max-w-5xl">
                {headlines[index].title.split(' ').map((word, i) => (
                  <span key={i} className={['ai', 'intelligent', 'scalable', 'smarter'].includes(word.toLowerCase()) ? 'text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-purple' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-base md:text-base text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-normal">
                {headlines[index].subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="w-full sm:w-auto bg-gradient-to-r from-accent-premier to-accent-premier-dark text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:scale-105 transition-all shadow-xl shadow-accent-premier/25 flex items-center justify-center gap-2 glow-accent"
                >
                  Get Started Free <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="w-full sm:w-auto bg-dark-blue text-white border border-white/5 px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-charcoal transition-all flex items-center justify-center gap-2"
                >
                  Book a Free Consultation
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-20">
            {headlines.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${index === i ? 'w-12 bg-electric-blue' : 'w-3 bg-charcoal'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

    {/* Value Proposition Section */}
    <section className="py-16 bg-deep-dark border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-electric-blue font-bold uppercase tracking-widest text-sm mb-4 block">What We Do</span>
            <h2 className="text-3xl md:text-3xl font-display font-semibold text-white mb-4 leading-tight">
              End-to-End AI Product Development
            </h2>
            <p className="text-base text-slate-400 mb-8 leading-relaxed">
              We help you turn ideas into scalable, intelligent software solutions — fast, reliable, and future-ready.
            </p>
            <ul className="space-y-5 mb-10">
              {[
                "AI-driven applications",
                "Data engineering & analytics",
                "Custom software development"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-lg font-medium text-slate-200">
                  <CheckCircle2 className="text-accent-premier" size={24} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-2xl font-bold text-accent-premier glow-accent">No complexity. Just results.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[3rem] aspect-square flex items-center justify-center relative overflow-hidden group shadow-2xl bg-dark-blue border border-white/5"
          >
            <div className="relative z-10 w-full h-full p-12 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 bg-accent-premier/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-accent-premier/30 glow-primary">
                  <Cpu size={32} className="text-accent-premier" />
                </div>
                <div className="w-16 h-16 bg-lime-accent/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-lime-accent/30 glow-lime">
                  <Database size={32} className="text-lime-accent" />
                </div>
              </div>
              <div className="bg-slate-950/80 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-left">
                <Sparkles size={40} className="text-accent-premier mb-4 glow-primary" />
                <p className="text-white font-bold text-xl">Intelligent Architecture</p>
                <p className="text-slate-400 text-sm">Engineered for the future of business.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Trust Section */}
    <section className="py-16 bg-dark-blue text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-3xl font-display font-semibold mb-4">Built for Impact, Not Just Delivery</h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto">We don’t just deliver projects — we build long-term value</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              title: "AI-First Approach", 
              desc: "Intelligence built into every solution",
              icon: <Zap size={32} />
            },
            { 
              title: "Fast Execution", 
              desc: "Go from idea to product quickly",
              icon: <Rocket size={32} />
            },
            { 
              title: "Deep Expertise", 
              desc: "Data, AI, and engineering specialists",
              icon: <Search size={32} />
            },
            { 
              title: "Scalable Solutions", 
              desc: "Built to grow with your business",
              icon: <BarChart3 size={32} />
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-deep-dark/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5 hover:border-electric-blue/50 transition-all group"
            >
              <div className="text-electric-blue mb-6 group-hover:scale-110 transition-transform glow-primary">{item.icon}</div>
              <h3 className="text-xl font-display font-bold mb-4">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Industries Section */}
    <section className="py-24 bg-deep-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-3xl font-display font-semibold text-white mb-4">Industries We Transform</h2>
          <p className="text-base text-slate-400">Scaling businesses with advanced data platforms and AI solutions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: "Education",
              icon: <GraduationCap size={48} className="text-electric-blue" />,
              desc: "Empowering students and institutions with AI-driven learning and career platforms"
            },
            {
              title: "Healthcare",
              icon: <Stethoscope size={48} className="text-accent-premier" />,
              desc: "Driving better outcomes through data, automation, and intelligent systems"
            },
            {
              title: "IT & Enterprises",
              icon: <Building2 size={48} className="text-neon-purple" />,
              desc: "Scaling businesses with advanced data platforms and AI solutions"
            }
          ].map((industry, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="text-center p-8 rounded-3xl bg-dark-blue border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-deep-dark rounded-2xl shadow-sm mb-8 border border-white/5">
                {industry.icon}
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-white">{industry.title}</h3>
              <p className="text-slate-400 leading-relaxed">{industry.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Process Section */}
    <section className="py-16 bg-dark-blue/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-3xl font-display font-semibold text-white mb-4">How We Work</h2>
          <p className="text-base text-slate-400">Simple process. Powerful outcomes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-charcoal -translate-y-1/2 -z-10" />
          {[
            { step: "1", title: "Understand", desc: "We deep-dive into your business challenges and goals", icon: <Search size={24} /> },
            { step: "2", title: "Build", desc: "Design and develop tailored AI-powered solutions", icon: <Cpu size={24} /> },
            { step: "3", title: "Scale", desc: "Deploy, optimize, and help you grow seamlessly", icon: <Rocket size={24} /> }
          ].map((item, i) => (
            <div key={i} className="bg-deep-dark p-10 rounded-[2.5rem] border border-white/5 shadow-sm text-center relative hover:border-electric-blue/30 transition-all">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-electric-blue to-neon-purple text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg shadow-electric-blue/30 glow-primary">
                {item.step}
              </div>
              <div className="text-electric-blue mb-6 flex justify-center glow-primary">{item.icon}</div>
              <h3 className="text-2xl font-display font-bold mb-4 text-white">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Impact Metrics */}
    <section className="py-24 bg-deep-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Projects Delivered", value: "50+" },
            { label: "Clients Served", value: "30+" },
            { label: "Faster Delivery", value: "40%" },
            { label: "Improved Efficiency", value: "65%" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Vision Section */}
    <section className="py-24 bg-dark-blue">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="w-24 h-24 mx-auto mb-8 flex items-center justify-center bg-deep-dark rounded-3xl border border-white/5 glow-accent">
          <Sparkles size={40} className="text-accent-premier" />
        </div>
        <h2 className="text-3xl md:text-3xl font-display font-semibold text-white mb-8 leading-tight">Our Vision</h2>
        <p className="text-2xl md:text-3xl text-slate-300 font-medium leading-relaxed italic">
          "To help businesses innovate faster and scale smarter with AI-driven technology."
        </p>
      </div>
    </section>

    {/* Final CTA Section */}
    <section className="py-24 bg-deep-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-dark-blue to-deep-dark rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl border border-white/5">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-3xl font-display font-semibold mb-6">Ready to build your next <br /> AI-powered product?</h2>
            <p className="text-base md:text-base mb-10 text-slate-400 max-w-2xl mx-auto">
              Let’s turn your idea into a powerful, scalable solution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => setCurrentPage('contact')}
                className="w-full sm:w-auto bg-gradient-to-r from-accent-premier to-accent-premier-dark text-white px-10 py-5 rounded-2xl text-lg font-bold hover:scale-105 transition-all shadow-xl shadow-accent-premier/25 glow-accent"
              >
                Talk to Our Experts
              </button>
              <button 
                onClick={() => setCurrentPage('contact')}
                className="w-full sm:w-auto bg-transparent border-2 border-white/10 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white/5 transition-all"
              >
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};

const ProductsPage = ({ activeTab, setActiveTab }: { activeTab: number, setActiveTab: (i: number) => void }) => {
  return (
    <div className="min-h-screen bg-deep-dark">
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-4xl font-display font-bold text-white mb-8 leading-tight"
          >
            Intelligent Products for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-accent-premier glow-primary">The AI Generation</span>
          </motion.h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            From life sciences to mental wellness and enterprise analytics, we build AI-native platforms that solve complex challenges and empower human potential.
          </p>
        </div>
      </section>

      {/* Products Menu Section */}
      <section className="sticky top-20 z-40 bg-deep-dark/80 backdrop-blur-xl border-y border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {PRODUCTS_DATA.map((product, index) => (
              <button
                key={product.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl whitespace-nowrap transition-all border ${
                  activeTab === index 
                    ? 'bg-accent-premier/10 border-accent-premier text-accent-premier shadow-lg shadow-accent-premier/10' 
                    : 'bg-dark-blue/50 border-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                {React.cloneElement(product.icon as React.ReactElement, { size: 20 })}
                <span className="font-bold">{product.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Product Content */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-premier/10 border border-accent-premier/20 rounded-full text-accent-premier text-sm font-bold mb-8 uppercase tracking-widest">
                  {PRODUCTS_DATA[activeTab].tagline}
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
                  {PRODUCTS_DATA[activeTab].title}
                </h2>
                <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                  {PRODUCTS_DATA[activeTab].desc}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {PRODUCTS_DATA[activeTab].features.map((feature, i) => (
                    <div key={i} className="p-6 bg-dark-blue rounded-3xl border border-white/5 hover:border-accent-premier/30 transition-all group">
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-accent-premier transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {PRODUCTS_DATA[activeTab].extraFeatures && (
                  <div className="mt-12 flex flex-wrap gap-3">
                    {PRODUCTS_DATA[activeTab].extraFeatures.map((ef, i) => (
                      <span key={i} className="px-4 py-2 bg-deep-dark border border-white/5 rounded-xl text-xs font-medium text-slate-300">
                        • {ef}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-16 flex flex-col sm:flex-row gap-6">
                  <button className="bg-gradient-to-r from-accent-premier to-accent-premier-dark text-white px-10 py-4 rounded-2xl font-semibold hover:scale-105 transition-all shadow-xl shadow-accent-premier/20 glow-accent">
                    Explore Platform
                  </button>
                  <button className="bg-white/5 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all border border-white/10">
                    View Documentation
                  </button>
                </div>
              </div>

              <div className="sticky top-40">
                <div className="aspect-square lg:aspect-video bg-dark-blue rounded-[3rem] border border-white/5 overflow-hidden relative group shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-dark via-transparent to-transparent" />
                  
                  {/* Floating UI Elements Simulation */}
                  <div className="absolute bottom-12 left-12 right-12 p-8 bg-deep-dark/60 backdrop-blur-md rounded-3xl border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-accent-premier/20 rounded-xl flex items-center justify-center text-accent-premier">
                        {PRODUCTS_DATA[activeTab].icon}
                      </div>
                      <div>
                        <div className="text-white font-bold">{PRODUCTS_DATA[activeTab].title} Interface</div>
                        <div className="text-xs text-slate-400">Powered by Citrus AI Engine</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '75%' }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="h-full bg-accent-premier shadow-[0_0_10px_#22D3EE]"
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>PROCESSING DATA...</span>
                        <span>75% COMPLETE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Trust & Scale */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em] mb-12">Trusted by Industry Leaders</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {['PharmaCorp', 'HealthLink', 'EduScale', 'DataFlow', 'TechVision'].map((brand) => (
              <span key={brand} className="text-2xl font-display font-bold text-white">{brand}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const SolutionsPage = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => (
  <div className="min-h-screen bg-deep-dark">
    {/* Hero Section */}
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl md:text-4xl font-display font-bold text-white mb-6">Transforming Industries with Smart Solutions</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          We combine deep domain expertise with advanced technologies to deliver measurable business impact.
        </p>
      </div>
    </section>

    {/* How We Deliver Value */}
    <section className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-3xl font-display font-semibold text-white mb-4">How We Deliver Value</h2>
          <p className="text-slate-400 text-lg">Consult → Build → Scale</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-electric-blue/0 via-electric-blue/20 to-electric-blue/0 -translate-y-1/2 -z-10" />
          
          {[
            {
              title: "Consult",
              desc: "We understand your business challenges and define the right solution strategy.",
              icon: <Search size={32} />,
              color: "text-electric-blue",
              bg: "bg-electric-blue/10"
            },
            {
              title: "Build",
              desc: "Our engineering teams design and develop scalable, AI-powered systems.",
              icon: <Code size={32} />,
              color: "text-accent-premier",
              bg: "bg-accent-premier/10"
            },
            {
              title: "Scale",
              desc: "We ensure seamless deployment, performance optimization, and continuous growth.",
              icon: <TrendingUp size={32} />,
              color: "text-neon-purple",
              bg: "bg-neon-purple/10"
            }
          ].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-dark-blue p-10 rounded-[2.5rem] border border-white/5 text-center relative group hover:border-electric-blue/30 transition-all"
            >
              <div className={`w-20 h-20 ${step.bg} ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500`}>
                {step.icon}
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Why Citrus AI Labs? */}
    <section className="py-24 bg-dark-blue/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-3xl font-display font-semibold text-white mb-8">Why Citrus AI Labs?</h2>
            <div className="space-y-6">
              {[
                { title: "AI-first approach to every solution", icon: <Sparkles className="text-electric-blue" /> },
                { title: "Strong domain expertise across industries", icon: <Globe className="text-accent-premier" /> },
                { title: "Agile and scalable delivery models", icon: <Zap className="text-neon-purple" /> },
                { title: "Focus on measurable business outcomes", icon: <BarChart className="text-electric-blue" /> },
                { title: "Innovation-driven mindset", icon: <Lightbulb className="text-accent-premier" /> }
              ].map((benefit, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-deep-dark rounded-2xl border border-white/5"
                >
                  <div className="shrink-0">{benefit.icon}</div>
                  <span className="text-lg text-slate-300 font-medium">{benefit.title}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[3rem] border border-white/10 flex items-center justify-center overflow-hidden relative group shadow-2xl bg-dark-blue">
              <div className="relative z-10 text-center p-12">
                <div className="w-24 h-24 bg-deep-dark rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/10 glow-accent shadow-2xl">
                  <Sparkles size={40} className="text-accent-premier" />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4">Innovation at Core</h3>
                <p className="text-slate-200 text-lg font-medium">We don't just build software; we engineer future-ready solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Industries We Serve */}
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-3xl font-display font-semibold text-white mb-4">Industries We Serve</h2>
          <p className="text-slate-400 text-lg">Tailored technology solutions for diverse sectors.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Education & EdTech", icon: <GraduationCap size={32} />, color: "text-electric-blue" },
            { title: "Healthcare", icon: <Stethoscope size={32} />, color: "text-accent-premier" },
            { title: "IT & Software Services", icon: <Building2 size={32} />, color: "text-neon-purple" },
            { title: "Startups & Product Companies", icon: <Rocket size={32} />, color: "text-electric-blue" }
          ].map((industry, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-dark-blue p-8 rounded-3xl border border-white/5 text-center hover:border-electric-blue/30 transition-all group"
            >
              <div className={`w-16 h-16 bg-deep-dark rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/5 group-hover:glow-primary transition-all ${industry.color}`}>
                {industry.icon}
              </div>
              <h4 className="text-xl font-display font-bold text-white">{industry.title}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-16 bg-gradient-to-r from-accent-premier to-accent-premier-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-3xl font-display font-semibold text-white mb-8">Let’s Build the Future Together</h2>
        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 font-medium">
          Whether you're looking to modernize your systems, build an AI product, or solve complex business challenges — Citrus AI Labs is your technology partner.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-deep-dark text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-charcoal transition-all shadow-2xl"
          >
            Talk to our experts today
          </button>
        </div>
        <p className="mt-8 text-white/70 font-medium">👉 Transform your vision into reality.</p>
      </div>
    </section>
  </div>
);

const AboutPage = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => (
  <div className="min-h-screen bg-deep-dark">
    {/* Hero Section */}
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-4xl font-display font-bold text-white mb-8 leading-tight"
        >
          We’re Not Just Building Software.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-purple glow-primary">We’re Building What’s Next.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
        >
          Citrus AI labs is a new-age technology company focused on creating powerful, AI-driven products that solve real-world problems.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 p-8 bg-dark-blue/50 rounded-3xl border border-white/5 backdrop-blur-sm max-w-2xl mx-auto"
        >
          <p className="text-lg text-slate-300 italic">
            "We don’t believe in complex jargon or over-engineered solutions. We believe in <span className="text-white font-bold">building fast, building smart, and building what truly matters.</span>"
          </p>
        </motion.div>
      </div>
    </section>

    {/* What Drives Us */}
    <section className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-3xl font-display font-semibold text-white mb-8">What Drives Us</h2>
            <p className="text-lg text-slate-400 mb-12 leading-relaxed">
              Most businesses struggle with outdated systems, slow processes, and disconnected tools. We exist to change that.
            </p>
            <div className="space-y-6">
              {[
                { text: "Turn ideas into scalable products", icon: <Rocket className="text-electric-blue" /> },
                { text: "Turn challenges into smart solutions", icon: <Lightbulb className="text-accent-premier" /> },
                { text: "Turn businesses into future-ready organizations", icon: <TrendingUp className="text-neon-purple" /> }
              ].map((goal, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-5 bg-dark-blue rounded-2xl border border-white/5 hover:border-electric-blue/30 transition-all group"
                >
                  <div className="w-12 h-12 bg-deep-dark rounded-xl flex items-center justify-center group-hover:glow-primary transition-all">
                    {goal.icon}
                  </div>
                  <span className="text-lg text-slate-200 font-medium">{goal.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video bg-dark-blue rounded-[2.5rem] border border-white/5 flex items-center justify-center overflow-hidden relative group shadow-2xl">
              <div className="relative z-10 text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Our Goal</div>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-purple font-bold text-xl tracking-widest uppercase glow-primary">Simple & Impactful</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* What We Build */}
    <section className="py-16 bg-dark-blue/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-3xl font-display font-semibold text-white mb-4">What We Build</h2>
          <p className="text-xl text-slate-400">We design and develop impactful solutions across key sectors.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Education", desc: "Smarter learning, better outcomes", icon: <GraduationCap size={40} />, color: "text-electric-blue" },
            { title: "Healthcare", desc: "Efficient systems that truly support care", icon: <Stethoscope size={40} />, color: "text-accent-premier" },
            { title: "Enterprise IT", desc: "Scalable platforms that drive growth", icon: <Building2 size={40} />, color: "text-neon-purple" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-deep-dark p-10 rounded-[2rem] border border-white/5 hover:border-electric-blue/30 transition-all text-center"
            >
              <div className={`mb-8 flex justify-center ${item.color}`}>{item.icon}</div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-electric-blue/10 border border-electric-blue/20 rounded-full text-electric-blue font-bold">
            <Sparkles size={20} />
            Artificial Intelligence + Practical Thinking
          </div>
        </div>
      </div>
    </section>

    {/* How We Work & Why We're Different */}
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* How We Work */}
          <div className="bg-dark-blue p-12 rounded-[3rem] border border-white/5">
            <h2 className="text-3xl font-display font-bold text-white mb-8">How We Work</h2>
            <div className="space-y-8">
              {[
                { title: "No unnecessary layers", desc: "Just clear thinking and execution" },
                { title: "Speed over delays", desc: "We move fast and iterate faster" },
                { title: "Real-world focus", desc: "If it doesn’t solve a problem, we don’t build it" }
              ].map((step, i) => (
                <div key={i} className="flex gap-6">
                  <div className="text-electric-blue font-display font-bold text-2xl">0{i+1}</div>
                  <div>
                    <h4 className="text-xl font-display font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-slate-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why We're Different */}
          <div className="bg-dark-blue p-12 md:p-20 rounded-[3rem] border border-white/5">
            <h2 className="text-3xl md:text-3xl font-display font-semibold text-white mb-8">Why We’re Different</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Startup speed", icon: <Zap className="text-electric-blue" />, desc: "Enterprise-quality delivery" },
                { title: "AI-first approach", icon: <Cpu className="text-accent-premier" />, desc: "In everything we create" },
                { title: "Outcome-driven", icon: <Target className="text-neon-purple" />, desc: "Mindset — not just outputs" },
                { title: "True partnership", icon: <Users className="text-electric-blue" />, desc: "We build with you" }
              ].map((diff, i) => (
                <div key={i} className="p-6 bg-deep-dark rounded-2xl border border-white/5">
                  <div className="mb-4">{diff.icon}</div>
                  <h4 className="font-display font-bold text-white mb-1">{diff.title}</h4>
                  <p className="text-sm text-slate-500">{diff.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Vision & Bottom Line */}
    <section className="py-16 bg-gradient-to-b from-deep-dark to-dark-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-3xl font-display font-semibold text-white mb-6">Our Vision</h2>
          <p className="text-2xl text-slate-300 leading-relaxed mb-16">
            To become a go-to technology partner for organizations that want to move faster, think smarter, and lead their industry.
          </p>
          
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />
          
          <h3 className="text-2xl font-display font-bold text-electric-blue mb-6 uppercase tracking-widest">The Bottom Line</h3>
          <p className="text-xl text-slate-400 mb-4">We’re here to cut through the noise and build solutions that actually work.</p>
          <p className="text-2xl text-white font-bold">No fluff. No delays. No overpromises.<br />Just impactful technology, delivered right.</p>
        </div>
      </div>
    </section>

    {/* Let's Build Something Powerful */}
    <section className="py-16 bg-gradient-to-r from-accent-premier to-accent-premier-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-3xl font-display font-semibold text-white mb-6">Let’s Build Something Powerful</h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 font-medium">
          If you have an idea, a problem, or a vision — we’re ready to make it real.
        </p>
        <button 
          onClick={() => setCurrentPage('contact')}
          className="bg-deep-dark text-white px-12 py-5 rounded-2xl text-lg font-semibold hover:bg-charcoal transition-all shadow-2xl"
        >
          Get Started Today
        </button>
      </div>
    </section>
  </div>
);

const BlogPage = () => (
  <div className="min-h-screen bg-deep-dark">
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl md:text-4xl font-display font-bold text-white mb-4">Insights & Innovation</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Stay updated with the latest trends in AI, data engineering, and software development.
        </p>
      </div>
    </section>

    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "The Future of AI in Education",
              category: "Education",
              date: "Oct 24, 2026",
              desc: "How AI-driven learning platforms are reshaping the classroom experience for students and teachers alike."
            },
            {
              title: "Data Governance Best Practices",
              category: "Data Engineering",
              date: "Oct 20, 2026",
              desc: "Ensuring data quality and security in large-scale enterprise environments with modern analytics tools."
            },
            {
              title: "Scaling AI Products in 2026",
              category: "Software Development",
              date: "Oct 15, 2026",
              desc: "Key architectural considerations for building scalable, future-ready AI software products."
            }
          ].map((post, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-dark-blue rounded-3xl border border-white/5 overflow-hidden shadow-sm hover:border-electric-blue/30 transition-all flex flex-col"
            >
              <div className="aspect-video bg-deep-dark flex items-center justify-center relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-deep-dark to-transparent opacity-60" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-electric-blue uppercase tracking-widest bg-deep-dark border border-white/5 px-2 py-1 rounded glow-primary">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-4 hover:text-electric-blue cursor-pointer transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-400 mb-8 line-clamp-3">
                  {post.desc}
                </p>
                <button className="mt-auto flex items-center gap-2 text-sm font-semibold text-white group">
                  Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-electric-blue" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-dark-blue border border-white/5 rounded-2xl font-semibold text-white hover:bg-charcoal transition-all shadow-lg">
            View All Posts <BookOpen size={20} />
          </button>
        </div>
      </div>
    </section>
  </div>
);

const ContactPage = () => (
  <div className="min-h-screen bg-deep-dark">
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl md:text-4xl font-display font-bold text-white mb-4">Let’s Build Something Great Together</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Have a project in mind or looking to transform your business with AI? We’d love to hear from you.
        </p>
      </div>
    </section>

    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-3xl font-display font-semibold text-white mb-8 leading-tight">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-purple glow-primary">Touch</span>
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-dark-blue rounded-2xl flex items-center justify-center text-electric-blue shrink-0 border border-white/5 glow-primary">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white mb-1">Email Us</h4>
                  <p className="text-slate-400">info@citrusailabs.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-dark-blue rounded-2xl flex items-center justify-center text-accent-premier shrink-0 border border-white/5 glow-accent">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white mb-1">Call Us</h4>
                  <p className="text-slate-400">+91 9949890977</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-dark-blue rounded-2xl flex items-center justify-center text-neon-purple shrink-0 border border-white/5">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white mb-1">Visit Us</h4>
                  <p className="text-slate-400">T-Hub, Knowledge City, Serilingampally, Hyderabad, Telangana 500081</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-blue p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-2xl bg-deep-dark border border-white/5 text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/20 focus:border-electric-blue transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 rounded-2xl bg-deep-dark border border-white/5 text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/20 focus:border-electric-blue transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400">Subject</label>
                <input 
                  type="text" 
                  placeholder="How can we help?"
                  className="w-full px-6 py-4 rounded-2xl bg-deep-dark border border-white/5 text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/20 focus:border-electric-blue transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full px-6 py-4 rounded-2xl bg-deep-dark border border-white/5 text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/20 focus:border-electric-blue transition-all resize-none"
                ></textarea>
              </div>
              <button className="w-full bg-gradient-to-r from-accent-premier to-accent-premier-dark text-white py-5 rounded-2xl font-semibold text-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-xl shadow-accent-premier/20 glow-accent">
                Send Message <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} />;
      case 'products': return <ProductsPage activeTab={activeProductIndex} setActiveTab={setActiveProductIndex} />;
      case 'solutions': return <SolutionsPage setCurrentPage={setCurrentPage} />;
      case 'about': return <AboutPage setCurrentPage={setCurrentPage} />;
      case 'blog': return <BlogPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-deep-dark transition-colors duration-300 selection:bg-electric-blue/30 selection:text-white">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        setActiveProductIndex={setActiveProductIndex}
      />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

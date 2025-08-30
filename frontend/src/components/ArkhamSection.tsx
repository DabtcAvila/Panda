'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import Lottie from 'lottie-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ArkhamSectionProps {
  className?: string;
}

export default function ArkhamSection({ className = '' }: ArkhamSectionProps) {
  const { messages } = useLanguage();
  const [currentTab, setCurrentTab] = useState(1);
  const [showLottie, setShowLottie] = useState(false);
  const [lottieData, setLottieData] = useState<object | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const [stickyOpacity, setStickyOpacity] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const lastTabChangeTime = useRef(0);
  const scrollRAF = useRef<number>();
  
  // Motion values para transición suave del sticky
  const stickyY = useMotionValue(0);
  const stickyScale = useMotionValue(1);

  // Cargar animación Lottie
  useEffect(() => {
    fetch('/arkham-lottie.json')
      .then(response => response.json())
      .then(data => setLottieData(data))
      .catch(error => console.error('Error loading Lottie animation:', error));
  }, []);

  // Manejador optimizado de tabs con protección contra rapid clicking
  const handleTabClick = useCallback((tabNumber: number) => {
    const now = Date.now();
    const timeSinceLastChange = now - lastTabChangeTime.current;
    
    // Prevenir rapid clicking (mínimo 300ms entre cambios)
    if (timeSinceLastChange < 300 || isTransitioning) return;
    
    lastTabChangeTime.current = now;
    setIsTransitioning(true);
    
    // Cambiar tab con delay para permitir animación de salida
    setTimeout(() => {
      setCurrentTab(tabNumber);
      // Reset Lottie si cambiamos desde tab 3
      if (tabNumber !== 3) {
        setShowLottie(false);
      }
      
      // Permitir siguiente cambio después de animación
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
    }, 50);
  }, [isTransitioning]);

  // Manejo mejorado del sticky con transición suave
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | undefined;
    let fadeTimeout: NodeJS.Timeout | undefined;
    
    const handleScroll = () => {
      // Cancelar animación previa si existe
      if (scrollRAF.current) {
        cancelAnimationFrame(scrollRAF.current);
      }
      
      scrollRAF.current = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = Math.abs(rect.top);
        
        // Activar 4ta capa con scroll en tab 3
        if (currentTab === 3 && !showLottie) {
          if (scrollProgress >= 100) {
            setShowLottie(true);
          }
        }
        
        // Transición suave del sticky release
        if (showLottie && scrollProgress >= 200) {
          // Comenzar fade out gradual
          const fadeProgress = Math.min((scrollProgress - 200) / 200, 1);
          setStickyOpacity(1 - fadeProgress * 0.3);
          
          // Aplicar transformación sutil
          stickyY.set(fadeProgress * -20);
          stickyScale.set(1 - fadeProgress * 0.02);
          
          // Liberar sticky después de transición completa
          if (scrollProgress >= 400 && isSticky) {
            clearTimeout(fadeTimeout);
            fadeTimeout = setTimeout(() => {
              setIsSticky(false);
              // Reset valores después de liberar
              setTimeout(() => {
                setStickyOpacity(1);
                stickyY.set(0);
                stickyScale.set(1);
              }, 100);
            }, 300);
          }
        } else if (!showLottie && stickyOpacity < 1) {
          // Restaurar opacity si volvemos arriba
          setStickyOpacity(1);
          stickyY.set(0);
          stickyScale.set(1);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (fadeTimeout) clearTimeout(fadeTimeout);
      if (scrollRAF.current) {
        cancelAnimationFrame(scrollRAF.current);
      }
    };
  }, [currentTab, showLottie, isSticky, stickyY, stickyScale, stickyOpacity]);

  // Datos de los tabs
  const tabsData = useMemo(() => [
    {
      id: 1,
      title: messages.arkham.tabs.dataPlatform.title,
      content: messages.arkham.tabs.dataPlatform.content
    },
    {
      id: 2,
      title: messages.arkham.tabs.aiPlatform.title,
      content: messages.arkham.tabs.aiPlatform.content
    },
    {
      id: 3,
      title: messages.arkham.tabs.aiApplications.title,
      content: messages.arkham.tabs.aiApplications.content
    }
  ], [messages]);

  // Variantes optimizadas con physics mejoradas
  const layerVariants = {
    hidden: { 
      opacity: 0,
      y: 120,
      scale: 0.92,
      rotateX: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14,
        mass: 0.8,
        duration: 0.7
      }
    },
    exit: {
      opacity: 0,
      y: 60,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Variante especial para Lottie con mejor timing
  const lottieVariants = {
    hidden: { 
      opacity: 0, 
      y: 150, 
      scale: 0.85,
      rotate: -5
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 75,
        damping: 12,
        mass: 1,
        duration: 0.9
      }
    },
    exit: { 
      opacity: 0, 
      y: 80, 
      scale: 0.9,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="arkham-wrapper" style={{ minHeight: '200vh' }}>
      <motion.section 
        ref={sectionRef}
        className={`arkham-section ${className}`}
        style={{
          position: isSticky ? 'sticky' : 'relative',
          top: isSticky ? '0' : 'auto',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom, #ffffff, #f9fafb)',
          zIndex: 10,
          padding: '2rem',
          opacity: stickyOpacity,
          transform: `translateY(${stickyY.get()}px) scale(${stickyScale.get()})`,
          transition: isSticky ? 'none' : 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform, opacity'
        }}
      >
        <div className="arkham-container" style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center'
        }}>
          
          {/* LEFT COLUMN: Content and Tabs */}
          <div className="arkham-left">
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-5xl font-light text-gray-900 mb-4">
                {messages.arkham.title}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {messages.arkham.subtitle}
              </p>
              <motion.button 
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg transition-all mb-12"
                whileHover={{ 
                  scale: 1.02, 
                  backgroundColor: '#1f2937',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {messages.arkham.bookDemo}
                <motion.svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.button>
            </motion.div>

            {/* Tabs con micro-interacciones mejoradas */}
            <div className="arkham-tabs space-y-0">
              {tabsData.map((tab, index) => (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 0.1 + index * 0.08,
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  className={`tab-item border-l-2 transition-all cursor-pointer relative overflow-hidden ${
                    currentTab === tab.id 
                      ? 'border-gray-900 bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50/50'
                  }`}
                  onClick={() => handleTabClick(tab.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleTabClick(tab.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={currentTab === tab.id}
                  style={{
                    padding: '1.5rem',
                    marginBottom: index < tabsData.length - 1 ? '1rem' : 0,
                    transform: currentTab === tab.id ? 'translateX(2px)' : 'translateX(0)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: currentTab === tab.id 
                      ? 'inset 0 1px 3px rgba(0,0,0,0.05)' 
                      : 'none'
                  }}
                  whileHover={{ 
                    scale: currentTab === tab.id ? 1 : 1.01,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* Background animation on select */}
                  {currentTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-gray-50 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  
                  <div className="flex items-center justify-between mb-2">
                    <motion.h3 
                      className={`text-sm font-semibold tracking-wider transition-colors duration-300 ${
                        currentTab === tab.id ? 'text-gray-900' : 'text-gray-500'
                      }`}
                      animate={{ 
                        letterSpacing: currentTab === tab.id ? '0.05em' : '0.025em' 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {tab.title}
                    </motion.h3>
                    
                    <motion.div
                      animate={{ 
                        rotate: currentTab === tab.id ? 90 : 0,
                        opacity: currentTab === tab.id ? 0 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {currentTab === tab.id && (
                      <motion.p
                        key={`content-${tab.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ 
                          duration: 0.35,
                          ease: "easeInOut",
                          opacity: { duration: 0.25 }
                        }}
                        className="text-gray-600 text-sm leading-relaxed overflow-hidden"
                      >
                        {tab.content}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Isometric Layers con sombras mejoradas */}
          <div className="arkham-right relative" style={{ 
            height: '500px',
            perspective: '1200px',
            transformStyle: 'preserve-3d'
          }}>
            <div className="layers-container relative w-full h-full flex items-center justify-center">
              
              {/* Layer 1 - Base (Data Platform) */}
              <AnimatePresence>
                {currentTab >= 1 && (
                  <motion.div
                    className="layer absolute"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={layerVariants}
                    custom={0}
                    style={{
                      zIndex: 1,
                      transform: 'translateZ(0)',
                      willChange: 'transform, opacity',
                      backfaceVisibility: 'hidden'
                    }}
                    transition={{ delay: 0 }}
                  >
                    <motion.img
                      src="https://cdn.prod.website-files.com/68471fce29939e5703efec7f/68670c81fa191298451da48f_Tapa1.png"
                      alt="Data Platform"
                      className="w-full h-auto max-w-sm"
                      style={{
                        filter: currentTab === 1 
                          ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' 
                          : 'drop-shadow(0 10px 25px rgba(0,0,0,0.1))',
                        transition: 'filter 0.4s ease'
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.2))'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Layer 2 - AI Platform */}
              <AnimatePresence>
                {currentTab >= 2 && (
                  <motion.div
                    className="layer absolute"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={layerVariants}
                    custom={1}
                    style={{
                      zIndex: 2,
                      transform: 'translate3d(30px, -40px, 20px)',
                      willChange: 'transform, opacity',
                      backfaceVisibility: 'hidden'
                    }}
                    transition={{ delay: 0.15 }}
                  >
                    <motion.img
                      src="https://cdn.prod.website-files.com/68471fce29939e5703efec7f/68670c81e75b1845dbbd60ac_Tapa2.png"
                      alt="AI Platform"
                      className="w-full h-auto max-w-sm"
                      style={{
                        filter: currentTab === 2 
                          ? 'drop-shadow(0 25px 50px rgba(0,0,0,0.18))' 
                          : 'drop-shadow(0 15px 35px rgba(0,0,0,0.12))',
                        transition: 'filter 0.4s ease'
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.22))'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Layer 3 - Applications */}
              <AnimatePresence>
                {currentTab >= 3 && (
                  <motion.div
                    className="layer absolute"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={layerVariants}
                    custom={2}
                    style={{
                      zIndex: 3,
                      transform: 'translate3d(60px, -80px, 40px)',
                      willChange: 'transform, opacity',
                      backfaceVisibility: 'hidden'
                    }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.img
                      src="https://cdn.prod.website-files.com/68471fce29939e5703efec7f/68670c81149f2caecbc44ebe_Tapa3.png"
                      alt="AI Applications"
                      className="w-full h-auto max-w-sm"
                      style={{
                        filter: currentTab === 3 && !showLottie
                          ? 'drop-shadow(0 30px 60px rgba(0,0,0,0.2))' 
                          : 'drop-shadow(0 20px 45px rgba(0,0,0,0.15))',
                        transition: 'filter 0.4s ease'
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        filter: 'drop-shadow(0 35px 70px rgba(0,0,0,0.25))'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Layer 4 - Lottie Animation con mejor integración */}
              <AnimatePresence>
                {showLottie && lottieData && (
                  <motion.div
                    className="layer absolute"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={lottieVariants}
                    style={{
                      zIndex: 4,
                      transform: 'translate3d(90px, -120px, 60px)',
                      filter: 'drop-shadow(0 35px 70px rgba(139, 92, 246, 0.35))',
                      willChange: 'transform, opacity, filter',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      <Lottie
                        animationData={lottieData}
                        loop={true}
                        autoplay={true}
                        style={{
                          width: '280px',
                          height: '280px'
                        }}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <style jsx>{`
          .arkham-section {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          .tab-item {
            -webkit-tap-highlight-color: transparent;
            user-select: none;
          }
          
          .tab-item:focus-visible {
            outline: 2px solid #111827;
            outline-offset: -2px;
          }
          
          .layer {
            pointer-events: auto;
          }
          
          .layer img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
          
          /* Tablet styles (768px - 1024px) */
          @media (min-width: 768px) and (max-width: 1024px) {
            .arkham-container {
              gap: 3rem !important;
              padding: 0 2rem;
            }
            
            .arkham-left h2 {
              font-size: 2.5rem;
            }
            
            .arkham-left p {
              font-size: 1.125rem;
            }
            
            .layer img {
              max-width: 280px !important;
            }
          }
          
          /* Mobile styles (<768px) */
          @media (max-width: 767px) {
            .arkham-container {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
              padding: 0 1rem;
            }
            
            .arkham-right {
              order: -1;
              height: 350px !important;
              margin-bottom: 2rem;
            }
            
            .arkham-left h2 {
              font-size: 2rem;
              margin-bottom: 1rem;
            }
            
            .arkham-left p {
              font-size: 1rem;
              margin-bottom: 1.5rem;
            }
            
            .arkham-left button {
              padding: 0.75rem 1.5rem;
              font-size: 0.875rem;
            }
            
            .tab-item {
              padding: 1rem !important;
              margin-bottom: 0.75rem !important;
            }
            
            .tab-item h3 {
              font-size: 0.75rem;
            }
            
            .tab-item p {
              font-size: 0.8125rem;
            }
            
            .layer img {
              max-width: 200px !important;
            }
            
            .layer:nth-child(2) {
              transform: translate3d(20px, -30px, 10px) !important;
            }
            
            .layer:nth-child(3) {
              transform: translate3d(40px, -60px, 20px) !important;
            }
            
            .layer:nth-child(4) {
              transform: translate3d(60px, -90px, 30px) !important;
            }
            
            .layer:nth-child(4) div {
              width: 200px !important;
              height: 200px !important;
            }
          }
          
          /* Performance optimizations */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
          
          /* High refresh rate displays */
          @media (min-resolution: 2dppx) {
            .layer img {
              image-rendering: high-quality;
            }
          }
        `}</style>
      </motion.section>
    </div>
  );
}
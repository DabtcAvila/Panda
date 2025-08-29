'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const sectionRef = useRef<HTMLElement>(null);
  const [isSticky, setIsSticky] = useState(true);

  // Cargar animación Lottie
  useEffect(() => {
    fetch('/arkham-lottie.json')
      .then(response => response.json())
      .then(data => setLottieData(data))
      .catch(error => console.error('Error loading Lottie animation:', error));
  }, []);

  // Simple tab click handler - NO SCROLL, solo cambio de estado
  const handleTabClick = useCallback((tabNumber: number) => {
    setCurrentTab(tabNumber);
    // Reset Lottie si cambiamos desde tab 3
    if (tabNumber !== 3) {
      setShowLottie(false);
    }
  }, []);

  // Manejar el sticky behavior y la 4ta capa
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      
      // Si estamos en tab 3 y no hemos mostrado Lottie
      if (currentTab === 3 && !showLottie) {
        // Activar Lottie con un pequeño scroll adicional
        if (rect.top <= -100) {
          setShowLottie(true);
        }
      }
      
      // Desactivar sticky cuando hayamos scrolleado suficiente para ver la 4ta capa
      if (showLottie && rect.top <= -200) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsSticky(false);
        }, 800); // Esperar a que termine la animación
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentTab, showLottie]);

  // Datos de los tabs
  const tabsData = [
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
  ];

  // Variantes de animación para las capas (caída desde abajo)
  const layerVariants = {
    hidden: { 
      opacity: 0,
      y: 100,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <div className="arkham-wrapper" style={{ minHeight: '200vh' }}>
      <section 
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
          padding: '2rem'
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
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-light text-gray-900 mb-4">
                {messages.arkham.title}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {messages.arkham.subtitle}
              </p>
              <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors mb-12">
                {messages.arkham.bookDemo}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>

            {/* Tabs */}
            <div className="arkham-tabs space-y-0">
              {tabsData.map((tab, index) => (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`tab-item border-l-2 ${
                    currentTab === tab.id 
                      ? 'border-gray-900 bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-400'
                  } transition-all cursor-pointer`}
                  onClick={() => handleTabClick(tab.id)}
                  style={{
                    padding: '1.5rem',
                    marginBottom: index < tabsData.length - 1 ? '1rem' : 0
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-sm font-semibold tracking-wider ${
                      currentTab === tab.id ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {tab.title}
                    </h3>
                    {currentTab !== tab.id && (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {currentTab === tab.id && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
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

          {/* RIGHT COLUMN: Isometric Layers */}
          <div className="arkham-right relative" style={{ height: '500px' }}>
            <div className="layers-container relative w-full h-full flex items-center justify-center">
              
              {/* Layer 1 - Base (Data Platform) */}
              <motion.div
                className="layer absolute"
                initial="hidden"
                animate={currentTab >= 1 ? "visible" : "hidden"}
                variants={layerVariants}
                style={{
                  zIndex: 1,
                  transform: 'translateZ(0)'
                }}
              >
                <img
                  src="https://cdn.prod.website-files.com/68471fce29939e5703efec7f/68670c81fa191298451da48f_Tapa1.png"
                  alt="Data Platform"
                  className="w-full h-auto max-w-sm"
                  style={{
                    filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.1))'
                  }}
                />
              </motion.div>

              {/* Layer 2 - AI Platform */}
              <motion.div
                className="layer absolute"
                initial="hidden"
                animate={currentTab >= 2 ? "visible" : "hidden"}
                variants={layerVariants}
                style={{
                  zIndex: 2,
                  transform: currentTab >= 2 
                    ? 'translate3d(30px, -40px, 0)' 
                    : 'translate3d(30px, 100px, 0)'
                }}
              >
                <img
                  src="https://cdn.prod.website-files.com/68471fce29939e5703efec7f/68670c81e75b1845dbbd60ac_Tapa2.png"
                  alt="AI Platform"
                  className="w-full h-auto max-w-sm"
                  style={{
                    filter: 'drop-shadow(0 15px 40px rgba(0,0,0,0.15))'
                  }}
                />
              </motion.div>

              {/* Layer 3 - Applications */}
              <motion.div
                className="layer absolute"
                initial="hidden"
                animate={currentTab >= 3 ? "visible" : "hidden"}
                variants={layerVariants}
                style={{
                  zIndex: 3,
                  transform: currentTab >= 3 
                    ? 'translate3d(60px, -80px, 0)' 
                    : 'translate3d(60px, 100px, 0)'
                }}
              >
                <img
                  src="https://cdn.prod.website-files.com/68471fce29939e5703efec7f/68670c81149f2caecbc44ebe_Tapa3.png"
                  alt="AI Applications"
                  className="w-full h-auto max-w-sm"
                  style={{
                    filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.2))'
                  }}
                />
              </motion.div>

              {/* Layer 4 - Lottie Animation (solo con scroll después de tab 3) */}
              <AnimatePresence>
                {showLottie && lottieData && (
                  <motion.div
                    className="layer absolute"
                    initial={{ opacity: 0, y: 100, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      x: 90,
                      translateY: -120
                    }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 80,
                      damping: 15,
                      duration: 1
                    }}
                    style={{
                      zIndex: 4,
                      filter: 'drop-shadow(0 25px 60px rgba(139, 92, 246, 0.3))'
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
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .arkham-container {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
            
            .arkham-right {
              order: -1;
              height: 300px !important;
            }
            
            .layer img {
              max-width: 250px !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
}
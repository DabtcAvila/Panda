'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

interface ArkhamSectionProps {
  className?: string;
}

export default function ArkhamSection({ className = '' }: ArkhamSectionProps) {
  
  // Estados del componente
  const [currentTab, setCurrentTab] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lottieData, setLottieData] = useState<object | null>(null);
  
  // Referencias para el sistema de scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollHeightRef = useRef(0);
  
  // Configuración de umbrales de scroll
  const scrollThresholds = useMemo(() => ({
    1: { min: 0, max: 0.35 },
    2: { min: 0.32, max: 0.68 },
    3: { min: 0.65, max: 1.0 }
  }), []);

  // Función para activar tab
  const activateTab = useCallback((tabNumber: number, withAnimation = true) => {
    if (isAnimating && withAnimation) return;
    
    const previousTab = currentTab;
    setCurrentTab(tabNumber);
    
    console.log(`🎯 Activando Tab ${tabNumber} (anterior: ${previousTab})`);
    
    if (withAnimation) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        console.log('✅ Animación de tab completada');
      }, 800);
    }
  }, [currentTab, isAnimating]);

  // Manejo del scroll
  const handleScroll = useCallback(() => {
    if (isAnimating) return;
    
    const scrollY = window.pageYOffset;
    const scrollPercent = Math.min(scrollY / scrollHeightRef.current, 1);
    
    // Determinar qué tab debe estar activo
    let newTab = currentTab;
    
    if (scrollPercent <= scrollThresholds[1].max) {
      newTab = 1;
    } else if (scrollPercent >= scrollThresholds[2].min && scrollPercent <= scrollThresholds[2].max) {
      newTab = 2;
    } else if (scrollPercent >= scrollThresholds[3].min) {
      newTab = 3;
    }
    
    // Cambiar tab si es necesario
    if (newTab !== currentTab) {
      console.log(`📜 Scroll activó tab ${newTab} (${Math.round(scrollPercent * 100)}%)`);
      activateTab(newTab, true);
    }
  }, [currentTab, isAnimating, activateTab, scrollThresholds]);

  // Click en tabs
  const handleTabClick = useCallback((tabNumber: number) => {
    activateTab(tabNumber, true);
    
    // Scroll suave a la posición correspondiente
    const targetPercent = (tabNumber - 1) * 0.33 + 0.16;
    const targetScroll = targetPercent * scrollHeightRef.current;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }, [activateTab]);

  // Load Lottie animation data
  useEffect(() => {
    fetch('/arkham-lottie.json')
      .then(response => response.json())
      .then(data => setLottieData(data))
      .catch(error => console.error('Error loading Lottie animation:', error));
  }, []);

  // Configuración inicial y eventos
  useEffect(() => {
    if (containerRef.current) {
      scrollHeightRef.current = containerRef.current.scrollHeight - window.innerHeight;
    }
    
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', scrollListener);
    
    // Controles de teclado para testing
    const keyListener = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '3') {
        e.preventDefault();
        activateTab(parseInt(e.key), true);
      }
    };
    
    document.addEventListener('keydown', keyListener);
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
      document.removeEventListener('keydown', keyListener);
    };
  }, [handleScroll, activateTab]);

  // Datos de los tabs - basados en el original
  const tabsData = [
    {
      id: 1,
      title: 'DATA PLATFORM',
      content: 'A Data Lakehouse built for scale. Our platform ensures full data governance and lineage across your operations.'
    },
    {
      id: 2,
      title: 'AI PLATFORM',
      content: 'From Generative AI to multiple classes of Machine Learning Models, Arkham is AI tailored to your operations.'
    },
    {
      id: 3,
      title: 'AI-POWERED APPLICATIONS',
      content: 'Gain intelligence, control and solve your most complex challenges with your Data and AI tailored to your operations.'
    }
  ];

  return (
    <div className={`arkham-scroll-container ${className}`} ref={containerRef}>
      <section 
        ref={sectionRef}
        className={`arkham-tabs-section scroll-state-${currentTab}`}
      >
        <div className="isometric-row">
          {/* LEFT COLUMN: HEADLINE AND TABS */}
          <div className="box-headline-isometric">
            <div className="container-headline">
              {/* MAIN TITLE */}
              <motion.h2 
                className="arkham-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="line">
                  <span className="line-text">Arkham</span>
                </div>
              </motion.h2>
              
              {/* SUBTITLE */}
              <motion.p 
                className="arkham-subtitle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                The Data & AI Platform powering your company&apos;s future.
              </motion.p>
              
              {/* CTA BUTTON */}
              <motion.a 
                href="/contact" 
                className="arkham-cta-button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="btn-content">
                  <div className="text-block">Book a demo</div>
                  <svg 
                    className="arrow-icon" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,8 16,12 12,16"/>
                  </svg>
                </div>
              </motion.a>
            </div>

            {/* DESKTOP TABS CONTAINER */}
            <motion.div 
              className="container-vertical-tab desktop"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {tabsData.map((tab, index) => (
                <div 
                  key={tab.id}
                  className={`scroll-tab scroll-tab-${tab.id} ${currentTab === tab.id ? 'active' : ''} ${index === 0 ? 'box-top-bottom-line' : 'box-bottom-line'}`}
                  onClick={() => handleTabClick(tab.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="arkham-tab-heading">
                    <p className="tagline">{tab.title}</p>
                    <svg 
                      className={`arrow-right ${currentTab === tab.id ? 'hidden' : ''}`}
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor"
                    >
                      <polyline points="9,18 15,12 9,6"/>
                    </svg>
                  </div>
                  <motion.p 
                    className="tab-content"
                    animate={{
                      maxHeight: currentTab === tab.id ? '70px' : '0px',
                      opacity: currentTab === tab.id ? 1 : 0,
                      paddingBottom: currentTab === tab.id ? '20px' : '0px'
                    }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.25, 0.46, 0.45, 0.94] 
                    }}
                  >
                    {tab.content}
                  </motion.p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN: ISOMETRIC VISUALIZATION */}
          <div className="box-isometric">
            <motion.div 
              className="levels-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* LEVEL 1: BASE LAYER */}
              <motion.img 
                src="https://cdn.prod.website-files.com/68471fce29939e5703efec7f/68670c81fa191298451da48f_Tapa1.png"
                alt="Data Platform Level"
                className="level first-level"
                animate={{
                  opacity: currentTab >= 1 ? 1 : 0,
                  transform: 'translate(0px, 0px)'
                }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              
              {/* LEVEL 2: MIDDLE LAYER */}
              <motion.img 
                src="https://cdn.prod.website-files.com/68471fce29939e5703efec7f/68670c81e75b1845dbbd60ac_Tapa2.png"
                alt="AI Platform Level"
                className="level float-level"
                animate={{
                  opacity: currentTab >= 2 ? 1 : 0,
                  y: currentTab >= 2 ? -60 : -100,
                  x: currentTab >= 2 ? 20 : 0,
                }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
              />
              
              {/* LEVEL 3: TOP LAYER */}
              <motion.img 
                src="https://cdn.prod.website-files.com/68471fce29939e5703efec7f/68670c81149f2caecbc44ebe_Tapa3.png"
                alt="Applications Level"
                className="level float-level"
                animate={{
                  opacity: currentTab >= 3 ? 1 : 0,
                  y: currentTab >= 3 ? -120 : -100,
                  x: currentTab >= 3 ? 40 : 0,
                }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              />
              
              {/* LEVEL 4: LOTTIE ANIMATION */}
              <motion.div 
                className="level float-level lottie-animation"
                animate={{
                  opacity: currentTab >= 3 ? 1 : 0,
                  y: currentTab >= 3 ? -120 : -100,
                  x: currentTab >= 3 ? 40 : 0,
                }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
              >
                {lottieData ? (
                  <Lottie 
                    animationData={lottieData}
                    loop={true}
                    autoplay={currentTab >= 3}
                    style={{
                      width: '100%',
                      height: '100%',
                      maxWidth: '200px',
                      maxHeight: '200px'
                    }}
                  />
                ) : (
                  <div className="lottie-loading">
                    Loading...
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <style jsx>{`
        .arkham-scroll-container {
          height: 300vh;
          position: relative;
        }
        
        .arkham-tabs-section {
          position: sticky;
          top: 50px;
          margin: 0 auto;
          max-width: 857px;
          width: 857px;
          max-height: 1025.91px;
          height: 1025.91px;
          padding: 60px 24px;
          background: #fff;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .isometric-row {
          display: flex;
          gap: 40px;
          height: 100%;
          align-items: flex-start;
        }
        
        .box-headline-isometric {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        
        .container-headline {
          margin-bottom: 24px;
        }
        
        .arkham-title {
          font-size: 4rem;
          font-weight: 300;
          line-height: 1.1;
          margin-bottom: 16px;
          color: #111827;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
          letter-spacing: 0.025em;
        }
        
        .line {
          display: block;
          text-align: left;
          width: 100%;
        }
        
        .line-text {
          display: inline-block;
        }
        
        .arkham-subtitle {
          font-size: 1.25rem;
          color: #6b7280;
          margin-bottom: 24px;
          line-height: 1.4;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
        }
        
        .arkham-cta-button {
          display: inline-flex;
          align-items: center;
          padding: 12px 24px;
          background: #111827;
          border: 1px solid #111827;
          border-radius: 0.5rem;
          text-decoration: none;
          color: #ffffff;
          font-weight: 500;
          transition: all 0.2s ease;
          margin-top: 16px;
        }
        
        .arkham-cta-button:hover {
          background: #1f2937;
          color: #fff;
          transform: translateY(-1px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        
        .btn-content {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .arrow-icon {
          width: 16px;
          height: 16px;
        }
        
        .container-vertical-tab.desktop {
          display: flex;
          flex-direction: column;
          gap: 0;
          border-left: 1px solid #e5e7eb;
          padding-left: 24px;
        }
        
        .scroll-tab {
          border-bottom: 1px solid #e5e7eb;
          padding: 20px 0;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .box-top-bottom-line {
          border-top: 1px solid #e5e7eb;
        }
        
        .scroll-tab:hover {
          background-color: #f9fafb;
        }
        
        .scroll-tab.active .tagline {
          color: #111827 !important;
          font-weight: 600;
        }
        
        .arkham-tab-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        
        .tagline {
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #6b7280;
          margin: 0;
          transition: all 0.3s ease;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
        }
        
        .scroll-tab:hover .tagline {
          color: #374151;
        }
        
        .arrow-right {
          width: 16px;
          height: 16px;
          opacity: 1;
          transition: opacity 0.3s ease, transform 0.3s ease;
          stroke: #9ca3af;
        }
        
        .arrow-right.hidden {
          opacity: 0;
        }
        
        .scroll-tab:hover .arrow-right {
          transform: translateX(4px);
          stroke: #6b7280;
        }
        
        .tab-content {
          font-size: 0.95rem;
          color: #6b7280;
          line-height: 1.6;
          margin: 0;
          overflow: hidden;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
        }
        
        .box-isometric {
          flex: 1;
          position: relative;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .levels-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 400px;
          max-height: 400px;
          opacity: 1;
        }
        
        .level {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        
        .level.first-level {
          z-index: 1;
        }
        
        .level.float-level {
          z-index: 2;
        }
        
        .lottie-animation {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .lottie-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #6b7280;
          font-size: 14px;
          background: rgba(107, 114, 128, 0.05);
          border-radius: 0.5rem;
          padding: 20px;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
        }
        
        @media (max-width: 1024px) {
          .arkham-tabs-section {
            max-width: 100%;
            width: 100%;
            padding: 40px 24px;
          }
          
          .arkham-title {
            font-size: 3.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .arkham-scroll-container {
            height: 150vh;
          }
          
          .arkham-tabs-section {
            position: relative;
            top: 0;
            height: auto;
            max-height: none;
            padding: 24px 16px;
            box-shadow: none;
            border-radius: 0;
          }
          
          .isometric-row {
            flex-direction: column;
            gap: 24px;
          }
          
          .arkham-title {
            font-size: 2.5rem;
            text-align: center;
          }
          
          .arkham-subtitle {
            font-size: 1.125rem;
            text-align: center;
          }
          
          .container-headline {
            text-align: center;
            margin-bottom: 32px;
          }
          
          .arkham-cta-button {
            margin: 16px auto 0 auto;
          }
          
          .container-vertical-tab.desktop {
            border-left: none;
            padding-left: 0;
            border-top: 1px solid #e5e7eb;
            padding-top: 24px;
            margin-top: 24px;
          }
          
          .scroll-tab {
            padding: 16px;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            margin-bottom: 12px;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .box-top-bottom-line {
            border-top: none;
          }
          
          .box-isometric {
            height: 250px;
            order: -1;
          }
          
          .levels-wrapper {
            max-width: 300px;
            max-height: 250px;
          }
        }
        
        @media (max-width: 480px) {
          .arkham-scroll-container {
            height: 120vh;
          }
          
          .arkham-tabs-section {
            padding: 16px 12px;
          }
          
          .arkham-title {
            font-size: 2rem;
          }
          
          .arkham-subtitle {
            font-size: 1rem;
          }
          
          .box-isometric {
            height: 200px;
          }
          
          .levels-wrapper {
            max-width: 250px;
            max-height: 200px;
          }
        }
      `}</style>
    </div>
  );
}
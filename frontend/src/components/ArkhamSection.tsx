'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface ArkhamSectionProps {
  className?: string;
}

export default function ArkhamSection({ className = '' }: ArkhamSectionProps) {
  const { messages } = useLanguage();
  
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const handleLayerClick = (layerNumber: number) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setSelectedLayer(layerNumber);

    timerRef.current = setTimeout(() => {
      setSelectedLayer(null);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const layers = [
    {
      id: 1,
      title: messages.arkham.tabs.dataPlatform.title,
      content: messages.arkham.tabs.dataPlatform.content,
      image: "https://cdn.prod.website-files.com/68471fce29939e5703efec7f/68670c81fa191298451da48f_Tapa1.png",
      alt: "Data Platform",
      translateY: 40,
      zIndex: 1
    },
    {
      id: 2,
      title: messages.arkham.tabs.aiPlatform.title,
      content: messages.arkham.tabs.aiPlatform.content,
      image: "https://cdn.prod.website-files.com/68471fce29939e5703efec7f/68670c81e75b1845dbbd60ac_Tapa2.png",
      alt: "AI Platform",
      translateY: 0,
      zIndex: 2
    },
    {
      id: 3,
      title: messages.arkham.tabs.aiApplications.title,
      content: messages.arkham.tabs.aiApplications.content,
      image: "https://cdn.prod.website-files.com/68471fce29939e5703efec7f/68670c81fa191298451da491_Tapa3.png",
      alt: "AI Applications",
      translateY: -40,
      zIndex: 3
    }
  ];

  const layerVariants = {
    hidden: { 
      opacity: 0,
      y: -100,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      className={`arkham-section ${className}`}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, #ffffff, #f9fafb)',
        padding: '4rem 2rem'
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
        
        <div className="arkham-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12"
          >
            <h2 className="text-5xl font-light text-gray-900 mb-4">
              {messages.arkham.title}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {messages.arkham.subtitle}
            </p>
            <motion.button 
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg transition-all"
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: '#1f2937',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {messages.arkham.bookDemo}
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>

          <div className="space-y-0">
            {layers.map((layer, index) => (
              <motion.div
                key={layer.id}
                className={`
                  border-l-2 transition-all cursor-pointer relative overflow-hidden
                  ${selectedLayer === layer.id 
                    ? 'border-gray-900 bg-gray-50' 
                    : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50/50'
                  }
                `}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                style={{
                  marginBottom: index < layers.length - 1 ? '1rem' : 0,
                  transform: selectedLayer === layer.id ? 'translateX(2px)' : 'translateX(0)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: selectedLayer === layer.id 
                    ? 'inset 0 1px 3px rgba(0,0,0,0.05)' 
                    : 'none'
                }}
              >
                {selectedLayer === layer.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-50 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ zIndex: -1 }}
                  />
                )}
                
                <motion.button
                  onClick={() => handleLayerClick(layer.id)}
                  className="w-full text-left p-6 relative z-10"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <motion.h3 
                      className={`text-sm font-semibold tracking-wider transition-colors duration-300 ${
                        selectedLayer === layer.id ? 'text-gray-900' : 'text-gray-500'
                      }`}
                      animate={{ 
                        letterSpacing: selectedLayer === layer.id ? '0.05em' : '0.025em' 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {layer.title}
                    </motion.h3>
                    
                    <motion.div
                      animate={{ 
                        rotate: selectedLayer === layer.id ? 90 : 0,
                        opacity: selectedLayer === layer.id ? 0 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.button>
                
                <AnimatePresence>
                  {selectedLayer === layer.id && (
                    <motion.div
                      key={`content-${layer.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.35,
                        ease: "easeInOut",
                        opacity: { duration: 0.25 }
                      }}
                      className="overflow-hidden px-6 pb-6"
                    >
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {layer.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="arkham-right relative" style={{ 
          height: '500px',
          perspective: '1200px',
          transformStyle: 'preserve-3d'
        }}>
          <div className="layers-container relative w-full h-full flex items-center justify-center">
            
            <AnimatePresence mode="sync">
              {layers.map((layer, index) => {
                const shouldShow = selectedLayer === null || layer.id <= (selectedLayer || 3);
                
                if (!shouldShow) return null;
                
                return (
                  <motion.div
                    key={layer.id}
                    className="absolute"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={layerVariants}
                    custom={index}
                    style={{
                      zIndex: layer.zIndex,
                      transform: `translate3d(${index * 30}px, ${layer.translateY}px, ${index * 20}px)`,
                      willChange: 'transform, opacity'
                    }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <motion.div
                      className="w-full h-auto max-w-sm relative"
                      style={{
                        filter: selectedLayer === layer.id 
                          ? 'drop-shadow(0 30px 60px rgba(0,0,0,0.25))' 
                          : 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
                        transition: 'filter 0.4s ease'
                      }}
                      animate={selectedLayer === layer.id ? {
                        scale: [1, 1.02, 1],
                      } : {}}
                      transition={selectedLayer === layer.id ? {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      } : { duration: 0.3 }}
                      whileHover={{ 
                        scale: 1.02,
                        filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.2))'
                      }}
                    >
                      <img
                        src={layer.image}
                        alt={layer.alt}
                        className="w-full h-auto max-w-sm"
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx>{`
        .arkham-section {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
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
        }
        
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
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
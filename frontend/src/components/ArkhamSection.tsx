'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface ArkhamSectionProps {
  className?: string;
}

export default function ArkhamSection({ className = '' }: ArkhamSectionProps) {
  const { messages } = useLanguage();
  
  // Estado para controlar qué capa mostrar (null = todas, 1-3 = capa específica)
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  // Función para manejar clicks en los botones
  const handleLayerClick = (layerNumber: number) => {
    // Limpiar timer anterior si existe
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Establecer la capa seleccionada
    setSelectedLayer(layerNumber);

    // Configurar timer de 5 segundos para volver al estado default
    timerRef.current = setTimeout(() => {
      setSelectedLayer(null);
    }, 5000);
  };

  // Limpiar timer al desmontar el componente
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Configuración de las capas
  const layers = [
    {
      id: 1,
      title: "PLATAFORMA DE DATOS",
      image: "https://cdn.prod.website-files.com/68471fce29939e5703efec7f/68670c81fa191298451da48f_Tapa1.png",
      alt: "Data Platform",
      translateY: 0,
      zIndex: 1
    },
    {
      id: 2,
      title: "PLATAFORMA DE IA",
      image: "https://cdn.prod.website-files.com/68471fce29939e5703efec7f/68670c81e75b1845dbbd60ac_Tapa2.png",
      alt: "AI Platform",
      translateY: -40,
      zIndex: 2
    },
    {
      id: 3,
      title: "APLICATIVOS INTELIGENTES",
      image: "https://cdn.prod.website-files.com/68471fce29939e5703efec7f/68670c81149f2caecbc44ebe_Tapa3.png",
      alt: "AI Applications",
      translateY: -80,
      zIndex: 3
    }
  ];

  // Variantes de animación para las capas (de arriba hacia abajo)
  const layerVariants = {
    hidden: { 
      opacity: 0,
      y: -100,  // Viene desde arriba
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
      y: -50,  // Sale hacia arriba
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
        
        {/* COLUMNA IZQUIERDA: Título y Botones */}
        <div className="arkham-left">
          {/* Sección del título */}
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

          {/* Botones de selección de capas */}
          <div className="space-y-4">
            {layers.map((layer, index) => (
              <motion.button
                key={layer.id}
                onClick={() => handleLayerClick(layer.id)}
                className={`
                  w-full text-left p-4 border-l-4 transition-all duration-300
                  ${selectedLayer === layer.id 
                    ? 'border-gray-900 bg-gray-100 shadow-md' 
                    : 'border-gray-300 hover:border-gray-600 hover:bg-gray-50 hover:shadow-sm cursor-pointer'
                  }
                `}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className={`
                  text-sm font-semibold tracking-wider transition-colors duration-300
                  ${selectedLayer === layer.id ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'}
                `}>
                  {layer.title}
                </h3>
              </motion.button>
            ))}
          </div>

          {/* Indicador de estado */}
          <motion.div 
            className="mt-8 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {selectedLayer ? (
              <span>Mostrando: {layers.find(l => l.id === selectedLayer)?.title}</span>
            ) : (
              <span>Mostrando: Todas las capas</span>
            )}
          </motion.div>
        </div>

        {/* COLUMNA DERECHA: Visualización de Capas */}
        <div className="arkham-right relative" style={{ 
          height: '500px',
          perspective: '1200px',
          transformStyle: 'preserve-3d'
        }}>
          <div className="layers-container relative w-full h-full flex items-center justify-center">
            
            <AnimatePresence mode="wait">
              {/* Mostrar todas las capas o solo la seleccionada */}
              {selectedLayer === null ? (
                // Estado default: Mostrar todas las capas apiladas
                layers.map((layer, index) => (
                  <motion.div
                    key={`all-${layer.id}`}
                    className="absolute"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={layerVariants}
                    custom={index}
                    style={{
                      zIndex: layer.zIndex,
                      transform: `translate3d(${index * 30}px, ${layer.translateY}px, ${index * 20}px)`
                    }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <motion.img
                      src={layer.image}
                      alt={layer.alt}
                      className="w-full h-auto max-w-sm"
                      style={{
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
                        transition: 'filter 0.4s ease'
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.2))'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))
              ) : (
                // Estado con capa seleccionada: Mostrar solo una capa
                <motion.div
                  key={`single-${selectedLayer}`}
                  className="absolute"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={layerVariants}
                  style={{
                    zIndex: 10,
                    transform: 'translate3d(0, 0, 0)'
                  }}
                >
                  <motion.img
                    src={layers[selectedLayer - 1].image}
                    alt={layers[selectedLayer - 1].alt}
                    className="w-full h-auto max-w-md"
                    style={{
                      filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.25))',
                      transition: 'filter 0.4s ease'
                    }}
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  />
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
        
        /* Estilos responsivos para tablet */
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
        
        /* Estilos responsivos para móvil */
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
        
        /* Optimización de rendimiento */
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
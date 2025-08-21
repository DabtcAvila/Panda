'use client';

import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 100 100" 
                className="h-6 w-6 mr-2"
                aria-label="Panda Technologies Logo"
              >
                <path 
                  d="M 0,0 L 100,0 L 100,100 L 0,100 L 0,0 Z M 8,8 L 8,92 L 92,92 L 92,8 L 8,8 Z" 
                  className="fill-gray-900" 
                  fillRule="evenodd"
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="27.5" 
                  className="fill-gray-900"
                />
              </svg>
              <span className="text-xl font-semibold tracking-tight text-gray-900">
                Panda Technologies
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="rounded-full border border-gray-300 px-8 py-2.5 text-sm font-medium text-gray-900 transition-all hover:border-gray-900">
                Get Started
              </button>
              <button className="text-gray-600 transition-colors hover:text-gray-900">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
              <button className="text-gray-600 transition-colors hover:text-gray-900">
                <Bars3Icon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-8 lg:pt-40">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.h1
              className="text-5xl font-light tracking-tight text-gray-900 sm:text-6xl lg:text-7xl"
              variants={fadeIn}
            >
              Software de IA Empresarial del Futuro.
              <span className="block font-normal">Entregado Hoy.™</span>
            </motion.h1>
            
            <motion.p
              className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600"
              variants={fadeIn}
            >
              Construimos software que permite a las organizaciones integrar efectivamente 
              sus datos, decisiones y operaciones con Inteligencia Artificial.
            </motion.p>

            <motion.div
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
              variants={fadeIn}
            >
              <button className="group relative overflow-hidden rounded-full border border-gray-900 px-8 py-3 text-sm font-medium text-gray-900 transition-all hover:text-white">
                <span className="relative z-10">Explorar Soluciones</span>
                <div className="absolute inset-0 -z-10 bg-gray-900 transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100 origin-left" />
              </button>
              <button className="rounded-full border border-gray-300 px-8 py-3 text-sm font-medium text-gray-600 transition-all hover:border-gray-900 hover:text-gray-900">
                Solicitar Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronDownIcon className="h-5 w-5 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600 font-medium tracking-wide">
              Scroll to Explore
            </span>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">
              Capacidades Core
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Tecnología avanzada diseñada para impulsar resultados empresariales tangibles
            </p>
          </motion.div>

          <motion.div
            className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-12 sm:mt-20 lg:grid-cols-3"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div
              className="relative"
              variants={fadeIn}
            >
              <div className="mb-4 h-px w-12 bg-gray-900" />
              <h3 className="text-lg font-medium text-gray-900">
                IA para Decisiones
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Algoritmos de aprendizaje profundo que analizan patrones complejos 
                para proporcionar insights accionables y recomendaciones estratégicas 
                en tiempo real.
              </p>
              <button className="mt-6 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                Aprender más →
              </button>
            </motion.div>

            <motion.div
              className="relative"
              variants={fadeIn}
            >
              <div className="mb-4 h-px w-12 bg-gray-900" />
              <h3 className="text-lg font-medium text-gray-900">
                Automatización Inteligente
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Sistemas autónomos que optimizan flujos de trabajo, reducen errores 
                operativos y liberan recursos humanos para tareas de mayor valor 
                estratégico.
              </p>
              <button className="mt-6 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                Aprender más →
              </button>
            </motion.div>

            <motion.div
              className="relative"
              variants={fadeIn}
            >
              <div className="mb-4 h-px w-12 bg-gray-900" />
              <h3 className="text-lg font-medium text-gray-900">
                Análisis Predictivo
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Modelos estadísticos avanzados que anticipan tendencias del mercado, 
                comportamiento del cliente y oportunidades de crecimiento con precisión 
                excepcional.
              </p>
              <button className="mt-6 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                Aprender más →
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24">
        <motion.div
          className="mx-auto max-w-4xl px-6 text-center lg:px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-light tracking-tight text-gray-900">
            Comienza tu transformación digital
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Únete a las empresas líderes que confían en nuestra tecnología
          </p>
          <button className="mt-8 rounded-full bg-gray-900 px-8 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800">
            Programar Consulta
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-lg font-semibold text-gray-900">
                Panda Technologies
              </span>
              <p className="mt-2 text-sm text-gray-600">
                © 2024 Panda Technologies. Todos los derechos reservados.
              </p>
            </div>
            <div className="flex space-x-6">
              <button className="text-sm text-gray-600 hover:text-gray-900">
                Privacidad
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900">
                Términos
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900">
                Cookies
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
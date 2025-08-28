'use client';

import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage() {
  const { locale, messages, changeLocale } = useLanguage();
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
          <div className="flex h-[70px] items-center">
            <div className="flex items-center flex-1">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 100 100" 
                className="h-7 w-7 mr-2"
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
              <span className="text-2xl font-sans font-semibold tracking-tight text-gray-900">
                {messages.navbar.company}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="rounded-lg border border-gray-300 px-24 py-3 text-sm font-medium text-gray-900 transition-all hover:border-gray-900">
                Get Started
              </button>
              <button 
                onClick={() => changeLocale(locale === 'es' ? 'en' : 'es')}
                className="flex items-center text-sm text-gray-600 transition-all hover:text-gray-900"
              >
                <span className={`${locale === 'es' ? 'font-semibold' : ''}`}>ES</span>
                <span className="mx-1.5 text-gray-400">|</span>
                <span className={`${locale === 'en' ? 'font-semibold' : ''}`}>EN</span>
              </button>
              <button className="text-gray-600 transition-colors hover:text-gray-900">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
              <button className="text-gray-600 transition-colors hover:text-gray-900">
                <Bars3Icon className="h-6 w-6" />
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
              className="text-5xl font-mono font-light tracking-wider text-gray-900 sm:text-6xl lg:text-7xl"
              variants={fadeIn}
            >
              {messages.hero.title}
              <span className="block font-mono font-normal tracking-wider">{messages.hero.titleHighlight}</span>
            </motion.h1>
            
            <motion.p
              className="mx-auto mt-8 max-w-2xl text-lg font-sans leading-relaxed text-gray-600"
              variants={fadeIn}
            >
              {messages.hero.description}
            </motion.p>

            <motion.div
              className="mt-12 flex justify-center"
              variants={fadeIn}
            >
              <button className="group relative overflow-hidden rounded-lg border border-gray-900 px-32 py-4 text-lg font-medium text-gray-900 transition-all hover:text-white">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 -z-10 bg-gray-900 transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100 origin-left" />
              </button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <motion.div
              className="flex flex-col items-center"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="flex items-center justify-center mb-1">
                <ChevronDownIcon className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600 font-sans font-medium tracking-wide">
                Scroll to Explore
              </span>
            </motion.div>
          </div>
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
            <h2 className="text-3xl font-mono font-light tracking-wider text-gray-900 sm:text-4xl">
              {messages.services.title}
            </h2>
            <p className="mt-4 text-lg font-sans text-gray-600">
              {messages.services.subtitle}
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
              <h3 className="text-lg font-mono font-medium tracking-wider text-gray-900">
                {messages.services.aiDecisions.title}
              </h3>
              <p className="mt-4 text-sm font-sans leading-relaxed text-gray-600">
                {messages.services.aiDecisions.description}
              </p>
              <button className="mt-6 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                {messages.services.learnMore}
              </button>
            </motion.div>

            <motion.div
              className="relative"
              variants={fadeIn}
            >
              <div className="mb-4 h-px w-12 bg-gray-900" />
              <h3 className="text-lg font-mono font-medium tracking-wider text-gray-900">
                {messages.services.automation.title}
              </h3>
              <p className="mt-4 text-sm font-sans leading-relaxed text-gray-600">
                {messages.services.automation.description}
              </p>
              <button className="mt-6 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                {messages.services.learnMore}
              </button>
            </motion.div>

            <motion.div
              className="relative"
              variants={fadeIn}
            >
              <div className="mb-4 h-px w-12 bg-gray-900" />
              <h3 className="text-lg font-mono font-medium tracking-wider text-gray-900">
                {messages.services.predictive.title}
              </h3>
              <p className="mt-4 text-sm font-sans leading-relaxed text-gray-600">
                {messages.services.predictive.description}
              </p>
              <button className="mt-6 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                {messages.services.learnMore}
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
          <h2 className="text-3xl font-mono font-light tracking-wider text-gray-900">
            {messages.cta.title}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {messages.cta.subtitle}
          </p>
          <button className="mt-8 rounded-lg bg-gray-900 px-8 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800">
            {messages.cta.button}
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-lg font-sans font-semibold text-gray-900">
                {messages.footer.company}
              </span>
              <p className="mt-2 text-sm font-sans text-gray-600">
                {messages.footer.rights}
              </p>
            </div>
            <div className="flex space-x-6">
              <button className="text-sm text-gray-600 hover:text-gray-900">
                {messages.footer.privacy}
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900">
                {messages.footer.terms}
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900">
                {messages.footer.cookies}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
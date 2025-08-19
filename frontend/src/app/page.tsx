export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl">
            Panda Technologies
          </h1>
          
          <p className="max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Transformamos empresas con soluciones de Inteligencia Artificial de vanguardia
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="btn-primary px-8 py-3 text-base">
              Conoce nuestras soluciones
            </button>
            <button className="btn-secondary px-8 py-3 text-base">
              Contactar equipo
            </button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card p-6">
              <h3 className="mb-2 text-xl font-semibold">IA Empresarial</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Soluciones personalizadas de inteligencia artificial para optimizar procesos empresariales
              </p>
            </div>
            
            <div className="card p-6">
              <h3 className="mb-2 text-xl font-semibold">Consultoría Estratégica</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Asesoramiento experto para implementar IA en tu organización
              </p>
            </div>
            
            <div className="card p-6">
              <h3 className="mb-2 text-xl font-semibold">Automatización Inteligente</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Automatiza tareas complejas con tecnología de última generación
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
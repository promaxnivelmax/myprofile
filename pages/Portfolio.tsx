
import React from 'react';
import { PortfolioData } from '../types';

const Portfolio: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const { projects } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-in-up">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">
            Mis <span className="text-accent">Automatizaciones</span>
        </h1>
        <div className="w-24 h-3 bg-accent mx-auto mb-8 rounded-full shadow-lg"></div>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-bold text-lg">
          Herramientas inteligentes diseñadas para simplificar la gestión administrativa y ciudadana.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map(project => (
          <div key={project.id} className="bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl hover:shadow-accent/20 transition-all duration-700 border border-zinc-100 dark:border-zinc-800 overflow-hidden flex flex-col group hover:-translate-y-4">
            <div className="h-4 w-full bg-accent"></div>
            <div className="p-10 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <span className="px-5 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  {project.category}
                </span>
                <i className="fas fa-magic text-3xl opacity-20 group-hover:opacity-100 transition-all group-hover:scale-125 text-accent"></i>
              </div>
              <h3 className="text-3xl font-black mb-6 leading-tight uppercase tracking-tight group-hover:text-accent transition-colors dark:text-zinc-100">{project.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed mb-10 flex-grow italic">"{project.description}"</p>
              <div className="mt-auto">
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    className="flex items-center justify-center gap-4 w-full py-5 px-8 rounded-[2rem] bg-zinc-900 dark:bg-zinc-800 text-white dark:text-zinc-100 font-black text-xs uppercase tracking-widest hover:bg-accent dark:hover:bg-accent transition-all active:scale-95 shadow-xl border border-transparent dark:border-zinc-700"
                  >
                    <span>COMENZAR TRÁMITE</span>
                    <i className="fas fa-chevron-right text-xs"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 p-16 bg-white dark:bg-zinc-900 rounded-[3.5rem] shadow-2xl border-4 border-accent text-center gold-glow relative overflow-hidden">
         <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
            <i className="fas fa-handshake text-[15rem] text-accent"></i>
         </div>
         <h4 className="text-3xl font-black mb-4 uppercase tracking-tighter dark:text-zinc-100">¿Necesitas un desarrollo a medida?</h4>
         <p className="text-zinc-500 dark:text-zinc-400 mb-10 text-lg font-medium max-w-xl mx-auto">Diseñemos juntos la automatización que optimizará tus procesos de negocio.</p>
         <a 
            href="https://wa.me/3052319414?text=Hola%20Iván,%20me%20interesa%20desarrollar%20una%20automatización%20personalizada" 
            target="_blank"
            className="inline-flex items-center gap-4 py-5 px-12 bg-accent text-black font-black rounded-2xl hover:scale-110 transition-all uppercase tracking-[0.2em] text-xs shadow-2xl"
         >
            <i className="fab fa-whatsapp text-2xl"></i> CONTACTAR POR WHATSAPP
         </a>
      </div>
    </div>
  );
};

export default Portfolio;

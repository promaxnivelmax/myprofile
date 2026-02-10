
import React from 'react';
import { PortfolioData } from '../types';

const Supports: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const { supports } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            Mis <span style={{ color: '#D4AF37' }}>Documentos</span> de Respaldo
        </h1>
        <div className="w-20 h-2 bg-zinc-900 dark:bg-white mx-auto mb-6"></div>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
          Portafolio de certificaciones, cursos y diplomados realizados durante mi trayectoria profesional.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {supports.map(support => (
          <div key={support.id} className="group bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-lg border border-zinc-100 dark:border-zinc-800 hover:-translate-y-2 transition-all duration-500 flex flex-col">
            <div className="mb-6 flex items-center justify-between">
               <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center shadow-inner">
                    <i className="fas fa-file-certificate text-xl opacity-20 group-hover:opacity-100 transition-opacity" style={{ color: '#D4AF37' }}></i>
               </div>
               <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300 dark:text-zinc-600">{support.category}</span>
            </div>
            
            <h3 className="font-black text-lg uppercase tracking-tight mb-4 leading-tight group-hover:text-[#D4AF37] transition-colors">
                {support.title}
            </h3>

            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-8 italic flex-grow">
              {support.description || "Documento verificado de trayectoria institucional."}
            </p>
            
            <div className="pt-6 border-t border-zinc-50 dark:border-zinc-800">
              <button 
                onClick={() => alert('Visualizador PDF en desarrollo para integración con Supabase Storage.')}
                className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all active:scale-95"
              >
                <i className="fas fa-eye"></i> Visualizar Documento
              </button>
            </div>
          </div>
        ))}

        {supports.length === 0 && (
          <div className="col-span-full text-center py-20 bg-zinc-100 dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <i className="fas fa-search text-4xl mb-4 opacity-10"></i>
            <p className="font-black text-zinc-400 uppercase tracking-widest text-xs">Sin documentos agregados</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Supports;

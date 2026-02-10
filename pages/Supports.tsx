
import React, { useState } from 'react';
import { PortfolioData, SupportDoc } from '../types';

const Supports: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const { supports } = data;
  const [viewingPdf, setViewingPdf] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            Mis <span className="text-accent">Documentos</span> de Respaldo
        </h1>
        <div className="w-24 h-3 bg-accent mx-auto mb-8 rounded-full"></div>
        <p className="text-zinc-500 dark:text-zinc-400 font-bold text-lg max-w-2xl mx-auto">
          Portafolio de certificaciones, cursos y diplomados realizados durante mi trayectoria profesional.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {supports.map(support => (
          <div key={support.id} className="group p-8 rounded-[2rem] w3-card-4 border border-zinc-100 dark:border-zinc-800 hover:-translate-y-2 transition-all duration-500 flex flex-col">
            <div className="mb-6 flex items-center justify-between">
               <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center shadow-inner">
                    <i className="fas fa-file-certificate text-xl opacity-20 group-hover:opacity-100 transition-opacity text-accent"></i>
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 dark:text-zinc-600">{support.category}</span>
            </div>
            
            <h3 className="font-black text-xl uppercase tracking-tight mb-4 leading-tight group-hover:text-accent transition-colors">
                {support.title}
            </h3>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 italic flex-grow">
              {support.description || "Documento verificado de trayectoria institucional."}
            </p>
            
            <div className="pt-6 border-t border-zinc-50 dark:border-zinc-800">
              <button 
                onClick={() => {
                  if (support.url) {
                    setViewingPdf(support.url);
                  } else {
                    alert('Este documento no tiene un archivo cargado actualmente.');
                  }
                }}
                className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-accent hover:text-white transition-all active:scale-95"
              >
                <i className="fas fa-eye"></i> Visualizar Documento
              </button>
            </div>
          </div>
        ))}

        {supports.length === 0 && (
          <div className="col-span-full text-center py-24 bg-zinc-100 dark:bg-zinc-900 rounded-[3rem] border-4 border-dashed border-zinc-200 dark:border-zinc-800">
            <i className="fas fa-search text-5xl mb-6 opacity-10 text-accent"></i>
            <p className="font-black text-zinc-400 uppercase tracking-widest text-sm">Sin documentos agregados</p>
          </div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      {viewingPdf && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in-up">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setViewingPdf(null)}></div>
          <div className="relative w-full max-w-5xl h-full bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
               <h3 className="font-black uppercase tracking-widest text-xs">Visualizador de Documentos</h3>
               <button onClick={() => setViewingPdf(null)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                  <i className="fas fa-times text-xl"></i>
               </button>
            </div>
            <div className="flex-grow">
               <iframe src={viewingPdf} className="w-full h-full border-none"></iframe>
            </div>
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950 text-center">
               <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Vista previa del documento oficial</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Supports;

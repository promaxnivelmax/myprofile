
import React, { useState } from 'react';
import { PortfolioData, SupportDoc } from '../types';

const Supports: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const { supports } = data;
  const [viewingPdf, setViewingPdf] = useState<string | null>(null);
  const [isProtected, setIsProtected] = useState(false);

  const openViewer = (support: SupportDoc) => {
    if (support.url && support.url !== "#" && support.url !== "") {
      setViewingPdf(support.url);
      setIsProtected(support.description?.includes("ESCUDO_PRIVACIDAD") || false);
    } else {
      alert('Documento no cargado.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            Mis <span className="text-accent">Soportes</span> de Respaldo
        </h1>
        <div className="w-24 h-3 bg-accent mx-auto mb-8 rounded-full shadow-lg"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {supports.map(support => (
          <div key={support.id} className="group p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full shadow-xl">
            <div className="mb-6 flex items-center justify-between">
               <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center border border-zinc-100 dark:border-zinc-700">
                    <i className="fas fa-certificate text-xl text-accent opacity-40 group-hover:opacity-100 transition-opacity"></i>
               </div>
               <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">{support.category}</span>
                  {support.description?.includes("ESCUDO_PRIVACIDAD") && (
                    <span className="text-[8px] font-black uppercase text-accent animate-pulse mt-1 flex items-center gap-1">
                      <i className="fas fa-user-shield"></i> Protegido
                    </span>
                  )}
               </div>
            </div>
            
            <div className="flex-grow">
              <h3 className="font-black text-xl uppercase tracking-tight mb-2 leading-tight group-hover:text-accent transition-colors dark:text-zinc-100">
                  {support.title}
              </h3>
              <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                <i className="fas fa-university text-accent/50"></i> {support.emisor || "Institución"}
              </p>
            </div>
            
            <div className="pt-6 border-t border-zinc-50 dark:border-zinc-800">
              <button 
                onClick={() => openViewer(support)}
                className="w-full flex items-center justify-center gap-3 py-5 px-4 bg-zinc-900 dark:bg-zinc-800 text-white dark:text-zinc-100 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-accent hover:text-white transition-all active:scale-95 shadow-md border border-transparent dark:border-zinc-700"
              >
                <i className="fas fa-eye"></i> Visualizar Documento
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Visor de PDF con Capa de Censura Dinámica */}
      {viewingPdf && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in-up">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setViewingPdf(null)}></div>
          <div className="relative w-full max-w-6xl h-full bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl border border-white/10">
            <div className="p-6 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white dark:text-black shadow-lg">
                    <i className="fas fa-user-shield"></i>
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-widest text-[10px]">Visor de Seguridad Iván Rodríguez</h3>
                    {isProtected && <p className="text-[8px] font-black text-accent uppercase tracking-widest mt-0.5">Información Privada Oculta por Sistema de Protección</p>}
                  </div>
               </div>
               <button onClick={() => setViewingPdf(null)} className="w-12 h-12 flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-inner">
                  <i className="fas fa-times text-xl"></i>
               </button>
            </div>
            
            <div className="flex-grow relative bg-zinc-100 dark:bg-zinc-800/50">
               {isProtected && (
                  <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center bg-zinc-900/10 backdrop-blur-[4px]">
                    <div className="bg-zinc-900/90 backdrop-blur-md p-8 rounded-3xl border border-accent/40 shadow-[0_0_60px_rgba(212,175,55,0.2)] text-center">
                       <i className="fas fa-shield-halved text-accent text-4xl mb-4 animate-pulse"></i>
                       <p className="text-white font-black text-[11px] uppercase tracking-[0.3em] mb-2">Seguridad de Datos Activa</p>
                       <p className="text-accent/60 text-[9px] uppercase font-bold max-w-xs mx-auto">Este documento contiene información de identidad que ha sido protegida automáticamente.</p>
                    </div>
                  </div>
               )}
               <iframe 
                src={viewingPdf} 
                className={`w-full h-full border-none transition-all duration-700 ${isProtected ? 'grayscale-[0.4] blur-sm' : ''}`}
                title="Documento de Soporte"
               ></iframe>
            </div>

            <div className="p-4 bg-zinc-50 dark:bg-zinc-950 text-center border-t border-zinc-100 dark:border-zinc-800">
               <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest italic">Documento verificado para fines de hoja de vida laboral</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Supports;


import React, { useState } from 'react';
import { PortfolioData, SupportDoc } from '../types';

const Supports: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const { supports } = data;
  const [viewingPdf, setViewingPdf] = useState<string | null>(null);
  const [isProtected, setIsProtected] = useState(false);

  const openViewer = (support: SupportDoc) => {
    if (support.url && support.url !== "#" && support.url !== "") {
      setViewingPdf(support.url);
      // Si la descripción contiene la palabra "Protección", activamos el filtro visual
      setIsProtected(support.description?.includes("Protección") || false);
    } else {
      alert('Este documento no tiene un archivo cargado actualmente.');
    }
  };

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
          <div key={support.id} className="group p-8 rounded-[2rem] w3-card-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full shadow-lg">
            <div className="mb-6 flex items-center justify-between">
               <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center shadow-inner">
                    <i className="fas fa-file-certificate text-xl opacity-20 group-hover:opacity-100 transition-opacity text-accent"></i>
               </div>
               <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">{support.category}</span>
                  {support.description?.includes("Protección") && (
                    <span className="text-[8px] font-black uppercase text-accent animate-pulse mt-1">
                      <i className="fas fa-shield-alt mr-1"></i> Protegido
                    </span>
                  )}
               </div>
            </div>
            
            <div className="flex-grow">
              <h3 className="font-black text-xl uppercase tracking-tight mb-2 leading-tight group-hover:text-accent transition-colors">
                  {support.title}
              </h3>
              <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-8">
                <i className="fas fa-university mr-2 text-accent opacity-50"></i> {support.emisor || "Institución no especificada"}
              </p>
            </div>
            
            <div className="pt-6 border-t border-zinc-50 dark:border-zinc-800">
              <button 
                onClick={() => openViewer(support)}
                className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-accent hover:text-white transition-all active:scale-95 shadow-lg"
              >
                <i className="fas fa-eye"></i> Visualizar Documento
              </button>
            </div>
          </div>
        ))}

        {supports.length === 0 && (
          <div className="col-span-full text-center py-24 bg-white dark:bg-zinc-900 rounded-[3rem] border-4 border-dashed border-zinc-200 dark:border-zinc-800">
            <i className="fas fa-search text-5xl mb-6 opacity-10 text-accent"></i>
            <p className="font-black text-zinc-400 uppercase tracking-widest text-sm">Sin documentos agregados</p>
          </div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      {viewingPdf && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in-up">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setViewingPdf(null)}></div>
          <div className="relative w-full max-w-6xl h-full bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl border border-white/10">
            <div className="p-6 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white dark:text-black shadow-lg">
                    <i className="fas fa-file-pdf"></i>
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-widest text-[10px]">Visualizador de Documentos Oficiales</h3>
                    {isProtected && (
                      <p className="text-[9px] font-black text-accent uppercase tracking-widest flex items-center gap-2">
                        <i className="fas fa-shield-alt"></i> Privacidad de Datos Activa: ID Oculto
                      </p>
                    )}
                  </div>
               </div>
               <button onClick={() => setViewingPdf(null)} className="w-12 h-12 flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-inner">
                  <i className="fas fa-times text-xl"></i>
               </button>
            </div>
            
            <div className="flex-grow relative bg-zinc-100 dark:bg-zinc-800/50">
               {isProtected && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none text-center">
                    <div className="bg-accent/20 backdrop-blur-md px-8 py-4 rounded-3xl border border-accent/40 shadow-2xl">
                      <p className="text-accent font-black text-[10px] uppercase tracking-[0.2em]">Capa de Privacidad Inteligente</p>
                      <p className="text-[8px] text-accent/60 uppercase font-bold mt-1">Detección de Cédula: 1096240571 - BLURRED</p>
                    </div>
                  </div>
               )}
               
               <div className={`w-full h-full transition-all duration-700 ${isProtected ? 'blur-[3px] scale-[0.99] grayscale-[30%]' : ''}`}>
                  <iframe src={viewingPdf} className="w-full h-full border-none"></iframe>
               </div>
               
               {isProtected && (
                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-6 py-3 bg-zinc-900/90 text-white rounded-2xl border border-accent/30 shadow-2xl flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-accent animate-ping"></div>
                    <span className="text-[9px] font-black uppercase tracking-widest">Este documento está siendo protegido por AI Shield</span>
                 </div>
               )}
            </div>

            <div className="p-4 bg-zinc-50 dark:bg-zinc-950 text-center border-t border-zinc-100 dark:border-zinc-800 flex justify-center gap-10">
               <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Certificado Auténtico</p>
               <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">IVÁN GERARDO RODRÍGUEZ BUSTAMANTE</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Supports;

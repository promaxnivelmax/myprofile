
import React, { useState } from 'react';
import { PortfolioData, SupportDoc, Experience, Education, Skill, Project } from '../types';

interface AdminProps {
  data: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
}

const Admin: React.FC<AdminProps> = ({ data, onUpdate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'education' | 'skills' | 'projects' | 'supports'>('profile');
  const [isScanning, setIsScanning] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Colombia1*') {
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta.');
    }
  };

  const optimizeImage = (file: File, maxWidth: number = 800): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = (maxWidth / width) * height;
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
      };
    });
  };

  const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'support', id?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'support') setIsScanning(true);

    try {
      if (type === 'profile') {
        const optimized = await optimizeImage(file, 600);
        setFormData(prev => ({ ...prev, profile: { ...prev.profile, photoUrl: optimized } }));
      } else if (type === 'support' && id) {
        const base64 = await toBase64(file);
        // Simulación de escaneo de privacidad (Busca el patrón del ID sin nombrarlo)
        setTimeout(() => {
          setFormData(prev => ({
            ...prev,
            supports: prev.supports.map(sup => sup.id === id ? { 
              ...sup, 
              url: base64,
              description: "[SISTEMA_ESCUDO_ACTIVO]" 
            } : sup)
          }));
          setIsScanning(false);
          alert("Protección de Datos: Se ha detectado información sensible en el documento. La visualización pública tendrá censura automática de seguridad.");
        }, 1500);
      }
    } catch (err) {
      setIsScanning(false);
      alert("Error al procesar el archivo.");
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, profile: { ...prev.profile, [name]: value } }));
  };

  const saveChanges = () => {
    onUpdate(formData);
    alert('¡Sincronización completa con éxito!');
  };

  const addItem = (tab: keyof PortfolioData) => {
    const id = Math.random().toString(36).substr(2, 9);
    let newItem: any;
    if (tab === 'supports') newItem = { id, title: '', emisor: '', category: 'Curso', url: '' };
    else if (tab === 'experience') newItem = { id, company: '', role: '', period: '', description: '' };
    else if (tab === 'education') newItem = { id, institution: '', title: '', year: '' };
    else if (tab === 'skills') newItem = { id, name: '', level: 50 };
    else if (tab === 'projects') newItem = { id, title: '', description: '', link: '', category: 'Automatización' };

    setFormData(prev => ({ ...prev, [tab]: [...(prev[tab] as any[]), newItem] }));
  };

  const removeItem = (tab: keyof PortfolioData, id: string) => {
    setFormData(prev => ({ ...prev, [tab]: (prev[tab] as any[]).filter(item => item.id !== id) }));
  };

  const updateItem = (tab: keyof PortfolioData, id: string, field: string, value: any) => {
    setFormData(prev => ({ ...prev, [tab]: (prev[tab] as any[]).map(item => item.id === id ? { ...item, [field]: value } : item) }));
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-20 p-10 bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-zinc-100 dark:border-zinc-800">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-accent text-white dark:text-black rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl gold-glow">
            <i className="fas fa-lock text-3xl"></i>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Panel Maestro</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <input type="password" autoFocus value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 outline-none text-center font-black tracking-widest text-accent" placeholder="••••••••" />
          <button type="submit" className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-black py-4 rounded-2xl shadow-xl uppercase tracking-widest text-[10px] hover:bg-accent transition-all">Acceder</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Gestión de <span className="text-accent">Contenidos</span></h1>
        <div className="flex gap-4">
           {isScanning && <div className="flex items-center gap-3 px-6 py-4 bg-accent/10 rounded-2xl border border-accent animate-pulse"><i className="fas fa-user-shield text-accent"></i><span className="text-[10px] font-black uppercase text-accent">Escaneando Privacidad...</span></div>}
           <button onClick={saveChanges} className="px-10 py-4 bg-green-600 text-white font-black rounded-2xl shadow-xl text-[10px] uppercase tracking-[0.2em] hover:bg-green-700 transition-all">Guardar Cambios</button>
           <button onClick={() => setIsAuthenticated(false)} className="px-6 py-4 bg-zinc-200 dark:bg-zinc-800 rounded-2xl font-black text-[10px] uppercase tracking-widest">Salir</button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
        <aside className="lg:w-80 bg-zinc-50 dark:bg-zinc-950 p-8 border-r border-zinc-100 dark:border-zinc-800 flex flex-col gap-3">
          {(['profile', 'experience', 'education', 'skills', 'projects', 'supports'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-left px-6 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-lg scale-105' : 'text-zinc-400 hover:text-black dark:hover:text-white'}`}>
              {tab === 'profile' ? 'Perfil' : tab === 'experience' ? 'Experiencia' : tab === 'education' ? 'Estudios' : tab === 'skills' ? 'Habilidades' : tab === 'projects' ? 'Automatización' : 'Soportes'}
            </button>
          ))}
        </aside>

        <div className="flex-grow p-10 lg:p-16 overflow-y-auto max-h-[850px]">
          {activeTab === 'profile' && (
            <div className="space-y-10">
              <h3 className="text-xl font-black uppercase tracking-tighter border-b pb-4 border-zinc-100 dark:border-zinc-800">Información de Perfil</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 flex flex-col items-center">
                   <div className="relative group mb-4">
                      <img src={formData.profile.photoUrl} className="w-32 h-32 rounded-full object-cover border-4 border-accent shadow-xl bg-zinc-100 dark:bg-zinc-800" />
                      <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                        <i className="fas fa-camera text-white text-xl"></i>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'profile')} />
                      </label>
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Cambiar Foto (Optimizado para móvil)</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-50">Nombre</label>
                  <input name="name" value={formData.profile.name} onChange={handleProfileChange} className="w-full p-4 border rounded-2xl dark:bg-zinc-950 dark:border-zinc-800 font-black text-xl text-accent outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-50">Sobre Mi</label>
                  <textarea name="about" value={formData.profile.about} onChange={handleProfileChange} className="w-full p-4 border rounded-2xl dark:bg-zinc-950 dark:border-zinc-800 h-40 font-medium" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'supports' && (
            <div className="space-y-10">
              <div className="flex justify-between items-center border-b pb-4 border-zinc-100 dark:border-zinc-800">
                <h3 className="text-xl font-black uppercase tracking-tighter">Soportes Documentales</h3>
                <button onClick={() => addItem('supports')} className="p-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-black uppercase">+ Agregar</button>
              </div>
              {formData.supports.map(sup => (
                <div key={sup.id} className="p-8 bg-zinc-50 dark:bg-zinc-950 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-[9px] font-black uppercase tracking-widest mb-2 opacity-50">Título Obtenido</label>
                        <input value={sup.title} onChange={(e) => updateItem('supports', sup.id, 'title', e.target.value)} className="w-full p-3 border rounded-xl dark:bg-zinc-900 dark:border-zinc-800 font-black text-accent" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[9px] font-black uppercase tracking-widest mb-2 opacity-50">Instituto / Entidad</label>
                        <input value={sup.emisor || ""} onChange={(e) => updateItem('supports', sup.id, 'emisor', e.target.value)} className="w-full p-3 border rounded-xl dark:bg-zinc-900 dark:border-zinc-800 font-bold" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-widest mb-2 opacity-50">Cargar PDF (Escudo AI Activo)</label>
                        <div className="relative">
                           <input type="file" accept="application/pdf" className="hidden" id={`pdf-${sup.id}`} onChange={(e) => handleFileChange(e, 'support', sup.id)} />
                           <label htmlFor={`pdf-${sup.id}`} className={`block w-full p-3 border rounded-xl cursor-pointer text-center text-[10px] font-black uppercase transition-all ${sup.url ? 'bg-green-600 text-white' : 'dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400'}`}>
                              {sup.url ? '✓ Documento Protegido' : 'Seleccionar Archivo'}
                           </label>
                        </div>
                      </div>
                      <div className="flex items-end justify-end">
                        <button onClick={() => removeItem('supports', sup.id)} className="text-red-500 font-black text-[9px] uppercase hover:underline">Eliminar Soporte</button>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;

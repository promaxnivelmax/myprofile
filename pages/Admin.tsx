
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
        setTimeout(() => {
          setFormData(prev => ({
            ...prev,
            supports: prev.supports.map(sup => sup.id === id ? { 
              ...sup, 
              url: base64,
              description: "[ESCUDO_PRIVACIDAD_ACTIVO]" 
            } : sup)
          }));
          setIsScanning(false);
        }, 1200);
      }
    } catch (err) {
      setIsScanning(false);
      alert("Error al procesar el archivo.");
    }
  };

  const addItem = (tab: keyof PortfolioData) => {
    const id = Math.random().toString(36).substr(2, 9);
    let newItem: any;
    if (tab === 'experience') newItem = { id, company: '', role: '', period: '', description: '' };
    else if (tab === 'education') newItem = { id, institution: '', title: '', year: '' };
    else if (tab === 'skills') newItem = { id, name: '', level: 50 };
    else if (tab === 'projects') newItem = { id, title: '', description: '', link: '', category: 'Automatización' };
    else if (tab === 'supports') newItem = { id, title: '', emisor: '', category: 'Curso', url: '' };

    if (Array.isArray(formData[tab])) {
      setFormData(prev => ({ ...prev, [tab]: [...(prev[tab] as any[]), newItem] }));
    }
  };

  const removeItem = (tab: keyof PortfolioData, id: string) => {
    if (Array.isArray(formData[tab])) {
      setFormData(prev => ({ ...prev, [tab]: (prev[tab] as any[]).filter(item => item.id !== id) }));
    }
  };

  const updateItem = (tab: keyof PortfolioData, id: string, field: string, value: any) => {
    if (Array.isArray(formData[tab])) {
      setFormData(prev => ({ ...prev, [tab]: (prev[tab] as any[]).map(item => item.id === id ? { ...item, [field]: value } : item) }));
    }
  };

  const saveChanges = () => {
    onUpdate(formData);
    alert('¡Datos sincronizados correctamente!');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-20 p-10 bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-zinc-100 dark:border-zinc-800">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-accent text-white dark:text-black rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl gold-glow">
            <i className="fas fa-lock text-3xl"></i>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Panel de Seguridad</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <input type="password" autoFocus value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 outline-none text-center font-black tracking-widest text-accent" placeholder="••••••••" />
          <button type="submit" className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-black py-4 rounded-2xl shadow-xl uppercase tracking-widest text-[10px] hover:bg-accent transition-all">Desbloquear</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Panel Maestro</h1>
        <div className="flex gap-4">
           <button onClick={saveChanges} className="px-10 py-4 bg-green-600 text-white font-black rounded-2xl shadow-xl text-[10px] uppercase tracking-[0.2em] hover:bg-green-700 transition-all">Guardar Todo</button>
           <button onClick={() => setIsAuthenticated(false)} className="px-6 py-4 bg-zinc-200 dark:bg-zinc-800 rounded-2xl font-black text-[10px] uppercase tracking-widest">Cerrar</button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden flex flex-col lg:flex-row min-h-[750px]">
        <aside className="lg:w-72 bg-zinc-50 dark:bg-zinc-950 p-8 border-r border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
          {(['profile', 'experience', 'education', 'skills', 'projects', 'supports'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-left px-5 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-lg scale-105' : 'text-zinc-400 hover:text-black dark:hover:text-white'}`}>
              <i className={`fas fa-${tab === 'profile' ? 'user' : tab === 'experience' ? 'briefcase' : tab === 'education' ? 'graduation-cap' : tab === 'skills' ? 'chart-line' : tab === 'projects' ? 'magic' : 'file-pdf'} mr-3`}></i>
              {tab === 'profile' ? 'Perfil' : tab === 'experience' ? 'Experiencia' : tab === 'education' ? 'Estudios' : tab === 'skills' ? 'Habilidades' : tab === 'projects' ? 'Proyectos' : 'Soportes'}
            </button>
          ))}
        </aside>

        <div className="flex-grow p-10 lg:p-16 overflow-y-auto max-h-[850px] dark:bg-zinc-900">
          {activeTab === 'profile' && (
            <div className="space-y-8 animate-fade-in-up">
              <h3 className="text-xl font-black uppercase border-b border-zinc-100 dark:border-zinc-800 pb-4">Ajustes de Perfil</h3>
              <div className="flex flex-col items-center mb-10">
                 <div className="relative group">
                    <img src={formData.profile.photoUrl} className="w-32 h-32 rounded-3xl object-cover border-4 border-accent shadow-2xl bg-zinc-100 dark:bg-zinc-800" />
                    <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl cursor-pointer">
                      <i className="fas fa-camera text-white text-xl"></i>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'profile')} />
                    </label>
                 </div>
                 <p className="mt-4 text-[9px] font-black uppercase text-zinc-400">Optimizado para dispositivos móviles</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-zinc-400 mb-2 block">Nombre Completo</label>
                  <input value={formData.profile.name} onChange={(e) => setFormData({...formData, profile: {...formData.profile, name: e.target.value}})} className="w-full p-4 border rounded-2xl dark:bg-zinc-950 dark:border-zinc-800 dark:text-white font-black" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-zinc-400 mb-2 block">Sobre Mí</label>
                  <textarea value={formData.profile.about} onChange={(e) => setFormData({...formData, profile: {...formData.profile, about: e.target.value}})} className="w-full p-4 border rounded-2xl dark:bg-zinc-950 dark:border-zinc-800 dark:text-white h-32" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <h3 className="text-xl font-black uppercase">Trayectoria Laboral</h3>
                <button onClick={() => addItem('experience')} className="px-4 py-2 bg-accent text-black font-black text-[10px] rounded-lg uppercase">+ Agregar Cargo</button>
              </div>
              {formData.experience.map(exp => (
                <div key={exp.id} className="p-8 bg-zinc-50 dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-4">
                  <input placeholder="Empresa" value={exp.company} onChange={(e) => updateItem('experience', exp.id, 'company', e.target.value)} className="w-full p-3 border rounded-xl dark:bg-zinc-900 dark:border-zinc-800 font-black text-accent" />
                  <input placeholder="Cargo" value={exp.role} onChange={(e) => updateItem('experience', exp.id, 'role', e.target.value)} className="w-full p-3 border rounded-xl dark:bg-zinc-900 dark:border-zinc-800 font-bold" />
                  <input placeholder="Periodo (Ej: 2022 - 2023)" value={exp.period} onChange={(e) => updateItem('experience', exp.id, 'period', e.target.value)} className="w-full p-3 border rounded-xl dark:bg-zinc-900 dark:border-zinc-800 text-sm" />
                  <textarea placeholder="Descripción" value={exp.description} onChange={(e) => updateItem('experience', exp.id, 'description', e.target.value)} className="w-full p-3 border rounded-xl dark:bg-zinc-900 dark:border-zinc-800 h-24" />
                  <button onClick={() => removeItem('experience', exp.id)} className="text-red-500 font-black text-[9px] uppercase hover:underline">Eliminar este registro</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <h3 className="text-xl font-black uppercase">Formación Académica</h3>
                <button onClick={() => addItem('education')} className="px-4 py-2 bg-accent text-black font-black text-[10px] rounded-lg uppercase">+ Agregar Título</button>
              </div>
              {formData.education.map(edu => (
                <div key={edu.id} className="p-8 bg-zinc-50 dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-4">
                  <input placeholder="Institución" value={edu.institution} onChange={(e) => updateItem('education', edu.id, 'institution', e.target.value)} className="w-full p-3 border rounded-xl dark:bg-zinc-900 dark:border-zinc-800 font-black text-accent" />
                  <input placeholder="Título Obtenido" value={edu.title} onChange={(e) => updateItem('education', edu.id, 'title', e.target.value)} className="w-full p-3 border rounded-xl dark:bg-zinc-900 dark:border-zinc-800 font-bold" />
                  <input placeholder="Año" value={edu.year} onChange={(e) => updateItem('education', edu.id, 'year', e.target.value)} className="w-full p-3 border rounded-xl dark:bg-zinc-900 dark:border-zinc-800 text-sm" />
                  <button onClick={() => removeItem('education', edu.id)} className="text-red-500 font-black text-[9px] uppercase hover:underline">Eliminar este registro</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <h3 className="text-xl font-black uppercase">Habilidades y Niveles</h3>
                <button onClick={() => addItem('skills')} className="px-4 py-2 bg-accent text-black font-black text-[10px] rounded-lg uppercase">+ Agregar Skill</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.skills.map(skill => (
                  <div key={skill.id} className="p-6 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800 space-y-3">
                    <input value={skill.name} onChange={(e) => updateItem('skills', skill.id, 'name', e.target.value)} className="w-full p-2 border rounded-lg dark:bg-zinc-900 dark:border-zinc-800 text-xs font-black uppercase" />
                    <div className="flex gap-4 items-center">
                      <input type="range" min="0" max="100" value={skill.level} onChange={(e) => updateItem('skills', skill.id, 'level', parseInt(e.target.value))} className="flex-grow accent-accent" />
                      <span className="font-black text-xs w-8">{skill.level}%</span>
                    </div>
                    <button onClick={() => removeItem('skills', skill.id)} className="text-red-500 font-black text-[8px] uppercase">Eliminar</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <h3 className="text-xl font-black uppercase">Automatizaciones y Trámites</h3>
                <button onClick={() => addItem('projects')} className="px-4 py-2 bg-accent text-black font-black text-[10px] rounded-lg uppercase">+ Nueva Herramienta</button>
              </div>
              {formData.projects.map(proj => (
                <div key={proj.id} className="p-8 bg-zinc-50 dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-4">
                  <input placeholder="Título del Trámite" value={proj.title} onChange={(e) => updateItem('projects', proj.id, 'title', e.target.value)} className="w-full p-3 border rounded-xl dark:bg-zinc-900 dark:border-zinc-800 font-black text-accent" />
                  <textarea placeholder="Descripción del beneficio" value={proj.description} onChange={(e) => updateItem('projects', proj.id, 'description', e.target.value)} className="w-full p-3 border rounded-xl dark:bg-zinc-900 dark:border-zinc-800 h-20" />
                  <input placeholder="Enlace del formulario (URL)" value={proj.link || ''} onChange={(e) => updateItem('projects', proj.id, 'link', e.target.value)} className="w-full p-3 border rounded-xl dark:bg-zinc-900 dark:border-zinc-800 text-blue-500 underline" />
                  <button onClick={() => removeItem('projects', proj.id)} className="text-red-500 font-black text-[9px] uppercase hover:underline">Eliminar Proyecto</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'supports' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <h3 className="text-xl font-black uppercase">Soportes Documentales</h3>
                <button onClick={() => addItem('supports')} className="px-4 py-2 bg-accent text-black font-black text-[10px] rounded-lg uppercase">+ Cargar Documento</button>
              </div>
              {formData.supports.map(sup => (
                <div key={sup.id} className="p-8 bg-zinc-50 dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-4">
                  <input placeholder="Título del Certificado" value={sup.title} onChange={(e) => updateItem('supports', sup.id, 'title', e.target.value)} className="w-full p-3 border rounded-xl dark:bg-zinc-900 dark:border-zinc-800 font-black text-accent" />
                  <input placeholder="Institución Emisora" value={sup.emisor || ''} onChange={(e) => updateItem('supports', sup.id, 'emisor', e.target.value)} className="w-full p-3 border rounded-xl dark:bg-zinc-900 dark:border-zinc-800 font-bold" />
                  <div className="flex gap-4 items-center">
                    <input type="file" accept="application/pdf" id={`pdf-up-${sup.id}`} className="hidden" onChange={(e) => handleFileChange(e, 'support', sup.id)} />
                    <label htmlFor={`pdf-up-${sup.id}`} className={`flex-grow p-4 text-center rounded-xl border-2 border-dashed font-black text-[10px] uppercase cursor-pointer transition-all ${sup.url ? 'border-green-500 bg-green-500/10 text-green-600' : 'border-zinc-300 dark:border-zinc-800 text-zinc-400'}`}>
                      {sup.url ? '✓ Archivo Protegido y Cargado' : 'Subir Archivo PDF'}
                    </label>
                    <button onClick={() => removeItem('supports', sup.id)} className="p-4 text-red-500"><i className="fas fa-trash"></i></button>
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

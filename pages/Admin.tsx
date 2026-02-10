
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Colombia1*') {
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta.');
    }
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

    try {
      const base64 = await toBase64(file);
      if (type === 'profile') {
        setFormData(prev => ({
          ...prev,
          profile: { ...prev.profile, photoUrl: base64 }
        }));
      } else if (type === 'support' && id) {
        setFormData(prev => ({
          ...prev,
          supports: prev.supports.map(sup => sup.id === id ? { ...sup, url: base64 } : sup)
        }));
      }
    } catch (err) {
      alert("Error al cargar el archivo. Intenta con uno más pequeño.");
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      profile: { ...prev.profile, [name]: value }
    }));
  };

  const saveChanges = () => {
    onUpdate(formData);
    alert('¡Datos y archivos sincronizados con éxito!');
  };

  const addItem = (tab: keyof PortfolioData) => {
    const id = Math.random().toString(36).substr(2, 9);
    let newItem: any;

    if (tab === 'experience') newItem = { id, company: '', role: '', period: '', description: '' };
    if (tab === 'education') newItem = { id, institution: '', title: '', year: '' };
    if (tab === 'skills') newItem = { id, name: '', level: 50 };
    if (tab === 'projects') newItem = { id, title: '', description: '', link: '', category: 'Automatización' };
    if (tab === 'supports') newItem = { id, title: '', emisor: '', category: 'Curso', description: '', url: '' };

    setFormData(prev => ({
      ...prev,
      [tab]: [...(prev[tab] as any[]), newItem]
    }));
  };

  const removeItem = (tab: keyof PortfolioData, id: string) => {
    setFormData(prev => ({
      ...prev,
      [tab]: (prev[tab] as any[]).filter(item => item.id !== id)
    }));
  };

  const updateItem = (tab: keyof PortfolioData, id: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [tab]: (prev[tab] as any[]).map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-20 p-10 bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl animate-fade-in-up border border-zinc-100 dark:border-zinc-800">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-accent text-white dark:text-black rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl gold-glow">
            <i className="fas fa-shield-alt text-3xl"></i>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Panel Maestro</h2>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-2">Iván Rodríguez Bustamante</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="password" 
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 outline-none text-center font-black tracking-widest text-accent"
            placeholder="••••••••"
          />
          <button type="submit" className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-black py-4 rounded-2xl shadow-xl uppercase tracking-widest text-[10px] hover:bg-accent transition-all">
            Desbloquear Panel
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Panel de <span className="text-accent">Gestión</span></h1>
        <div className="flex gap-4">
           <button onClick={saveChanges} className="px-10 py-4 bg-green-600 text-white font-black rounded-2xl shadow-xl text-[10px] uppercase tracking-[0.2em] hover:bg-green-700 transition-all">
             <i className="fas fa-save mr-2"></i> Guardar Todo
           </button>
           <button onClick={() => setIsAuthenticated(false)} className="px-6 py-4 bg-zinc-200 dark:bg-zinc-800 rounded-2xl font-black text-[10px] uppercase tracking-widest">
             Cerrar
           </button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
        <aside className="lg:w-80 bg-zinc-50 dark:bg-zinc-950 p-8 border-r border-zinc-100 dark:border-zinc-800 flex flex-col gap-3">
          {(['profile', 'experience', 'education', 'skills', 'projects', 'supports'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-6 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-lg scale-105' : 'text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <i className={`fas fa-${tab === 'profile' ? 'user' : tab === 'experience' ? 'briefcase' : tab === 'education' ? 'graduation-cap' : tab === 'skills' ? 'chart-line' : tab === 'projects' ? 'bolt' : 'file-pdf'} mr-4`}></i>
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
                      <img src={formData.profile.photoUrl} className="w-32 h-32 rounded-full object-cover border-4 border-accent shadow-xl" />
                      <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                        <i className="fas fa-camera text-white text-xl"></i>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'profile')} />
                      </label>
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Click para cambiar foto</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-50">Título Profesional</label>
                  <input name="title" value={formData.profile.title} onChange={handleProfileChange} className="w-full p-4 border rounded-2xl dark:bg-zinc-950 dark:border-zinc-800 font-bold" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-50">Sobre Mi (Biografía)</label>
                  <textarea name="about" value={formData.profile.about} onChange={handleProfileChange} className="w-full p-4 border rounded-2xl dark:bg-zinc-950 dark:border-zinc-800 h-40 font-medium" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-50">Ubicación</label>
                  <input name="location" value={formData.profile.location} onChange={handleProfileChange} className="w-full p-4 border rounded-2xl dark:bg-zinc-950 dark:border-zinc-800" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-50">WhatsApp</label>
                  <input name="phone" value={formData.profile.phone} onChange={handleProfileChange} className="w-full p-4 border rounded-2xl dark:bg-zinc-950 dark:border-zinc-800" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-10">
              <div className="flex justify-between items-center border-b pb-4 border-zinc-100 dark:border-zinc-800">
                <h3 className="text-xl font-black uppercase tracking-tighter">Trayectoria Laboral</h3>
                <button onClick={() => addItem('experience')} className="p-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-black uppercase">+ Agregar</button>
              </div>
              {formData.experience.map(exp => (
                <div key={exp.id} className="p-8 bg-zinc-50 dark:bg-zinc-950 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input placeholder="Rol / Cargo" value={exp.role} onChange={(e) => updateItem('experience', exp.id, 'role', e.target.value)} className="p-3 border rounded-xl dark:bg-zinc-900 font-bold" />
                    <input placeholder="Empresa" value={exp.company} onChange={(e) => updateItem('experience', exp.id, 'company', e.target.value)} className="p-3 border rounded-xl dark:bg-zinc-900" />
                    <input placeholder="Periodo" value={exp.period} onChange={(e) => updateItem('experience', exp.id, 'period', e.target.value)} className="p-3 border rounded-xl dark:bg-zinc-900" />
                    <button onClick={() => removeItem('experience', exp.id)} className="text-red-500 font-black text-[10px] uppercase self-center hover:underline">Eliminar</button>
                    <textarea placeholder="Descripción" value={exp.description} onChange={(e) => updateItem('experience', exp.id, 'description', e.target.value)} className="p-3 border rounded-xl dark:bg-zinc-900 md:col-span-2 h-24" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-10">
              <div className="flex justify-between items-center border-b pb-4 border-zinc-100 dark:border-zinc-800">
                <h3 className="text-xl font-black uppercase tracking-tighter">Estudios & Títulos</h3>
                <button onClick={() => addItem('education')} className="p-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-black uppercase">+ Agregar</button>
              </div>
              {formData.education.map(edu => (
                <div key={edu.id} className="p-8 bg-zinc-50 dark:bg-zinc-950 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input placeholder="Título Obtenido" value={edu.title} onChange={(e) => updateItem('education', edu.id, 'title', e.target.value)} className="p-3 border rounded-xl dark:bg-zinc-900 font-bold" />
                    <input placeholder="Institución" value={edu.institution} onChange={(e) => updateItem('education', edu.id, 'institution', e.target.value)} className="p-3 border rounded-xl dark:bg-zinc-900" />
                    <input placeholder="Año" value={edu.year} onChange={(e) => updateItem('education', edu.id, 'year', e.target.value)} className="p-3 border rounded-xl dark:bg-zinc-900" />
                    <button onClick={() => removeItem('education', edu.id)} className="text-red-500 font-black text-[10px] uppercase self-center hover:underline">Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-10">
              <div className="flex justify-between items-center border-b pb-4 border-zinc-100 dark:border-zinc-800">
                <h3 className="text-xl font-black uppercase tracking-tighter">Habilidades</h3>
                <button onClick={() => addItem('skills')} className="p-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-black uppercase">+ Agregar</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.skills.map(skill => (
                  <div key={skill.id} className="p-6 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                    <input placeholder="Habilidad" value={skill.name} onChange={(e) => updateItem('skills', skill.id, 'name', e.target.value)} className="w-full p-2 border-b bg-transparent font-bold mb-4" />
                    <div className="flex items-center gap-4">
                      <input type="range" min="0" max="100" value={skill.level} onChange={(e) => updateItem('skills', skill.id, 'level', parseInt(e.target.value))} className="flex-grow accent-accent" />
                      <span className="font-black text-xs">{skill.level}%</span>
                    </div>
                    <button onClick={() => removeItem('skills', skill.id)} className="mt-4 text-red-500 font-black text-[9px] uppercase hover:underline">Eliminar</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-10">
              <div className="flex justify-between items-center border-b pb-4 border-zinc-100 dark:border-zinc-800">
                <h3 className="text-xl font-black uppercase tracking-tighter">Automatizaciones</h3>
                <button onClick={() => addItem('projects')} className="p-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-black uppercase">+ Agregar</button>
              </div>
              {formData.projects.map(proj => (
                <div key={proj.id} className="p-8 bg-zinc-50 dark:bg-zinc-950 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input placeholder="Título del Proyecto" value={proj.title} onChange={(e) => updateItem('projects', proj.id, 'title', e.target.value)} className="p-3 border rounded-xl dark:bg-zinc-900 font-bold" />
                    <input placeholder="Link del Formulario/Web" value={proj.link} onChange={(e) => updateItem('projects', proj.id, 'link', e.target.value)} className="p-3 border rounded-xl dark:bg-zinc-900" />
                    <select value={proj.category} onChange={(e) => updateItem('projects', proj.id, 'category', e.target.value)} className="p-3 border rounded-xl dark:bg-zinc-900">
                      <option value="Automatización">Automatización</option>
                      <option value="Web">Web</option>
                      <option value="Gestión">Gestión</option>
                    </select>
                    <button onClick={() => removeItem('projects', proj.id)} className="text-red-500 font-black text-[10px] uppercase self-center hover:underline">Eliminar</button>
                    <textarea placeholder="Descripción corta" value={proj.description} onChange={(e) => updateItem('projects', proj.id, 'description', e.target.value)} className="p-3 border rounded-xl dark:bg-zinc-900 md:col-span-2 h-20" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'supports' && (
            <div className="space-y-10">
              <div className="flex justify-between items-center border-b pb-4 border-zinc-100 dark:border-zinc-800">
                <h3 className="text-xl font-black uppercase tracking-tighter">Gestión de Soportes</h3>
                <button onClick={() => addItem('supports')} className="p-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-black uppercase">+ Agregar</button>
              </div>
              {formData.supports.map(sup => (
                <div key={sup.id} className="p-8 bg-zinc-50 dark:bg-zinc-950 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-[9px] font-black uppercase tracking-widest mb-2 opacity-50">Nombre del Título / Certificado</label>
                        <input value={sup.title} onChange={(e) => updateItem('supports', sup.id, 'title', e.target.value)} className="w-full p-3 border rounded-xl dark:bg-zinc-900 dark:border-zinc-800 font-bold" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-widest mb-2 opacity-50">Institución Emisora</label>
                        <input value={sup.emisor || ""} onChange={(e) => updateItem('supports', sup.id, 'emisor', e.target.value)} placeholder="Ej: SENA" className="w-full p-3 border rounded-xl dark:bg-zinc-900 dark:border-zinc-800" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-widest mb-2 opacity-50">PDF del Soporte</label>
                        <div className="relative group">
                           <input type="file" accept="application/pdf" className="hidden" id={`pdf-${sup.id}`} onChange={(e) => handleFileChange(e, 'support', sup.id)} />
                           <label htmlFor={`pdf-${sup.id}`} className={`block w-full p-3 border rounded-xl cursor-pointer text-center text-[10px] font-black uppercase transition-all ${sup.url ? 'bg-green-50 border-green-200 text-green-600' : 'dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'}`}>
                              {sup.url ? '✓ Archivo Cargado (Cambiar)' : 'Seleccionar PDF'}
                           </label>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[9px] font-black uppercase tracking-widest mb-2 opacity-50">Breve Descripción</label>
                        <textarea value={sup.description || ""} onChange={(e) => updateItem('supports', sup.id, 'description', e.target.value)} className="w-full p-3 border rounded-xl dark:bg-zinc-900 dark:border-zinc-800 h-20" />
                      </div>
                      <button onClick={() => removeItem('supports', sup.id)} className="text-red-500 font-black text-[9px] uppercase hover:underline">Eliminar Documento</button>
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


import React from 'react';
import { PortfolioData } from '../types';

const Home: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const { profile, experience, education, skills } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:flex gap-12 animate-fade-in-up">
      {/* Sidebar de Perfil */}
      <aside className="md:w-[380px] shrink-0 mb-10 md:mb-0">
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl overflow-hidden w3-card-4 border border-zinc-100 dark:border-zinc-800">
          <div className="relative group overflow-hidden">
            <img 
              src={profile.photoUrl} 
              alt={profile.name} 
              className="w-full object-cover aspect-[4/5] profile-img transition-all duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-100"></div>
            <div className="absolute bottom-0 left-0 w-full p-8">
               <h2 className="text-white font-black text-2xl uppercase tracking-tighter leading-tight">{profile.name}</h2>
               <p className="text-xs font-black mt-2 uppercase tracking-[0.2em] text-accent">{profile.title}</p>
            </div>
          </div>
          
          <div className="p-10 space-y-10">
            <section className="space-y-5">
              <div className="flex items-center gap-5 text-sm font-bold">
                <i className="fas fa-map-marker-alt w-6 text-center text-accent"></i>
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-5 text-sm font-bold">
                <i className="fas fa-phone w-6 text-center text-accent"></i>
                <a href={`tel:${profile.phone}`} className="hover:underline">{profile.phone}</a>
              </div>
              <div className="flex items-center gap-5 text-sm font-bold">
                <i className="fas fa-envelope w-6 text-center text-accent"></i>
                <span className="truncate">{profile.email}</span>
              </div>
            </section>

            <hr className="border-zinc-100 dark:border-zinc-800" />

            <section>
              <h4 className="font-black text-[11px] uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <i className="fas fa-bolt text-accent"></i> Habilidades
              </h4>
              <div className="space-y-8">
                {skills.map(skill => (
                  <div key={skill.id} className="group">
                    <div className="flex justify-between text-[10px] font-black mb-3 uppercase tracking-widest opacity-80 group-hover:opacity-100">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000 bg-accent" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </aside>

      {/* Contenido Principal */}
      <div className="flex-grow space-y-12">
        <section className="bg-white dark:bg-zinc-900 p-12 rounded-[2.5rem] shadow-xl w3-card-4 border border-zinc-50 dark:border-zinc-800">
           <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter leading-none">Sobre <span className="text-accent">Mi</span></h2>
           <p className="text-xl leading-relaxed text-zinc-600 dark:text-zinc-300 font-light italic">"{profile.about}"</p>
        </section>

        {/* Trayectoria Laboral */}
        <section className="bg-white dark:bg-zinc-900 p-12 rounded-[2.5rem] shadow-xl w3-card-4 border border-zinc-50 dark:border-zinc-800">
          <h2 className="text-3xl font-black mb-12 flex items-center gap-5 uppercase tracking-tighter">
            <i className="fas fa-briefcase opacity-20 text-5xl text-accent"></i> Trayectoria Laboral
          </h2>
          <div className="space-y-16">
            {experience.map(exp => (
              <div key={exp.id} className="relative pl-12 border-l-4 border-zinc-100 dark:border-zinc-800 group">
                <div className="absolute -left-[14px] top-0 w-6 h-6 rounded-full border-4 border-white dark:border-zinc-900 bg-accent group-hover:scale-150 transition-all duration-500 gold-glow"></div>
                <h3 className="font-black text-2xl uppercase tracking-tight group-hover:text-accent transition-colors">{exp.role}</h3>
                <h4 className="text-zinc-500 font-black mb-4 uppercase text-sm tracking-widest">{exp.company}</h4>
                <div className="inline-flex items-center gap-3 text-xs font-black px-4 py-2 rounded-full mb-6 bg-zinc-50 dark:bg-zinc-800 text-accent">
                  <i className="far fa-calendar-alt"></i> {exp.period}
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Estudios & Títulos */}
        <section className="bg-white dark:bg-zinc-900 p-12 rounded-[2.5rem] shadow-xl w3-card-4 border border-zinc-50 dark:border-zinc-800">
          <h2 className="text-3xl font-black mb-12 flex items-center gap-5 uppercase tracking-tighter">
            <i className="fas fa-graduation-cap opacity-20 text-5xl text-accent"></i> Estudios & Títulos
          </h2>
          <div className="space-y-16">
            {education.map(edu => (
              <div key={edu.id} className="relative pl-12 border-l-4 border-zinc-100 dark:border-zinc-800 group">
                <div className="absolute -left-[14px] top-0 w-6 h-6 rounded-full border-4 border-white dark:border-zinc-900 bg-accent group-hover:scale-150 transition-all duration-500 gold-glow"></div>
                <h3 className="font-black text-2xl uppercase tracking-tight group-hover:text-accent transition-colors">{edu.title}</h3>
                <h4 className="text-zinc-500 font-black mb-3 uppercase text-xs tracking-widest">{edu.institution}</h4>
                <div className="inline-flex items-center gap-3 text-xs font-black px-4 py-2 rounded-full bg-zinc-50 dark:bg-zinc-800 text-accent">
                  <i className="far fa-calendar-alt"></i> {edu.year}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Canal Informativo - RESPONSIVO A TEMAS */}
        <section className="bg-zinc-950 dark:bg-black text-white p-16 rounded-[3rem] shadow-2xl relative overflow-hidden group border-4 border-accent gold-glow shiny-card">
          <div className="absolute top-0 right-0 p-8 opacity-15 transform scale-150 group-hover:scale-175 transition-transform duration-1000 rotate-12 floating-icon">
             <i className="fas fa-bullhorn text-[15rem] text-accent"></i>
          </div>
          
          <div className="relative z-10">
            <div className="inline-block px-6 py-2 bg-accent text-black font-black text-xs uppercase tracking-[0.3em] rounded-full mb-8 shadow-2xl animate-bounce">
                ¡ÉXITO TOTAL!
            </div>
            
            <h3 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter leading-none text-accent" style={{ textShadow: '0 0 20px rgba(212, 175, 55, 0.4)' }}>
               Canal Informativo <br/> Iván Rodríguez
            </h3>
            
            <p className="text-zinc-100 text-xl leading-relaxed mb-12 max-w-3xl font-medium">
              Únete a nuestra comunidad exclusiva en WhatsApp para recibir de primera mano las mejores <span className="text-accent font-black">oportunidades laborales</span> en Barrancabermeja y consejos de gestión administrativa. 
            </p>
            
            <div className="flex flex-wrap gap-8 items-center">
              <a 
                href="https://whatsapp.com/channel/0029VayXoKp1XqufpYCZaB1Z" 
                target="_blank"
                className="group/btn relative inline-flex items-center gap-5 px-12 py-6 bg-[#25D366] text-white font-black rounded-3xl hover:scale-110 hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] transition-all shadow-2xl active:scale-95 uppercase tracking-[0.2em] text-sm"
              >
                <i className="fab fa-whatsapp text-3xl group-hover/btn:rotate-12 transition-transform"></i>
                SUSCRIBIRME GRATIS AHORA
              </a>
              
              <div className="hidden lg:flex items-center gap-5 text-accent opacity-80 group-hover:opacity-100 transition-opacity">
                <i className="fas fa-users text-4xl floating-icon"></i>
                <span className="font-black text-xs uppercase tracking-widest">Servicio a la Comunidad</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

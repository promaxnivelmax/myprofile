
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { INITIAL_DATA } from './constants';
import { PortfolioData } from './types';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Supports from './pages/Supports';
import Admin from './pages/Admin';

const Navbar = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Perfil', path: '/' },
    { name: 'Automatizaciones', path: '/portfolio' },
    { name: 'Soportes', path: '/supports' },
    { name: 'Admin', path: '/admin' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 font-black tracking-tighter text-2xl group">
              IVAN <span className="text-accent transition-colors duration-300">RODRIGUEZ</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[11px] font-black uppercase tracking-widest transition-all hover:scale-105 ${
                    location.pathname === link.path 
                    ? 'text-accent border-b-2 border-accent' 
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button 
                onClick={toggleTheme}
                className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-accent hover:scale-110 transition-all shadow-inner border border-zinc-200 dark:border-zinc-800"
              >
                {theme === 'dark' ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
              </button>
            </div>
          </div>
          <div className="md:hidden flex items-center gap-4">
             <button onClick={toggleTheme} className="p-2.5 bg-zinc-100 dark:bg-zinc-900 rounded-xl text-accent">
                {theme === 'dark' ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
             </button>
             <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-zinc-600 dark:text-zinc-400">
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden animate-fade-in-up bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
          <div className="px-6 py-8 space-y-4">
            {links.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className={`block text-sm font-black uppercase tracking-widest ${location.pathname === link.path ? 'text-accent' : 'text-zinc-500'}`}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('cv_data');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem('cv_data', JSON.stringify(newData));
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/portfolio" element={<Portfolio data={data} />} />
            <Route path="/supports" element={<Supports data={data} />} />
            <Route path="/admin" element={<Admin data={data} onUpdate={updateData} />} />
          </Routes>
        </main>
        
        <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 py-12 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="mb-10">
              <h2 className="text-2xl font-black uppercase tracking-tighter">
                Ivan <span className="text-accent">Rodriguez</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 italic text-base max-w-lg mx-auto mt-2">
                "Barrancabermeja, tierra hija del sol, cuna de sueños y motor de progreso."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 flex justify-between items-center px-8 shadow-sm hover:shadow-xl transition-all">
                 <div className="text-left">
                   <p className="font-black text-xs uppercase tracking-widest text-accent">Trámites y Servicios La 52</p>
                   <p className="text-sm font-bold mt-2 text-zinc-700 dark:text-zinc-300">Cll 52 A No. 34 H 101 L-1 Primero de Mayo</p>
                 </div>
                 <a href="https://wa.me/3052319414?text=Hola%20Iván,%20vengo%20de%20tu%20web%20para%20consultar%20servicios%20en%20La%2052" target="_blank" className="text-[#25D366] hover:scale-125 transition-transform drop-shadow-xl">
                   <i className="fab fa-whatsapp text-4xl"></i>
                 </a>
              </div>
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 flex justify-between items-center px-8 shadow-sm hover:shadow-xl transition-all">
                 <div className="text-left">
                   <p className="font-black text-xs uppercase tracking-widest text-accent">Trámites y Servicios Laura</p>
                   <p className="text-sm font-bold mt-2 text-zinc-700 dark:text-zinc-300">Calle 51 No. 5 - 15 Sector Comercial</p>
                 </div>
                 <a href="https://wa.me/3123377832?text=Hola%20Iván,%20vengo%20de%20tu%20web%20para%20consultar%20servicios%20en%20Laura" target="_blank" className="text-[#25D366] hover:scale-125 transition-transform drop-shadow-xl">
                   <i className="fab fa-whatsapp text-4xl"></i>
                 </a>
              </div>
            </div>

            <p className="text-zinc-400 dark:text-zinc-600 text-[11px] font-black uppercase tracking-[0.3em] opacity-80">
              © {new Date().getFullYear()} IVÁN GERARDO RODRÍGUEZ BUSTAMANTE.
            </p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;

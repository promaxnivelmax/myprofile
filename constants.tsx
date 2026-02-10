
import { PortfolioData } from './types';

export const INITIAL_DATA: PortfolioData = {
  profile: {
    name: "IVÁN GERARDO RODRÍGUEZ BUSTAMANTE",
    title: "Productor Multimedia - Gestor - Administrativo",
    about: "Profesional con amplia experiencia en manejo de herramientas de oficina y desarrollo tecnológico. Me especializo en la gestión administrativa eficiente, automatización de procesos documentales y apoyo logístico institucional. Mi enfoque combina el rigor administrativo con la innovación digital para optimizar el servicio ciudadano y la productividad organizacional.",
    location: "Barrancabermeja, Santander",
    email: "ivan.rodriguezbu@gmail.com",
    phone: "3052319414", 
    photoUrl: "https://lh3.googleusercontent.com/d/1TrpAhBtvltnjmYTUtMc59AECn5KhLJZi",
    accentColor: "#D4AF37" // Metallic Gold
  },
  experience: [
    {
      id: "1",
      company: "TRAMITES Y SERVICIOS LAURA",
      role: "Tecnólogo en Producción Multimedia",
      period: "05 de mayo de 2023 - 05 de noviembre de 2023",
      description: "Realización de encuestas, gestión de contenidos para redes sociales, elaboración de informes y herramientas de edición de video para promoción de servicios."
    },
    {
      id: "2",
      company: "INSTITUTO INDERBA",
      role: "Apoyo Logístico",
      period: "27 de septiembre de 2022 - 26 de diciembre de 2022",
      description: "Prestación de servicios de apoyo a la gestión para acompañamiento logístico en diferentes eventos deportivos y recreativos."
    },
    {
      id: "3",
      company: "ALCALDÍA DE BARRANCABERMEJA",
      role: "Auxiliar Administrativo",
      period: "06 de diciembre de 2022 - 05 de enero de 2023",
      description: "Apoyo a la gestión administrativa en la Secretaría Jurídica y acompañamiento en procesos de convivencia ciudadana."
    },
    {
      id: "4",
      company: "TONNER & SUMINISTROS",
      role: "Auxiliar Administrativo",
      period: "24 de noviembre de 2016 - 18 de julio de 2018",
      description: "Elaboración de documentos, manejo de bases de datos, atención al cliente y soporte logístico en actividades inherentes al cargo."
    }
  ],
  education: [
    {
      id: "e1",
      institution: "Unidades Tecnológicas de Santander",
      title: "Tecnología en Contabilidad Financiera",
      year: "2025 (En curso)"
    },
    {
      id: "e2",
      institution: "Servicio Nacional de Aprendizaje (SENA)",
      title: "Tecnología en Análisis y Desarrollo de Software",
      year: "2025 (Finalizado)"
    },
    {
      id: "e3",
      institution: "Servicio Nacional de Aprendizaje (SENA)",
      title: "Tecnología en Producción Multimedia",
      year: "2023"
    },
    {
      id: "e4",
      institution: "Instituto de Formación Perspectiva",
      title: "Técnico en Asistencia Administrativa",
      year: "2021"
    },
    {
      id: "e5",
      institution: "Praxis English Institute",
      title: "Técnico en Inglés (Nivel Intermedio)",
      year: "2019"
    },
    {
        id: "e-bach",
        institution: "Institución Educativa",
        title: "Bachiller Académico",
        year: "2015"
    }
  ],
  skills: [
    { id: "s1", name: "Microsoft Excel (Avanzado)", level: 98 },
    { id: "s2", name: "Microsoft Word & Publisher", level: 95 },
    { id: "s3", name: "Microsoft Access & Power Point", level: 90 },
    { id: "s4", name: "Vibe Coding (Innovación)", level: 85 },
    { id: "s5", name: "Gestión Pública & MIPG", level: 90 },
    { id: "s6", name: "Desarrollo Web (HTML/CSS/PHP)", level: 85 }
  ],
  complementaryEducation: [
    "Desarrollo Web con PHP",
    "Administración de Recursos Humanos",
    "English Does Work - Nivel Intermedio",
    "Atención al Cliente por Medios Tecnológicos",
    "Modelo Integrado de Planeación y Gestión - MIPG",
    "Políticas Públicas y Contratación Estatal",
    "Sistemas de Control Interno MECI",
    "Veedurías Ciudadanas y Control Social"
  ],
  projects: [
    {
      id: "p1",
      title: "Generador de Renuncia Voluntaria",
      description: "Diligencia el formulario y te llegará al correo el archivo editable totalmente gratis.",
      link: "https://forms.gle/FhvhZXPkKXpub9M36",
      category: "Automatización"
    },
    {
      id: "p2",
      title: "Generador de Referencia Personal",
      description: "Crea referencias personales profesionales de manera estructurada al instante.",
      link: "https://forms.gle/uZnDXK3gp1xhhBge9",
      category: "Automatización"
    },
    {
      id: "p3",
      title: "Generador de Hojas de Vida Sencillo",
      description: "Proceso simplificado para la creación de perfiles laborales básicos y efectivos.",
      link: "https://forms.gle/1FwfGs2Vkp96zcrj7",
      category: "Automatización"
    }
  ],
  supports: [
    { 
      id: "sup3", 
      title: "Certificado SENA - Multimedia", 
      url: "#", 
      category: "Curso",
      description: "Formación integral en diseño digital, edición de video y producción de piezas multimedia para diversos canales."
    },
    { 
      id: "sup4", 
      title: "Acta de Grado Auxiliar Administrativo", 
      url: "#", 
      category: "Competencia",
      description: "Certificación técnica en gestión de archivos, atención al cliente y soporte administrativo institucional."
    },
    { 
      id: "sup6", 
      title: "Certificado ADSO - SENA", 
      url: "#", 
      category: "Diplomado",
      description: "Tecnología en Análisis y Desarrollo de Software, enfocado en metodologías ágiles y lenguajes modernos."
    }
  ]
};

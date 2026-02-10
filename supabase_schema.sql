
-- Habilitar extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de Perfil Profesional
CREATE TABLE IF NOT EXISTS profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  title TEXT,
  about TEXT,
  location TEXT,
  email TEXT,
  phone TEXT,
  photo_url TEXT,
  accent_color TEXT DEFAULT '#D4AF37',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Experiencia Laboral
CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Educación y Títulos Técnicos
CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution TEXT NOT NULL,
  title TEXT NOT NULL,
  year TEXT,
  display_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Habilidades (Skills)
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  level INTEGER DEFAULT 50,
  display_order INTEGER DEFAULT 0
);

-- Tabla de Proyectos y Automatizaciones
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  link TEXT,
  category TEXT DEFAULT 'Automatización',
  display_order INTEGER DEFAULT 0
);

-- Tabla de Soportes (Certificados, Cursos, Diplomados)
CREATE TABLE IF NOT EXISTS supports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  emisor TEXT,
  fecha_grado DATE,
  url_pdf TEXT,
  category TEXT CHECK (category IN ('Curso', 'Competencia', 'Diplomado')),
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar datos iniciales para el perfil
INSERT INTO profile (name, title, about, location, email, phone, photo_url, accent_color)
VALUES (
  'IVÁN GERARDO RODRÍGUEZ BUSTAMANTE', 
  'Productor Multimedia - Gestor - Administrativo', 
  'Profesional con amplia experiencia en manejo de herramientas de oficina y desarrollo tecnológico...', 
  'Barrancabermeja, Santander', 
  'ivan.rodriguezbu@gmail.com', 
  '3052319414', 
  'https://lh3.googleusercontent.com/d/1TrpAhBtvltnjmYTUtMc59AECn5KhLJZi', 
  '#D4AF37'
) ON CONFLICT DO NOTHING;

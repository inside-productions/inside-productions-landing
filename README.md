# Inside Productions - Sitio Web

## Estructura del Proyecto

Este proyecto es un sitio web desarrollado con Next.js 15 para Inside Productions, una empresa especializada en producción audiovisual y experiencias inmersivas.

## Carpeta `sections/`

La carpeta `sections/` contiene los componentes modulares que conforman las diferentes secciones de la página principal. Cada sección es un componente independiente que se importa y ensambla en `app/page.tsx`.

### Componentes de Sección

| Archivo | Descripción |
|---------|-------------|
| `Header.tsx` | Barra de navegación superior con enlaces a las diferentes secciones del sitio. |
| `HeroSection.tsx` | Sección principal (hero) con título, subtítulo y animación de partículas. |
| `VideoSection.tsx` | Sección con reproductor de video de Vimeo destacado. |
| `ServicesSection.tsx` | Muestra los servicios ofrecidos con tarjetas interactivas. |
| `AboutSection.tsx` | Información sobre la empresa y el equipo, con modal para ver detalles de cada miembro. |
| `GallerySection.tsx` | Galería de proyectos con carrusel y modal para ver detalles, imágenes y videos. |
| `ClientsSection.tsx` | Muestra los logotipos de clientes con animación de desplazamiento. |
| `SocialMediaSection.tsx` | Enlaces a redes sociales (LinkedIn, Instagram, YouTube, Facebook, Vimeo, TikTok). |
| `ContactSection.tsx` | Formulario de contacto con envío de correo electrónico. |
| `Footer.tsx` | Pie de página con información de contacto y copyright. |

### Componentes Modales

| Archivo | Descripción |
|---------|-------------|
| `TeamModal.tsx` | Modal que muestra información detallada de los miembros del equipo. |
| `ProjectModal.tsx` | Modal que muestra detalles de proyectos, con soporte para imágenes y videos de Vimeo. |

## Características Principales

### Diseño y Estilo

- **Tema Visual**: Negro y amarillo (#FCDD2F) como colores principales
- **Tipografía**: Be Vietnam Pro para títulos, Outfit para texto general
- **Efectos**: Animaciones de partículas, transiciones suaves, efectos hover
- **Responsivo**: Adaptado para dispositivos móviles y de escritorio

### Funcionalidades

- **Navegación**: Desplazamiento suave entre secciones
- **Reproductor de Video**: Integración con Vimeo, controles personalizados
- **Carrusel de Proyectos**: Navegación entre proyectos con modal detallado
- **Galería Multimedia**: Soporte para imágenes y videos en proyectos
- **Formulario de Contacto**: Envío de correos con nodemailer
- **Redes Sociales**: Enlaces a todas las plataformas

### Componentes Reutilizables

- **AnimatedParticles**: Efecto visual de partículas animadas
- **VimeoPlayer**: Reproductor personalizado para videos de Vimeo
- **UI Components**: Botones, inputs, selects y otros elementos de UI

## Integración con Datos

Los datos de las secciones (equipo, proyectos, clientes) se cargan desde archivos JSON en la carpeta `data/`:

- `teamMembers.json`: Información del equipo
- `projects.json`: Proyectos con imágenes y videos
- `clients.json`: Información de clientes

## Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilos**: TailwindCSS 4, CSS Modules
- **Componentes UI**: Shadcn UI (basado en Radix)
- **Animaciones**: CSS Animations, React hooks personalizados
- **API**: API Routes de Next.js para envío de correos
- **Email**: Nodemailer para el envío de formularios de contacto

## Optimizaciones

- **Carga Diferida**: Componentes cargados según necesidad
- **Renderizado Condicional**: Elementos renderizados solo cuando son visibles
- **Memoización**: useCallback y useMemo para funciones y valores
- **Animaciones Optimizadas**: Partículas con renderizado controlado

## Estructura de Archivos

```
inside-productions-landing/
├── app/                    # Páginas y rutas de Next.js
│   ├── page.tsx            # Página principal que ensambla las secciones
│   ├── layout.tsx          # Layout principal con configuración de fuentes
│   └── api/                # API Routes (send-email)
├── sections/               # Componentes de sección
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   └── ...                 # Otras secciones
├── components/             # Componentes reutilizables
│   ├── AnimatedParticles.tsx
│   ├── VimeoPlayer.tsx
│   └── ...                 # Otros componentes UI
├── data/                   # Datos en formato JSON
│   ├── teamMembers.json
│   ├── projects.json
│   └── clients.json
└── public/                 # Archivos estáticos
    ├── hero-background.png
    └── ...                 # Otras imágenes y assets
```

## Configuración y Uso

1. **Instalación**: `npm install` o `pnpm install`
2. **Desarrollo**: `npm run dev` o `pnpm dev`
3. **Producción**: `npm run build` seguido de `npm start`

### Configuración del Formulario de Contacto

Para que el formulario de contacto funcione, se requiere configurar las variables de entorno:

```env
# .env.local
COMPANY_EMAIL=tu-email@gmail.com
COMPANY_EMAIL_PASSWORD=tu-contraseña-de-aplicación
RECEIVE_EMAILS_AT=donde-recibir@email.com
```

## Contribución

Para contribuir al proyecto:

1. Crea una rama para tu funcionalidad
2. Implementa los cambios siguiendo el estilo existente
3. Asegúrate de que todo funcione correctamente
4. Envía un pull request

---

© 2023-2024 Inside Productions. Todos los derechos reservados.
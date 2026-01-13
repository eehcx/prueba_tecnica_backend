# Prueba Técnica

Aplicación web full stack para gestión de gastos personales.

## Descripción

Sistema CRUD completo para administrar gastos con backend en NestJS y frontend en Vue 3 + Nuxt UI.

## Estructura del Proyecto

```
expenses/
├── backend/     # API REST con NestJS (arquitectura hexagonal)
├── frontend/    # Aplicación Vue 3 con Nuxt UI
└── README.md    # Este archivo
```

## Inicio Rápido

### 1. Clonar repositorio
```bash
git clone <repo-url>
cd expenses
```

### 2. Ejecutar con Docker (recomendado)
```bash
cd backend
docker-compose up -d
```

### 3. Iniciar frontend
```bash
cd ../frontend
npm install
npm run dev
```

## Documentación Detallada

### Backend
Para documentación completa del backend, ver: [backend/README.md](backend/README.md)
- Arquitectura hexagonal
- Endpoints API
- Configuración de base de datos
- Variables de entorno
- Docker y despliegue

### Frontend  
Para documentación del frontend, ver: [frontend/README.md](frontend/README.md)
- Componentes Vue 3
- Nuxt UI components
- Composables y estado
- TypeScript y validaciones
- Responsive design

## Requisitos Cumplidos

### Backend (NestJS)
- CRUD completo de gastos
- Paginación y filtros
- Búsqueda por descripción
- Validaciones con DTOs
- Manejo de errores
- Seeds con datos de ejemplo
- Arquitectura hexagonal

### Frontend (Vue 3 + Nuxt UI)
- Interfaz profesional con Nuxt UI
- Tabla responsiva (mobile/desktop)
- Formularios con validación
- Búsqueda en tiempo real
- Filtros por categoría
- Paginación integrada
- Exportación Excel/PDF
- Gráficas estadísticas

## URLs Locales

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Tecnologías

- Backend: NestJS, TypeScript, PostgreSQL, TypeORM, Docker
- Frontend: Vue 3, Nuxt 3, Nuxt UI, TypeScript, Chart.js
- Herramientas: ESLint, Prettier, Jest, Docker Compose

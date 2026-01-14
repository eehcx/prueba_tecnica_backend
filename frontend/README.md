# Frontend 

Aplicación Vue 3 con Nuxt UI para gestionar gastos personales.

## Características

- Interfaz profesional con componentes Nuxt UI
- Tabla responsiva con vista mobile/desktop
- Formularios con validación en tiempo real
- Búsqueda instantánea por descripción
- Filtros por categoría
- Paginación cliente/servidor
- Exportación a Excel y PDF
- Gráficas interactivas (Chart.js)
- Responsive design mobile-first
- TypeScript estricto

## Estructura

```
frontend/
├── app/
│   ├── components/     # Componentes Vue
│   │   ├── expenses/   # Componentes de gastos
│   │   ├── stats/      # Componentes de estadísticas
│   │   └── layout/     # Componentes de layout
│   ├── composables/    # Lógica reutilizable
│   ├── core/          # Entidades, tipos, constantes
│   ├── pages/         # Vistas (/, /stats)
│   └── layouts/       # Layouts de aplicación
├── public/            # Assets estáticos
└── package.json       # Dependencias
```

## Instalación

### Prerrequisitos
- Node.js 18+
- Backend API corriendo (http://localhost:3001)

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Crear archivo `.env` en la raíz del frontend:
```
VITE_API_BASE_URL=http://localhost:3001/api/expenses
```

### 3. Iniciar servidor de desarrollo
```bash
npm run dev
```

## Componentes Principales

### ExpenseTable
Tabla responsiva para listar gastos (vista desktop).

### ExpenseCard
Tarjeta para mostrar gastos (vista mobile).

### ExpenseFormModal
Modal para crear/editar gastos con validación.

### DeleteExpenseModal
Modal de confirmación para eliminar gastos.

### CategoryBarChart
Gráfica de barras para gastos por categoría.

### MonthlyLineChart
Gráfica de línea para gastos mensuales.

## Composables

### useExpenses()
Gestión completa del CRUD de gastos:
- Listar con paginación
- Crear, editar, eliminar
- Búsqueda y filtrado
- Manejo de estados de carga/error

### useStats()
Obtención de estadísticas:
- Totales por categoría
- Gastos mensuales
- Resumen general

## Vistas

### Página Principal (/)
- Listado completo de gastos
- Filtros y búsqueda
- Botones de acción (crear, exportar)
- Paginación

### Estadísticas (/stats)
- Gráficas interactivas
- Resumen por categoría
- Análisis mensual
- Exportación de reportes

## Configuración

### Variables de entorno
| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| VITE_API_BASE_URL | URL del backend API | http://localhost:3001/api/expenses |

### Categorías predefinidas
- comida - Alimentación
- transporte - Transporte
- entretenimiento - Entretenimiento
- supermercado - Supermercado
- servicios - Servicios
- salud - Salud
- educación - Educación
- vivienda - Vivienda
- ropa - Ropa
- tecnología - Tecnología
- otros - Otros

## Scripts

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview de producción
npm run lint         # Lint del código
```

## Integración con Backend

La aplicación consume la API REST del backend:
- Base URL: VITE_API_BASE_URL
- Endpoints principales: /expenses, /expenses/stats, /expenses/export/*
- Autenticación: No requerida (para esta prueba)

## Responsive Design

- Desktop: Tabla con todas las columnas
- Tablet: Tabla simplificada
- Mobile: Vista de tarjetas (cards)
- Breakpoints: Tailwind CSS defaults

## Requisitos Frontend Cumplidos

- Página principal con listado de gastos
- Modal para crear gasto
- Modal para editar gasto
- Confirmación para eliminar gasto
- Tabla responsiva con Nuxt UI
- Formularios con validación
- Búsqueda en tiempo real
- Paginación
- Filtros por categoría
- Indicadores de carga
- Mensajes de éxito/error
- Responsive design
- Manejo de estados vacíos

## Tecnologías

- Framework: Vue 3 (Composition API)
- Meta-framework: Nuxt 3
- UI Library: Nuxt UI (Tailwind CSS)
- TypeScript: 5+
- Gráficas: Chart.js
- HTTP Client: Fetch API
- Estado: Composables reactivos
- Validación: Validadores personalizados
- Build Tool: Vite

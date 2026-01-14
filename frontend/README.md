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

## Mejoras Recientes

### Navegación Responsive Mejorada
- **Header adaptativo**: Implementación completa de menú hamburguesa para dispositivos móviles
- **Separación de responsabilidades**: Refactorización del código para separar lógica de negocio (composables) de componentes UI
- **Experiencia mobile-first**: Navegación optimizada para dispositivos móviles con iconos y textos abreviados
- **Estado visual**: Indicadores claros de la ruta activa en ambos modos (desktop/mobile)

### Arquitectura Mejorada
- **Composables especializados**: `useExpenseUI()` para gestión de estado de UI y `useExport()` para funcionalidades de exportación
- **Componentes modulares**: Separación de componentes por responsabilidad (layout, expenses, stats, common)
- **TypeScript estricto**: Tipos definidos para todas las entidades y funciones
- **Patrones modernos**: Implementación de estado reactivo con `ref()` y `reactive()` y separación de preocupaciones

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

### Layout Components

#### Navigation Header (`default.vue`)
Header responsive con navegación adaptativa:
- **Desktop**: Navegación completa con texto e iconos
- **Mobile**: Menú hamburguesa con iconos, texto abreviado
- **Características**:
  - Navegación entre páginas (Inicio/Estadísticas)
  - Estado activo visual (resaltado de ruta actual)
  - Texto contextual dinámico según la página
  - Diseño responsive con breakpoints Tailwind

#### AppFooter
Footer de la aplicación con información básica.

### Expense Components

#### ExpenseTable
Tabla responsiva para listar gastos (vista desktop).

#### ExpenseCard
Tarjeta para mostrar gastos (vista mobile).

#### ExpenseFormModal
Modal para crear/editar gastos con validación.

#### DeleteExpenseModal
Modal de confirmación para eliminar gastos.

### Stats Components

#### CategoryBarChart
Gráfica de barras para gastos por categoría.

#### MonthlyLineChart
Gráfica de línea para gastos mensuales.

#### StatsSummary
Resumen estadístico de gastos.

### Common Components

#### Pagination
Componente de paginación reutilizable.

## Composables

### useExpenses()
Gestión completa del CRUD de gastos:
- Listar con paginación
- Crear, editar, eliminar
- Búsqueda y filtrado
- Manejo de estados de carga/error
- Estado reactivo con `ref()` y `reactive()`

### useStats()
Obtención de estadísticas:
- Totales por categoría
- Gastos mensuales
- Resumen general
- Cálculos en tiempo real

### useExpenseUI()
Gestión del estado de UI para gastos:
- Control de modales (crear/editar/eliminar)
- Estado de gasto seleccionado
- Funciones para abrir/cerrar modales
- Separación de lógica de presentación

### useExport()
Funcionalidades de exportación:
- Exportación a Excel con formato
- Exportación a PDF con diseño
- Estados de carga para exportaciones
- Manejo de filtros en exportaciones

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

### Layout Responsive
- **Header Navigation**: Menú hamburguesa en mobile, navegación completa en desktop
- **Content Layout**: Grids flexibles con breakpoints Tailwind
- **Component Adaptation**: Componentes específicos por dispositivo (tabla vs cards)

### Breakpoints Implementados
- **Mobile (< 768px)**: 
  - Menú hamburguesa con iconos
  - Vista de tarjetas (ExpenseCard)
  - Textos abreviados
  - Padding reducido
- **Tablet (768px - 1024px)**:
  - Navegación simplificada
  - Tablas adaptativas
- **Desktop (> 1024px)**:
  - Navegación completa con texto
  - Tabla con todas las columnas (ExpenseTable)
  - Texto descriptivo completo

### Mobile-First Approach
- Desarrollo comenzando por mobile
- Progressive enhancement para desktop
- Media queries con clases Tailwind (`md:`, `lg:`)

## Requisitos Frontend Cumplidos

### Funcionalidades Básicas
- Página principal con listado de gastos
- Modal para crear gasto
- Modal para editar gasto
- Confirmación para eliminar gasto
- Tabla responsiva con Nuxt UI
- Formularios con validación
- Búsqueda en tiempo real
- Paginación
- Filtros por categoría

### Experiencia de Usuario
- Indicadores de carga
- Mensajes de éxito/error
- Manejo de estados vacíos
- Feedback visual en interacciones
- Navegación intuitiva

### Responsive Design
- Header con navegación adaptativa (menú hamburguesa en mobile)
- Vista dual: tabla para desktop, cards para mobile
- Layouts fluidos con Tailwind CSS
- Textos adaptativos según dispositivo

### Arquitectura Moderna
- Separación de responsabilidades (components/composables)
- TypeScript estricto con tipos definidos
- Composables reutilizables para lógica de negocio
- Componentes modulares y mantenibles

## Tecnologías y Arquitectura

### Core Technologies
- **Framework**: Vue 3 (Composition API)
- **Meta-framework**: Nuxt 3
- **UI Library**: Nuxt UI (Tailwind CSS)
- **TypeScript**: 5+ con tipos estrictos
- **Gráficas**: Chart.js
- **HTTP Client**: Fetch API
- **Estado**: Composables reactivos con `ref()` y `reactive()`
- **Validación**: Validadores personalizados
- **Build Tool**: Vite

### Patrones de Diseño Implementados
- **Separación de Responsabilidades**: Lógica de negocio en composables, UI en componentes
- **Mobile-First**: Desarrollo responsive comenzando por mobile
- **Component-Based Architecture**: Componentes modulares y reutilizables
- **Reactive State Management**: Estado reactivo con `ref()` y `reactive()` en composables
- **Type Safety**: Tipos estrictos para datos y funciones

### Estructura de Código
```
frontend/app/
├── components/          # Componentes Vue (UI)
│   ├── expenses/       # Componentes específicos de gastos
│   ├── stats/          # Componentes de estadísticas
│   ├── layout/         # Componentes de layout (header/footer)
│   └── common/         # Componentes reutilizables
├── composables/        # Lógica de negocio reutilizable
├── core/              # Entidades, tipos, constantes, validadores
├── pages/             # Vistas/rutas principales
└── layouts/           # Layouts de aplicación
```

### Principios de Desarrollo
- **Clean Code**: Código legible y mantenible
- **Type Safety**: Cero uso de `any`, tipos explícitos
- **Performance**: Optimizaciones específicas donde importan
- **Accessibility**: ARIA labels, HTML semántico
- **Security**: Validación de inputs, sanitización

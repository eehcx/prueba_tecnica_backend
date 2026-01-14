# NOTAS - Prueba Técnica

En este archivo comento las desiciones técnicas tomadas, desafíos enfrentados, y posibles mejoras para la prueba técnica asignada para el puesto de desarrollador fullstack, aquí detallo mi razonamiento para con la Solución propuesta.

## Decisiones Técnicas Importantes

### 1. Arquitectura Hexagonal (Backend)
- **Elección**: Implementé arquitectura hexagonal (ports & adapters) en lugar de la típica estructura MVC de NestJS
- **Razón**: Mayor testabilidad, separación clara de responsabilidades y flexibilidad para cambiar infraestructura
- **Beneficio**: El dominio no depende de TypeORM, puedo cambiar a Prisma o otro ORM sin modificar lógica de negocio

### 2. Separación Frontend/Backend
- **Backend**: API REST pura con NestJS, documentación Swagger integrada
- **Frontend**: Vue 3 con Composition API, Nuxt UI para componentes profesionales
- **Comunicación**: Fetch API nativa en lugar de Axios para reducir dependencias

### 3. Base de Datos y ORM
- **PostgreSQL**: Elección robusta para datos financieros (transacciones ACID)
- **TypeORM**: Familiaridad y buena integración con NestJS
- **Seeds**: Script bash para poblar datos de ejemplo (15+ registros)

### 4. Estado en Frontend
- **Composables**: `useExpenses()` y `useStats()` en lugar de Pinia/Vuex
- **Razón**: Proyecto pequeño, composables son más ligeros y específicos
- **Ventaja**: Código más mantenible y fácil de testear

### 5. Exportación de Reportes
- **Excel**: Usando exceljs en backend, descarga directa desde frontend
- **PDF**: Usando pdfkit, generación en tiempo real
- **Implementación**: Endpoints separados `/export/excel` y `/export/pdf`

## Desafíos Enfrentados

### 1. Configuración Inicial Docker
- **Problema**: Conflictos de puertos entre servicios
- **Solución**: Usar redes Docker personalizadas y variables de entorno
- **Resultado**: `docker-compose.yml` funcional con PostgreSQL + NestJS

### 2. TypeORM con Arquitectura Hexagonal
- **Desafío**: Implementar Repository pattern sobre TypeORM manteniendo la separación de capas
- **Solución**: Crear `ExpenseEntity` para TypeORM y `Expense` para dominio, con mapper entre ellos
- **Resultado**: Dominio puro sin decoradores de ORM

### 3. Paginación y Filtros Combinados
- **Complejidad**: Endpoint `/expenses` con paginación + filtro categoría + búsqueda
- **Solución**: Parámetros query separados, validación con class-validator
- **Resultado**: API flexible y fácil de usar

### 4. Nuxt UI Components
- **Curva de aprendizaje**: Primer uso de Nuxt UI (Tailwind CSS based)
- **Solución**: Estudiar documentación y adaptar componentes existentes
- **Resultado**: Interfaz profesional con menos código CSS personalizado

### 5. Generación de Reportes
- **Desafío**: Excel con formato profesional y PDF con gráficas
- **Solución**: Librerías especializadas (exceljs, pdfkit), streaming de respuesta
- **Resultado**: Reportes descargables desde frontend con un click

## Posibles Mejoras Futuras

### 1. Corto Plazo 
- **Testing**: Agregar pruebas E2E con Cypress/Playwright
- **Cache**: Implementar Redis para endpoints frecuentes (`/stats`)

### 2. Medio Plazo 
- **Autenticación**: JWT con refresh tokens, roles (admin/user)
- **Subida de archivos**: Adjuntar comprobantes a gastos
- **Notificaciones**: Email/SMS para gastos grandes o recurrentes

### 3. Largo Plazo
- **Microservicios**: Separar módulos (expenses, reports, auth)
- **Monitoreo**: Logs estructurados, métricas con Prometheus
- **CI/CD**: Pipeline completo con tests, lint, build y deploy automático

### 4. Características Adicionales
- **API GraphQL**: Alternativa a REST para clientes específicos
- **WebSockets**: Notificaciones en tiempo real
- **Mobile App**: React Native/Flutter usando misma API

## Tiempo Invertido Aproximado

### Tiempo neto de desarrollo
- **Total efectivo**: 15 horas

### Distribución aproximada
1. **Análisis y planificación**: 2 horas (13%)
2. **Backend (NestJS)**: 6 horas (40%)
    - Configuración proyecto: 1h
    - Arquitectura hexagonal: 2h
    - Endpoints CRUD: 1.5h
    - Reportes Excel/PDF: 1.5h
3. **Frontend (Vue 3)**: 5 horas (33%)
    - Setup Nuxt: 1h
    - Componentes y vistas: 2.5h
    - Integración API: 1.5h
4. **Documentación y ajustes**: 2 horas (13%)
    - READMEs: 1h
    - NOTAS.md y ajustes: 1h

### Observaciones
- El tiempo incluye investigación de tecnologías nuevas (Nuxt UI, exceljs)
- No incluye tiempo de despliegue en producción
- La arquitectura hexagonal requirió más tiempo inicial pero facilita mantenimiento
- El frontend fue más rápido gracias a Nuxt UI components preconstruidos
---

*Gracias por la oportunidad de realizar esta prueba técnica. Estoy abierto a cualquier pregunta o discusión sobre las decisiones tomadas. ¡Espero que la solución cumpla con sus expectativas y poder contrubuir a nivel laboral con ustedes!*

# Arquitectura

## Estructura
```
src/
├── application/     # Servicios y DTOs
├── domain/         # Entidades y puertos
├── infrastructure/ # Repositorios
└── presentation/   # Controladores
```

## Capas

### Dominio
- `Expense`: Entidad de negocio
- `ExpenseRepository`: Interfaz para persistencia

### Aplicación
- `ExpenseService`: Lógica CRUD
- `ChartService`: Estadísticas
- `ReportService`: Reportes Excel/PDF

### Infraestructura
- `ExpenseTypeOrmRepository`: Implementación con TypeORM
- `ExpenseEntity`: Entidad TypeORM

### Presentación
- `ExpensesController`: Endpoints CRUD
- `ChartsController`: Endpoints estadísticas
- `ReportsController`: Endpoints reportes

## Tecnologías
- **Backend**: NestJS, TypeScript
- **DB**: PostgreSQL, TypeORM
- **Contenedores**: Docker
- **Calidad**: ESLint, Prettier, Jest

## Flujo
```
HTTP → Controller → Service → Repository → DB
```

## Principios
- Arquitectura Clean Architecture (inspirada en principios hexagonales)
- Inyección de dependencias
- Separación de responsabilidades
- Repository pattern

## Configuración clave
```typescript
// Orden importante para evitar conflictos de rutas
controllers: [ChartsController, ReportsController, ExpensesController]

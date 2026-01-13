# API de Gestión de Gastos

API RESTful para gestión de gastos personales construida con NestJS y arquitectura hexagonal.

## Características
- CRUD completo de gastos
- Estadísticas por categoría y mes
- Reportes exportables (Excel y PDF)
- Arquitectura hexagonal
- PostgreSQL con TypeORM
- Docker para desarrollo

## Documentación

### [Instalación](docs/INSTALLATION.md)
Requisitos, instalación local, Docker, scripts y solución de problemas.

### [API Reference](docs/API.md)
Endpoints, ejemplos, respuestas y códigos de estado.

### [Arquitectura](docs/ARCHITECTURE.md)
Estructura del proyecto, capas, tecnologías y principios de diseño.

## Quick Start

### Con Docker (recomendado)
```bash
docker-compose up -d
# API disponible en http://localhost:3001
```

### Local
```bash
git clone <repo-url>
cd expenses
yarn install
cp .env.example .env
yarn run start
```

## Endpoints principales

### Gastos
- `GET /api/expenses` - Listar gastos
- `POST /api/expenses` - Crear gasto
- `GET /api/expenses/:id` - Obtener gasto
- `PUT /api/expenses/:id` - Actualizar gasto
- `DELETE /api/expenses/:id` - Eliminar gasto

### Estadísticas
- `GET /api/expenses/stats` - Estadísticas detalladas

### Reportes
- `GET /api/expenses/export/excel` - Reporte Excel
- `GET /api/expenses/export/pdf` - Reporte PDF

## Ejemplo rápido
```bash
# Crear gasto
curl -X POST http://localhost:3001/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Comida",
    "amount": 45.50,
    "category": "food"
  }'

# Ver estadísticas
curl http://localhost:3001/api/expenses/stats
```

## Tecnologías
- **Backend**: NestJS, TypeScript
- **Base de datos**: PostgreSQL, TypeORM
- **Contenedores**: Docker, Docker Compose
- **Calidad**: ESLint, Prettier, Jest

## Estructura del proyecto
```
expenses/
├── docs/           # Documentación
├── src/           # Código fuente
│   ├── application/ # Servicios y DTOs
│   ├── domain/     # Entidades y puertos
│   ├── infrastructure/ # Repositorios
│   └── presentation/ # Controladores
└── docker-compose.yml
```
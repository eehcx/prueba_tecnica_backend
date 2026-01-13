# API Reference

Base URL: `http://localhost:3001/api`

## Endpoints

### Gastos CRUD
- **GET** `/expenses` - Listar (page, limit, category)
- **GET** `/expenses/:id` - Obtener por ID
- **POST** `/expenses` - Crear (description, amount, category)
- **PUT** `/expenses/:id` - Actualizar
- **DELETE** `/expenses/:id` - Eliminar
- **GET** `/expenses/search` - Buscar (query, page, limit)

### Estadísticas
- **GET** `/expenses/stats` - Estadísticas por categoría y mes

### Reportes
- **GET** `/expenses/export/excel` - Reporte Excel (category, startDate, endDate)
- **GET** `/expenses/export/pdf` - Reporte PDF (category)

## Ejemplos

### Crear gasto
```bash
curl -X POST http://localhost:3001/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Comida",
    "amount": 45.50,
    "category": "food"
  }'
```

### Estadísticas
```bash
curl "http://localhost:3001/api/expenses/stats"
```

### Exportar Excel
```bash
curl -o gastos.xlsx "http://localhost:3001/api/expenses/export/excel"
```

## Respuestas

### Éxito (200)
```json
{
  "id": 1,
  "description": "Comida",
  "amount": 45.50,
  "date": "2026-01-12T18:30:00.000Z",
  "category": "food"
}
```

### Error (400)
```json
{
  "statusCode": 400,
  "message": "amount must be a positive number"
}
```

### Paginación
```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## Códigos de estado
- **200**: OK
- **201**: Creado
- **400**: Bad Request
- **404**: No encontrado
- **500**: Error interno

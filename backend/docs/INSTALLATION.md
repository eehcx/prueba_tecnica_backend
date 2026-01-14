# Instalación

## Requisitos
- Node.js 18+
- PostgreSQL 15+ o Docker
- Yarn o npm

## Instalación local
```bash
git clone <repo-url>
cd expenses
yarn install
cp .env
# Editar .env con tus credenciales
yarn run start
```

## Variables de Entorno (.env)

Crear archivo `.env` en la raíz del backend:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=expenses
```

# Server
- PORT=3001
- NODE_ENV=development


## Docker (recomendado)
```bash
docker-compose up -d
# API disponible en http://localhost:3001
```

## Scripts
```bash
yarn run start     # Desarrollo
yarn lint          # Lint
yarn format        # Formatear
yarn test          # Pruebas
yarn build         # Compilar
```

## Configuración DB
### PostgreSQL local
```sql
CREATE DATABASE expenses;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE expenses TO postgres;
```

### Docker
```bash
docker-compose up -d postgres
```

## Solución de problemas
- **Error conexión DB**: Verificar PostgreSQL corriendo y credenciales en `.env`
- **Puerto en uso**: Cambiar `PORT` en `.env`
- **Dependencias**: `rm -rf node_modules && yarn install`


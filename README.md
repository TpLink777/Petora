<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Petora API

API de Petora construida con [NestJS](https://nestjs.com/). Este proyecto se encuentra en desarrollo y servirá como base para la gestión de mascotas.

## Requisitos

- Node.js
- npm / pnpm
- Docker y Docker Compose
- Base de datos configurada para el proyecto

## Instalación

```bash
pnpm install
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las variables necesarias para la conexión a la base de datos. No subas este archivo al repositorio.

## Inicialización de la base de datos

La base de datos se ejecuta mediante Docker. Inicia los servicios definidos en el archivo `docker-compose.yml`:

```bash
docker compose up -d
```

Verifica que la configuración de conexión del archivo `.env` coincida con el servicio de base de datos. Para detener los contenedores:

```bash
docker compose down
```

Después, ejecuta las migraciones o scripts disponibles antes de iniciar la API.

## Ejecución

```bash
# Desarrollo
pnpm run start:dev

# Producción
pnpm run build
pnpm run start:prod
```

## Estado del proyecto

El proyecto está en una etapa inicial. La documentación y los módulos se irán ampliando y modificando conforme avance el desarrollo.



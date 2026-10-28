<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Petora API

API REST para la gestión de una tienda de mascotas, construida con [NestJS](https://nestjs.com/), TypeORM y PostgreSQL. Permite registrar usuarios, autenticarse con JWT, administrar productos con imágenes y subir archivos a Cloudinary.

El proyecto está en desarrollo y sirve como base para el backend de Petora.

## Tabla de contenido

- [Características](#características)
- [Cronología del proyecto](#cronología-del-proyecto)
- [Tecnologías](#tecnologías)
- [Requisitos previos](#requisitos-previos)
- [Inicio rápido](#inicio-rápido)
- [Variables de entorno](#variables-de-entorno)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [API](#api)
  - [Documentación interactiva (Swagger)](#documentación-interactiva-swagger)
  - [Autenticación](#autenticación)
  - [Productos](#productos)
  - [Archivos](#archivos)
  - [Seed](#seed)
- [Roles y autorización](#roles-y-autorización)
- [Modelo de datos](#modelo-de-datos)
- [Datos de prueba](#datos-de-prueba)
- [Pruebas](#pruebas)
- [Configuración del proyecto](#configuración-del-proyecto)
- [Convenciones de documentación](#convenciones-de-documentación)
- [Notas y consideraciones](#notas-y-consideraciones)
- [Licencia](#licencia)

## Características

- Registro e inicio de sesión de usuarios con contraseñas hasheadas mediante bcrypt.
- Autenticación con JWT (Passport) y expiración de tokens de 2 horas.
- Autorización por roles: `superAdmin`, `admin` y `user`.
- CRUD de productos con búsqueda por UUID, título o slug.
- Paginación de resultados mediante `limit` y `offset`.
- Imágenes de productos con relación uno-a-muchos y eliminación en cascada.
- Subida de imágenes a Cloudinary con validación de tipo y tamaño.
- Validación global de DTOs con `class-validator` y `ValidationPipe`.
- Endpoint para verificar y renovar la sesión (`GET /auth/check-status`).
- Seed para cargar usuarios y productos de ejemplo.
- Documentación del código fuente con JSDoc en español.
- Documentación OpenAPI interactiva con Swagger UI en `/api/docs`.

## Cronología del proyecto

Resumen de la evolución del backend a partir del historial de Git:

| Fecha | Hito | Cambios principales |
| --- | --- | --- |
| 23–25 sep 2026 | Base del catálogo | Inicialización con NestJS, CRUD de productos, paginación, edición y seed inicial. |
| 6 oct 2026 | Imágenes en Cloudinary | Módulo y servicio de subida de imágenes, integración con Cloudinary y variables de entorno. |
| 12–13 oct 2026 | Autenticación JWT | DTOs de registro y login, módulo JWT y estrategia de Passport para validar tokens. |
| 16 oct 2026 | Roles y usuarios | Decoradores de autorización, guard de roles, vínculo usuario-producto y seed con usuarios. |
| 21 oct 2026 | Documentación técnica | JSDoc en módulos clave, README ampliado, configuración local de PostgreSQL y plantilla de variables. |
| 27 oct 2026 | Swagger y sesión | OpenAPI en `/api/docs`, endpoint `/auth/check-status`, `@ApiProperty` en entidades y DTOs, y limpieza de la caché de compilación. |

El proyecto cuenta actualmente con autenticación JWT, autorización por roles, catálogo de productos con imágenes y documentación OpenAPI interactiva.

## Tecnologías

| Tecnología | Uso |
| --- | --- |
| [NestJS](https://nestjs.com/) | Framework del backend |
| [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction) | Documentación OpenAPI y Swagger UI |
| [TypeORM](https://typeorm.io/) | ORM para PostgreSQL |
| [PostgreSQL](https://www.postgresql.org/) | Base de datos relacional |
| [Passport](https://www.passportjs.org/) + JWT | Autenticación |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | Hash de contraseñas |
| [Cloudinary](https://cloudinary.com/) | Almacenamiento de imágenes |
| [class-validator](https://github.com/typestack/class-validator) | Validación de DTOs |
| [Vitest](https://vitest.dev/) | Pruebas unitarias y e2e |
| [oxlint](https://oxc.rs/docs/guide/usage/linter) | Linter |
| [Prettier](https://prettier.io/) | Formato de código |

## Requisitos previos

- [Node.js](https://nodejs.org/) 20 o superior (se recomienda una versión LTS).
- [pnpm](https://pnpm.io/) como gestor de paquetes.
- [Docker](https://www.docker.com/) y Docker Compose (opcional, para levantar PostgreSQL localmente).
- Una cuenta de [Cloudinary](https://cloudinary.com/) para la subida de imágenes.

## Inicio rápido

### 1. Clonar el repositorio

```bash
git clone https://github.com/TpLink777/Petora.git
cd Petora
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar las variables de entorno

Copia el archivo de ejemplo y completa los valores:

```bash
cp .env.example .env
```

En Windows (PowerShell):

```powershell
Copy-Item .env.example .env
```

Consulta la sección [Variables de entorno](#variables-de-entorno) para saber qué valor poner en cada variable.

### 4. Levantar la base de datos

```bash
docker compose up -d
```

Esto inicia PostgreSQL 17.6 en el puerto `5432` con el nombre y la contraseña definidos en `.env`.

### 5. Ejecutar la aplicación

```bash
pnpm start:dev
```

La API queda disponible en `http://localhost:3000/api/petora` y la documentación interactiva en `http://localhost:3000/api/docs`.

### 6. Cargar los datos de prueba (opcional)

Con la aplicación en ejecución:

```bash
curl http://localhost:3000/api/petora/seed
```

También puedes abrir la URL directamente en el navegador. El seed elimina los datos existentes y vuelve a insertar los usuarios y productos de ejemplo.

## Variables de entorno

`ConfigModule` carga automáticamente el archivo `.env` de la raíz del proyecto.

| Variable | Descripción | Ejemplo |
| --- | --- | --- |
| `DB_HOST` | Host de PostgreSQL | `localhost` |
| `DB_PORT` | Puerto de PostgreSQL | `5432` |
| `DB_USER` | Usuario de PostgreSQL | `postgres` |
| `DB_PASSWORD` | Contraseña de PostgreSQL | `postgres` |
| `DB_NAME` | Nombre de la base de datos | `petora` |
| `PORT` | Puerto HTTP de la API (opcional, 3000 por defecto) | `3000` |
| `CLOUDINARY_CLOUD_NAME` | Nombre de la nube de Cloudinary | `mi-nube` |
| `CLOUDINARY_API_KEY` | Clave API de Cloudinary | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Secreto API de Cloudinary | `abc123...` |
| `JWT_SECRET_KEY` | Clave secreta para firmar los JWT | `una-clave-larga-y-aleatoria` |

> No subas el archivo `.env` al repositorio. Solo `.env.example` debe versionarse.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `pnpm build` | Compila el proyecto en `dist/` |
| `pnpm start` | Inicia la aplicación |
| `pnpm start:dev` | Inicia en modo desarrollo con recarga automática |
| `pnpm start:debug` | Inicia en modo depuración con recarga automática |
| `pnpm start:prod` | Ejecuta la versión compilada (`node dist/main`) |
| `pnpm format` | Formatea `src/` y `test/` con Prettier |
| `pnpm lint` | Ejecuta oxlint sobre `src/` y `test/` |
| `pnpm test` | Ejecuta las pruebas unitarias con Vitest |
| `pnpm test:watch` | Ejecuta Vitest en modo watch |
| `pnpm test:cov` | Ejecuta las pruebas con cobertura |
| `pnpm test:e2e` | Ejecuta las pruebas end-to-end |
| `pnpm deploy` | Despliega la aplicación con Nest Deploy |

## Estructura del proyecto

```text
Petora/
├── src/
│   ├── auth/
│   │   ├── decorators/        # Auth, Authorization, RoleProtected, GetUSer y atajos de roles
│   │   ├── dto/               # CreateUserDto y LoginUserDto
│   │   ├── entities/          # Entidad User
│   │   ├── guards/            # UserRoleGuard (autorización por roles)
│   │   ├── interfaces/        # JwtPayload y enum ValidRoles
│   │   ├── strategies/        # JwtStrategy (Passport)
│   │   ├── auth.controller.ts # Endpoints de registro, login y pruebas
│   │   ├── auth.module.ts     # Configuración de JWT y Passport
│   │   └── auth.service.ts    # Registro, login y firma de tokens
│   ├── cloudinary/
│   │   ├── cloudinary.module.ts
│   │   └── cloudinary.service.ts # Subida de imágenes a Cloudinary
│   ├── common/
│   │   ├── dtos/
│   │   │   └── pagination.dto.ts # DTO de paginación reutilizable
│   │   └── common.module.ts
│   ├── files/
│   │   ├── files.controller.ts # Endpoint de subida de archivos
│   │   ├── files.module.ts
│   │   └── files.service.ts    # Punto de extensión para archivos
│   ├── products/
│   │   ├── dto/                # CreateProductDto y UpdateProductDto
│   │   ├── entities/           # Product y ProductImage
│   │   ├── products.controller.ts
│   │   ├── products.module.ts
│   │   └── products.service.ts # Lógica del catálogo y transacciones
│   ├── seed/
│   │   ├── data/               # Datos iniciales de usuarios y productos
│   │   ├── interfaces/         # Tipos SeedUser y SeedProduct
│   │   ├── seed.controller.ts
│   │   ├── seed.module.ts
│   │   └── seed.service.ts     # Borrado e inserción de datos de prueba
│   ├── app.module.ts           # Módulo raíz (configuración global)
│   └── main.ts                 # Punto de entrada, prefijo global y Swagger
├── test/
│   └── app.e2e-spec.ts         # Prueba e2e de ejemplo
├── .env.example                # Plantilla de variables de entorno
├── docker-compose.yaml         # PostgreSQL local
├── nest-cli.json               # Configuración del CLI de NestJS
├── oxlint.json                 # Reglas del linter
├── package.json                # Dependencias y scripts
├── tsconfig.json               # Configuración de TypeScript
├── tsconfig.build.json         # Configuración de compilación
├── vitest.config.ts            # Configuración de pruebas unitarias
└── vitest.config.e2e.ts        # Configuración de pruebas e2e
```

## API

Todas las rutas usan el prefijo global `api/petora`:

```text
http://localhost:3000/api/petora
```

### Documentación interactiva (Swagger)

La aplicación publica una interfaz generada a partir de los controladores y los DTOs, cuyos campos están anotados con `@ApiProperty`.

| Recurso | URL |
| --- | --- |
| Swagger UI | `http://localhost:3000/api/docs` |
| JSON OpenAPI | `http://localhost:3000/api/docs-json` |

Para probar endpoints protegidos:

1. Ejecuta `POST /api/petora/auth/login` y copia el `token` de la respuesta.
2. Abre `http://localhost:3000/api/docs` y pulsa **Authorize**.
3. Pega el token en el esquema `bearer` y confirma.

La interfaz conserva el token al recargar la página y muestra el tiempo de respuesta de cada petición.

### Autenticación

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Público | Registra un usuario y devuelve su token |
| `POST` | `/auth/login` | Público | Inicia sesión y devuelve un token |
| `GET` | `/auth/check-status` | JWT | Verifica la sesión y devuelve un token renovado |
| `GET` | `/auth/testing` | JWT | Devuelve el usuario autenticado (prueba) |
| `GET` | `/auth/testing2` | JWT + `superAdmin` | Endpoint de prueba de roles |
| `GET` | `/auth/testing3` | JWT + `admin` | Endpoint de prueba de roles |

**Registro**

```bash
curl -X POST http://localhost:3000/api/petora/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Ana Pérez",
    "email": "ana@example.com",
    "password": "Password123!"
  }'
```

**Inicio de sesión**

```bash
curl -X POST http://localhost:3000/api/petora/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ana@example.com",
    "password": "Password123!"
  }'
```

Ambos endpoints devuelven un objeto con `message`, los datos del usuario y un `token`. Para acceder a las rutas protegidas envía el token en el encabezado:

```text
Authorization: Bearer <token>
```

La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.

### Productos

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| `GET` | `/products` | Público | Lista productos paginados |
| `GET` | `/products/:term` | Público | Busca por UUID, título o slug |
| `POST` | `/products` | JWT | Crea un producto para el usuario autenticado |
| `PATCH` | `/products/:id` | Usuario autenticado | Actualiza un producto |
| `DELETE` | `/products/:id` | Público | Elimina un producto |

**Listar productos**

```bash
curl "http://localhost:3000/api/petora/products?limit=10&offset=0"
```

- `limit`: cantidad de resultados (10 por defecto).
- `offset`: resultados a omitir (0 por defecto).

**Buscar un producto**

```bash
curl http://localhost:3000/api/petora/products/croquetas-pollo-perro-adulto-2kg
```

También acepta el UUID del producto, el título exacto o el slug.

**Crear un producto**

```bash
curl -X POST http://localhost:3000/api/petora/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Juguete para gato",
    "price": 12.5,
    "description": "Juguete interactivo con cascabel.",
    "stock": 20,
    "type": "juguetes",
    "tags": ["gatos", "juguetes"],
    "images": [
      "https://example.com/juguete-1.jpg",
      "https://example.com/juguete-2.jpg"
    ]
  }'
```

Los campos `title` y `type` son obligatorios. Si no se envía `slug`, se genera a partir del título.

**Actualizar un producto**

```bash
curl -X PATCH http://localhost:3000/api/petora/products/<uuid> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "price": 15,
    "stock": 30
  }'
```

**Eliminar un producto**

```bash
curl -X DELETE http://localhost:3000/api/petora/products/<uuid>
```

### Archivos

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| `POST` | `/files/upload` | Público | Sube una imagen a Cloudinary |

El archivo se envía en `multipart/form-data` con el campo `image`:

```bash
curl -X POST http://localhost:3000/api/petora/files/upload \
  -F "image=@./mascota.jpg"
```

Restricciones:

- Campo obligatorio: `image`.
- Tamaño máximo: 5 MB.
- Formatos permitidos: JPEG, PNG y WEBP.
- Las imágenes se almacenan en la carpeta `Petora_Images` de Cloudinary.

La respuesta incluye la URL segura de la imagen:

```json
{
  "message": "Archivo recibido correctamente",
  "url": "https://res.cloudinary.com/..."
}
```

### Seed

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| `GET` | `/seed` | Público | Reinicia la base de datos con datos de ejemplo |

```bash
curl http://localhost:3000/api/petora/seed
```

El seed:

1. Elimina todos los productos.
2. Elimina todos los usuarios.
3. Inserta 11 usuarios.
4. Inserta 28 productos asociados al primer usuario.

> Es una operación destructiva. No debe ejecutarse en producción ni en una base de datos con información real.

## Roles y autorización

Los roles disponibles se definen en `src/auth/interfaces/valid-roles.interface.ts`:

| Rol | Descripción |
| --- | --- |
| `superAdmin` | Acceso total |
| `admin` | Acceso administrativo |
| `user` | Usuario estándar |

El guard `UserRoleGuard` compara los roles del usuario (`req.user.roles`) con los roles declarados en el endpoint mediante `@RoleProtected(...)`.

Decoradores disponibles:

| Decorador | Función |
| --- | --- |
| `@Auth()` | Exige JWT; sin argumentos solo requiere autenticación |
| `@Authorization()` | Alias de `@Auth()`; exige JWT sin roles específicos |
| `@Auth(ValidRoles.admin)` | Exige JWT y el rol indicado |
| `@AdminAuth()` | Exige el rol `admin` |
| `@SuperAdminAuth()` | Exige el rol `superAdmin` |
| `@UserAuth()` | Exige el rol `user` |
| `@RoleProtected(...roles)` | Declara roles permitidos (requiere `UserRoleGuard`) |
| `@GetUSer()` | Inyecta el usuario autenticado en un parámetro del controlador |

Ejemplo:

```ts
@Get('admin-only')
@AdminAuth()
getAdminData(@GetUSer() user: User) {
  return user;
}
```

## Modelo de datos

```text
User (users)
  id: uuid
  fullName: string
  email: string (único)
  password: string (hash bcrypt, select: false)
  isActive: boolean
  roles: string[]
       |
       | 1:N
       v
Product (products)
  id: uuid
  title: string (único)
  price: number
  description: string | null
  slug: string (único)
  stock: number
  type: string
  tags: string[]
       |
       | 1:N
       v
ProductImage (products_images)
  id: uuid
  url: string
  product: Product (N:1, onDelete: CASCADE)
```

- Un usuario puede tener muchos productos.
- Cada producto pertenece a un usuario.
- Un producto puede tener muchas imágenes.
- Al eliminar un producto, sus imágenes se eliminan en cascada.
- El email se normaliza a minúsculas antes de insertar o actualizar.
- El slug se normaliza a minúsculas, reemplaza espacios por `_` y elimina apóstrofes.

## Datos de prueba

Todos los usuarios del seed comparten la contraseña `Password123!`.

| Email | Rol |
| --- | --- |
| `stivengomez@petora.com` | `superAdmin` |
| `carlos.perez@example.com` | `user` |
| `maria.gomez@example.com` | `admin` |
| `juan.rodriguez@example.com` | `user` |
| `laura.martinez@example.com` | `user` |
| `andres.torres@example.com` | `superAdmin` |
| `valentina.ramirez@example.com` | `admin` |
| `daniel.herrera@example.com` | `user` |
| `sofia.castro@example.com` | `admin` |
| `mateo.vargas@example.com` | `user` |
| `isabella.moreno@example.com` | `superAdmin` |

Puedes iniciar sesión con cualquiera de ellos después de ejecutar el seed.

## Pruebas

El proyecto está configurado con [Vitest](https://vitest.dev/):

```bash
pnpm test        # pruebas unitarias (*.spec.ts)
pnpm test:watch  # modo watch
pnpm test:cov    # cobertura
pnpm test:e2e    # pruebas end-to-end (*.e2e-spec.ts)
```

Actualmente no hay archivos `*.spec.ts`, por lo que `pnpm test` termina con código 1 al no encontrar pruebas unitarias. La prueba incluida en `test/app.e2e-spec.ts` es la plantilla generada por NestJS y espera un `GET /` con `Hello World!`; debe actualizarse para probar un endpoint real de Petora antes de usarse como prueba de humo.

## Configuración del proyecto

| Archivo | Descripción |
| --- | --- |
| `package.json` | Dependencias, scripts y configuración de pnpm |
| `tsconfig.json` | TypeScript en modo ESM (`NodeNext`), decoradores y `strict` |
| `tsconfig.build.json` | Compilación de `src/` excluyendo pruebas |
| `nest-cli.json` | Configuración del CLI de NestJS y `deleteOutDir` |
| `vitest.config.ts` | Pruebas unitarias (`*.spec.ts`) |
| `vitest.config.e2e.ts` | Pruebas e2e (`*.e2e-spec.ts`) |
| `oxlint.json` | Reglas del linter |
| `.prettierrc` | Comillas simples y comas finales |
| `docker-compose.yaml` | PostgreSQL 17.6 para desarrollo |
| `.env.example` | Plantilla de variables de entorno |

## Convenciones de documentación

- Todo el código fuente está documentado con JSDoc en español.
- Los DTOs describen el propósito de cada campo y sus validaciones.
- Los servicios documentan el flujo de negocio, los parámetros y las excepciones.
- Los controladores documentan cada endpoint y su nivel de acceso.
- Las entidades describen columnas, relaciones y hooks de TypeORM.
- Las entidades y los DTOs usan `@ApiProperty` para documentar campos, ejemplos y validaciones en Swagger.

## Notas y consideraciones

- **Sincronización del esquema:** `TypeOrmModule` usa `synchronize: true`. Es cómodo en desarrollo, pero en producción debe desactivarse y usar migraciones.
- **Seed público:** el endpoint `/seed` no está protegido actualmente. Considera añadir `@SuperAdminAuth()` antes de desplegar.
- **Guards pendientes:** los endpoints de actualización y eliminación de productos no declaran guards explícitos. Revisa y añade `@Auth()` según la política de acceso deseada.
- **CORS:** no está habilitado. Si consumes la API desde un frontend en otro origen, habilita `app.enableCors()` en `main.ts`.
- **Validación estricta:** `ValidationPipe` usa `whitelist` y `forbidNonWhitelisted`, por lo que las propiedades no declaradas en los DTOs provocan un error `400`.
- **Módulos ESM:** los imports relativos incluyen la extensión `.js`, requerida por `module: NodeNext`.
- **JWT:** los tokens expiran a las 2 horas. El payload solo contiene el `id` del usuario.
- **Cloudinary:** las credenciales se leen al iniciar el servicio; si falta alguna, la aplicación no arranca.
- **Swagger público:** la documentación en `/api/docs` no requiere autenticación. Si la API se expone públicamente, considera restringir el acceso o deshabilitar la interfaz en producción.

## Licencia

Este proyecto es privado y no tiene licencia de uso (`UNLICENSED`).

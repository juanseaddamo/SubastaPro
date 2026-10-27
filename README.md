# SubastaPro

Aplicación móvil para una empresa que organiza **subastas presenciales de arte y bienes de alta
gama**. Permite a los usuarios participar online (puja en vivo), solicitar la consignación de
bienes propios, gestionar sus medios de pago y ver su historial.

---

## 🚀 Cómo correr en local

### Requisitos

- **JDK 17** o superior (el proyecto incluye Maven Wrapper, no hace falta instalar Maven)
- **Node.js** (LTS) y npm
- **Expo**: se usa vía `npx`, no requiere instalación global. Para probar la app: Expo Go en el
  celular, un emulador Android / simulador iOS, o el navegador.
- Una base **PostgreSQL** (el proyecto usa Supabase)

### 1. Configurar el backend

1. Copiar `backend/.env.example` como `backend/.env` (está en `.gitignore`, no se sube).
2. Completar los datos de la base (`SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`,
   `SPRING_DATASOURCE_PASSWORD`) y un `APP_JWT_SECRET` propio (string aleatorio de 32+ caracteres).
3. Spring lee el `.env` automáticamente al correr desde `backend/`.

> Con Supabase, la conexión directa (`db.<ref>.supabase.co`) requiere IPv6. Si tu red no lo
> soporta, usá la URL del **Session pooler** (puerto 5432) y el usuario `postgres.<ref>`.

### 2. Levantar el backend

```bash
cd backend
./mvnw spring-boot:run        # Windows: mvnw.cmd spring-boot:run
```

- Levanta en **http://localhost:8080** con el perfil `dev` (el puerto se cambia con la variable `PORT`).
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/v3/api-docs

```bash
./mvnw test                   # correr tests (usa la base configurada en backend/.env)
./mvnw clean package          # generar el JAR
```

### 3. Levantar el frontend

```bash
cd frontend
npm install
npx expo start                # Expo dev server
```

Por defecto la app apunta al backend local: `http://10.0.2.2:8080` en emulador Android y
`http://localhost:8080` en web / simulador iOS. Para cambiarla (por ejemplo, en un celular físico
con Expo Go), copiar `frontend/.env.example` como `frontend/.env` y definir `EXPO_PUBLIC_API_URL`
con la IP de la PC en la red local (ej. `http://192.168.0.10:8080`). Después de cambiarla,
reiniciar `npx expo start`. La lógica está en [`frontend/src/api/config.js`](frontend/src/api/config.js).

### Cuenta de prueba (entorno local)

Con el perfil `dev`, si la base está vacía, el backend carga datos de ejemplo al arrancar,
incluido este usuario:

| Email | Password |
|-------|----------|
| `test@subastapro.com` | `password123` |

Usuario con KYC activo, categoría **plata** y una tarjeta ARS verificada con saldo (sirve para
inscribirse y pujar).

### Credenciales

Las credenciales de la base y el secret de JWT se leen de variables de entorno o de
`backend/.env`; no hay secrets en el código. Versiones anteriores del repo tenían la contraseña de
la base hardcodeada; esa contraseña ya fue revocada.

---

## 🧱 Stack

### Backend
- Java 17 · Spring Boot 3.4.5 · Spring Data JPA + Hibernate
- PostgreSQL (Supabase) / H2 (perfil `test`)
- Auth con JWT (access + refresh) · Maven · Lombok
- OpenAPI 3 / Swagger UI (springdoc)

### Frontend
- React Native + Expo SDK 56
- Estado con Hooks (`useState` / `useEffect`)
- `axios` (interceptor que inyecta el JWT) · `@react-navigation/native-stack`
- `@react-native-async-storage/async-storage` · pujas en vivo con `@stomp/stompjs` (WebSocket)

---

## 📁 Estructura

```
SubastaPro/
├── backend/    ← Spring Boot (API REST + WebSocket)
└── frontend/   ← React Native (Expo)
```

Documentación completa del dominio, reglas de negocio y endpoints: ver [`CLAUDE.md`](CLAUDE.md).

---

## 📡 Convenciones de la API

- Base URL: `http://localhost:8080` en local.
- Auth: header `Authorization: Bearer {access_token}`.
- Todas las respuestas viajan dentro del wrapper `ApiResponse<T>` (`{ success, message, data }`);
  los listados dentro de `PagedResponse<T>`.

El listado completo de endpoints está en Swagger UI y en [`CLAUDE.md`](CLAUDE.md) (§9).

---

## 👥 Equipo

- Forteza Simón
- Addamo Juan Segundo
- Dillon Lucio

User interface developed in React with Vite. Implements a login screen connected to Keycloak, authentication state management (AuthContext), automatic JWT token injection through Axios interceptors (with visible console logs), and screens for viewing and creating books.

# Frontend Dashboard — BookVault

App React (Vite) con autenticación completa vía LDAP + Keycloak OAuth2/OIDC.

## Pantallas

- **`/login`** — formulario de login, llama al endpoint de Keycloak para obtener el JWT
- **`/dashboard`** — listado de libros (GET /books con Bearer token)
- **`/add`** — formulario para agregar libros (POST /books con Bearer token)

## JWT en cada request

El archivo `src/api/axios.js` contiene un interceptor que:
1. Lee el token de `localStorage`
2. Lo inyecta como `Authorization: Bearer <token>` en cada solicitud
3. Imprime un `console.log` colorido en DevTools con la URL, método y token

## Instalar y correr

```bash
npm install
npm run dev
```

La app corre en **http://localhost:5173**.

## Variables de entorno (`.env`)

```env
VITE_KEYCLOAK_URL=http://localhost:8081
VITE_KEYCLOAK_REALM=cybersecurity
VITE_KEYCLOAK_CLIENT_ID=fastapi-api
VITE_API_BASE_URL=http://localhost:8001
```

## Usuarios de prueba

| Usuario | Contraseña |
|---------|------------|
| alice   | alice123   |
| bob     | bob123     |

# TruequesYa

Aplicación web de trueques: los usuarios publican productos y reciben ofertas de otros usuarios para intercambiarlos, con moderación de las publicaciones. Proyecto de formación del Tecnólogo en Análisis y Desarrollo de Software (ADSO) del SENA.

## Descripción

TruequesYa permite:

- Registrarse e iniciar sesión (roles: Usuario, Moderador y Administrador).
- Crear productos con fotografía y publicarlos ("lanzar al público").
- Ofertar un producto propio por una publicación, indicando cantidad y mensaje.
- Aceptar o rechazar las ofertas recibidas.
- Moderar las publicaciones (aprobar o rechazar).
- Consultar notificaciones e historial de trueques.

## Tecnologías

| Parte | Tecnología |
|-------|------------|
| Frontend | React (Vite) + React Router |
| Backend | Node.js |
| Base de datos | MySQL (InnoDB) |
| Control de versiones | Git y GitHub |

## Estructura del proyecto

```
truequesya/
├── frontend/      # Aplicación React
├── backend/       # API en Node.js
├── database/      # Scripts SQL (estructura y datos de prueba)
├── .gitignore
└── README.md
```

## Requisitos

- [Node.js](https://nodejs.org/) (versión LTS) y npm
- [Git](https://git-scm.com/)
- [MySQL](https://www.mysql.com/) 8.x (para la base de datos)

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/USUARIO/truequesya.git
   cd truequesya
   ```

2. Instalar y ejecutar el frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   La aplicación queda disponible en http://localhost:5173

3. Base de datos: abrir MySQL y ejecutar el script de la carpeta `database/` para crear la base `truequesya` con sus 6 tablas (Usuario, Producto, Publicacion, Mensaje, Trueque, Notificacion).

4. Backend (en construcción):

   ```bash
   cd backend
   npm install
   ```

   Copiar `.env.example` a `.env` y completar los datos de conexión a la base de datos.

## Flujo de trabajo con Git

- `main`: versión estable, lista para entregar.
- `develop`: integración del trabajo en curso.
- `feature/nombre-de-la-funcionalidad`: una rama por cada funcionalidad nueva.

Mensajes de commit: `tipo: descripción corta` (por ejemplo `feat: agrega pantalla de ofertas recibidas`, `fix: corrige validación del registro`, `docs: actualiza el README`).

## Autor

Cristian — Aprendiz SENA, ADSO.

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
   git clone https://github.com/CruzPCristian/truequesya.git
   cd truequesya
   ```

2. Instalar y ejecutar el frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   La aplicación queda disponible en http://localhost:5173

3. Base de datos: el modelo es el v6 (base `truequesya`, 6 tablas: Usuario, Producto, Publicacion, Mensaje, Trueque y Notificacion). El script SQL se agregará dentro de `backend/` como migración (tarea TY-05 del tablero).

4. Backend (en construcción): la carpeta `backend/` todavía no tiene código. La API con Express y MySQL se crea en la tarea TY-06 del tablero.

## Flujo de trabajo con Git

- `main`: versión estable, solo lo que se entrega.
- `develop`: integración, aquí se juntan las tareas terminadas (solo por pull request).
- `feature/TY-NN-nombre`, `fix/TY-NN-nombre`, `docs/TY-NN-nombre`: una rama por tarea; se integran a `develop` por pull request.

Mensajes de commit: Conventional Commits en español, con el formato `tipo(alcance): descripción corta`. Ejemplo: `feat(ofertas): aceptar oferta y crear el trueque`.

## Autor

Cristian Cruz — Aprendiz SENA, ADSO, ficha 3336056, cruzpaezcristian@gmail.com.

# 🎮 GameDrog

<div align="center">

### E-commerce full stack de videojuegos y tecnología

Aplicación web desarrollada para simular una tienda online moderna, integrando frontend, backend y base de datos en una solución escalable.

![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-API-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-UI-7952B3?logo=bootstrap&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)

</div>

---

## 📌 Descripción

**GameDrog** es un proyecto de e-commerce desarrollado como aplicación **full stack**, orientado a la venta de videojuegos y productos relacionados.  
Su propósito es ofrecer una experiencia visual atractiva, moderna y funcional, permitiendo al usuario explorar productos, agregarlos al carrito y navegar por una interfaz responsiva.

Además de su enfoque visual, el proyecto fue pensado como una base sólida para seguir creciendo, incorporando integración con API, conexión a base de datos, autenticación y futuras mejoras orientadas a una experiencia más completa.

---

## ✨ Objetivo del proyecto

Este proyecto fue creado con el objetivo de poner en práctica habilidades de desarrollo web, abordando aspectos clave como:

- Construcción de interfaces dinámicas.
- Navegación entre vistas.
- Manejo de estado global.
- Conexión entre cliente y servidor.
- Consumo de datos desde una API.
- Persistencia de información en base de datos relacional.
- Organización de un proyecto escalable.

GameDrog representa una propuesta que combina diseño, funcionalidad y estructura técnica en un entorno similar al de una tienda online real.

---

## 🚀 Funcionalidades principales

🏠 Página de inicio con identidad visual temática
🛍️ Visualización de catálogo de productos
🛒 Carrito de compras con gestión de productos
👤 Registro e inicio de sesión
⚙️ Base para panel de administración
📦 Integración con backend para obtención y gestión de productos
🗄️ Persistencia de datos con PostgreSQL
📱 Diseño adaptable a distintos dispositivos

---

## 🧰 Tecnologías utilizadas

### Frontend
- **React**
- **React Router DOM**
- **Bootstrap 5**
- **CSS3**
- **JavaScript (ES6+)**
- **Vite**

### Backend
- **Node.js**
- **Express.js**

### Base de datos
- **PostgreSQL**
- **pg**

### Herramientas complementarias
- **Git**
- **GitHub**
- **Visual Studio Code**
- **Thunder Client**
- **pgAdmin**

---

## 🏗️ Arquitectura del proyecto

La aplicación está construida bajo una arquitectura **cliente-servidor**, donde cada parte cumple una función específica:

- El **frontend** gestiona la interfaz y la interacción del usuario.
- El **backend** administra la lógica de negocio y expone rutas API.
- La **base de datos PostgreSQL** almacena la información de los productos.
- La comunicación entre estas capas permite mostrar contenido dinámico y preparar el sistema para futuras funcionalidades administrativas.

---

## 📁 Estructura del proyecto

```bash
GameDrog/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── productosController.js
│   ├── routes/
│   │   └── productosRoutes.js
│   ├── app.js
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   ├── views/
│   │   │   ├── Home.jsx
│   │   │   ├── Productos.jsx
│   │   │   ├── Carrito.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Registro.jsx
│   │   │   ├── PerfilUsuario.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md

---
👤 Experiencia del usuario

Dentro de la aplicación, el usuario puede:

navegar por la tienda de forma intuitiva,
revisar los productos disponibles,
agregar artículos al carrito,
registrarse e iniciar sesión,
interactuar con una interfaz moderna y coherente con la temática del proyecto.

La experiencia fue diseñada para ser clara, visualmente atractiva y adaptable a diferentes tamaños de pantalla.

⚙️ Enfoque administrativo

El proyecto contempla una estructura preparada para escalar hacia una experiencia más completa de administración, permitiendo a futuro:

crear productos,
editar información,
eliminar productos,
gestionar stock,
diferenciar entre usuario normal y administrador.

Esto convierte a GameDrog en un proyecto con proyección real de crecimiento.

🔌 Endpoints principales

Ejemplo de rutas utilizadas en el backend:

GET /api/productos
POST /api/productos
PUT /api/productos/:id
DELETE /api/productos/:id

Estas rutas permiten conectar el frontend con la base de datos para la gestión de productos.

🗃️ Modelo de datos

La tabla principal del proyecto corresponde a los productos de la tienda.
Algunos de los campos considerados son:

id
nombre
precio
stock
imagen
categoria
subcategoria
descripcion

Esta estructura permite organizar correctamente la información y presentarla de forma dinámica en el catálogo.

🎨 Diseño y enfoque visual

Uno de los puntos importantes de GameDrog es su presentación visual.
El proyecto busca mantener una estética moderna, temática y coherente con el mundo gaming, apoyándose en:

uso de Bootstrap como base de diseño,
estilos personalizados en CSS,
componentes reutilizables,
diseño responsive,
y una interfaz pensada para mejorar la experiencia del usuario.
💻 Instalación y ejecución
1. Clonar el repositorio
git clone https://github.com/LeBrokennn/GameDrog.git
2. Ingresar al proyecto
cd GameDrog
3. Instalar dependencias
Frontend
npm install
Backend
npm install
4. Ejecutar el proyecto
Frontend
npm run dev
Backend
node index.js
📈 Mejoras futuras

Entre las mejoras proyectadas para GameDrog se encuentran:

autenticación con roles de usuario,
panel de administración funcional,
filtros avanzados por categoría,
vista detallada de producto,
integración con pasarela de pago,
despliegue completo en servidor,
optimización de experiencia de usuario.
📌 Estado del proyecto

🚧 En desarrollo

Actualmente el proyecto continúa en proceso de mejora visual, optimización de funcionalidades e integración más completa entre frontend, backend y base de datos.

👩‍💻 Autora

Javiera
Desarrolladora en formación, enfocada en el aprendizaje y desarrollo de proyectos web full stack.

🔗 GitHub: LeBrokennn

🌟 Valor del proyecto

GameDrog no solo representa una tienda online en desarrollo, sino también un proyecto que demuestra aprendizaje, evolución técnica y capacidad de integrar distintas tecnologías en una misma solución.
Es una muestra de trabajo orientada a portafolio, donde se combinan diseño, estructura y lógica de programación en una aplicación con potencial de crecimiento.



# 📘 Documentación - Proyecto HubSpot

Este proyecto fue creado con el objetivo de desarrollar un CRUD que se comunique con la API de contactos de **HubSpot**.

## 🧠 Tecnologías Utilizadas

### Backend

El backend fue desarrollado con **NestJS**, elegido por su arquitectura limpia y totalmente alineada con los principios **SOLID** (controladores, servicios, modelos, entidades, DTO). Esto permitió un desarrollo rápido y eficiente del CRUD de contactos.

NestJS es un framework ligero, que instala únicamente las dependencias necesarias, sin sobrecargar el proyecto. Además, incluye un sistema de autenticación sencillo y rápido de implementar.

### Frontend

El frontend fue construido completamente con **Vanilla JS** y **Bootstrap**, cumpliendo con el requerimiento de mantener la interfaz simple. Se utilizó **Vite** como bundler para facilitar el desarrollo y la construcción del proyecto de forma ágil.

---

## 🚀 Introducción

### 1. Clonar el repositorio
```bash
git clone https://github.com/LF236/hubspot.git
```

### 2. Acceder al directorio del proyecto
```bash
cd hubspot
```

### 3. Instalar dependencias
```bash
yarn install
```

### 4. Configurar variables de entorno

Copiar el archivo `.env.template` y crear uno nuevo llamado `.env`, luego completar con las siguientes variables:

- `KEY_HUB`: Token de acceso para conectar a la API de HubSpot.
- `JWT_SECRET`: Semilla utilizada para generar los tokens de autenticación.

### 5. Levantar el proyecto
```bash
yarn run start:dev
```

### 6. Ejecutar pruebas unitarias

Para correr las pruebas unitarias usando **Jest** (ya incluido en el proyecto):

```bash
yarn run test
```

---

## 🌐 Acceso a la Aplicación

- URL principal: [http://localhost:3000/](http://localhost:3000/)
- Usuario: `admin@admin.com`
- Contraseña: `12345678`

Una vez autenticado, se puede interactuar con el **dashboard**, que permite:

- Agregar contactos
- Listar contactos
- Eliminar contactos
- Actualizar contactos

> Todos los endpoints están protegidos mediante JWT, el cual se genera al iniciar sesión.

---

## 🗂 Estructura del Proyecto

- El frontend se encuentra dentro del directorio `front/`.
- Ya incluye un build precompilado.
- Sin embargo, si deseas volver a generar el build, puedes hacerlo de la siguiente manera:

```bash
cd front
npm run build
```

Esto generará nuevamente el directorio `dist/`, listo para ser servido por el backend en NestJS.

---

## 📎 Anexos

### 🧾 Endpoints del Backend

#### 📁 Contactos

- `GET /contacts`  
  Listar todos los contactos.

- `GET /contacts/{id}`  
  Obtener información de un contacto por ID.

- `GET /contacts/email/{email}`  
  Buscar un contacto por correo electrónico.

- `POST /contacts`  
  Crear un nuevo contacto.  
  **Ejemplo de body:**
  ```json
  {
    "email": "fernandorodriguez2363@gmail.com",
    "firstname": "Fernando",
    "lastname": "Rodriguez",
    "phone": "228 2821007656"
  }
  ```

- `PATCH /contacts/{id}`  
  Actualizar un contacto por ID. El body es el mismo que en el POST.

- `DELETE /contacts/{id}`  
  Eliminar un contacto por ID.

> Todos los endpoints de contactos requieren el header:
```http
Authorization: Bearer <token generado en login>
```

#### 🔐 Autenticación

- `POST /auth/login`  
  Iniciar sesión.  
  **Ejemplo de body:**
  ```json
  {
    "email": "admin@admin.com",
    "password": "12345678"
  }
  ```

---


## 📩 Contacto

Para cualquier duda o sugerencia, puedes escribir a:

**fernandocontacto236@gmail.com**

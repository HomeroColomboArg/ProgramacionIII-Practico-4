# AlumnAPI

- Trabajo Practico N°4 
- Materia: Programacion III - Primer Cuatrimestre, 2do año 📚

## 📖 ¿Que es AlumnAPI?

Se trata de una **API RESTful** orientada a la gestión académica, específicamente diseñada para administrar un registro de alumnos. Esta API funciona como el motor de *back-end* necesario para reemplazar el uso de datos estáticos en aplicaciones web, permitiendo interactuar con la información de manera dinámica.

A nivel funcional, el sistema provee **operaciones CRUD completas** (Crear, Leer, Actualizar y Eliminar). Esto permite registrar nuevos estudiantes, consultar el padrón total o buscar alumnos específicos por su número de legajo, así como también modificar sus datos o darlos de baja del sistema.

A nivel técnico y arquitectónico, el proyecto fue construido bajo las siguientes ideas:

* **Entorno y Framework:** Desarrollado sobre el entorno de ejecución Node.js utilizando Express para el levantamiento ágil del servidor y la gestión de las rutas HTTP.
* **Arquitectura MVC:** Implementamos el patrón Modelo-Vista-Controlador para garantizar un código modular y escalable. Esto nos permitió separar estrictamente la definición de los endpoints (`/routes`), la lógica de negocio (`/controllers`) y el acceso a los datos (`/models`).
* **Tipado y Validaciones:** Utilizamos **TypeScript** de la mano con Programación Orientada a Objetos para crear clases y modelos de datos. Esto asegura que la información que ingresa a la API cumpla con los formatos y tipos requeridos antes de ser procesada.
* **Persistencia Simulada:** El almacenamiento de los registros interactúa directamente con archivos `.json` mediante el uso del módulo `fs`. Todas estas operaciones de lectura y escritura se manejan de forma asíncrona (`try/catch`), emulando el comportamiento de una base de datos real sin bloquear el hilo principal del servidor.
* **DevOps y Deploy:** El entorno de la aplicación fue completamente contenerizado utilizando **Docker** a través de un archivo `Dockerfile`, garantizando su portabilidad en cualquier sistema. Posteriormente, la imagen fue desplegada en producción utilizando los Web Services de la plataforma **Render**.

## 👥 Integrantes - Grupo 19
- [@fedeheinrich](https://github.com/fedeheinrich) - Federico Heinrich
- [@Oviedo-Matias](https://github.com/Oviedo-Matias) - Matias Oviedo
- [@Tincho2319](https://github.com/Tincho2319) - Martin Alcaraz
- [@Nahuelete](https://github.com/Nahuelete) - Nahuel Cappa
- [@nicc-essp](https://github.com/nicc-essp) - Nicolas Espulef
- [@HomeroColomboArg](https://github.com/HomeroColomboArg) - Homero Colombo

## 🛠️ Metodología de Trabajo

Para mantener el repositorio organizado entre los seis, utilizamos la estrategia de ramificación **Git Flow** y los **estandares de contribución** detallados más abajo.

### Estrategia de Ramificación Git Flow

* main: Código en su version estable y completa (V1.0).

* release/x.0 : Preparacion de una nueva version. Se crea cuando develop tiene suficientes funcionalidades para una entrega, sirve para corregir errores menores durante la revision, ajustar numeros de version, actualizar documentacion y **IMPORTANTE: no agregar funcionalidades nuevas**.
    > *Se crea desde **develop***, y una vez que se completa el trabajo en dicha rama (obtenemos la version estable) se realiza el merge a develop y a main para actualizar el codigo en ambas ramas.
* develop: rama de desarrollo.

* feature/nombre-de-la-funcionalidad: Para crear nuevas funcionalidades. 
    > *Se crea desde **develop*** para trabajar en una nueva funcion a implementar. Una vez completada la funcionalidad, se hace el merge a develop y se elimina la rama.

* hotfix: Correcion urgente de un error que se encuentra en main.
    > Cuando encontramos un error importante en la version estable, *se crea desde **main*** para trabajar en la correcion del error y solucionarlo lo antes posible. Una vez corregido el bug, se hace el merge a main y a develop.

### Estandares de contribución

- **Commits**: Utilizar titulos descriptivos con el formato `tipo: descripción`. 
    > Ejemplo: `feat: implementación de login` o `fix: corrección de ruta API`.

- **Revisiones de Pull Requests (PR)**: Al menos un compañero de equipo debe revisar una solicitud de incorporacion de cambios antes de fusionarla (merge) con develop.

## 🗂️ División de Archivos

A continuación, se detalla la responsabilidad de cada integrante sobre los archivos del repositorio:

| Responsable | Archivos y Carpetas Principales | Funcionalidad / Módulo |
| :--- | :--- | :--- |
| **Martin Alcaraz** | `profesor.controller.js`,`profesor.routes.js` | Gestión de profesores (CRUD y Endpoints) |
| **Federico Heinrich** | `README.md`, `Dockerfile`, `.dockerignore`, `.gitignore`, `package.json`,`package-lock.json`,`pnpm-lock.yaml`, `.env`  | Documentación técnica, instalacion y configuracion de dependencias con pnpm |
| **Matias Oviedo** | `alumno.controller.js`, `alumno.routes.js` | Gestión de alumnos (CRUD y Endpoints) |
| **Nahuel Cappa** | `nota.routes.js`,`nota.controller.js`| Gestión de notas y calificaciones (CRUD y Endpoints) |
| **Homero Colombo** |`materia.routes.js`,`materia.controller.js` | Creación del repositorio y Gestión de Materias (CRUD y Endpoints) |
| **Nicolas Espulef** |`alumno.model.ts`,`persona.model.ts`,`profesor.model.ts`, `nota.model.ts`, `clase.model.ts` | Modelado de los objetos del sistema y validaciones con Typescript |

## 📂 Estructura del Proyecto
    ProgramacionIII-Practico-4/  
    │── app.js                             # Archivo principal que inicializa la aplicación.                  
    ├── package.json
    ├── pnpm-lock.yaml                           
    │── .gitignore                         # Archivos y carpetas ignorados por el control de versiones (incluye `node_modules`).
    │── controllers/                       # Lógica de negocio y manejo de las peticiones respuestas.
    │   ├── alumnoController.js
    │   ├── profesor.controller.js
    │   ├── materia.controller.js
    │   └── nota.controller.js
    │── data/                               # Directorio donde se almacena el archivo `alumnos.json` que actúa como base de datos estática.
    │   ├── sys-materias.json
    │   ├── sys-notas.json
    │   ├── sys-profesores.json
    │   └── alumnos.json
    │── models/                            # Clases en TypeScript utilizadas para instanciar y validar los objetos (ej. `alumno.model.ts`).
    │   ├── materia.model.ts
    │   ├── nota.model.ts
    │   ├── profesor.model.ts   
    │   ├── alumno.model.ts
    │   └── persona.model.ts
    │── core/
    │   └── server.js                       # Configuración y levantamiento del servidor HTTP.
    │── routes/                             # Definición de los endpoints de la API (alumnos).
    │    ├── materia.routes.js
    │    ├── nota.routes.js       
    │    ├── profesor.routes.js       
    │    └── alumno.routes.js
    │── persistence/
    │        ├── sys-database-models/
    │        │                       ├── sys-fake-database.model.ts
    │        │                       └── sys-log.database.model.ts
    │        └── a.txt
    ├── Dockerfile
    ├── .dockerignore
    └── README.md               # Documentacion general

## Endpoints y Documentación en Postman

**Documentación Completa:** &nbsp;<a href="https://documenter.getpostman.com/view/24385288/2sBXwmRtUh"><img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" align="center" height="28"></a>

### Rutas Disponibles

| Método | Endpoint | Descripción | Respuestas HTTP |
| :--- | :--- | :--- | :--- |
| 🟢 `GET` | `/alumnos` | Retorna el listado completo de todos los alumnos registrados en el sistema. | `200`, `500` |
| 🟢 `GET` | `/alumnos/:id` | Retorna la información de un alumno específico mediante su legajo. | `200`, `404`, `500` |
| 🔵 `POST` | `/alumnos` | Registra un nuevo alumno validando previamente los datos del `req.body`. | `201`, `400`, `409`, `500` |
| 🟠 `PUT` | `/alumnos/:id` | Actualiza las propiedades de un alumno existente (no permite modificar el legajo). | `200`, `404`, `500` |
| 🔴 `DELETE` | `/alumnos/:id` | Elimina el registro completo de un alumno de la base de datos a partir de su legajo. | `200`, `404`, `500` |

## 👩‍💻 Funciones

Detallamos el funcionamiento de los métodos principales. Todos utilizan sintaxis asíncrona (`async/await`) y bloques `try/catch` para manejar fallos inesperados.

### Persona

#### Funciones TS (Models)

* `getNombre()`: Retorna el nombre de la persona almacenado en la instancia de la clase.

* `getApellido()`: Retorna el apellido de la persona almacenado en la instancia de la clase.

* `getNombreCompleto()`: Devuelve una cadena de texto combinando el nombre y el apellido de la persona (ej. "Tomás Méndez"), ideal para formatear visualizaciones en el sistema.

* `getEmail()`: Retorna la dirección de correo electrónico validada de la persona.

* `getAllAtributes()`: Devuelve un objeto literal con todos los atributos base de la persona (nombre, apellido y email), facilitando la estructuración de datos antes de su persistencia o envío.

* `setApellido(apellido: string)`: Asigna de manera segura un nuevo apellido a la instancia de la persona.

* `setNombre(nombre: string)`: Asigna de manera segura un nuevo nombre a la instancia de la persona.

* `setEmail(email: string)`: Modifica el correo electrónico de la persona tras verificar que cumpla con el formato correspondiente.

### Alumno

#### Funciones JS (Controllers)

* `getAlumnoAll()`: Abre el archivo JSON correspondiente de manera asíncrona, lo parsea y retorna el array de objetos. En caso de error de lectura, captura la excepción para evitar la caída del servidor.

* `getAlumnoById()`:Itera sobre el array parseado buscando una coincidencia con el legajo provisto; si no encuentra el dato, arroja un estado HTTP 404 de manera controlada.

* `addAlumno()`: Recibe las propiedades desde el `req.body`, realiza la validación mediante el modelo e inserta el nuevo estudiante en el archivo JSON, retornando un estado 201 en caso de éxito o un 409 si el legajo ya existe.

* `updateAlumno()`: Modifica los atributos de un alumno existente basándose en su legajo (`req.params`), protegiendo de forma estricta que el número de legajo original no sea alterado.

* `deleteAlumno()`: Remueve por completo al estudiante del array de datos correspondiente mediante su legajo y vuelve a persistir el archivo JSON actualizado de forma asíncrona.

* `validarAlumno()`: Utiliza las propiedades de la clase modelo para verificar que los tipos de datos recibidos (string, boolean, number) en la petición sean correctos antes de proceder con la inserción o modificación.

#### Funciones TS (Models)

* `getLegajo()`: Retorna el número de legajo único asignado al alumno.

* `getFechaAlta()`: Devuelve la fecha exacta en la que el estudiante fue registrado en el sistema.

* `getModificacion()`: Retorna la marca de tiempo de la última actualización realizada sobre los datos del alumno.

* `getIsActive()`: Devuelve un booleano que indica el estado académico actual (activo/inactivo) del estudiante.

* `setFechaAlta(fecha: string)`: Establece la fecha de alta inicial del registro del alumno.

* `setModificacion(fecha: string)`: Actualiza de forma dinámica la fecha de última modificación cada vez que se alteran las propiedades del objeto.

* `setIsActivate(status: boolean)`: Permite cambiar el estado de actividad del alumno para gestionar bajas lógicas en el sistema.

* `getAllAtributes()`: Combina los atributos heredados de la clase `Persona` junto con los campos específicos de `Alumno` (legajo, fechas y estado) para retornar un objeto completo estructurado.

## ⚙️ Estructura de Datos (JSON)

Los datos de la aplicación se simulan utilizando archivos JSON estáticos ubicados en la carpeta **data/**. A continuación se muestra la estructura de cada uno.

### 1. Alumnos (`alumnos.json`) 
Almacena la información de los alumnos, incluyendo su legajo, nombre, apellido, email, fecha de alta en la universidad, ultima modificación de los datos y el estado academico del alumno.

```json
  {
    "legajo": 10025,
    "nombre": "Tomás",
    "apellido": "Méndez",
    "email": "t.mendez@facultad.edu.ar",
    "fechaAlta": "2026-05-14",
    "modificacion": "2026-05-14",
    "isActive": true
  }
```

### 2. Profesores (`sys-profesores.json`)
Almacena la información del cuerpo docente, incluyendo su identificador, datos personales y especialidad académica.

```json
{
  "idProfesor": 401,
  "nombre": "Gustavo",
  "apellido": "Branchscelli",
  "email": "g.branch@facultad.edu.ar",
  "materia": "Programación Orientada a Objetos"
}
```

### 3. Materias (sys-materias.json)
Contiene el registro de las asignaturas dictadas en la tecnicatura con sus respectivas cargas horarias.

```json
{
  "idMateria": 302,
  "nombre": "Programación III",
  "cuatrimestre": 1,
}
```

### 4. Notas (sys-notas.json)
Asocia las calificaciones finales u parciales obtenidas por los alumnos en una determinada materia.

```json
{
  "idNota": 9001,
  "legajoAlumno": 10025,
  "idMateria": 302,
  "nota": 8.5,
  "fecha": "03-04-24"
}
```

## 🚀 Deploy
| Componente | Servicio | URL |
| :--- | :--- | :--- |
| **API / Backend** | ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white) | [Ver Sitio]() |
| **Frontend** | ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222?style=for-the-badge&logo=github&logoColor=white) | [Ver Sitio]() |



<!-- ### El archivo README.md debe incluir lo siguiente: ###

- Link del deploy en Render.
- Link al repositorio con el front-end. -->

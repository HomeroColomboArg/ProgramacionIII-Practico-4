# AlumnAPI

Materia: Programacion III - Primer Cuatrimestre, 2do año 📚

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
| **Martin Alcaraz** |  | Deploy de la API |
| **Federico Heinrich** | `README.md`, `ROADMAP.md`,  | Documentación técnica |
| **Matias Oviedo** |  | |
| **Nahuel Cappa** | | |
| **Homero Colombo** | |  |
| **Nicolas Espulef** ||  |

## 📂 Estructura del Proyecto
    ProgramacionIII-Practico-4/  
    │── app.js                             # Archivo principal que inicializa la aplicación.
    ├── package-lock.json                    
    ├── package.json
    ├── pnpm-lock.yaml
    ├── settings.json                           
    │── .gitignore  
    │── controllers/
    │   ├── alumnoController.js
    │   ├── 
    │   ├── 
    │   └── 
    │── data/
    │   ├── extras/
    │   │       ├── sys-materias.json
    │   │       ├── sys-notas.json
    │   │       └── sys-profesores.json
    │   └── alumnos.json
    │── core/
    │   └── server.js                       # Configuración y levantamiento del servidor HTTP.
    │── routes/
    │   ├── serviciosRoutes.js
    │   ├── equipoRoutes.js 
    │   ├── perfilRoutes.js 
    │   └── autorizacionRoutes.js 
    ├── ROADMAP.md              # Hoja de ruta y division de tareas
    └── README.md               # Documentacion general

## 4. Estructura del Proyecto


* `/routes/`: Definición de los endpoints de la API (alumnos).
* `/controllers/`: Lógica de negocio y manejo de las peticiones/respuestas (ej. `alumnos.controller.ts`).
* `/models/`: Clases en TypeScript utilizadas para instanciar y validar los objetos (ej. `alumno.model.ts`).
* `/data/`: Directorio donde se almacena el archivo `alumnos.json` que actúa como base de datos estática.
* `.env`: Variables de entorno locales (puertos, configuraciones). Omitido en el repositorio por seguridad.
* `.gitignore`: Archivos y carpetas ignorados por el control de versiones (incluye `node_modules`).

## 5. Endpoints y Documentación en Postman

Todos los endpoints fueron documentados y testeados directamente sobre la URL de producción.

* **URL Base de la API (Render):** `[Pegar link del Web Service]`
* **Documentación Completa (Postman):** `[Pegar link público de la Colección]`

### Rutas Disponibles

* `GET /alumnos`: Retorna el listado completo de todos los alumnos almacenados en el sistema. (Respuestas: 200, 500).
* `GET /alumnos/:id`: Retorna la información de un alumno específico mediante su legajo pasado por parámetro de ruta. (Respuestas: 200, 404, 500).
* `POST /alumnos`: Registra un nuevo alumno validando previamente que los datos enviados en el cuerpo de la petición (`req.body`) sean correctos. (Respuestas: 201, 400, 409, 500).
* `PUT /alumnos/:id`: Actualiza las propiedades de un alumno existente sin permitir la modificación de su número de legajo. (Respuestas: 200, 404, 500).
* `DELETE /alumnos/:id`: Elimina el registro completo de un alumno de la base de datos a partir de su número de legajo. (Respuestas: 200, 404, 500).

## 👩‍💻 Funciones TS

Para cumplir con los estándares requeridos, detallamos el funcionamiento de los métodos principales. Todos utilizan sintaxis asíncrona (`async/await`) y bloques `try/catch` para manejar fallos inesperados.

* `getAllAlumnos()`: Abre el archivo JSON correspondiente de manera asíncrona, lo parsea y retorna el array de objetos. En caso de error de lectura, captura la excepción para evitar la caída del servidor.
* `validarAlumno()`: Utiliza las propiedades de la clase modelo para verificar que los tipos de datos recibidos (string, boolean, number) en la petición sean correctos antes de proceder con la inserción o modificación.
* `buscarPorLegajo(id)`: Itera sobre el array parseado buscando una coincidencia con el legajo provisto; si no encuentra el dato, arroja un estado HTTP 404 de manera controlada.
*(Nota: Agreguen cualquier otra función clave que hayan desarrollado en sus controladores para completar el 90%)*

## ⚙️ Estructura de Datos (JSON)

Muestra de la estructura individual utilizada para registrar a los estudiantes dentro de la colección principal en nuestro archivo `alumnos.json`:

```json
{
  "legajo": 21317,
  "nombre": "Federico",
  "apellido": "Heinrich",
  "edad": 26,
  "activo": true
}
```

## 🚀 Deploys
| Componente | Servicio | URL |
| :--- | :--- | :--- |
| **Frontend** | ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white) | [Ver Sitio]() |
| **API / Backend** | ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white) | [Ver Sitio]() |



# Documentación #
### El archivo README.md debe incluir lo siguiente: ###

- Nombre del proyecto
- Un 90% de las funciones explicadas a detalle.
- Documentación con ‘Postman’ de todos los métodos (GET, PUT, DELETE, POST).
- Mínimo un ejemplo de la estructura de cada archivo JSON utilizado (no integrar varios “arrays” en un mismo archivo).
- Link del deploy en Render.
- Link al repositorio con el front-end.

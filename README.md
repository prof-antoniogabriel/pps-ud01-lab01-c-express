# Proyecto C · API de avisos de seguridad (Node.js/Express)

Proyecto didáctico para **UD01-LAB01. Radiografía de proyectos**. Una API de avisos sencilla para estudiar cómo se organiza y ejecuta una aplicación JavaScript del lado servidor.

## Reglas del laboratorio

- Trabaja exclusivamente sobre los repositorios facilitados y en tu propio equipo o laboratorio autorizado.
- Para completar el cuestionario Moodle, **identifica los archivos y las líneas de código** que justifican cada respuesta. Este README explica cómo ejecutar la aplicación, pero no sustituye el análisis del código.
- No necesitas modificar el código ni entregar un informe.
- Los datos son de prueba. No publiques esta aplicación en Internet como servicio de producción.

## Preparar y explorar el proyecto

1. Descarga el ZIP del proyecto y extráelo.
2. Abre una terminal **dentro de la carpeta que contiene el archivo principal de dependencias**.
3. Abre la carpeta con VS Code, IntelliJ IDEA u otro editor.
4. Elige **una** de las dos formas de ejecución: local o Docker. No arranques ambas en el mismo puerto simultáneamente.

Los comandos siguientes asumen una terminal de Linux/macOS (o WSL en Windows). `curl` puede ejecutarse en otra terminal mientras el servidor sigue en marcha.

## Requisitos para ejecución local

- **Node.js 22 o superior** y **npm**.
- Verifica: `node --version` y `npm --version`.

## Opción 1 · Ejecutar con npm

Desde la raíz del proyecto:

```bash
npm install
npm start
```

Cuando el servidor esté iniciado, visita `http://localhost:3000/health` o consulta la API con `curl`. La primera instalación requiere acceso al registro de npm.

Para desarrollo con reinicio automático por cambios:

```bash
npm run dev
```

Detén el servidor con `Ctrl+C`.

## Configuración de variables de entorno

El ejemplo `.env.example` muestra las variables admitidas. **Este proyecto no carga automáticamente `.env`**, por lo que copiar el archivo no cambia la configuración por sí solo.

En Linux/macOS puedes arrancar con valores personalizados:

```bash
PORT=3001 APP_NAME='Mi API de avisos' npm start
```

En PowerShell:

```powershell
$env:PORT='3001'
$env:APP_NAME='Mi API de avisos'
npm start
```

Si cambias el puerto, utiliza el nuevo en las URL. No guardes credenciales en archivos versionados.

## Pruebas y comprobaciones del proyecto

```bash
npm test
npm run build
```

En este proyecto, el script `build` **solo verifica sintaxis JavaScript**: no transpila, no crea bundle y no genera un ejecutable. El código se ejecuta directamente en Node.js.

## Opción 2 · Ejecutar con Docker

```bash
docker build -t lab01-express .
docker run --rm --name lab01-express -p 3000:3000 lab01-express
```

En otra terminal prueba `curl -i http://localhost:3000/health`. Detén con `Ctrl+C` o `docker stop lab01-express`. Si deseas publicar en otro puerto del host, usa `-p 3001:3000`.

## Probar la API

| Método | Ruta | Resultado esperado |
| --- | --- | --- |
| GET | `/health` | Estado de la aplicación |
| GET | `/api/notices` | Listado de avisos |
| GET | `/api/notices/1` | Detalle del primer aviso |
| POST | `/api/notices` | Nuevo aviso (HTTP 201) |

```bash
curl -i http://localhost:3000/health
curl -i http://localhost:3000/api/notices
curl -i http://localhost:3000/api/notices/1
curl -i -X POST http://localhost:3000/api/notices \
  -H 'Content-Type: application/json' \
  -d '{"title":"Comprobar accesos","severity":"high"}'
```

Los valores admitidos de `severity` son `low`, `medium` y `high`, en minúsculas.

## Datos y almacenamiento

No se necesita instalar una base de datos. El proyecto utiliza una colección de avisos en memoria: se reinicia al detener el servidor. No se ofrece persistencia entre ejecuciones.

## Problemas frecuentes

- **`node` o `npm` no encontrados**: instala Node.js y reinicia la terminal.
- **`ERR_MODULE_NOT_FOUND` o no se encuentra `express`**: ejecuta `npm install` en la raíz del proyecto.
- **Puerto 3000 ocupado**: establece `PORT=3001` o cambia el mapeo de Docker.
- **HTTP 400 en POST**: comprueba JSON, título y `severity`.
- **Se modifica `.env` y no cambia nada**: configura las variables en el entorno de ejecución; la aplicación no incluye un cargador de `.env`.

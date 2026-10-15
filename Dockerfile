# Imagen base ligera con Node.js 22.
# La variante alpine utiliza una distribución Linux mínima,
# lo que permite reducir el tamaño final de la imagen.
FROM node:22-alpine

# Establece /app como directorio de trabajo dentro del contenedor.
# Los siguientes comandos se ejecutarán tomando esta ruta como referencia.
WORKDIR /app

# Copia los archivos de definición de dependencias.
# package.json contiene los scripts y dependencias del proyecto.
# package-lock.json, si existe, permite reproducir exactamente las versiones instaladas.
COPY package*.json ./

# Instala únicamente las dependencias necesarias para ejecutar la aplicación.
# --omit=dev evita instalar las dependencias de desarrollo,
# como herramientas de test, linting o utilidades no necesarias en producción.
RUN npm install --omit=dev

# Copia el código fuente de la aplicación dentro del contenedor.
COPY src ./src

# Define una variable de entorno indicando que la aplicación
# se ejecuta en modo producción.
ENV NODE_ENV=production

# Documenta que la aplicación escucha en el puerto 3000.
# EXPOSE no publica automáticamente el puerto en el equipo anfitrión.
# Para acceder desde fuera habría que ejecutar, por ejemplo:
# docker run -p 3000:3000 ...
EXPOSE 3000

# Comando que se ejecutará al arrancar el contenedor.
#
# node           -> runtime de JavaScript
# src/server.js  -> archivo que inicia el servidor Express
CMD ["node", "src/server.js"]
# Usar Node.js oficial
FROM node:20-alpine

WORKDIR /app

# Copiar lockfile global y ambos package.json
COPY package.json yarn.lock ./
COPY frontend/package.json frontend/

# Instalar dependencias (respeta el yarn.lock global)
RUN yarn install --frozen-lockfile

# Copiar el código del frontend
COPY frontend ./frontend

# Cambiamos al directorio frontend
WORKDIR /app/frontend

EXPOSE 3000

# Levantar en modo dev (puerto 3006 dentro del contenedor)
CMD ["yarn", "dev", "-p", "3000"]

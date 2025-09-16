FROM node:20-alpine

WORKDIR /app

# Copiar package.json y lockfile
COPY backend/package.json yarn.lock ./

# Instalar dependencias
RUN yarn install --frozen-lockfile

# Copiar el código del backend
COPY backend/. .

# Generar Prisma Client
RUN npx prisma generate

# Puerto del backend
EXPOSE 4000

# Comando para producción
CMD ["yarn", "start"]

# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

# Instala las dependencias locales, incluido Angular CLI
RUN npm install --legacy-peer-deps
RUN npm i --legacy-peer-deps -g @angular/cli

COPY . /app/

# Ejecuta el comando de construcción de Angular CLI
RUN ng build --configuration production

# Stage 2: Nginx para producción
FROM node:21-alpine
## From 'builder' copy published folder
COPY --from=builder /app /app

WORKDIR /app
# Expose the port the app runs in
EXPOSE 4000

USER node

CMD ["node", "dist/Kalos/server/main.js"]

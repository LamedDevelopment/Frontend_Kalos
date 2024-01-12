WORKDIR /usr/src/app

# Copia solo el archivo package.json necesario para instalar las dependencias
COPY package.json .

# Instala las dependencias utilizando PNPM
RUN npm install -g pnpm && pnpm install

# Copia el resto del código
COPY . .

# Construye tu aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copia los archivos estáticos generados por la aplicación a NGINX
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Configura el comando de inicio para NGINX
CMD ["nginx", "-g", "daemon off;"]

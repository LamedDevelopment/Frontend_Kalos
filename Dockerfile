### Stage 1
FROM node:current-slim AS build
WORKDIR /usr/src/app
# COPY ./ /usr/src/app/  # No necesitas copiar aquí si utilizas volúmenes en Docker Compose
RUN npm install --legacy-peer-deps

### No necesitas ejecutar el comando de compilación aquí

### Stage 2
FROM nginx:alpine
VOLUME /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off"]


# RUN npm install --legacy-peer-deps

FROM node:current-slim AS build

RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin

WORKDIR /usr/src/app

COPY package*.json ./
RUN pnpm install

### Stage 2
FROM nginx:alpine
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./

# CMD ["npm", "start"] # Comentamos esta línea ya que no se necesita en la construcción de la imagen de NGINX

# El resto del archivo se mantiene igual

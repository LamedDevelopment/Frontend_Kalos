### Stage 1
FROM node:current-slim AS build
WORKDIR /usr/scr/app
COPY package*.json ./
RUN npm install --legacy-peer-deps
# RUN RUN npm install -g @angular/cli
COPY . .
# RUN npm run build --prod
RUN npm run dev
RUN ls -alt

### Stage 2
FROM  nginx:alpine
COPY --from=build /usr/scr/app/dist/pakki-front /usr/share/nginx/html
COPY --from=build /usr/scr/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
##CMD ["nginx","-g","daemon off"]

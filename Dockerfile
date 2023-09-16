### Stage 1
FROM node:current-slim AS build
WORKDIR /usr/scr/app
COPY ./ /usr/scr/app/
RUN npm install --legacy-peer-deps
ARG configuration=production
RUN npm run build --  --configuration=$configuration
# RUN RUN npm install -g @angular/cli
# COPY . .
# RUN npm run build --prod
# RUN npm run dev
RUN ls -alt

### Stage 2
FROM  nginx:alpine
COPY --from=build /usr/scr/app/dist/Kalos /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
##CMD ["nginx","-g","daemon off"]

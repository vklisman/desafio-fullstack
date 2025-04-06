# Etapa 1: build do app
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm install
RUN npm run build -- --configuration production

# Etapa 2: servir com nginx
FROM nginx:alpine

COPY --from=build /app/dist/frontend /usr/share/nginx/html


# Copiar arquivo de configuração customizado do nginx, se desejar
# COPY nginx.conf /etc/nginx/nginx.conf

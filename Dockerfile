# build stage
FROM node:13-alpine as build-stage

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

# production stage
FROM nginx:1.17-alpine as production-stage

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/build /usr/share/nginx/html
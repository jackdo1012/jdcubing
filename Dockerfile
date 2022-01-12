# build
FROM node:16-alpine3.14 as build

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

# prod
FROM nginx:1.17-alpine as prod

COPY --from=build /app/build/ /usr/share/nginx/html

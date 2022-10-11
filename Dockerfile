# syntax=docker/dockerfile:1
FROM node:16.17.0-alpine

ENV NODE_ENV=development

WORKDIR /src

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

RUN npm run predev

RUN ./scripts/compile-sequelize-files.sh

CMD npm run migrations:run; node ./build/index.js;

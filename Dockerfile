FROM node:14.15.4-alpine3.12

RUN apk add bash

WORKDIR /home/node

COPY . .

RUN npm install

USER node

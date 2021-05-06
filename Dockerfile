FROM node:14.15.4-alpine3.12

RUN apk add bash

WORKDIR /home/node

VOLUME /home/node/node_modules

COPY . .

RUN npm install --global typescript
RUN npm install --global jest 
RUN npm install

USER node


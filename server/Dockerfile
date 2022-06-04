FROM node:lts-alpine
RUN mkdir /back
WORKDIR /back
COPY package.json ./
COPY tsconfig.json ./
COPY yarn.lock ./
RUN yarn
COPY .env .env
COPY src src


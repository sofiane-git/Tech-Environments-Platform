FROM node:lts-alpine
WORKDIR /front
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY tsconfig.*.json ./
RUN yarn install
COPY . .
CMD yarn dev

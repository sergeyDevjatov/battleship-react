FROM node:alpine

ENV PORT=5000

WORKDIR /app

COPY package.json .
RUN npm i
COPY . .

CMD node server

EXPOSE ${PORT}
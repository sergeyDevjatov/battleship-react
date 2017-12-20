FROM node:alpine

ENV PORT=3000

WORKDIR /app

COPY package.json /app
RUN npm i
ADD . /app

CMD npm start

EXPOSE ${PORT}
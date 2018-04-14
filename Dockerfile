FROM node:carbon-alpine

WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app

EXPOSE 3000

CMD ["node", "dist/server.js"]
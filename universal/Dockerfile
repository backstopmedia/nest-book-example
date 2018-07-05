FROM node:carbon-alpine

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

CMD ["node", "dist/server.js"]

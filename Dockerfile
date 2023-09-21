# To create docker image
# FROM node:18, using alpine for less size
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

CMD ["node", "app.js"]

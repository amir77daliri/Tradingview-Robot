FROM node:18-alpine

RUN mkdir react_app
WORKDIR /react_app

ADD . .

RUN npm install

CMD [ "node", "app.js"]
FROM node:20-alpine

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node" , "api/index.js"]
FROM node:14

WORKDIR /app

RUN  npm install @babel/core @babel/node @babel/preset-env nodemon express axios cors mongodb

COPY . .

EXPOSE 4201

CMD ["npm", "run", "serve"]
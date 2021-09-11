FROM node:14

WORKDIR /app

RUN  npm install @babel/core @babel/node @babel/preset-env nodemon express axios cors mongodb dotenv

COPY . .

EXPOSE 4207

CMD ["npm", "run", "serve"]
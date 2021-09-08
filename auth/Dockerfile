FROM node:14

WORKDIR /app

RUN  npm install @babel/core @babel/node @babel/preset-env nodemon express axios cors mongodb bcrypt dotenv jsonwebtoken

COPY . .

EXPOSE 4208

CMD ["npm", "run", "serve"]
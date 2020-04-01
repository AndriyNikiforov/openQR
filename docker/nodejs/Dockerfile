FROM node:lts

WORKDIR "/app"

COPY . .

RUN npm i -g pm2 @adonisjs/cli
RUN npm i

RUN adonis migration:run
RUN adonis seed

CMD ["sh","-c","pm2-runtime start ecosystem.config.js --watch"]

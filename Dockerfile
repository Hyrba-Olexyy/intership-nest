FROM node:16.15.0-alpine 

ARG APP_HOME

ENV APP_HOME /var/www/app/

RUN mkdir -p ${APP_HOME}

WORKDIR ${APP_HOME}

COPY package* ${APP_HOME}

RUN npm ci

RUN npm install -g @nestjs/cli

COPY . ${APP_HOME}

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]


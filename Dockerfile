FROM node:16

COPY . ./app

WORKDIR app

RUN npm i

RUN npm run build

CMD npm run start

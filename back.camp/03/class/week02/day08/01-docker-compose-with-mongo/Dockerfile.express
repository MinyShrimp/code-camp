FROM node:16.14-slim

WORKDIR /app
COPY ./package.json /app
COPY ./yarn.lock /app
RUN yarn install

COPY . /app

EXPOSE 3000:3000
CMD ["yarn", "dev"]
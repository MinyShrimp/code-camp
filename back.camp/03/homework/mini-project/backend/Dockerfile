FROM node:16.14-alpine

WORKDIR /app
COPY ./package.json /app
COPY ./yarn.lock /app

RUN yarn install
RUN apk --no-cache add --virtual builds-deps build-base python3

COPY . /app

EXPOSE 3000
CMD ["yarn", "dev"]
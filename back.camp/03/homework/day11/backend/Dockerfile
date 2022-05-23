FROM node:16.14-alpine
RUN apk --no-cache add --virtual builds-deps build-base python3

WORKDIR /app
COPY ./package.json /app
COPY ./yarn.lock /app

RUN yarn install

COPY . /app

EXPOSE 3000
CMD ["yarn", "dev"]
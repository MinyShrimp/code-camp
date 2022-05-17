FROM node:16.14-slim

WORKDIR /app
COPY . /app

RUN yarn install

EXPOSE 3000:3000
CMD ["yarn", "dev"]
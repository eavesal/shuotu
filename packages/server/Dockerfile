FROM node:12.20-alpine

ENV NODE_ENV=production

WORKDIR /usr/app

COPY package.json ./
COPY .npmrc ./
RUN yarn install --prod

COPY dist/main.js ./

EXPOSE 80

CMD ["node", "main"]
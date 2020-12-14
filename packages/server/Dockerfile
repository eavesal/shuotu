FROM node:12.13-alpine

ENV NODE_ENV=production

WORKDIR /usr/app

COPY package*.json ./
COPY .npmrc ./
RUN npm install --only=production

COPY --from=development /dist/main.js ./

EXPOSE 80

CMD ["node", "main"]
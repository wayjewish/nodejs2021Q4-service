FROM node:16.13.1-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE ${PORT}
CMD [ "npm" , "start" ]
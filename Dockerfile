# Docker:
# https://docs.docker.com/compose/
# https://docs.docker.com/get-started/overview/
# https://www.freecodecamp.org/news/what-is-docker-used-for-a-docker-container-tutorial-for-beginners/
# https://www.youtube.com/watch?v=sv9qA482LcQ&t=3970s

FROM node:14

WORKDIR /usr/src/index

COPY package*.json ./

RUN npm install
# RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD [ "node", "build/index.js" ]
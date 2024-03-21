FROM node:17-alpine
LABEL authors="jba"

WORKDIR /app

COPY package.json .

RUN npm install

#replaced here, has to be in docker compose: https://stackoverflow.com/questions/47942016/add-bind-mount-to-dockerfile-just-like-volume
RUN --mount=type=bind,source=.,target=. ls -al
#COPY . .

EXPOSE 3000

CMD ["npm", "start"]

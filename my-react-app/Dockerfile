FROM node:17-alpine
LABEL authors="jba"

WORKDIR /app

COPY package.json .

RUN npm install

#replaced here
RUN --mount=type=bind,source=.,target=. ls -al
#COPY . .

EXPOSE 3000

CMD ["npm", "start"]

FROM node:16
WORKDIR /home/node/app
COPY app /home/node/app
RUN apt update && apt install -y iputils-ping
RUN npm install
EXPOSE 9999
CMD [ "node", "index.js"]


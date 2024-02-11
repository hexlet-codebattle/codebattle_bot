FROM node:20.11.0 AS bot-image

ENV NODE_ENV=production

WORKDIR /opt/app

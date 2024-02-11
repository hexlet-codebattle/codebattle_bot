FROM node:20.11.0

RUN apt-get update && apt-get install --no-install-recommends -y ca-certificates make curl vim \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/app

ENV NODE_ENV=production

COPY yarn.lock .
COPY package.json .

RUN yarn install --froze-lockfile --production

COPY app app
COPY .babelrc .babelrc

RUN yarn run build

COPY Makefile Makefile

CMD make start

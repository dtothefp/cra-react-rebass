FROM node:12

MAINTAINER dtothefp

RUN mkdir -p /usr/src/app

COPY ./ /usr/src/app
WORKDIR /usr/src/app

RUN yarn

ENV NODE_ENV=production

RUN yarn build

# docker.nginx
FROM nginx:alpine

RUN apk update && apk add git
# forward request logs to Docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /usr/src/app/build /www/data

FROM node:13.10.1-alpine3.11 AS builder

ARG SENTRY_DSN=null
ARG GA_TRACKING_ID=null

ENV WORKDIR=/srv/app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

WORKDIR $WORKDIR

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN yarn build
RUN yarn --production

FROM node:13.10.1-alpine3.11

LABEL maintainer="utvikling@online.ntnu.no"

ENV WORKDIR=/srv/app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

WORKDIR $WORKDIR

COPY --from=builder $WORKDIR/node_modules ./node_modules
COPY --from=builder $WORKDIR/.next ./.next
# COPY --from=builder $WORKDIR/public ./public
COPY --from=builder $WORKDIR/next.config.js ./next.config.js
COPY --from=builder $WORKDIR/package.json ./package.json

EXPOSE 3000

CMD ["yarn", "start", "--hostname", "0.0.0.0"]

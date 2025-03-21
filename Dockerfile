FROM node:22-slim AS builder

# Public variables are only required at build time.
ARG NEXT_PUBLIC_BUILD_TIME_COURSE_LIMIT
ARG NEXT_PUBLIC_GRADES_API_URL
ARG NEXT_PUBLIC_CANONICAL_URL
ARG NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_FEIDE_CLIENT_ID
ARG NEXT_PUBLIC_FEIDE_AUTH_ENDPOINT
ARG GITHUB_TOKEN

ENV NEXT_PRIVATE_GITHUB_TOKEN=$GITHUB_TOKEN
ENV WORKDIR=/srv/app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

WORKDIR $WORKDIR

COPY package.json .
COPY package-lock.json .
RUN npm ci 

COPY . .
RUN npm run build

FROM node:22-slim

LABEL maintainer="utvikling@online.ntnu.no"

ENV WORKDIR=/srv/app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

WORKDIR $WORKDIR

COPY --from=builder $WORKDIR/node_modules ./node_modules
COPY --from=builder $WORKDIR/.next ./.next
COPY --from=builder $WORKDIR/public ./public
COPY --from=builder $WORKDIR/next.config.mjs ./next.config.mjs
COPY --from=builder $WORKDIR/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start", "--","--hostname", "0.0.0.0"]

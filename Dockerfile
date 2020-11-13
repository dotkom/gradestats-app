FROM node:14-slim AS builder

# Public variables are only required at build time.
ARG NEXT_PUBLIC_BUILD_TIME_COURSE_LIMIT
ARG NEXT_PUBLIC_GRADES_API_URL
ARG NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_GA_TRACKING_ID
ARG NEXT_PUBLIC_CANONICAL_URL
ARG NEXT_PUBLIC_FEIDE_CLIENT_ID
ARG NEXT_PUBLIC_FEIDE_AUTH_ENDPOINT

ENV WORKDIR=/srv/app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

WORKDIR $WORKDIR

COPY package.json .
COPY package-lock.json .
RUN npm ci 

COPY . .
RUN npm run build

FROM node:14-slim

LABEL maintainer="utvikling@online.ntnu.no"

# Private variables are required at runtime, and are used by the server only.
ARG NEXT_PRIVATE_FEIDE_CLIENT_SECRET
ARG NEXT_PRIVATE_SESSION_SECRET

# ARG variables are discarded after the image is completed.
# Re-define as ENV to make them available to the server.
ENV NEXT_PRIVATE_FEIDE_CLIENT_SECRET=${NEXT_PRIVATE_FEIDE_CLIENT_SECRET}
ENV NEXT_PRIVATE_SESSION_SECRET=${NEXT_PRIVATE_SESSION_SECRET}

ENV WORKDIR=/srv/app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

WORKDIR $WORKDIR

RUN ls
COPY --from=builder $WORKDIR/node_modules ./node_modules
COPY --from=builder $WORKDIR/.next ./.next
# COPY --from=builder $WORKDIR/public ./public
COPY --from=builder $WORKDIR/next.config.js ./next.config.js
COPY --from=builder $WORKDIR/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start", "--","--hostname", "0.0.0.0"]

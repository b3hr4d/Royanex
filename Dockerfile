FROM quay.io/imaster/node AS builder

WORKDIR /home/node
COPY --chown=node:node . .

ARG BUILD_EXPIRE
ARG BUILD_DOMAIN
ARG REACT_APP_SENTRY_KEY="432d9aa34d764e2293a870675460d13d"
ARG REACT_APP_SENTRY_ORGANIZATION="o428700"
ARG REACT_APP_SENTRY_PROJECT="5427661"

RUN npm i -g yarn

USER node

ENV REACT_APP_SENTRY_KEY=${REACT_APP_SENTRY_KEY}
ENV REACT_APP_SENTRY_ORGANIZATION=${REACT_APP_SENTRY_ORGANIZATION}
ENV REACT_APP_SENTRY_PROJECT=${REACT_APP_SENTRY_PROJECT}

RUN yarn install
RUN ./scripts/build.sh

FROM quay.io/imaster/nginx:latest

COPY --from=builder /home/node/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000

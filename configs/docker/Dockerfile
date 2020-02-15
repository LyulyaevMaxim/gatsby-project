FROM node:current-slim
ENV GATSBY_TELEMETRY_DISABLED 1
WORKDIR /usr/src/app
COPY ./public ./public
COPY ./.cache ./.cache
EXPOSE 9000
RUN yarn add gatsby
CMD ["yarn", "gatsby", "serve", "-H", "0.0.0.0"]

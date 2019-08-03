FROM node:latest
ENV NPM_CONFIG_LOGLEVEL warn
RUN mkdir -p /frontend
WORKDIR /frontend
COPY ./public ./public
RUN yarn add global gatsby-cli
CMD [ "gatsby", "serve"]
FROM node:14-alpine AS build
WORKDIR /app
ADD package.json package-lock.json /app/
RUN npm ci --dev
ADD . /app/
RUN npx tsc

FROM node:14-alpine
ENV NODE_ENV production
WORKDIR /app

ADD package.json package-lock.json /app/
RUN npm ci --prod
COPY --from=build /app/dist/ /app/
COPY ormconfig.ts /app/
EXPOSE 3000
CMD ["node", "-r", "source-map-support/register" , "/app/src/server.js"]

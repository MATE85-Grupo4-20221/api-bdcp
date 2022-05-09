FROM node:14-alpine AS build
WORKDIR /app
ADD package.json package-lock.json /app/
RUN npm ci --dev
ADD . /app/
RUN npx tsc

FROM node:14-slim
ENV NODE_ENV production
WORKDIR /app

ADD package.json package-lock.json /app/
RUN apt-get update && \
  apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
  libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
  libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
  libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
  ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget && \
  apt-get clean && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

RUN npm ci --prod
COPY --from=build /app/dist/ /app/
COPY ormconfig.ts /app/
EXPOSE 3000
CMD ["node", "-r", "source-map-support/register" , "/app/src/server.js"]

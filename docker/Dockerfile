FROM node:22-slim AS pnpm-setup

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install -g pnpm && pnpm install

FROM pnpm-setup AS build

COPY src src
RUN pnpm build

FROM pnpm-setup AS release

COPY --from=build /app/dist dist
COPY --from=build /app/package.json package.json

CMD [ "pnpm", "start:dev" ]
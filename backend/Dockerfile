FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile --production=false

COPY . .

RUN yarn run build

FROM node:20-alpine AS productio

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "dist/main"]

# mintall-nft-cert-api
FROM node:23.6.0 AS builder
WORKDIR /app
COPY package.json .yarnrc.yml yarn.lock ./
COPY .yarn ./.yarn
RUN yarn
COPY . .
RUN yarn build

FROM node:23.6.0 AS runner
WORKDIR /app
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
EXPOSE 3000
CMD ["yarn", "start:dev"]
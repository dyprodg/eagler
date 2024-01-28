# https://dev.to/rupadana/run-nextjs-using-docker-1a38
FROM node:18-alpine as builder
WORKDIR /my-space

COPY package.json package-lock.json ./
ENV NODE_ENV=production
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine as runner
RUN apk add --no-cache curl
WORKDIR /my-space
COPY --from=builder /my-space/package.json .
COPY --from=builder /my-space/package-lock.json .
COPY --from=builder /my-space/next.config.js ./
COPY --from=builder /my-space/public ./public
COPY --from=builder /my-space/.next/standalone ./
COPY --from=builder /my-space/.next/static ./.next/static
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
EXPOSE 3000
CMD node server.js
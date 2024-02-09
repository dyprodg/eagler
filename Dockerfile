FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci
RUN npm install -g --arch=x64 --platform=linux --libc=glibc sharp@0.33.0-rc.2

# Generate Prisma client
FROM base AS prisma-generator
WORKDIR /app
COPY prisma ./prisma/
COPY --from=deps /app/node_modules ./node_modules
RUN npx prisma generate

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=prisma-generator /app/node_modules ./node_modules
COPY --from=prisma-generator /app/prisma ./prisma/
COPY . .
# Uncomment if you want to disable telemetry
# ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment if you want to disable telemetry
# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=deps --chown=nextjs:nodejs /app/node_modules/sharp ./node_modules/sharp
ENV NEXT_SHARP_PATH=/app/node_modules/sharp

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
ARG NODE_VERSION=20.14.0
ARG PORT=4173

# 依赖阶段
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
ENV HUSKY=0
ENV NODE_ENV=production

RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# 构建阶段
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV HUSKY=0
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

# 生产阶段
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

RUN apk add --no-cache libc6-compat tzdata

RUN addgroup --system --gid 1001 nodejs && \
   adduser --system --uid 1001 nextjs

RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules

COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/next-env.d.ts ./
COPY --from=builder /app/postcss.config.js ./
COPY --from=builder /app/tailwind.config.ts ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/locales ./locales

RUN chown -R nextjs:nodejs .

ENV NODE_ENV=production
ENV HUSKY=0
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_SHARP_PATH=/app/node_modules/sharp
ENV TZ=UTC
ENV PORT=${PORT}

USER nextjs

EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
 CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/ || exit 1

CMD ["pnpm", "start"]
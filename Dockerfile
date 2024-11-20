ARG NODE_VERSION=20.14.0
ARG PORT=4173

# 依赖阶段
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./

# 设置环境变量
ENV HUSKY=0 \
    NODE_ENV=production

# 安装所有依赖(包括 devDependencies)
RUN pnpm install --frozen-lockfile --ignore-scripts

# 构建阶段
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

# 复制依赖
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 设置环境变量
ENV HUSKY=0 \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production \
    PORT=${PORT}

# 构建应用
RUN pnpm build

# 生产阶段
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

# 安装必要的系统包并创建用户
RUN apk add --no-cache libc6-compat tzdata && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    npm install -g pnpm

# 只复制必要的文件
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs \
    /app/.next ./.next \
    /app/public ./public \
    /app/next.config.ts \
    /app/package.json \
    /app/pnpm-lock.yaml \
    ./

# 设置环境变量
ENV NODE_ENV=production \
    HUSKY=0 \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_SHARP_PATH=/app/node_modules/sharp \
    TZ=UTC \
    PORT=${PORT}

USER nextjs

EXPOSE ${PORT}

# 健康检查
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/ || exit 1

CMD ["pnpm", "start"]
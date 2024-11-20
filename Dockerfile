ARG NODE_VERSION=20.14.0

# 依赖阶段
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./

# 安装所有依赖(包括 devDependencies)
RUN pnpm install --ignore-scripts

# 构建阶段
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

# 复制依赖和源代码
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 设置环境变量并构建
RUN pnpm build && ls -la

# 生产阶段
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

# 安装必要的系统包并创建用户
RUN apk add --no-cache libc6-compat tzdata && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    npm install -g pnpm

# 复制必要的文件
COPY --from=deps /app/node_modules ./node_modules

# 复制构建产物和配置文件
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/.env ./.env
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts /app/package.json /app/pnpm-lock.yaml /app/postcss.config.js /app/tailwind.config.ts ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# 设置环境变量
ENV NEXT_TELEMETRY_DISABLED=1 \
    NEXT_SHARP_PATH=/app/node_modules/sharp \

USER nextjs

EXPOSE 3000

# 使用数组形式的 CMD 指令
CMD ["pnpm", "start"]
# Build stage
FROM node:20.14.0 AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files first
COPY package.json pnpm-lock.yaml ./

# Install dependencies with cache - disable husky install
ENV HUSKY=0
ENV HUSKY_SKIP_INSTALL=1
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts

# Copy necessary files
COPY . .

# Build with cache and optimization flags
ENV NODE_ENV production
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    --mount=type=cache,target=/app/.next/cache \
    pnpm build

# Remove development dependencies - skip scripts
RUN pnpm prune --prod --no-optional

# Production stage
FROM node:20.14.0-slim AS runner
WORKDIR /app

# Install only essential production tools
RUN npm install -g pnpm

# Set production environment
ENV NODE_ENV production
ENV PORT 4173
ENV HOST 0.0.0.0
ENV HUSKY=0
ENV HUSKY_SKIP_INSTALL=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy production files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/node_modules ./node_modules

# Change ownership
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

EXPOSE 4173

# Start command
CMD ["pnpm", "start", "-p", "4173"]
# Build stage
FROM node:20.14.0 AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Create .npmrc to disable prepare script in production
RUN echo "enable-pre-post-scripts=false" > .npmrc

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
ENV NODE_ENV=production
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --prod

# Copy source files
COPY . .

# Build the application
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    --mount=type=cache,target=/app/.next/cache \
    pnpm build

# Production stage
FROM node:20.14.0-slim AS runner
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Create .npmrc for production
RUN echo "enable-pre-post-scripts=false" > .npmrc

# Set production environment
ENV NODE_ENV=production
ENV PORT=4173
ENV HOST=0.0.0.0

# Create non-root user and setup permissions
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p /home/nextjs/.cache/next-swc && \
    chown -R nextjs:nodejs /home/nextjs

# Copy production files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/.npmrc ./

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Set correct permissions
RUN chown -R nextjs:nodejs /app

# Set home directory for nextjs user
ENV HOME=/home/nextjs

# Switch to non-root user
USER nextjs

EXPOSE 4173

CMD ["pnpm", "start", "-p", "4173"]
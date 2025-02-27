ARG NODE_VERSION=20.14.0
ARG VITE_APP_API_URL
ARG VITE_GOOGLE_CLIENT_ID

# Dependencies stage - only for building
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app

ENV HUSKY=0

RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

# Copy dependencies and Husky scripts
COPY package.json pnpm-lock.yaml ./
COPY .husky/ .husky/

# Install all dependencies, including devDependencies
RUN NODE_ENV=development pnpm install --frozen-lockfile

# Builder stage
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app

ENV HUSKY=0
# Forward the build arguments into environment variables for Vite to use
ARG VITE_APP_API_URL
ARG VITE_GOOGLE_CLIENT_ID
ENV VITE_APP_API_URL=${VITE_APP_API_URL}
ENV VITE_GOOGLE_CLIENT_ID=${VITE_GOOGLE_CLIENT_ID}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm install -g pnpm && \
    pnpm build

# Production stage - Minimal version
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HUSKY=0

RUN apk add --no-cache libc6-compat && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 viteuser

# Copy build artifacts from builder
COPY --from=builder --chown=viteuser:nodejs /app/dist ./dist
COPY --from=builder --chown=viteuser:nodejs /app/public ./public

# Install necessary server for production environment
RUN npm install -g http-server

USER viteuser
EXPOSE 3000

# Use http-server to serve static files
CMD ["http-server", "dist", "-p", "3000", "--cors", "--gzip"]
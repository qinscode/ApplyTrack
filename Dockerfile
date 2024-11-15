# Build stage
FROM node:20.14.0 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install -g corepack && corepack enable
RUN yarn install
COPY . .
RUN yarn build

# Production stage
FROM node:20.14.0-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json yarn.lock ./
EXPOSE 4173
CMD ["./node_modules/.bin/vite", "preview", "--host", "0.0.0.0", "--port", "4173"]
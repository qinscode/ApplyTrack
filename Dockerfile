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
COPY package.json yarn.lock ./
RUN npm install -g corepack && corepack enable
RUN yarn install --production
EXPOSE 4173
CMD ["yarn", "preview", "--host", "0.0.0.0", "--port", "4173"]
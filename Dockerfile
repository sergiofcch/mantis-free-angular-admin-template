# Stage 1: Build the Angular application
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve with Caddy
FROM caddy:2-alpine

# Copy the built Angular app
COPY --from=builder /app/dist /app/dist

# Copy the Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 8080

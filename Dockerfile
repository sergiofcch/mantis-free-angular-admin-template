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

# Copy and prepare the startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080

CMD ["/start.sh"]

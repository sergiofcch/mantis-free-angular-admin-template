#!/bin/bash
set -e

# Get the BACKEND_URL from environment, default to localhost
BACKEND_URL="${BACKEND_URL:-http://localhost:8083}"

# Replace the placeholder in index.html with the actual backend URL
sed -i "s|{{BACKEND_URL}}|${BACKEND_URL}|g" /app/dist/index.html

# Start Caddy
exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile

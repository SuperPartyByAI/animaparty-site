#!/bin/bash
set -e

# Configuration
SERVER="89.167.115.150"
USER="root"
APP_DIR="/var/www/anima-party"
LOCAL_DIR="/Users/universparty/anima-party-site/"

echo "=== Deploying Anima Party to Hetzner ==="

# 1. Create server directory
echo "[1/3] Preparing server directory..."
ssh $USER@$SERVER "mkdir -p $APP_DIR"

# 2. Sync files (excluding node_modules and .git)
echo "[2/3] Syncing files to server..."
rsync -avz --delete --exclude 'node_modules/' --exclude '.git/' --exclude 'dist/' $LOCAL_DIR $USER@$SERVER:$APP_DIR/

# 3. Build project on server
echo "[3/3] Building Astro project on server..."
ssh $USER@$SERVER "cd $APP_DIR && npm install && npm run build"

echo "=== Deploy Complete! ==="
echo "Site has been deployed to $APP_DIR."
echo "Make sure NGINX is configured on the server to serve $APP_DIR/dist for animaparty.ro"

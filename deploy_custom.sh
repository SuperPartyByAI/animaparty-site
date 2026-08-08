#!/bin/bash
set -e

SERVER="89.167.115.150"
USER="root"
APP_DIR="/var/www/anima-party"
LOCAL_DIR="/Users/universparty/anima-party-site/"

echo "1. Building Astro project locally to get HTML..."
npm run build

echo "2. Generating delivery proof into public/..."
node scripts/generate_proof.mjs

echo "3. Syncing files to server..."
rsync -avz --delete --exclude 'node_modules/' --exclude '.git/' --exclude 'dist/' $LOCAL_DIR $USER@$SERVER:$APP_DIR/

echo "4. Building Astro project on server..."
ssh $USER@$SERVER "cd $APP_DIR && npm install && npm run build"

echo "=== Deploy Complete! ==="

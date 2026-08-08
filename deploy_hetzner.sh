#!/bin/bash
# deploy_hetzner.sh

USER="root"
SERVER="89.167.115.150"
APP_DIR="/var/www/anima-party"
LOCAL_DIR="./"
DATE=$(date -u +"%Y%m%dT%H%M%SZ")
RELEASE_ID="animaparty-seo-v8-wave-5r4-${DATE}"

echo "=== Deploying Anima Party to Hetzner ==="

# 1. Update build identity with current release
node scratch/update_identity_wave5r3.cjs "$RELEASE_ID"

# 2. Sync files
echo "[2/4] Syncing files to server..."
rsync -avz --delete --exclude 'node_modules/' --exclude '.git/' --exclude 'dist/' $LOCAL_DIR $USER@$SERVER:$APP_DIR/

# 3. Build Astro and Generate Proof
echo "[3/4] Building Astro project on server..."
ssh $USER@$SERVER "cd $APP_DIR && npm install && RELEASE_ID=$RELEASE_ID npm run build && RELEASE_ID=$RELEASE_ID node scratch/generate_proof.cjs"

# 4. Update NGINX
echo "[4/4] Updating NGINX headers and reloading..."
ssh $USER@$SERVER "
  # Actually just replace it safely everywhere:
  sed -i 's/add_header X-Anima-Deploy .*/add_header X-Anima-Deploy \"$RELEASE_ID\" always;/g' /etc/nginx/sites-available/animaparty.ro
  
  systemctl reload nginx
"

echo "=== Deploy Complete! ==="

#!/bin/bash
set -e

SRC="/home/francois/Téléchargements/49lgzd0v.jpeg"
ICON="/mnt/projets/machshop-mobile/assets/icon-512.png"
DST="/mnt/projets/PrixMalin/prixmalin-web/public/apps/machshop"

[ -f "$SRC" ]  || { echo "❌ Source introuvable : $SRC"; exit 1; }
[ -f "$ICON" ] || { echo "❌ Icône introuvable : $ICON"; exit 1; }

mkdir -p "$DST/raw"

# --- Archive des sources ---
cp "$SRC"  "$DST/raw/screen-1.jpeg"
cp "$ICON" "$DST/raw/logo.png"

# --- Logo 512x512 ---
convert "$ICON" -resize 512x512 "$DST/raw/_tmp-logo.png"
cwebp -q 90 "$DST/raw/_tmp-logo.png" -o "$DST/logo-512.webp"
rm -f "$DST/raw/_tmp-logo.png"

# --- Screenshot -> 720px de large ---
convert "$SRC" -resize 720x "$DST/raw/_tmp-screen.png"
cwebp -q 82 "$DST/raw/_tmp-screen.png" -o "$DST/screen-1.webp"
rm -f "$DST/raw/_tmp-screen.png"

echo
echo "===== VÉRIFICATION ====="
ls -la "$DST"
echo "--- dimensions ---"
identify "$DST"/*.webp

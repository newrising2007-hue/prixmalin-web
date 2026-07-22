#!/bin/bash
set -e
DST="/mnt/projets/PrixMalin/prixmalin-web/public/apps/machshop"
SRC="$DST/raw/screen-2.jpeg"

[ -f "$SRC" ] || { echo "❌ Source archivée introuvable : $SRC"; exit 1; }

cp "$DST/screen-2.webp" "$DST/screen-2.webp.bak"

magick "$SRC" -gravity North -chop 0x62 -gravity South -chop 0x95 \
              -resize 720x "$DST/raw/_tmp.png"
cwebp -quiet -q 82 "$DST/raw/_tmp.png" -o "$DST/screen-2.webp"
rm -f "$DST/raw/_tmp.png"

echo "✔ screen-2 recadré"
identify "$DST"/screen-2.webp

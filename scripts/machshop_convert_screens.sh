#!/bin/bash
set -e

DL="/home/francois/Téléchargements"
DST="/mnt/projets/PrixMalin/prixmalin-web/public/apps/machshop"

S2="$DL/Y8Px5efv.jpeg"   # Trigonometry
S3="$DL/vxV9e_Iy.jpeg"   # Threading

for f in "$S2" "$S3"; do
  if [ ! -f "$f" ]; then
    echo "❌ Introuvable : $f"
    echo "--- images récentes dans Téléchargements ---"
    ls -lat "$DL"/*.{jpg,jpeg,png,webp} 2>/dev/null | head -10
    exit 1
  fi
done

mkdir -p "$DST/raw"

convertir () {
  local src="$1" out="$2" label="$3"
  cp "$src" "$DST/raw/$out.jpeg"
  # crop barre de statut (haut) + nav bar Android (bas)
  magick "$src" -gravity North -chop 0x90 -gravity South -chop 0x95 \
                -resize 720x "$DST/raw/_tmp.png"
  cwebp -quiet -q 82 "$DST/raw/_tmp.png" -o "$DST/$out.webp"
  rm -f "$DST/raw/_tmp.png"
  echo "✔ $label → $out.webp"
}

convertir "$S2" "screen-2" "Trigonometry"
convertir "$S3" "screen-3" "Threading"

echo
echo "===== VÉRIFICATION ====="
ls -la "$DST"
echo "--- dimensions ---"
identify "$DST"/*.webp

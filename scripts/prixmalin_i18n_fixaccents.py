#!/usr/bin/env python3
import json, sys

P = "/mnt/projets/PrixMalin/prixmalin-web/messages/fr.json"
KEY = "machshop_description"
NEW = "Outil de r\u00e9f\u00e9rence du machiniste \u2014 m\u00e8ches, filetage, trigo, m\u00e9tallurgie. Hors-ligne."

DRY = "--apply" not in sys.argv

with open(P, encoding="utf-8") as f:
    data = json.load(f)

old = data["applications"].get(KEY)
print(f"avant : {old}")
print(f"apres : {NEW}")

data["applications"][KEY] = NEW

if not DRY:
    with open(P, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print("--- ECRIT ---")
else:
    print("--- DRY-RUN : relancer avec --apply ---")

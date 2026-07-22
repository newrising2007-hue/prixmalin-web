#!/usr/bin/env python3
"""
Namespace 'magasins' : retire les 7 cles alertes_*, corrige les 3 cles app_*.
MERGE UNIQUEMENT — lecture -> modif ciblee -> reecriture.
"""
import json, sys, os

MSG = "/mnt/projets/PrixMalin/prixmalin-web/messages"

DROP = [
    "alertes_badge", "alertes_titre", "alertes_desc",
    "alertes_placeholder_produit", "alertes_placeholder_prix",
    "alertes_btn", "alertes_soon",
]

SET = {
  "fr": {
    "app_titre": "Disponible sur Android",
    "app_desc": "L'app PrixMalin \u2014 GPS, recherche locale et deals en temps r\u00e9el dans votre poche.",
    "app_btn": "T\u00e9l\u00e9charger sur Google Play",
  },
  "en": {
    "app_titre": "Available on Android",
    "app_desc": "The PrixMalin app \u2014 GPS, local search and real-time deals in your pocket.",
    "app_btn": "Get it on Google Play",
  },
  "es": {
    "app_titre": "Disponible en Android",
    "app_desc": "La app PrixMalin \u2014 GPS, b\u00fasqueda local y ofertas en tiempo real en tu bolsillo.",
    "app_btn": "Desc\u00e1rgala en Google Play",
  },
  "ar": {
    "app_titre": "\u0645\u062a\u0648\u0641\u0631 \u0639\u0644\u0649 \u0623\u0646\u062f\u0631\u0648\u064a\u062f",
    "app_desc": "\u062a\u0637\u0628\u064a\u0642 PrixMalin \u2014 \u062a\u062d\u062f\u064a\u062f \u0627\u0644\u0645\u0648\u0642\u0639\u060c \u0627\u0644\u0628\u062d\u062b \u0627\u0644\u0645\u062d\u0644\u064a \u0648\u0627\u0644\u0639\u0631\u0648\u0636 \u0627\u0644\u0641\u0648\u0631\u064a\u0629 \u0641\u064a \u062c\u064a\u0628\u0643.",
    "app_btn": "\u062d\u0645\u0651\u0644\u0647 \u0645\u0646 Google Play",
  },
  "zh": {
    "app_titre": "\u5df2\u4e0a\u7ebf Android",
    "app_desc": "PrixMalin \u5e94\u7528 \u2014 GPS \u5b9a\u4f4d\u3001\u672c\u5730\u641c\u7d22\u548c\u5b9e\u65f6\u4f18\u60e0\uff0c\u5c3d\u5728\u638c\u4e2d\u3002",
    "app_btn": "\u5728 Google Play \u4e0b\u8f7d",
  },
}

DRY = "--apply" not in sys.argv

for loc, patch in SET.items():
    path = os.path.join(MSG, f"{loc}.json")
    if not os.path.exists(path):
        print(f"[X] {loc}.json introuvable"); sys.exit(1)

    with open(path, encoding="utf-8") as f:
        data = json.load(f)

    ns = data.get("magasins")
    if ns is None:
        print(f"[X] namespace 'magasins' absent dans {loc}.json"); sys.exit(1)

    print(f"\n=== {loc}.json ===")
    for k in DROP:
        if k in ns:
            print(f"  [DROP ] {k} = {ns[k]}")
            ns.pop(k)
        else:
            print(f"  [absent] {k}")
    for k, v in patch.items():
        print(f"  [MODIF] {k}")
        print(f"      avant : {ns.get(k)}")
        print(f"      apres : {v}")
        ns[k] = v

    if not DRY:
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write("\n")

print("\n" + ("--- DRY-RUN : rien ecrit. Relancer avec --apply ---" if DRY else "--- ECRIT ---"))

#!/usr/bin/env python3
"""
Ajoute MachShop au namespace 'applications' des 5 locales.
MERGE UNIQUEMENT — lecture -> modif ciblee -> reecriture.
"""
import json, sys, os

MSG = "/mnt/projets/PrixMalin/prixmalin-web/messages"

DATA = {
  "fr": {
    "description": "Nos logiciels. Android maintenant, Windows & Linux plus tard.",
    "prixmalin_badge": "Gratuit",
    "machshop_titre": "MachShop (Android)",
    "machshop_description": "Outil de reference du machiniste \u2014 meches, filetage, trigo, metallurgie. Hors-ligne.",
    "machshop_badge": "Essai 10 jours \u00b7 4,99 $ CAD",
  },
  "en": {
    "description": "Our software. Android now, Windows & Linux later.",
    "prixmalin_badge": "Free",
    "machshop_titre": "MachShop (Android)",
    "machshop_description": "The machinist's reference tool \u2014 tap & drill, threading, trig, metallurgy. Offline.",
    "machshop_badge": "10-day trial \u00b7 CAD 4.99",
  },
  "es": {
    "description": "Nuestros programas. Android ahora, Windows y Linux m\u00e1s tarde.",
    "prixmalin_badge": "Gratis",
    "machshop_titre": "MachShop (Android)",
    "machshop_description": "Herramienta de referencia del maquinista \u2014 brocas, roscado, trigonometr\u00eda, metalurgia. Sin conexi\u00f3n.",
    "machshop_badge": "Prueba de 10 d\u00edas \u00b7 4,99 CAD",
  },
  "ar": {
    "description": "\u0628\u0631\u0627\u0645\u062c\u0646\u0627. \u0623\u0646\u062f\u0631\u0648\u064a\u062f \u0627\u0644\u0622\u0646\u060c \u0648\u064a\u0646\u062f\u0648\u0632 \u0648\u0644\u064a\u0646\u0643\u0633 \u0644\u0627\u062d\u0642\u0627\u064b.",
    "prixmalin_badge": "\u0645\u062c\u0627\u0646\u064a",
    "machshop_titre": "MachShop (Android)",
    "machshop_description": "\u0627\u0644\u0623\u062f\u0627\u0629 \u0627\u0644\u0645\u0631\u062c\u0639\u064a\u0629 \u0644\u0644\u0645\u0634\u063a\u0651\u0644 \u0627\u0644\u0622\u0644\u064a \u2014 \u0627\u0644\u0645\u062b\u0627\u0642\u0628\u060c \u0627\u0644\u0642\u0644\u0627\u0648\u0648\u0638\u060c \u062d\u0633\u0627\u0628 \u0627\u0644\u0645\u062b\u0644\u062b\u0627\u062a\u060c \u0639\u0644\u0645 \u0627\u0644\u0645\u0639\u0627\u062f\u0646. \u0628\u062f\u0648\u0646 \u0625\u0646\u062a\u0631\u0646\u062a.",
    "machshop_badge": "\u062a\u062c\u0631\u0628\u0629 10 \u0623\u064a\u0627\u0645 \u00b7 4.99 \u062f\u0648\u0644\u0627\u0631 \u0643\u0646\u062f\u064a",
  },
  "zh": {
    "description": "\u6211\u4eec\u7684\u8f6f\u4ef6\u3002\u73b0\u5728\u652f\u6301 Android\uff0cWindows \u548c Linux \u7a0d\u540e\u63a8\u51fa\u3002",
    "prixmalin_badge": "\u514d\u8d39",
    "machshop_titre": "MachShop (Android)",
    "machshop_description": "\u673a\u68b0\u5e08\u7684\u53c2\u8003\u5de5\u5177 \u2014 \u4e1d\u9525\u94bb\u5934\u3001\u87ba\u7eb9\u3001\u4e09\u89d2\u51fd\u6570\u3001\u91d1\u5c5e\u5b66\u3002\u79bb\u7ebf\u53ef\u7528\u3002",
    "machshop_badge": "10 \u5929\u8bd5\u7528 \u00b7 4.99 \u52a0\u5143",
  },
}

DRY = "--apply" not in sys.argv

for loc, patch in DATA.items():
    path = os.path.join(MSG, f"{loc}.json")
    if not os.path.exists(path):
        print(f"[X] {loc}.json introuvable"); sys.exit(1)

    with open(path, encoding="utf-8") as f:
        data = json.load(f)

    ns = data.setdefault("applications", {})
    print(f"\n=== {loc}.json ===")
    for k, v in patch.items():
        old = ns.get(k)
        tag = "MODIF" if k in ns else "AJOUT"
        print(f"  [{tag}] {k}")
        if old is not None:
            print(f"      avant : {old}")
        print(f"      apres : {v}")
        ns[k] = v

    if not DRY:
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write("\n")

print("\n" + ("--- DRY-RUN : rien ecrit. Relancer avec --apply ---" if DRY else "--- ECRIT ---"))

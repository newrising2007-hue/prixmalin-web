#!/usr/bin/env python3
"""applications.description : Windows & Linux -> iOS. MERGE UNIQUEMENT."""
import json, sys, os

MSG = "/mnt/projets/PrixMalin/prixmalin-web/messages"

NEW = {
  "fr": "Nos logiciels. Android maintenant, iOS plus tard.",
  "en": "Our software. Android now, iOS later.",
  "es": "Nuestros programas. Android ahora, iOS m\u00e1s tarde.",
  "ar": "\u0628\u0631\u0627\u0645\u062c\u0646\u0627. \u0623\u0646\u062f\u0631\u0648\u064a\u062f \u0627\u0644\u0622\u0646\u060c iOS \u0644\u0627\u062d\u0642\u0627\u064b.",
  "zh": "\u6211\u4eec\u7684\u8f6f\u4ef6\u3002\u73b0\u5728\u652f\u6301 Android\uff0ciOS \u7a0d\u540e\u63a8\u51fa\u3002",
}

DRY = "--apply" not in sys.argv

for loc, val in NEW.items():
    path = os.path.join(MSG, f"{loc}.json")
    if not os.path.exists(path):
        print(f"[X] {loc}.json introuvable"); sys.exit(1)

    with open(path, encoding="utf-8") as f:
        data = json.load(f)

    ns = data.get("applications")
    if ns is None:
        print(f"[X] namespace 'applications' absent dans {loc}.json"); sys.exit(1)

    print(f"\n=== {loc}.json ===")
    print(f"  avant : {ns.get('description')}")
    print(f"  apres : {val}")
    ns["description"] = val

    if not DRY:
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write("\n")

print("\n" + ("--- DRY-RUN : rien ecrit. Relancer avec --apply ---" if DRY else "--- ECRIT ---"))

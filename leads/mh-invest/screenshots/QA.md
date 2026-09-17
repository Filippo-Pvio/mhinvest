# Interne Qualitätsprüfung

Datum: 17. September 2026

## Ziel-Viewports

- Großer Desktop: 1440 × 900
- Laptop: 1280 × 800
- Tablet: 1024 × 768
- Smartphone: 390 × 844
- Kleines Smartphone: 320 × 568

## Durchgeführte Prüfungen

- Abhängigkeitfreier QA-Build wurde erfolgreich erzeugt.
- Hero-Bild wurde auf 1961 × 802 Pixel und 64 KB WebP optimiert.
- Noindex-Meta-Tag und sperrende `robots.txt` sind vorhanden.
- Seitensprache, H1, Bildabmessungen, Alt-Text, semantische Navigation und CTA-Links sind vorhanden.
- Alle internen Hero-Ziele (`#profil`, `#leistungen`, `#kontakt`) existieren.
- Mobile Navigation besitzt `aria-expanded`, Beschriftungswechsel und schließt nach Auswahl.
- Sichtbare Focus-Zustände und `prefers-reduced-motion` sind umgesetzt.
- Mobile Headline wurde nach visueller Kontrolle verkleinert, damit das längste Wort auch bei 320 Pixeln in den Textbereich passt.
- Verwendete Aussagen wurden gegen die Recherche geprüft; unsichere Erfahrungsjahre, Testimonials, Kennzahlen, Partnerlogos und pauschale Unabhängigkeitsversprechen wurden ausgeschlossen.

## Ansichten

- `desktop-layout-preview.webp`: 1440 × 900
- `mobile-layout-preview.webp`: 390 × 844

Die beiden Dateien sind aus denselben Inhalten, Farben, Bildausschnitten und Layoutwerten erzeugte Layout-Previews. Sie sind keine Browser-Screenshots.

## Offener technischer Prüfpunkt

Ein echter Chromium-Lauf konnte in dieser Ausführungsumgebung nicht abgeschlossen werden: Es ist kein Browser installiert, und sowohl Playwright-CDN, npm-Registry als auch Ubuntu-Paketquellen antworten über den Netzwerkproxy mit HTTP 403. Aus demselben Grund konnte `astro check && astro build` nicht ausgeführt werden, weil Astro nicht lokal vorinstalliert ist.

Der abhängigkeitfreie Preview-Build läuft. Vor einer internen Freigabe sind in einer Umgebung mit Registry- beziehungsweise Browserzugriff noch `npm install`, `npm run build` und der Browserlauf über alle fünf Viewports nachzuholen.

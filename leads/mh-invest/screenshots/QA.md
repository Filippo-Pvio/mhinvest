# Interne Qualitätsprüfung

Datum: 17. September 2026

## Ziel-Viewports

- Großer Desktop: 1440 × 900
- Laptop: 1280 × 800
- Tablet: 1024 × 768
- Smartphone: 390 × 844
- Kleines Smartphone: 320 × 568

## Durchgeführte nicht-browserbasierte Prüfungen

- Abhängigkeitfreier QA-Build wurde erfolgreich erzeugt.
- V2-Hero-Bild wurde auf 1672 × 941 Pixel als WebP optimiert.
- Noindex-Meta-Tag und sperrende `robots.txt` sind vorhanden.
- Seitensprache, H1, Bildabmessungen, Alt-Text, semantische Navigation und CTA-Links sind vorhanden.
- Alle internen Hero-Ziele (`#profil`, `#leistungen`, `#kontakt`) existieren.
- Mobile Navigation besitzt `aria-expanded`, Beschriftungswechsel und schließt nach Auswahl.
- Sichtbare Focus-Zustände und `prefers-reduced-motion` sind umgesetzt.
- Der vom Nutzer bereitgestellte V1-Screenshot belegt das Abschneiden der Mobile-Headline. V2 entkoppelt Text und Bild, kürzt die Headline, setzt eine kleinere responsive Typografie und erlaubt kontrollierten Wortumbruch.
- Verwendete Aussagen wurden gegen die Recherche geprüft; unsichere Erfahrungsjahre, Testimonials, Kennzahlen, Partnerlogos und pauschale Unabhängigkeitsversprechen wurden ausgeschlossen.

## Ansichten

- `desktop-layout-preview-v2.webp`: 1440 × 900
- `mobile-layout-preview-v2.webp`: 390 × 844

Die beiden Dateien sind statisch erzeugte Präsentationsansichten der vorgesehenen Richtung. Sie sind weder Browser-Screenshots noch ein QA-Nachweis und werden ausdrücklich nicht als „visuell geprüft“ bezeichnet.

## Offener technischer Prüfpunkt

Ein echter Chromium-Lauf konnte in dieser Ausführungsumgebung nicht abgeschlossen werden: Es ist kein Browser installiert, und sowohl Playwright-CDN, npm-Registry als auch Ubuntu-Paketquellen antworten über den Netzwerkproxy mit HTTP 403. Aus demselben Grund konnte `astro check && astro build` nicht ausgeführt werden, weil Astro nicht lokal vorinstalliert ist.

Der abhängigkeitfreie Preview-Build läuft. Vor einer internen Freigabe sind in einer Umgebung mit Registry- beziehungsweise Browserzugriff noch `npm install`, `npm run build` und der echte Browserlauf über alle fünf Viewports nachzuholen. Bis dahin bleibt Browser-QA ausdrücklich offen.

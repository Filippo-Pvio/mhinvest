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
- `browser-desktop-1440x900-v2.png`: echter Chromium-Screenshot, 1440 × 900
- `browser-mobile-390x844-v2.png`: echter Chromium-Screenshot, 390 × 844
- `qa-results.json`: Messwerte für alle fünf Ziel-Viewports

Die beiden WebP-Dateien sind weiterhin nur statisch erzeugte Präsentationsansichten. Die PNG-Dateien und `qa-results.json` stammen dagegen aus dem realen Chromium-Lauf.

## Echte Browser-QA

Ausgeführt mit GitHub Actions auf Ubuntu 24.04, Node.js 24, Astro und Playwright Chromium. Workflow-Lauf: https://github.com/Filippo-Pvio/mhinvest/actions/runs/35225442338

- `npm install`: erfolgreich
- `npx playwright install --with-deps chromium`: erfolgreich
- `astro check && astro build`: erfolgreich
- Astro-Preview-Server: erfolgreich gestartet und per HTTP 200 erreicht
- alle fünf Ziel-Viewports tatsächlich in Chromium gerendert
- kein horizontales Overflow
- keine abgeschnittenen oder überstehenden Texte
- primärer CTA in allen Viewports above the fold, sichtbar und korrekt verlinkt
- sekundärer CTA in allen Viewports sichtbar und korrekt verlinkt
- Desktop- und Mobile-Navigation funktionsfähig
- alle Bilder vollständig geladen
- keine Console Errors oder fehlgeschlagenen Requests
- Focus-State am primären CTA sichtbar: 3 px, `solid`
- Reduced Motion aktiv; Animationsdauer auf `0.01ms` reduziert

Der erste Browserlauf deckte horizontales Overflow in der mobilen Leistungsüberschrift und einen unerwünschten Wortumbruch der Hero-H1 auf. Diese rein technischen CSS-Abweichungen wurden korrigiert. Der zweite Lauf gegen Commit `aefde2c97f2bfddd4dfa260603e9deda684197d7` ist vollständig erfolgreich.

## Lokale Containergrenze

Der direkte Arbeitscontainer bleibt ohne Browser-Binary und ohne Astro-Installation. Öffentliche npm-, Playwright- und Ubuntu-Endpunkte werden dort vom Netzwerkproxy mit HTTP 403 blockiert. Für den wiederkehrenden Workflow übernimmt daher der branch-spezifische GitHub-Actions-Workflow die reproduzierbare echte Browser-QA und stellt alle fünf Screenshots sowie die JSON-Messwerte als Artefakt bereit.

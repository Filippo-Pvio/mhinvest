# Interne Browser-QA

Datum: 19. September 2026

## Verbindlicher Lauf

GitHub Actions, Ubuntu 24.04, Node.js 24, Astro und Playwright Chromium:

https://github.com/Filippo-Pvio/mhinvest/actions/runs/35458673919

Der Workflow installiert den echten Astro-Prototyp, führt `astro check && astro build` aus, startet den Astro-Preview-Server und rendert anschließend den Produktionsbuild in Chromium. Eine statische Rekonstruktion ist nicht Teil dieses Prüfpfads.

## Geprüfte Viewports

- 1440 × 900
- 1280 × 800
- 1024 × 768
- 390 × 844
- 320 × 568

Für jede Größe liegt unter `screenshots/browser-*-v3.png` ein echter Full-Page-Browser-Screenshot vor. Alle fünf Dateien wurden nach dem Lauf visuell kontrolliert.

## Ergebnis

**Browser-QA bestanden.**

- Abhängigkeiten und Chromium erfolgreich installiert
- `astro check && astro build` ohne Fehler oder Warnungen
- Preview-Server per HTTP 200 erreicht
- tatsächliches Rendering in Chromium für alle fünf Zielgrößen
- kein horizontales Overflow
- keine abgeschnittenen, überstehenden oder intern geclippten Texte und Elemente
- Hero-Headline und primärer CTA nach Normal-Motion vollständig sichtbar
- primärer CTA in allen Viewports above the fold
- primärer und sekundärer CTA korrekt verlinkt
- alle internen Navigationsziele vorhanden; keine unbeabsichtigten 404-Ziele
- Desktop-Dropdown sowie Tablet-/Mobile-Menü per Tastatur bedienbar
- Escape schließt Menüs und führt den Fokus zurück
- sichtbare Focus-Zustände
- keine zu kleinen interaktiven Ziele in den fünf geprüften Viewports
- alle Bilder geladen
- keine Console Errors, Page Errors, fehlgeschlagenen Requests oder HTTP-Fehlerantworten
- Hero-Eingangsanimation abgeschlossen und sichtbar
- Diagnose-Scrollbewegung in allen fünf Viewports aktiv und im geprüften Zustand sichtbar
- Reduced Motion erkannt; Animationsdauer auf `0.01ms` reduziert, Inhalte sichtbar
- No-JS-Fallback auf 1440 × 900 und 320 × 568: Inhalt und native Navigation sichtbar und bedienbar

Die vollständigen maschinenlesbaren Messwerte stehen in `screenshots/qa-results.json`.

## Reparaturschleife

1. Lauf #4 stoppte korrekt bei zwei Astro-Typfehlern in der optionalen Dropdown-Struktur.
2. Lauf #5 bestätigte Build und Rendering; er identifizierte einen 43-px-Skip-Link sowie eine zu früh ausgewertete Tablet-Fokusmessung.
3. Lauf #6 bestand technisch. Die visuelle Screenshot-Kontrolle zeigte jedoch, dass die Full-Page-Aufnahme die endliche Hero-Animation im Startzustand festhielt.
4. Lauf #7 prüft Normal Motion ausdrücklich bis zum abgeschlossenen Endzustand, prüft die Scroll-Diagnose und erzeugt die Screenshots anschließend im stabilen Animationsendzustand. Dieser Lauf ist vollständig erfolgreich.

## Containergrenze und reproduzierbarer Fallback

Der direkte Arbeitscontainer besitzt Node.js, npm und die Projektdateien, erreicht die öffentliche npm-Registry aber über den konfigurierten Netzwerkpfad nur mit HTTP 403. Dadurch können Astro und Chromium dort nicht nachinstalliert werden. Der branch- und PR-bezogene GitHub-Actions-Workflow ist der technisch saubere wiederkehrende Fallback: Er prüft den tatsächlichen Produktionsbuild mit denselben verbindlichen Viewports und stellt Screenshots sowie JSON als Artefakt bereit.

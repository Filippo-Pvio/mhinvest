# MH-Invest Akquise-Hero

Responsiver Astro-Prototyp für die MH-Invest GmbH in Hagen. Die Demo ist nicht indexierbar und nicht für eine produktive Veröffentlichung bestimmt.

## Start

```bash
npm install
npm run dev
```

Produktionsbuild:

```bash
npm run build
npm run preview
```

Für Umgebungen ohne Registry-Zugriff steht eine statische QA-Ausgabe zur Verfügung:

```bash
npm run qa:build
npm run qa:serve
```

Browserprüfung nach installiertem Chromium:

```bash
npx playwright install chromium
npm run qa:browser
```

## Struktur

- `src/components/Hero.astro`: eigenständiger, wiederverwendbarer Hero.
- `src/content/site.json`: Navigation, Kontakt- und Hero-Inhalte.
- `src/styles/global.css`: responsive Gestaltung und Zustände.
- `research/research.md`: belegte Fakten, Quellen und Unsicherheiten.
- `notes/strategy.md`: Kommunikations- und Designstrategie.
- `screenshots/`: geprüfte Desktop- und Mobile-Ansichten.

## Produktionsgrenze

Vor einer Veröffentlichung sind Kundenfreigabe, Inhaltsprüfung, rechtliche Prüfung, Corporate-Design-Abgleich sowie die Klärung aller Bild- und Markenrechte erforderlich.

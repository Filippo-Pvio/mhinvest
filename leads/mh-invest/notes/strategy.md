# Design- und Kommunikationsstrategie

## Kernidee V2

MH-Invest wird nicht über Produktfülle oder Sparversprechen inszeniert, sondern über die Fähigkeit, finanzielle Komplexität in einen verständlichen, persönlichen Plan zu übersetzen. Die bestehende Positionierung „Innovative Finanzdiagnostik“ wird als gestalterisches Prinzip aufgenommen. V2 stärkt dabei ausdrücklich die persönliche Komponente: Marius Hryn wird als direkter Ansprechpartner genannt, ohne ein unbelegtes Porträt oder eine fingierte Beratungssituation zu zeigen.

## Informationshierarchie

1. Unternehmen und Standortbezug: MH INVEST, persönliche Beratung in Hagen.
2. Nutzerversprechen: Versicherungen und Finanzen werden verständlich auf die persönliche Situation abgestimmt.
3. Leistungsrahmen: Absicherung, Vorsorge, Finanzierung und Investment.
4. Primäre Aktion: Beratung anfragen.
5. Kundennaher Vertrauensanker: Marius Hryn als direkter Ansprechpartner und Standort Hagen.
6. Sekundärer Nachweis: Maklerstatus nach § 34d GewO.

## Visuelle These

Ein dunkler, präziser Editorial-Look verbindet Ruhe und Kompetenz mit einem analogen Planungsprozess: warmes Papier, ein Diagnose-Raster, ein Graphitstift und ein einzelner limettengrüner Weg mit klarem Zielpunkt. Das Motiv kommuniziert Orientierung und individuelle Planung direkter als die architektonische V1-Bildwelt. Haptik und warmes Licht geben der institutionellen Präzision eine menschliche Note, ohne Personen, Kunden, Mitarbeiter oder Geschäftsräume zu erfinden. Das Konzept vermeidet übliche Finanzklischees wie Münzen, Börsenkurven, Handschläge oder Luxusarchitektur.

## Mobile Komposition

Mobile ist keine gestapelte Desktop-Fassung. Das Motiv erhält eine eigene, kompakte Bildzone unter der Navigation; Botschaft, Nutzen und CTA stehen anschließend auf einer ruhigen hellen Fläche. Dadurch hängen Lesbarkeit und Zeilenumbrüche nicht vom Bildausschnitt ab. Die verkürzte Headline und eine eigenständige responsive Typografie schützen lange Wörter auch im kleinen Smartphone-Viewport. Der primäre CTA folgt unmittelbar auf den Nutzen, während der sekundäre CTA bewusst zurücktritt.

## Farben und Typografie

- Graphit: `#151715` für Seriosität und Kontrast.
- Warmweiß: `#fffef8` und Papiergrau `#f3f1eb` für eine menschlichere, weniger banktypische Anmutung.
- Limette: `#c9ef42` als präziser Aktions- und Fokusakzent.
- Schrift: lizenzfreie Systemschrift-Kaskade ohne externe Requests.

## Motion- und Interaktionskonzept

- Der Hero erscheint in einer kurzen Reihenfolge aus Bild, Marke, Aussage, Nutzen und Handlung. Diese Bewegung macht die Informationshierarchie lesbar und ist keine dauerhafte Dekoration.
- Im Beratungsweg wächst eine limettengrüne Diagnose-Linie entlang der drei Schritte. Sie übersetzt den belegten Begriff „Innovative Finanzdiagnostik“ in ein nachvollziehbares Orientierungsprinzip.
- Prozessschritte, Leistungsfelder und digitale Vergleichsmöglichkeit werden beim Scrollen leicht aus der Tiefe geholt. Inhalte bleiben in der statischen Baseline sichtbar; Scroll-Animationen werden nur bei unterstützenden Browsern ergänzt.
- Hover- und Focus-Zustände schärfen die Bedienbarkeit von Navigation und Handlungslinks.
- Auf Smartphones wird der Hero als eine kurze gemeinsame Bewegung behandelt; gestaffelte Desktop-Verzögerungen entfallen, damit Kernbotschaft und CTA sofort erfassbar bleiben.
- Bei `prefers-reduced-motion` werden Scrollbewegung, Animationen und Übergänge praktisch vollständig deaktiviert. Ohne JavaScript bleiben Inhalt und native Details-Navigation bedienbar.

## Website-Perspektive

Die Demo zeigt nicht nur einen isolierten Onepager-Hero. Das Leistungsmenü führt zu vier real belegten Themenfeldern, der Beratungsweg macht die Finanzdiagnostik verständlich, das Profil stärkt den direkten Ansprechpartner und die Vergleichsmöglichkeit bildet den vorhandenen digitalen Zugang ab. Die begründete Zielarchitektur ist separat in `information-architecture.md` dokumentiert.

## Asset-Herkunft

- `public/assets/finanzplanung-konzept-v2.webp`: am 17.09.2026 mit OpenAI Image Generation für diese Akquise-Demo erzeugtes Konzeptmaterial. Es zeigt keine reale Person, Immobilie, Referenz oder Leistung von MH-Invest.
- Die Herkunft bleibt hier vollständig dokumentiert. In der Demo steht die notwendige Kennzeichnung in einem separaten Präsentationshinweis oberhalb der eigentlichen Website-Komposition, damit sie nicht als Teil des Kundendesigns missverstanden wird.

## Annahmen

- Die vorgeschlagene Farbwelt ist eine strategische Modernisierung. Exakte Corporate-Design-Vorgaben lagen nicht vor und müssen vor Produktion bestätigt werden.
- Der CTA „Persönliches Gespräch anfragen“ verlinkt in der Demo auf den Kontaktbereich. Ein Terminbuchungssystem ist nicht belegt.
- Texte und Navigationsstruktur sind aus den öffentlich sichtbaren Seiten abgeleitet, aber nicht vom Unternehmen freigegeben.

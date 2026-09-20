# QA und Commercial Browser Gate

Final geprüfter Implementierungsstand: 249f0c1e35bea422f22e48ef88aa305c8bb80355  
Browser-QA-Lauf: https://github.com/Filippo-Pvio/mhinvest/actions/runs/35469817090  
Datum: 19. September 2026

## Technische Browser-QA: bestanden

Der tatsächliche Astro-Produktionsbuild wurde in Chromium gerendert und geprüft.

Pflicht-Viewports:

- 1440 × 900
- 1280 × 800
- 1024 × 768
- 390 × 844
- 320 × 568

Bestätigt:

- Astro Check und Produktionsbuild ohne Fehler
- HTTP 200, keine Console- oder Page-Errors
- keine fehlgeschlagenen Requests oder Assets
- kein horizontales Overflow, Text-Clipping oder unerwünschte Überstände
- primärer CTA in allen Viewports above the fold
- primärer und sekundärer CTA korrekt verlinkt
- interne Links und Navigationsziele vollständig
- Desktop-Dropdown und Mobile-Menü per Tastatur bedienbar
- Escape-Rückführung und sichtbare Fokuszustände
- geeignete Touch-Flächen
- Motion bis zum sichtbaren Endzustand
- Reduced Motion mit sichtbaren Inhalten
- No-JS-Fallback auf Desktop und 320 × 568
- standalone Prüfung des tatsächlichen Produktionsbuilds
- echte Full-Page-Browser-Screenshots für alle fünf Viewports im Workflow-Artefakt

## Reparaturschleife

Der erste v1.3-Lauf zeigte bei 320 × 568 einen primären CTA knapp unter dem ersten Viewport. Die kleine Mobile-Komposition wurde verdichtet und der CTA vor den ergänzenden Ansprechpartner-Nachweis gesetzt; der Introtext nennt Marius Hryn weiterhin vor dem CTA. Der Folgelauf bestand technisch vollständig.

Das erste Commercial Browser Gate zeigte anschließend, dass Marius Hryn im Desktop-Hero noch zu stark wie ein nachgeordnetes Trust-Badge wirkte. Sein Name wurde deshalb in die Hauptaussage aufgenommen. Nach der kommerziellen Reparatur bestand die technische Browser-QA erneut vollständig.

## Commercial Browser Gate: bestanden

- Im ersten Viewport sind Versicherungen und Finanzen als Angebot verständlich.
- Marius Hryn ist in Headline, CTA, Ansprechpartner-Nachweis und Navigation sichtbar.
- Finanzdiagnostik, Hagen und die vier Leistungsfelder schaffen eine MH-Invest-spezifische Kombination.
- Das Konzeptmotiv illustriert gemeinsames Ordnen; es gibt sich nicht als reale Person oder Referenz aus.
- Persönlicher Trust steht vor regulatorischem Trust.
- Der CTA „Marius Hryn kontaktieren“ ist der logische nächste Schritt.
- Mobile priorisiert Angebot, Name und CTA und reduziert die Desktop-Bewegung.
- Die Full-Page-Prüfung zeigt einen glaubwürdigen Weg von Positionierung über Beratungsprozess und Leistungen zum direkten Kontakt.
- Der wirtschaftliche Mehrwert liegt in schnellerem Verständnis, klarerer persönlicher Verantwortlichkeit und einem eindeutigen Kontaktimpuls.

## Offene Annahmen und Produktionsgrenze

- Zielgruppe Hagen/Umgebung ist eine strategische Interpretation.
- Texte, Navigation, Farbwelt und Bildrichtung sind nicht von MH-Invest freigegeben.
- Das Konzeptmotiv ist KI-generiertes Demo-Material.
- Ein reales Porträt von Marius Hryn bleibt für eine spätere Produktion empfohlen und erfordert Rechteklärung.
- Das private Repository stellt nur interne Build- und QA-Artefakte bereit. Es erfolgt keine produktive Veröffentlichung, keine Domain- oder DNS-Änderung und keine Kontaktaufnahme.

## Interne Freigabe

Technische Browser-QA und Commercial Browser Gate sind bestanden. Der Stand ist intern QA-fertig und als nicht produktive Akquise-Demo Akquise-ready.

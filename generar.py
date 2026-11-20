from pathlib import Path
from html import escape
import json
R=Path(__file__).resolve().parent
insta='https://www.instagram.com/montilla_photography/'
data=json.loads((R/'serie.json').read_text())
routes={'de':('', 'galerie/nachtleben/'),'es':('es/','es/galeria/vida-nocturna/')}
for lang,(home,series) in routes.items():
 de=lang=='de'
 word=lambda a,b:a if de else b
 night=word('Nachtleben','Vida nocturna')
 title=word('Momente festgehalten in jedem Bild','Cada imagen guarda un momento.')
 body=word('Fotografie und Film aus Hamburg.','Fotografía y cine desde Hamburgo.')
 for is_series,route in [(False,home),(True,series)]:
  prefix='../'*route.count('/')
  asset=lambda s:prefix+'assets/'+s
  link=lambda target:prefix+target+'index.html'
  other_lang='es' if de else 'de'
  other=link(routes[other_lang][int(is_series)])
  home_url=link(home)
  series_url=link(series)
  def img(f,alt,attrs=''):
   return f'<img src="{asset(f)}" alt="{escape(alt,quote=True)}" {attrs}>'
  def brand(name,alt='',attrs=''):
   return img('brand/'+name+'.svg',alt,attrs)
  def photo(f,alt,width,height,priority=False):
   largest=1365 if f=="autor" else 1600
   return f'<img src="{asset("img/"+f+"-960.webp")}" srcset="{asset("img/"+f+"-480.webp")} 480w, {asset("img/"+f+"-960.webp")} 960w, {asset("img/"+f+"-1600.webp")} {largest}w" sizes="{("100vw" if priority else "(min-width: 900px) 45vw, 94vw")}" width="{width}" height="{height}" alt="{escape(alt,quote=True)}" '+('fetchpriority="high"' if priority else 'loading="lazy" decoding="async"')+'>'
  def instagram():
   return f'<a href="{insta}">@montilla_photography <span aria-hidden="true">↗</span></a>'
  header=f'''<a class="skip" href="#main">{word('Zum Inhalt','Saltar al contenido')}</a>
<header class="site-head"><div class="shell head-inner">
<a href="{home_url}" aria-label="Montilla Visuals · {word('Startseite','Inicio')}">{brand('logo','','class="brand-wide"')}{brand('camera','','class="brand-small"')}</a>
<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="nav">{word('Menü','Menú')}</button>
<nav id="nav" aria-label="{word('Hauptnavigation','Navegación principal')}">
<a href="{home_url}" {'aria-current="page"' if not is_series else ''}>{word('Start','Inicio')}</a>
<a href="{series_url}" {'aria-current="page"' if is_series else ''}>{word('Galerie','Galería')}</a>
<a href="{home_url}#about">{word('Über mich','Sobre mí')}</a><a href="{home_url}#contact">{word('Kontakt','Contacto')}</a>
</nav><div class="languages" aria-label="{word('Sprache','Idioma')}"><span aria-current="true">{lang.upper()}</span><a href="{other}" hreflang="{other_lang}" lang="{other_lang}">{other_lang.upper()}</a></div></div>{'' if is_series else f'<p class="shell meta hero-motto">{word("MOMENTE FESTGEHALTEN IN JEDEM BILD","CADA IMAGEN GUARDA UN MOMENTO")}</p>'}</header>'''
  footer=f'''<footer id="contact" class="shell footer">
<div class="rule"></div><div class="footer-inner"><div>{brand('stack','Montilla Visuals','class="stack"')}</div>
<div><h2>{word('Lass uns zusammenarbeiten.','Trabajemos juntos.')}</h2>
<div class="contacts"><a href="mailto:alejandro.montilla1996@gmail.com">E-mail ↗</a><a href="https://wa.me/4917681321353">WhatsApp ↗</a>{instagram()}</div></div></div>
<div class="footer-bottom">© Alejandro Montilla <span>Hamburg</span></div></footer>'''
  if not is_series:
   hero=f'<video class="hero-video" muted loop playsinline preload="none" poster="{asset("img/hero-960.webp")}" data-desktop="{asset("video/hero-desktop.mp4")}" data-mobile="{asset("video/hero-movil.mp4")}" aria-hidden="true"></video>'
   content=f'''<main id="main">
<section class="hero" aria-labelledby="hero-title">
<div class="hero-media">{hero}</div>
<div class="shell hero-inner">

<h1 id="hero-title"><span>MONTILLA</span> <span>VISUALS</span></h1><p class="hero-summary">{word('Fotografie','Fotografía')} <em class="editorial-note">{word('mit Absicht.','con intención.')}</em></p>
<div class="hero-actions">
<a class="hero-link" href="#work">{word('Arbeiten ansehen','Ver el trabajo')}</a>
<a class="hero-link" href="#contact">{word('Lass uns reden','Hablemos')}</a>
</div>
</div></section>
<section class="shell work" id="work"><div class="rule"></div><div class="section-head"><h2>{word('Ausgewählte Arbeiten','Trabajo seleccionado')}</h2><span class="meta">{word('FOTOSERIE','SERIE FOTOGRÁFICA')}</span></div>
<a class="feature" href="{series_url}">{photo('night-3',data[0]['alt'][lang],2048,1328)}<div>{brand('night','','width="44" height="44"')}<h3>{night}</h3><span class="meta">{len(data):02d} {word('FOTOS','FOTOS')}</span><span class="arrow" aria-hidden="true">↗</span></div></a></section>
<div class="shell signature"><div class="rule"></div>{instagram()}<div class="rule"></div></div>
<section class="about" id="about"><div class="shell about-inner">
<div class="about-media">{photo('autor',word('Alejandro Montilla in heller Jacke und Baseballkappe am Wasser','Alejandro Montilla con chaqueta clara y gorra junto al agua'),1365,2048)}</div>
<div class="about-copy"><p class="meta">{word('ÜBER MICH','SOBRE MÍ')}</p><h2>Alejandro Montilla</h2>
<p class="editorial-note">{word('Ich fotografiere Menschen, Bewegung und Atmosphäre. Meine Arbeit führt mich in Clubs, auf Konzerte und auf die Straßen Hamburgs.','Fotografío personas, movimiento y atmósfera. Mi trabajo me lleva a clubes, conciertos y a las calles de Hamburgo.')}</p>
<a href="#contact">{word('Kontakt aufnehmen','Ponerse en contacto')} ↗</a></div></div></section></main>'''
  else:
   tiles=''.join(f'<a class="tile" id="foto-{x["id"]}" href="{asset("img/night-"+str(x["id"])+"-1600.webp")}" data-photo>{photo("night-"+str(x["id"]),x["alt"][lang],x["w"],x["h"])}<span class="meta" aria-hidden="true">{i:02d} ↗</span></a>' for i,x in enumerate(data,1))
   content=f'''<main id="main"><section class="shell series">
   <a class="back" href="{home_url}#work">↖ {word('Ausgewählte Arbeiten','Trabajo seleccionado')}</a>
   <div class="section-head"><h1>{night}</h1>{brand('night','','class="series-icon"')}</div>
   <p class="series-intro editorial-note">{word('Dunkle Räume, Bewegung und Licht zwischen den Tracks.','Espacios oscuros, movimiento y luz entre una pista y la siguiente.')}</p>
   <div class="rule"></div><div class="series-caption meta"><span>HAMBURG</span><span>{len(data):02d} FOTOS</span></div>
   <div class="photo-grid">{tiles}</div></section>
   <dialog class="lightbox" aria-label="{word('Fotoansicht','Visor de fotografías')}" data-copied="{word('Link kopiert','Enlace copiado')}" data-share="{word('Link zur Aufnahme','Enlace a la foto')}">
   <div class="lightbox-top"><button data-close autofocus>{word('Schließen','Cerrar')} ×</button><output aria-live="polite"></output><button data-copy>{word('Link kopieren','Copiar enlace')}</button></div>
   <div class="lightbox-stage"><button data-prev aria-label="{word('Vorheriges Foto','Foto anterior')}">←</button><div class="zoom-viewport"><img alt=""></div><button data-next aria-label="{word('Nächstes Foto','Foto siguiente')}">→</button></div><div class="zoom-controls"><button type="button" data-zoom-out aria-label="{word('Verkleinern','Alejar')}">−</button><output data-zoom-value>100%</output><button type="button" data-zoom-in aria-label="{word('Vergrößern','Acercar')}">+</button></div><p class="copy-status" role="status"></p></dialog></main>'''
  full_title=f'{night} · Montilla Visuals' if is_series else 'Montilla Visuals · '+word('Fotografie in Hamburg','Fotografía en Hamburgo')
  page_kind="page-series" if is_series else "page-home"
  intro='' if is_series else '<div class="brand-intro" aria-hidden="true">'+brand('stack','','width="1050" height="640" fetchpriority="high"')+'</div>'
  target=R/route/'index.html'
  target.write_text(f'''<!doctype html>
<html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>{full_title}</title><meta name="description" content="{body}">
<link rel="icon" sizes="16x16" href="{asset('brand/favicon-16.png')}"><link rel="icon" sizes="32x32" href="{asset('brand/favicon-32.png')}"><link rel="apple-touch-icon" href="{asset('brand/apple-touch-icon.png')}">
<link rel="stylesheet" href="{asset('estilo.css')}"><script src="{asset('interaccion.js')}" defer></script></head>
<body class="{page_kind}">{intro}{header}{content}{footer}</body></html>''',encoding='utf-8')

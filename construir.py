"""Generate the static portfolio. Run generar.py first through this entry point."""
from html import escape
from pathlib import Path
import json
import re
import runpy
import sys

root = Path(__file__).resolve().parent
runpy.run_path(str(root / 'generar.py'))
catalog = json.loads((root / 'catalogo.json').read_text())
production = '--produccion' in sys.argv
domain = 'https://montillavisuals.vercel.app'
series = [
 ('vida-nocturna','nachtleben','Nachtleben','Vida nocturna','noche'),
 ('retratos','portraet','Porträts','Retratos','retrato'),
 ('calle','strasse','Straßenfotografie','Calle','calle'),
 ('conciertos','konzerte','Konzerte','Conciertos','concierto'),
 ('dj-musica','dj-musik','DJ und Musik','DJ y música','musica'),
 ('fauna','tierfotografie','Tierfotografie','Fauna','naturaleza'),
 ('parejas','paare','Paare','Parejas','parejas'),
 ('eventos','events','Events','Eventos','evento'),
 ('moda','mode','Mode','Moda','moda'),
 ('paisaje','landschaft','Landschaft','Paisaje','naturaleza'),
 ('F1','f1','Luftfahrt','Aviación','automotor'),
]
pages={
 'home':('', 'es/', 'Start', 'Inicio'),
 'gallery':('galerie/','es/galeria/','Galerie','Galería'),
 'about':('ueber-mich/','es/sobre-mi/','Über mich','Sobre mí'),
 'contact':('kontakt/','es/contacto/','Kontakt','Contacto'),
}
for key,slug,de,es,icon in series:
 pages[key]=(f'galerie/{slug}/',f'es/galeria/{key.lower()}/',de,es)
redirects=[]
for key in [x[0] for x in series if x[0]!='paisaje']:
 destination='/'+pages.get(key,pages['gallery'])[1]
 redirects.append({'source':f'/galerias/{key}.html','destination':destination,'permanent':True})
(root/'vercel.json').write_text(json.dumps({'trailingSlash':True,'redirects':redirects},indent=2)+'\n')
about_es='Fotografío personas, movimiento, atmósfera y los momentos que aparecen entre ellos. Mi trabajo se mueve entre la vida nocturna, la música, los retratos, la moda, la cultura urbana y las historias cotidianas.'
about_de='Ich fotografiere Menschen, Bewegung, Atmosphäre und die Momente dazwischen. Meine Arbeit reicht von Nachtleben und Musik über Porträts und Mode bis hin zu Straßenkultur und Geschichten aus dem Alltag.'
for l in (0,1):
 es=bool(l)
 lang='es' if es else 'de'
 pick=lambda de,es: es if l else de
 home=root/pages['home'][l]/'index.html'
 pilot=root/pages['vida-nocturna'][l]/'index.html'
 home_html=home.read_text()
 pilot_html=pilot.read_text()
 home_main=re.search(r'<main id="main">.*?</main>',home_html,re.S)[0]
 about_section=re.search(r'<section class="about".*?</section>',home_main,re.S)[0]
 for key,(de_path,es_path,de_label,es_label) in pages.items():
  route=pick(de_path,es_path)
  prefix='../'*route.count('/')
  title=pick(de_label,es_label)
  def url(k):
   target=pages[k][l]
   return prefix+target+('' if production and (target or prefix) else './' if production else 'index.html')
  def asset(s):return prefix+'assets/'+s
  def pic(row,css='',priority=False):
   stem=row['stem']
   sizes=row.get('widths',{'480':480,'960':960,'1600':1600})
   sources=', '.join(f'{asset(f"img/{stem}-{n}.webp")} {w}w' for n,w in sizes.items())
   loading='fetchpriority="high"' if priority else 'loading="lazy" decoding="async"'
   return f'<img class="{css}" src="{asset(f"img/{stem}-960.webp")}" srcset="{sources}" sizes="(max-width: 650px) 94vw, (max-width: 1024px) 48vw, 44vw" width="{row["w"]}" height="{row["h"]}" alt="{escape(row["alt"][lang],quote=True)}" {loading}>'
  def card(item, heading="h3"):
   k,_,de,sp,icon=item
   rows=catalog[k]
   return f'<a class="gallery-card" href="{url(k)}">{pic(rows[0])}<div><img src="{asset(f"brand/{icon}.svg")}" width="20" height="20" alt=""><{heading}>{pick(de,sp)}</{heading}><span aria-hidden="true">↗</span></div></a>'
  def series_rail(items, heading):
   cards = ''.join(card(item, heading) for item in items)
   previous = pick('Vorherige Kategorie', 'Categoría anterior')
   following = pick('Nächste Kategorie', 'Siguiente categoría')
   return f'''<div class="gallery-rail">
     <div class="gallery-controls" hidden>
       <button type="button" data-gallery-prev aria-controls="gallery-track" aria-label="{previous}">←</button>
       <button type="button" data-gallery-next aria-controls="gallery-track" aria-label="{following}">→</button>
     </div>
     <div id="gallery-track" class="series-grid gallery-track">{cards}</div>
   </div>'''
  nav=''.join(f'<a href="{url(k)}"'+(' aria-current="page"' if key==k or k=='gallery' and key in catalog else '')+f'>{pages[k][l+2]}</a>' for k in ('home','gallery','about','contact'))
  other_path=pages[key][1-l]
  other=prefix+other_path+('' if production and (other_path or prefix) else './' if production else 'index.html')
  other_lang=pick('es','de')
  template=home_html if key=='home' else pilot_html.replace('../'*pages['vida-nocturna'][l].count('/')+'assets/',prefix+'assets/')
  header=re.search(r'<header.*?</header>',template,re.S)[0]
  header=re.sub(r'(<nav[^>]*>).*?(</nav>)',lambda m:m[1]+nav+m[2],header,flags=re.S)
  header=re.sub(r'<a[^>]*hreflang=.*?</a>',f'<a href="{other}" hreflang="{other_lang}" lang="{other_lang}">{other_lang.upper()}</a>',header)
  header=re.sub(r'(<a href=")[^"]+(" aria-label="Montilla Visuals)',lambda m:m[1]+url('home')+m[2],header,count=1)
  template=re.sub(r'<header.*?</header>',lambda _:header,template,count=1,flags=re.S)
  if key=='home':
   main=home_main
   featured = series_rail([series[i] for i in (0,1,2,8,9,10)], 'h3')
   all_series = f'<a class="more-series" href="{url("gallery")}">{pick("Alle Serien","Ver todas las series")} ↗</a>'
   main=re.sub(r'<a class="feature".*?</a>',lambda _:featured+all_series,main,flags=re.S)
   main=main.replace(f'<a href="#contact">{pick("Kontakt aufnehmen","Ponerse en contacto")}',f'<a href="{url("about")}">{pick("Mehr über mich","Más sobre mí")}')
  else:
   body=''
   if key=='gallery':
    body = series_rail(series, 'h2')
   elif key=='about':
    portrait=about_section.replace('../'*pages['home'][l].count('/')+'assets/',prefix+'assets/')
    portrait=re.sub(r'<h2>.*?</h2>','<h1>Alejandro Montilla</h1>',portrait,count=1)
    portrait=re.sub(r'(<p class="editorial-note">).*?(</p>)',lambda m:m[1]+pick(about_de,about_es)+m[2],portrait,count=1)
    portrait=portrait.replace('href="#contact"',f'href="{url("contact")}"')
    services=pick('Porträts|Events|DJ und Musik|Nachtleben|Mode|Konzerte|Straßenfotografie|Paare|Tierfotografie|Landschaft|Luftfahrt','Retratos|Eventos|DJ y música|Vida nocturna|Moda|Conciertos|Calle|Parejas|Fauna|Paisaje|Aviación').split('|')
    main=f'<main id="main">{portrait}<section class="shell series"><h2>{pick("Leistungen","Servicios")}</h2><ul class="service-list">{"".join(f"<li>{s}</li>" for s in services)}</ul><a class="more-series" href="{url("gallery")}">{pick("Galerie ansehen","Ver la galería")} ↗</a></section></main>'
   elif key=='contact':
    options=''.join(f'<option>{pick(s[2],s[3])}</option>' for s in series)
    body=f'''<div class="contact-layout"><form class="wa-form" action="https://wa.me/4917681321353" method="get" data-wa hidden>
    <label>{pick('Name','Nombre')}<input name="name" autocomplete="name" required></label>
    <label>E-Mail<input name="email" type="email" autocomplete="email" required></label>
    <label>{pick('Art des Projekts','Tipo de proyecto')}<select name="project">{options}<option>{pick('Sonstiges','Otro')}</option></select></label>
    <label>{pick('Nachricht','Mensaje')}<textarea name="message" rows="5" required></textarea></label>
    <p id="wa-note">{pick('Der Button öffnet WhatsApp mit deinem Entwurf. Du sendest die Nachricht dort selbst.','El botón abre WhatsApp con tu borrador. Tú envías el mensaje desde allí.')}</p>
    <button type="submit" class="primary" aria-describedby="wa-note">{pick('Entwurf in WhatsApp öffnen','Abrir borrador en WhatsApp')} ↗</button></form>
    <div class="contact-aside"><p class="editorial-note">{pick('Erzähl mir von deinem Projekt.','Cuéntame sobre tu proyecto.')}</p><div class="contacts"><a href="mailto:alejandro.montilla1996@gmail.com">E-Mail ↗</a><a href="https://wa.me/4917681321353">WhatsApp ↗</a><a href="https://www.instagram.com/montilla_photography/">@montilla_photography ↗</a></div></div></div>'''
   else:
    rows=catalog[key]
    j=[x[0] for x in series].index(key)
    icon=series[j][4]
    previous,following=series[(j-1)%len(series)],series[(j+1)%len(series)]
    tiles=''.join(f'<button type="button" class="tile" id="foto-{x["id"]}" data-full="{asset("img/"+x["stem"]+"-1600.webp")}" data-photo>{pic(x,priority=i==1)}</button>' for i,x in enumerate(rows,1))
    controls=f'<div class="series-controls" hidden><button type="button" data-series-prev aria-label="{pick("Vorheriges Foto","Foto anterior")}">←</button><output class="meta" aria-live="polite">1 / {len(rows)}</output><button type="button" data-series-next aria-label="{pick("Nächstes Foto","Foto siguiente")}">→</button><button type="button" data-series-zoom aria-label="{pick("Foto vergrößern","Ampliar foto")}"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5m-10-8V8m-2 2h4"/></svg></button></div>'
    dialog=re.search(r'<dialog.*?</dialog>',pilot_html,re.S)[0]
    dialog=re.sub(r'<button data-copy>.*?</button>|<p class="copy-status".*?</p>| data-(?:copied|share)="[^"]*"', '', dialog)
    text=pick('Dunkle Räume, Bewegung und Licht zwischen den Tracks.','Espacios oscuros, movimiento y luz entre una pista y la siguiente.') if key=='vida-nocturna' else ''
    lead=f'<p class="series-intro editorial-note">{text}</p>' if text else ''
    main=f'''<main id="main"><section class="shell series"><a class="back" href="{url('gallery')}">↖ {pick('Alle Serien','Todas las series')}</a>
    <div class="section-head"><h1>{title}</h1><img class="series-icon" src="{asset(f'brand/{icon}.svg')}" alt=""></div>{lead}
    <section class="series-viewer" data-series-viewer aria-label="{pick("Fotos der Serie","Fotos de la serie")}"><div class="series-stage">{tiles}</div>{controls}</section><div class="series-nav"><a href="{url(previous[0])}">← {previous[2+l]}</a><a href="{url(following[0])}">{following[2+l]} →</a></div></section>{dialog}</main>'''
   if key in ('gallery','contact'):
    main=f'<main id="main"><section class="shell series {"gallery-index" if key=="gallery" else ""}"><h1>{title}</h1><div class="rule page-rule"></div>{body}</section></main>'
  html=re.sub(r'<main id="main">.*?</main>',lambda _:main,template,count=1,flags=re.S)
  html=re.sub(r'<title>.*?</title>',f'<title>{title} · Montilla Visuals</title>',html,count=1)
  desc=pick(f'{title} — Fotografie von Alejandro Montilla in Hamburg.',f'{title} — Fotografía de Alejandro Montilla en Hamburgo.')
  html=re.sub(r'<meta name="description" content="[^"]*">',f'<meta name="description" content="{escape(desc,quote=True)}">',html)
  details={'og:title':f'{title} · Montilla Visuals','og:description':desc,'og:type':'website','og:locale':pick('de_DE','es_ES'),'og:image':f'{domain}/assets/brand/compartir-{lang}.jpg','og:image:width':'1200','og:image:height':'630','og:url':domain+'/'+route}
  metadata=''.join(f'<meta property="{k}" content="{escape(v,quote=True)}">' for k,v in details.items())
  metadata+=f'<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="{details["og:image"]}">'
  if production:
   html=html.replace('<meta name="robots" content="noindex">','')
   metadata+=f'<link rel="canonical" href="{domain}/{route}">'
   metadata+=''.join(f'<link rel="alternate" hreflang="{code}" href="{domain}/{path}">' for code,path in [('de',de_path),('es',es_path),('x-default',de_path)])
  html=html.replace('</head>',metadata+'</head>',1)
  track = 'symphonie-fragmento' if key == 'home' else 'symphonie-galeria'
  audio = f'<audio data-hero-music src="{asset(f"audio/{track}.mp3")}" preload="metadata" loop></audio>'
  mute = pick('Musik stummschalten','Silenciar música')
  unmute = pick('Musik einschalten','Activar música')
  sound_button = f'<button class="sound-toggle" type="button" data-sound-toggle data-mute="{mute}" data-unmute="{unmute}" aria-label="{unmute}" hidden><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path class="sound-waves" d="M16 9a4 4 0 0 1 0 6m2-8a7 7 0 0 1 0 10"/><path class="sound-cross" d="m16 10 5 5m0-5-5 5"/></svg></button>'
  html=html.replace('</body>',audio+sound_button+'</body>',1)
  dest=root/route/'index.html'
  dest.parent.mkdir(parents=True,exist_ok=True)
  dest.write_text(html,encoding='utf-8')
sitemap=root/'sitemap.xml'
robots=root/'robots.txt'
if production:
 robots.write_text(f'User-agent: *\nAllow: /\nSitemap: {domain}/sitemap.xml\n')
 sitemap.write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join(f'<url><loc>{domain}/{route}</loc></url>' for page in pages.values() for route in page[:2])+'</urlset>\n')
else:
 robots.write_text('User-agent: *\nAllow: /\n')
 sitemap.unlink(missing_ok=True)

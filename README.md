# Montilla Visuals · Versión 2 · Rojo Sangre

Esta rama contiene la versión 2 del sitio. Para probarla, sirve la raíz con `python3 -m http.server 8000` y abre http://localhost:8000.

## Contenido y edición

Hay 30 páginas, 15 en cada idioma. Incluyen Inicio, índice, once series, Sobre mí y Contacto. El Inicio mantiene el hero de video de aproximadamente 29 segundos, la cabecera superpuesta, la apertura con el logo y el retrato con texto integrado. Eventos, Moda y Paisaje tienen galería propia. La antigua serie F1 se titula Aviación y conserva su ruta.

Los textos alternativos y el orden están en `catalogo.json`. Para añadir una foto, agrega su registro con ID, nombre base, dimensiones, variantes y alt en DE y ES. Copia sus variantes WebP a `assets/img`. Edita los textos del Inicio en `generar.py` y los del resto de páginas en `construir.py`. Para regenerar la vista previa, ejecuta `python3 construir.py` desde la carpeta.

## Rutas y producción

Las rutas definitivas están en la tabla `pages` de `construir.py`. `vercel.json` contiene las diez equivalencias: F1, calle, conciertos, dj-musica, fauna, parejas, retratos y vida-nocturna se redirigen a su serie en /es/galeria/. Eventos y Moda se redirigen a sus galerías en español. Vercel debe aplicar la barra final y la respuesta permanente al desplegar. La raíz / conserva el Inicio alemán. Los enlaces viejos con #work, #about y #contact tienen sus secciones en Inicio. La configuración del hosting y las redirecciones HTTP quedan pendientes de comprobar en Vercel.

Para preparar una copia distinta de producción, duplica la carpeta y ejecuta `python3 construir.py --produccion` en esa copia. El comando genera canonical y hreflang DE, ES y x-default, sitemap y enlaces de página con barra final. Esta rama contiene la salida de producción. Para crear una vista previa local con noindex, ejecuta el generador sin la opción `--produccion` en una copia separada. Vídeo queda fuera del alcance e Impressum y Datenschutz quedan sin contenido.

## Verificación

Se comprobaron las 30 páginas, los enlaces internos y sus anclas, las referencias a imágenes y srcset, un h1 por página, las 252 entradas fotográficas en ambas lenguas y los destinos de las diez redirecciones. Se generó y comprobó por separado el SEO de producción. Los dos banners sociales basados en el kit miden 1200 × 630. Las fotos de las series tienen textos alternativos bilingües y se verificó el crédito en WebP. Se probó la generación del mensaje de WhatsApp, con datos de prueba, sin abrir WhatsApp ni enviar mensajes.

El entorno bloqueó el render de navegador. Quedan pendientes las capturas a 360, 480, 768, 1024 y 1440 px, Lighthouse, las interacciones reales del visor y la comprobación visual del favicon a 16 y 32 px. Las fuentes se resuelven con las instaladas o las genéricas. Los WOFF2 locales con sus licencias quedan pendientes. Una persona nativa debe revisar el alemán antes de publicar. El proyecto original y Vercel siguen intactos.

Inicio recupera Montilla Visuals sobre el hero, el lema alemán arriba y la frase Fotografía con intención en el idioma de la página. Las once series presentan un visor compacto con una foto a la vez, flechas, contador, teclado y ampliación opcional. El visor es de exhibición. La interfaz omite copiar enlaces, enlaces directos a fotos y totales en las tarjetas. Conserva el indicador de posición dentro del visor.

## Curaduría Fotos_2026

880 JPG revisados en hojas de contacto. Se incorporaron 64 exportaciones, con variantes WebP, crédito XMP y textos alternativos DE/ES. El inventario CSV distingue incorporaciones del resto de exportaciones revisadas. Los RAW ARW se inventariaron por tipo, sin desarrollar ni inspeccionar visualmente cada captura. Las fuentes permanecen intactas.

## Hero de video

El fondo de Inicio usa el montaje conformado y renderizado en DaVinci Resolve, con 29,04 segundos, a 24 fps. Las copias H.264 para escritorio y móvil se derivaron de ese archivo 4K y se exportaron sin sonido. Inicio conserva un título sans serif en dos líneas, la reproducción en bucle, una imagen de respaldo. Los modos de movimiento reducido y de ahorro de datos desactivan el inicio automático.

La exportación 4K de Resolve se encuentra en la carpeta local Montilla_Visuals_Hero_Edicion con el nombre Hero Pulso Urbano - Conformado TC.mov. Edicion_Hero incluye el inventario, los códigos de tiempo y el FCPXML conformado. Este último referencia las diez tomas individuales que están en la carpeta de edición local.

El inventario incluye 510 archivos. Se revisaron tres fotogramas por cada uno de los 173 videos fuente y 27 exportaciones, con muestreo adicional en candidatos. Se inventariaron 302 archivos de trabajo y ocho elementos de prueba. El reel con subtítulos quedó excluido.

Música de la vista previa local: fragmento de Symphonie, Racetechmusic, del archivo local Fotos_2026/Musica. Se intenta iniciar el audio al entrar y se reintenta al interactuar si el navegador bloquea el inicio. El fragmento sube de volumen durante siete segundos a un nivel moderado. La autorización para usar este set en el sitio público no se ha verificado.

El retrato de Sobre mí procede de Fotos_2026/Dani_Alejo2/perfil.jpg.

Por solicitud de privacidad se retiraron de las galerías las imágenes señaladas y otras vinculadas a sesiones personales. El retrato aprobado se conserva en los bloques Sobre mí. También se recortó el plano de la pareja en el hero. Los originales quedan fuera de esta edición.

Anexo_Marca contiene la variante Rojo Sangre, con paleta CSS y GPL. Esta carpeta es una copia local paralela.

Inicio y Galería muestran las categorías en una sola fila desplazable. El control flotante de sonido recuerda la elección del visitante.

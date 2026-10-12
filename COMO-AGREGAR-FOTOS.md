# Añadir fotos a las galerías

Cada página tiene 20 espacios. Coloca tus fotos dentro de su carpeta y nómbralas del 1 al 20, sin ceros iniciales: `1.jpg`, `2.jpg`… `20.jpg`.

Se admiten `.webp`, `.jpg`, `.jpeg` y `.png` (extensiones en minúsculas o mayúsculas). Usa una sola imagen por número. Si hay varias, se prioriza WebP, JPG, JPEG y PNG, en ese orden. No hace falta cambiar el código. Recarga la página después de añadirlas.

Carpetas dentro de `images/servicios/`:

- `retratos/`: Retratos, página `galerias/retratos.html`.
- `eventos/`: Eventos, página `galerias/eventos.html`.
- `dj-musica/`: DJ / Música, página `galerias/dj-musica.html`.
- `vida-nocturna/`: Vida nocturna, página `galerias/vida-nocturna.html`.
- `moda/`: Moda, página `galerias/moda.html`.
- `conciertos/`: Conciertos, página `galerias/conciertos.html`.
- `calle/`: Calle, página `galerias/calle.html`.
- `parejas/`: Parejas, página `galerias/parejas.html`.
- `F1/`: F1 / Automoción, página `galerias/F1.html`.
- `fauna/`: Fauna, página `galerias/fauna.html`.

La carpeta `F1` corresponde a la sección de automoción. Respeta las mayúsculas de ese nombre.

No se han creado fotografías ficticias: los espacios vacíos no se muestran; aparece una portada editorial y un aviso de selección en preparación. Al añadir una foto, se muestra con sus proporciones originales y se puede ampliar. Las galerías conservan los idiomas alemán, inglés y español.

## Portada y orden editorial

Las primeras cinco fotografías disponibles, en orden del 1 al 20, forman el hero con transiciones y controles. Elige las fotos 1–5 pensando en esa apertura. Los retratos verticales se muestran completos; las fotos horizontales se adaptan al encuadre panorámico del hero. Todas las fotos de la galería y del visor conservan la imagen completa.

La galería distribuye automáticamente las fotos disponibles en una composición asimétrica con distintos tamaños y pausas tipográficas. No hace falta completar las 20 para verla: puedes añadirlas progresivamente. Mantén una sola extensión por número.

## Fotos optimizadas para la web

Tus JPG originales se conservan en cada carpeta. Dentro de `optimized/` hay tres versiones WebP por foto, con un lado mayor de hasta 960, 1920 y 2560 píxeles. La galería y el hero eligen el tamaño según la pantalla; el visor utiliza la versión más grande.

`service-images.js` registra las fotos optimizadas y sus dimensiones. Si añades o reemplazas fotos, avísame para actualizar esas versiones y el registro. Las fotos nuevas que todavía no estén registradas se detectan como antes, pero usan el archivo original hasta que se optimicen.

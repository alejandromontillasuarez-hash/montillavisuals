(() => {
    'use strict';
    const category = document.body.dataset.service;
    if (!category) return;
    const folder = document.body.dataset.folder;
    const slots = [...document.querySelectorAll('[data-photo]')];
    const dialog = document.querySelector('.gallery-viewer');
    const full = document.querySelector('[data-full-image]');
    const cover = document.querySelector('[data-cover]');
    const slidesRoot = document.querySelector('[data-slides]');
    const controls = document.querySelector('[data-cover-controls]');
    const progress = document.querySelector('[data-progress]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const labels = {
        es: {back:'← Todos los servicios', contact:'Hablemos de tu proyecto ↗', close:'Cerrar', prev:'Anterior', next:'Siguiente', photo:'Foto', f1:'F1 / Automoción', edition:'UNA HISTORIA EN IMÁGENES', explore:'EXPLORAR LA HISTORIA', selection:'SELECCIÓN FOTOGRÁFICA', heading:'Una mirada.', accent:'Muchas historias.', pauseOne:'El detalle también cuenta.', pauseTwo:'Otra forma de mirar.', home:'Volver al inicio ↗', empty:'La selección fotográfica está en preparación.', pause:'Pausar presentación', play:'Reproducir presentación', skip:'Ir a la galería', gallery:'Galería de fotografías', viewer:'Visor de fotografías', presentation:'Presentación fotográfica'},
        en: {back:'← All services', contact:'Tell me about your project ↗', close:'Close', prev:'Previous', next:'Next', photo:'Photo', f1:'F1 / Automotive', edition:'A STORY IN IMAGES', explore:'EXPLORE THE STORY', selection:'SELECTED PHOTOGRAPHS', heading:'One perspective.', accent:'Many stories.', pauseOne:'The details tell a story.', pauseTwo:'Another way of seeing.', home:'Back to the homepage ↗', empty:'The photographic selection is being prepared.', pause:'Pause slideshow', play:'Play slideshow', skip:'Skip to gallery', gallery:'Photographic gallery', viewer:'Photo viewer', presentation:'Photographic presentation'},
        de: {back:'← Alle Leistungen', contact:'Erzähl mir von deinem Projekt ↗', close:'Schließen', prev:'Zurück', next:'Weiter', photo:'Foto', f1:'F1 / Automotive', edition:'EINE GESCHICHTE IN BILDERN', explore:'DIE GESCHICHTE ENTDECKEN', selection:'AUSGEWÄHLTE FOTOGRAFIEN', heading:'Ein Blick.', accent:'Viele Geschichten.', pauseOne:'Auch Details erzählen.', pauseTwo:'Eine andere Sichtweise.', home:'Zur Startseite ↗', empty:'Die fotografische Auswahl wird vorbereitet.', pause:'Diashow pausieren', play:'Diashow abspielen', skip:'Zur Galerie springen', gallery:'Fotogalerie', viewer:'Bildbetrachter', presentation:'Fotografische Präsentation'}
    };
    let language = 'de';
    let active = null;
    let opener = null;
    let coverIndex = 0;
    let coverSlides = [];
    let timer = null;
    let paused = reducedMotion.matches;
    let coverVisible = true;
    let controlsFocused = false;
    const layouts = ['lead','offset','pair-left','pair-right','full','small','large','center','pair-left','pair-right','full','offset','lead','small','large','center','pair-left','pair-right','full','center'];
    const loadedSlots = () => slots.filter(slot => !slot.disabled);
    const optimizedPhotos = window.MONTILLA_GALLERY_IMAGES?.[folder] || {};
    const sourceSet = photo => photo.variants.filter((variant, index, variants) => variants.findIndex(item => item.width === variant.width) === index).map(variant => `${variant.src} ${variant.width}w`).join(', ');
    const gallerySizes = layout => {
        const fraction = {lead: .75, offset: .42, 'pair-left': .42, 'pair-right': .5, full: 1, small: .34, large: .5, center: .67}[layout] || .75;
        return `(max-width: 600px) calc(100vw - 32px), (max-width: 1000px) calc((100vw - 56px) * ${fraction}), (max-width: 1536px) calc((100vw - 96px) * ${fraction}), ${Math.ceil(1440 * fraction)}px`;
    };
    const pauseButton = document.querySelector('[data-cover-pause]');
    const stopTimer = () => { window.clearTimeout(timer); timer = null; progress.classList.remove('is-running'); };
    const updatePause = () => {
        pauseButton.textContent = paused ? '▶' : 'Ⅱ';
        pauseButton.setAttribute('aria-label', labels[language][paused ? 'play' : 'pause']);
        pauseButton.setAttribute('aria-pressed', String(paused));
    };
    const schedule = () => {
        stopTimer();
        if (paused || !coverVisible || controlsFocused || document.hidden || dialog.open || coverSlides.length < 2) return;
        void progress.offsetWidth;
        progress.classList.add('is-running');
        timer = window.setTimeout(() => showCover(coverIndex + 1), 7000);
    };
    const showCover = index => {
        if (!coverSlides.length) return;
        coverIndex = (index + coverSlides.length) % coverSlides.length;
        coverSlides.forEach((slide, position) => slide.classList.toggle('is-active', position === coverIndex));
        document.querySelector('[data-cover-counter]').textContent = `${String(coverIndex + 1).padStart(2,'0')} / ${String(coverSlides.length).padStart(2,'0')}`;
        controls.hidden = false;
        document.querySelector('[data-cover-prev]').disabled = coverSlides.length < 2;
        document.querySelector('[data-cover-next]').disabled = coverSlides.length < 2;
        pauseButton.disabled = coverSlides.length < 2;
        updatePause();
        schedule();
    };
    const translate = requested => {
        language = labels[requested] ? requested : 'de';
        const t = labels[language];
        const services = window.MONTILLA_DATA.translations[language].services;
        const title = category === 'automotive' ? t.f1 : services[category].title;
        document.documentElement.lang = language;
        document.title = `${title} — MONTILLA VISUALS`;
        document.querySelector('[data-title]').textContent = title;
        document.querySelector('[data-description]').textContent = services[category].description;
        document.querySelector('meta[name="description"]').content = services[category].description;
        const textKeys = {back:'back',contact:'contact',edition:'edition',explore:'explore',selection:'selection','cover-label':'selection','intro-heading':'heading','intro-accent':'accent','pause-one':'pauseOne','pause-two':'pauseTwo',home:'home',empty:'empty',skip:'skip'};
        Object.entries(textKeys).forEach(([selector, key]) => document.querySelector(`[data-${selector}]`).textContent = t[key]);
        for (const name of ['close','prev','next']) document.querySelector(`[data-${name}]`).setAttribute('aria-label', t[name]);
        document.querySelector('[data-cover-prev]').setAttribute('aria-label',t.prev);
        document.querySelector('[data-cover-next]').setAttribute('aria-label',t.next);
        document.querySelector('[data-photo-grid]').setAttribute('aria-label',t.gallery);
        dialog.setAttribute('aria-label',t.viewer);
        cover.setAttribute('aria-label',t.presentation);
        document.querySelectorAll('[data-category]').forEach(el => el.textContent = el.dataset.category === 'automotive' ? t.f1 : services[el.dataset.category].title);
        document.querySelectorAll('[data-language]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.language === language)));
        slots.forEach(slot => { slot.setAttribute('aria-label', `${title} — ${t.photo} ${slot.dataset.photo}`); slot.querySelector('img').alt = `${title} — ${t.photo} ${slot.dataset.photo}`; });
        if (active) full.alt = active.querySelector('img').alt;
        updatePause();
        try { localStorage.setItem('montilla-language', language); } catch { /* Optional preference. */ }
    };
    const show = slot => {
        active = slot;
        full.src = slot.galleryPhoto?.full || slot.querySelector('img').src;
        full.alt = slot.querySelector('img').alt;
        const loaded = loadedSlots();
        document.querySelector('[data-counter]').textContent = `${String(loaded.indexOf(slot)+1).padStart(2,'0')} / ${String(loaded.length).padStart(2,'0')}`;
        document.querySelector('[data-prev]').disabled = loaded.length < 2;
        document.querySelector('[data-next]').disabled = loaded.length < 2;
    };
    const move = step => {
        const loaded = loadedSlots();
        if (loaded.length) show(loaded[(loaded.indexOf(active) + step + loaded.length) % loaded.length]);
    };
    // Discover supplied files without showing broken image icons or empty cards.
    const loadImage = src => new Promise(resolve => {
        const image = new Image();
        image.onload = () => resolve({src, width:image.naturalWidth, height:image.naturalHeight});
        image.onerror = () => resolve(null);
        image.src = src;
    });
    const resolvePhoto = async number => {
        if (optimizedPhotos[number]) return optimizedPhotos[number];
        for (const extension of ['webp','jpg','jpeg','png','WEBP','JPG','JPEG','PNG']) {
            const src = `../images/servicios/${folder}/${number}.${extension}`;
            // HEAD avoids downloading every full-size photograph before scrolling.
            if (location.protocol !== 'file:') {
                try {
                    const response = await fetch(src,{method:'HEAD'});
                    if (response.ok) return {src};
                    if (response.status === 404 || response.status === 410) continue;
                } catch { /* Fall back for hosts that do not support HEAD. */ }
            }
            const result = await loadImage(src);
            if (result) return result;
        }
        return null;
    };
    const registerCover = async () => {
        const selected = loadedSlots().slice(0,5);
        for (const slot of selected) {
            const photo = slot.galleryPhoto?.variants ? slot.galleryPhoto : await loadImage(slot.querySelector('img').src);
            if (!photo) continue;
            const slide = document.createElement('div');
            slide.className = `gallery-cover__slide${photo.height > photo.width ? ' is-portrait' : ''}`;
            const image = document.createElement('img');
            if (photo.variants) {
                image.srcset = sourceSet(photo);
                image.sizes = photo.height > photo.width ? '(max-width: 600px) 100vw, 64vw' : '100vw';
            }
            image.src = photo.src;
            image.fetchPriority = coverSlides.length === 0 ? 'high' : 'low';
            image.alt = '';
            image.width = photo.width;
            image.height = photo.height;
            image.decoding = 'async';
            slide.appendChild(image);
            slidesRoot.appendChild(slide);
            coverSlides.push(slide);
            showCover(coverIndex);
        }
    };
    const prepareGallery = async () => {
        let next = 0;
        const results = new Array(slots.length);
        const worker = async () => {
            while (next < slots.length) {
                const index = next++;
                results[index] = await resolvePhoto(slots[index].dataset.photo);
            }
        };
        await Promise.all(Array.from({length:4},worker));
        let position = 0;
        slots.forEach((slot,index) => {
            const photo = results[index];
            if (!photo) return;
            const image = slot.querySelector('img');
            image.loading = 'lazy';
            slot.galleryPhoto = photo;
            const layout = layouts[position];
            if (photo.variants) {
                image.srcset = sourceSet(photo);
                image.sizes = gallerySizes(layout);
            }
            if (photo.width) { image.width = photo.width; image.height = photo.height; }
            image.addEventListener('load', () => {
                if (!photo.width) {
                    image.width = image.naturalWidth;
                    image.height = image.naturalHeight;
                }
            }, {once:true});
            image.addEventListener('error', () => { slot.hidden = true; slot.disabled = true; }, {once:true});
            image.src = photo.src;
            slot.dataset.layout = layouts[position++];
            slot.hidden = false;
            slot.disabled = false;
        });
        document.querySelector('[data-empty]').hidden = position > 0;
        document.querySelectorAll('[data-interlude]').forEach(el => {
            const first = el.dataset.interlude === '1' ? 8 : 15;
            el.hidden = !slots.some(slot => !slot.disabled && Number(slot.dataset.photo) >= first);
        });
        await registerCover();
    };
    slots.forEach(slot => slot.addEventListener('click', () => {
        if (slot.disabled) return;
        opener = slot;
        show(slot);
        dialog.showModal();
        document.body.classList.add('lightbox-open');
        stopTimer();
    }));
    document.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => { document.body.classList.remove('lightbox-open'); opener?.focus(); schedule(); });
    document.querySelector('[data-prev]').addEventListener('click', () => move(-1));
    document.querySelector('[data-next]').addEventListener('click', () => move(1));
    dialog.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); move(e.key === 'ArrowLeft' ? -1 : 1); }
    });
    document.querySelector('[data-cover-prev]').addEventListener('click', () => showCover(coverIndex - 1));
    document.querySelector('[data-cover-next]').addEventListener('click', () => showCover(coverIndex + 1));
    pauseButton.addEventListener('click', () => { paused = !paused; if (!paused) controlsFocused = false; updatePause(); schedule(); });
    controls.addEventListener('focusin', () => { controlsFocused = true; stopTimer(); });
    controls.addEventListener('focusout', event => { controlsFocused = controls.contains(event.relatedTarget); schedule(); });
    document.addEventListener('visibilitychange', schedule);
    reducedMotion.addEventListener('change', event => { paused = event.matches; updatePause(); schedule(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(entries => { coverVisible = entries[0].isIntersecting; schedule(); }).observe(cover);
    document.querySelectorAll('[data-language]').forEach(el => el.addEventListener('click', () => translate(el.dataset.language)));
    let initial = navigator.language.slice(0,2);
    try { initial = localStorage.getItem('montilla-language') || initial; } catch { /* Optional preference. */ }
    translate(initial);
    prepareGallery();
})();

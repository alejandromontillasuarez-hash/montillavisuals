document.documentElement.classList.add('js');
const homeHeader = document.querySelector('.page-home .site-head');
if (homeHeader) {
  function updateHeader() {
    homeHeader.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', updateHeader, {passive: true});
  window.addEventListener('pageshow', updateHeader);
  updateHeader();
}
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
function setMenu(open) {
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') === 'false'));
nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    toggle.focus();
  }
});
const viewer = document.querySelector('.lightbox');
if (viewer?.showModal) {
  const photos = Array.from(document.querySelectorAll('[data-photo]'));
  const image = viewer.querySelector('img');
  const counter = viewer.querySelector('output');
  const viewport = viewer.querySelector('.zoom-viewport');
  const zoomIn = viewer.querySelector('[data-zoom-in]');
  const zoomOut = viewer.querySelector('[data-zoom-out]');
  let zoom = 1;
  function setZoom(value) {
    zoom = Math.min(3, Math.max(1, value));
    const size = (zoom * 100) + '%';
    const centerX = (viewport.scrollLeft + viewport.clientWidth / 2) / (viewport.scrollWidth || 1);
    const centerY = (viewport.scrollTop + viewport.clientHeight / 2) / (viewport.scrollHeight || 1);
    image.style.width = size;
    image.style.height = size;
    viewport.scrollLeft = centerX * viewport.scrollWidth - viewport.clientWidth / 2;
    viewport.scrollTop = centerY * viewport.scrollHeight - viewport.clientHeight / 2;
    viewer.querySelector('[data-zoom-value]').textContent = size;
    zoomOut.disabled = zoom === 1;
    zoomIn.disabled = zoom === 3;
  }
  zoomIn.onclick = () => setZoom(zoom + .5);
  zoomOut.onclick = () => setZoom(zoom - .5);
  let current = 0;
  let opener;
  let startX;
  function show(index) {
    current = (index + photos.length) % photos.length;
    image.src = photos[current].dataset.full;
    image.alt = photos[current].querySelector('img').alt;
    setZoom(1);
    counter.textContent = (current + 1) + ' / ' + photos.length;
  }
  photos.forEach((photo, index) => photo.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = photo;
    show(index);
    viewer.showModal();
  }));
  viewer.querySelector('[data-close]').onclick = () => viewer.close();
  viewer.querySelector('[data-prev]').onclick = () => show(current - 1);
  viewer.querySelector('[data-next]').onclick = () => show(current + 1);
  viewer.addEventListener('close', () => opener?.focus());
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
  image.addEventListener('touchstart', event => { startX = event.changedTouches[0].clientX; }, {passive: true});
  image.addEventListener('touchend', event => {
    const delta = event.changedTouches[0].clientX - startX;
    if (zoom === 1 && Math.abs(delta) > 50) show(current + (delta < 0 ? 1 : -1));
  }, {passive: true});
}

const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  motion.addEventListener('change', event => { if (event.matches) heroVideo.pause(); });
  if (!motion.matches && !navigator.connection?.saveData) {
    const compact = window.matchMedia('(max-width: 780px)').matches;
    heroVideo.src = compact ? heroVideo.dataset.mobile : heroVideo.dataset.desktop;
    heroVideo.play().catch(() => {});
  }
}


const whatsappForm = document.querySelector('[data-wa]');
if (whatsappForm) {
  whatsappForm.hidden = false;
  whatsappForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!whatsappForm.reportValidity()) return;
    const values = new FormData(whatsappForm);
    const language = document.documentElement.lang;
    const intro = language === 'de' ? 'Neue Anfrage über MONTILLA VISUALS' : 'Nueva consulta desde MONTILLA VISUALS';
    const fields = language === 'de' ? ['Name','E-Mail','Projekt','Nachricht'] : ['Nombre','Correo','Proyecto','Mensaje'];
    const text = [intro, ...['name','email','project','message'].map((key,index) => fields[index] + ': ' + values.get(key).trim())].join('\n');
    const url = new URL(whatsappForm.action);
    url.searchParams.set('text',text);
    window.open(url,'_blank','noopener,noreferrer');
  });
}

const seriesViewer = document.querySelector('[data-series-viewer]');
if (seriesViewer) {
  const frames = [...seriesViewer.querySelectorAll('[data-photo]')];
  const controls = seriesViewer.querySelector('.series-controls');
  const count = controls.querySelector('output');
  let index = Math.max(0, frames.findIndex(frame => '#' + frame.id === location.hash));
  function display(step = 0) {
    index = (index + step + frames.length) % frames.length;
    frames.forEach((frame, position) => { frame.hidden = position !== index; });
    count.textContent = (index + 1) + ' / ' + frames.length;
  }
  controls.querySelector('[data-series-prev]').onclick = () => display(-1);
  controls.querySelector('[data-series-next]').onclick = () => display(1);
  seriesViewer.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const focusWasOnPhoto = frames.includes(document.activeElement);
    display(event.key === 'ArrowLeft' ? -1 : 1);
    if (focusWasOnPhoto) frames[index].focus();
  });
  const zoomButton = controls.querySelector('[data-series-zoom]');
  zoomButton.hidden = !viewer?.showModal;
  zoomButton.onclick = () => frames[index].click();
  controls.hidden = false;
  display();
}

const heroMusic = document.querySelector('[data-hero-music]');
if (heroMusic) {
  const positionKey = 'montilla-music-position';
  const muteKey = 'montilla-rojo-sangre-mute';
  const soundToggle = document.querySelector('[data-sound-toggle]');
  function readMuted() {
    try { return localStorage.getItem(muteKey) === '1'; } catch { return false; }
  }
  let muted = readMuted();
  function updateSoundControl() {
    const silent = muted || heroMusic.paused;
    soundToggle.dataset.silent = String(silent);
    const label = silent ? soundToggle.dataset.unmute : soundToggle.dataset.mute;
    soundToggle.setAttribute('aria-label', label);
    soundToggle.title = label;
  }
  soundToggle.hidden = false;
  updateSoundControl();
  heroMusic.addEventListener('play', updateSoundControl);
  heroMusic.addEventListener('pause', updateSoundControl);

  let savedPosition = 0;
  try {
    savedPosition = Number(sessionStorage.getItem(positionKey));
  } catch {
    // Storage may be disabled in local previews.
  }
  function restorePosition() {
    if (savedPosition > 0 && Number.isFinite(heroMusic.duration)) {
      heroMusic.currentTime = savedPosition % heroMusic.duration;
    }
  }
  if (heroMusic.readyState) restorePosition();
  else heroMusic.addEventListener('loadedmetadata', restorePosition, {once: true});

  function clearMusicFallback() {
    document.removeEventListener('click', startMusic, true);
    document.removeEventListener('keydown', startMusic, true);
    document.removeEventListener('touchend', startMusic, true);
  }
  async function startMusic(event) {
    if (muted || event?.target?.closest?.("[data-sound-toggle]")) return;
    try {
      await heroMusic.play();
      clearMusicFallback();
    } catch {
      // The browser can defer audible media until a trusted interaction.
    }
  }
  soundToggle.addEventListener('click', () => {
    muted = !heroMusic.paused && !muted;
    try { localStorage.setItem(muteKey, muted ? '1' : '0'); } catch {}
    if (muted) {
      heroMusic.pause();
      clearMusicFallback();
    } else {
      startMusic();
    }
    updateSoundControl();
  });
  document.addEventListener('click', startMusic, true);
  document.addEventListener('keydown', startMusic, true);
  document.addEventListener('touchend', startMusic, true);
  startMusic();
  window.addEventListener('pagehide', () => {
    try { sessionStorage.setItem(positionKey, String(heroMusic.currentTime || savedPosition)); } catch {}
    heroMusic.pause();
  });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    muted = readMuted();
    updateSoundControl();
    try { savedPosition = Number(sessionStorage.getItem(positionKey)); } catch {}
    restorePosition();
    document.addEventListener('click', startMusic, true);
    document.addEventListener('keydown', startMusic, true);
    document.addEventListener('touchend', startMusic, true);
    startMusic();
  });
}

const galleryTrack = document.querySelector('.gallery-track');
if (galleryTrack) {
  const controls = document.querySelector('.gallery-controls');
  const previous = controls.querySelector('[data-gallery-prev]');
  const next = controls.querySelector('[data-gallery-next]');

  function updateGalleryControls() {
    const end = galleryTrack.scrollWidth - galleryTrack.clientWidth;
    controls.hidden = end <= 1;
    previous.setAttribute('aria-disabled', String(galleryTrack.scrollLeft <= 1));
    next.setAttribute('aria-disabled', String(galleryTrack.scrollLeft >= end - 1));
  }

  function moveGallery(button, direction) {
    if (button.getAttribute('aria-disabled') === 'true') return;
    const [first, second] = galleryTrack.children;
    const step = second.getBoundingClientRect().left - first.getBoundingClientRect().left;
    const position = Math.round(galleryTrack.scrollLeft / step);
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    galleryTrack.scrollTo({left: (position + direction) * step, behavior: reducedMotion ? 'instant' : 'smooth'});
  }

  previous.addEventListener('click', () => moveGallery(previous, -1));
  next.addEventListener('click', () => moveGallery(next, 1));
  galleryTrack.addEventListener('scroll', updateGalleryControls, {passive: true});
  window.addEventListener('resize', updateGalleryControls);
  updateGalleryControls();
}

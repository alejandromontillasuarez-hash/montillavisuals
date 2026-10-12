(() => {
    'use strict';
    const update = () => document.body.classList.toggle('ambient-paused', document.hidden);
    document.addEventListener('visibilitychange', update);
    update();
})();

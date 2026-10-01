/* =========================================================
   MONTILLA VISUALS
   PREMIUM EDITORIAL PHOTOGRAPHY WEBSITE
   ========================================================= */

(() => {
    "use strict";

    /* =====================================================
       01. DOM REFERENCES
       ===================================================== */

    const dom = {
        body: document.body,
        html: document.documentElement,

        header: document.getElementById("site-header"),
        main: document.getElementById("main-content"),
        currentYear: document.getElementById("current-year"),

        menuToggle: document.querySelector(".menu-toggle"),
        mobileMenu: document.getElementById("mobile-menu"),
        mobileLinks: document.querySelectorAll(".mobile-nav a"),

        languageButtons: document.querySelectorAll(".language-button"),

        heroSlides: document.querySelectorAll(".hero-slide"),
        heroPrev: document.querySelector(".hero-prev"),
        heroNext: document.querySelector(".hero-next"),
        heroProgress: document.querySelector(".hero-progress__bar"),
        heroIndex: document.querySelector(".hero__index"),

        portfolioGrid: document.getElementById("portfolio-grid"),
        filterButtons: document.querySelectorAll(".filter-button"),

        lightbox: document.getElementById("lightbox"),
        lightboxImage: document.getElementById("lightbox-image"),
        lightboxTitle: document.getElementById("lightbox-title"),
        lightboxDescription: document.getElementById("lightbox-description"),
        lightboxCategory: document.getElementById("lightbox-category"),
        lightboxLocation: document.getElementById("lightbox-location"),
        lightboxYear: document.getElementById("lightbox-year"),
        lightboxCurrent: document.getElementById("lightbox-current"),
        lightboxTotal: document.getElementById("lightbox-total"),
        lightboxClose: document.querySelector(".lightbox__close"),
        lightboxPrev: document.querySelector(".lightbox__prev"),
        lightboxNext: document.querySelector(".lightbox__next"),
        lightboxCloseTargets: document.querySelectorAll("[data-lightbox-close]"),

        contactForm: document.getElementById("contact-form"),
        formStatus: document.getElementById("form-status")
    };

    /* =====================================================
       02. APPLICATION STATE
       ===================================================== */

    const state = {
        initialized: false,

        language: "de",

        hero: {
            current: 0,
            interval: null,
            duration: 6000
        },

        portfolio: {
            filter: "all",
            visibleItems: []
        },

        mobileMenu: {
            open: false,
            previousFocus: null
        },

        lightbox: {
            open: false,
            index: 0,
            previousFocus: null
        }
    };

    const SUPPORTED_LANGUAGES = ["de", "en", "es"];
    const DEFAULT_LANGUAGE = "de";

    /* =====================================================
       03. SITE DATA
       ===================================================== */

    const siteData = window.MONTILLA_DATA;

    if (!siteData) {
        throw new Error("Site data failed to load.");
    }

    const { portfolioData, translations } = siteData;
    /* =====================================================
       04. UTILITIES
       ===================================================== */

    const isReducedMotion = () =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const getTranslation = (path) => {
        const parts = path.split(".");
        let value = translations[state.language];

        for (const part of parts) {
            if (value && Object.prototype.hasOwnProperty.call(value, part)) {
                value = value[part];
            } else {
                return "";
            }
        }

        return typeof value === "string" ? value : "";
    };

    const sanitizeLanguage = (language) =>
        SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;

    const getBrowserLanguage = () => {
        const browserLanguage = (navigator.language || "").toLowerCase();

        if (browserLanguage.startsWith("de")) return "de";
        if (browserLanguage.startsWith("es")) return "es";
        if (browserLanguage.startsWith("en")) return "en";

        return DEFAULT_LANGUAGE;
    };

    const formatIndex = (number) =>
        String(number).padStart(2, "0");

    const escapeHtml = (value) => {
        const element = document.createElement("div");
        element.textContent = String(value ?? "");
        return element.innerHTML;
    };

    /* =====================================================
       05. LANGUAGE SYSTEM
       ===================================================== */

    const detectInitialLanguage = () => {
        let storedLanguage = null;

        try {
            storedLanguage = localStorage.getItem("montilla-language");
        } catch {
            storedLanguage = null;
        }

        if (storedLanguage) {
            return sanitizeLanguage(storedLanguage);
        }

        return getBrowserLanguage();
    };

    const saveLanguage = () => {
        try {
            localStorage.setItem("montilla-language", state.language);
        } catch {
            /* Storage may be unavailable. */
        }
    };

    const applyTranslations = () => {
        dom.html.lang = state.language;

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.dataset.i18n;
            const translation = getTranslation(key);

            if (translation) {
                element.textContent = translation;
            }
        });

        document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
            const key = element.dataset.i18nAria;
            const translation = getTranslation(key);

            if (translation) {
                element.setAttribute("aria-label", translation);
            }
        });

        dom.languageButtons.forEach((button) => {
            const active = button.dataset.language === state.language;

            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });

        if (dom.menuToggle) {
            dom.menuToggle.setAttribute(
                "aria-label",
                getTranslation(
                    state.mobileMenu.open
                        ? "accessibility.closeMenu"
                        : "accessibility.openMenu"
                )
            );
        }

        updateSelectOptionTranslations();
        renderPortfolio();
    };

    const updateSelectOptionTranslations = () => {
        const options = document.querySelectorAll(
            "#service option[data-i18n]"
        );

        options.forEach((option) => {
            const key = option.dataset.i18n;
            const translation = getTranslation(key);

            if (translation) {
                option.textContent = translation;
            }
        });
    };

    const setLanguage = (language) => {
        const nextLanguage = sanitizeLanguage(language);

        if (state.language === nextLanguage) {
            applyTranslations();
            return;
        }

        state.language = nextLanguage;
        saveLanguage();
        applyTranslations();
    };

    /* =====================================================
       06. MOBILE NAVIGATION
       ===================================================== */

    const getMobileFocusableElements = () => {
        if (!dom.mobileMenu) return [];

        return Array.from(
            dom.mobileMenu.querySelectorAll(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
        );
    };

    const openMobileMenu = () => {
        if (!dom.mobileMenu || state.mobileMenu.open) return;

        state.mobileMenu.previousFocus =
            document.activeElement instanceof HTMLElement
                ? document.activeElement
                : dom.menuToggle;

        state.mobileMenu.open = true;

        dom.body.classList.add("menu-open");
        dom.mobileMenu.classList.add("is-open");
        dom.mobileMenu.setAttribute("aria-hidden", "false");
        dom.menuToggle.setAttribute("aria-expanded", "true");
        dom.menuToggle.setAttribute(
            "aria-label",
            getTranslation("accessibility.closeMenu")
        );

        const focusable = getMobileFocusableElements();

        if (focusable.length) {
            window.requestAnimationFrame(() => focusable[0].focus());
        }
    };

    const closeMobileMenu = (restoreFocus = true) => {
        if (!dom.mobileMenu || !state.mobileMenu.open) return;

        state.mobileMenu.open = false;

        dom.body.classList.remove("menu-open");
        dom.mobileMenu.classList.remove("is-open");
        dom.mobileMenu.setAttribute("aria-hidden", "true");
        dom.menuToggle.setAttribute("aria-expanded", "false");
        dom.menuToggle.setAttribute(
            "aria-label",
            getTranslation("accessibility.openMenu")
        );

        if (
            restoreFocus &&
            state.mobileMenu.previousFocus &&
            typeof state.mobileMenu.previousFocus.focus === "function"
        ) {
            state.mobileMenu.previousFocus.focus();
        }

        state.mobileMenu.previousFocus = null;
    };

    const trapMobileMenuFocus = (event) => {
        if (!state.mobileMenu.open || event.key !== "Tab") return;

        const focusable = getMobileFocusableElements();

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };

    /* =====================================================
       07. HERO
       ===================================================== */

    const updateHeroUI = () => {
        if (!dom.heroSlides.length) return;

        const total = dom.heroSlides.length;
        const current = state.hero.current;

        if (dom.heroIndex) {
            dom.heroIndex.innerHTML =
                `${formatIndex(current + 1)} <span>/</span> ${formatIndex(total)}`;
        }

        if (dom.heroProgress) {
            dom.heroProgress.classList.remove("is-running");

            if (!isReducedMotion()) {
                void dom.heroProgress.offsetWidth;
                dom.heroProgress.classList.add("is-running");
            }
        }
    };

    const showHeroSlide = (index, restartTimer = true) => {
        if (!dom.heroSlides.length) return;

        const total = dom.heroSlides.length;

        state.hero.current = (index + total) % total;

        dom.heroSlides.forEach((slide, slideIndex) => {
            slide.classList.toggle(
                "is-active",
                slideIndex === state.hero.current
            );
        });

        updateHeroUI();

        if (restartTimer) {
            restartHeroAutoplay();
        }
    };

    const nextHeroSlide = () => {
        showHeroSlide(state.hero.current + 1);
    };

    const previousHeroSlide = () => {
        showHeroSlide(state.hero.current - 1);
    };

    const stopHeroAutoplay = () => {
        if (state.hero.interval) {
            window.clearInterval(state.hero.interval);
            state.hero.interval = null;
        }
    };

    const startHeroAutoplay = () => {
        stopHeroAutoplay();

        if (isReducedMotion() || dom.heroSlides.length <= 1) {
            return;
        }

        state.hero.interval = window.setInterval(
            nextHeroSlide,
            state.hero.duration
        );
    };

    const restartHeroAutoplay = () => {
        startHeroAutoplay();
    };

    /* =====================================================
       08. PORTFOLIO
       ===================================================== */

    const getFilteredPortfolio = () => {
        if (state.portfolio.filter === "all") {
            return portfolioData;
        }

        return portfolioData.filter(
            (item) => item.category === state.portfolio.filter
        );
    };

    const getCategoryLabel = (category) => {
        const translation = getTranslation(`filters.${category}`);
        return translation || category.toUpperCase();
    };

    const createPortfolioItem = (item, index) => {
        const categoryLabel = getCategoryLabel(item.category);

        const button = document.createElement("button");
        button.type = "button";
        button.className = "portfolio-item reveal";
        button.dataset.portfolioIndex = String(index);
        button.setAttribute(
            "aria-label",
            `${item.title} — ${categoryLabel} — ${item.location} — ${item.year}`
        );

        button.innerHTML = `
            <span class="portfolio-item__media">
                <img
                    src="${escapeHtml(item.image)}"
                    alt="${escapeHtml(item.title)} — ${escapeHtml(categoryLabel)} — ${escapeHtml(item.location)}"
                    loading="lazy"
                    decoding="async"
                >
                <span class="portfolio-item__overlay">
                    <span class="portfolio-item__top">
                        <span>${escapeHtml(categoryLabel)}</span>
                        <span class="portfolio-item__number">${formatIndex(index + 1)}</span>
                    </span>

                    <span class="portfolio-item__bottom">
                        <span class="portfolio-item__title">${escapeHtml(item.title)}</span>
                        <span class="portfolio-item__meta">
                            ${escapeHtml(item.location)}<br>
                            ${escapeHtml(item.year)}
                        </span>
                    </span>
                </span>
            </span>
        `;

        return button;
    };

    const renderPortfolio = () => {
        if (!dom.portfolioGrid) return;

        const filteredItems = getFilteredPortfolio();

        state.portfolio.visibleItems = filteredItems.map((item) =>
            portfolioData.indexOf(item)
        );

        dom.portfolioGrid.replaceChildren();

        if (!filteredItems.length) {
            const empty = document.createElement("div");
            empty.className = "portfolio-empty";
            empty.textContent = getTranslation("portfolio.empty");
            dom.portfolioGrid.appendChild(empty);
            return;
        }

        filteredItems.forEach((item) => {
            const originalIndex = portfolioData.indexOf(item);
            dom.portfolioGrid.appendChild(
                createPortfolioItem(item, originalIndex)
            );
        });

        initializeRevealElements();
    };

    const setPortfolioFilter = (filter) => {
        const validFilters = [
            "all",
            "portraits",
            "fashion",
            "events",
            "djs",
            "nightlife",
            "concerts",
            "street",
            "couples",
            "automotive",
            "wildlife"
        ];

        state.portfolio.filter = validFilters.includes(filter)
            ? filter
            : "all";

        dom.filterButtons.forEach((button) => {
            const active = button.dataset.filter === state.portfolio.filter;

            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });

        renderPortfolio();
    };

    /* =====================================================
       09. LIGHTBOX
       ===================================================== */

    const getLightboxFocusableElements = () => {
        if (!dom.lightbox) return [];

        return Array.from(
            dom.lightbox.querySelectorAll(
                'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
        );
    };

    const updateLightbox = () => {
        const item = portfolioData[state.lightbox.index];

        if (!item) return;

        const categoryLabel = getCategoryLabel(item.category);

        dom.lightboxImage.src = item.image;
        dom.lightboxImage.alt =
            `${item.title} — ${categoryLabel} — ${item.location}`;

        dom.lightboxTitle.textContent = item.title;
        dom.lightboxDescription.textContent = item.description;
        dom.lightboxCategory.textContent = categoryLabel;
        dom.lightboxLocation.textContent = item.location;
        dom.lightboxYear.textContent = item.year;
        dom.lightboxCurrent.textContent =
            formatIndex(state.lightbox.index + 1);
        dom.lightboxTotal.textContent =
            formatIndex(portfolioData.length);
    };

    const openLightbox = (index, triggerElement = null) => {
        if (
            !Number.isInteger(index) ||
            index < 0 ||
            index >= portfolioData.length
        ) {
            return;
        }

        state.lightbox.previousFocus =
            triggerElement ||
            (document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null);

        state.lightbox.index = index;
        state.lightbox.open = true;

        updateLightbox();

        dom.body.classList.add("lightbox-open");
        dom.lightbox.classList.add("is-open");
        dom.lightbox.setAttribute("aria-hidden", "false");

        window.requestAnimationFrame(() => {
            dom.lightboxClose.focus();
        });
    };

    const closeLightbox = (restoreFocus = true) => {
        if (!state.lightbox.open) return;

        state.lightbox.open = false;

        dom.body.classList.remove("lightbox-open");
        dom.lightbox.classList.remove("is-open");
        dom.lightbox.setAttribute("aria-hidden", "true");

        if (
            restoreFocus &&
            state.lightbox.previousFocus &&
            typeof state.lightbox.previousFocus.focus === "function"
        ) {
            state.lightbox.previousFocus.focus();
        }

        state.lightbox.previousFocus = null;
    };

    const showLightboxItem = (index) => {
        if (!Number.isInteger(index)) return;

        const total = portfolioData.length;

        state.lightbox.index = (index + total) % total;

        updateLightbox();
    };

    const nextLightboxItem = () => {
        showLightboxItem(state.lightbox.index + 1);
    };

    const previousLightboxItem = () => {
        showLightboxItem(state.lightbox.index - 1);
    };

    const trapLightboxFocus = (event) => {
        if (!state.lightbox.open || event.key !== "Tab") return;

        const focusable = getLightboxFocusableElements();

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };

    /* =====================================================
       10. CONTACT FORM
       ===================================================== */

    const clearFormErrors = () => {
        document
            .querySelectorAll(".form-field.has-error")
            .forEach((field) => field.classList.remove("has-error"));

        document
            .querySelectorAll(".form-error")
            .forEach((error) => {
                error.textContent = "";
            });
    };

    const setFieldError = (fieldId, message) => {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(`${fieldId}-error`);

        if (field) {
            field.closest(".form-field")?.classList.add("has-error");
            field.setAttribute("aria-invalid", "true");
        }

        if (error) {
            error.textContent = message;
        }
    };

    const clearFieldInvalidState = () => {
        document
            .querySelectorAll("#contact-form input, #contact-form select, #contact-form textarea")
            .forEach((field) => {
                field.removeAttribute("aria-invalid");
            });
    };

    const validateEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateForm = () => {
        clearFormErrors();
        clearFieldInvalidState();

        const formData = new FormData(dom.contactForm);

        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const service = String(formData.get("service") || "").trim();
        const message = String(formData.get("message") || "").trim();

        let valid = true;
        let firstInvalid = null;

        if (!name) {
            setFieldError("name", getTranslation("form.errors.name"));
            firstInvalid ||= document.getElementById("name");
            valid = false;
        }

        if (!email || !validateEmail(email)) {
            setFieldError("email", getTranslation("form.errors.email"));
            firstInvalid ||= document.getElementById("email");
            valid = false;
        }

        if (!service) {
            setFieldError("service", getTranslation("form.errors.service"));
            firstInvalid ||= document.getElementById("service");
            valid = false;
        }

        if (!message) {
            setFieldError("message", getTranslation("form.errors.message"));
            firstInvalid ||= document.getElementById("message");
            valid = false;
        }

        if (!valid && firstInvalid) {
            firstInvalid.focus();
        }

        return valid;
    };

    const getServiceLabel = (serviceValue) => {
        const key = `services.${serviceValue}.title`;
        return getTranslation(key) || serviceValue;
    };

    const buildWhatsAppMessage = () => {
        const formData = new FormData(dom.contactForm);

        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const phone = String(formData.get("phone") || "").trim();
        const service = String(formData.get("service") || "").trim();
        const date = String(formData.get("date") || "").trim();
        const time = String(formData.get("time") || "").trim();
        const message = String(formData.get("message") || "").trim();

        const languageLabel = {
            de: "Neue Anfrage über MONTILLA VISUALS",
            en: "New inquiry via MONTILLA VISUALS",
            es: "Nueva consulta desde MONTILLA VISUALS"
        };

        const lines = [
            languageLabel[state.language],
            "",
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone || "—"}`,
            `Service: ${getServiceLabel(service)}`,
            `Date: ${date || "—"}`,
            `Time: ${time || "—"}`,
            "",
            `Message:`,
            message
        ];

        return lines.join("\n");
    };

    const submitContactForm = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            if (dom.formStatus) {
                dom.formStatus.textContent = "";
            }
            return;
        }

        const message = buildWhatsAppMessage();
        const encodedMessage = encodeURIComponent(message);

        const whatsappUrl =
            `https://wa.me/4917681321353?text=${encodedMessage}`;

        if (dom.formStatus) {
            dom.formStatus.textContent =
                getTranslation("form.status");
        }

        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );
    };

    /* =====================================================
       11. SCROLL / REVEAL
       ===================================================== */

    let revealObserver = null;

    const initializeRevealElements = () => {
        const elements = document.querySelectorAll(".reveal:not([data-reveal-ready])");

        if (!elements.length) return;

        if (
            isReducedMotion() ||
            !("IntersectionObserver" in window)
        ) {
            elements.forEach((element) => {
                element.classList.add("visible");
                element.dataset.revealReady = "true";
            });
            return;
        }

        if (!revealObserver) {
            revealObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;

                        entry.target.classList.add("visible");
                        entry.target.dataset.revealReady = "true";

                        observer.unobserve(entry.target);
                    });
                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -5% 0px"
                }
            );
        }

        elements.forEach((element) => {
            revealObserver.observe(element);
        });
    };

    /* =====================================================
       12. HEADER
       ===================================================== */

    const updateHeader = () => {
        if (!dom.header) return;

        dom.header.classList.toggle(
            "is-scrolled",
            window.scrollY > 40
        );
    };

    /* =====================================================
       13. KEYBOARD ACCESSIBILITY
       ===================================================== */

    const handleGlobalKeydown = (event) => {
        if (state.mobileMenu.open) {
            if (event.key === "Escape") {
                event.preventDefault();
                closeMobileMenu(true);
                return;
            }

            trapMobileMenuFocus(event);
        }

        if (state.lightbox.open) {
            if (event.key === "Escape") {
                event.preventDefault();
                closeLightbox(true);
                return;
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();
                nextLightboxItem();
                return;
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                previousLightboxItem();
                return;
            }

            trapLightboxFocus(event);
        }
    };

    /* =====================================================
       14. TOUCH / SWIPE LIGHTBOX
       ===================================================== */

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (event) => {
        if (!state.lightbox.open || !event.touches.length) return;

        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    };

    const handleTouchEnd = (event) => {
        if (!state.lightbox.open || !event.changedTouches.length) return;

        const touch = event.changedTouches[0];

        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;

        if (Math.abs(deltaX) < 50) return;
        if (Math.abs(deltaX) < Math.abs(deltaY)) return;

        if (deltaX < 0) {
            nextLightboxItem();
        } else {
            previousLightboxItem();
        }
    };

    /* =====================================================
       15. EVENTS
       ===================================================== */

    const bindEvents = () => {
        dom.languageButtons.forEach((button) => {
            button.addEventListener("click", () => {
                setLanguage(button.dataset.language);
            });
        });

        dom.menuToggle?.addEventListener("click", () => {
            if (state.mobileMenu.open) {
                closeMobileMenu(true);
            } else {
                openMobileMenu();
            }
        });

        dom.mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
                closeMobileMenu(false);
            });
        });

        dom.filterButtons.forEach((button) => {
            button.addEventListener("click", () => {
                setPortfolioFilter(button.dataset.filter);
            });
        });

        dom.portfolioGrid?.addEventListener("click", (event) => {
            if (!(event.target instanceof Element)) return;

            const item = event.target.closest(".portfolio-item");
            if (!item || !dom.portfolioGrid.contains(item)) return;

            const index = Number(item.dataset.portfolioIndex);
            if (!Number.isInteger(index)) return;

            openLightbox(index, item);
        });

        dom.heroPrev?.addEventListener("click", previousHeroSlide);
        dom.heroNext?.addEventListener("click", nextHeroSlide);

        dom.lightboxCloseTargets.forEach((element) => {
            element.addEventListener("click", () => {
                closeLightbox(true);
            });
        });

        dom.lightboxPrev?.addEventListener("click", previousLightboxItem);
        dom.lightboxNext?.addEventListener("click", nextLightboxItem);

        dom.lightboxImage?.addEventListener("error", () => {
            dom.lightboxImage.alt =
                "Image unavailable";
        });

        dom.contactForm?.addEventListener(
            "submit",
            submitContactForm
        );

        document.addEventListener(
            "keydown",
            handleGlobalKeydown
        );

        dom.lightbox?.addEventListener(
            "touchstart",
            handleTouchStart,
            { passive: true }
        );

        dom.lightbox?.addEventListener(
            "touchend",
            handleTouchEnd,
            { passive: true }
        );

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

        document.addEventListener(
            "visibilitychange",
            () => {
                if (document.hidden) {
                    stopHeroAutoplay();
                } else {
                    startHeroAutoplay();
                }
            }
        );

        const motionQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        const handleMotionChange = () => {
            if (motionQuery.matches) {
                stopHeroAutoplay();
                updateHeroUI();
            } else {
                startHeroAutoplay();
                updateHeroUI();
            }
        };

        if (typeof motionQuery.addEventListener === "function") {
            motionQuery.addEventListener(
                "change",
                handleMotionChange
            );
        }
    };

    /* =====================================================
       16. INITIALIZATION
       ===================================================== */

    const initialize = () => {
        if (state.initialized) return;

        state.initialized = true;

        state.language = detectInitialLanguage();

        if (dom.currentYear) {
            dom.currentYear.textContent =
                String(new Date().getFullYear());
        }

        applyTranslations();

        showHeroSlide(0, false);
        startHeroAutoplay();

        updateHeader();
        initializeRevealElements();
        bindEvents();
    };

    /* =====================================================
       17. START
       ===================================================== */

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialize,
            { once: true }
        );
    } else {
        initialize();
    }
})();

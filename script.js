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
       03. PORTFOLIO DATA
       ===================================================== */

    const portfolioData = [
        {
            image: "images/portfolio/photo-01.webp",
            category: "portraits",
            title: "After Hours",
            location: "Hamburg, Germany",
            year: "2026",
            description: "A portrait study focused on presence, expression and the atmosphere after dark."
        },
        {
            image: "images/portfolio/photo-02.webp",
            category: "djs",
            title: "Frequency",
            location: "Hamburg, Germany",
            year: "2026",
            description: "Electronic music culture captured through movement, light and the intensity of performance."
        },
        {
            image: "images/portfolio/photo-03.webp",
            category: "nightlife",
            title: "Nocturne",
            location: "Hamburg, Germany",
            year: "2026",
            description: "A visual study of nightlife, artificial light and fleeting moments inside the crowd."
        },
        {
            image: "images/portfolio/photo-04.webp",
            category: "fashion",
            title: "Concrete",
            location: "Hamburg, Germany",
            year: "2026",
            description: "Editorial fashion imagery shaped by architecture, texture and controlled composition."
        },
        {
            image: "images/portfolio/photo-05.webp",
            category: "street",
            title: "Passing Through",
            location: "Hamburg, Germany",
            year: "2026",
            description: "An observational frame from the streets, built around timing and visual coincidence."
        },
        {
            image: "images/portfolio/photo-06.webp",
            category: "events",
            title: "The Room",
            location: "Hamburg, Germany",
            year: "2026",
            description: "Event photography focused on atmosphere, interaction and the details around the main moment."
        },
        {
            image: "images/portfolio/photo-07.webp",
            category: "concerts",
            title: "Live Signal",
            location: "Hamburg, Germany",
            year: "2026",
            description: "Performance imagery built around stage light, movement and the connection with the audience."
        },
        {
            image: "images/portfolio/photo-08.webp",
            category: "couples",
            title: "Between Us",
            location: "Hamburg, Germany",
            year: "2026",
            description: "Natural couple photography focused on connection, gesture and unforced moments."
        },
        {
            image: "images/portfolio/photo-09.webp",
            category: "automotive",
            title: "Machine / Motion",
            location: "Germany",
            year: "2026",
            description: "Automotive imagery combining mechanical detail with environment and cinematic atmosphere."
        },
        {
            image: "images/portfolio/photo-10.webp",
            category: "wildlife",
            title: "Wild Presence",
            location: "Germany",
            year: "2026",
            description: "A quiet observation of wildlife, texture and natural behavior."
        },
        {
            image: "images/portfolio/photo-11.webp",
            category: "portraits",
            title: "Still Moving",
            location: "Hamburg, Germany",
            year: "2026",
            description: "A portrait defined by expression, shadow and the visual tension between stillness and movement."
        },
        {
            image: "images/portfolio/photo-12.webp",
            category: "djs",
            title: "Pressure",
            location: "Hamburg, Germany",
            year: "2026",
            description: "DJ imagery created around intensity, rhythm and the architecture of the booth."
        },
        {
            image: "images/portfolio/photo-13.webp",
            category: "nightlife",
            title: "Red Light",
            location: "Hamburg, Germany",
            year: "2026",
            description: "Nightlife photography exploring colored light, silhouettes and spontaneous interaction."
        },
        {
            image: "images/portfolio/photo-14.webp",
            category: "fashion",
            title: "Structure",
            location: "Hamburg, Germany",
            year: "2026",
            description: "Contemporary fashion photography using shape, negative space and urban texture."
        },
        {
            image: "images/portfolio/photo-15.webp",
            category: "street",
            title: "Sunday",
            location: "Hamburg, Germany",
            year: "2026",
            description: "An everyday street scene transformed through timing, framing and natural atmosphere."
        },
        {
            image: "images/portfolio/photo-16.webp",
            category: "events",
            title: "Crowd",
            location: "Hamburg, Germany",
            year: "2026",
            description: "A wider view of collective energy, movement and human connection at an event."
        },
        {
            image: "images/portfolio/photo-17.webp",
            category: "concerts",
            title: "Feedback",
            location: "Hamburg, Germany",
            year: "2026",
            description: "A live performance frame balancing stage energy with the surrounding darkness."
        },
        {
            image: "images/portfolio/photo-18.webp",
            category: "couples",
            title: "Quiet Hours",
            location: "Hamburg, Germany",
            year: "2026",
            description: "A restrained portrait of connection, intimacy and natural interaction."
        },
        {
            image: "images/portfolio/photo-19.webp",
            category: "automotive",
            title: "Night Drive",
            location: "Germany",
            year: "2026",
            description: "A cinematic automotive frame built around reflections, road texture and artificial light."
        },
        {
            image: "images/portfolio/photo-20.webp",
            category: "wildlife",
            title: "Untamed",
            location: "Germany",
            year: "2026",
            description: "A study of natural presence, patience and the visual language of the wild."
        }
    ];

    /* =====================================================
       04. TRANSLATION DATA
       ===================================================== */

    const translations = {
        de: {
            accessibility: {
                skip: "Zum Hauptinhalt springen",
                openMenu: "Menü öffnen",
                closeMenu: "Menü schließen",
                close: "Lightbox schließen",
                previous: "Vorheriges Bild",
                next: "Nächstes Bild"
            },

            nav: {
                work: "ARBEIT",
                about: "ÜBER",
                services: "SERVICES",
                contact: "KONTAKT"
            },

            hero: {
                eyebrow: "INTERNATIONALE FOTOGRAFIE & CREATIVE VISUALS",
                statementA: "Fotografie",
                statementB: "mit Absicht.",
                scroll: "SCROLLEN ZUM ENTDECKEN"
            },

            work: {
                label: "AUSGEWÄHLTE ARBEITEN",
                title: "Visuelle Geschichten.",
                intro: "Momente, Bewegung und Atmosphäre durch eine redaktionelle Perspektive festgehalten."
            },

            filters: {
                all: "ALLE",
                portraits: "PORTRAITS",
                fashion: "FASHION",
                events: "EVENTS",
                djs: "DJS",
                nightlife: "NACHTLEBEN",
                concerts: "KONZERTE",
                street: "STREET",
                couples: "PAARE",
                automotive: "AUTOMOTIVE",
                wildlife: "WILDLIFE"
            },

            manifesto: {
                line1: "Jedes Bild beginnt",
                line2: "mit einem Moment.",
                line3: "Die Kamera entscheidet nur,",
                line4: "ihn zu bewahren."
            },

            about: {
                label: "DER FOTOGRAF",
                role: "Fotograf & Visual Storyteller",
                paragraph1: "Ich fotografiere Bewegung, Menschen, Atmosphäre und die Momente, die dazwischen entstehen.",
                paragraph2: "Meine Arbeit bewegt sich zwischen Nachtleben, Musik, Portraits, Fashion, Street Culture und alltäglichen visuellen Geschichten.",
                quote: "Das Ziel ist einfach: Bilder zu schaffen, die noch etwas zu sagen haben, wenn der Moment längst vorbei ist.",
                based: "BASIERT IN",
                focus: "FOKUS",
                availability: "VERFÜGBAR FÜR",
                availableValue: "Projekte / Kollaborationen",
                imageCaption: "FOTOGRAF / VISUAL STORYTELLER"
            },

            services: {
                label: "SERVICES",
                title: "Gebaut um das Bild.",
                portraits: {
                    title: "Portraits",
                    description: "Persönliche Portraits mit Charakter, Atmosphäre und einer redaktionellen Note."
                },
                events: {
                    title: "Events",
                    description: "Atmosphärische Eventfotografie, die mehr einfängt als nur den offensichtlichen Moment."
                },
                djs: {
                    title: "DJ / Musik",
                    description: "Visuelle Inhalte für DJs, Artists, Kollektive und elektronische Musikkultur."
                },
                nightlife: {
                    title: "Nachtleben",
                    description: "Dunkle Räume, Bewegung, Licht und die Atmosphäre zwischen den Tracks."
                },
                fashion: {
                    title: "Fashion",
                    description: "Editorial Photography mit einer zeitgenössischen und cinematischen Bildsprache."
                },
                concerts: {
                    title: "Konzerte",
                    description: "Live-Fotografie, die Emotion, Licht und Bewegung miteinander verbindet."
                },
                street: {
                    title: "Street",
                    description: "Ungestellte Szenen und alltägliche Details, bewusst beobachtet."
                },
                couples: {
                    title: "Paare",
                    description: "Natürliche, intime Bilder, bei denen Verbindung wichtiger ist als Posen."
                },
                automotive: {
                    title: "Automotive",
                    description: "Automotive-Bilder, die Maschine, Umgebung und cineastische Atmosphäre verbinden."
                },
                wildlife: {
                    title: "Wildlife",
                    description: "Beobachtende Fotografie mit Fokus auf Präsenz, Detail und natürliches Verhalten."
                }
            },

            collaborations: {
                label: "AUSGEWÄHLTE KOLLABORATIONEN"
            },

            testimonials: {
                label: "TESTIMONIALS",
                title: "RACETECH.",
                empty: "Er ist der beste Fotograf der Welt.."
            },

            contact: {
                label: "KONTAKT / KOLLABORATION",
                title1: "LASST UNS",
                title2: "ETWAS",
                title3: "VISUELLES",
                title4: "SCHAFFEN.",
                intro: "Du hast ein Projekt, ein Event, eine Artist-Kollaboration oder eine visuelle Idee? Erzähl mir, was du aufbauen möchtest.",
                locationLabel: "STANDORT"
            },

            form: {
                name: "Name *",
                email: "E-Mail *",
                phone: "Telefon",
                service: "Service *",
                servicePlaceholder: "Service auswählen",
                date: "Datum",
                time: "Uhrzeit",
                message: "Nachricht *",
                submit: "ÜBER WHATSAPP FORTFAHREN",
                note: "Deine Nachricht wird zunächst in WhatsApp geöffnet und kann vor dem Senden geprüft werden.",
                errors: {
                    name: "Bitte gib deinen Namen ein.",
                    email: "Bitte gib eine gültige E-Mail-Adresse ein.",
                    service: "Bitte wähle einen Service.",
                    message: "Bitte gib eine Nachricht ein."
                },
                status: "WhatsApp wird mit deiner Nachricht geöffnet."
            },

            portfolio: {
                empty: "Für diese Kategorie sind derzeit keine Arbeiten verfügbar.",
                view: "PROJEKT ANSEHEN"
            },

            footer: {
                statement: "Photography / Creative Visuals / Hamburg"
            }
        },

        en: {
            accessibility: {
                skip: "Skip to main content",
                openMenu: "Open menu",
                closeMenu: "Close menu",
                close: "Close lightbox",
                previous: "Previous image",
                next: "Next image"
            },

            nav: {
                work: "WORK",
                about: "ABOUT",
                services: "SERVICES",
                contact: "CONTACT"
            },

            hero: {
                eyebrow: "INTERNATIONAL PHOTOGRAPHY & CREATIVE VISUALS",
                statementA: "Photography",
                statementB: "with intention.",
                scroll: "SCROLL TO EXPLORE"
            },

            work: {
                label: "SELECTED WORK",
                title: "Visual stories.",
                intro: "Moments, movement and atmosphere captured through an editorial eye."
            },

            filters: {
                all: "ALL",
                portraits: "PORTRAITS",
                fashion: "FASHION",
                events: "EVENTS",
                djs: "DJS",
                nightlife: "NIGHTLIFE",
                concerts: "CONCERTS",
                street: "STREET",
                couples: "COUPLES",
                automotive: "AUTOMOTIVE",
                wildlife: "WILDLIFE"
            },

            manifesto: {
                line1: "Every frame begins",
                line2: "with a moment.",
                line3: "The camera simply decides",
                line4: "to remember it."
            },

            about: {
                label: "THE PHOTOGRAPHER",
                role: "Photographer & Visual Storyteller",
                paragraph1: "I photograph movement, people, atmosphere and the moments that exist between them.",
                paragraph2: "My work moves between nightlife, music, portraits, fashion, street culture and everyday visual stories.",
                quote: "The goal is simple: create images that still have something to say when the moment is gone.",
                based: "BASED IN",
                focus: "FOCUS",
                availability: "AVAILABLE FOR",
                availableValue: "Projects / Collaborations",
                imageCaption: "PHOTOGRAPHER / VISUAL STORYTELLER"
            },

            services: {
                label: "SERVICES",
                title: "Built around the image.",
                portraits: {
                    title: "Portraits",
                    description: "Personal portraits with character, atmosphere and an editorial edge."
                },
                events: {
                    title: "Events",
                    description: "Atmospheric coverage that captures the energy beyond the obvious moment."
                },
                djs: {
                    title: "DJ / Music",
                    description: "Visual content for DJs, artists, collectives and electronic music culture."
                },
                nightlife: {
                    title: "Nightlife",
                    description: "Dark rooms, movement, light and the atmosphere between the tracks."
                },
                fashion: {
                    title: "Fashion",
                    description: "Editorial imagery with a contemporary and cinematic visual language."
                },
                concerts: {
                    title: "Concerts",
                    description: "Live performance photography built around emotion, light and movement."
                },
                street: {
                    title: "Street",
                    description: "Unscripted scenes and everyday details observed with intention."
                },
                couples: {
                    title: "Couples",
                    description: "Natural, intimate imagery focused on connection rather than poses."
                },
                automotive: {
                    title: "Automotive",
                    description: "Automotive imagery combining machine, environment and cinematic atmosphere."
                },
                wildlife: {
                    title: "Wildlife",
                    description: "Observational photography focused on presence, detail and natural behavior."
                }
            },

            collaborations: {
                label: "SELECTED COLLABORATIONS"
            },

            testimonials: {
                label: "TESTIMONIALS",
                title: "RACETECH.",
                empty: "He is the best photographer in the world.."
            },
            

            contact: {
                label: "CONTACT / COLLABORATION",
                title1: "LET'S",
                title2: "CREATE",
                title3: "SOMETHING",
                title4: "VISUAL.",
                intro: "Have a project, event, artist collaboration or visual idea? Tell me what you are building.",
                locationLabel: "LOCATION"
            },

            form: {
                name: "Name *",
                email: "Email *",
                phone: "Phone",
                service: "Service *",
                servicePlaceholder: "Select a service",
                date: "Date",
                time: "Time",
                message: "Message *",
                submit: "CONTINUE VIA WHATSAPP",
                note: "Your message will open in WhatsApp for review before sending.",
                errors: {
                    name: "Please enter your name.",
                    email: "Please enter a valid email address.",
                    service: "Please select a service.",
                    message: "Please enter a message."
                },
                status: "WhatsApp is opening with your message."
            },

            portfolio: {
                empty: "There are currently no works available for this category.",
                view: "VIEW PROJECT"
            },

            footer: {
                statement: "Photography / Creative Visuals / Hamburg"
            }
        },

        es: {
            accessibility: {
                skip: "Saltar al contenido principal",
                openMenu: "Abrir menú",
                closeMenu: "Cerrar menú",
                close: "Cerrar visor",
                previous: "Imagen anterior",
                next: "Imagen siguiente"
            },

            nav: {
                work: "TRABAJO",
                about: "SOBRE MÍ",
                services: "SERVICIOS",
                contact: "CONTACTO"
            },

            hero: {
                eyebrow: "FOTOGRAFÍA INTERNACIONAL & CREATIVE VISUALS",
                statementA: "Fotografía",
                statementB: "con intención.",
                scroll: "DESPLAZAR PARA EXPLORAR"
            },

            work: {
                label: "TRABAJO SELECCIONADO",
                title: "Historias visuales.",
                intro: "Momentos, movimiento y atmósfera capturados desde una mirada editorial."
            },

            filters: {
                all: "TODO",
                portraits: "RETRATOS",
                fashion: "MODA",
                events: "EVENTOS",
                djs: "DJS",
                nightlife: "VIDA NOCTURNA",
                concerts: "CONCIERTOS",
                street: "STREET",
                couples: "PAREJAS",
                automotive: "AUTOMOTRIZ",
                wildlife: "FAUNA"
            },

            manifesto: {
                line1: "Cada imagen comienza",
                line2: "con un momento.",
                line3: "La cámara simplemente decide",
                line4: "recordarlo."
            },

            about: {
                label: "EL FOTÓGRAFO",
                role: "Fotógrafo & Visual Storyteller",
                paragraph1: "Fotografío movimiento, personas, atmósferas y esos momentos que existen entre ellos.",
                paragraph2: "Mi trabajo se mueve entre la vida nocturna, la música, los retratos, la moda, la cultura urbana y las historias visuales cotidianas.",
                quote: "El objetivo es sencillo: crear imágenes que todavía tengan algo que decir cuando el momento ya pasó.",
                based: "UBICACIÓN",
                focus: "ENFOQUE",
                availability: "DISPONIBLE PARA",
                availableValue: "Proyectos / Colaboraciones",
                imageCaption: "FOTÓGRAFO / VISUAL STORYTELLER"
            },

            services: {
                label: "SERVICIOS",
                title: "Construido alrededor de la imagen.",
                portraits: {
                    title: "Retratos",
                    description: "Retratos personales con carácter, atmósfera y una mirada editorial."
                },
                events: {
                    title: "Eventos",
                    description: "Cobertura atmosférica que captura la energía más allá del momento evidente."
                },
                djs: {
                    title: "DJ / Música",
                    description: "Contenido visual para DJs, artistas, colectivos y cultura de música electrónica."
                },
                nightlife: {
                    title: "Vida nocturna",
                    description: "Espacios oscuros, movimiento, luz y la atmósfera entre los tracks."
                },
                fashion: {
                    title: "Moda",
                    description: "Imágenes editoriales con un lenguaje visual contemporáneo y cinematográfico."
                },
                concerts: {
                    title: "Conciertos",
                    description: "Fotografía de directo construida alrededor de emoción, luz y movimiento."
                },
                street: {
                    title: "Street",
                    description: "Escenas espontáneas y detalles cotidianos observados con intención."
                },
                couples: {
                    title: "Parejas",
                    description: "Imágenes naturales e íntimas centradas en la conexión, no en las poses."
                },
                automotive: {
                    title: "Automotriz",
                    description: "Fotografía automotriz que combina máquina, entorno y atmósfera cinematográfica."
                },
                wildlife: {
                    title: "Fauna",
                    description: "Fotografía de observación centrada en presencia, detalle y comportamiento natural."
                }
            },

            collaborations: {
                label: "COLABORACIONES SELECCIONADAS"
            },

            testimonials: {
                label: "TESTIMONIOS",
                title: "RACETECH.",
                empty: "Es el mejor fotografo del mundo SIEMPRE."
            },

            contact: {
                label: "CONTACTO / COLABORACIÓN",
                title1: "CREEMOS",
                title2: "ALGO",
                title3: "REALMENTE",
                title4: "VISUAL.",
                intro: "¿Tienes un proyecto, evento, colaboración artística o una idea visual? Cuéntame qué quieres construir.",
                locationLabel: "UBICACIÓN"
            },

            form: {
                name: "Nombre *",
                email: "Correo electrónico *",
                phone: "Teléfono",
                service: "Servicio *",
                servicePlaceholder: "Selecciona un servicio",
                date: "Fecha",
                time: "Hora",
                message: "Mensaje *",
                submit: "CONTINUAR POR WHATSAPP",
                note: "Tu mensaje se abrirá primero en WhatsApp para revisarlo antes de enviarlo.",
                errors: {
                    name: "Introduce tu nombre.",
                    email: "Introduce un correo electrónico válido.",
                    service: "Selecciona un servicio.",
                    message: "Introduce un mensaje."
                },
                status: "WhatsApp se está abriendo con tu mensaje."
            },

            portfolio: {
                empty: "Actualmente no hay trabajos disponibles para esta categoría.",
                view: "VER PROYECTO"
            },

            footer: {
                statement: "Fotografía / Creative Visuals / Hamburgo"
            }
        }
    };

    /* =====================================================
       05. UTILITIES
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
       06. LANGUAGE SYSTEM
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
       07. MOBILE NAVIGATION
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
       08. HERO
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
       09. PORTFOLIO
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

        button.addEventListener("click", () => {
            openLightbox(index, button);
        });

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
       10. LIGHTBOX
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
       11. CONTACT FORM
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
       12. SCROLL / REVEAL
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
       13. HEADER
       ===================================================== */

    const updateHeader = () => {
        if (!dom.header) return;

        dom.header.classList.toggle(
            "is-scrolled",
            window.scrollY > 40
        );
    };

    /* =====================================================
       14. KEYBOARD ACCESSIBILITY
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
       15. TOUCH / SWIPE LIGHTBOX
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
       16. EVENTS
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
       17. INITIALIZATION
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
       18. START
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
(() => {
    "use strict";

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


    window.MONTILLA_DATA = Object.freeze({
        portfolioData,
        translations
    });
})();

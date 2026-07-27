/* ==========================================================================
   CYKEO ARGENTINA — LANDING PAGE JAVASCRIPT
   ==========================================================================
   Interactividad:
   - Theme toggle (claro/oscuro) con persistencia en localStorage
   - Scroll progress bar
   - Nav frosted glass on scroll + scrollspy
   - Scroll reveals (IntersectionObserver)
   - Magnetic CTA (desktop only)
   - Dark band parallax
   - FAQ accordion
   - Form validation inline + loading state + success
   - Smooth scroll para anchor links

   Vanilla JS, sin dependencias. Respeta prefers-reduced-motion.
   ========================================================================== */

(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     Utilidades
     ---------------------------------------------------------------------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia("(hover: none)").matches;

  // Throttle con requestAnimationFrame para scroll handlers
  function rafThrottle(fn) {
    var ticking = false;
    return function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          fn.apply(null, arguments);
          ticking = false;
        });
        ticking = true;
      }
    };
  }

  /* ----------------------------------------------------------------------
     1. SCROLL REVEAL — IntersectionObserver
     Contenido visible por defecto. JS añade .js al <html> para habilitar
     las animaciones de entrada. Si JS falla, todo queda visible.
     ---------------------------------------------------------------------- */
  function initScrollReveal() {
    document.documentElement.classList.add("js");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("revealed");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ----------------------------------------------------------------------
     2. NAV SCROLL + SCROLL PROGRESS BAR
     Nav: frosted glass después de 40px de scroll.
     Progress: barra de 2px que se llena según el progreso de scroll.
     ---------------------------------------------------------------------- */
  function initNavScroll() {
    var nav = document.getElementById("nav");
    var progress = document.querySelector(".scroll-progress");
    if (!nav) return;

    var onScroll = rafThrottle(function () {
      var scrollY = window.scrollY;

      // Nav frosted glass
      if (scrollY > 40) {
        nav.classList.add("nav--scrolled");
      } else {
        nav.classList.remove("nav--scrolled");
      }

      // Scroll progress bar
      if (progress) {
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
        progress.style.width = pct + "%";
      }
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // estado inicial
  }

  /* ----------------------------------------------------------------------
     3. SCROLLSPY — resalta el link del nav de la sección visible
     ---------------------------------------------------------------------- */
  function initScrollSpy() {
    var sections = document.querySelectorAll("section[id]");
    var navLinks = document.querySelectorAll(".nav__link");
    if (sections.length === 0 || navLinks.length === 0) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("id");
            navLinks.forEach(function (link) {
              var href = link.getAttribute("href");
              if (href === "#" + id) {
                link.classList.add("nav__link--active");
              } else {
                link.classList.remove("nav__link--active");
              }
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(function (sec) { observer.observe(sec); });
  }

  /* ----------------------------------------------------------------------
     4. THEME TOGGLE — MorphButton (Moon/Sun swap on hover)
     Botón que alterna entre modo claro/oscuro al hacer click.
     El icono Moon se muestra por defecto; Sun aparece en hover (CSS).
     Persiste en localStorage. Por defecto arranca en light.
     ---------------------------------------------------------------------- */
  function initThemeToggle() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    function updateLabel() {
      var current = document.documentElement.getAttribute("data-theme") || "light";
      btn.setAttribute("aria-label", current === "light" ? "Activar modo oscuro" : "Activar modo claro");
      btn.setAttribute("title", current === "light" ? "Modo oscuro" : "Modo claro");
    }

    btn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") || "light";
      var next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("ck-theme", next); } catch (e) {}
      updateLabel();
    });

    updateLabel();
  }

  /* ----------------------------------------------------------------------
     5. MAGNETIC CTA — efecto magnético sutil en el botón primario del hero
     Solo desktop, no touch, no reduced motion.
     ---------------------------------------------------------------------- */
  function initMagneticCta() {
    var el = document.getElementById("magnetic-cta");
    if (!el || reduceMotion || isTouch) return;

    el.addEventListener("mousemove", function (e) {
      var rect = el.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      var strength = 0.2;
      el.style.transform = "translate(" + (x * strength) + "px, " + (y * strength) + "px)";
    });

    el.addEventListener("mouseleave", function () {
      el.style.transform = "translate(0, 0)";
    });
  }

  /* ----------------------------------------------------------------------
     6. DARK BAND PARALLAX — la imagen de fondo se mueve sutilmente
     ---------------------------------------------------------------------- */
  function initDarkBandParallax() {
    if (reduceMotion) return;

    var img = document.querySelector(".dark-band__img");
    var band = document.querySelector(".dark-band");
    if (!img || !band) return;

    var onScroll = rafThrottle(function () {
      var rect = band.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        // MOD 3: parallax suave con scale(1.25) para evitar línea negra.
        // El offset se reduce a 0.08 (era 0.15) y se centra dentro del
        // range que permite la imagen agrandada (top:-12.5%, height:125%).
        var offset = (window.innerHeight - rect.top) * 0.08;
        // Limitar el offset para que nunca exceda el margen de la imagen
        offset = Math.max(-40, Math.min(40, offset));
        img.style.transform = "translateY(" + offset + "px) scale(1.25)";
      }
    });

    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ----------------------------------------------------------------------
     7. FAQ ACCORDION — todos cerrados por defecto
     ---------------------------------------------------------------------- */
  function initFaq() {
    var items = document.querySelectorAll(".faq__item");
    items.forEach(function (item) {
      var trigger = item.querySelector(".faq__trigger");
      var panel = item.querySelector(".faq__panel");
      var inner = item.querySelector(".faq__panel-inner");
      if (!trigger || !panel || !inner) return;

      trigger.addEventListener("click", function () {
        var isOpen = item.getAttribute("data-open") === "true";

        // Cerrar todos
        items.forEach(function (other) {
          other.setAttribute("data-open", "false");
          var otherTrigger = other.querySelector(".faq__trigger");
          var otherPanel = other.querySelector(".faq__panel");
          if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
          if (otherPanel) otherPanel.style.maxHeight = "0px";
        });

        // Abrir el clickeado si estaba cerrado
        if (!isOpen) {
          item.setAttribute("data-open", "true");
          trigger.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = inner.scrollHeight + "px";
        }
      });
    });
  }

  /* ----------------------------------------------------------------------
     8. FORM — validación inline + loading state + success
     ---------------------------------------------------------------------- */
  function initForm() {
    var form = document.getElementById("contact-form");
    var successEl = document.getElementById("form-success");
    var submitBtn = document.getElementById("form-submit-btn");
    if (!form || !successEl || !submitBtn) return;

    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phoneRe = /^[+]?[\d\s()\-]{6,}$/;

    function setError(name, message) {
      var field = form.querySelector('[data-field="' + name + '"]');
      if (!field) return;
      var errorEl = field.querySelector(".form-field__error");
      var input = field.querySelector(".form-field__input");
      if (message) {
        field.classList.add("form-field--error");
        if (errorEl) errorEl.textContent = message;
        if (input) input.setAttribute("aria-invalid", "true");
      } else {
        field.classList.remove("form-field--error");
        if (errorEl) errorEl.textContent = "";
        if (input) input.removeAttribute("aria-invalid");
      }
    }

    function validate() {
      var data = new FormData(form);
      var errors = {};

      var nombre = (data.get("nombre") || "").trim();
      var email = (data.get("email") || "").trim();
      var tel = (data.get("tel") || "").trim();
      var institucion = (data.get("institucion") || "").trim();

      if (!nombre) errors.nombre = "El nombre es obligatorio.";
      if (!email) {
        errors.email = "El email es obligatorio.";
      } else if (!emailRe.test(email)) {
        errors.email = "Dirección de email inválida.";
      }
      if (!tel) {
        errors.tel = "El teléfono es obligatorio.";
      } else if (!phoneRe.test(tel)) {
        errors.tel = "Número de teléfono inválido.";
      }
      if (!institucion) errors.institucion = "La institución es obligatoria.";

      // Limpiar errores anteriores y setear nuevos
      ["nombre", "email", "tel", "institucion"].forEach(function (name) {
        setError(name, errors[name] || "");
      });

      return Object.keys(errors).length === 0;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) return;

      // Loading state
      form.classList.add("is-loading");
      submitBtn.disabled = true;
      var btnText = submitBtn.querySelector(".btn__text");
      var iconWrap = submitBtn.querySelector(".btn__icon-wrap");
      if (btnText) btnText.textContent = "Enviando...";
      if (iconWrap) iconWrap.style.display = "none";

      // Simulación de envío (en producción: fetch a tu endpoint o Formspree)
      setTimeout(function () {
        form.classList.remove("is-loading");
        form.style.display = "none";
        successEl.hidden = false;
        successEl.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      }, 1200);
    });
  }

  /* ----------------------------------------------------------------------
     9. SMOOTH SCROLL — para anchor links
     ---------------------------------------------------------------------- */
  function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        var href = link.getAttribute("href");
        if (href === "#" || href.length < 2) return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start"
          });
        }
      });
    });
  }

  /* ----------------------------------------------------------------------
     10. HERO VIDEO — performance & carga
     - Estado de carga: opacity 0 hasta que el video puede reproducirse
     - Autoplay robusto: reintento en primera interacción del usuario
       (algunos navegadores bloquean autoplay hasta gesture)
     - IntersectionObserver: pausa el video cuando el hero sale del viewport
       (ahorra CPU/GPU en scroll largo)
     - Visibility change: pausa al cambiar de pestaña
     - El video ambiental (muted, blur) se reproduce SIEMPRE, incluso bajo
       prefers-reduced-motion (es textura atmosférica, no animación agresiva)
     ---------------------------------------------------------------------- */
  function initHeroVideo() {
    var video = document.querySelector(".hero__bg-video");
    if (!video) return;

    // Estado de carga: arranca "loading" (opacity 0), se revela al poder jugar
    video.classList.add("is-loading");

    function reveal() {
      video.classList.remove("is-loading");
    }

    if (video.readyState >= 2) {
      reveal();
    } else {
      video.addEventListener("loadeddata", reveal, { once: true });
      video.addEventListener("canplay", reveal, { once: true });
      setTimeout(reveal, 1500);
    }

    // Intentar reproducir. Reintento robusto ante bloqueo de autoplay.
    var playAttempts = 0;
    var MAX_PLAY_ATTEMPTS = 10;
    function tryPlay() {
      if (video.paused && playAttempts < MAX_PLAY_ATTEMPTS) {
        playAttempts++;
        var p = video.play();
        if (p && typeof p.then === "function") {
          p.then(function () {
            playAttempts = 0; // reset al tener éxito
          }).catch(function () {
            // Autoplay bloqueado: reintentar en la primera interacción
            // (los listeners de gesture se registran abajo, una sola vez)
          });
        }
      }
    }
    tryPlay();

    // Reintento en el primer gesture del usuario (desktop + móvil).
    // Algunos navegadores (Safari con políticas estrictas, modo low power)
    // bloquean autoplay hasta cualquier interacción.
    var gestureStarted = false;
    function startOnGesture() {
      if (gestureStarted) return;
      gestureStarted = true;
      tryPlay();
      // limpiar listeners tras el primer gesture exitoso
      ["pointerdown", "keydown", "touchstart", "click"].forEach(function (ev) {
        document.removeEventListener(ev, startOnGesture, true);
      });
    }
    ["pointerdown", "keydown", "touchstart", "click"].forEach(function (ev) {
      document.addEventListener(ev, startOnGesture, { once: false, capture: true, passive: true });
    });

    // Reintento periódico de seguridad: cada 2s, si sigue pausado, intentar
    // de nuevo durante los primeros ~20s (cubre casos de bloqueo temporal).
    var safetyRetry = setInterval(function () {
      if (!video.paused || playAttempts >= MAX_PLAY_ATTEMPTS) {
        clearInterval(safetyRetry);
        return;
      }
      tryPlay();
    }, 2000);
    setTimeout(function () { clearInterval(safetyRetry); }, 20000);

    // Pausar/reanudar según visibilidad del hero en viewport (performance)
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              if (video.paused) {
                tryPlay();
              }
            } else {
              if (!video.paused) {
                video.pause();
              }
            }
          });
        },
        { threshold: 0.05 }
      );
      io.observe(video);
    }

    // Pausar al cambiar de pestaña (ahorra recursos en background)
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        if (!video.paused) video.pause();
      } else {
        var rect = video.getBoundingClientRect();
        var inView = rect.bottom > 0 && rect.top < window.innerHeight;
        if (inView && video.paused) {
          tryPlay();
        }
      }
    });
  }

  /* ----------------------------------------------------------------------
     11. CAROUSEL — vanilla JS carousel
     Adaptación del componente React shadcn/carousel (con motion/react) a
     vanilla JS. Soporta:
     - Drag horizontal (touch + mouse)
     - Flechas prev/next
     - Indicadores de puntos
     - Responsive (1 item en móvil, N items en desktop según clase mod)
     - Respeta prefers-reduced-motion (sin transición)
     ---------------------------------------------------------------------- */
  function initCarousels() {
    var carousels = document.querySelectorAll("[data-carousel]");
    carousels.forEach(function (root) {
      initOneCarousel(root);
    });
  }

  function initOneCarousel(root) {
    var track = root.querySelector(".carousel__track");
    var items = root.querySelectorAll(".carousel__item");
    var prevBtn = root.querySelector("[data-carousel-prev]");
    var nextBtn = root.querySelector("[data-carousel-next]");
    var indicatorsEl = root.querySelector("[data-carousel-indicators]");
    if (!track || items.length === 0) return;

    var index = 0;
    var reduceMotionLocal = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Determinar columnas según clase mod y breakpoint
    function getVisibleCount() {
      var w = window.innerWidth;
      var cols = 1;
      if (root.classList.contains("carousel--cols-3") && w >= 769) cols = 3;
      else if (root.classList.contains("carousel--cols-2") && w >= 769) cols = 2;
      return cols;
    }

    // Máximo índice permitido (no desbordar)
    function maxIndex() {
      var visible = getVisibleCount();
      var max = items.length - visible;
      return Math.max(0, max);
    }

    // Calcular translateX en % basado en index y items visibles
    function getTranslatePct() {
      var visible = getVisibleCount();
      // Cada item mide (100/visible)% del track; moverse 1 item = (100/visible)%
      return -(index * (100 / visible));
    }

    function applyTransform(animate) {
      if (!animate) track.classList.add("no-transition");
      else track.classList.remove("no-transition");
      track.style.transform = "translateX(" + getTranslatePct() + "%)";
    }

    function updateState() {
      // Botones: disabled en los extremos
      if (prevBtn) prevBtn.disabled = index <= 0;
      if (nextBtn) nextBtn.disabled = index >= maxIndex();
      // Indicadores
      if (indicatorsEl) {
        var dots = indicatorsEl.querySelectorAll(".carousel__dot");
        dots.forEach(function (dot, i) {
          if (i === index) dot.classList.add("is-active");
          else dot.classList.remove("is-active");
        });
      }
    }

    // Construir indicadores (uno por cada slide posible = maxIndex()+1)
    function buildIndicators() {
      if (!indicatorsEl) return;
      indicatorsEl.innerHTML = "";
      var count = maxIndex() + 1;
      for (var i = 0; i < count; i++) {
        (function (i) {
          var dot = document.createElement("button");
          dot.type = "button";
          dot.className = "carousel__dot";
          dot.setAttribute("role", "tab");
          dot.setAttribute("aria-label", "Ir al slide " + (i + 1));
          dot.addEventListener("click", function () {
            goTo(i);
          });
          indicatorsEl.appendChild(dot);
        })(i);
      }
    }

    function goTo(newIndex) {
      var max = maxIndex();
      if (newIndex < 0) newIndex = 0;
      if (newIndex > max) newIndex = max;
      index = newIndex;
      applyTransform(true);
      updateState();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    // Botones
    if (prevBtn) prevBtn.addEventListener("click", prev);
    if (nextBtn) nextBtn.addEventListener("click", next);

    // Drag (touch + mouse)
    var isDragging = false;
    var startX = 0;
    var startTranslate = 0;
    var dragDelta = 0;
    var trackWidth = 0;

    function pointerDown(e) {
      isDragging = true;
      startX = (e.touches ? e.touches[0].clientX : e.clientX);
      trackWidth = track.offsetWidth;
      dragDelta = 0;
      startTranslate = getTranslatePct();
      track.classList.add("is-dragging");
      track.classList.add("no-transition");
    }

    function pointerMove(e) {
      if (!isDragging) return;
      var currentX = (e.touches ? e.touches[0].clientX : e.clientX);
      dragDelta = currentX - startX;
      // Convertir delta en px a % del track
      var deltaPct = (dragDelta / trackWidth) * 100;
      var newTranslate = startTranslate + deltaPct;
      // Restringir dentro de límites (con rubber-band leve)
      var visible = getVisibleCount();
      var minTranslate = -(maxIndex() * (100 / visible));
      var maxTranslate = 0;
      if (newTranslate > maxTranslate) newTranslate = maxTranslate + (newTranslate - maxTranslate) * 0.3;
      if (newTranslate < minTranslate) newTranslate = minTranslate + (newTranslate - minTranslate) * 0.3;
      track.style.transform = "translateX(" + newTranslate + "%)";
    }

    function pointerUp() {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove("is-dragging");
      track.classList.remove("no-transition");
      // Umbral: 20% del ancho de un item
      var visible = getVisibleCount();
      var threshold = trackWidth / visible * 0.2;
      if (Math.abs(dragDelta) > threshold) {
        if (dragDelta < 0) next();
        else prev();
      } else {
        // volver a posición actual sin cambiar index
        applyTransform(true);
      }
      updateState();
    }

    // Touch events
    track.addEventListener("touchstart", pointerDown, { passive: true });
    track.addEventListener("touchmove", pointerMove, { passive: true });
    track.addEventListener("touchend", pointerUp);
    track.addEventListener("touchcancel", pointerUp);

    // Mouse events (solo desktop, no touch)
    if (!isTouch) {
      track.addEventListener("mousedown", function (e) {
        e.preventDefault();
        pointerDown(e);
      });
      window.addEventListener("mousemove", pointerMove);
      window.addEventListener("mouseup", pointerUp);
      // Click en items dentro del track durante drag: prevenir
      track.addEventListener("click", function (e) {
        if (Math.abs(dragDelta) > 10) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, true);
    }

    // Teclado (flechas izquierda/derecha cuando el carrusel tiene foco)
    root.setAttribute("tabindex", "0");
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    });

    // Resize: recalcular columnas y reconstruir indicadores
    var lastVisibleCount = getVisibleCount();
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        var visible = getVisibleCount();
        // Si cambió el breakpoint de columnas, resetear a 0 para que el
        // usuario no quede viendo un slide intermedio sin contexto.
        if (visible !== lastVisibleCount) {
          index = 0;
          lastVisibleCount = visible;
        } else {
          // Re-clamp index al nuevo maxIndex (por si cambió items)
          var max = maxIndex();
          if (index > max) index = max;
        }
        buildIndicators();
        applyTransform(false);
        updateState();
      }, 150);
    });

    // Init
    buildIndicators();
    applyTransform(false);
    updateState();
  }

  /* ----------------------------------------------------------------------
     12. DIATEXT — vanilla JS adaptation of the React DiaText component.
     Efecto "reveal sweep": un gradiente con banda de colores barre el texto
     de izquierda a derecha. Al completar el sweep, intercambia la frase
     con transición de blur+opacity+shift, y repite.
     - 3 frases (compliance) en loop
     - colores: arcoíris de 5 colores
     - duration: 1.5s por sweep, repeatDelay: 1.1s entre frases
     - prefers-reduced-motion: muestra la primera frase estática
     ---------------------------------------------------------------------- */
  function initTypewriter() {
    var chip = document.getElementById("hero-typewriter");
    var textEl = document.getElementById("hero-typewriter-text");
    if (!chip || !textEl) return;

    var texts = [
      "Compliance ANMAT y FDA 21 CFR Part 11",
      "Pantalla táctil HD 21.5″ (Windows / Android)",
      "Acceso por RFID, huella o reconocimiento facial"
    ];
    var TYPE_SPEED = 70;
    var HOLD_MS = 1500;
    var DELETE_SPEED = 40;
    var GAP_MS = 250;

    // Posicionar el texto según viewport (siempre, también en reduced-motion).
    // Desktop: esquina inferior izquierda sobre la imagen del gabinete (CSS base).
    // Mobile: al pie del hero, separado del bloque principal de contenido
    // (imagen + eyebrow + título + tagline + botones). Se ancla con
    // position:absolute al .hero__inner (que es position:relative y tiene
    // padding-bottom reservado), de modo que no se superpone a los botones.
    function positionTypewriter() {
      var w = window.innerWidth;
      if (w <= 1024) {
        chip.style.position = "absolute";
        chip.style.top = "auto";
        chip.style.bottom = "26px";
        chip.style.left = "50%";
        chip.style.right = "auto";
        chip.style.transform = "translateX(-50%)";
        chip.style.zIndex = "6";
      } else {
        // Desktop: limpiar inline styles para que el CSS base aplique
        chip.style.cssText = "";
      }
    }
    positionTypewriter();

    var twResizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(twResizeTimer);
      twResizeTimer = setTimeout(positionTypewriter, 150);
    });

    // Reduced motion: mostrar la primera frase estática (sin animar el tick).
    // El posicionamiento de arriba ya corrió, así que el texto queda bien
    // ubicado en móvil (al pie del hero) también en este modo.
    if (reduceMotion) {
      textEl.textContent = texts[0];
      return;
    }

    var textIndex = 0;
    var charIndex = 0;
    var deleting = false;
    var timerId = null;

    function tick() {
      var current = texts[textIndex];
      if (!deleting) {
        charIndex++;
        textEl.textContent = current.slice(0, charIndex);
        if (charIndex >= current.length) {
          timerId = setTimeout(function () {
            deleting = true;
            tick();
          }, HOLD_MS);
          return;
        }
        timerId = setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        textEl.textContent = current.slice(0, charIndex);
        if (charIndex <= 0) {
          deleting = false;
          textIndex = (textIndex + 1) % texts.length;
          timerId = setTimeout(tick, GAP_MS);
          return;
        }
        timerId = setTimeout(tick, DELETE_SPEED);
      }
    }

    // Pausar cuando el hero sale del viewport (ahorra CPU)
    if ("IntersectionObserver" in window) {
      var hero = document.querySelector(".hero");
      if (hero) {
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                if (!timerId && charIndex >= 0) tick();
              } else {
                if (timerId) {
                  clearTimeout(timerId);
                  timerId = null;
                }
              }
            });
          },
          { threshold: 0.05 }
        );
        io.observe(hero);
      }
    }

    // Arrancar
    tick();
  }

  /* ----------------------------------------------------------------------
     13. MOBILE MENU — slide-in panel from right (MOD 9).
     - Toggle hamburger button (animación a "X" al abrir)
     - Backdrop overlay clickeable para cerrar
     - Cerrar con tecla Escape
     - Cerrar al clickear cualquier link del menú (smooth scroll)
     - Bloquear scroll del body cuando el menú está abierto
     - Aria attributes: aria-expanded en hamburger, aria-hidden en menu/backdrop
     - Sincronizar link activo con scrollspy existente
     ---------------------------------------------------------------------- */
  function initMobileMenu() {
    var hamburger = document.getElementById("nav-hamburger");
    var menu = document.getElementById("mobile-menu");
    var backdrop = document.getElementById("mobile-menu-backdrop");
    var closeBtn = document.getElementById("mobile-menu-close");
    if (!hamburger || !menu || !backdrop || !closeBtn) return;

    var menuLinks = menu.querySelectorAll(".mobile-menu__link, .mobile-menu__cta");
    var lastFocusedEl = null;
    var isOpen = false;

    function open() {
      if (isOpen) return;
      isOpen = true;
      menu.classList.add("is-open");
      backdrop.classList.add("is-open");
      hamburger.classList.add("is-open");
      hamburger.setAttribute("aria-expanded", "true");
      menu.setAttribute("aria-hidden", "false");
      backdrop.setAttribute("aria-hidden", "false");
      // Bloquear scroll del body
      document.body.style.overflow = "hidden";
      // Guardar foco y moverlo al primer link del menú
      lastFocusedEl = document.activeElement;
      var firstLink = menu.querySelector(".mobile-menu__link, .mobile-menu__close");
      if (firstLink) firstLink.focus();
    }

    function close() {
      if (!isOpen) return;
      isOpen = false;
      menu.classList.remove("is-open");
      backdrop.classList.remove("is-open");
      hamburger.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
      backdrop.setAttribute("aria-hidden", "true");
      // Restaurar scroll del body
      document.body.style.overflow = "";
      // Devolver foco al hamburger
      if (lastFocusedEl) lastFocusedEl.focus();
    }

    function toggle() {
      if (isOpen) close(); else open();
    }

    hamburger.addEventListener("click", toggle);
    closeBtn.addEventListener("click", close);
    backdrop.addEventListener("click", close);

    // Cerrar al clickear cualquier link dentro del menú (smooth scroll)
    menuLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        // Pequeño delay para que el smooth scroll arranque antes de cerrar
        setTimeout(close, 60);
      });
    });

    // Cerrar con Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen) {
        close();
      }
    });

    // Cerrar al pasar a desktop (resize > 768)
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth > 768 && isOpen) {
          close();
        }
      }, 150);
    });

    // Scrollspy sync: marcar el link activo del menú móvil según la sección visible
    // (reutiliza el observer de initScrollSpy observando los mismos section[id]).
    if ("IntersectionObserver" in window) {
      var sections = document.querySelectorAll("section[id]");
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var id = entry.target.getAttribute("id");
              menuLinks.forEach(function (link) {
                var href = link.getAttribute("href");
                if (href === "#" + id) {
                  link.classList.add("mobile-menu__link--active");
                } else {
                  link.classList.remove("mobile-menu__link--active");
                }
              });
            }
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      sections.forEach(function (sec) { observer.observe(sec); });
    }
  }

  /* ----------------------------------------------------------------------
     INIT
     ---------------------------------------------------------------------- */
  function init() {
    initScrollReveal();
    initNavScroll();
    initScrollSpy();
    initThemeToggle();
    initMagneticCta();
    initDarkBandParallax();
    initFaq();
    initForm();
    initSmoothScroll();
    initHeroVideo();
    initCarousels();
    initTypewriter();
    initMobileMenu();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

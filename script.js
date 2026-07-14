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
     4. THEME TOGGLE — switch de modo claro/oscuro
     Lee el tema inicial del <html> (seteado por el script anti-FOUC).
     Persiste en localStorage. Por defecto arranca siempre en light.
     ---------------------------------------------------------------------- */
  function initThemeToggle() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    function updateLabel() {
      var current = document.documentElement.getAttribute("data-theme") || "light";
      if (current === "light") {
        btn.setAttribute("aria-label", "Activar modo oscuro");
        btn.setAttribute("title", "Modo oscuro");
      } else {
        btn.setAttribute("aria-label", "Activar modo claro");
        btn.setAttribute("title", "Modo claro");
      }
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
        var offset = (window.innerHeight - rect.top) * 0.15;
        img.style.transform = "translateY(" + offset + "px) scale(1.1)";
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* ============================================================
   Lovin' Nails – Main JavaScript
   Navegación, galería, testimonios, formulario, animaciones
   ============================================================ */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initScrollSpy();
  initGallery();
  initTestimonialSlider();
  initContactForm();
  initRevealAnimations();
  initBackToTop();
});

/* ============================================================
   1. NAVEGACIÓN (sticky + menú móvil)
   ============================================================ */
function initNav() {
  const nav = document.getElementById("site-nav");
  const burger = document.getElementById("nav-burger");
  const mobileMenu = document.getElementById("nav-mobile");

  // Sombra al hacer scroll
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 10);
  });

  // Toggle menú móvil
  burger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    burger.classList.toggle("open", isOpen);
    burger.setAttribute("aria-expanded", isOpen);
  });

  // Cerrar menú al hacer click en un enlace
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

/* ============================================================
   2. SCROLL SPY (resalta el link activo según la sección visible)
   ============================================================ */
function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a, .nav-mobile a");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(sec => observer.observe(sec));
}

/* ============================================================
   3. GALERÍA con filtros + lightbox
   ============================================================ */
function initGallery() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  // Filtros por categoría
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        const category = item.dataset.category;
        const show = filter === "todos" || category === filter;
        item.style.display = show ? "" : "none";
      });
    });
  });

  // Lightbox al hacer click en una imagen
  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
  });
}

/* ============================================================
   4. SLIDER DE TESTIMONIOS
   ============================================================ */
function initTestimonialSlider() {
  const track = document.getElementById("testimonials-track");
  const cards = track.querySelectorAll(".testimonial-card");
  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");
  const dotsWrap = document.getElementById("slider-dots");

  if (!cards.length) return;

  let cardsPerView = getCardsPerView();
  let currentIndex = 0;
  let maxIndex = Math.max(0, cards.length - cardsPerView);

  // Crear dots
  function buildDots() {
    dotsWrap.innerHTML = "";
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement("span");
      dot.className = "dot" + (i === currentIndex ? " active" : "");
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function getCardsPerView() {
    const w = window.innerWidth;
    if (w <= 640) return 1;
    if (w <= 900) return 2;
    return 3;
  }

  function update() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24; // 1.5rem
    const offset = currentIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    dotsWrap.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    update();
  }

  prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
  nextBtn.addEventListener("click", () => goTo(currentIndex + 1));

  // Auto-play
  let autoplay = setInterval(() => {
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    update();
  }, 6000);

  // Pausar autoplay al interactuar
  [prevBtn, nextBtn, dotsWrap].forEach(el => {
    el.addEventListener("click", () => {
      clearInterval(autoplay);
      autoplay = setInterval(() => {
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        update();
      }, 6000);
    });
  });

  // Reajustar en resize
  window.addEventListener("resize", () => {
    cardsPerView = getCardsPerView();
    maxIndex = Math.max(0, cards.length - cardsPerView);
    currentIndex = Math.min(currentIndex, maxIndex);
    buildDots();
    update();
  });

  buildDots();
  update();
}

/* ============================================================
   5. FORMULARIO DE CONTACTO (validación + envío simulado)
   ============================================================ */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const successBox = document.getElementById("form-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearFormErrors(form);

    const nombre   = form.nombre.value.trim();
    const email    = form.email.value.trim();
    const telefono = form.telefono.value.trim();
    const servicio = form.servicio.value;
    const mensaje  = form.mensaje.value.trim();

    let valid = true;

    if (nombre.length < 2) {
      setFieldError(form.nombre, "Por favor ingresa tu nombre completo.");
      valid = false;
    }
    if (!isValidEmail(email)) {
      setFieldError(form.email, "Ingresa un correo electrónico válido.");
      valid = false;
    }
    if (!isValidPhone(telefono)) {
      setFieldError(form.telefono, "Ingresa un número de teléfono válido.");
      valid = false;
    }
    if (!servicio) {
      setFieldError(form.servicio, "Selecciona un servicio de tu interés.");
      valid = false;
    }
    if (mensaje.length < 5) {
      setFieldError(form.mensaje, "Cuéntanos un poco más en tu mensaje.");
      valid = false;
    }

    if (!valid) return;

    // Simulación de envío (aquí se integraría con backend / API / EmailJS, etc.)
    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Enviando...";

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      successBox.classList.add("show");

      setTimeout(() => successBox.classList.remove("show"), 6000);
    }, 900);
  });

  // Limpiar error al escribir
  form.querySelectorAll("input, select, textarea").forEach(field => {
    field.addEventListener("input", () => {
      field.closest(".form-field").classList.remove("has-error");
      field.classList.remove("invalid");
    });
  });
}

function setFieldError(field, message) {
  const wrap = field.closest(".form-field");
  wrap.classList.add("has-error");
  field.classList.add("invalid");
  const errorEl = wrap.querySelector(".field-error");
  if (errorEl) errorEl.textContent = message;
}

function clearFormErrors(form) {
  form.querySelectorAll(".form-field").forEach(f => f.classList.remove("has-error"));
  form.querySelectorAll(".invalid").forEach(f => f.classList.remove("invalid"));
}

function isValidEmail(email) {
  return /^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);
}

function isValidPhone(phone) {
  return /^[\d\s\+\-\(\)]{7,20}$/.test(phone);
}

/* ============================================================
   6. ANIMACIONES AL HACER SCROLL (reveal on scroll)
   ============================================================ */
function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   7. BOTÓN "VOLVER ARRIBA"
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById("back-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 500);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

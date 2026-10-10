/* ============================================================
   LiMi Solutions — Landing Page Scripts
   Vanilla JavaScript, no dependencies.
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     Mobile hamburger navigation
  ---------------------------------------------------------- */
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  const navLinks = mobileNav.querySelectorAll(".nav-link");
  const navCta = mobileNav.querySelector(".nav-cta");

  function openMenu() {
    hamburger.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close menu");
    mobileNav.classList.add("open");
    mobileNav.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open menu");
    mobileNav.classList.remove("open");
    mobileNav.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function toggleMenu() {
    if (mobileNav.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  hamburger.addEventListener("click", toggleMenu);

  // Close the menu when a nav link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
  if (navCta) {
    navCta.addEventListener("click", closeMenu);
  }

  // Close the menu with the Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileNav.classList.contains("open")) {
      closeMenu();
      hamburger.focus();
    }
  });

  /* ----------------------------------------------------------
     Header background on scroll
  ---------------------------------------------------------- */
  const header = document.getElementById("siteHeader");

  function onScrollHeader() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ----------------------------------------------------------
     Smooth scroll navigation (progressive enhancement)
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId.length < 2) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerOffset = 70;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  /* ----------------------------------------------------------
     Scroll-triggered fade-in animations (IntersectionObserver)
  ---------------------------------------------------------- */
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: reveal everything immediately
    revealElements.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ----------------------------------------------------------
     Animated statistics counters
  ---------------------------------------------------------- */
  const statValues = document.querySelectorAll(".stat-value");

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 2000; // ms
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      el.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  if ("IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statValues.forEach(function (el) {
      statsObserver.observe(el);
    });
  } else {
    statValues.forEach(function (el) {
      const target = parseInt(el.getAttribute("data-count"), 10);
      const suffix = el.getAttribute("data-suffix") || "";
      el.textContent = target.toLocaleString() + suffix;
    });
  }

  /* ----------------------------------------------------------
     FAQ accordion
  ---------------------------------------------------------- */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");

      // Close all items (single-open accordion)
      faqItems.forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-answer").style.maxHeight = null;
      });

      // Open the clicked item if it was closed
      if (!isOpen) {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* ----------------------------------------------------------
     Newsletter subscription form
  ---------------------------------------------------------- */
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterEmail = document.getElementById("newsletterEmail");
  const newsletterMessage = document.getElementById("newsletterMessage");

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = newsletterEmail.value.trim();

    if (!email) {
      newsletterMessage.textContent = "Please enter your email address.";
      newsletterMessage.className = "newsletter-message error";
      newsletterEmail.focus();
      return;
    }

    if (!isValidEmail(email)) {
      newsletterMessage.textContent = "Please enter a valid email address.";
      newsletterMessage.className = "newsletter-message error";
      newsletterEmail.focus();
      return;
    }

    // Simulate a successful subscription (no backend in a static site)
    newsletterMessage.textContent = "Thanks for subscribing! You're on the list.";
    newsletterMessage.className = "newsletter-message success";
    newsletterForm.reset();
  });

  /* ----------------------------------------------------------
     Sticky call-to-action button
  ---------------------------------------------------------- */
  const stickyCta = document.getElementById("stickyCta");
  const contactSection = document.getElementById("contact");

  function onScrollCta() {
    if (!contactSection) return;

    const contactTop = contactSection.getBoundingClientRect().top;
    const contactVisible = contactTop < window.innerHeight;

    // Show after scrolling past the hero, hide when contact is in view
    if (window.scrollY > 500 && !contactVisible) {
      stickyCta.classList.add("visible");
    } else {
      stickyCta.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", onScrollCta, { passive: true });
  onScrollCta();

  /* ----------------------------------------------------------
     Footer year
  ---------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

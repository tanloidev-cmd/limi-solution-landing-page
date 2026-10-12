/* ============================================================
   LiMi Solutions — Landing Page Scripts
   Vanilla JavaScript, no dependencies.
   Shared by the English page (index.html) and the Vietnamese
   page (vi/index.html), so every lookup is guarded.
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     Mobile hamburger navigation
  ---------------------------------------------------------- */
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");

  if (hamburger && mobileNav) {
    const navLinks = mobileNav.querySelectorAll(".nav-link");
    const navCta = mobileNav.querySelector(".nav-cta");
    const headerEl = document.getElementById("siteHeader");
    const labelOpen = hamburger.getAttribute("data-label-open") || "Open menu";
    const labelClose = hamburger.getAttribute("data-label-close") || "Close menu";

    const openMenu = function () {
      hamburger.classList.add("active");
      hamburger.setAttribute("aria-expanded", "true");
      hamburger.setAttribute("aria-label", labelClose);
      mobileNav.classList.add("open");
      mobileNav.setAttribute("aria-hidden", "false");
      if (headerEl) headerEl.classList.add("menu-open");
      document.body.style.overflow = "hidden";
    };

    const closeMenu = function () {
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", labelOpen);
      mobileNav.classList.remove("open");
      mobileNav.setAttribute("aria-hidden", "true");
      if (headerEl) headerEl.classList.remove("menu-open");
      document.body.style.overflow = "";
    };

    hamburger.addEventListener("click", function () {
      if (mobileNav.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close the menu when a nav link or the CTA is clicked
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
  }

  /* ----------------------------------------------------------
     Header background on scroll
  ---------------------------------------------------------- */
  const header = document.getElementById("siteHeader");

  if (header) {
    const onScrollHeader = function () {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", onScrollHeader, { passive: true });
    onScrollHeader();
  }

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
     FAQ accordion
  ---------------------------------------------------------- */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    question.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");

      // Close all items (single-open accordion)
      faqItems.forEach(function (other) {
        other.classList.remove("open");
        const otherQuestion = other.querySelector(".faq-question");
        const otherAnswer = other.querySelector(".faq-answer");
        if (otherQuestion) otherQuestion.setAttribute("aria-expanded", "false");
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      // Open the clicked item if it was closed
      if (!isOpen) {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // Keep an open answer sized correctly when the text reflows
  window.addEventListener("resize", function () {
    const openItem = document.querySelector(".faq-item.open");
    if (!openItem) return;
    const openAnswer = openItem.querySelector(".faq-answer");
    if (openAnswer) openAnswer.style.maxHeight = openAnswer.scrollHeight + "px";
  });

  /* ----------------------------------------------------------
     Sticky call-to-action button
  ---------------------------------------------------------- */
  const stickyCta = document.getElementById("stickyCta");
  const contactSection = document.getElementById("contact");

  if (stickyCta && contactSection) {
    const onScrollCta = function () {
      const contactTop = contactSection.getBoundingClientRect().top;
      const contactVisible = contactTop < window.innerHeight;

      // Show after scrolling past the hero, hide when contact is in view
      if (window.scrollY > 500 && !contactVisible) {
        stickyCta.classList.add("visible");
      } else {
        stickyCta.classList.remove("visible");
      }
    };

    window.addEventListener("scroll", onScrollCta, { passive: true });
    onScrollCta();
  }

  /* ----------------------------------------------------------
     Footer year
  ---------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

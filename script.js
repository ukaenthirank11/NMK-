const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const menuLinks = document.querySelectorAll(".site-nav a, .header-actions a");
const revealTargets = document.querySelectorAll("[data-reveal]");
const projectCards = document.querySelectorAll(".project-card");
const filterButtons = document.querySelectorAll(".filter-btn");
const leadForm = document.querySelector(".lead-form");
const formStatus = document.querySelector(".form-status");

revealTargets.forEach((el, index) => {
  el.classList.add("reveal");
  el.style.setProperty("--delay", `${Math.min(index * 60, 600)}ms`);
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
  );

  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}

if (header && menuToggle) {
  const closeMenu = () => {
    header.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 720px)").matches) {
        closeMenu();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 720px)").matches) {
      closeMenu();
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));

    projectCards.forEach((card) => {
      const matches = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !matches);
    });
  });
});

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = new FormData(leadForm).get("name") || "there";
    const message = `Thanks ${name}. Your enquiry has been captured. We will get back to you soon.`;

    if (formStatus) {
      formStatus.textContent = message;
    }

    leadForm.reset();

    window.setTimeout(() => {
      if (formStatus) {
        formStatus.textContent = "";
      }
    }, 4500);
  });
}

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const yearSlot = document.querySelector("#year");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (yearSlot) {
  yearSlot.textContent = new Date().getFullYear();
}

const currentFile = window.location.pathname.split("/").pop() || "index.html";

navLinks.forEach((link) => {
  const linkFile = link.getAttribute("href")?.replace("./", "") || "";
  if (
    (currentFile === "" || currentFile === "index.html") &&
    linkFile === "index.html"
  ) {
    link.classList.add("is-active");
  } else if (linkFile === currentFile) {
    link.classList.add("is-active");
  }
});

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");

if (!prefersReducedMotion.matches && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

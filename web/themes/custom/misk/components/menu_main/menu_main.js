document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");

  if (!header) return;

  const toggle = header.querySelector('[data-bs-toggle="dropdown"]');
  const closeBtn = header.querySelector(".close-btn");
  const menu = header.querySelector(".dropdown-menu");

  if (!toggle || !closeBtn || !menu) return;

  // Close menu
  closeBtn.addEventListener("click", function () {
    bootstrap.Dropdown.getOrCreateInstance(toggle).hide();
  });

  // Closing animation
  toggle.addEventListener("hide.bs.dropdown", function () {
    menu.style.animation = "none";

    // Force reflow so the animation restarts correctly
    menu.getBoundingClientRect();

    menu.style.animation = "";
    menu.classList.add("hiding");

    menu.addEventListener(
      "animationend",
      function () {
        menu.classList.remove("hiding");
      },
      { once: true }
    );
  });
});

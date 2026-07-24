// Sidebar nav: switch the active tab

const navLinks = document.querySelectorAll(".nav__link");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    navLinks.forEach((item) => {
      item.classList.remove("nav__link--active");
      item.removeAttribute("aria-current");
    });

    link.classList.add("nav__link--active");
    link.setAttribute("aria-current", "page");
  });
});

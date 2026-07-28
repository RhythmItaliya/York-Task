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


const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("is-open");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close menu" : "Open menu"
  );

  document.body.style.overflow = isOpen ? "hidden" : "";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sidebar.classList.contains("is-open")) {
    sidebar.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
    menuToggle.focus();
  }
});


const copyBtn = document.querySelector(".btn-copy");
copyBtn.addEventListener("click", () => {
  const password = copyBtn.previousElementSibling.textContent.trim();

  navigator.clipboard.writeText(password).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 2000);
  });
});

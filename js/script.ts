document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // SCROLL TO TOP BUTTON
  class ScrollToTopButton {
    private btn = document.getElementById("scrollTopBtn") as HTMLElement;

    constructor() {
      if (!this.btn) {
        console.warn("ScrollToTop button not found!");
        return;
      }
      this.init();
    }

    private init() {
      window.addEventListener("scroll", () => this.toggleVisibility());
      this.btn.addEventListener("click", () => this.scrollToTop());
      this.toggleVisibility(); // hneď pri načítaní
    }

    private toggleVisibility() {
      this.btn!.classList.toggle("visible", window.scrollY > 300);
    }

    private scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // Spusti hneď, nie vo vnútornom DOMContentLoaded!
  new ScrollToTopButton();

  // ELEMENTS
  const hamburgerBtn = document.getElementById(
    "hamburger-btn"
  ) as HTMLButtonElement;
  const mobileMenu = document.getElementById("mobile-menu") as HTMLElement;
  const themeToggleDesktop = document.getElementById(
    "theme-toggle"
  ) as HTMLButtonElement;
  const themeToggleMobile = document.getElementById(
    "mobile-theme-toggle"
  ) as HTMLButtonElement | null;
  const themeText = document.getElementById(
    "theme-text"
  ) as HTMLSpanElement | null;

  // DARK MODE
  const applyTheme = (isDark: boolean) => {
    if (isDark) {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      if (themeText) themeText.textContent = "Dark mode";
    } else {
      body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      if (themeText) themeText.textContent = "Light mode";
    }
  };

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme === "dark" || (!savedTheme && prefersDark));

  const toggleTheme = () => {
    applyTheme(!body.classList.contains("dark"));
  };

  themeToggleDesktop.addEventListener("click", toggleTheme);
  if (themeToggleMobile)
    themeToggleMobile.addEventListener("click", toggleTheme);

  // HAMBURGER MENU
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", (e: Event) => {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.toggle("open");
      hamburgerBtn.textContent = isOpen ? "×" : "☰";
    });

    // Zatvoriť po kliknutí na odkaz
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        hamburgerBtn.textContent = "☰";
      });
    });

    // Zatvoriť pri kliknutí mimo
    document.addEventListener("click", (e: Event) => {
      const target = e.target as Node;
      if (!hamburgerBtn.contains(target) && !mobileMenu.contains(target)) {
        mobileMenu.classList.remove("open");
        hamburgerBtn.textContent = "☰";
      }
    });

    // ESC zatvorí menu
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
        mobileMenu.classList.remove("open");
        hamburgerBtn.textContent = "☰";
      }
    });
  }
});

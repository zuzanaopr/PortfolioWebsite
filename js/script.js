document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;
    // SCROLL TO TOP BUTTON
    var ScrollToTopButton = /** @class */ (function () {
        function ScrollToTopButton() {
            this.btn = document.getElementById("scrollTopBtn");
            if (!this.btn) {
                console.warn("ScrollToTop button not found!");
                return;
            }
            this.init();
        }
        ScrollToTopButton.prototype.init = function () {
            var _this = this;
            window.addEventListener("scroll", function () { return _this.toggleVisibility(); });
            this.btn.addEventListener("click", function () { return _this.scrollToTop(); });
            this.toggleVisibility(); // hneď pri načítaní
        };
        ScrollToTopButton.prototype.toggleVisibility = function () {
            this.btn.classList.toggle("visible", window.scrollY > 300);
        };
        ScrollToTopButton.prototype.scrollToTop = function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
        return ScrollToTopButton;
    }());
    // Spusti hneď, nie vo vnútornom DOMContentLoaded!
    new ScrollToTopButton();
    // ELEMENTS
    var hamburgerBtn = document.getElementById("hamburger-btn");
    var mobileMenu = document.getElementById("mobile-menu");
    var themeToggleDesktop = document.getElementById("theme-toggle");
    var themeToggleMobile = document.getElementById("mobile-theme-toggle");
    var themeText = document.getElementById("theme-text");
    // DARK MODE
    var applyTheme = function (isDark) {
        if (isDark) {
            body.classList.add("dark");
            localStorage.setItem("theme", "dark");
            if (themeText)
                themeText.textContent = "Dark mode";
        }
        else {
            body.classList.remove("dark");
            localStorage.setItem("theme", "light");
            if (themeText)
                themeText.textContent = "Light mode";
        }
    };
    var savedTheme = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(savedTheme === "dark" || (!savedTheme && prefersDark));
    var toggleTheme = function () {
        applyTheme(!body.classList.contains("dark"));
    };
    themeToggleDesktop.addEventListener("click", toggleTheme);
    if (themeToggleMobile)
        themeToggleMobile.addEventListener("click", toggleTheme);
    // HAMBURGER MENU
    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            var isOpen = mobileMenu.classList.toggle("open");
            hamburgerBtn.textContent = isOpen ? "×" : "☰";
        });
        // Zatvoriť po kliknutí na odkaz
        mobileMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                mobileMenu.classList.remove("open");
                hamburgerBtn.textContent = "☰";
            });
        });
        // Zatvoriť pri kliknutí mimo
        document.addEventListener("click", function (e) {
            var target = e.target;
            if (!hamburgerBtn.contains(target) && !mobileMenu.contains(target)) {
                mobileMenu.classList.remove("open");
                hamburgerBtn.textContent = "☰";
            }
        });
        // ESC zatvorí menu
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
                mobileMenu.classList.remove("open");
                hamburgerBtn.textContent = "☰";
            }
        });
    }
});

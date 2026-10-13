
/* =====================================================
   UNIWEAR WEBSITE
   PART 4: COMPLETE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =========================================
     1. ELEMENTS
  ========================================= */

  const root = document.documentElement;
  const body = document.body;

  const siteHeader = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNavigation = document.getElementById("mainNavigation");

  const homeDropdownToggle =
    document.getElementById("homeDropdownToggle");

  const homeItem = document.querySelector(".home-item");
  const homeDropdown = document.getElementById("homeDropdown");

  const darkModeToggle =
    document.getElementById("darkModeToggle");

  const rtlToggle =
    document.getElementById("rtlToggle");


  /* =========================================
     2. CLOSE HAMBURGER MENU
  ========================================= */

  function closeNavigation() {
    if (!menuToggle || !mainNavigation) return;

    mainNavigation.classList.remove("is-open");
    menuToggle.classList.remove("is-active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );
  }


  function openNavigation() {
    if (!menuToggle || !mainNavigation) return;

    mainNavigation.classList.add("is-open");
    menuToggle.classList.add("is-active");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute(
      "aria-label",
      "Close navigation menu"
    );
  }


  /* =========================================
     3. HAMBURGER MENU TOGGLE
  ========================================= */

  if (menuToggle && mainNavigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen =
        mainNavigation.classList.contains("is-open");

      if (isOpen) {
        closeNavigation();
      } else {
        openNavigation();
      }
    });
  }


  /* =========================================
     4. HOME DROPDOWN
     ONLY HOME HAS A DROPDOWN
  ========================================= */

  function closeHomeDropdown() {
    if (!homeItem || !homeDropdownToggle) return;

    homeItem.classList.remove("dropdown-open");

    homeDropdownToggle.setAttribute(
      "aria-expanded",
      "false"
    );
  }


  if (homeDropdownToggle && homeItem) {
    homeDropdownToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen =
        homeItem.classList.contains("dropdown-open");

      closeHomeDropdown();

      if (!isOpen) {
        homeItem.classList.add("dropdown-open");

        homeDropdownToggle.setAttribute(
          "aria-expanded",
          "true"
        );
      }
    });
  }


  /* =========================================
     5. DARK MODE ICON
     Moon = Light Mode
     Sun = Dark Mode
  ========================================= */

  function applyTheme(theme) {
    const isDark = theme === "dark";

    root.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );

    if (darkModeToggle) {
      darkModeToggle.innerHTML = isDark
        ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';

      darkModeToggle.setAttribute(
        "aria-pressed",
        String(isDark)
      );

      darkModeToggle.setAttribute(
        "aria-label",
        isDark ? "Enable light mode" : "Enable dark mode"
      );

      darkModeToggle.setAttribute(
        "title",
        isDark ? "Light Mode" : "Dark Mode"
      );
    }

    try {
      localStorage.setItem("uniwear-theme", isDark ? "dark" : "light");
    } catch (error) {
      // The theme still works when storage is unavailable.
    }
  }


  /* Restore saved theme */

  let savedTheme = "light";

  try {
    savedTheme = localStorage.getItem("uniwear-theme") || "light";
  } catch (error) {
    savedTheme = root.getAttribute("data-theme") || "light";
  }

  applyTheme(savedTheme);


  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      const currentTheme =
        root.getAttribute("data-theme") || "light";

      applyTheme(
        currentTheme === "dark" ? "light" : "dark"
      );
    });
  }


  /* =========================================
     6. RTL / LTR TOGGLE
     Same button works in both directions.
  ========================================= */

  function applyDirection(direction) {
    const isRTL = direction === "rtl";

    root.setAttribute("dir", isRTL ? "rtl" : "ltr");

    if (rtlToggle) {
      rtlToggle.setAttribute(
        "aria-pressed",
        String(isRTL)
      );

      rtlToggle.setAttribute(
        "aria-label",
        isRTL
          ? "Switch to left-to-right layout"
          : "Switch to right-to-left layout"
      );

      rtlToggle.setAttribute(
        "title",
        isRTL ? "LTR Mode" : "RTL Mode"
      );
    }

    try {
      localStorage.setItem(
        "uniwear-direction",
        isRTL ? "rtl" : "ltr"
      );
    } catch (error) {
      // Direction still works when storage is unavailable.
    }

    closeHomeDropdown();
  }


  /* Restore saved direction */

  let savedDirection = "ltr";

  try {
    savedDirection =
      localStorage.getItem("uniwear-direction") || "ltr";
  } catch (error) {
    savedDirection = root.getAttribute("dir") || "ltr";
  }

  applyDirection(savedDirection);


  if (rtlToggle) {
    rtlToggle.addEventListener("click", () => {
      const currentDirection = root.getAttribute("dir") || "ltr";

      applyDirection(
        currentDirection === "rtl" ? "ltr" : "rtl"
      );
    });
  }


  /* =========================================
     7. CLOSE MENU AFTER NAVIGATION
  ========================================= */

  if (mainNavigation) {
    mainNavigation.addEventListener("click", (event) => {
      const link = event.target.closest("a");

      if (link) {
        closeNavigation();
        closeHomeDropdown();
      }
    });
  }


  /* =========================================
     8. CLOSE MENU ON OUTSIDE CLICK
  ========================================= */

  document.addEventListener("click", (event) => {
    if (
      mainNavigation &&
      menuToggle &&
      mainNavigation.classList.contains("is-open") &&
      !mainNavigation.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeNavigation();
      closeHomeDropdown();
    }
  });


  /* =========================================
     9. CLOSE MENU WITH ESCAPE
  ========================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNavigation();
      closeHomeDropdown();

      if (menuToggle) {
        menuToggle.focus();
      }
    }
  });


  /* =========================================
     10. CLOSE MENU WHEN RETURNING TO DESKTOP
  ========================================= */

  function handleViewportChange() {
    if (window.matchMedia("(min-width: 1200px)").matches) {
      closeNavigation();
      closeHomeDropdown();
    }
  }

  window.addEventListener("resize", handleViewportChange);


  /* =========================================
     11. HEADER SCROLL STATE
     Optional .is-scrolled styling
  ========================================= */

  function updateHeaderScroll() {
    if (!siteHeader) return;

    siteHeader.classList.toggle(
      "is-scrolled",
      window.scrollY > 10
    );
  }

  window.addEventListener("scroll", updateHeaderScroll, {
    passive: true
  });

  updateHeaderScroll();



/* =========================================
   12. ACTIVE NAVIGATION LINK
   Keep dropdown closed on page load
========================================= */

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

const navLinks = document.querySelectorAll(
    ".nav-list > .nav-item > a, .home-dropdown a"
);

/* Close Home dropdown when page loads */
if (homeItem && homeDropdownToggle) {
    homeItem.classList.remove("dropdown-open");
    homeDropdownToggle.setAttribute("aria-expanded", "false");
}

navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) return;

    const linkPage = href.split("/").pop().split("?")[0].split("#")[0];

    if (linkPage === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
});

  /* =========================================
     13. CURRENT YEAR
     Works if footer contains #currentYear
  ========================================= */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

});














/********HOME-1*********/


/* ==========================================
   HOME 1 - HERO SLIDER
========================================== */

document.addEventListener("DOMContentLoaded", function () {
    const hero = document.querySelector("#home1Hero");

    if (!hero) return;

    const slides = Array.from(
        hero.querySelectorAll(".home1-hero-slide")
    );

    const dots = Array.from(
        hero.querySelectorAll(".home1-hero-dot")
    );

    const prevButton = hero.querySelector(".home1-hero-prev");
    const nextButton = hero.querySelector(".home1-hero-next");

    if (!slides.length) return;

    let currentIndex = slides.findIndex(function (slide) {
        return slide.classList.contains("active");
    });

    if (currentIndex < 0) currentIndex = 0;

    let autoplayInterval = null;
    const autoplayDelay = 5000;
    let isPaused = false;

    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;

        slides.forEach(function (slide, i) {
            const isActive = i === currentIndex;

            slide.classList.toggle("active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));

            if (isActive) {
                slide.removeAttribute("inert");
            } else {
                slide.setAttribute("inert", "");
            }
        });

        dots.forEach(function (dot, i) {
            const isActive = i === currentIndex;

            dot.classList.toggle("active", isActive);

            if (isActive) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function stopAutoplay() {
        if (autoplayInterval !== null) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    function startAutoplay() {
        stopAutoplay();

        if (
            isPaused ||
            slides.length < 2 ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        autoplayInterval = setInterval(function () {
            nextSlide();
        }, autoplayDelay);
    }

    if (nextButton) {
        nextButton.addEventListener("click", function () {
            nextSlide();
            startAutoplay();
        });
    }

    if (prevButton) {
        prevButton.addEventListener("click", function () {
            prevSlide();
            startAutoplay();
        });
    }

    dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            showSlide(index);
            startAutoplay();
        });
    });

    /* Pause when hovering over the hero */
    hero.addEventListener("mouseenter", function () {
        isPaused = true;
        stopAutoplay();
    });

    hero.addEventListener("mouseleave", function () {
        isPaused = false;
        startAutoplay();
    });

    /* Pause while the browser tab is hidden */
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    /* Keyboard navigation */
    hero.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight") {
            nextSlide();
            startAutoplay();
        } else if (event.key === "ArrowLeft") {
            prevSlide();
            startAutoplay();
        }
    });

    /* Initial slide */
    showSlide(currentIndex);
    startAutoplay();
});




/* ==========================================
   SECTION 8: FAQ ACCORDION
========================================== */

document.addEventListener("DOMContentLoaded", function () {
    const faqSection = document.querySelector("#h1Faq");

    if (!faqSection) return;

    const faqItems = faqSection.querySelectorAll(".h1-faq-item");

    faqItems.forEach(function (item) {
        const question = item.querySelector(".h1-faq-question");
        const answer = item.querySelector(".h1-faq-answer");
        const icon = item.querySelector(".h1-faq-toggle i");

        if (!question || !answer || !icon) return;

        question.addEventListener("click", function () {
            const isOpen =
                question.getAttribute("aria-expanded") === "true";

            // Close all FAQ items
            faqItems.forEach(function (otherItem) {
                const otherQuestion =
                    otherItem.querySelector(".h1-faq-question");
                const otherAnswer =
                    otherItem.querySelector(".h1-faq-answer");
                const otherIcon =
                    otherItem.querySelector(".h1-faq-toggle i");

                if (!otherQuestion || !otherAnswer || !otherIcon) return;

                otherItem.classList.remove("active");
                otherQuestion.setAttribute("aria-expanded", "false");
                otherAnswer.hidden = true;

                otherIcon.classList.remove("fa-minus");
                otherIcon.classList.add("fa-plus");
            });

            // Open the selected item if it was previously closed
            if (!isOpen) {
                item.classList.add("active");
                question.setAttribute("aria-expanded", "true");
                answer.hidden = false;

                icon.classList.remove("fa-plus");
                icon.classList.add("fa-minus");
            }
        });
    });
});













/* ==========================================
   HOME 2: HERO SLIDER
   AUTOMATIC SLIDES + PAGINATION
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const hero = document.querySelector("#h2Hero");

    // Stop if Home 2 hero section is not present
    if (!hero) return;

    const slides = hero.querySelectorAll(".h2-hero-slide");
    const dots = hero.querySelectorAll(".h2-hero-dot");
    const currentCounter = hero.querySelector(".h2-hero-current");

    if (slides.length === 0) return;

    let currentIndex = 0;
    let autoplayInterval = null;

    const AUTOPLAY_DELAY = 5000;

    // Format slide number as 01, 02, 03...
    function formatNumber(number) {
        return String(number).padStart(2, "0");
    }

    // Display selected slide
    function showSlide(index) {

        currentIndex = (index + slides.length) % slides.length;

        slides.forEach(function (slide, i) {
            const isActive = i === currentIndex;

            slide.classList.toggle("active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));

            // Prevent inactive slide links from receiving keyboard focus
            slide.querySelectorAll("a, button").forEach(function (element) {
                if (isActive) {
                    element.removeAttribute("tabindex");
                } else {
                    element.setAttribute("tabindex", "-1");
                }
            });
        });

        dots.forEach(function (dot, i) {
            const isActive = i === currentIndex;

            dot.classList.toggle("active", isActive);
            dot.setAttribute("aria-current", String(isActive));
        });

        if (currentCounter) {
            currentCounter.textContent = formatNumber(currentIndex + 1);
        }
    }

    // Move to next slide
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // Start automatic sliding
    function startAutoplay() {
        stopAutoplay();

        if (
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
            slides.length > 1
        ) {
            autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
        }
    }

    // Stop automatic sliding
    function stopAutoplay() {
        if (autoplayInterval !== null) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    // Pagination dot clicks
    dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            showSlide(index);
            startAutoplay();
        });
    });

    // Pause while the pointer is over the hero
    hero.addEventListener("mouseenter", stopAutoplay);
    hero.addEventListener("mouseleave", startAutoplay);

    // Pause while keyboard users interact with hero controls
    hero.addEventListener("focusin", stopAutoplay);
    hero.addEventListener("focusout", function (event) {
        if (!hero.contains(event.relatedTarget)) {
            startAutoplay();
        }
    });

    // Pause when the browser tab is hidden
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    // Initial slide and autoplay
    showSlide(0);
    startAutoplay();

});
/* ==========================================
   END HOME 2 HERO SLIDER
========================================== */













/****LOGIN******/

/* =========================================================
   UN IWEAR — LOGIN PAGE JAVASCRIPT
   File: js/login.js
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const body = document.body;

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const rtlToggle = document.getElementById("loginRtlToggle");
    const themeToggle = document.getElementById("loginThemeToggle");

    const passwordInput = document.getElementById("loginPassword");
    const passwordToggle = document.getElementById("loginPasswordToggle");

    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("loginEmail");

    /* =====================================================
       RTL MODE
    ===================================================== */

    if (rtlToggle) {
        rtlToggle.addEventListener("click", function () {
            const isRTL = body.getAttribute("dir") === "rtl";

            if (isRTL) {
                body.setAttribute("dir", "ltr");
                localStorage.setItem("loginDirection", "ltr");
                rtlToggle.setAttribute("aria-pressed", "false");
            } else {
                body.setAttribute("dir", "rtl");
                localStorage.setItem("loginDirection", "rtl");
                rtlToggle.setAttribute("aria-pressed", "true");
            }
        });
    }

    /* Restore saved direction */

    const savedDirection = localStorage.getItem("loginDirection");

    if (savedDirection === "rtl" || savedDirection === "ltr") {
        body.setAttribute("dir", savedDirection);

        if (rtlToggle) {
            rtlToggle.setAttribute(
                "aria-pressed",
                savedDirection === "rtl" ? "true" : "false"
            );
        }
    }

    


    /* =====================================================
       PASSWORD VISIBILITY
    ===================================================== */

    if (passwordInput && passwordToggle) {
        passwordToggle.addEventListener("click", function () {
            const showPassword = passwordInput.type === "password";

            passwordInput.type = showPassword ? "text" : "password";

            passwordToggle.setAttribute(
                "aria-label",
                showPassword ? "Hide password" : "Show password"
            );

            passwordToggle.setAttribute(
                "aria-pressed",
                showPassword ? "true" : "false"
            );
        });
    }

    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    if (emailInput) {
        emailInput.addEventListener("blur", function () {
            emailInput.setCustomValidity("");

            if (
                emailInput.value.trim() !== "" &&
                !emailInput.validity.valid
            ) {
                emailInput.setCustomValidity(
                    "Please enter a valid email address."
                );
            }
        });

        emailInput.addEventListener("input", function () {
            emailInput.setCustomValidity("");
        });
    }

    /* =====================================================
       LOGIN FORM
    ===================================================== */

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!loginForm.checkValidity()) {
                loginForm.reportValidity();
                return;
            }

            const email = emailInput ? emailInput.value.trim() : "";
            const password = passwordInput ? passwordInput.value : "";

            if (!email || !password) {
                alert("Please enter your email and password.");
                return;
            }

            /*
              FRONTEND ONLY

              Connect this form to your authentication backend
              or authentication service to sign users in.

              Never store passwords in localStorage or expose
              authentication credentials in frontend code.
            */

            alert(
                "The form is valid. Connect your authentication service to complete login."
            );
        });
    }

    /* =====================================================
       SOCIAL LOGIN BUTTONS
    ===================================================== */

    const socialButtons = document.querySelectorAll(
        ".login-social-btn"
    );

    socialButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            /*
              Google, Facebook and Apple login require their
              respective OAuth configuration and backend flow.
            */

            alert(
                "Social login is not connected yet. Configure the relevant sign-in provider."
            );
        });
    });

});











/*****REGISTER ********/

/* =========================================================
   UN IWEAR — REGISTER PAGE JAVASCRIPT
   File: js/register.js
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const body = document.body;

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const rtlToggle = document.getElementById("registerRtlToggle");
    const themeToggle = document.getElementById("registerThemeToggle");

    const registerForm = document.getElementById("registerForm");

    const nameInput = document.getElementById("registerName");
    const emailInput = document.getElementById("registerEmail");
    const phoneInput = document.getElementById("registerPhone");
    const companyInput = document.getElementById("registerCompany");

    const passwordInput = document.getElementById("registerPassword");
    const confirmPasswordInput = document.getElementById(
        "registerConfirmPassword"
    );

    const passwordToggle = document.getElementById(
        "registerPasswordToggle"
    );

    const confirmPasswordToggle = document.getElementById(
        "registerConfirmPasswordToggle"
    );

    const termsCheckbox = document.getElementById("registerTerms");

    /* =====================================================
       RTL MODE
    ===================================================== */

    function applyRegisterDirection(direction) {
        body.setAttribute("dir", direction);

        if (rtlToggle) {
            rtlToggle.setAttribute(
                "aria-pressed",
                direction === "rtl" ? "true" : "false"
            );
        }

        try {
            localStorage.setItem("registerDirection", direction);
        } catch (error) {
            // Continue if browser storage is unavailable.
        }
    }

    if (rtlToggle) {
        rtlToggle.addEventListener("click", function () {
            const currentDirection = body.getAttribute("dir") || "ltr";

            applyRegisterDirection(
                currentDirection === "rtl" ? "ltr" : "rtl"
            );
        });
    }

    try {
        const savedDirection = localStorage.getItem("registerDirection");

        if (savedDirection === "rtl" || savedDirection === "ltr") {
            applyRegisterDirection(savedDirection);
        }
    } catch (error) {
        // Keep the default HTML direction.
    }

    

    /* =====================================================
       PASSWORD VISIBILITY
    ===================================================== */

    function setupPasswordToggle(input, button) {
        if (!input || !button) return;

        button.setAttribute("aria-pressed", "false");
        button.setAttribute("aria-label", "Show password");

        button.addEventListener("click", function () {
            const shouldShow = input.type === "password";

            input.type = shouldShow ? "text" : "password";

            button.setAttribute(
                "aria-label",
                shouldShow ? "Hide password" : "Show password"
            );

            button.setAttribute(
                "aria-pressed",
                shouldShow ? "true" : "false"
            );
        });
    }

    setupPasswordToggle(passwordInput, passwordToggle);

    setupPasswordToggle(
        confirmPasswordInput,
        confirmPasswordToggle
    );

    /* =====================================================
       PASSWORD MATCH VALIDATION
    ===================================================== */

    function validatePasswordMatch() {
        if (!passwordInput || !confirmPasswordInput) return true;

        if (confirmPasswordInput.value === "") {
            confirmPasswordInput.setCustomValidity("");
            return false;
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity(
                "Passwords do not match. Please try again."
            );

            return false;
        }

        confirmPasswordInput.setCustomValidity("");
        return true;
    }

    if (passwordInput) {
        passwordInput.addEventListener("input", function () {
            if (confirmPasswordInput &&
                confirmPasswordInput.value !== "") {
                validatePasswordMatch();
            }
        });
    }

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener("input", function () {
            validatePasswordMatch();
        });
    }

    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    if (emailInput) {
        emailInput.addEventListener("input", function () {
            emailInput.setCustomValidity("");
        });

        emailInput.addEventListener("blur", function () {
            emailInput.setCustomValidity("");

            if (
                emailInput.value.trim() !== "" &&
                !emailInput.validity.valid
            ) {
                emailInput.setCustomValidity(
                    "Please enter a valid email address."
                );
            }
        });
    }

    /* =====================================================
       PHONE FIELD
    ===================================================== */

    if (phoneInput) {
        phoneInput.addEventListener("input", function () {
            // Allow international numbers, spaces, and common symbols.
            phoneInput.value = phoneInput.value.replace(
                /[^0-9+\-()\s]/g,
                ""
            );
        });
    }

    /* =====================================================
       REGISTER FORM SUBMISSION
    ===================================================== */

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!registerForm.checkValidity()) {
                registerForm.reportValidity();
                return;
            }

            if (!validatePasswordMatch()) {
                confirmPasswordInput.reportValidity();
                confirmPasswordInput.focus();
                return;
            }

            if (
                passwordInput &&
                passwordInput.value.length < 8
            ) {
                passwordInput.setCustomValidity(
                    "Password must contain at least 8 characters."
                );

                passwordInput.reportValidity();
                passwordInput.focus();
                passwordInput.setCustomValidity("");
                return;
            }

            if (termsCheckbox && !termsCheckbox.checked) {
                termsCheckbox.setCustomValidity(
                    "Please accept the Terms and Conditions."
                );

                termsCheckbox.reportValidity();
                termsCheckbox.focus();
                termsCheckbox.setCustomValidity("");
                return;
            }

            const formData = {
                name: nameInput ? nameInput.value.trim() : "",
                email: emailInput ? emailInput.value.trim() : "",
                phone: phoneInput ? phoneInput.value.trim() : "",
                company: companyInput ? companyInput.value.trim() : ""
            };

            /*
              FRONTEND ONLY

              Connect formData and the password to your secure
              registration API or authentication provider.

              Do not save passwords in localStorage or send them
              to an untrusted endpoint.
            */

            console.log("Registration form validated:", formData);

            alert(
                "Your registration form is valid. Connect the registration API to create your account."
            );
        });
    }

});


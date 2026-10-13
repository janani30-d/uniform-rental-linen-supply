
/* =====================================================
   UNIWEAR DASHBOARD
   SIDEBAR + TOPBAR JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const layout = document.getElementById("uwDashboardLayout");
    const sidebar = document.getElementById("uwSidebar");
    const menuToggle = document.getElementById("uwMenuToggle");
    const sidebarClose = document.getElementById("uwSidebarClose");
    const sidebarOverlay = document.getElementById("uwSidebarOverlay");

    const darkModeToggle = document.getElementById("uwDarkModeToggle");
    const rtlToggle = document.getElementById("uwRtlToggle");

    if (!layout || !sidebar) return;


    /* =====================================
       1. SIDEBAR HAMBURGER
    ====================================== */

    function openSidebar() {
        layout.classList.add("uw-sidebar-open");

        menuToggle?.setAttribute("aria-expanded", "true");
        menuToggle?.setAttribute("aria-label", "Close navigation menu");

        document.body.style.overflow = "hidden";
    }

    function closeSidebar() {
        layout.classList.remove("uw-sidebar-open");

        menuToggle?.setAttribute("aria-expanded", "false");
        menuToggle?.setAttribute("aria-label", "Open navigation menu");

        document.body.style.overflow = "";
    }

    menuToggle?.addEventListener("click", function () {
        const isOpen = layout.classList.contains("uw-sidebar-open");

        if (isOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    sidebarClose?.addEventListener("click", closeSidebar);
    sidebarOverlay?.addEventListener("click", closeSidebar);

    /* Close sidebar with Escape */
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeSidebar();
        }
    });

    /* Close after selecting a sidebar link on mobile/tablet */
    sidebar.querySelectorAll(".uw-sidebar-nav .uw-sidebar-link")
        .forEach(function (link) {
            link.addEventListener("click", function () {
                if (window.innerWidth <= 1199) {
                    closeSidebar();
                }
            });
        });

    /* Close drawer when switching to desktop */
    window.addEventListener("resize", function () {
        if (window.innerWidth > 1199) {
            closeSidebar();
        }
    });


    /* =====================================
       2. DARK MODE
    ====================================== */

    function applyTheme(theme) {
        const isDark = theme === "dark";

        document.documentElement.setAttribute(
            "data-theme",
            isDark ? "dark" : "light"
        );

        if (darkModeToggle) {
            darkModeToggle.innerHTML = isDark
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';

            darkModeToggle.setAttribute(
                "aria-pressed",
                String(isDark)
            );

            darkModeToggle.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );
        }
    }

    /* Use the current HTML theme on initial load */
    applyTheme(
        document.documentElement.getAttribute("data-theme") || "light"
    );

    darkModeToggle?.addEventListener("click", function () {
        const currentTheme =
            document.documentElement.getAttribute("data-theme") || "light";

        applyTheme(currentTheme === "dark" ? "light" : "dark");
    });


    /* =====================================
       3. RTL / LTR TOGGLE
    ====================================== */

    function applyDirection(direction) {
        const isRTL = direction === "rtl";

        document.documentElement.setAttribute(
            "dir",
            isRTL ? "rtl" : "ltr"
        );

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
        }

        /* Close drawer after changing direction */
        closeSidebar();
    }

    /* Set initial RTL button state */
    applyDirection(
        document.documentElement.getAttribute("dir") || "ltr"
    );

    rtlToggle?.addEventListener("click", function () {
        const currentDirection =
            document.documentElement.getAttribute("dir") || "ltr";

        applyDirection(currentDirection === "rtl" ? "ltr" : "rtl");
    });


    /* =====================================
       4. ACTIVE SIDEBAR ITEM
    ====================================== */

    const sidebarLinks = sidebar.querySelectorAll(
        ".uw-sidebar-nav .uw-sidebar-link"
    );

    sidebarLinks.forEach(function (link) {
        link.addEventListener("click", function () {

            sidebarLinks.forEach(function (item) {
                item.classList.remove("active");
                item.removeAttribute("aria-current");
            });

            link.classList.add("active");
            link.setAttribute("aria-current", "page");

        });
    });


    /* =====================================
       5. TOPBAR BUTTON PLACEHOLDERS
       Implement dropdowns/pages separately
    ====================================== */

    const notificationsBtn = document.getElementById("uwNotificationsBtn");
    const settingsBtn = document.getElementById("uwSettingsBtn");
    const profileBtn = document.getElementById("uwProfileBtn");

    notificationsBtn?.addEventListener("click", function () {
        console.info("Notifications panel can be connected here.");
    });

    settingsBtn?.addEventListener("click", function () {
        console.info("Dashboard settings can be connected here.");
    });

    profileBtn?.addEventListener("click", function () {
        console.info("Business profile menu can be connected here.");
    });

});
















document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("logoutModal");
    const yesButton = document.getElementById("confirmLogout");
    const noButton = document.getElementById("cancelLogout");

    if (!modal || !yesButton || !noButton) {
        console.error("Logout modal HTML or button IDs are missing.");
        return;
    }

    // Open confirmation popup
    document.addEventListener("click", function (event) {
        const logoutLink = event.target.closest(".uw-logout-link");

        if (!logoutLink) return;

        event.preventDefault();

        modal.classList.add("is-visible");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });

    // Yes: redirect to login page
    yesButton.addEventListener("click", function () {
        window.location.href = "login.html";
    });

    // No: remain on the current page
    function closeModal() {
        modal.classList.remove("is-visible");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    noButton.addEventListener("click", closeModal);

    // Close by clicking the backdrop
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close with Escape
    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            modal.classList.contains("is-visible")
        ) {
            closeModal();
        }
    });
});

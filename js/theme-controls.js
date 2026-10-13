
/* =====================================================
   UN IWEAR — ONE GLOBAL THEME CONTROLLER
   Main pages + Login + Register + Dashboard
===================================================== */

(function () {
    "use strict";

    const root = document.documentElement;

    const THEME_KEY = "uniwear-theme";
    const RTL_KEY = "uniwear-direction";

    const THEME_IDS = [
        "uwDarkModeToggle",
        "darkModeToggle",
        "loginThemeToggle",
        "registerThemeToggle"
    ];

    const RTL_IDS = [
        "uwRtlToggle",
        "rtlToggle",
        "loginRtlToggle",
        "registerRtlToggle"
    ];

    function readSetting(key, fallback) {
        try {
            return localStorage.getItem(key) || fallback;
        } catch (error) {
            return fallback;
        }
    }

    function saveSetting(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            // The setting still applies to the current page.
        }
    }

    function findButtons(ids) {
        return ids
            .map(function (id) {
                return document.getElementById(id);
            })
            .filter(Boolean);
    }


/* -----------------------------------------
   APPLY ONE GLOBAL THEME TO ALL PAGES
----------------------------------------- */

function applyTheme(theme) {
    const dark = theme === "dark";
    const value = dark ? "dark" : "light";

    /* One source of truth */
    root.setAttribute("data-theme", value);
    root.classList.toggle("dark-mode", dark);

    if (document.body) {
        document.body.classList.toggle("dark-mode", dark);
        document.body.classList.toggle(
            "login-dark-mode",
            dark && Boolean(document.getElementById("loginThemeToggle"))
        );
        document.body.classList.toggle(
            "register-dark-mode",
            dark && Boolean(document.getElementById("registerThemeToggle"))
        );
    }

    saveSetting(THEME_KEY, value);

    /* Synchronize every theme button */
    findButtons(THEME_IDS).forEach(function (button) {
        button.setAttribute("aria-pressed", String(dark));

        const icon = button.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-moon", !dark);
            icon.classList.toggle("fa-sun", dark);
        }
    });
}

    /* -----------------------------------------
       APPLY RTL / LTR
    ----------------------------------------- */

    function applyDirection(direction) {
        const rtl = direction === "rtl";

        root.setAttribute("dir", rtl ? "rtl" : "ltr");

        if (document.body) {
            document.body.setAttribute(
                "dir",
                rtl ? "rtl" : "ltr"
            );

            document.body.classList.toggle("rtl-mode", rtl);
        }

        saveSetting(RTL_KEY, rtl ? "rtl" : "ltr");

        findButtons(RTL_IDS).forEach(function (button) {
            button.setAttribute("aria-pressed", String(rtl));
            button.setAttribute(
                "aria-label",
                rtl
                    ? "Switch to left-to-right layout"
                    : "Switch to right-to-left layout"
            );
        });
    }

    /* -----------------------------------------
       RESTORE SETTINGS ON EVERY PAGE
    ----------------------------------------- */

    applyTheme(readSetting(THEME_KEY, "light"));
    applyDirection(readSetting(RTL_KEY, "ltr"));

    /* -----------------------------------------
       HANDLE CLICKS BEFORE OLD PAGE HANDLERS
    ----------------------------------------- */

    document.addEventListener("click", function (event) {
        const target = event.target;

        if (!(target instanceof Element)) return;

        const button = target.closest("button");

        if (!button) return;

        if (THEME_IDS.includes(button.id)) {
            event.preventDefault();
            event.stopImmediatePropagation();

            const isDark =
                root.getAttribute("data-theme") === "dark";

            applyTheme(isDark ? "light" : "dark");
            return;
        }

        if (RTL_IDS.includes(button.id)) {
            event.preventDefault();
            event.stopImmediatePropagation();

            const isRTL = root.getAttribute("dir") === "rtl";

            applyDirection(isRTL ? "ltr" : "rtl");
        }
    }, true);

})();

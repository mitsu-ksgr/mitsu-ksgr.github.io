//-----------------------------------------------------------------------------
//
// theme-switch.js
//
// * Dependency
// - polyca ... https://github.com/mitsu-ksgr/polyca
//
//-----------------------------------------------------------------------------
"use strict";

(() => {
  //-----------------------------------------------------------------------------
  //  Defines
  //-----------------------------------------------------------------------------
  // Selectors
  const SELECTOR_THEME_SWITCH = "#theme-switch";

  // localStorage
  const STORAGE_KEY = "theme-color-mode";
  const storage = {
    get: () => { return window.localStorage.getItem(STORAGE_KEY) || "light"; },
    set: (v) => { if (v) window.localStorage.setItem(STORAGE_KEY, v); },
  };

  // Icon
  const THEME_INFO = {
    "light": {
      theme_name: "light",
      icon_id: "#theme-icon-light",
      next_theme: "dark",
    },
    "dark": {
      theme_name: "dark-blue",
      icon_id: "#theme-icon-dark",
      next_theme: "light",
    }
  };



  //-----------------------------------------------------------------------------
  //  Functions
  //-----------------------------------------------------------------------------
  function setThemeIcon(theme) {
    const info = THEME_INFO[theme];
    if (info) {
      Object.keys(THEME_INFO).forEach((key) => {
        const icon = document.querySelector(THEME_INFO[key].icon_id);
        icon.hidden = !(key === theme);
      });
    }
  }

  function switchTheme(theme) {
    const info = THEME_INFO[theme];
    document.body.setAttribute("class", `theme-${info.theme_name}`);
    storage.set(theme);
    setThemeIcon(info.next_theme);
  }

  function main() {
    // Setup switch button
    const btn = document.querySelector(SELECTOR_THEME_SWITCH);
    btn.addEventListener("click", () => {
      const cur = storage.get();
      const info = THEME_INFO[cur];

      console.log(`SwitchTheme: ${cur} --> ${info.next_theme}`);
      switchTheme(info.next_theme);
    });

    // Init theme.
    switchTheme(storage.get());
  }

  // Entrypoint
  window.addEventListener("DOMContentLoaded", () => {
    main();
  });
})();


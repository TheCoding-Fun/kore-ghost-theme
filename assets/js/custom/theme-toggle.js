function calculateAccentTextColor() {
  // https://gomakethings.com/dynamically-changing-the-text-color-based-on-background-color-contrast-with-vanilla-js/
  const styles = getComputedStyle(document.documentElement);
  var accentColor = styles.getPropertyValue("--ghost-accent-color");
  accentColor = accentColor.trim().slice(1);

  if (accentColor.length === 3) {
    accentColor =
      accentColor[0] +
      accentColor[0] +
      accentColor[1] +
      accentColor[1] +
      accentColor[2] +
      accentColor[2];
  }

  var r = parseInt(accentColor.substr(0, 2), 16);
  var g = parseInt(accentColor.substr(2, 2), 16);
  var b = parseInt(accentColor.substr(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  var textColor = yiq >= 128 ? "dark" : "light";

  document.documentElement.className = `has-${textColor}-text`;
}

function switchIcons(themes, targetTheme) {
  // themes[]: light index: 0, dark index: 1
  const isLight = themes.indexOf(targetTheme) === 0;
  const sunIcons = document.querySelectorAll(".gh-sun-icon");
  const moonIcons = document.querySelectorAll(".gh-moon-icon");

  if (!sunIcons.length || !moonIcons.length) {
    return;
  }

  if (isLight) {
    [...sunIcons].forEach((el) => {
      el.classList.add("k--swap-on");
      el.classList.remove("k--swap-off");
    });
    [...moonIcons].forEach((el) => {
      el.classList.add("k--swap-off");
      el.classList.remove("k--swap-on");
    });
  } else {
    [...sunIcons].forEach((el) => {
      el.classList.add("k--swap-off");
      el.classList.remove("k--swap-on");
    });
    [...moonIcons].forEach((el) => {
      el.classList.add("k--swap-on");
      el.classList.remove("k--swap-off");
    });
  }
}

function themeInit() {
  const toggleEl = document.querySelector("[data-toggle-theme]");

  if (toggleEl) {
    const themesList = toggleEl.getAttribute("data-toggle-theme");
    const themesArray = themesList.split(",");
    const defaultTheme = toggleEl.getAttribute("data-default-theme");
    const dataKey = toggleEl.getAttribute("data-key") || "theme";
    const savedTheme = localStorage.getItem(dataKey);
    const isAdminPreview = window.self !== window.top;

    if (savedTheme && themesArray.includes(savedTheme) && !isAdminPreview) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      switchIcons(themesArray, savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", defaultTheme);
      switchIcons(themesArray, defaultTheme);
    }
    calculateAccentTextColor();
  }
}

function themeToggle() {
  const allToggles = document.querySelectorAll("[data-toggle-theme]");
  const toggleEl = document.querySelector("[data-toggle-theme]");

  if (toggleEl) {
    const themesList = toggleEl.getAttribute("data-toggle-theme");
    const themesArray = themesList.split(",");
    const dataKey = toggleEl.getAttribute("data-key") || "theme";

    [...allToggles].forEach((el) => {
      el.addEventListener("click", function () {
        const currentId = el.getAttribute("id");
        const currentChecked = el.checked;
        const currentTheme = document.documentElement.getAttribute("data-theme");

        if (themesList && themesArray.length > 1) {
          if (currentTheme == themesArray[0]) {
            document.documentElement.setAttribute("data-theme", themesArray[1]);
            localStorage.setItem(dataKey, themesArray[1]);
          } else {
            document.documentElement.setAttribute("data-theme", themesArray[0]);
            localStorage.setItem(dataKey, themesArray[0]);
          }
        }
        // refresh comments section to apply theme
        const comments = document.querySelector("[title=comments-frame]");
        if (comments) {
          comments.contentWindow.location.reload();
        }
        // synchronize all toggle buttons
        [...allToggles].forEach((ele) => {
          const eleId = ele.getAttribute("id");
          if (currentId !== eleId) {
            ele.checked = currentChecked;
          }
        });
      });
    });
  }
}

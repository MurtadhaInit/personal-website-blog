const currentTheme = localStorage.getItem("theme");

function getThemePref() {
  // get current theme, if set
  if (currentTheme) return currentTheme;

  // or get system preference otherwise (and store it in local storage)
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    localStorage.setItem("theme", "dark");
    return "dark";
  }
  localStorage.setItem("theme", "light");
  return "light";
}

let theme = getThemePref();

function reflectThemePref() {
  theme === "dark"
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");

  const toggleThemeButton = document.getElementById("theme-btn");
  toggleThemeButton?.setAttribute("aria-label", theme + " theme");
}

// set the specified theme early on
reflectThemePref();

window.onload = () => {
  // toggle theme manually
  document.getElementById("theme-btn")?.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    reflectThemePref();
  });
};

// sync with system preference changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    theme = isDark ? "dark" : "light";
    reflectThemePref();
  });

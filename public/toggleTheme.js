function getThemePref() {
  // get current theme, if set
  const setTheme = localStorage.getItem("theme");
  if (setTheme) return setTheme;

  // or get system preference otherwise (and store it in local storage)
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

function reflectThemePref(theme) {
  theme === "dark"
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");

  const toggleThemeButton = document.getElementById("theme-btn");
  toggleThemeButton?.setAttribute(
    "aria-label",
    `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
  );
}

reflectThemePref(getThemePref());

window.onload = () => {
  // set the specified theme early on
  reflectThemePref(getThemePref());

  // toggle theme manually
  document.getElementById("theme-btn")?.addEventListener("click", () => {
    const theme = getThemePref() === "dark" ? "light" : "dark";
    localStorage.setItem("theme", theme);
    reflectThemePref(theme);
  });
};

// sync with system preference changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    const theme = isDark ? "dark" : "light";
    const setTheme = localStorage.getItem("theme");
    // if theme was not manually set, reflect change
    if (!setTheme) reflectThemePref(theme);
  });

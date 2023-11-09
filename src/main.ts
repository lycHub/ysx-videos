import './styles/index.css';
import './styles/main.css';

type ThemeTypes = 'default' | 'dark';

const ThemeStorageKey = 'currentTheme';
let currentTheme: ThemeTypes = localStorage.getItem(ThemeStorageKey) as ThemeTypes;

let menuActive = false;

addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn') as HTMLButtonElement;
  menuBtn?.addEventListener('click', handleMenuClick.bind(this, menuBtn));

  document.addEventListener('click', () => {
    if (menuActive) {
      handleMenuClick(menuBtn);
    }
  });

  const themeLink = document.getElementById('theme-link') as HTMLLinkElement;
  const themeIcons = document.querySelectorAll('.icon-theme');
  themeIcons.forEach(item => {
    item.addEventListener('click', handleToggleIcon.bind(this, themeLink));
  });
  setTheme(currentTheme || 'default', themeLink);

});

function setTheme(theme: ThemeTypes, themeLink: HTMLLinkElement) {
  currentTheme = theme;
  localStorage.setItem(ThemeStorageKey, theme);
  document.documentElement.setAttribute('data-theme', theme);
  themeLink.setAttribute('href', `themes/${theme}.css`);
}

function handleToggleIcon(themeLink: HTMLLinkElement) {
  if (themeLink) {
    const newTheme = currentTheme === 'default' ? 'dark' : 'default';
    setTheme(newTheme, themeLink);
  }
}

function handleMenuClick(menuBtn: HTMLButtonElement, event?: Event) {
  event?.stopPropagation();
  const parent = menuBtn.parentNode as HTMLElement;
  if (!parent) return;
  if (menuActive) {
    parent.classList.remove('active-menu');
  } else {
    parent.classList.add('active-menu');
  }
  menuActive = !menuActive;
}

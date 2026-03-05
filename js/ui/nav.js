import { getLangFromURL } from "../utils/getLangFromURL.js";

// Sets each navlink to connect to a specific language subpath + tag 
export function updateNavLinks() {
  // Get the language from the URL
  const lang = getLangFromURL();

  // All the navlinks have a data-link before a data-tag,
  // using the dataset property we can isolate each one 
  document.querySelectorAll('nav a[data-link]').forEach(a => {
    const tag = a.dataset.tag;
    a.href = tag ? `/${lang}/${tag}/` : `/${lang}/`;
  });
}

// Highlight the active navLink, based on the URL
export function highlightActiveNav() {
  document.querySelectorAll('nav a[data-link]').forEach(a => {
    // If the link in the navlink is not the current URL path, then set to false
    // If the link in the navlink IS the current URL path, then set it to true/active
    a.classList.toggle('active', a.getAttribute('href') === location.pathname);
  })
}

// Initialize navlinks to not reload the page (SPA logic using History API)
export function initNav() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[data-link]'); // get the closest element of the click
    if (!link) return;  // if there is no link when clicked, just stop here
    e.preventDefault(); // prevent page reload

    // Using the history API, pushState adds a browser session to the stack
    // dispatching the popstate event will trigger the session update, with no page reload
    history.pushState({}, '', link.href)
    window.dispatchEvent(new Event('popstate'));
  })
}

// Initialize the language switcher dropdown
export function initLangSwitcher() {
  const switcher = document.getElementById('lang-switcher');

  // Set the dropdown to be the language set in the site URL
  switcher.value = getLangFromURL();

  // When the dropdown is changed, change the URL and update the page
  switcher.addEventListener('change', e => {
    const newLang = e.target.value; // get the new language selected
    const parts = location.pathname.split('/').filter(Boolean);

    // set the new language as the first part
    // then reconstruct/join the parts together and use as new URL then update page
    parts[0] = newLang;
    const newPath = '/' + parts.join('/') + '/';

    history.pushState({}, '', newPath);
    window.dispatchEvent(new Event('popstate'));
  })
}

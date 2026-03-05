// define var with let so we have block-scoped reassignable values
let translations = {};

// Language loading function sets the translation json
export async function loadLanguage(lang) {
  const res = await fetch(`/js/i18n/locales/${lang}.json`);

  // if there is no result for the given language, use english
  if (!res.ok) {
    const fallback = await fetch(`/js/i18n/locales/en.json`);
    translations = await fallback.json();
    return;
  }

  // if there is a result, then use it for the translations
  translations = await res.json();
}

// Translation function uses the translation json to return the translated word
export function t(key, vars = {}) {
  // keys are in the format of parent_class.child_object or child_object, where:
  //    parent_class = family of translated UI clusters, like the nav
  //    child_object = specific text key that is translated to multiple languages
  // value takes away the dots and uses reduce() to take the child_object as the key 
  // of the parent_class, using the nullish coalescing operator '??' to return key if null
  const value = key.split('.').reduce((obj, k) => obj?.[k], translations) ?? key;

  // return that value with the key changed with the vars remaining in the string 
  return value.replace(/\{(\w+)\}\}/g, (_, k) => vars[k] ?? `{{${k}}}`);
}

// Page translation function that calls the key translation function on each element
export function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
}

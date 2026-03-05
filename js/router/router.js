import { updateNavLinks, highlightActiveNav } from "../ui/nav.js";
import { loadLanguage, translatePage } from "../i18n/i18n.js";
import { getLangFromURL } from "../utils/getLangFromURL.js";

// Router function turns into async to use await for loadLanguage
export async function router() {
  // location.pathname returns the path from TLD to slug
  const path = location.pathname;

  // filtering by boolean with backslash as a separator makes 
  // an array of path words: /en/politics -> ['en', 'politics']
  const parts = path.split('/').filter(Boolean);

  // take the parts of the path and assign them to vars
  const lang = getLangFromURL();
  const second = parts[1];
  const third = parts[2];

  // update + highlight navbar as page loads
  await loadLanguage(lang);
  translatePage();
  updateNavLinks();
  highlightActiveNav();

  // console log the paths of the URL, based on second part:
  if (!second) {
    console.log('HOME', { lang });
  } else if (second === 'post' && third) {
    console.log('POST', { lang, slug: third })
  } else {
    console.log('TAG', { lang, tag: third })
  }
}

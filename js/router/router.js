import { updateNavLinks, highlightActiveNav } from "../ui/nav.js";
import { loadLanguage, translatePage } from "../i18n/i18n.js";
import { getLangFromURL } from "../utils/getLangFromURL.js";
import { renderList } from "../ui/renderList.js";
import { renderPost } from "../ui/renderPost.js";

// Router function turns into async to use await for loadLanguage
export async function router() {
  // filtering by boolean with backslash as a separator makes 
  // an array of path words: /en/politics -> ['en', 'politics']
  const parts = location.pathname.split('/').filter(Boolean);
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
    await renderList();
    return;
  } else if (second === 'post' && third) {
    console.log('POST', { lang, slug: third })
    await renderPost(third);
    return;
  } else {
    console.log('TAG', { lang, tag: second })
    await renderList(second);
    return;
  }
}

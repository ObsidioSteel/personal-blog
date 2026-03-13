import { fetchPosts } from "../api/content-api.js";
import { loadLanguage, t } from "../i18n/i18n.js";
import { updateWidth } from "../utils/changeStyle.js";
import { getLangFromURL } from "../utils/getLangFromURL.js";

// have the flag emojis ready so I can use them easier
const FLAGS = {
  en: '🇬🇧',
  fr: '🇫🇷',
  de: '🇩🇪',
  cs: '🇨🇿',
  fi: '🇫🇮',
  zh: '🇨🇳'
};

// async function to render the list of posts 
// because we need to await fetcchPosts()
export async function renderList(tag = null) {
  // Get the language and posts for the page
  const lang = getLangFromURL();
  const posts = await fetchPosts();

  // Filter by the active tag, if there is one
  const filtered = tag ? posts.filter(p => p.tags.includes(tag)) : posts;

  // Initialize and reset container width
  console.log(filtered);
  const container = document.getElementById('app');
  updateWidth(container, "");

  await loadLanguage(lang);
  const read_more = t("card.read_more");

  container.innerHTML = `
    <div class="card-grid">
        ${filtered.map(post => renderCard(post, lang, read_more)).join('')}
    </div>
  `;
}

// Renders the card for the blog post
function renderCard(post, lang, read_more) {
  // English default fallback + get post information
  const content = post.translations[lang] ?? post.translations['en'];
  const slug = post.slug;
  const tag = post.tags[0].toUpperCase();
  const coverImage = `/content/posts/${slug}/images/cover.png`

  const flags = Object.keys(post.translations)
    .map(l => `<span title="${l}">${FLAGS[l] ?? l}</span>`)
    .join('');

  return `
    <article class="card">
      <img src="${coverImage}" class="fill-width">
      <div class="flex margin2">
        <span class="card-tag">${tag}</span>
        <div class="card-flags">${flags}</div>
      </div>
      <div class="card-info">
        <h2 class="card-title">${content.title}</h2>
        <p class="card-desc">${content.description}</p>
        <a href="/${lang}/post/${slug}/" data-link class="card-link">${read_more}</a>
      </div>
    </article>
  `;
}

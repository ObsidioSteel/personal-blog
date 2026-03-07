import { fetchPosts } from "../api/content-api.js";
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

  console.log(filtered);
  const container = document.getElementById('app');

  container.innerHTML = `
    <div class="card-grid">
        ${filtered.map(post => renderCard(post, lang)).join('')}
    </div>
  `;
}

// Renders the card for the blog post
function renderCard(post, lang) {
  // English default fallback + get post information
  const content = post.translations[lang] ?? post.translations['en'];
  const slug = post.slug;
  const tag = post.tags[0].toUpperCase();

  const flags = Object.keys(post.translations)
    .map(l => `<span title="${l}">${FLAGS[l] ?? l}</span>`)
    .join('');

  return `
    <article class="card">
      <div class="card-meta">
        <span class="card-tag">${tag}</span>
        <div class="card-flags">${flags}</div>
      </div>
      <h2 class="card-title">${content.title}</h2>
      <p class="card-desc">${content.description}</p>
      <a href="/${lang}/post/${slug}/" data-link class="card-link">Read more</a>
    </article>
  `;
}

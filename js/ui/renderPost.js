import { getLangFromURL } from "../utils/getLangFromURL.js"
import { fetchPost, fetchPostInfo } from "../api/content-api.js"

export async function renderPost(slug) {
  const lang = getLangFromURL();
  console.log(lang);

  const post = await fetchPost(slug, lang);

  const [date, title, description] = await fetchPostInfo(slug, lang);

  console.log(date, title, description);

  // Add title and description
  const postTitle = document.createElement('h2');
  postTitle.textContent = title;

  const postDesc = document.createElement('p');
  postDesc.textContent = description;

  // container for text content in the article
  const contentContainer = document.createElement('div');
  contentContainer.innerHTML = post;

  // getting the dynamic app container and adding all the elements
  const container = document.getElementById("app");
  container.innerHTML = '';               // clear app div
  container.appendChild(postTitle);
  container.appendChild(postDesc);
  container.appendChild(contentContainer);
}

import { getLangFromURL } from "../utils/getLangFromURL.js"
import { fetchPost, fetchPostInfo } from "../api/content-api.js"
import { updateWidth } from "../utils/changeStyle.js";

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

  // change styling to fit article
  postTitle.style.fontSize = "3.5rem";
  postTitle.style.marginBottom = "var(--spacing2)";
  postDesc.style.fontSize = "1.75rem";
  postDesc.style.lineHeight = "2rem";

  updateWidth(container, "40rem")

  // Displaying image that was on card in home page
  const coverImage = document.createElement('img');
  coverImage.src = `/content/posts/${slug}/images/cover.png`;
  coverImage.classList.add("margin2")
  coverImage.classList.add("fill-width")

  // update app container
  container.innerHTML = '';               // clear app div
  container.appendChild(postTitle);
  container.appendChild(postDesc);
  container.appendChild(coverImage);
  container.appendChild(contentContainer);

}

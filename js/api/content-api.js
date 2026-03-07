// async function because fetch returns a promise?
export async function fetchPosts() {
  // no need to error check since we know the file exists
  const res = await fetch('/content/posts.json');
  return res.json();
}

export async function fetchPost(slug, lang) {
  const res = await fetch(`/content/posts/${slug}/${lang}.txt`);

  console.log(res);

  if (!res.ok) {
    return null;
  }

  const html = await res.text();

  console.log(html);

  return html;
}

// function to get the title, description, and date of the post
export async function fetchPostInfo(slug, lang) {
  const res = await fetch('/content/posts.json');

  const posts = await res.json();

  console.log(posts);

  const post = posts.filter(p => p.slug === slug)[0];

  console.log(post);

  const postInfo = post.translations[lang] ?? post.translations['en'];

  return [post.date, postInfo.title, postInfo.description];
}

// async function because fetch returns a promise?
export async function fetchPosts() {
  // no need to error check since we know the file exists
  const res = await fetch('/content/posts.json');
  return res.json();
}

export async function getPostLanguage(slug, lang) {
  // fetch the specific post from the json "database"
  const res = await fetch('/content/posts.json');
  const posts = await res.json();
  const post = posts.filter(p => p.slug === slug)[0];

  if (post.translations[lang]) {
    return lang;
  } else {
    return 'en';
  }
}

export async function fetchPost(slug, lang) {
  const postLang = await getPostLanguage(slug, lang);
  const res = await fetch(`/content/posts/${slug}/${postLang}.txt`);
  return await res.text();
}


// function to get the title, description, and date of the post
export async function fetchPostInfo(slug, lang) {
  const postLang = await getPostLanguage(slug, lang);

  const res = await fetch(`/content/posts.json`);
  const posts = await res.json();
  const post = posts.filter(p => p.slug === slug)[0];
  const postInfo = post.translations[postLang];

  return [post.date, postInfo.title, postInfo.description];
}

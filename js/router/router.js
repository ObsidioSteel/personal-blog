export function router() {
  // location.pathname returns the path from TLD to slug
  const path = location.pathname;

  // filtering by boolean with backslash as a separator makes 
  // an array of path words: /en/politics -> ['en', 'politics']
  const parts = path.split('/').filter(Boolean);

  console.log(parts);

  // take the parts of the path and assign them to vars
  const lang = parts[0] || 'en'; // use english as default
  const second = parts[1];
  const third = parts[2];

  // console log the paths of the URL, based on second part:
  if (!second) {
    console.log('HOME', { lang });
  } else if (second === 'post' && third) {
    console.log('POST', { lang, slug: third })
  } else {
    console.log('TAG', { lang, tag: third })
  }
}

// if a path is like /{lang}/*, we need to take
// the first part of the path, or set it to 'en'

export function getLangFromURL() {
  // split({separator}) returns array without that separator between
  // filter(Boolean) removes the 'falsey' values: null, 0, undefined
  return location.pathname.split('/').filter(Boolean)[0] || 'en';
}

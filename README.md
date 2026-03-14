# Personal Blog

This is a simple, under-engineered SPA (single page application) blog site
using vanilla HTML/CSS & JS.

I plan to improve upon this project over time, and eventually get it to be
as professional as I possibly can, without any external packages or any
dependencies. I was originally planning to build a CMS and backend solution
on top of this; now I feel it is unnecessary since I have already done this
much without it.

## Architecture/Design

A blog is a web application that serves articles/documents from a database
to a client or user. Therefore, there are three components in this design:

1. Presentation Layer (reading a blogpost)
2. Application Layer (serving a blogpost)
3. Data Layer (storing + managing blogposts)

## Presentation Layer

How I imagined this was to think of reusability, so if I were to create a
post, how could I construct a format where I can create a structure that
can be rendered again and again.

To accomplish this, I made a file routing system that serves a langauge-specific
HTML article in a .txt file. I did this because I cannot serve an HTML file
other than `index.html`, without breaking my rewrite rules in my `serve.json`. I
figured that it would be easiest to do it this way; more on it later.

For styling, I used ``main.css`` to define some global styling variables:

1. Fonts (with font-family)
2. Colors
3. Default Values (margin: 0, padding: 0)
4. Spacing (in 7 different increments, to standardize sizing)

This is basically a modular approach to styling, which I inspired from
TailwindCSS. Instead of using Tailwind, though, I figured I could just
write my own styling variables in raw CSS and use them across the website,
applying custom CSS classes across all elements.

I do plan to eventually make this blog mobile-responsive; the CSS may need a
partial rewrite or restructuring to accommodate modular mobile responsiveness.

## Application Layer

Since this is not a content management system, I only need to worry about a
GET command, because posts exist as .json files already. Therefore, I only needed
a few fetching GET-like commands in my `content-api.json`:

1. fetchPosts(), for the homepage to list all of the blogposts
2. fetchPost(slug, lang), for the page to load an article with a language
3. getPostLanguage(slug, lang), for the localization to default to English
4. fetchPostInfo(slug, lang), for the title, description, and date of a post

This is, of course, very simple, and is not a full scale replacement of what a CMS
is supposed to do. Realistically, I enjoy writing in LazyVim, so much so that a
`.txt` file with HTML syntax seems more enjoyable to me, than spending 20 to 50
hours making an admin dashboard hosted in a different repo, that is supposed to
connect to my blog database. Too much work, for such little benefit.

## Data Layer

At the moment, I am simply storing all of the blogposts in the
``./content/posts/`` directory, so my data layer is not complex.

My "database" is my ``posts.json`` file, that contains indexes:

```json
[
    {
        "slug": "post-example",
        "date": "YYYY-MM-DD",
        "tags": [
            "{technology|mathematics|linguistics|literature|history}"
        ],
        "translations": {
            "en": {
                "title": "This is a Title",
                "description": "This describes the post"
            }
        }
    }
]
```

This way, it is easier for me to access the names of specific posts,
without needing to use functions that directly list files from my folders.

I do not see this structure changing, since it has been quite intuitive for me to
add information. I could write a script that generates the metadata faster, but
again, the time that it would save is not worth the debugging it may present me.

Overall, I successfully under-engineered the data layer, and I'm proud of it.

## Internationalization (i18n)

I love languages, so I want to be able to serve multilingual blogposts.

As a result, I should also provide translated versions of the website for
each of the languages that I plan to write in. For scalability, I set up
logic for each of the six languages that I plan to experiment in:

1. English (of course, since it is my native language)
2. French
3. German
4. Czech
5. Finnish
6. Chinese (good practice for non-romanized Unicode support + interesting)

To do this, I stored translated versions of the website as different routes.

Of course, each post must be hand-translated, and so most of the posts will
be in English, French, and German for the time being. However, once I gain
enough experience working in the latter three; I could begin translating
previous articles for fun, which would also serve as great practice for me.

An issue though, is that if I were to internationalize the website, how do
I internationalize the article? That is, if the blogpost is in French, but
the website is in German, how can I separate the languages in the URL?

This is by adding a query to the URL at the end, which simplifies the issue:

| Language   | UI Language Path Segment    | Content Language Query|
|----------- | --------------------------- | ----------------------|
| English    | /en/                        |?lang=en               |
| French     | /fr/                        |?lang=fr |
| German     | /de/                        |?lang=de |
| Czech      | /cs/                        |?lang=cs |
| Finnish    | /fi/                        |?lang=fi |
| Chinese    | /zh/                        |?lang=zh |

Therefore, as an example, if I were to ask for the following:

1. German Website UI
2. Czech Blog Post Language
3. Blogpost name is "Hello World"

These questions create the URL (not a real URL... yet):
<https://blog.pokrok.dev/de/post/hello-world?lang=cs>

The UI language content is stored in language versions in a `${lang}.json` file.
Suppose we have a label in the website that says "Read More", and we want to
provide sufficient localization for French and German. This is the result:

```json
{
    "read_more": {
        "en": "Read More",
        "fr": "Lire plus",
        "de": "Mehr lesen"
    }
}
```

Then, when we want to refer to the language, you can simply use the translate
function (called t to be shortened) on a collection of `data-link` attributes:

```js
export function t(key) {
    return ui[key][getLanguage()] ?? ui[key].en //English is default
}
```

So when we use it in our document, we can say:

```html
<element data-link data-i18n="read_more"></element>
```

This will be fed into the translation script, where each element has their
`data-i18n` tag parsed and matched to the respective translation found in the
.json file. This system just works, and is server-side as well.

So, with all that said, this is how the "translation" would work:
Load element --> Update text by label key & language state --> Render content

## Next Steps

I am not exactly sure what I want to upgrade next, but I would say my first
goal is to get to 10 blogposts, in at least 3 languages; most likely being
English, French, and German.

Here are some ideas, though:

1. Search bar functionality
2. Footer section of the website with links
3. Improving the UX by making cards + title a link
4. Compact styling of navbar + title when reading an article
5. Dark mode?

Again, I do not know when I wish to tackle these tasks, but if I ever seem to
be bored and want to work on a web development project, these tasks will be a
fun few things to try myself.

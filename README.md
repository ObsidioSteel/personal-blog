# Personal Blog

This is a simple, under-engineered blog using vanilla HTML/CSS & JS.

I plan to upgrade this and integrate it with a CMS in the future, with no
intentions of rewriting it using a front-end framework. All of the code
is hand-written by me, in order to practice web architecture development.

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

The file ``post-template.html`` defines a template of what a post page looks
like, and this way I can just import content without the need to start
each new page from scratch.

For styling, I used ``main.css`` to define some global styling variables:

1. Fonts (with font-family)
2. Colors
3. Default Values (margin: 0, padding: 0)
4. Spacing (in 0.25rem increments, to make the site "flow" better)

Then, I used component-level styling, to prevent one large styling file.
I prefer this system over just one ``styles.css``, because I think each part
of the site should have partitioned customizability.

This is basically a modular approach to styling, which I inspired from
TailwindCSS. Instead of using Tailwind, though, I figured I could just
write my own styling variables in raw CSS and use them across the website,
which also makes implementing dark mode later, much easier.

Again, I don't know how scalable this is towards a CMS, but thinking about
this in a maintainable sense, I strongly believe this is a good system.

## Application Layer

Since this is not a content management system (yet, hopefully), I only need
to worry about a GET command, because posts exist as .json files already.

There are two functions I would need:

1. getPosts(), for the homepage to list all of the blogposts
2. getPost(slug, lang), for the page to load an article with a language

By defining my initial application layer as just GET commands, once I have
more functions in my CMS (CRUD-like functionality), then all I need to do
is add the DELETE, POST, and PUT HTTP functions.

## Data Layer

At the moment, I am simply storing all of the blogposts in the
``./content/posts/`` directory, so my data layer is not complex.

My "database" is my ``posts.json`` file, that contains indexes:

```json
{
    {
        "slug": "test-one",
        "date": "2026-02-26"
    },
    {
        "slug": "test-two",
        "date": "2026-02-27"
    }
}
```

This way, it is easier for me to access the names of specific posts,
without needing to use functions that directly list files from my folders.

Also, when I upgrade to a CMS, it would make sense to have a foundation
that is easily portable/comparable to SQL logic, like:

```SQL
SELECT slug FROM posts;
```

I don't know, we will see if this system is easy to upgrade, I think it is.

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

The actual language content is stored in language versions in the .json file.
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
function (called t to be shortened):

```js
export function t(key) {
    return ui[key][getLanguage()] ?? ui[key].en //English is default
}
```

So when we use it in our document, we can say:

```js
button.textContent = t("read_more")}
```

So, with all that said, this is how the "translation" would work:
Load element --> Select text by label key & language state --> Render content

## Next Steps

I am not exactly sure what I want to upgrade next, but I would say my first
goal is to get to 10 blogposts, in at least 3 languages; most likely being
English, French, and German.

### Patch Notes

v0.0.1:

- Initialized README.md with hand-written development document
- Initialized folder structure and pre-populated files for the project

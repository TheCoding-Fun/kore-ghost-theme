# Kore - [Daisy UI](https://daisyui.com/docs/intro/) / Tailwind theme for [Ghost](http://github.com/tryghost/ghost/).

## Why Kore?

When building a DaisyUI template for Ghost, only one name popped into my mind: Kore! After all, Kore (Persephone) loves flowers and rules ghosts! :smirk:

## Features

This theme is based on a "Source" theme, which is a default theme of Ghost platform. Some of the features from this theme were preserved also in Kore, like the responsive top navigation menu, but Kore also comes with a couple of new features:

- Rich theme choice
  - Pick a Daisy UI theme or create your own!
  - Choose a light theme, dark theme or Ligh/Dark theme combination with a theme picker
- Configurable Home layout with multiple display options
- Navigation bar, which can be regular or sticky with a glass effect
- Configurable reading progress indicator (can be turned on or off)
- "Scroll to top" button in footer
- Dynamic year in the footer: "Copyright YYYY"
- Full localization (so far English and Polish)
- Custom layouts for pages: Tags, Authors
  - Authors: Create a page with url "authors" to automatically use `page-authors.hbs` template
  - Tags: Create a page with url "tags" to automatically use `page-tags.hbs` template
  - Don't forget to add "Featured image" to these pages!
- Custom layout for individual Author `author.hbs` and Tag `tag.hbs`
- Custom 404 error page `error-404.hbs`
- Custom template for a post or a page with a summary
  - This template uses Toc Bot script to construct automatic summary from h1,h2 or h3 headers
  - The template can be selected during post or page creation.
- Featured posts as a grid or a carousel
- Ready-to-use `sitemap.hbs`. In order to use it, read this article: [Create a Google News sitemap](https://ghost.org/tutorials/create-a-google-news-sitemap/)

# First time using a Ghost theme?

Ghost uses a simple templating language called [Handlebars](http://handlebarsjs.com/) for its themes.

This theme has lots of code comments to help explain what's going on just by reading the code. Once you feel comfortable with how everything works, we also have full [theme API documentation](https://ghost.org/docs/themes/) which explains every possible Handlebars helper and template.

**The main files are:**

- `default.hbs` - The parent template file, which includes your global header/footer
- `home.hbs` - The homepage
- `index.hbs` - The main template to generate a list of posts
- `post.hbs` - The template used to render individual posts
- `page.hbs` - Used for individual pages
- `tag.hbs` - Used for tag archives, eg. "all posts tagged with `news`"
- `author.hbs` - Used for author archives, eg. "all posts written by Jamie"

One neat trick is that you can also create custom one-off templates by adding the slug of a page to a template file. For example:

- `page-about.hbs` - Custom template for an `/about/` page
- `tag-news.hbs` - Custom template for `/tag/news/` archive
- `author-ali.hbs` - Custom template for `/author/ali/` archive


# Development

Source styles are compiled using Gulp/PostCSS to polyfill future CSS spec. You'll need [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com) installed globally. After that, from the theme's root directory:

```bash
# install dependencies
yarn install

# run development server
yarn dev
```

Now you can edit `/assets/css/` files, which will be compiled to `/assets/built/` automatically.

The `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which you can then upload to your site.

```bash
# create .zip file
yarn zip
```

## How to add your own theme

Adding your theme is very easy! Search this repo for `denim` theme which was added as a custom theme example.

 - Go to [DaisyUI theme generator](https://daisyui.com/theme-generator/) and create your theme
 - Click on `{ } CSS` button to get CSS
 - Paste this theme into `/assets/css/base.css` next to `denim` custom theme
 - Look at both `name` and `color-scheme` variables in the CSS code of the custom theme you have just created. Name can be anything of your choice (the only exception: don't use spaces?) and color scheme can be either `light` or `dark`.
- If the `color-scheme` variable is `dark`: You need to add the name of the theme in the following sections:
    - In `/assets/css/base.css`: in `/* dark themes */` section under `/* For auto theme detection in comments */`
    - In `package.json`: inside the `dark_theme` option so that it can be chosen in Ghost settings
- If the `color-scheme` variable is `light`, search for `/* light themes */` section in `/assets/css/base.css` stylesheet and `light_theme` section in `package.json`
- build the theme with `yarn zip` command
- you can now import this file `dist\kore-ghost-theme.zip` in your Ghost themes section!

## How to add a new language
- Take a base English file: `/locales/en.json`
- Copy it as a new file with the name of your language. For example, for German, the name would be `de.json`
- Translate the values of your new json file, or if you're using Copilot or other AI, ask it to translate for you!
- build the theme with `yarn zip` command and import it again
- read more about how to change the locale of your Ghost website in this article: [Translation in Ghost](https://docs.ghost.org/faq/translation)

## Tips for developers

 - `gh-` classes in theme are usually used in javascript files or in Ghost internal workings - don't touch these if you don't know what you're doing
 - `kg-` are Ghost internat content classes
 - DaisyUI classes are prefixed with `k--` to avoid name conflicts, the rest are Tailwind classes which usually are used directly in *.hbs templates
 - When developing using `yarn dev`, handlebars templates are automatically reloaded, but in order to see changes in CSS, the `/assets/css/base.css` CSS file needs to be saved as well in order for Tailwing and DaisyUI to rebuild. Just hit CTRL + S and reload your local Ghost instance in your browser.

## SVG Icons

Source uses inline SVG icons, included via Handlebars partials. You can find all icons inside `/partials/icons`. To use an icon just include the name of the relevant file, eg. To include the SVG icon in `/partials/icons/rss.hbs` - use `{{> "icons/rss"}}`.

You can add your own SVG icons in the same manner. Some of the SVGs used in this theme were copied from "Source Ghost template, and other were added from [Hero icons website](https://heroicons.com/solid)

## How about a coffee? :heart:

If you think this theme is cool, [I would really appreciate a coffee!](https://ko-fi.com/thecodingfun) :coffee:


# Copyright & License

Copyright (c) 2026 TheCodingFun - Released under the [MIT license](LICENSE).

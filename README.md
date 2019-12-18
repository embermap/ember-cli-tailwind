# Ember CLI Tailwind

[![npm version](https://img.shields.io/npm/v/ember-cli-tailwind.svg?style=flat-square)](http://badge.fury.io/js/ember-cli-tailwind)
[![Build Status](https://img.shields.io/travis/embermap/ember-cli-tailwind/master.svg?style=flat-square)](https://travis-ci.org/embermap/ember-cli-tailwind)

---

**Update: This library is deprecated**

Aug 29, 2019

Hey everyone! I wanted to write an update for folks using and coming across this library. I've decided to deprecate it.

I built ember-cli-tailwind because I wanted a one-liner to get Tailwind wired up with rebuilds in an Ember app. To do this, I had the addon configure PostCSS behind the scenes, basically so PostCSS was an implementation detail from the perspective of the user.

This has caused problems over the life of this library, as many people reasonably want to be able to configure PostCSS themselves, for example to add Autoprefixer or PurgeCSS.

As of today I can't think of a great way to write this addon so that it sets everything up in a way that it's a significant value-add compared with teaching folks how to use ember-cli-postcss to set up Tailwind themselves.

This addon also scaffolded out the Tailwind config into separate files, which was really a personal preference and a design decision I felt aligned with the Ember community. In v1.0 Tailwind took more responsibility for the config, and now the intended way to use Tailwind is to use an empty config, and only override values as needed. This means relying more on the official Tailwind docs and less on your complete customized set of values. This has several benefits, the main one being that Tailwind has taken more ownership of carefully setting values that work for many situations. In any case, if the larger Tailwind community is using Tailwind in this way, I think it's important for Ember users to be doing the same thing.

In general, I think it's good for Ember users to move away from needing custom ember-* packages, and instead getting closer to the underlying libraries and referencing their official documentation as fast as possible. Tools like Ember Auto Import allow us to easily do this. That makes libraires like this one less and less of a good idea. The reality is it's not the best use of time and resources to maintain addons like this that are always chasing their underlying libraries. Light wrappers that wire up file system watchers can make sense, but in this case, using ember-cli-postcss and wiring things up should be straightforward enough for most users.

[chrism has put together a great guide on installing Tailwind into an Ember app](https://github.com/chrism/emberjs-tailwind-purgecss). It's a great reference which should help you migrate away from this addon.

Hopefully this update brings some clarity! The library has effectively been deprecated for several months as I've not been working on it. Teaching Ember users how to use PostCSS so they have direct control over their Tailwind versions & other PostCSS plugins is going to be a far more sustainable path going forward.

Sam Selikoff

P.S. I made a free video on removing ember-cli-tailwind from EmberMap's codebase: <https://embermap.com/video/using-postcss-and-tailwind>

---

Ember CLI Tailwind adds [Tailwind CSS](https://tailwindcss.com) to your app or addon. It also lets you configure every aspect of Tailwind that's designed to be configured, from the configuration values driving the utility classes, to defining new utility classes or components.

It comes with a styleguide route (`/tailwind`) that displays all your configured styles:

![image](https://user-images.githubusercontent.com/2922250/39969009-f0886cf4-56a3-11e8-85a1-15ce38d1f45d.png)

## Installation

Install the addon with

```sh
ember install ember-cli-tailwind
```

**Apps**

The default blueprint will attempt to modify your application's main style file and add an `@import` line to include Tailwind, but if it doesn't, you can add it manually:

```
# CSS 
@import 'tailwind.css';

# SCSS
@import 'tailwind';

# Less 
@import (inline) 'tailwind.css';
```

**Addons**

Make sure `ember-cli-tailwind` is in your addon's `dependencies` (NOT `devDependencies`).

## Usage

Once installed, all of [Tailwind's classes](https://tailwindcss.com/docs/what-is-tailwind/) should be available to you.

You can see the default values, and change them, by looking at the generated files under `/app/tailwind`.

**Styleguide**

If you serve your Ember app and visit `/tailwind`, you should see a styleguide showing a summary of all your configured classes. It will rebuild as you modify Tailwind's default configuration.

**Utilities**

You can [add new utilities](https://tailwindcss.com/docs/adding-new-utilities) of your own by adding them to files under `/app/tailwind/utilities`. You can either use one file or one per utility.

```
// app/tailwind/utilities/outline-none.css
.outline-none {
  outline: none;
}
```

The file will get automatically added to your build, and in the right order (so it will override other rules as you'd expect).

**Components**

You can define [Tailwind components](https://tailwindcss.com/docs/extracting-components) by adding files under `app/tailwind/components`.

```css
// app/tailwind/components/buttons.css
.btn-blue {
  @apply .bg-blue .text-white .font-bold .py-2 .px-4 .rounded;
}
.btn-blue:hover {
  @apply .bg-blue-dark;
}
```

Files added here will automatically be added to your build.

**Plugins**

You can add [Tailwind plugins](https://tailwindcss.com/docs/plugins) by using the `app/tailwind/config/tailwind.js` file, importing your plugin, and adding it to the `plugins` array:

```js
import myPlugin from 'some-neat-plugin';

// snip

plugins: [
  container({
    // center: true,
    // padding: '1rem',
  }),
  myPlugin(),
],
```

## Configuration

**shouldIncludeStyleguide**

Ember CLI Tailwind ships with a styleguide that can be added to the host application's router at the `/tailwind` URL.

The config option `ENV['ember-cli-tailwind'].shouldIncludeStyleguide` determines whether this styleguide is included. By default, it is `false` in the `production` environment, and `true` otherwise.

You can overwrite it to change this default behavior.

## Advanced addon usage

### `build-tailwind` and the `shouldBuildTailwind` option

Ember CLI Tailwind comes with a function you can use when you want more control over how to work with the built `tailwind.css` file.

The function is in the `lib` directory and can be `require`'d in node:

```js
const buildTailwind = require('ember-cli-tailwind/lib/build-tailwind');
```

To use the function, pass in your addon instance (usually `this` if you're working in a hook in `index.js`):

```js
let tailwind = buildTailwind(this);
```

The return value is a Broccoli tree, and thus can be used in different `treeFor` hooks to end up in your build.

If you're using this, you probably also want to disable Ember CLI Tailwind's default behavior, which will concat the built `tailwind.css` file into your addon's generated `vendor.css` file – otherwise you could end up with two versions of Tailwind in your CSS.

You can do that using the `shouldBuildTailwind` config option:

```js
// index.js
module.exports = {
  name: 'your-addon',
  
  options: {
    'ember-cli-tailwind': {
      shouldBuildTailwind: false
    }
  }
}
```

Now you are responsible for calling `buildTailwind` and ensuring the resulting tree ends up in your output.

As an example of how you might use this, say you're building a UI component library as an Ember Addon. You want your component library to use Ember CLI Tailwind, but you're using Sass, and you'd like to explicitly `@import` the built `tailwind.css` file in your component library so that you can write other CSS classes that `@extend` Tailwind's classes.

Here's what that would look like:

```js
// index.js
const MergeTrees = require('broccoli-merge-trees');
const buildTailwind = require('ember-cli-tailwind/lib/build-tailwind');

module.exports = {
  name: 'your-addon',
  
  config() {
    return {
      'ember-cli-tailwind': {
        shouldBuildTailwind: false
      }
    };
  },

  treeForAddonStyles(tree) {
    let trees = tree ? [ tree ] : [];
  
    trees.push(buildTailwind(this));
  
    return new MergeTrees(trees);
  }
};
```

Now that the built `tailwind.css` file is in your Addon's style tree, you can import it in other Sass files:

```scss
// addon/styles/addon.scss
@import 'tailwind';

body {
  @extend .antialiased;
  @extend .font-sans;
  @extend .text-grey-darkest;
}
```

You could even use Sass variables inside of Tailwind's config, since you can set those variables before `@import`'ing Tailwind:

```js
// tailwind/config/colors.js

export default {
  brand: '$brand'
}
```

```scss
$brand: '#3490DC';
@import 'tailwind';
```
